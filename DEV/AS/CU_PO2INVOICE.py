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