from psdi.server import MXServer
from psdi.util.logging import MXLogger
from psdi.util.logging import MXLoggerFactory
from psdi.util import MXApplicationWarningException
from psdi.common.context import UIContext
from com.ibm.tivoli.maximo.script import ScriptService

if interactive:
		# Yes/No dialog are you sure
		def yes():
			# define the logger
			logger = MXLoggerFactory.getLogger("maximo.script")
			def log(message):
				"Adds the message input to the autoscript maximo logger"
				logger.info("\tRELOADCACHE: " + str(message))
				return

			# get the cache names
			mxServer = MXServer.getMXServer()
			cacheArray = mxServer.getMaximoCacheNames()

			# iterate through loggers
			for cache in cacheArray:
				log(str(cache))
				mxServer.reloadMaximoCache(cache, True)
				

			messagegroup = "MCERELOADCACHEGROUP"
			messagekey = "MCERELOADCACHEKEY"
				
			wcs = service.webclientsession()
			wcs.showMessageBox( messagegroup, messagekey, None)
		
		def no():
		    
		    mbo.undelete()
 
		def dflt():
			service.log("dflt")
			service.yncerror("MCERC", "MCERELOADC")
		cases = {service.YNC_NULL:dflt,service.YNC_YES:yes,service.YNC_NO:no}
		x = service.yncuserinput()
		cases[x]()