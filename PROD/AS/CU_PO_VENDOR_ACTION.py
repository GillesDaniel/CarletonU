## Created Date: 2023-01-4
###Created By Aymen SAAFI SMARTECH
####Get email Company to set in PO.EMAIL
#### Update Date:2023-01-10
#### 2023-01-10: get Email from companies.SM_PWEMAIL if exists else get the first email contact 



### getEmailFromContact function to return the compcontact email if exist
def getEmailFromContact(vendor):
    contactSet=vendor.getMboSet("CONTACT")
    contact=contactSet.moveFirst()
    while (contact is not None):
        if(not contact.isNull("EMAIL")):
            return contact.getString("EMAIL")
        contact=contactSet.moveNext()
    return ""



###Main

vendor=mbo.getMboSet("VENDOR").moveFirst()
if(vendor is not None):
    if( not vendor.isNull("SM_PWEMAIL")):
        mbo.setValue("EMAIL",vendor.getString("SM_PWEMAIL"),2L)
        
    else:
        email=getEmailFromContact(vendor)
        mbo.setValue("EMAIL",email,2L)

scriptConfig="""{
    "autoscript": "CU_PO_VENDOR_ACTION",
    "description": "Send BY Email get Email company",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "CU_PO_VENDOR_ACTION",
            "launchPointType": "ATTRIBUTE",
            "active": true,
            "description": "Send BY Email get Email company",
            "objectName": "PO",
            "attributeName": "VENDOR",
            "runAction": true
        }
    ]
}"""