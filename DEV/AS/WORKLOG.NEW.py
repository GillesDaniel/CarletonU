# Created by TRINMAX on 17.05.2023 # 
ownerMbo = mbo.getOwner()
if ownerMbo and ownerMbo.isBasedOn("INVOICE"):
    mbo.setValue("CLASS", "INVOICE", mbo.NOACCESSCHECK|mbo.NOACTION|mbo.NOVALIDATION)
    mbo.setValue("RECORDKEY", ownerMbo.getString("INVOICENUM"), mbo.NOACCESSCHECK|mbo.NOACTION|mbo.NOVALIDATION)