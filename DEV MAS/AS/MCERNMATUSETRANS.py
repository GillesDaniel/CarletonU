if (mbo.getString("LINETYPE")=='RENTALITEM' or mbo.getString("LINETYPE")=='RENTALMAT') and (mbo.getString("ISSUETYPE")=='ISSUE'):

    mbo.setValue("MCERNRTN","NONE",11L);