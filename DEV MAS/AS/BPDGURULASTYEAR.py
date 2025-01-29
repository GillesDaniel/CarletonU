#
# BPDGURULASTYEAR
# Date September 2022
# Author P Paraiso
# Company BPD Zenith Ltd
# 
# Publish Last Year of logintracking data to GURU
#
# MAR-2024 - Update by R Hutchinson restructured to process two event payloads, login and logout. 

from psdi.server import MXServer

def export_annual(event_type, max_events):
    server = MXServer.getMXServer()
    userInfo = server.getSystemUserInfo()
    dbProductName =  server.getDatabaseProductName().upper()
    

    if "DB2" in dbProductName:
        if event_type == "login":
            whereClause = "ATTEMPTDATE >= (CURRENT DATE  -1 YEAR) AND ATTEMPTRESULT IN ('LOGIN')"
        else:  
            whereClause = "ATTEMPTDATE >= (CURRENT DATE  -1 YEAR) AND ATTEMPTRESULT IN ('LOGOUT', 'SYSLOGOUT', 'TIMEOUT')"
    elif "ORACLE" in dbProductName:
        if event_type == "login":
            whereClause = "ATTEMPTDATE >= SYSDATE - 365 AND ATTEMPTRESULT IN ('LOGIN')"
        else:  
            whereClause = "ATTEMPTDATE >= SYSDATE - 365 AND ATTEMPTRESULT IN ('LOGOUT', 'SYSLOGOUT', 'TIMEOUT')"
    elif "MICROSOFT SQL SERVER" in dbProductName: 
        if event_type == "login":
            whereClause = "ATTEMPTDATE >= DATEADD(year, -1, GETDATE()) AND ATTEMPTRESULT IN ('LOGIN')"
        else:  
            whereClause = "ATTEMPTDATE >= DATEADD(year, -1, GETDATE()) AND ATTEMPTRESULT IN ('LOGOUT', 'SYSLOGOUT', 'TIMEOUT')"

    server.lookup("MIC").exportData("BPDLICENSETYPES", "BPDLICENSETYPE", whereClause, userInfo, max_events)

# Login Events
export_annual("login", 5000)

# Logout Events
export_annual("logout", 5000)