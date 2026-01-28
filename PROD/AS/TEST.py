from psdi.server import MXServer
mxs = MXServer.getMXServer()
date = mxs.getDate()
print(date)

scriptConfig="""{
    "autoscript": "TEST",
    "description": "",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false
}"""