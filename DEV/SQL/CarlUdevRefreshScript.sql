--SELECT
--	propname, propvalue

--FROM
--	MAXPROPVALUE

--WHERE
--	propname in ('mxe.hostname', 'mxe.int.webappurl', 'mxe.db.url', 'Database.SQL.ServerHostName', 'mxe.int.globaldir');

-- variables - generic
	--@HOSTNAME VARCHAR(1024) = '<webapp server name>',	
	--@DBSERVERHOSTNAME VARCHAR(1024) = '<mssql server name>',	
	--@SMP_DIR VARCHAR(1024) = '<SMP DIR>',
	--@GLOBALDIR VARCHAR(1024) = '<GLOBAL DIR>',
	--@TEMP_LOGS VARCHAR(1024) = '<LOG DIR>',
	--@HTTP_DOCUMENT_ROOT VARCHAR(1024) = '<DOCUMENT ROOT>',
	--@DOC_PATH VARCHAR(1024) = '<DOCLINKS DIR>';	
	
 
--new prod

DECLARE
/*-- prod
	@DUMMY_DOMAIN VARCHAR(100) = '@dummy.',
	@DUMMY_FAX VARCHAR(20) = '1-800-555-5555',
	@WEBAPPURL VARCHAR(1024),
	@URL VARCHAR(1024),
	@GLOBALDIR VARCHAR(1024) = '/opt/IBM/maximomif',
	@HOSTNAME VARCHAR(1024) = '<>',	
	@DBSERVERHOSTNAME VARCHAR(1024) = 'maximo.carleton.ca', 
	@SMP_DIR VARCHAR(1024) = '/opt/IBM/SMP', 
	@TEMP_LOGS VARCHAR(1024) = '/opt/IBM/logs', 
	@HTTP_DOCUMENT_ROOT VARCHAR(1024) = '/opt/IBM/DOCLINKS', 
	@DOC_PATH VARCHAR(1024) = '/opt/IBM/DOCLINKS',
	@SCANNMAX_PSWD VARBINARY(MAX) = 0xA4D25FA14A299F91BA1AAE5E92D8EB334041FEB85D60E05E36296EE80BFB74A1,
	@SCANNMAX_URL VARCHAR(250) = 'https://www.scannmax.ca/';
	*/
--new dev
	@ENVIRONMENT_NAME VARCHAR(30) = 'Test',
	@DUMMY_DOMAIN VARCHAR(100) = '@dummy.carlu',
	@DUMMY_FAX VARCHAR(20) = '1-800-555-5555',
	@WEBAPPURL VARCHAR(1024),
	@URL VARCHAR(1024),
	@HOSTNAME VARCHAR(1024) = 'carletonu-test-app.TriNmax-inc.cloud', 
	@GLOBALDIR VARCHAR(1024) = '/opt/IBM/maximomif',
	@DBSERVERHOSTNAME VARCHAR(1024) = 'carletonu-test-db.TriNmax-inc.cloud', 
	@SMP_DIR VARCHAR(1024) = '/opt/IBM/SMP', 
	@TEMP_LOGS VARCHAR(1024) = '/opt/IBM/logs', 
	@HTTP_DOCUMENT_ROOT VARCHAR(1024) = '/opt/IBM/DOCLINKS', 
	@DOC_PATH VARCHAR(1024) = '/opt/IBM/DOCLINKS', 
	@SCANNMAX_PSWD VARBINARY(MAX) = 0xE79C31CFA677919BB79521B78E6F757D339637CE24DF7199766DEA4FE7E30AFCC7BB5903CFC3DAC1,
	@SCANNMAX_URL VARCHAR(250) = 'https://www.staging.scannmax.ca/';
	

-- carletonu-test-db.TriNmax-inc.cloud

-- You may want to disable all the crontasks to avoid escalations, integrations,
-- emailing or whatever automated system you have in place.
update CRONTASKINSTANCE set ACTIVE = 1;
update INBOUNDCOMMCFG set ACTIVE = 1;


-- Update the hostname in the database.
update MAXPROPVALUE set PROPVALUE=@HOSTNAME where propname='mxe.hostname';
update MAXPROPVALUE set PROPVALUE='https://'+@HOSTNAME+'/meaweb' where PROPNAME='mxe.int.webappurl';
update MAXPROPVALUE set PROPVALUE='https://'+@HOSTNAME+'/maxrest/oslc' where PROPNAME='mxe.oslc.restwebappurl';
update MAXPROPVALUE set PROPVALUE='http://'+@HOSTNAME+':80/maximo/oslc' where PROPNAME='mxe.oslc.webappurl';
update MAXPROPVALUE set PROPVALUE='https://'+@HOSTNAME where PROPNAME='mxe.report.birt.proxyurlredirect';

--Logs
update MAXPROPVALUE set PROPVALUE=@TEMP_LOGS where PROPNAME='mxe.logging.rootfolder';

-- Replace all user's email addresses with your email. This may be useful to test workflow or escalations emailing.
update MAXPROPVALUE set PROPVALUE = LOWER(LEFT(PROPVALUE, CHARINDEX('@', PROPVALUE) - 1) + @DUMMY_DOMAIN) where PROPNAME='mxe.adminEmail' AND CHARINDEX('@', PROPVALUE) > 0;
update MAXPROPVALUE set PROPVALUE = LOWER(LEFT(PROPVALUE, CHARINDEX('@', PROPVALUE) - 1) + @DUMMY_DOMAIN) where PROPNAME='mxe.workflow.admin' AND CHARINDEX('@', PROPVALUE) > 0;

-- delete all email references
UPDATE AUTOSCRIPT SET CREATEDBYEMAIL = LOWER(LEFT(CREATEDBYEMAIL, CHARINDEX('@', CREATEDBYEMAIL) - 1) + @DUMMY_DOMAIN) WHERE CREATEDBYEMAIL IS NOT NULL;
UPDATE AUTOSCRIPT SET OWNEREMAIL = LOWER(LEFT(OWNEREMAIL, CHARINDEX('@', OWNEREMAIL) - 1) + @DUMMY_DOMAIN) WHERE OWNEREMAIL IS NOT NULL;
UPDATE COMPCONTACT SET EMAIL = LOWER(REPLACE(REPLACE(EMAIL, '@dummy.cumtn', ''),'@','') + @DUMMY_DOMAIN) WHERE EMAIL IS NOT NULL;
UPDATE COMPCONTACT SET FAXPHONE=@DUMMY_FAX WHERE FAXPHONE IS NOT NULL;
UPDATE COMPCONTACTMSTR SET EMAIL = 'maximo' + @DUMMY_DOMAIN WHERE EMAIL IS NOT NULL;
UPDATE COMPCONTACTMSTR SET FAXPHONE=@DUMMY_FAX WHERE FAXPHONE IS NOT NULL;
UPDATE DPAUSERINFO SET WORKEMAIL = LOWER(LEFT(WORKEMAIL, CHARINDEX('@', WORKEMAIL) - 1) + @DUMMY_DOMAIN) WHERE WORKEMAIL IS NOT NULL;
UPDATE EMAIL SET EMAILADDRESS = LOWER(REPLACE(REPLACE(emailaddress, 'dummy.cumtn', ''),'@','') + @DUMMY_DOMAIN) WHERE EMAILADDRESS IS NOT NULL;
UPDATE INBCOMMSECURITY SET EMAILADDRESS = LOWER(LEFT(EMAILADDRESS, CHARINDEX('@', EMAILADDRESS) - 1) + @DUMMY_DOMAIN) WHERE EMAILADDRESS IS NOT NULL;
UPDATE INBOUNDCOMM SET EMAILADDRESS = LOWER(LEFT(EMAILADDRESS, CHARINDEX('@', EMAILADDRESS) - 1) + @DUMMY_DOMAIN) WHERE EMAILADDRESS IS NOT NULL;
UPDATE INBOUNDCOMMCFG SET ADMINEMAIL = LOWER(LEFT(ADMINEMAIL, CHARINDEX('@', ADMINEMAIL) - 1) + @DUMMY_DOMAIN) WHERE ADMINEMAIL IS NOT NULL;
UPDATE INBOUNDCOMMCFG SET EMAILADDRESS = LOWER(LEFT(EMAILADDRESS, CHARINDEX('@', EMAILADDRESS) - 1) + @DUMMY_DOMAIN) WHERE EMAILADDRESS IS NOT NULL;
UPDATE INCIDENT SET AFFECTEDEMAIL = LOWER(LEFT(AFFECTEDEMAIL, CHARINDEX('@', AFFECTEDEMAIL) - 1) + @DUMMY_DOMAIN) WHERE AFFECTEDEMAIL IS NOT NULL;
UPDATE INCIDENT SET REPORTEDEMAIL = LOWER(LEFT(REPORTEDEMAIL, CHARINDEX('@', REPORTEDEMAIL) - 1) + @DUMMY_DOMAIN) WHERE REPORTEDEMAIL IS NOT NULL;
UPDATE MAXASYNCJOB SET EMAILADDRESS = LOWER(LEFT(EMAILADDRESS, CHARINDEX('@', EMAILADDRESS) - 1) + @DUMMY_DOMAIN) WHERE EMAILADDRESS IS NOT NULL;
UPDATE MAXQUEUE SET EMAILADDR = LOWER(LEFT(EMAILADDR, CHARINDEX('@', EMAILADDR) - 1) + @DUMMY_DOMAIN) WHERE EMAILADDR IS NOT NULL;
UPDATE REPORTOUTPUT SET EMAILADDRESS = LOWER(LEFT(EMAILADDRESS, CHARINDEX('@', EMAILADDRESS) - 1) + @DUMMY_DOMAIN) WHERE EMAILADDRESS IS NOT NULL;
UPDATE REPORTOUTPUTAUTH SET EMAILADDRESS = LOWER(LEFT(EMAILADDRESS, CHARINDEX('@', EMAILADDRESS) - 1) + @DUMMY_DOMAIN) WHERE EMAILADDRESS IS NOT NULL;
UPDATE REPORTRUNQUEUE SET EMAILUSERS = LOWER(LEFT(EMAILUSERS, CHARINDEX('@', EMAILUSERS) - 1) + @DUMMY_DOMAIN) WHERE EMAILUSERS IS NOT NULL;
UPDATE REPORTSCHED SET EMAILUSERS = LOWER(LEFT(EMAILUSERS, CHARINDEX('@', EMAILUSERS) - 1) + @DUMMY_DOMAIN) WHERE EMAILUSERS IS NOT NULL;
UPDATE RFQVENDOR SET EMAIL = LOWER(LEFT(EMAIL, CHARINDEX('@', EMAIL) - 1) + @DUMMY_DOMAIN) WHERE EMAIL IS NOT NULL;
UPDATE SKDPROJECTEMWO SET TOEMAILADDR = LOWER(LEFT(TOEMAILADDR, CHARINDEX('@', TOEMAILADDR) - 1) + @DUMMY_DOMAIN) WHERE TOEMAILADDR IS NOT NULL;
UPDATE SKDPROJECTSCENARIO SET TOEMAILADDR = LOWER(LEFT(TOEMAILADDR, CHARINDEX('@', TOEMAILADDR) - 1) + @DUMMY_DOMAIN) WHERE TOEMAILADDR IS NOT NULL;
UPDATE TICKET SET AFFECTEDEMAIL = LOWER(LEFT(AFFECTEDEMAIL, CHARINDEX('@', AFFECTEDEMAIL) - 1) + @DUMMY_DOMAIN) WHERE AFFECTEDEMAIL IS NOT NULL;
UPDATE TICKET SET REPORTEDEMAIL = LOWER(LEFT(REPORTEDEMAIL, CHARINDEX('@', REPORTEDEMAIL) - 1) + @DUMMY_DOMAIN) WHERE REPORTEDEMAIL IS NOT NULL;
UPDATE COMMTMPLTSENDTO SET SENDTOVALUE = 'maximo' + @DUMMY_DOMAIN WHERE SENDTOVALUE IS NOT NULL AND COMMTMPLTSENDTO.TYPE = 'EMAIL';

-- Update MIF home directory if needed
update MAXPROPVALUE set PROPVALUE= @GLOBALDIR where PROPNAME='mxe.int.globaldir';


-- Set SMP directory
update maxpropvalue set propvalue = @SMP_DIR where propname='Maximo.InstallLocation'
update maxpropvalue set propvalue = @SMP_DIR where propname='CCMDB.InstallLocation'

--******** Set doclink directories
update maxpropvalue set propvalue = @HTTP_DOCUMENT_ROOT where propname='mxe.doclink.doctypes.topLevelPaths' --validate if path is the same on new server as prod
update maxpropvalue set propvalue = @HTTP_DOCUMENT_ROOT where propname='mxe.doclink.doctypes.defpath'
update maxpropvalue set propvalue = @HTTP_DOCUMENT_ROOT + '=https://' + @HOSTNAME   where propname='mxe.doclink.path01'


-- Set doctypes directories (required if above were executed)
update doctypes set defaultfilepath = @HTTP_DOCUMENT_ROOT + '/ATTACHMENTS' where doctype='Attachments'
update doctypes set defaultfilepath = @HTTP_DOCUMENT_ROOT + '/DIAGRAMS' where doctype='Diagrams'
update doctypes set defaultfilepath = @HTTP_DOCUMENT_ROOT + '/IMAGES' where doctype='Images'
update doctypes set defaultfilepath = @HTTP_DOCUMENT_ROOT + '/ASSIST' where doctype='ASSIST'
update doctypes set defaultfilepath = @HTTP_DOCUMENT_ROOT + '/ATTACHMENTS' where doctype='Documents'
update doctypes set defaultfilepath = @HTTP_DOCUMENT_ROOT + '/ATTACHMENTS' where doctype='Documents_MCC'
update doctypes set defaultfilepath = @HTTP_DOCUMENT_ROOT + '/SCANNMAX' where doctype='SCANNMAX'

-- Set Welcome Message --SPECIFY ENVIRONMENT NAME
update maxmessages set value = 'Welcome to Maximo ' + @ENVIRONMENT_NAME where msggroup = 'login' and msgkey = 'welcomemaximomessage'
update maxmessages set value = 'Welcome, {0} on ' + @ENVIRONMENT_NAME where msggroup = 'login' and msgkey = 'welcomeusername'
update maxmessages set value = '<span>IBM</span>'+'&'+'nbsp;<span>Maximo ' + @ENVIRONMENT_NAME+'</span>' where msggroup = 'login' and msgkey = 'welcomemsg_iot18'

-- update ScanNmax properties
update maxpropvalue set encryptedvalue = @SCANNMAX_PSWD where propname='scannmax.client.password' -- update ScanNmax Password
update maxpropvalue set propvalue = @SCANNMAX_URL where propname='scannmax.api.baseUrl' -- update ScanNmax url

--Delete all session
delete maxsession

delete from reportsched;

UPDATE po SET email='#TEST-'+email where EMAIL is not null;
UPDATE companies SET PWEMAIL='#TEST-'+PWEMAIL where PWEMAIL is not null;
UPDATE compcontact SET email='#TEST-'+email where email is not null;
UPDATE maxvars SET varvalue='#TEST-'+varvalue where varvalue is not NULL AND varname='WOGENEMAIL';
UPDATE COMMTMPLTSENDTO SET sendtovalue='#TEST-'+sendtovalue where sendtovalue is not NULL AND type='EMAIL';

UPDATE maxuser set loginid='maxadmin.test@cmailcarletonca.onmicrosoft.com' where userid='maxadmin';
UPDATE email set emailaddress='dev.Max.inv@cunet.carleton.ca' where personid='maxadmin';
UPDATE maxpropvalue set propvalue='maxtest.carleton.ca' where propname='mxe.hostname';
UPDATE maxpropvalue set propvalue='dev.Max.inv@cunet.carleton.ca' where propname='mail.smtp.from';
