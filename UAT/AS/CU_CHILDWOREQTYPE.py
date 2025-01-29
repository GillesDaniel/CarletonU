from psdi.mbo import MboConstants

wo = mbo.getOwner()

if onadd and wo is not None and not mbo.isNull("parent"):
    mbo.setValue("CU_REQTYPE",wo.getString("CU_REQTYPE"),MboConstants.NOVALIDATION)