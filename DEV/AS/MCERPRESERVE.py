#on invuse save
#if complete then
#loop through lines
#if line type is return and location is not null and wonum/refwo is not null
#if work order is worktype rep
#create invreserve record for work order / item /store


invUseLine = mbo.getMboSet("INVUSELINE")
line = invUseLine.moveFirst()
repCheckSet = line.getMboSet("MCERPWORKORDER")
repCheck = repCheckSet.moveFirst()
if repCheck is not None:
    if repCheck.getString("WORKTYPE") == "REP":
        checkSet = line.getMboSet("MCERPRESERVE")
        check = checkSet.moveFirst()

        resSet = mbo.getMboSet("INVRESERVE")
        res = resSet.moveFirst()

        if check is None:
        
            res = resSet.add()
        
            res.setValue("ITEMNUM",line.getString("ITEMNUM"),2L)
            res.setValue("LOCATION",line.getString("FROMSTORELOC"),2L)
            res.setValue("WONUM",line.getString("REFWO"),2L)
            res.setValue("RESERVEDQTY",line.getString("QUANTITY"),2L)
            res.setValue("REQUIREDDATE",line.getString("NEWPHYSCNTDATE"),2L)
            res.setValue("DESCRIPTION",line.getString("DESCRIPTION"),2L)
            res.setValue("ORGID",line.getString("ORGID"),2L)
            res.setValue("SITEID",line.getString("SITEID"),2L)
            res.setValue("ITEMSETID",line.getString("ITEMSETID"),2L)
            res.setValue("CONDITIONCODE",line.getString("FROMCONDITIONCODE"),2L)
            res.setValue("BINNUM",line.getString("FROMBIN"),2L)