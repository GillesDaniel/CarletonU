from psdi.server import MXServer
from psdi.mbo import MboConstants
#adminEmailAddress = MXServer.getMXServer().getProperty("mxe.smtp.user");
mbo.setValue("userid","MAXADMIN",MboConstants.NOACCESSCHECK|MboConstants.NOVALIDATION|MboConstants.NOACTION)
#userinfo =mbo.getUserInfo()
#if userinfo.getEmail() and not userinfo.getEmail() == "":
#    mbo.setValue('REPLYTO',userinfo.getEmail(), MboConstants.NOACCESSCHECK)

scriptConfig="""{
    "autoscript": "REPORTRUNQUEUE.NEW",
    "description": "initialize REPORTRUNQUEUE userid",
    "version": "",
    "active": false,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false
}"""