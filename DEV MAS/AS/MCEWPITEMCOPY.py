""" 
MCEWPITEMCOPY

Date		22/11/22
Author		P Paraiso
Company		BPD Zenith Ltd

Please add fields to the empty array called listOfFields, with the ones that you would like to copy
"""


from psdi.mbo import MboSet
from psdi.server import MXServer

# List of fields to be copied from WPITEM to PRLINE
listOfFields = []  # Add the fields you want to copy
length = len(listOfFields)

# Get the current WPITEM MBO (assumed to be passed in the script)
wpItem = mbo

# Get the value of the work order number from the WPITEM
wonum = wpItem.getString("WONUM")

# Get the current user's site ID
siteId = wpItem.getString("SITEID")

# Create an explicit query to fetch all WPITEM records related to the work order
wpItemSet = MXServer.getMXServer().getMboSet("WPITEM", wpItem.getUserInfo())
wpItemSet.setWhere("wonum = '{}' and siteid = '{}'".format(wonum, siteId))
wpItemSet.reset()
 
# Create an explicit query to fetch all PRLINE records related to the WPITEM
prLineSet = MXServer.getMXServer().getMboSet("PRLINE", wpItem.getUserInfo())
prLineSet.setWhere("refwo = '{}' and siteid = '{}'".format(wonum, siteId))
prLineSet.reset()
# Iterate through all WPITEM records
wpItem = wpItemSet.moveFirst()
prLine = prLineSet.moveFirst()
while prLine is not None:
	for field in listOfFields:
		wpValue = wpItem.getString(field)
		prLine.setValue(field, wpValue, 2L)
			
	prLine = prLineSet.moveNext()
	wpItem = wpItemSet.moveNext()
			
prLineSet.save()