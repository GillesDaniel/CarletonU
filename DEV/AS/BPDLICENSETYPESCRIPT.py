#BPDLICENSETYPESCRIPT
#Created Date 2022 08 26
#Updated Date 2024 03 29
#Author P IRVING
#Company BPD Zenith
#Purpose
#This script will find the users license type and set the value of the None Persistent BPDTYPE field on MAXUSER
#This is part of BPD Zeniths Global Usage Reporting Utility and must remain active for license compliance

try:
    #Check it's being run from the cron
    if not interactive:

        #Get all the modules they have SAVE access to, exclude CHANGEPSWD,'TLOAMSWCTG',Self Service Apps including SRMOBILE, and any apps where the MAINOBJECT uses the CUSTAPP service
        modules = mbo.getMboSet("BPDMAXMODULES")

        myCount = modules.count()

        #if the user only has save access to self service applications then they are SELFSERVICE
        if myCount == 0:
            licensetype = 'SELFSERVICE'
            #Check if they have read only access as they need to be limited if so
            roApps = mbo.getMboSet("BPDROAPPS")
            if not roApps.isEmpty():
                licensetype = 'LIMITED'
            
            #Check if they have any mobile apps (apart from Self Service)
            mobApps = mbo.getMboSet("BPDMOBAPPS")
            if not mobApps.isEmpty():
                licensetype = 'LIMITED'

        # if the user has save access to 3 or less modules then they are LIMITED
        elif myCount <= 3:
            licensetype = 'LIMITED'
            #Check they dont have admin modules as they need to be BASE or PREMIUM if so
            adminModules = ['SETUP','UTIL','INT','SCHEDULER']
            moduleMbo = modules.moveFirst()
            while moduleMbo is not None:
                module = moduleMbo.getString("MODULE")
                if module in adminModules:
                    licensetype = 'BASE'
                    #Get all the applications where the user has SAVE access and the app is an industry solution i.e. PLUS% or based on PLUS%
                    plusApps = mbo.getMboSet("BPDAPPAUTH")
                    #if the user has save access to more than 3 modules and one or more PLUS% apps then they are PREMIUM
                    if not plusApps.isEmpty():
                        licensetype = 'PREMIUM'
                moduleMbo = modules.moveNext()

        #if the user has save access to more than 3 modules, but no PLUS% apps (industry solutions) then they are BASE
        else:
            licensetype = 'BASE'
            #Get all the applications where the user has SAVE access and the app is an industry solution i.e. PLUS% or based on PLUS%
            plusApps = mbo.getMboSet("BPDAPPAUTH")
            #if the user has save access to more than 3 modules and one or more PLUS% apps then they are PREMIUM
            if not plusApps.isEmpty():
                licensetype = 'PREMIUM'


        mbo.setValue("BPDTYPE", licensetype, 11L)

except:
    service.log_debug("This Script only runs from Cron Tasks")


# BEGIN NOTES #
#
#BPDMAXMODULES Relationship
#Find All Apps they have Save Access to
#exclude CHANGEPSWD,'TLOAMSWCTG','CONTSFW' and any apps where the MAINOBJECT uses the CUSTAPP service
#Self Service Incidents HSE/OAG, Appointment Book, MOC Request, Vehicle Request, Bill Review, Create Condition Report,
#MCELIMITED Security group grants access for a user to edit work orders that have been assigned to them
#This is excluded from the modules count, meaning someone could technically have 0 modules, but it is not excluded from the read only relationship meaning they will end up with LIMITED
#SELECT * FROM maxmodules WHERE
#module IN (SELECT moduleapp FROM MAXMENU WHERE menutype='MODULE' AND ELEMENTTYPE = 'APP' AND KEYVALUE IN (SELECT app FROM applicationauth WHERE app not in ('CHANGEPSWD','TLOAMSWCTG','STARTCNTR','CONTSFW','PLUSGMCR','APPTBOOK','PLUSTVR','PLUSPPBILL','PLUSCONDRE') and app not in (select app from maxapps where maintbname in (SELECT objectname FROM maxobject WHERE servicename='CUSTAPP')) AND OPTIONNAME LIKE 'SAVE' AND GROUPNAME IN (SELECT GROUPNAME FROM GROUPUSER WHERE GROUPNAME!='MCELIMITED' AND USERID = :USERID))) AND MODULE != 'SSDR'
#
#BPDAPPAUTH Relationship
#Get all the applications where the user has SAVE access and the app is an industry solution i.e. PLUS% or based on PLUS%
#Excluding the SS Apps and Asset Templates and Calibration app
#SELECT * FROM applicationauth WHERE
#(APP LIKE 'PLUS%' OR APP in (select app from maxapps where originalapp like 'PLUS%')) AND app not in ('CHANGEPSWD','TLOAMSWCTG','PLUSGMCR','APPTBOOK','PLUSTVR','PLUSPPBILL','PLUSCONDRE','PLUSCTMPLT','PLUSDSPLAN') AND OPTIONNAME LIKE 'SAVE' AND GROUPNAME IN (SELECT GROUPNAME FROM GROUPUSER WHERE USERID = :USERID)
#
#BPDROAPPS Relationship
#Get all applications where the user has read access and the app is not a custom app or self service app
#Select * from applicationauth WHERE
#optionname = 'READ' AND GROUPNAME IN (SELECT GROUPNAME FROM GROUPUSER WHERE USERID = :USERID) AND app in (select app from maxapps where apptype='RUN') AND app NOT IN (SELECT keyvalue FROM maxmenu WHERE menutype='MODULE' AND ELEMENTTYPE ='APP' AND moduleapp='SSDR') AND app NOT IN ('CHANGEPSWD','TLOAMSWCTG','CONTSFW','SFWLICVIEW','RPTOUTPUT','STARTCNTR','PLUSGMCR','APPTBOOK','PLUSTVR','PLUSPPBILL','PLUSCONDRE') and app not in (select app from maxapps where maintbname in (SELECT objectname FROM maxobject WHERE servicename='CUSTAPP'))
#
#BPDMOBAPPS Relationship
#Get all the applications where the user has access to Mobile apps. Excluding the SR Mobile app.
#Select * from applicationauth WHERE
#GROUPNAME IN (SELECT GROUPNAME FROM GROUPUSER WHERE USERID = :USERID) and app in ('MAXANYWH','INSPECTION','TECHMOBILE','SUPMOBILE','ASSETMOBILE','ICMOBILE')
#
#END NOTES #