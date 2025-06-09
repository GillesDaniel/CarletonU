#Related Work Orders
woSet = mbo.getMboSet("MCERPWORKORDER")
wo = woSet.moveFirst()

#mbo.save()
if wo is not None:
    if wo.getString("WORKTYPE")=="REP":
    
        if mbo.isNull("REQUESTNUM")==True and mbo.isNull("LOCATION") == False:
            #find the reservation and populate the oplocation so that it doesnt overwrite it later
            irSet = mbo.getMboSet("INVRESERVEFORUSELINE")
            ir = irSet.moveFirst()
            if ir is not None:
                resSet = mbo.getMboSet("RESERVATION")
                resSet.clear()
                resSet.addReservationRecords(irSet)
                res = resSet.moveFirst()
                res.setValue("LOCATION",mbo.getString("LOCATION"),2L)
                mbo.updateInvUseLineForReservation(res)
                
                mbo.setValue("LOCATION",res.getString("LOCATION"),2L)