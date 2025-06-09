## Created By SA 
## Created Date 2023-11-8
## TICKET ##1908##





if(mbo.toBeUpdated() and not mbo.isNull("PONUM")):
    poLineMbo=mbo.getMboSet("POLINE").moveFirst()
    if(poLineMbo is not None):
        poMbo=poLineMbo.getMboSet("PO").moveFirst()
        if(poMbo is not None):
            poLineSetRemote=poMbo.getMboSet("POLINE")
            minPoLineNum=poLineSetRemote.min("POLINENUM")
            if(minPoLineNum==mbo.getInt("POLINENUM")):
                prMbo=mbo.getMboSet("PR").moveFirst()
                if(prMbo is not None):
                    if(not prMbo.isNull("CU_PMMGR") and poMbo.isNull("CU_PMMGR")):
                        poMbo.setValue("CU_PMMGR",prMbo.getString("CU_PMMGR"),2L)