from psdi.server import MXServer
from psdi.mbo import MboConstants
adminEmailAddress = MXServer.getMXServer().getProperty("mxe.smtp.user");
mbo.setValue("sendfrom",adminEmailAddress)
#userinfo =mbo.getUserInfo()
#if userinfo.getEmail() and not userinfo.getEmail() == "":
    #mbo.setValue('REPLYTO',userinfo.getEmail(), MboConstants.NOACCESSCHECK)