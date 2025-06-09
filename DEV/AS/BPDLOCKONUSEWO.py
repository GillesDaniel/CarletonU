from psdi.mbo import MboConstants

jpnotnull = mbo.getString('JPNUM')


if jpnotnull != '' :
    
    jpSet = mbo.getMboSet('JOBPLAN')
    
    jp = jpSet.getMbo(0)
    
    if jp is not None:
    
        jplockonuse = jp.getBoolean('LOCKONUSE')
    
        if jplockonuse == 1:
        
            mbo.setValue('LOCKONUSE', '1', MboConstants.NOACCESSCHECK)
        

else:
    mbo.save()