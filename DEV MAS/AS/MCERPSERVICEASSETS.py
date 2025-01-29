################################################################################
# Date 22/02/2022
# Author K St-Claire
# Company BPD Zentih Ltd
# Purpose Automatically Create a Service for Assets
# Script MCERPSERVICEASSETS
################################################################################

from psdi.app.workorder import WORemote;

wo = mbo.getOwner()
if wo is not None and isinstance(wo, WORemote) and wo.getString("WORKTYPE")=='REP':
    #get the service lines for the work order
    serviceSet = wo.getMboSet("SHOWPLANSERVICE")
    #srvc = serviceSet.moveFirst()
    
    #make a new service against the work order
    srvc = serviceSet.add()
    srvc.setValue("WONUM",wo.getString("WONUM"),2L)
    srvc.setValue("LINETYPE","SERVICE",2L)
    srvc.setValue("ITEMQTY",1,2L)
    srvc.setValue("DESCRIPTION","REPAIR: "+mbo.getString("ASSETNUM"),2L)

	#srvc = serviceSet.moveNext()