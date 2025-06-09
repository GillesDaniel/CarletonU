from java.util import GregorianCalendar
from java.io import FileOutputStream
from java.text   import SimpleDateFormat
from psdi.util import CommonUtil
from psdi.server   import MXServer


import sys

from com.ibm.tivoli.maximo.report.birt.runtime import ReportParameterData
from java.io   import File  

def load(newCommlog) :
    
    cy =  GregorianCalendar()
    date = cy.getTime()
    sdf =  SimpleDateFormat("MMddkkmmss")
    commtemp = MXServer.getMXServer().getProperty("sm.sendbyemail.porelancecomtemlate")
    value = MXServer.getMXServer().getProperty("sm.sendbyemail.porelancereport")
 
        
  
    if (""!=value and ""!=commtemp):
        flag =po.getString("vendor")
        vendorSet = po.getMboSet("VENDOR")
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
   
            
        path = dirName + File.separator + "PO" + sdf.format(date) + ".pdf" 
 
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
        newCommlog.setValue("SENDFROM", sendfromMbo.getString("emailaddress"))
        
        newCommlog.setValue("SM_VENDOR", flag)
       
        docLinkSet = newCommlog.getMboSet("DOCLINKS")
        if(True):
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
    




###MAIN##
clientSession=service.webclientsession()
appName=mbo.getThisMboSet().getParentApp()
po=clientSession.getCurrentApp().getAppBean().getMbo()

if(po is not None):
    if("SENT"!=po.getString("STATUS")):
  
        errorgroup = "sm"
        errorkey = "poNotSent"
        params=[po.getString("ponum")]
    elif(po.getMboSet("SM_PURCHASEAGENT.EMAIL").moveFirst() is  None):
        errorgroup = "sm"
        errorkey = "purchaseagentrequired"
    else:
        
        
        newCommlog=po.getMboSet("COMMLOG").add()
        load(newCommlog)
        clientSession.loadDialog("SM_PORELANCE")