if contractrefid is not None:
	PurchViewSet = mbo.getMboSet('CONTRACTREF')
	if not PurchViewSet.isEmpty():
		PurchViewMbo = PurchViewSet.moveFirst()
		mbo.setValue('CU_GLACCOUNT',PurchViewMbo.getString('GLACCOUNT'),11l)
		mbo.setValue('CU_PMMGR',PurchViewMbo.getString('CU_PMMGR'),11l)
if contractrefid is None:
	mbo.setValueNull('GLACCOUNT ',11l)
	mbo.setValueNull('CU_PMMGR',11l)

scriptConfig="""{
    "autoscript": "CU_PURCHCONTR2INVOICE",
    "description": "Invoice to Purchase Contract",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "CU_PURCHCONTR2INVOICE",
            "launchPointType": "ATTRIBUTE",
            "active": true,
            "description": "Invoice to Purchase Contract",
            "objectName": "INVOICE",
            "attributeName": "CONTRACTREFID",
            "runAction": true
        }
    ]
}"""