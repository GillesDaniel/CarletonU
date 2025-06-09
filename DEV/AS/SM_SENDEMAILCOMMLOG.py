from psdi.server   import MXServer
import sys





def rfqAlReadySent():
    rfqVendorSet=rfq.getMboSet("RFQVENDOR")
    rfqVendor=rfqVendorSet.moveFirst()
    while (rfqVendor is not None):
        if(mbo.getString("SM_VENDOR")==rfqVendor.getString("VENDOR")):
            return rfqVendor.getBoolean("SM_ALREADYSENT")
        rfqVendor=rfqVendorSet.moveNext()
    return False    



def rfqVendorIsSent(flag, isAlReadySent):
    rfqVendorSet=rfq.getMboSet("RFQVENDOR")
    rfqVendor=rfqVendorSet.moveFirst()
    while (rfqVendor is not None):
        if(mbo.getString("SM_VENDOR")==rfqVendor.getString("VENDOR")):
            if(flag):
                rfqVendor.setValue("SM_ALREADYSENT",True)
            elif(not isAlReadySent ):
                rfqVendor.setValue("SM_ALREADYSENT",False)
        rfqVendor=rfqVendorSet.moveNext()
        



clientSession=service.webclientsession()
rfq = clientSession.getCurrentApp().getAppBean().getMbo()

status =MXServer.getMXServer().getProperty("sm.sendbyemail.rfqstatus")
isAlReadySent=rfqAlReadySent()
success=True
try:
    mbo.sendMessage()
    rfqVendorIsSent(True,isAlReadySent)
except:
    mbo.delete()
    success=False
    rfqVendorIsSent(False,isAlReadySent)
    errorgroup = "sm"
    errorkey = "allmessage"
    params=[str((sys.exc_info())[1])]
    
if(success):
    laststatus = ""
    newstatus = ""
    if(""!=status   ):
        submapping = status.split(";")
        laststatus = submapping[0]
        newstatus = submapping[1]
        if(laststatus==rfq.getString("status")):
            try:
                rfq.changeStatus(newstatus, MXServer.getMXServer().getDate(), "")
            
            except:
                  errorgroup = "sm"
                  errorkey = "allmessage"
                  params=[str((sys.exc_info())[1])]
               



clientSession.getCurrentApp().getAppBean().save() 
clientSession.getDataBean("SM_SENDRFQ").refreshTable()
service.closeDialog();