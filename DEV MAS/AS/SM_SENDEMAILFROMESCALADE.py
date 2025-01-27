##Carleton:This Action is modified for Carleton Spacification
## Updated Date: 2022-11-21
##Lastupdate Date 2023-04-04
##Change doc link  file name 



import java
from psdi.server import MXServer
from java.text import SimpleDateFormat
from java.io import File
from java.io import FileOutputStream
from java.sql  import Timestamp
from java.util import Calendar 
from java.util import Date 
from com.ibm.tivoli.maximo.report.birt.admin import ReportAdminServiceRemote
from com.ibm.tivoli.maximo.report.birt.runtime  import ReportParameterData
from psdi.common.commlog import CommLog
from psdi.mbo import MboConstants
import sys
from  java.util.regex import Matcher;
from  java.util.regex import Pattern;
from java.util import GregorianCalendar


servDT = MXServer.getMXServer().getDate()
df = java.text.SimpleDateFormat("yyyyMMddHHmm")
dfnow = java.text.SimpleDateFormat("kk:mm:s:S")
today = MXServer.getMXServer().getDate()
now = dfnow.format(today)
today = df.format(today)
global flag;
def runReport(v_reportname,v_appname,v_ownerid,v_obj,mbo):
	global v_filename;
	global path;
	
	birtAdmService = MXServer.getMXServer().lookup("BIRTREPORT");
	doclinkService = MXServer.getMXServer().lookup("DOCLINK");
	dirName = doclinkService.getDefaultFilePath("Attachments",mbo.getUserInfo());
	
	if (dirName is not None and v_obj=="PO"):
	    cy =  GregorianCalendar()
	    date = cy.getTime()
	    sdf =  SimpleDateFormat("MMdd")
	    path = dirName + File.separator + "PO" +str(po.getString("ponum")[-9:])+str(po.getInt("REVISIONNUM"))+ sdf.format(date) + ".pdf"
	    ##path = dirName + File.separator + v_obj + today + ".pdf";
	    f = File(path);
	    parameterData=ReportParameterData();
	    parameterData.addParameter("where","PO.PONUM='"+str(mbo.getString("ponum"))+"' and PO.siteid='"+mbo.getString("SITEID")+"'");
	    v_filename = f.getName();
	    abyte0 = birtAdmService.runReport( mbo.getUserInfo(), v_reportname, v_appname, parameterData, f.getName(),"pdf" );
	elif(dirName is not None and v_obj=="RFQ"):
		path = dirName + File.separator + v_obj + today + ".pdf";
		f = File(path);
		
		parameterData=ReportParameterData();		
		parameterData.addParameter("where","rfq.rfqnum='"+str(mbo.getString("rfqnum"))+"' and rfq.siteid='"+mbo.getString("SITEID")+"'");
		parameterData.addParameter("SM_VENDOR", flag);
		v_filename = f.getName();
		abyte0 = birtAdmService.runReport( mbo.getUserInfo(), v_reportname, v_appname, parameterData, f.getName(),"pdf" );
	elif(dirName is not None and v_obj=="PR"):
		path = dirName + File.separator + v_obj + today + ".pdf";
		f = File(path);
		parameterData=ReportParameterData();
		#parameterData.addParameter("fscvendor",mbo.getString("VENDOR"));
		parameterData.addParameter("where","PR.PRNUM='"+str(mbo.getUniqueIDValue())+"' and PR.siteid='"+mbo.getString("SITEID")+"'");
		v_filename = f.getName();
		
		abyte0 = birtAdmService.runReport( mbo.getUserInfo(), v_reportname, v_appname, parameterData, f.getName(),"pdf" );
	try :
		fos = FileOutputStream(f.getAbsolutePath());
		fos.write(abyte0);
		fos.flush();
		fos.close();
	except :
		print "Exception in send email"
			


def isValid(email):
	emailRegex = "^[-\w+.%]+@[\w-.]+\.[A-Za-z]{2,4}(?:,[-\w+.%]+@[\w-.]+\.[A-Za-z]{2,4}){0,4}$";
	pat = Pattern.compile(emailRegex);
	if (email ==""):
		return False;
	return pat.matcher(email).matches();



def checkValidEmail(cmlog,sendTo):
	if(cmlog.getString("sendfrom")==""):
		sendTo.setValue("message","Please enter a sender e-mail address.");
		return False;
	elif(cmlog.getString("sendto")==""):
		sendTo.setValue("message","The recipient e-mail address might be incorrect, or your system administrator might need to verify that your e-mail account is set up correctly. See the associated message.");
		return False;
	elif(cmlog.getString("sendto")!=""):
		if (isValid(cmlog.getString("sendto"))):
			return True;
		else:
			sendTo.setValue("message","Adress mail is not Valid");
			return False;
	
	
	
def sendComm(s_templateId,s_subject,mbo,sendTo,email):
	if(s_templateId is not None):
		s_templateId = s_templateId.encode('utf-8')
		s_templateId = s_templateId.decode('utf-8')		
	whereclause = "TEMPLATEID = '"+s_templateId+"'"
	ctMboSet = MXServer.getMXServer().getMboSet("COMMTEMPLATE",mbo.getUserInfo())
	ctMboSet.setWhere(whereclause);	
	ctMboSet.reset();	
	ctMbo = ctMboSet.getMbo(0)
	try:
		#ctMbo.setValue("SUBJECT",s_subject, MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION)
		commlogSet = mbo.getMboSet("COMMLOG");
		commLog = commlogSet.add();
	
		commLog.setValue("TEMPLATEID", s_templateId);
		## The send from added for CARLETON
		commLog.setValue("sendfrom", MXServer.getMXServer().getProperty("mxe.smtp.user"));
		if(sendTo.getString("OWNERTABLE") == "RFQ"):
			commLog.setValue("sendto", email);
		else:
		    ## CArleton: Add Send to cc for carleton specification
		    commLog.setValue("sendto", mbo.getString("EMAIL"))
		    commLog.setValue("cc",mbo.getString("CU_POEMAILCC"))
		    
		docLinkSet = commLog.getMboSet("DOCLINKS");
		docLink = docLinkSet.add();
		#print "1:"+v_filename;
		docLink.setValue("DOCUMENT", v_filename, MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docLink.setValue("OWNERTABLE", "COMMLOG", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docLink.setValue("OWNERID", commLog.getString("COMMLOGUID"), MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docLink.setValue("DOCTYPE", "Attachments", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docLink.setValue("GETLATESTVERSION", "1", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docLink.setValue("PRINTTHRULINK", "1", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docLink.setValue("COPYLINKTOWO", "0", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docLink.setValue("CREATEDATE", MXServer.getMXServer().getDate(), MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docLink.setValue("CREATEBY", commlogSet.getUserInfo().getDisplayName(), MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		urlType = commLog.getTranslator().toExternalDefaultValue("URLTYPE", "FILE", docLink);
		docLink.setValue("URLTYPE", urlType, MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docLink.setValue("URLNAME", path, MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfoSet = docLink.getMboSet("DOCINFO");
		docInfo = docInfoSet.add();
		docLink.setValue("DOCINFOID", docInfo.getUniqueIDValue(), MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);	
		docInfo.setValue("DOCUMENT", v_filename, MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfo.setValue("DESCRIPTION", v_filename, MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfo.setValue("CREATEDATE", MXServer.getMXServer().getDate(), MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfo.setValue("CREATEBY", commlogSet.getUserInfo().getDisplayName(), MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfo.setValue("DOCTYPE", "Attachments", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfo.setValue("PRINTTHRULINKDFLT", "1", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfo.setValue("USEDEFAULTFILEPATH", "1", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfo.setValue("SHOW", "1", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfo.setValue("URLTYPE", urlType, MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);
		docInfo.setValue("URLNAME", path, MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION_AND_NOACTION);		
		if commLog is not None:
			if(checkValidEmail(commLog,sendTo)==True ):
				commLog.sendMessage();
				return True;
			else :
				commLog.delete()
				return False;

	except:
		print ": exception" , sys.exc_info()
		sendTo.setValue("message",str(sys.exc_info()[1]));
		return False;





sendTo = mbo;
try:
	sendTo.setValue("TOSEND",0);
	if(sendTo.getString("OWNERTABLE") == "RFQ"):
		rfqSet = sendTo.getMboSet("$RFQ","RFQ","rfqid='"+str(sendTo.getInt("OWNERID"))+"'");
		rfq=rfqSet.moveFirst();
		v_report=MXServer.getMXServer().getProperty("sm.sendbyemail.rfqreport");
		v_commtemplate=MXServer.getMXServer().getProperty("sm.sendbyemail.rfqcomm");
		v_commtemplate=v_commtemplate+"_"+sendTo.getString("langcode");
		v_ownerid=sendTo.getInt("ownerid");
		v_appname=sendTo.getString("APP");
		v_obj="RFQ";
		s_subject="RFQ";
		if rfq is not None :
			rfqVendorSet=rfq.getMboSet("$RFQVENDOR","RFQVENDOR","RFQVENDOR.rfqnum='"+str(rfq.getString("rfqnum"))+"' and RFQVENDOR.siteid='"+str(rfq.getString("siteid"))+"' and RFQVENDOR.vendor='"+str(sendTo.getString("vendor"))+"'");
			rfqVendor=rfqVendorSet.getMbo(0);
			if rfqVendor is not None:
				flag=rfqVendor.getString("vendor")
				email=rfqVendor.getString("EMAIL");
				if (email != ""):
					runReport(v_report,v_appname,v_ownerid,v_obj,rfq);	
					if(sendComm(v_commtemplate,s_subject,rfq,sendTo,email)):
						sendTo.setValue("ISSENT",1);
						sendTo.setValue("SENDDATE",servDT);
						rfqVendorSent=sendTo.getMboSet("RFQVENDOR").moveFirst()
						if(rfqVendorSent is not None):
						    if(rfqVendorSent.getBoolean("SM_ALREADYSENT")):
							   rfqVendorSent.setValue("SM_ALREADYSENT", True)
						     
						#rfqSet.save();
				#sendTo.setValue("TOSEND",0);
		else:
			sendTo.setValue("message","Record doesn't exist!");
				
	elif(sendTo.getString("OWNERTABLE") == "PO"):
		poSet = sendTo.getMboSet("$PO","PO","poid='"+str(sendTo.getInt("OWNERID"))+"'");
		po=poSet.moveFirst();
		if(po is not None):
			v_ownerid=sendTo.getInt("ownerid");
			v_appname=sendTo.getString("APP");
			v_obj="PO";
			if(sendTo.getBoolean("ISPORELANCE") == 0):
				s_subject="PO";	
				v_report=MXServer.getMXServer().getProperty("sm.sendbyemail.poreport");
				s_comm=MXServer.getMXServer().getProperty("sm.sendbyemail.pocomtemplate");
				s_comm=s_comm+"_"+sendTo.getString("langcode");
			elif(sendTo.getBoolean("ISPORELANCE") ==1):
				s_subject="PO";	
				v_report=MXServer.getMXServer().getProperty("sm.sendbyemail.porelancereport");
				s_comm=MXServer.getMXServer().getProperty("sm.sendbyemail.porelancecomtemlate");
				s_comm=s_comm+"_"+sendTo.getString("langcode");
			runReport(v_report,v_appname,v_ownerid,v_obj,po);
			if(sendComm(s_comm,s_subject,po,sendTo,po)):
				sendTo.setValue("ISSENT",1);		
				sendTo.setValue("SENDDATE",servDT);
				##if(not po.getBoolean("SM_SENDEMAIL")):
				  ## sendPo=mbo.getMboSet("PO").moveFirst()
				   ##if(sendPo is not None):
				       ##sendPo.setValue("SM_SENDEMAIL",True,11L)
				   
			#poSet.save();
		else:
			sendTo.setValue("message","PO doesn't exist!");
except:
	print ": exception" , sys.exc_info()
	sendTo.setValue("message",str(sys.exc_info()[1]));


###############################
#### changement de status #####
###############################

statusTo = mbo;
if(statusTo.getBoolean("ISSENT")):
	if(statusTo.getString("OWNERTABLE") == "RFQ"):
		rfqSet = statusTo.getMboSet("$RFQ","RFQ","rfqid='"+str(statusTo.getInt("OWNERID"))+"'");
		rfq=rfqSet.moveFirst();
		rfqVendorSet=rfq.getMboSet("RFQVENDOR")
		rfqVendor=rfqVendorSet.moveFirst()
		while (rfqVendor is not None):
		    if(rfqVendor.getString("VENDOR")==mbo.getString("VENDOR")):
		        rfqVendor.setValue("SM_ALREADYSENT",True,11L)
		        
		    
		    rfqVendor=rfqVendorSet.moveNext()
		    
		
		status = MXServer.getMXServer().getProperty("sm.sendbyemail.rfqstatus");
		if (status!=""):
			submapping = status.split(";");
			laststatus = submapping[0];
			newstatus = submapping[1];
			if (laststatus==rfq.getString("status")):
				rfq.changeStatus(newstatus, MXServer.getMXServer().getDate(), "");		
		#rfqSet.save();		
	elif(statusTo.getString("OWNERTABLE") == "PO"):
		poSet = statusTo.getMboSet("$PO","PO","poid='"+str(statusTo.getInt("OWNERID"))+"'");
		po=poSet.moveFirst();		
		if(statusTo.getBoolean("ISPORELANCE") == 0):
		    if(not po.getBoolean("SM_SENDEMAIL")):
		        po.setValue("SM_SENDEMAIL",True,11L)
			status = MXServer.getMXServer().getProperty("sm.sendbyemail.postatus");
			if (status!=""):
				submapping = status.split(";");
				laststatus = submapping[0];
				newstatus = submapping[1];
				if (laststatus==po.getString("status")):
					po.changeStatus(newstatus, MXServer.getMXServer().getDate(), "");
		#poSet.save();