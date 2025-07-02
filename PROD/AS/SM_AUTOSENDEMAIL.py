############################
### Automatically send email in PO && RFQ
###################################

### This Action is moodfied for Carleton 
#### Update date :2022-11-21
import java
from psdi.server import MXServer


def manageException(sendMbo):
    ## is commented fo Client CARLETON Spec
   ## if(mbo.getString("PURCHASEAGENT")==""):
     ##   sendMbo.setValue("message","Buyer is required");
       ## sendMbo.setValue("TOSEND", 0);
    ##elif(mbo.getName()=="PO" and mbo.getString("PURCHASEAGENT")!="" and mbo.getString("SM_PURCHASEAGENT.PRIMARYEMAIL")==""):
      ##  sendMbo.setValue("message","Buyer Email is required");
        ##sendMbo.setValue("TOSEND", 0);
    if(mbo.getName()=="RFQ" and mbo.getString("PURCHASEAGENT")!="" and mbo.getString("SM_PURCHASEAGENT.PRIMARYEMAIL")==""):
        sendMbo.setValue("message","Buyer Email is required");
        sendMbo.setValue("TOSEND", 0);
        
    if(mbo.getName()=="PO" and mbo.getString("EMAIL")==""):
        sendMbo.setValue("message","Company Primary Email is required");
        sendMbo.setValue("TOSEND", 0);
    elif(mbo.getName()=="RFQ" and  mbo.getString("RFQVENDOR.EMAIL")==""):
        sendMbo.setValue("message","Vendor Email is required");
        sendMbo.setValue("TOSEND", 0);
        

sendMboSet = MXServer.getMXServer().getMboSet("SM_SENDEMAIL",mbo.getUserInfo());
if(mbo.getName()=="PO" and mbo.getBoolean("SM_AUTOSENDEMAIL") ):

    if( mbo.getString("STATUS")=="APPR" or mbo.getString("STATUS")=="SENT"):
        sendMbo=sendMboSet.add()
        sendMbo.setValue("OWNERID",mbo.getInt("poid"))
        sendMbo.setValue("OWNERTABLE", "PO")
        sendMbo.setValue("VENDOR", mbo.getString("vendor"))
        ## Carleton Specification: get Language code from default system language 
        ## addsendMbo.setValue("LANGCODE",str(mbo.getMboServer().getMaxVar().getString("BASELANGUAGE", None)))

        ##if(mbo.getString("VENDOR.SM_LANGCODE")!=""):
        ##    sendMbo.setValue("LANGCODE",mbo.getString("VENDOR.SM_LANGCODE"))
        ##else:
        ##    sendMbo.setValue("LANGCODE","EN")
        sendMbo.setValue("LANGCODE",str(mbo.getMboServer().getMaxVar().getString("BASELANGUAGE", None)))
        sendMbo.setValue("EMAIL", mbo.getString("SM_PURCHASEAGENT.PRIMARYEMAIL"));
        sendMbo.setValue("DESCRIPTION", mbo.getString("PO_VENDOR.NAME"));
        sendMbo.setValue("APP", "PO");
        sendMbo.setValue("TOSEND", 1);
        if(mbo.getString("STATUS")=="SENT"):
            sendMbo.setValue("ISPORELANCE", 1);
        manageException(sendMbo);
elif(mbo.getName()=="RFQ" and mbo.getBoolean("SM_AUTOSENDEMAIL")):
    if( mbo.getString("STATUS")=="READY"):
        rfqvendorSet = mbo.getMboSet("RFQVENDOR")
        rfqvendor=rfqvendorSet.moveFirst()
        while (rfqvendor is not None):
            
            sendMbo=sendMboSet.add()
            sendMbo.setValue("OWNERID",mbo.getInt("rfqid"))
            sendMbo.setValue("OWNERTABLE", "RFQ")
            sendMbo.setValue("VENDOR", rfqvendor.getString("vendor"))
            ##if(mbo.getString("RFQVENDOR.COMPANIES.SM_LANGCODE")!=""):
              ##  sendMbo.setValue("LANGCODE",rfqvendor.getString("COMPANIES.SM_LANGCODE"))
            ##else:
            sendMbo.setValue("LANGCODE",str(mbo.getMboServer().getMaxVar().getString("BASELANGUAGE", None)))
            sendMbo.setValue("EMAIL", rfqvendor.getString("EMAIL"));
            sendMbo.setValue("DESCRIPTION", rfqvendor.getString("COMPANIES.name"));
            sendMbo.setValue("APP", "RFQ");
            sendMbo.setValue("TOSEND", 1);
            manageException(sendMbo);
            rfqvendor=rfqvendorSet.moveNext()
sendMboSet.save()