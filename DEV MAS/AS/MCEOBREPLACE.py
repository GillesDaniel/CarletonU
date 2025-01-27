""" 
MCEOBREPLACE  

Date		14/04/22
Author		K St-Claire
Company		BPD Zenith Ltd

Replaces person in person Groups, WF Assignments, Job Plans, PMs, Work Orders and Security Groups.
Also disables Original User, Person and Labour records.
Does Not Replace Labour for new user.

Updated for MAS compatability 12/09/23

"""
from psdi.server import MXServer
 
#mbo == MAXUSER object
personSet = mbo.getMboSet("PERSON")
person = personSet.moveFirst()
personid = person.getString("PERSONID");
newUser = mbo.getString("MCEOBREPLACE")

if mbo.getString("STATUS")!="INACTIVE":
   #mbo.changeStatus("INACTIVE", MXServer.getMXServer().getDate(), "Set by MCEOBREPLACE")
   mbo.setValue("STATUS","INACTIVE",2L)



if person is not None:

    #person Group Team - Replace
    personGroupR = mbo.getMboSet("MCEOBPGT")
    groupR = personGroupR.moveFirst()
    
    while groupR is not None:
        
        #Replace User in Person Group
        groupR.setValue("RESPPARTYGROUP",newUser,2L);
        groupR.setValue("RESPPARTY",newUser,2L);
        groupR = personGroupR.moveNext();
               
    #personGroupR.save();
    #personGroupR.close();
    
    
    #person Group Team - Delete
    personGroup = person.getMboSet("PERSONGROUPTEAM")
    group = personGroup.moveFirst()
    
    while group is not None:
        
        #Delete from Person Group
        group.setValue("GROUPDEFAULT",0)
        group.delete()
        group = personGroup.moveNext();


    #WFAssignment
    wfaSet = person.getMboSet("MCEOBWFA")
    wfa = wfaSet.moveFirst()

    while wfa is not None:
        if wfa.getString("ASSIGNCODE") == personid:
            #Then Replace User
            wfa.setValue("ASSIGNCODE",newUser,2L);
            
        wfa = wfaSet.moveNext();
            
    
    #Jobplan
    jpSet = person.getMboSet("MCEOBJP")
    jp = jpSet.moveFirst()

    while jp is not None:
        if jp.getString("SUPERVISOR") == personid:
            #Then Swap
            jp.setValue("SUPERVISOR",newUser,2L); 
            
        if jp.getString("LABORCODE") == personid:
            #Then Swap
            jp.setValue("LABORCODE",newUser,2L); 
            
        if jp.getString("OWNER") == personid:
            #Then Swap
            jp.setValue("OWNER",newUser,2L); 
            
        jp = jpSet.moveNext();


    """
    #Labour
            Old user Deactivated with Person Record
    """
    
    
    #Labor Craft Rate
    lcrSet = person.getMboSet("MCEOBLCR")
    lcr = lcrSet.moveFirst()

    while lcr is not None:
        if lcr.getString("LABORCODE") == personid:
            #Then Delete Record
            lcr.delete(2L);
            
        lcr = lcrSet.moveNext();



    #PM
    pmSet = person.getMboSet("MCEOBPM")
    pm = pmSet.moveFirst()

    while pm is not None:
        if pm.getString("SUPERVISOR") == personid:
            #Then Swap
            pm.setValue("SUPERVISOR",newUser,2L); 
            
        if pm.getString("LEAD") == personid:
            #Then Swap
            pm.setValue("LEAD",newUser,2L); 
            
        if pm.getString("OWNER") == personid:
            #Then Swap
            pm.setValue("OWNER",newUser,2L); 
        
        pm = pmSet.moveNext();
            
            

    #Workorder
    woSet = person.getMboSet("MCEOBWO")
    wo = woSet.moveFirst()

    while wo is not None:
        if wo.getString("SUPERVISOR") == personid:
            #Then Swap
            wo.setValue("SUPERVISOR",newUser,2L); 
            
        if wo.getString("OWNER") == personid:
            #Then Swap
            wo.setValue("OWNER",newUser,2L); 
            
        if wo.getString("LEAD") == personid:
            #Then Swap
            wo.setValue("LEAD",newUser,2L); 
            
        if wo.getString("INSPECTOR") == personid:
            #Then Swap
            wo.setValue("INSPECTOR",newUser,2L); 
            
        wo = woSet.moveNext();

    
    #Groupuser - Replace
    guSetR = mbo.getMboSet("MCEOBGUR")
    guR = guSetR.moveFirst()

    while guR is not None:
        if guR.getString("USERID") == personid:
            #Then Swap
            guR.setValue("USERID",newUser,2L);
            
        guR = guSetR.moveNext();
        
    #guSetR.save();
    #guSetR.close();
        
        
    #Groupuser - Delete    
    guSet = person.getMboSet("MCEOBGU")
    gu = guSet.moveFirst()

    while gu is not None:
        if gu.getString("USERID") == personid:
            #Then Delete Record
            gu.delete(2L); 
            
        gu = guSet.moveNext();