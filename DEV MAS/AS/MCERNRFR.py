

if mbo.getString("LINETYPE")=='RENTALMAT':
    mut = mbo.getOwner()
    if mut is not None:
		if (mut.getString("ISSUETYPE") is not None and mut.getString("ISSUETYPE")=='RETURN') or mbo.getString("STATUS")=='RETURN':
			mbo.setValue ("REASONFORRET","OFF HIRE",2L)
#			mbo.setValue("CONSIGNOTES",True,2L)