##Created BY SA SMARTECH
##Created Date: 2023-10-3


contractRef=mbo.getMboSet("CU_PURCHVIEW").moveFirst()

if(contractRef is not None):
    if(not contractRef.isNull("CU_ECONTRACTPO")):
        mbo.setValue("CU_ECONTRACTPO",contractRef.getString("CU_ECONTRACTPO"),11L)
        
    invoiceLineSet=mbo.getMboSet("INVOICELINE") 
    invoiceLine=invoiceLineSet.moveFirst()
    while(invoiceLine is not None):
        invoiceCostSet=invoiceLine.getMboSet("INVOICECOST")
        invoiceCost=invoiceCostSet.moveFirst()
        while (invoiceCost is not None):
            
            if(not contractRef.isNull("GLACCOUNT") ):
                invoiceCost.setValue("GLDEBITACCTNONPER",contractRef.getString("GLACCOUNT"),2L)
            if(not contractRef.isNull("REFWO") ):
                
                invoiceCost.setValue("WONUMNONPER",contractRef.getString("REFWO"),2L)
            
            
            invoiceCost=invoiceCostSet.moveNext()
            

        
        
        invoiceLine=invoiceLineSet.moveNext()