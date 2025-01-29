if mbo.getString("LINETYPE") in ['RENTALITEM','RENTALMAT']:
    mbo.setValue("UNITCOST",0.00,2L)