from psdi.server import MXServer



clientSession=service.webclientsession()


appBean=clientSession.getCurrentApp()
countNotselect = appBean.getResultsBean().count()
if (countNotselect < 1):
    service.error("sm","selectOne")
else:
    mBoName = appBean.getAppBean().getMboName()
    pomax = MXServer.getMXServer().getProperty("sm.max.mass.po")
    if (appBean.onListTab()):
        if ("PO"==mBoName):
            if (countNotselect > int(pomax)) :
                errorgroup = "sm"
                errorkey = "resultcount"
                params = [pomax]   
            else:
                clientSession.loadDialog("smsendporlnc")