from psdi.server import MXServer

ALL_SERVERS = True
MXServer.getMXServer().reloadMaximoCache(ALL_SERVERS)

responseBody = "Refresh Completed"