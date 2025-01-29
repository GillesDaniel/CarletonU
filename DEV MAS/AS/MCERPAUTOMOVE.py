################################################################################
# Date      09/02/2022
# Author    K St-Claire / P Irving
# Company   BPD Zentih Ltd
# Purpose   Auto Move assets back to Original Locations
# Script	MCERPAUTOMOVE
################################################################################

from psdi.server import MXServer
from psdi.mbo import SqlFormat

#get the MXServer
mxs = MXServer.getMXServer();

# Find all assets, locations and CIs
allmal = mbo.getMboSet("ALLMULTIASSETLOCCI")
mal =  allmal.moveFirst()

while mal is not None:
    asset = mal.getMboSet("ASSET").moveFirst();
    
    mal.setValue("MOVETOSITE",mal.getString("SITEID"),2L)
    mal.setValue("MOVETOLOCATION",mal.getString("LOCATION"),2L)
    mbo.moveAllAssets()
    mal = allmal.moveNext()