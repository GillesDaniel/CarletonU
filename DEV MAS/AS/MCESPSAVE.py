###########################################################################################################
# PROPERTY OF BPD ZENITH   
#
# P IRVING																					   
# DATE 05/11/2020
# Update 05/08/2022
#
# P IRVING / K St-Claire 
# Date 25/07/2024 - Azure Authentication 
###########################################################################################################
from java.net import URL, HttpURLConnection, URLDecoder, URLEncoder, Proxy, InetSocketAddress
from java.nio.file import Files, Paths, StandardCopyOption
from java.nio.charset import StandardCharsets
from psdi.mbo import SqlFormat
from psdi.webclient.system.controller import WebClientEvent
from psdi.webclient.system.session import WebClientSession
from java.io import DataOutputStream, BufferedReader, InputStreamReader
from java.lang import StringBuffer
from com.ibm.json.java import JSONObject
from com.ibm.json.java import JSONArray
from com.ibm.tivoli.maximo.util import JSON
from com.ibm.tivoli.maximo.oslc import OslcUtils
from psdi.webclient.system.runtime import WebClientRuntime
from java.util import Hashtable, HashMap
from java.util import Base64


##################################################################################
#                          Azure Authentication                                  #
##################################################################################

azureAuth = service.getProperty("mce.sharepoint.auth")
#service.error("",azureAuth)
if azureAuth == "1":

    

    def get_protocol_and_domain(spbase):
        """Extracts the protocol and domain from the SharePoint base URL."""
        if spbase.startswith("https://"):
            return "https://", spbase[8:].split('/')[0]
        elif spbase.startswith("http://"):
            return "http://", spbase[7:].split('/')[0]
        return "", ""

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
            service.log_error("Error getting access token: %s", e)
            raise

    def convert_to_base64_url(sharepoint_link):
        """Converts SharePoint link to base64 format for Graph API."""
        cleaned_url = sharepoint_link.split('?')[0]  # Remove query parameters
        base64_url = Base64.getUrlEncoder().encodeToString(cleaned_url.encode('utf-8'))
        return base64_url

    def get_drive_item_from_sharepoint_link(urlname, bearer):
        """Fetches the drive item details from SharePoint link using Graph API."""
        base64_url = convert_to_base64_url(urlname)
        api_url = 'https://graph.microsoft.com/v1.0/shares/u!{}/driveItem'.format(base64_url)

        url = URL(api_url)
        con2 = url.openConnection()
        con2.setRequestMethod("GET")
        con2.setRequestProperty("Authorization", "Bearer {}".format(bearer))
        con2.setRequestProperty("Accept", "application/json")
        con2.setRequestProperty("Content-Type", "application/json")
        
        # Handle errors
        if con2.getResponseCode() == 401:
            service.error("","  401 Unautherised.  Invalid authentication. Ensure credentials are correct in system properties.") 
        elif con2.getResponseCode() == 402:
            service.error("","  402 Access Denied.  The sharing link no longer exists, or you do not have permission to access it. Contact your SharePoint Administrator.")
        elif con2.getResponseCode() == 403:
            service.error("","  403 Forbidden.  The server understands the request but refuses to authorize it. Contact your SharePoint Administrator.")  
        if con2.getResponseCode() == 404:
            service.error("","  404 Item Not Found.  Requested sharing link could not be found.")
 

        response = StringBuffer()
        inReader = BufferedReader(InputStreamReader(con2.getInputStream()))
        try:
            inputLine = inReader.readLine()
            while inputLine is not None:
                response.append(inputLine)
                inputLine = inReader.readLine()
        finally:
            inReader.close()

        resp = response.toString().encode('utf-8')
        return OslcUtils.bytesToJSONObject(resp)

    def getDownloadFromSite(urlname, spbase, bearer):
        """Handles the download logic for SharePoint links."""
        if ':/s/' in urlname:
            drive_item = get_drive_item_from_sharepoint_link(urlname, bearer)
            download = JSON.getString(drive_item, "@microsoft.graph.downloadUrl")
            filename = JSON.getString(drive_item, "name")
            filenamesplit = filename.split(".")
            fileext = filenamesplit[-1]
            return download, fileext
        else:
            return None, None

    def getDownload(urlname, spbase, bearer):
        try:
            urlByteArray = bytearray(urlname, "utf-8")
            encoder = Base64.getEncoder()
            encURL = encoder.encodeToString(urlByteArray)

            sharesURL = "https://graph.microsoft.com/v1.0/shares/u!{}/driveItem/".format(encURL)

            url = URL(sharesURL)
            con2 = url.openConnection()
            con2.setRequestMethod("GET")
            con2.setRequestProperty("Authorization", "Bearer {}".format(bearer))
            con2.setRequestProperty("Accept", "application/json")
            con2.setRequestProperty("Content-Type", "application/json")
            con2.setInstanceFollowRedirects(False)
            
            # Handle errors
            if con2.getResponseCode() == 401:
                service.error("","  401 Unautherised.  Invalid authentication. Ensure credentials are correct in system properties.") 
            elif con2.getResponseCode() == 402:
                service.error("","  402 Access Denied.  The sharing link no longer exists, or you do not have permission to access it. Contact your SharePoint Administrator.")
            elif con2.getResponseCode() == 403:
                service.error("","  403 Forbidden.  The server understands the request but refuses to authorize it. Contact your SharePoint Administrator.")  
            if con2.getResponseCode() == 404:
                service.error("","  404 Item Not Found.  Requested sharing link could not be found.")


            response = StringBuffer()
            inReader = BufferedReader(InputStreamReader(con2.getInputStream()))
            try:
                inputLine = inReader.readLine()
                while inputLine is not None:
                    response.append(inputLine)
                    inputLine = inReader.readLine()
            finally:
                inReader.close()

            resp = response.toString().encode('utf-8')

            jsonObject = OslcUtils.bytesToJSONObject(resp)
            download = JSON.getString(jsonObject, "@microsoft.graph.downloadUrl")
            filename = JSON.getString(jsonObject, "name")
            filenamesplit = filename.split(".")
            fileext = filenamesplit[-1]
            return download, fileext
        except:
            errorgroup = "sp"
            errorkey = "urlerror"
            return None, None

    # Main script execution starts here
    urlname = mbo.getString("URLNAME")
    spbase = service.getProperty("mce.sharepoint.url")
    protocol, sp = get_protocol_and_domain(spbase)
    download = ""
    fileext = ""

    # Validate the DOCTYPE and URLNAME to proceed
    if not mbo.isNull("DOCTYPE") and mbo.getString("DOCTYPE") != "SharePoint" and mbo.getBoolean("MCESPPRINT"):
        if urlname.startswith("{}{}".format(protocol, sp)):        
            # Get system properties for SharePoint integration
            client_id = service.getProperty("mce.sharepoint.client_id")
            client_secret = service.getProperty("mce.sharepoint.client_secret")
            realm = service.getProperty("mce.sharepoint.realm")
            
            # Obtain access token
            try:
                bearer = get_access_token(realm, client_id, client_secret)
            except Exception as e:
                mbo.setValue("MCESPURL", "Error obtaining access token")
                mbo.setValue("MCESPFILENAME", "Error")
                raise

            # Handle different types of SharePoint links
            try:
                if ':/s/' in urlname:
                    download, fileext = getDownloadFromSite(urlname, spbase, bearer)
                else:
                    download, fileext = getDownload(urlname, spbase, bearer)

            except Exception as e:
                mbo.setValue("MCESPURL", "Error handling URL")
                mbo.setValue("MCESPFILENAME", "Error")
                raise

            # Set the values in the mbo
            mbo.setValue("MCESPURL", download)
            name = "SP.{}.{}".format(mbo.getInt("OWNERID"), mbo.getUniqueIDValue())
            fullname = "{}.{}".format(name, fileext)
            mbo.setValue("MCESPFILENAME", fullname)





##################################################################################
#                          Access Control Authentication                         #
##################################################################################

elif azureAuth == "0":

    urlname = mbo.getString("URLNAME")
    spbase = service.getProperty("mce.sharepoint.url")
    download = ""
    fileext = ""
    protocol = ""

    #get everything after https://
    if spbase.startswith("https://"):
        sp = spbase[8:]
        protocol = "https://"
    elif spbase.startswith("http://"):
        sp = spbase[7:]
        protocol = "http://"

    sp = sp.split('/')[0]

    if mbo.isNull("DOCTYPE")==False and mbo.getString("DOCTYPE")!="SharePoint" and mbo.getBoolean("MCESPPRINT")==True:
        if urlname.startswith(protocol+sp) == True:
            
            #Get the Site
            site = ""
            if urlname.startswith(protocol+sp+"/sites/"):
                sites = urlname.split(protocol+sp+"/sites/")
                if len(sites)>1:
                    site = sites[len(sites)-1]
                    if site is not None:
                        site = site.split("/")[0]
                        site = "/sites/"+site
                        
            
            print "MCESPSAVE Starts"
            errored = False
            #Get System Properties
            client_id = service.getProperty("mce.sharepoint.client_id")
            client_secret = service.getProperty("mce.sharepoint.client_secret")
            realm = service.getProperty("mce.sharepoint.realm")
            client = service.getProperty("mce.sharepoint.spoclient")
            
            
            bearer = ""
            inputLine = ""


    #		try:

            #Get the Access Token for SharePoint
            aturl_str = "https://accounts.accesscontrol.windows.net/"+realm+"/tokens/OAuth/2"
            
            aturl = URL(aturl_str);
            con = aturl.openConnection()
            con.setRequestMethod("POST")
            con.setRequestProperty("Content-Type","application/x-www-form-urlencoded")
            body = "grant_type=client_credentials"+ "&"
            body = body + "client_id="+client_id+"@"+realm+ "&"
            body = body + "client_secret="+client_secret+ "&"
            body = body + "resource="+client+"/"+sp+"@"+realm

            # Send Post Request
            con.setDoOutput(True)
            wr = DataOutputStream(con.getOutputStream())
            wr.writeBytes(body)
            wr.flush()
            wr.close()

            # Handle errors
            if con.getResponseCode() == 401:
                service.error("","  401 Unautherised.  Invalid authentication. Ensure credentials are correct in system properties.") 
            elif con.getResponseCode() == 402:
                service.error("","  402 Access Denied.  The sharing link no longer exists, or you do not have permission to access it. Contact your SharePoint Administrator.")
            elif con.getResponseCode() == 403:
                service.error("","  403 Forbidden.  The server understands the request but refuses to authorize it. Contact your SharePoint Administrator.")  
            if con.getResponseCode() == 404:
                service.error("","  404 Item Not Found.  Requested sharing link could not be found.")

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
    #		except:
    #			errorgroup = "mcedpsp"
    #			errorkey = "accesstoken"


            if urlname.startswith(protocol+sp+"/:") == True:
                #it's a get a link 
                url = URL(urlname)
                con2 = url.openConnection()
                con2.setRequestMethod("GET")
                #con2.setInstanceFollowRedirects(False)
                con2.setRequestProperty("Authorization","Bearer "+bearer)
                con2.setRequestProperty("Accept","application/json;odata=verbose")
                    
                if urlname.startswith(protocol+sp+"/:t") or urlname.startswith(protocol+sp+"/:b") or urlname.startswith(protocol+sp+"/:i"):
                    #if it starts with :t it's text file, :b it's a pdf, i: it's an image
                    
                    con2.setInstanceFollowRedirects(False)
                    headers = con2.getHeaderFields();
                    location = con2.getHeaderField("LOCATION");
                    if urlname.startswith(protocol+sp+"/:t") or urlname.startswith(protocol+sp+"/:b"):
                        if location.find("id="):
                            location = location.split("id=")[1]
                        elif location.find("id%3D"):
                            location = location.split("id%3D")[1]
                        elif location.find("id%3d"):
                            location = location.split("id%3d")[1]

                        if location.find("%26"):
                            location = location.split("%26")[0]
                            #location = 'PAUL'+location

                        if location.find("&"):
                            location = location.split("&")[0]
                            #location = 'KEV'+location
                        
                    else:
                        if location.find("id="):
                            location = location.split("id=")[1]
                            location = location.split("&")[0]
                            
                    download = location.replace("%252F","/")
                    download = download.replace("%252E",".")
                    download = download.replace("%252f","/")
                    download = download.replace("%252e",".")
                    download = download.replace("%2F","/")
                    download = download.replace("%2E",".")
                    download = download.replace("%2f","/")
                    download = download.replace("%2e",".")

                    filenamesplit = download.split(".")
                    fileext = filenamesplit[len(filenamesplit)-1]
                    
                    download = URLEncoder.encode(download)
                    download = download.replace("%2F","/")
                    download = download.replace('+','%20')
                    download = download.replace("%255F","_")
                    
                    download = spbase+site+"/_api/web/GetFileByServerRelativeUrl('"+download+"')/$value"

                    if fileext=="" and urlname.startswith(protocol+sp+"/:t"):
                        fileext="txt"
                    
                    if fileext=="" and urlname.startswith(protocol+sp+"/:b"):
                        fileext="pdf"
                    
                    if fileext=="" and urlname.startswith(protocol+sp+"/:i"):
                        fileext="jpg"
                    
                else:
                    #:x is excel, :w is word, :p is powerpoint
                    inReader = BufferedReader(InputStreamReader(con2.getInputStream()))
                    response = StringBuffer()
                    inputLine = inReader.readLine()
                    while (inputLine is not None):
                        #While 1 begins
                        response.append(inputLine)
                        inputLine = inReader.readLine()
                        #While 1 ends

                    inReader.close()
                    download = "/_layouts/15/download.aspx?UniqueId="
                    document = response.toString().lower()
                    document = document.split("sourcedoc=%7b")
                    document = document[1].split("%7d")

                    first = response.toString()
                    if "webAbsoluteUrl\":\"" in first:
                        #if first.find("webAbsoluteUrl\":\""):
                        first = first.split("webAbsoluteUrl\":\"")[1]
                        first = first.split("\"")[0]
                        download = first + download
                    else:
                        download = spbase+download
                    
                    download = download+document[0]
                    
                    #use the download url to get the file name/ext
                    testURL = URL(download)
                    testCon = testURL.openConnection()
                    testCon.setRequestMethod("GET")
                    testCon.setRequestProperty("Authorization","Bearer "+bearer)
                    
                    testHeaders = testCon.getHeaderFields()
                    contDisp = testCon.getHeaderField("Content-Disposition")
                    
                    if contDisp is not None and contDisp!="":
                        if contDisp.find('filename="'):
                            fileext = contDisp.split('filename="')[1]
                            fileext = fileext.split('"')[0]
                    
                    
            elif "?sourcedoc=" in urlname.lower() and "/_layouts/15/" in urlname.lower():
                download = "/_layouts/15/download.aspx?UniqueId="
                document = urlname.lower()
                document = document.split("sourcedoc=%7b")
                document = document[1].split("%7d")
                first = urlname.split("/_layouts/15/")[0]
                download = first+download+document[0]
                
                if "file=" in urlname:
                    urlsplit = urlname.split("file=")
                    urlsplit = urlsplit[1].split("&")
                    filename = urlsplit[0]
                    filenamesplit = filename.split(".")
                    fileext = filenamesplit[len(filenamesplit)-1]
            
            elif "lightbox" in urlname.lower() and "url=" in urlname:
                #it's an image browser url, get the url of the image direct
                if download.find("url="):
                    download = urlname.split("url=")[1]
                download = download.split("&")[0]
                download = download.split(URLEncoder.encode(spbase+"/", StandardCharsets.UTF_8.name()))[1]
                download = "/"+download
                urlsplit = download.split("/")
                filename = urlsplit[len(urlsplit)-1]
                filenamesplit = filename.split(".")
                fileext = filenamesplit[len(filenamesplit)-1]
                
                download = URLEncoder.encode(download)
                download = download.replace("%2F","/")
                download = download.replace('+','%20')
                #generate the url to get it 
                download = spbase+site+"/_api/web/GetFileByServerRelativeUrl('"+download+"')/$value"
                
            else:
                #its a path or browser link, remove anything after the ?
                download = urlname[len(sp)+8:]
                download = download.split("?")[0]
                urlsplitstr = URLDecoder.decode(download, StandardCharsets.UTF_8.name())
                urlsplit = urlsplitstr.split("/")
                filename = urlsplit[len(urlsplit)-1]
                filenamesplit = filename.split(".")
                fileext = filenamesplit[len(filenamesplit)-1]
                
                download = URLEncoder.encode(download)
                download = download.replace("%2F","/")
                download = download.replace('+','%20')
                #generate the url to get it 
                download = spbase+site+"/_api/web/GetFileByServerRelativeUrl('"+download+"')/$value"
                
        mbo.setValue("MCESPURL",download)
        name = "SP."+str(mbo.getInt("OWNERID"))+"."+str(mbo.getUniqueIDValue())	       
        fullname = name+"."+fileext
        mbo.setValue("MCESPFILENAME",fullname)

else:
    service.error(""," The system proptety mce.sharepoint.auth must be 1 or 0.")


