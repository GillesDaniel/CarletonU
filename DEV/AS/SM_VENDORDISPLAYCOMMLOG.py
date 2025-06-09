from java.util import GregorianCalendar
from java.io import FileOutputStream
from java.text   import SimpleDateFormat
from psdi.util import CommonUtil
from psdi.server   import MXServer
import sys
from java.util.regex import Pattern
from java.util.regex import Matcher
from com.ibm.tivoli.maximo.report.birt.runtime import ReportParameterData
from java.io   import File  




def isEmailAddressValid(emailAddress):
    VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
    
    matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(str(emailAddress))
    return matcher.find()
    
    

def loadRFQ(newCommlog) :
    
    cy =  GregorianCalendar()
    date = cy.getTime()
    sdf =  SimpleDateFormat("MMddkkmmss")
  
    commtemp = MXServer.getMXServer().getProperty("sm.sendbyemail.rfqcomm")
    value = MXServer.getMXServer().getProperty("sm.sendbyemail.rfqreport")
        
  
    if (""!=value and ""!=commtemp):
        flag =mbo.getString("vendor")
        vendorSet = mbo.getMboSet("companies")
        vendor = vendorSet.moveFirst()
        langue = ""
        if (vendor is not None):
            langue = vendor.getString("SM_LANGCODE")
        val = ""
        if ("EN"==langue or ""==langue):
            val = "_EN"
        else:
            val = "_FR"
        
            
        birtAdmService =  MXServer.getMXServer().lookup("BIRTREPORT")
        parameterData =  ReportParameterData()
        mxs = clientSession.getMXSession()
        doclinkService = mxs.getMXServerRemote().lookup("DOCLINK")
        dirName = doclinkService.getDefaultFilePath("Attachments", mxs.getUserInfo())
   
            
        path = dirName + File.separator + "RFQ" + sdf.format(date) + ".pdf" 
   
        f =  File(path)
        parameterData.addParameter("where", rfq.getUniqueIDName() + "=" +str( rfq.getUniqueIDValue()))
        abyte0 = birtAdmService.runReport(rfq.getUserInfo(), value, appName, parameterData,f.getName(), "pdf")
        try:
            fos =  FileOutputStream(f)
            fos.write(abyte0)
            fos.flush()
            fos.close()
            ##f.save()
            
            
            
        except:
            
           print "Exception in generating report",sys.exc_info();
            
	    			
        ##commLog = mbo
        sendfromMbo = rfq.getMboSet("SM_PURCHASEAGENT").moveFirst()
    
        newCommlog.setValue("TEMPLATEID", commtemp + val)
        newCommlog.setValue("SENDFROM", sendfromMbo.getString("PRIMARYEMAIL"))
        
        newCommlog.setValue("SM_VENDOR", flag)
        newCommlog.setValue("SENDTO", mbo.getString("email"))
       
        docLinkSet = newCommlog.getMboSet("DOCLINKS")
      
        docLink = docLinkSet.addAtEnd()
        docLink.setValue("DOCUMENT", f.getName(), 11L)
        docLink.setValue("OWNERTABLE", "COMMLOG", 11L);
        
            
        docLink.setValue("OWNERID", newCommlog.getString("COMMLOGUID"), 11L);
        docLink.setValue("DOCTYPE", "Attachments", 11L);
        docLink.setValue("GETLATESTVERSION", 1, 11L);
        docLink.setValue("PRINTTHRULINK", 1, 11L);
        docLink.setValue("COPYLINKTOWO", 0, 11L);
        docLink.setValue("CREATEDATE", MXServer.getMXServer().getDate(), 11L);
        docLink.setValue("CREATEBY", rfq.getUserInfo().getDisplayName(), 11L);
        urlType = mbo.getTranslator().toExternalDefaultValue("URLTYPE", "FILE", docLink);
        docLink.setValue("URLTYPE", urlType, 2L);
        docLink.setValue("URLNAME", path, 2L);
        docInfoSet = docLink.getMboSet("DOCINFO");
        docInfo = docInfoSet.add();
        docLink.setValue("DOCINFOID", docInfo.getUniqueIDValue(), 11L);
        docInfo.setValue("DOCUMENT", f.getName(), 11L);
        docInfo.setValue("DESCRIPTION", f.getName(), 11L);
        docInfo.setValue("CREATEDATE", MXServer.getMXServer().getDate(), 11L);
        docInfo.setValue("CREATEBY", rfq.getUserInfo().getDisplayName(), 11L);
        docInfo.setValue("DOCTYPE", "Attachments", 11L);
        docInfo.setValue("PRINTTHRULINKDFLT", 1, 11L);
        docInfo.setValue("USEDEFAULTFILEPATH", 1, 11L);
        docInfo.setValue("SHOW", 1, 11L);
        docInfo.setValue("URLTYPE", urlType, 11L);
        docInfo.setValue("URLNAME", path, 11L);
        docLink.setValue("weburl",CommonUtil.calcWebUrl(docInfo))
           
            ##docLinkSet.save()
    
    
        


def no():
  
    print "Cancel Send Email" 

def dflt():
    service.yncerror("sm", "rfqalreadysent")



 
def yes():
    
    newCommlog=newCommlogSet.add()
    loadRFQ(newCommlog)
    clientSession.loadDialog("SM_CREATECOMM")













clientSession=service.webclientsession()
rfq = clientSession.getCurrentApp().getAppBean().getMbo()
newCommlogSet=rfq.getMboSet("COMMLOG")
appName=mbo.getThisMboSet().getParentApp()
if(not mbo.getBoolean("SM_ALREADYSENT")):
    purchase=rfq.getMboSet("SM_PURCHASEAGENT").moveFirst()
    if(rfq.isNull("PURCHASEAGENT") or (purchase is None)):
        errorgroup ="sm"
        errorkey = "purchaseagentrequired"
    elif(not isEmailAddressValid(purchase.getString("PRIMARYEMAIL"))): 
        errorgroup = "sm"
        errorkey = "emailPurchageAgentNotValide"
        params=[purchase.getString("PRIMARYEMAIL"),purchase.getString("personid")]
    elif(not isEmailAddressValid(mbo.getString("EMAIL"))): 
        errorgroup = "sm"
        errorkey = "emailNotValid"
        params=[mbo.getString("vendor")]
    
    else:
        newCommlog=newCommlogSet.add()
        loadRFQ(newCommlog)
        clientSession.loadDialog("SM_CREATECOMM")
else:
    cases = {service.YNC_NULL:dflt,service.YNC_YES:yes,service.YNC_NO:no}
    x = service.yncuserinput()
    cases[x]()
clientSession.getDataBean("SM_SENDRFQ").refreshTable()