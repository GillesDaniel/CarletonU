appname= mbo.getThisMboSet().getParentApp()
if appname =="MCERPWO":
    if mbo.isNull("ITEMNUM")!=True and mbo.getBoolean("ITEM.ROTATING")==True:
        errorgroup = "mcerp"
        errorkey = "norotating"