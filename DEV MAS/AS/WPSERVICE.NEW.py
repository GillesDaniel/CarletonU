"""
WPSERVICE.NEW
Date 16/02/23
Author P Paraiso
Company BPD Zenith Ltd

Fixed issues with PM creating WO when Routes are used
"""
wo = mbo.getOwner()


if wo is not None:
    
    wolockonuse = wo.getBoolean('LOCKONUSE')

    if wolockonuse == 1 :
        mbo.delete()
        errorgroup = 'BPDLOU'
        errorkey = 'BPDLOCKONUSE'