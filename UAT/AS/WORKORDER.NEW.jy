##Created By SA SMARTECH
##Created Date 2023-10-06
##updated By SA SMARTECH
##update Date 2023-11-08
## Ticket ##1908##



##Copy child description from parent  description
owner=mbo.getOwner()
if (owner is not None and owner.getName()=="WORKORDER"):
    if(mbo.getThisMboSet().getRelationName()=="WOWORKORDER"):
        mbo.setValue("DESCRIPTION",owner.getString("description"),2L)
        mbo.setValue("CU_PMMGR",owner.getString("CU_PMMGR"),2L)
        mbo.setValue("ICBNUM",owner.getString("ICBNUM"),2L)
        mbo.setValue("CU_REQTYPE",owner.getString("CU_REQTYPE"),2L)
        mbo.setValue("PLUSPCUSTOMER",owner.getString("PLUSPCUSTOMER"),2L)