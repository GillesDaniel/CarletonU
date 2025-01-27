### Created By Aymen SAAFI: SMARTECH
##### Date Create: 2023-01-10


if(not mbo.isNull("CONTACT")):
    emailContactRemote=mbo.getMboSet("CU_COMPCONTACT").moveFirst()
    if(emailContactRemote is not None):
        if( not emailContactRemote.isNull("email")):
            mbo.setValue("EMAIL",emailContactRemote.getString("EMAIL"),2L)