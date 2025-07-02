from psdi.server import MXServer
from psdi.common.context import UIContext
from psdi.webclient.system.controller import SessionContext, Utility, WebClientEvent

#mxServer = MXServer.getMXServer()
context = UIContext.getCurrentContext()
if context:
    wcs = service.webclientsession() #context.getWebClientSession()
    Utility.sendEvent(WebClientEvent("statusworkfin", wcs.getCurrentPageId(), None, SessionContext(wcs)))