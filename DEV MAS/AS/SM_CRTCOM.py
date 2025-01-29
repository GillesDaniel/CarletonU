### This action is modified for clinet carleton 
#### Updated Date: 2022-11-21
##Lastupdate Date 2023-04-04
##Change doc link  file name 

### This Action Not In standard Package
### Carleton: Is add for the carleton specification
### Add date :2022-11-21
### Validate email to sned in cc in PO.PWSEND is not empty 
##Add By SA SMARTECH 2023-04-18
## Update BY SA SMARTECH Can Send to Muti Addresse Email  2023-04-18

from java.util import GregorianCalendar
from java.io import FileOutputStream
from java.text   import SimpleDateFormat
from psdi.util import CommonUtil
from psdi.server   import MXServer
from java.util.regex import Pattern
from java.util.regex import Matcher
import sys
from com.ibm.tivoli.maximo.report.birt.runtime import ReportParameterData
from java.io   import File  


def multiEmailsValid(emailsAddress):
    emailsAddress=emailsAddress.replace(" ","")
    emails=emailsAddress.split(",")
   
    for  i in range(len(emails)):
        VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
        email=emails[i]
        matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(str(email))
        if(not matcher .find() ):
            return email
        
    return "" 

## Validate CC email Function
def ccIsEmailsValid(emailsAddress):
    emailsAddress=emailsAddress.replace(" ","")
    emails=emailsAddress.split(",")
   
    for  i in range(len(emails)):
        VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
        email=emails[i]
        matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(str(email))
        if(not matcher .find() ):
            return email
        
    return ""    
    




def isEmailAddressValid(emailAddress):
    VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
    
    matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(str(emailAddress))
    return matcher.find()
def load(newCommlog) :
    
    cy =  GregorianCalendar()
    date = cy.getTime()
    sdf =  SimpleDateFormat("MMdd")
    commtemp = MXServer.getMXServer().getProperty("sm.sendbyemail.pocomtemplate")
    value = MXServer.getMXServer().getProperty("sm.sendbyemail.poreport")
 
        
  
    if (""!=value and ""!=commtemp):
        flag =po.getString("vendor")
        ##Carleton Send Email disabled : Get Language from default system language
        ##vendorSet = po.getMboSet("VENDOR")
        ##vendor = vendorSet.moveFirst()
        ##langue = ""
        ##if (vendor is not None):
          ##  langue = vendor.getString("SM_LANGCODE")
        ##val = ""
        ##if ("EN"==langue or ""==langue):
          ##  val = "_EN"
        ##else:
          ##  val = "_FR"
        ## Carleton get template language from base language   
        val ="_"+ str(mbo.getMboServer().getMaxVar().getString("BASELANGUAGE", None))
            
        birtAdmService =  MXServer.getMXServer().lookup("BIRTREPORT")
        parameterData =  ReportParameterData()
        mxs = clientSession.getMXSession()
        doclinkService = mxs.getMXServerRemote().lookup("DOCLINK")
        dirName = doclinkService.getDefaultFilePath("Attachments", mxs.getUserInfo())
   
            
        path = dirName + File.separator + "PO" +str(po.getString("ponum")[-9:])+str(po.getInt("REVISIONNUM"))+ sdf.format(date) + ".pdf" 
      
        f =  File(path)
        parameterData.addParameter("where", po.getUniqueIDName() + "=" +str( po.getUniqueIDValue()))
        abyte0 = birtAdmService.runReport(po.getUserInfo(), value, appName, parameterData,f.getName(), "pdf")
        try:
            fos =  FileOutputStream(f)
            fos.write(abyte0)
            fos.flush()
            fos.close()
            
            
        except:
            
           print "Exception in generating report",sys.exc_info();
            
					
        ##commLog = mbo
        sendfromMbo = po.getMboSet("SM_PURCHASEAGENT.EMAIL").moveFirst()
        
        newCommlog.setValue("TEMPLATEID", commtemp + val)
        ## Modified for Client CARLETON
        ##newCommlog.setValue("SENDFROM", sendfromMbo.getString("emailaddress"))
        newCommlog.setValue("SENDFROM", MXServer.getMXServer().getProperty("mxe.smtp.user"))
        newCommlog.setValue("cc", po.getString("CU_POEMAILCC"))
        
        newCommlog.setValue("SM_VENDOR", flag)
       
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
        docLink.setValue("CREATEBY", po.getUserInfo().getDisplayName(), 11L);
        urlType = newCommlog.getTranslator().toExternalDefaultValue("URLTYPE", "FILE", docLink);
        docLink.setValue("URLTYPE", urlType, 11L);
        docLink.setValue("URLNAME", path, 11L);
        docInfoSet = docLink.getMboSet("DOCINFO");
        docInfo = docInfoSet.add();
        docLink.setValue("DOCINFOID", docInfo.getUniqueIDValue(), 11L);
        docInfo.setValue("DOCUMENT", f.getName(), 11L);
        docInfo.setValue("DESCRIPTION", f.getName(), 11L);
        docInfo.setValue("CREATEDATE", MXServer.getMXServer().getDate(), 11L);
        docInfo.setValue("CREATEBY", po.getUserInfo().getDisplayName(), 11L);
        docInfo.setValue("DOCTYPE", "Attachments", 11L);
        docInfo.setValue("PRINTTHRULINKDFLT", 1, 11L);
        docInfo.setValue("USEDEFAULTFILEPATH", 1, 11L);
        docInfo.setValue("SHOW", 1, 11L);
        docInfo.setValue("URLTYPE", urlType, 11L);
        docInfo.setValue("URLNAME", path, 11L);
        docLink.setValue("weburl",CommonUtil.calcWebUrl(docInfo))
           
           ## docLinkSet.save()
    
    





def no():
   ## deleteCommLog()
    print "Cancel Send Email" 

def dflt():
    service.yncerror("sm", "alreadySent")



 
def yes():
    commLogSet=po.getMboSet("COMMLOG")
    newCommlog= commLogSet.add()
    load(newCommlog)
    clientSession.loadDialog("SM_CRTCOM")
    
    
clientSession=service.webclientsession()
appName=mbo.getThisMboSet().getParentApp()
po=clientSession.getCurrentApp().getAppBean().getMbo()
newCommlog=None
validateCCEmail=ccIsEmailsValid (po.getString("CU_POEMAILCC"))

poVendor=po.getMboSet("PO_VENDOR").moveFirst()
##if(po.getMboSet("SM_PURCHASEAGENT.EMAIL").moveFirst() is not None):
if(True):
    validateMultiEmail=multiEmailsValid (po.getString("EMAIL"))
    email=po.getMboSet("SM_PURCHASEAGENT.EMAIL").moveFirst()
    ##if(not isEmailAddressValid(email.getString("EMAILADDRESS"))):
    if(False):
        errorgroup = "sm"
        errorkey = "emailPurchageAgentNotValide"
        params=[email.getString("EMAILADDRESS"),po.getString("PURCHASEAGENT")]
    ## Carleton Specification:    change email vendor COMPANIES.SM_PWEMAIL with PO.EMAIL
  
    elif( not  po.isNull("EMAIL") and validateMultiEmail!=""):
        errorgroup = "sm"
        errorkey = "emailNotValid"
        params=[po.getString("email")]
    ## Carleton: Validate the CC email Address from PO.CU_POEMAILCC if not empty .    
    elif( not  po.isNull("CU_POEMAILCC") and validateCCEmail!=""):
        errorgroup = "cu"
        errorkey = "emailNotValid"
        params=[validateCCEmail] 
    else:
        if (po.getBoolean("SM_SENDEMAIL")):
            cases = {service.YNC_NULL:dflt,service.YNC_YES:yes,service.YNC_NO:no}
            x = service.yncuserinput()
            cases[x]()
   
        else:
            newCommlog= po.getMboSet("COMMLOG").add()
            load(newCommlog)
            clientSession.loadDialog("SM_CRTCOM")
else:
        errorgroup = "sm"
        errorkey = "purchaseagentrequired"