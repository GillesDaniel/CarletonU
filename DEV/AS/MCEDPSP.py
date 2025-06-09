#########################################################################################
# PROPERTY OF BPD ZENITH		
#														
# P IRVING																	   
# CREATED DATE 05/11/2020															   
# UPDATED DATE 11/02/2021 - Change doclinks relationship to full link				   
#
# P IRVING / K St-Claire 
# Date 25/07/2024 - Azure Authentication 
#########################################################################################
from java.net import URL, HttpURLConnection, URLDecoder, URLEncoder, Proxy, InetSocketAddress
from java.nio.file import Files, Paths, StandardCopyOption
from java.nio.charset import StandardCharsets
from psdi.mbo import SqlFormat
from psdi.webclient.system.controller import WebClientEvent
from psdi.webclient.system.session import WebClientSessionManager, WebClientSession
from java.io import DataOutputStream, BufferedReader, InputStreamReader
from java.lang import StringBuffer
from com.ibm.json.java import JSONObject
from com.ibm.tivoli.maximo.util import JSON
from com.ibm.tivoli.maximo.oslc import OslcUtils
from psdi.webclient.system.runtime import WebClientRuntime
from java.util import Hashtable, HashMap
from java.lang import String


##################################################################################
#                          Azure Authentication                                  #
##################################################################################

azureAuth = service.getProperty("mce.sharepoint.auth")

if azureAuth == "1":
	
	def get_protocol_and_domain(spbase):
		"""Extracts the protocol and domain from the SharePoint base URL."""
		if spbase.startswith("https://"):
			return "https://", spbase[8:].split('/')[0]
		elif spbase.startswith("http://"):
			return "http://", spbase[7:].split('/')[0]
		return "", ""

	def get_site(urlname, protocol, sp):
		"""Extracts the site part from the URL if it follows the /sites/ structure."""
		expected_start = "{}{}/sites/".format(protocol, sp)
		if urlname.startswith(expected_start):
			site = urlname.split(expected_start)[1].split("/")[0]
			return "/sites/{}".format(site) if site else ""
		return ""

	def get_connection(urlname):
		url = URL(urlname)
		con = url.openConnection()
		con.setRequestMethod("GET")
		con.setRequestProperty("Authorization", "Bearer {}".format(bearer))
		con.setRequestProperty("Accept", "application/json;odata=verbose")
		#con.setInstanceFollowRedirects(False)
		return con

	def get_access_token(realm, client_id, client_secret):
		"""Requests and retrieves the access token from the OAuth service."""
		try:
			aturl_str = "https://login.microsoftonline.com/{}/oauth2/v2.0/token".format(realm)
			aturl = URL(aturl_str)
			con = aturl.openConnection()
			con.setRequestMethod("POST")
			con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
			
			body = (
				"grant_type=client_credentials" +
				"&client_id={}".format(client_id) +
				"&client_secret={}".format(client_secret) +
				"&scope=https://graph.microsoft.com/.default"
			)
			
			con.setDoOutput(True)
			wr = DataOutputStream(con.getOutputStream())
			try:
				wr.writeBytes(body)
				wr.flush()
			finally:
				wr.close()

			response = StringBuffer()
			inReader = BufferedReader(InputStreamReader(con.getInputStream()))
			try:
				inputLine = inReader.readLine()
				while inputLine is not None:
					response.append(inputLine)
					inputLine = inReader.readLine()
			finally:
				inReader.close()
			
			resp = response.toString().encode('utf-8')
			jsonObject = OslcUtils.bytesToJSONObject(resp)
			return JSON.getString(jsonObject, "access_token")
		except Exception as e:
			service.log_error("Error getting access token: {}".format(e))
			raise

	service.log_debug("MCEDPSP Starts")
	errored = False
	selection = None

	# Check there's a direct print report available
	# If there's two we'll get the first in the sequence
	sqf2 = SqlFormat(mbo, "DP = :1 and PAD=:2 AND APPNAME=:3")
	sqf2.setObject(1, "REPORT", "DP", "1")
	sqf2.setObject(2, "REPORT", "PAD", "1")
	sqf2.setObject(3, "REPORT", "APPNAME", app)
	where2 = sqf2.format()
			
	reportSet = mbo.getMboSet("$REPORTSPI", "REPORT", where2)
	# Set the set as disposable, we're not changing the report just reading it
	reportSet.setFlag(39L, True)
	reportSet.reset()

	report = reportSet.moveFirst()

	if report is not None:

		spbase = service.getProperty("mce.sharepoint.url")
		protocol, sp = get_protocol_and_domain(spbase)
		wcs = service.webclientsession()
		# Get system properties for SharePoint integration
		client_id = service.getProperty("mce.sharepoint.client_id")
		client_secret = service.getProperty("mce.sharepoint.client_secret")
		realm = service.getProperty("mce.sharepoint.realm")


		try:
			bearer = get_access_token(realm, client_id, client_secret)
			service.log_debug("MCEDPSP Access Token Collected")
		except Exception as e:
			errored = True
			service.log_error("Error obtaining access token: {}".format(e))
			errorgroup = "mcedpsp"
			errorkey = "accesstoken"

		try:
			# Rel URL will come from stripping out the SharePoint URL
			spbaselike = spbase + "%"

			# Check the launchpoint to see if it is from list tab
			if launchPoint.startswith("MCEDPSPL"):
				appl = wcs.getCurrentApp()
				appBean = appl.getAppBean()
				mboSet = appBean.getParent().getMboSet()
				selection = mboSet.getSelection()
				service.log_debug("MCEDPSP MBO ON LIST TAB")
			else:
				mboSet = mbo.getThisMboSet()
				service.log_debug("MCEDPSP MBO NOT ON LIST TAB")

			service.log_debug("MCEDPSP MBO Set contains {}".format(mboSet.count()))

			record = mboSet.moveFirst()

			while record is not None:
				# 11/02/21 - New Doclinks Relationship
				dls = record.getMboSet("DOCLINKS")
				dlsWhere = dls.getRelationship()

				if dlsWhere is None or dlsWhere == "":
					sqfDLS = SqlFormat(record, "OWNERID = :1 and OWNERTABLE=:2")
					sqfDLS.setObject(1, "DOCLINKS", "OWNERID", ownerid)
					sqfDLS.setObject(2, "DOCLINKS", "OWNERTABLE", record.getName())
					dlsWhere = sqfDLS.format()
				# 11/02/21 END
				
				# While 2 begins
				ownerid = str(record.getUniqueIDValue())
				
				# Find existing SharePoint records and remove them
				service.log_debug("MCEDPSP Finding Existing SP Doclinks for {} {}".format(record.getName(), ownerid))

				sqf1 = SqlFormat(record, dlsWhere + " AND DOCTYPE=:1")
				sqf1.setObject(1, "DOCLINKS", "DOCTYPE", "SharePoint")
				
				where1 = sqf1.format()
				
				cleanUpSet = record.getMboSet("$DOCLINKSPI", "DOCLINKS", where1)
				cleanUpSet.reset()
				cleanUpMbo = cleanUpSet.moveLast()
				while cleanUpMbo is not None:
					# while 3 begins
					ctx = HashMap()
					ctx.put("mbo", cleanUpMbo)
					service.invokeScript("MCEDPSP_DEL", ctx)
					cleanUpMbo = cleanUpSet.movePrev()
					# while 3 ends
				cleanUpSet.save()
				cleanUpSet.close()
				record = mboSet.moveNext()
				# while 2 ends

			record = mboSet.moveFirst()
			while record is not None:
				# while 5 begins
				# 11/02/21 - New Doclinks Relationship
				dls = record.getMboSet("DOCLINKS")
				dlsWhere = dls.getRelationship()

				if dlsWhere is None or dlsWhere == "":
					sqfDLS = SqlFormat(record, "OWNERID = :1 and OWNERTABLE=:2")
					sqfDLS.setObject(1, "DOCLINKS", "OWNERID", ownerid)
					sqfDLS.setObject(2, "DOCLINKS", "OWNERTABLE", record.getName())
					dlsWhere = sqfDLS.format()
				# 11/02/21 END							
				ownerid = str(record.getUniqueIDValue())						   
				service.log_debug("MCEDPSP Finding Doclinks for {} {}".format(record.getName(), ownerid))

				# 11/02/21 Doclinks Relationship
				where =  dlsWhere + " AND MCESPPRINT=1 AND MCESPURL IS NOT NULL"   
																	
			
	
				spURLs = record.getMboSet("$SPURLS", "DOCLINKS", where)
				spURLs.reset()
				# 11/02/21 Ends
				
				service.log_debug("MCEDPSP Found {} Doclinks for {} {}".format(spURLs.count(), record.getName(), ownerid))

				spURL = spURLs.moveFirst()
				while spURL is not None:
					filename = spURL.getString("MCESPFILENAME")
					filenamesplit = filename.split(".")
					fileext = filenamesplit[len(filenamesplit) - 1]
					service.log_debug("**** {}".format(fileext))
					# If the file is a valid file type then get it
					filetypes = service.getProperty("mxe.doclink.doctypes.printableFileExtensions")
					if filetypes is None or filetypes == "":
						filetypes = ",pdf,txt,csv,doc,gif,jpg,xls,ppt,pptx,docx,xlsx,png,cfr,"
					else:
						filetypes = "," + filetypes + ","
					
					filetypes = filetypes.replace(" ", "")
					
					if "," + fileext.lower() + "," in filetypes:
					
						# Get SharePoint DocType MBO
						doctypesSet = record.getMboSet("$DOCTYPES", "DOCTYPES", "doctype = 'SharePoint'")
						doctypesSet.reset()
						spDoctype = doctypesSet.moveFirst()
						path = spDoctype.getString("DEFAULTFILEPATH")

						# Refresh SharePoint URL
						ctx = HashMap()
						ctx.put("mbo", spURL)
						service.invokeScript("MCESPSAVE", ctx)


						# SharePoint URL
						con2 = get_connection(spURL.getString("MCESPURL"))
						responseCode2 = con2.getResponseCode()
						service.log_debug("**** RESPONSE CODE ****{}".format(responseCode2))
						# if str(responseCode2).startswith("20"):

						
						doclinksSet = record.getMboSet("DOCLINKS")
						doclink = doclinksSet.add()
						docinfoSet = doclink.getMboSet("DOCINFO")
						document = "SP.{}.{}".format(record.getUniqueIDValue(), doclink.getUniqueIDValue())
						# MH replace backslash with forward slash - fullpath = path + "\\" + document + "." + fileext
						fullpath = path + "/" + document + "." + fileext

						try:
							inp = con2.getInputStream()
							Files.copy(inp, Paths.get(fullpath), StandardCopyOption.REPLACE_EXISTING)
							
							docinfo = docinfoSet.add()
							
							docinfo.setValue("DOCUMENT", document)
							docinfo.setValue("DESCRIPTION", filename)
							docinfo.setValue("DOCTYPE", "SharePoint")
							docinfo.setValue("URLTYPE", "FILE")
							docinfo.setValue("URLNAME", fullpath)
							docinfo.setValue("NEWURLNAME", fullpath)
							docinfo.setValue("PRINTTHRULINKDFLT", 1)

							doclink.setValue("DOCUMENT", document)
							doclink.setValue("DOCINFOID", docinfo.getUniqueIDValue(), 3L)
						except Exception as e:
							spURL = spURLs.moveNext()
							doclink.setDeleted(True)
							service.log_error("Error saving document: {}".format(e))
							errorgroup="mcedpsp"
							errorkey="save"
							params = [fullpath]
						service.log_debug("MCEDPSP Added Doclink {} for {} {}".format(document, record.getName(), ownerid))
					else:
						service.log_debug("File Type {} not in list of printableFileExtensions".format(fileext))
						service.log_debug("Allowed File Types are {}".format(filetypes))

					spURL = spURLs.moveNext()
					# While 4 ends

				record = mboSet.moveNext()
				# While 5 ends

			mboSet.save()
		except Exception as e:
			errored = True
			service.log_error("Error retrieving document: {}".format(e))
			errorgroup="mcedpsp"
			errorkey="retrieve"
						

		if not errored:
			if selection is not None:
				select = mboSet.moveFirst()		

				while select is not None:
					i = 0
					while i < selection.size():
						if select.getUniqueIDValue() == selection.elementAt(i).getUniqueIDValue():
							select.select()
						i = i + 1
					select = mboSet.moveNext()
			try:	
				reportnum = str(report.getInt("REPORTNUM"))
				pageName = "reportd" + reportnum
				wcs.loadDialog(pageName)
				reportInfo = Hashtable()
				reportInfo.put("reportnumber", reportnum)
				reportInfo.put("whereclause", "")
				reportInfo.put("quickprinttype", "PAD")
				wcs.handleEvent(WebClientEvent("requestreportrun", pageName, reportInfo, wcs))
			except Exception as e:
				service.log_error("Error running report: {}".format(e))
				errorgroup = "mcedpsp"
				errorkey = "report"		  
	else:
		service.log_error("No report found for MCEDPSP")
		errorgroup = "mcedpsp"
		errorkey = "noreport"				  

	service.log_debug("MCEDPSP Ends")




##################################################################################
#                          Access Control Authentication                         #
##################################################################################

elif azureAuth == "0":
		
	print "MCEDPSP Starts"
	errored = False
	selection = None

	#Check there's a direct print report available
	#If there's two we'll get the first in the sequence
	sqf2 = SqlFormat(mbo, "DP = :1 and PAD=:2 AND APPNAME=:3")
	sqf2.setObject(1, "REPORT", "DP", "1")
	sqf2.setObject(2, "REPORT", "PAD", "1")
	sqf2.setObject(3, "REPORT", "APPNAME", app)
	where2 = sqf2.format()
			
	reportSet = mbo.getMboSet("$REPORTSPI","REPORT",where2)
	#Set the set as disposable, we're not changing the report just reading it
	reportSet.setFlag(39L,True)
	reportSet.reset()

	report = reportSet.moveFirst()

	if report is not None:



		#Get System Properties
		client_id = service.getProperty("mce.sharepoint.client_id")
		client_secret = service.getProperty("mce.sharepoint.client_secret")
		spbase = service.getProperty("mce.sharepoint.url")
		protocol = ""
		sp=""
		
		#get everything after https://
		if spbase.startswith("https://"):
			sp = spbase[8:]
			protocol = "https://"
		elif spbase.startswith("http://"):
			sp = spbase[7:]
			protocol = "http://"
		
		sp = sp.split('/')[0]
		wcs = service.webclientsession()



		try:
			#Get the Realm and Client Info
			realm = service.getProperty("mce.sharepoint.realm")
			client = service.getProperty("mce.sharepoint.spoclient")
			#url3 = URL(spbase+"/_vti_bin/client.svc/");
			#con3 = url3.openConnection()
			#con3.setRequestMethod("GET")
			#con3.setRequestProperty("Authorization","bearer")
			#wwwauth = con3.getHeaderField("WWW-Authenticate");
			#splitc = wwwauth.split(",")
			#realm = str(splitc[0].split("\"")[1])
			#client = str(splitc[1].split("\"")[1])

			print "MCEDPSP Realm and Client Identified"

			#Get the Access Token for SharePoint
			aturl_str = "https://accounts.accesscontrol.windows.net/"+realm+"/tokens/OAuth/2"
			bearer = ""

			aturl = URL(aturl_str);
			con = aturl.openConnection()
			con.setRequestMethod("POST")
			con.setRequestProperty("Content-Type","application/x-www-form-urlencoded")

			body = "grant_type=client_credentials"+ "&"
			body = body + "client_id="+URLEncoder.encode(client_id)+"@"+URLEncoder.encode(realm)+ "&"
			body = body + "client_secret="+URLEncoder.encode(client_secret)+ "&"
			body = body + "resource="+URLEncoder.encode(client)+"/"+sp+"@"+URLEncoder.encode(realm)

			# Send Post Request
			con.setDoOutput(True)
			wr = DataOutputStream(con.getOutputStream())
			wr.writeBytes(body)
			wr.flush()
			wr.close()

			# Read the Response
			inReader = BufferedReader(InputStreamReader(con.getInputStream()))
			response = StringBuffer()
			inputLine = inReader.readLine()

			while (inputLine is not None):
				#While 1 begins
				response.append(inputLine)
				inputLine = inReader.readLine()
				#While 1 ends

			inReader.close()

			resp =  response.toString().encode()
			jsonObject = OslcUtils.bytesToJSONObject(resp)
			bearer = JSON.getString(jsonObject,"access_token")

			print "MCEDPSP Access Token Collected"
		except:
			errorgroup = "mcedpsp"
			errorkey = "accesstoken"

		try:
			#Rel URL will come from stripping out the Sharepoint URL
			spbaselike = spbase+"%"

			#Check the launchpoint to see if it is from list tab
			if launchPoint.startswith("MCEDPSPL"):
				appl = wcs.getCurrentApp()
				appBean = appl.getAppBean()
				mboSet = appBean.getParent().getMboSet()
				selection = mboSet.getSelection()
				print "MCEDPSP MBO ON LIST TAB"
			else:
				mboSet = mbo.getThisMboSet()
				print "MCEDPSP MBO NOT ON LIST TAB"

			print "MCEDPSP MBO Set contains "+str(mboSet.count())

			record = mboSet.moveFirst()

			while record is not None:
				#11/02/21 - New Doclinks Relationship
				dls = record.getMboSet("DOCLINKS")
				dlsWhere = dls.getRelationship()

				if dlsWhere is None or dlsWhere=="":
					sqfDLS = SqlFormat(record, "OWNERID = :1 and OWNERTABLE=:2")
					sqfDLS.setObject(1, "DOCLINKS", "OWNERID", ownerid)
					sqfDLS.setObject(2, "DOCLINKS", "OWNERTABLE", record.getName())
					dlsWhere = sqfDLS.format()
				#11/02/21 END
				
				#While 2 begins
				ownerid = str(record.getUniqueIDValue())
				
				#Find existing SharePoint records and remove them
				print "MCEDPSP Finding Existing SP Doclinks for "+record.getName()+" "+ownerid

				sqf1 = SqlFormat(record, dlsWhere+" AND DOCTYPE=:1")
				sqf1.setObject(1, "DOCLINKS", "DOCTYPE", "SharePoint")
				
				where1 = sqf1.format()
				
				cleanUpSet = record.getMboSet("$DOCLINKSPI","DOCLINKS",where1)
				cleanUpSet.reset()
				cleanUpMbo = cleanUpSet.moveLast()
				while cleanUpMbo is not None:
					#while 3 begins
					ctx = HashMap()
					ctx.put("mbo", cleanUpMbo)
					service.invokeScript("MCEDPSP_DEL", ctx)
					cleanUpMbo = cleanUpSet.movePrev()
					#while 3 ends
				cleanUpSet.save()
				cleanUpSet.close()
				record = mboSet.moveNext()
				#while 2 ends

			record = mboSet.moveFirst()
			while record is not None:
				#while 5 begins
				#11/02/21 - New Doclinks Relationship
				dls = record.getMboSet("DOCLINKS")
				dlsWhere = dls.getRelationship()

				if dlsWhere is None or dlsWhere=="":
					sqfDLS = SqlFormat(record, "OWNERID = :1 and OWNERTABLE=:2")
					sqfDLS.setObject(1, "DOCLINKS", "OWNERID", ownerid)
					sqfDLS.setObject(2, "DOCLINKS", "OWNERTABLE", record.getName())
					dlsWhere = sqfDLS.format()
				#11/02/21 END							
				ownerid = str(record.getUniqueIDValue())						   
				print "MCEDPSP Finding Doclinks for "+record.getName()+" "+ownerid

				#11/02/21 Doclinks Relationship
				where =  dlsWhere+" AND MCESPPRINT=1 AND MCESPURL IS NOT NULL"	
																
						
	
				spURLs = record.getMboSet("$SPURLS","DOCLINKS",where)
				spURLs.reset()
				#11/02/21 Ends
				
				print "MCEDPSP Found "+str(spURLs.count())+" Doclinks for "+record.getName()+" "+ownerid

				spURL = spURLs.moveFirst()
				while spURL is not None:
					filename = spURL.getString("MCESPFILENAME")
					filenamesplit = filename.split(".")
					fileext = filenamesplit[len(filenamesplit)-1]
					print "**** "+fileext
					#If the file is a valid file type then get it
					filetypes = service.getProperty("mxe.doclink.doctypes.printableFileExtensions")
					if filetypes is None or filetypes =="":
						filetypes = ",pdf, txt, csv, doc, gif, jpg, xls, ppt, pptx, docx, xlsx, png, cfr,"
					else:
						filetypes = ","+filetypes+","
					
					filetypes = filetypes.replace(" ","")
					
					if ","+fileext.lower()+"," in filetypes:
					
						#Get SharePoint DocType MBO
						doctypesSet = record.getMboSet("$DOCTYPES","DOCTYPES","doctype = 'SharePoint'")
						doctypesSet.reset()
						spDoctype = doctypesSet.moveFirst()
						path = spDoctype.getString("DEFAULTFILEPATH")

						#sharepoint URL
						url = URL(spURL.getString("MCESPURL"));
						con2 = url.openConnection()
						con2.setRequestMethod("GET")
						con2.setRequestProperty("Authorization","Bearer "+bearer)
						con2.setRequestProperty("Accept","application/json;odata=verbose")
						responseCode2 = con2.getResponseCode()
						print "**** RESPONSE CODE ****"+str(responseCode2)
						#if str(responseCode2).startswith("20"):
						
						doclinksSet = record.getMboSet("DOCLINKS")
						doclink = doclinksSet.add()
						docinfoSet = doclink.getMboSet("DOCINFO")
						document = "SP."+str(record.getUniqueIDValue())+"."+str(doclink.getUniqueIDValue())
						# MH replace backslash with forward slash- fullpath = path+"\\"+document+"."+fileext
						fullpath = path+"/"+document+"."+fileext
						
						try:
							inp = con2.getInputStream()
							Files.copy(inp, Paths.get(fullpath), StandardCopyOption.REPLACE_EXISTING);
							
							docinfo = docinfoSet.add()
							
							docinfo.setValue("DOCUMENT",document)
							docinfo.setValue("DESCRIPTION",filename)
							docinfo.setValue("DOCTYPE","SharePoint")
							docinfo.setValue("URLTYPE","FILE")
							docinfo.setValue("URLNAME",fullpath)
							docinfo.setValue("NEWURLNAME",fullpath)
							docinfo.setValue("PRINTTHRULINKDFLT",1)

							doclink.setValue("DOCUMENT",document)
							doclink.setValue("DOCINFOID",docinfo.getUniqueIDValue(),3L)
						except:
							spURL = spURLs.moveNext()
							doclink.setDeleted(True)
							errorgroup="mcedpsp"
							errorkey="save"
							params = [fullpath]
						print "MCEDPSP Added Doclink "+document+" for "+record.getName()+" "+ownerid
					else:
						print "File Type "+fileext+" not in list of printableFileExtensions"
						print "Allowed File Types are "+filetypes

					spURL = spURLs.moveNext()
					#While 4 ends

				record = mboSet.moveNext()
				#While 5 ends

			mboSet.save()
		except:
			errored = True
			errorgroup="mcedpsp"
			errorkey="retrieve"

		if not errored:
			if selection is not None:
				select = mboSet.moveFirst()		
	
				while select is not None:
					i = 0
					while i < selection.size():
						if select.getUniqueIDValue() == selection.elementAt(i).getUniqueIDValue():
							select.select()
						i=i+1
					select = mboSet.moveNext()
			try:	
				reportnum = str(report.getInt("REPORTNUM"))
				pageName = "reportd"+reportnum
				wcs.loadDialog(pageName)
				reportInfo = Hashtable()
				reportInfo.put("reportnumber", reportnum);
				reportInfo.put("whereclause", "");
				reportInfo.put("quickprinttype", "PAD");
				wcs.handleEvent(WebClientEvent("requestreportrun", pageName, reportInfo, wcs))
			except:
				errorgroup = "mcedpsp"
				errorkey = "report"
	else:
		errorgroup = "mcedpsp"
		errorkey = "noreport"

	print "MCEDPSP Ends"

else:
    service.error(""," The system proptety mce.sharepoint.auth must be 1 or 0.")		
	

