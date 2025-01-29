""" 
MCEOBDP  

Date		14/04/22
Author		K St-Claire
Company		BPD Zenith Ltd

Deactivate person after Remove or Replace have ran.

Updated for MAS compatability 12/09/23

"""

from psdi.server import MXServer
 
personSet = mbo.getMboSet("PERSON")
person = personSet.moveFirst()

personGroup = person.getMboSet("PERSONGROUPTEAM")
Group = personGroup.moveFirst()

if person is not None and person.getString("STATUS")!="INACTIVE":
	#person.changeStatus("INACTIVE", MXServer.getMXServer().getDate(), "Set by MCEOBDP")
	person.setValue("STATUS","INACTIVE",2L)