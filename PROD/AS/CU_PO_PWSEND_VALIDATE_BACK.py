### This Action Not In standard Package
### Carleton: Is add for the carleton specification
### Add date :2022-11-21
### Validate email to sned in cc in PO.PWSEND is not empty 
##Add By SA SMARTECH 2023-04-18
## Update BY SA SMARTECH Can Send to Muti Addresse Email  2023-04-18

from java.util.regex import Pattern
from java.util.regex import Matcher



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

def ccIsEmailsValid(emailsAddress):
    emailsAddress=emailsAddress.replace(" ","")
    emails=emailsAddress.split(",")
   
    for  i in range(len(emails)):
        VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
        email=emails[i]
        matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(str(email.replace(' ', '')))
        if(not matcher .find() ):
            return email
        
    return ""    
    
    
def isEmailAddressValid(emailAddress):
    VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE)
    
    matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(str(emailAddress))
    return matcher.find()   
    
    
    
clientSession=service.webclientsession()

po=clientSession.getCurrentApp().getAppBean().getMbo()  
if(po is not None and po.getName()=="PO"):
    validateCCEmail=ccIsEmailsValid(po.getString("CU_POEMAILCC"))
    validateMultiEmail=multiEmailsValid (po.getString("EMAIL"))	
    if(mbo.getBoolean("SM_AUTOSENDEMAIL")):
       ## if(po.getMboSet("SM_PURCHASEAGENT.EMAIL").moveFirst() is not None):
        ##    email=po.getMboSet("SM_PURCHASEAGENT.EMAIL").moveFirst()
            
          ##  if(not isEmailAddressValid(email.getString("EMAILADDRESS"))):
            ##    errorgroup = "sm"
            ##    errorkey = "emailPurchageAgentNotValide"
            ##    params=[email.getString("EMAILADDRESS"),po.getString("PURCHASEAGENT")]
        if( not  po.isNull("EMAIL") and validateMultiEmail!=""):
            errorgroup = "sm"
            errorkey = "emailNotValid"
            params=[po.getString("email")]  
        elif( not  po.isNull("CU_POEMAILCC") and validateCCEmail!=""):
                errorgroup = "cu"
                errorkey = "emailNotValid"
                params=[validateCCEmail]    
        ##else:
        ##    errorgroup = "sm"
        ##    errorkey = "purchaseagentrequired"

scriptConfig="""{
    "autoscript": "CU_PO_PWSEND_VALIDATE_BACK",
    "description": "Validate Emails when PWSEND is checked",
    "version": "",
    "active": false,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "CU_PO_PWSEND_VALIDATE",
            "launchPointType": "ATTRIBUTE",
            "active": false,
            "description": "Validate Emails when PWSEND is checked",
            "objectName": "PO",
            "attributeName": "SM_AUTOSENDEMAIL",
            "validate": true
        }
    ]
}"""