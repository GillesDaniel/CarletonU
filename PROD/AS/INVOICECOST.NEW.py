##Created BY SA SMARTECH

##Created date: 2023-10-03


owner=mbo.getOwner()
if(owner is not None and owner.getName()=="INVOICELINE"):
    owner=owner.getOwner()
    if(owner is not None and owner.getName()=="INVOICE"):
        contractRef=owner.getMboSet("CU_PURCHVIEW").moveFirst()
        if(contractRef is not None):
            if(not contractRef.isNull("GLACCOUNT") ):
                mbo.setValue("GLDEBITACCTNONPER",contractRef.getString("GLACCOUNT"),2L)
            if(not contractRef.isNull("REFWO") ):
                mbo.setValue("WONUMNONPER",contractRef.getString("REFWO"),2L)
                invoiceLine=owner.getMboSet("INVOICELINE").moveFirst()
                if(invoiceLine is not None):
                    invoiceCostOwner=invoiceLine.getMboSet("INVOICECOST").moveFirst()
                    if(invoiceCostOwner is not None):
                        workOrderRef=invoiceCostOwner.getMboSet("WORKORDER").moveFirst()
                        if(workOrderRef is not None and not workOrderRef.isNull("WOJO1") ):
                            workOrderRef.setValue("WOJO1",contractRef.getString("REFWO"),2L)

scriptConfig="""{
    "autoscript": "INVOICECOST.NEW",
    "description": "CU: INVOICECOST SET DEFAULT VALUE",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false
}"""