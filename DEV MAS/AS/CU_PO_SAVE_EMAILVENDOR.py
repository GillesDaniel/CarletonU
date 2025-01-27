## Created Date: 2023-01-11
###Created By Aymen SAAFI SMARTECH
####Get email Company  from contact if po.contact not empty 




###Main
if(not mbo.isNull("CONTACT")):
    contactEmail=mbo.getMboSet("CU_COMPCONTACT").moveFirst()
    if(contactEmail is not None):
        if( not contactEmail.isNull("EMAIL")):
            if(mbo.getString("EMAIL")!=contactEmail.getString("EMAIL")):
                mbo.setValue("EMAIL",contactEmail.getString("EMAIL"),2L)