## OSACTION.MXAPIINSPRESULT.CE_CREATESR
##  
## CU - Support - Warranty notification - Service request template
#-----------------------------------------------------------------------------
# Script handle to create SR from Inspection Results
#-----------------------------------------------------------------------------
##### Import Packages
from psdi.server import MXServer
from psdi.mbo import MboConstants


def copyDescAndDoclinks(srDoclinksSet, inspfieldresultSet, newSR):
    
    currentDocLinkSet=None;
    countQuestion=0;
    currentInspectField=inspfieldresultSet.moveFirst();
    while currentInspectField is not None:
        if(currentInspectField.getString("inspfieldnum") in inspfieldnumList):
            alreadyDone=True;
        else:
            alreadyDone=False;
            inspfieldnumList.append(currentInspectField.getString("inspfieldnum"));
        
        if(not alreadyDone):
            currentInspectFieldDocLinkSet=currentInspectField.getMboSet("DOCLINKS");
            if  not currentInspectFieldDocLinkSet.isEmpty():           
                currentInspectFieldDocLinkSet.copy(srDoclinksSet);
            inspfieldoptionSet=currentInspectField.getMboSet("$INSPFIELDOPTION","INSPFIELDOPTION","inspfieldnum=:inspfieldnum and orgid=:orgid and :txtresponse=description ")
            inspfieldoption=inspfieldoptionSet.moveFirst()
            if(inspfieldoption is not None):
                countQuestion=countQuestion+1
                question=""
                questionSet=currentInspectField.getMboSet("$INSPFIELDCOMMENT","INSPFIELD","inspformnum=:inspformnum AND inspfieldnum=:inspfieldnum AND inspquestionnum=:inspquestionnum AND revision=:revision")
                questionSet.reset()
                questionRemote=questionSet.moveFirst()
                if(questionRemote is not None):                
                    question=questionRemote.getString("description")                 
                    desc = question + " = " + currentInspectField.getString("TXTRESPONSE");                 
                    newSR.setValue("DESCRIPTION",  desc[:100]);
                    priority=currentInspectField.getString("TXTRESPONSE")
                    if(priority!=""):
                        if(priority[-2:]=="P1"): 
                            newSR.setValue("reportedpriority",  "1");
                        elif(priority[-2:]=="P2"):
                            newSR.setValue("reportedpriority",  "2");
                        elif(priority[-2:]=="P3"):
                            newSR.setValue("reportedpriority",  "3");
                        elif(priority[-2:]=="P4"):
                            newSR.setValue("reportedpriority",  "4");
            else:
                long_desc =  currentInspectField.getString("TXTRESPONSE");
                newSR.setValue("DESCRIPTION_LONGDESCRIPTION",long_desc );
        if(countQuestion == 1):
            return;
        currentInspectField=inspfieldresultSet.moveNext();
     
             
              


##### Main

mxServer = MXServer.getMXServer()
userInfo = mxServer.getSystemUserInfo()

ticketid = '';

#Check if related record already created
# planned = False;
# if (mbo.getString("REFERENCEOBJECT")=="WORKORDER" or  mbo.getString("REFERENCEOBJECT")=="WOACTIVITY") :
 # planned = True;
# else:
 # planned = False;
 
 

#iterate through the responses
resultSet = mbo.getMboSet("INSPFIELDRESULT");
#resultSet.setOrderBy("INSPFIELDNUM")
 
txtres = "";
y= 0 ;
i= 0 ;
ticketid="";
workSet = mbo.getMboSet("WORKORDER");
 

# if mbo.getString("PARENT") is not None:
    # workSet = mbo.getMboSet("PARENTWO");
# else:
    # workSet = mbo.getMboSet("WORKORDER");
    
if workSet is not None:
    work = workSet.moveFirst();
    
   
inspfieldnumList=[];   
alreadyDone=False;   

for i in range(0,resultSet.count()):
    currentResult = resultSet.getMbo(i);  

    ## Check if you need to create a New SR
    countSet=currentResult.getMboSet("$INSPFIELDOPTION","INSPFIELDOPTION","inspfieldnum=:inspfieldnum and orgid=:orgid and :txtresponse=description and (requireaction=1 or description like 'Fail%')");   
    canCreateSR=False;
    if countSet.count() > 0:
        canCreateSR=True;
  
    if  canCreateSR and currentResult.getString("FUPOBJECT")=="":
    
        ## add a new sr
        SR=None;
        if ( work is not None ) :
             ## scheduled SR
            SR = work.createServiceRequest();
        else: 
            ## unscheduled SR
            srSet= mxServer.getMboSet("SR", userInfo );
            SR= srSet.add();
            srSet.save()
            srSet.close()
            
        ## get the created SR    
        newSRSet = mbo.getMboSet("$NewWO","SR","TICKETID='" + str(SR.getString("TICKETID")) + "' ");
        newSR=newSRSet.moveFirst();
        
        if(newSR is not None):
            
            # copy location and assetnum
            if mbo.getString("LOCATION"):
                newSR.setValue("LOCATION",mbo.getString("LOCATION"));         
            if mbo.getString("ASSET"):
                newSR.setValue("ASSETNUM",mbo.getString("ASSET"));         
            
            
            ticketid = newSR.getString("ticketid")
            
            ## copy Doclinks and description logic
            srDoclinksSet=newSR.getMboSet("DOCLINKS");
            inspfieldresultSet=currentResult.getMboSet("$INSPFIELDRESULT","INSPFIELDRESULT","resultnum=:resultnum and inspquestionnum=:inspquestionnum and ( txtresponse not like 'Pass%' OR txtresponse IS NULL ) and orgid=:orgid order by INSPFIELDNUM desc");
            #resultSet.setOrderBy("INSPQUESTIONNUM, INSPFIELDNUM")
            copyDescAndDoclinks(srDoclinksSet,inspfieldresultSet,newSR)
            
            currentResult.setValue("FUPOBJECT","SR");
            currentResult.setValue("FUPOBJECTID",ticketid);
            currentResult.setValue("DISPLAYMESSAGE","ticket " + str(ticketid) + " created");                                         
            newSRSet.save()
            newSRSet.close() 
            
        resultSet.save()
         
        txtres =  txtres + "<br/>"  + ticketid
           
if ticketid !="": 
    errorgroup = "cu_createsr"
    errorkey = "inspectionmsg"
    params = [txtres]
else:
    errorgroup = "cu_createsr"
    errorkey = "noinspectionmsg"