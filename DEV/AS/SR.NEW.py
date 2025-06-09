"""
Created by: BPD Zenith

This automation script performs the following functions:
    - Create and populate the reviewers for safety bulletins
"""

# Imports
from psdi.mbo import MboConstants
from psdi.server import MXServer
from psdi.util.logging import MXLoggerFactory

myLogger = MXLoggerFactory.getLogger("maximo.script.scripts")

myLogger.info("------ SR.NEW version 0.1 script started")

# SR logic
if app == "MCESAFETY" or not(app):
  myLogger.info("------ SR.NEW version 0.1 script started ------ SR is Safety Bulletin")

# initialise some common variables
  ticketid = mbo.getString("ticketid")

  stdactionslistSet = mbo.getMboSet("MCESTDACT")

  currMbo=stdactionslistSet.moveFirst()
  while currMbo is not None:
      actionby = stdactionslistSet.getString("MCEACTIONBY")
      reviewer = stdactionslistSet.getString("MCEREVIEWER")
      orgid = stdactionslistSet.getString("ORGID")
      siteid = stdactionslistSet.getString("SITEID")
      stdactnum = stdactionslistSet.getString("STDACTNUM")
      myLogger.info("------ SR.NEW ------ SR is Safety Bulletin" +stdactionslistSet.getString("STDACTNUM"))
      cnrsafetyactionslistSet = mbo.getMboSet("MCESAFETYACTIONS")
      cnrsafetyactionslist = cnrsafetyactionslistSet.add()
      cnrsafetyactionslist.setValue("TICKETID", ticketid)
      cnrsafetyactionslist.setValue("ORGID", orgid)
      cnrsafetyactionslist.setValue("SITEID", siteid)
      cnrsafetyactionslist.setValue("ACTIONBY", actionby)
      cnrsafetyactionslist.setValue("REVIEWER", reviewer,MboConstants.NOACCESSCHECK)
      cnrsafetyactionslist.setValue("STDACTNUM", stdactnum)			 		
      currMbo=stdactionslistSet.moveNext()
else:
  myLogger.info("------ SR.NEW version 0.1 script started ------ SR is NOT Safety Bulletin")