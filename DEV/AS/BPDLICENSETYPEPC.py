#
# BPDLICENSETYPEPC
# Date September 2022
# Author P Paraiso
# Company BPD Zenith Ltd
# 
# Publish Last 24 hours of logintracking data to GURU
# Update by PIRVING to take 25 hours worth instead of last day
#
# MAR-2024 - Update by R Hutchinson restructured to process two event payloads, login and logout. 

from psdi.server import MXServer

def export_events(event_type, max_events):
    server = MXServer.getMXServer()
    userInfo = server.getSystemUserInfo()
    dbProductName = server.getDatabaseProductName().upper()
    whereClause = ""

    if "DB2" in dbProductName:
        if event_type == "login":
            whereClause = "ATTEMPTDATE >= (CURRENT_TIMESTAMP - 25 HOURS) AND ATTEMPTRESULT IN ('LOGIN')"
        else:  
            whereClause = "ATTEMPTDATE >= (CURRENT_TIMESTAMP - 25 HOURS) AND ATTEMPTRESULT IN ('LOGOUT', 'SYSLOGOUT', 'TIMEOUT')"
    elif "ORACLE" in dbProductName:
        if event_type == "login":
            whereClause = "ATTEMPTDATE >= (SYSDATE - (25/24)) AND ATTEMPTRESULT IN ('LOGIN')"
        else:  
            whereClause = "ATTEMPTDATE >= (SYSDATE - (25/24)) AND ATTEMPTRESULT IN ('LOGOUT', 'SYSLOGOUT', 'TIMEOUT')"
    elif "MICROSOFT SQL SERVER" in dbProductName:
        if event_type == "login":
            whereClause = "ATTEMPTDATE >= DATEADD(hour, -25, GETDATE()) AND ATTEMPTRESULT IN ('LOGIN')"
        else:  
            whereClause = "ATTEMPTDATE >= DATEADD(hour, -25, GETDATE()) AND ATTEMPTRESULT IN ('LOGOUT', 'SYSLOGOUT', 'TIMEOUT')"
    
    server.lookup("MIC").exportData("BPDLICENSETYPES", "BPDLICENSETYPE", whereClause, userInfo, max_events)

# Login Events
export_events("login", 5000)

# Logout Events
export_events("logout", 5000)
