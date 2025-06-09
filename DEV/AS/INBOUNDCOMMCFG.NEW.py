"""
PROPERTY OF BPD ZENITH																
AUTHOR:         K St-Claire																		
CREATED DATE:   20/09/2023																
SCRIPTNAME:     INBOUNDCOMMCFG.NEW	

Inserts the correct base values for Email Listener for Attatchment.
"""

if app == "EMAILATT":
    mbo.setValue("DESCRIPTION","Email Listener for Attatchments")
    mbo.setValue("EMAILFOLDER","INBOX")
    mbo.setValue("WFPROCESS","LSNRBP2")
    mbo.setValue("PREPROCESSOR","bpd.common.emailstner.attachment.PreprocessorExt")
    mbo.setValue("OBJKEYDELIMITER",":")
    mbo.setValue("EMAILDELETION",0)
    mbo.setValue("CRONTASKNAME","LSNRCRON2")
    mbo.setValue("CRONTASKINSTANCE","LSNR7")
    mbo.setValue("PROTOCOL","imaps")
    mbo.setValue("LANGCODE","EN")
    mbo.setValue("HASLD",0)
    mbo.setValue("ASYNC",0)
    mbo.setValue("STARTTLS",0)