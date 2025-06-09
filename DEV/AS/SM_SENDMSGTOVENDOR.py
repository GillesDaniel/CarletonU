from psdi.server import MXServer
import sys

#Added Code for MAS
from java.lang import Class
from com.ibm.tivoli.maximo.oslc import OslcUtils
from com.ibm.tivoli.maximo.oslc.provider import OslcAttachmentHandler
from java.io import File
from psdi.server import MXServer
from com.ibm.tivoli.maximo.report.birt.runtime import ReportParameterData
from java.util import GregorianCalendar
from java.text   import SimpleDateFormat

def applyAction():
    poAlreadySent=po.getBoolean("SM_SENDEMAIL")
    status = MXServer.getMXServer().getProperty("sm.sendbyemail.postatus")
    if (""!=status):
        submapping = status.split(";")
        if(len(submapping)==2):
            cy =  GregorianCalendar()
            date = cy.getTime()
            sdf =  SimpleDateFormat("MMdd")
            value = MXServer.getMXServer().getProperty("sm.sendbyemail.poreport")
            appName=mbo.getThisMboSet().getParentApp()
            doclinkService = MXServer.getMXServer().lookup("DOCLINK")
            dirName = doclinkService.getDefaultFilePath("Attachments", po.getUserInfo())
            birtAdmService =  MXServer.getMXServer().lookup("BIRTREPORT")
            path = dirName + File.separator + "PO" +str(po.getString("ponum")[-9:])+str(po.getInt("REVISIONNUM"))+ sdf.format(date) + ".pdf"
            f =  File(path)
            parameterData =  ReportParameterData()
            parameterData.addParameter("where", po.getUniqueIDName() + "=" +str( po.getUniqueIDValue()))
            repByte = birtAdmService.runReport(po.getUserInfo(), value, appName, parameterData,f.getName(), "pdf")
			
            laststatus = submapping[0]
            newstatus = submapping[1]
            if(laststatus==po.getString("status")):
                success=True
                
                try:
                    docLinkSet=mbo.getMboSet("DOCLINKS")
                    if not docLinkSet.isEmpty() and docLinkSet.getMbo(0) is not None:
	
                        docLinkMbo = docLinkSet.moveFirst()
		
                        if docLinkMbo is not None:
		
							#path=docLinkMbo.getString("URLNAME")
							#f = File(path)
							#fis = FileInputStream(f)
							#repByte = bytearray(f.length())  # Allocate byte array of file size
							#fis.read(repByte)
							#fis.close()
							#repByte = Files.readAllBytes(f.toPath())
							contentType = OslcAttachmentHandler.getContentTypeFrom(docLinkMbo)
							attachmentStore = OslcUtils.getAttachmentStore()
							attachmentClass = Class.forName(attachmentStore)

							docStore = attachmentClass.newInstance()
							docStore.createAttachment(path, repByte, contentType)
							#docLinkMbo = docLinkSet.moveNext()
		
                    docLinkSet.close();
                    docLinkSet.cleanup()
					
                    mbo.sendMessage()
                    po.setValue("SM_SENDEMAIL", True, 2l)
                except:
                    success=False
                    if(not poAlreadySent):
                        po.setValue("SM_SENDEMAIL", False, 2l)
                    mbo.delete() 
                    return str((sys.exc_info())[1])
                    
                if(success):
                    po.changeStatus(newstatus, MXServer.getMXServer().getDate(), "")
            else:
                
                try:
                    docLinkSet=mbo.getMboSet("DOCLINKS")
                    if not docLinkSet.isEmpty() and docLinkSet.getMbo(0) is not None:
	
                        docLinkMbo = docLinkSet.moveFirst()
		
                        if docLinkMbo is not None:
		
							#path=docLinkMbo.getString("URLNAME")
							#f = File(path)
							#fis = FileInputStream(f)
							#repByte = bytearray(f.length())  # Allocate byte array of file size
							#fis.read(repByte)
							#fis.close()
							#repByte = Files.readAllBytes(f.toPath())
							contentType = OslcAttachmentHandler.getContentTypeFrom(docLinkMbo)
							attachmentStore = OslcUtils.getAttachmentStore()
							attachmentClass = Class.forName(attachmentStore)

							docStore = attachmentClass.newInstance()
							docStore.createAttachment(path, repByte, contentType)
							#docLinkMbo = docLinkSet.moveNext()
		
                    docLinkSet.close();
                    docLinkSet.cleanup()
					
                    mbo.sendMessage()
                    po.setValue("SM_SENDEMAIL", True, 2l)
                except:
                    if(not poAlreadySent):
                        po.setValue("SM_SENDEMAIL", False, 2l)
                    mbo.delete()
                    return str((sys.exc_info())[1])
    return None            
clientSession=service.webclientsession()

po = clientSession.getCurrentApp().getAppBean().getMbo()
resultAction=applyAction()
if(resultAction is not None):
    errorgroup = "sm"
    errorkey = "allmessage"
    params=[resultAction]
    
clientSession.getCurrentApp().getAppBean().save()
service.closeDialog();