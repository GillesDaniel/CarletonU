from psdi.server import MXServer
from psdi.util.logging import MXLogger
from psdi.util.logging import MXLoggerFactory

# define the logger
logger = MXLoggerFactory.getLogger("maximo.script")
def log(message):
    "Adds the message input to the autoscript maximo logger"
    logger.info("\tReload Cache: " + str(message))
    return

# get the cache names
mxServer = MXServer.getMXServer()
#cacheArray = mxServer.getMaximoCacheNames()
# cacheArray = [
#      'ADMINMODE','ALNDATA','ATTRFORM','AUTOINIT','AUTOKEYCACHE','BBOARDCACHE','BMARK','CLASSDATA',
#      'CTRLCONDPROP','DataRestriction','DMCEMGR','DMEVENTLISTENERMGR','DOMAINCACHE',
#      'dpamswusagerange','EventListenerRegistration','EXPFUNC','IFACEPROC','IMGLIB','INSIGHT',
#      'INTLISTENER','INTOBJECT','LookupKeyMap','MASPRODANDAPP','MASPRODAPPANDOPT','MaxConditionCache',
#      'MAXDOMAIN','MaxDomValConditionCache','MAXEXTIFACEOUT','MAXEXTSYSTEM','MAXIFACEIN','MAXIMODD',
#      'MAXIMOMLDD','MAXLOGGERCACHE','MAXMESSAGECACHE','MAXPROP','MAXRECORDLOCKCACHE','MAXSVC',
#      'MAXVARS','NOTFMSG','NUMDATA','OBJECTAPPAUTH','OBJFORM','OSEVENT','OSLCACT','OSLCDOMAIN',
#      'OSLCERR','OSLCMAP','OSLCRES','OSNOTF','PRESENTATION','PUBENGINE','QUEUE','RAUTH',
#      'REPORTATACHUNCPATH','REPORTDATASOURCE','REPORTEMAILFILE','REPORTEXPVALUE','SCRIPT','SET',
#      'SIGNATURE','SITE','SKDDD','SYNDATA','THREADLOG','UITEXTDATA','WFMBONAME'
#  ]
cacheArray = ['COMPANIES','COMPMASTER']

# iterate through loggers
for cache in cacheArray:
    log("Reloading cache: %s" % str(cache))
    mxServer.reloadMaximoCache(cache, True)