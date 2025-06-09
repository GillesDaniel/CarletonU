################################################################################
# Date      05/01/2022
# Author    P IRVING
# Company   BPD Zentih Ltd
# Purpose   Automatically Create Inventory Usage Lines for all rotating assets on a repair
# Script	MCERPRAIU
# LaunchPoints Two Launch Points one for Issue (Out) and one for Return (Return) 
################################################################################

#One inventory usage and line for each item (makes it easier if there are multiple storerooms)
#Set type to ISSUE and choose the bin from a relationship that should already exist

from psdi.server import MXServer
from psdi.mbo import SqlFormat

#get the MXServer
mxs = MXServer.getMXServer();

#Get the set of all rotating Assets
#raSet = mbo.getMboSet("MCERPROTASS");
raSet = mbo.getMboSet("MCERPMALRA");

#move first
ra = raSet.moveFirst()

#loop through the rotating assets to create the invuse for each
while ra is not None:
	skip = False
	#check the current location of the asset, if it's a repair, storeroom or vendor we can skip
	if not ra.isNull("ASSETNUM"):
	    asset = ra.getMboSet("ASSET").moveFirst()
	    if asset is not None:
    		locSet = asset.getMboSet("LOCATION")
    		loc = locSet.moveFirst()
    		if loc is not None:
    			locType = loc.getString("TYPE")
    			
    			if locType not in ['REPAIR','VENDOR','STOREROOM']:
					#throw error
					errorgroup = "MCERP";
					errorkey = "nostoreroom";

	#Validation Passed, Good to Go
	
	#get a new invuse mbo set
	invUseSet = mxs.getMboSet("INVUSE",mbo.getUserInfo())
	
	#add a new record
	invUse = invUseSet.add();
	
	#This should be overwritten
	desc = "Repair - Send Asset "+ra.getString("ASSETNUM")+" To Vendor For WO "+mbo.getString("WONUM")
	
	if launchPoint == "MCERPAIU_1":
	    desc = "Repair - Issue Asset "+ra.getString("ASSETNUM")+" To "+ra.getString("LOCATION")+" For WO "+mbo.getString("WONUM")

	invUse.setValue("DESCRIPTION",desc)
	invUse.setValue("USETYPE","ISSUE")
	invUse.setValue("FROMSTORELOC",ra.getString("ASSET.LOCATION"))
	#This is for later when we bring it back
	ra.setValue("MCERPSTORE",ra.getString("ASSET.LOCATION"))
	
	#get the invuseline set as a related record
	#add a line
	invLineSet = invUse.getMboSet("INVUSELINE")
	invLine = invLineSet.add()
	
	invLine.setValue("USETYPE","ISSUE")
	
	#this should bring in the itemnum and location details
	invLine.setValue("ROTASSETNUM",ra.getString("ASSETNUM"),2L)
	#if we dont add this it wont show on repairs summary tab
	#may cause location to clear...
	invLine.setValue("REFWO",mbo.getString("WONUM"))
	
	#invLine.setValue("FROMCONDITIONCODE",ra.getString("CONDITIONCODE"),2L)
#	invLine.setValue("FROMBIN","RP-"+mbo.getString("WONUM"),2L)
	
	if launchPoint == "MCERPAIU_1":
	    invLine.setValue("LOCATION",ra.getString("LOCATION"),2L)
	#if this bin doesn't exist, then it will auto create on complete, but it will mean the MCERPWONUM will be blank on invbalances
	#Could alter the MCERPINVUSELINE relationship to account for all invbalances of the multiassetlocci assets
	#save and close the invuse set
	#yes it's bad to save in a script but it's opened from MXServer and then closed so contained
	invUseSet.save();
	
	invUseSet.close();
	
	#move next
	ra = raSet.moveNext();

raSet.close()

#Refresh the Table onscreen 
#service.webclientsession().findControl("ORP76113479048343253").getDataBean().refreshTable();
