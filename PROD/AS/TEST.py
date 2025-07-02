from psdi.server import MXServer
mxs = MXServer.getMXServer()
date = mxs.getDate()
print(date)