def deleteCommLog():
    commlogSet=parent.getMboSet("COMMLOG")
    commlog=commlogSet.moveFirst()
    while(commlog is not None):
        if(commlog.toBeAdded()):
            commlog.delete()
        
        commlog=commlogSet.moveNext()
clientSession=service.webclientsession()
parent = clientSession.getCurrentApp().getAppBean().getMbo()
deleteCommLog()
clientSession.getCurrentApp().getAppBean().save()
service.closeDialog();