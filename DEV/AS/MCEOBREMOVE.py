""" 
MCEOBREMOVE  

Date		14/04/22
Author		K St-Claire
Company		BPD Zenith Ltd

Offboard Clears person from person Groups, WF Assignments, Work Orders and Security Groups.

Updated for MAS compatability 12/09/23

"""

from psdi.server import MXServer
 
personSet = mbo.getMboSet("PERSON")
person = personSet.moveFirst()
personid = person.getString("PERSONID")


#person Group Team
personGroup = person.getMboSet("PERSONGROUPTEAM")
group = personGroup.moveFirst()

if mbo.getString("STATUS")!="INACTIVE":
   #mbo.changeStatus("INACTIVE", MXServer.getMXServer().getDate(), "Set by MCEOBREMOVE")
   mbo.setValue("STATUS","INACTIVE",2L)



if person is not None:
    while group is not None:
        
        #Delete from Person Group
        group.setValue("GROUPDEFAULT",0);
        group.delete();
        group = personGroup.moveNext();


    #WFAssignment
    wfaSet = person.getMboSet("MCEOBWFA")
    wfa = wfaSet.moveFirst()

    while wfa is not None:
        if wfa.getString("ASSIGNCODE") == personid:
            #Then Delete Record
            wfa.delete();
        
        wfa = wfaSet.moveNext();
            
        
    #Labor Craft Rate
    lcrSet = person.getMboSet("MCEOBLCR")
    lcr = lcrSet.moveFirst()

    while lcr is not None:
        if lcr.getString("LABORCODE") == personid:
            #Then Delete Record
            lcr.delete(2L);
            
        lcr = lcrSet.moveNext();


    #Workorder
    woSet = person.getMboSet("MCEOBWO")
    wo = woSet.moveFirst()

    while wo is not None:
        if wo.getString("REPORTEDBY") == personid:
            #Then clear it
            wo.setValueNull("REPORTEDBY",2L); 
            
        if wo.getString("ONBEHALFOF") == personid:
            #Then clear it
            wo.setValueNull("ONBEHALFOF",2L); 
            
        if wo.getString("SUPERVISOR") == personid:
            #Then clear it
            wo.setValueNull("SUPERVISOR",2L); 
            
        if wo.getString("OWNER") == personid:
            #Then clear it
            wo.setValueNull("OWNER",2L); 
            
        if wo.getString("LEAD") == personid:
            #Then clear it
            wo.setValueNull("LEAD",2L); 
            
        if wo.getString("INSPECTOR") == personid:
            #Then clear it
            wo.setValueNull("INSPECTOR",2L); 
            
        wo = woSet.moveNext();


    
    #Groupuser
    guSet = person.getMboSet("MCEOBGU")
    gu = guSet.moveFirst()

    while gu is not None:
        if gu.getString("USERID") == personid:
            #Then Delete Record
            gu.delete(2L); 
            
        gu = guSet.moveNext();