if ponum is not None:
	poSet = mbo.getMboSet('PO')
	
	if not poSet.isEmpty():
		poMbo = poSet.moveFirst()
		mbo.setValue('CU_INVOICECATEGORY',poMbo.getString('CU_INVOICECATEGORY'),11l)
		mbo.setValue('CU_PMMGR',poMbo.getString('CU_PMMGR'),11l)
		mbo.setValue('CU_RECOVERABLE',poMbo.getString('CU_RECOVERABLE'),11l)

if ponum =='':
	mbo.setValueNull('CU_INVOICECATEGORY',11l)
	mbo.setValueNull('CU_PMMGR',11l)
	mbo.setValue('CU_RECOVERABLE',0,11l)

scriptConfig="""{
    "autoscript": "CU_PO2INVOICE",
    "description": "Copy PO Details to Invoice",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "CU_PO2INVOICE",
            "launchPointType": "ATTRIBUTE",
            "active": true,
            "description": "Copy PO information to Invoice",
            "objectName": "INVOICE",
            "attributeName": "PONUM",
            "runAction": true
        }
    ]
}"""