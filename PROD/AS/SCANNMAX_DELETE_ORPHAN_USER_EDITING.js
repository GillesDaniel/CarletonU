try {
  try {
    load('nashorn:mozilla_compat.js');
  } catch (err) {}
  importPackage(Packages.psdi.server);
  importPackage(Packages.psdi.util.logging);
  importPackage(Packages.psdi.mbo);
  var logger = MXLoggerFactory.getLogger("maximo.script.SCANNMAXUSEREDITING");

  var scannmaxSet = MXServer.getMXServer().getMboSet('SCANNMAX', mbo.getUserInfo());

  var scannmaxIds = '';

  for(var currMbo = scannmaxSet.moveFirst(); currMbo !== null; currMbo=scannmaxSet.moveNext())
  {
    scannmaxIds +=  currMbo.getInt('SCANNMAXID').toString() + ",";
  }
  scannmaxSet.close()
  scannmaxIds = scannmaxIds.slice(0, -1);

  var scannmaxUserEditingSet = MXServer.getMXServer().getMboSet('SCANNMAXUSEREDITING', mbo.getUserInfo());
  if(scannmaxIds !== '') {
    scannmaxUserEditingSet.setWhere("SCANNMAXID NOT IN (" + scannmaxIds + ")");
  }
  scannmaxUserEditingSet.deleteAll();
  scannmaxUserEditingSet.save()
  scannmaxUserEditingSet.close()

  logger.info('Successfully executed SCANNMAXCLEANORPHANUSEREDITING')
} catch (err) {
  logger.error(err);
}

var scriptConfig={
    "autoscript": "SCANNMAX_DELETE_ORPHAN_USER_EDITING",
    "description": "Will remove the user editing orphan records.",
    "version": "",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false,
    "scriptLaunchPoints": [
        {
            "launchPointName": "SCANNMAX_INVOICE_LAUNCH_POINT",
            "launchPointType": "OBJECT",
            "active": true,
            "description": "Will remove the user editing orphan records.",
            "objectName": "SCANNMAX",
            "save": true,
            "add": false,
            "update": false,
            "delete": true,
            "afterSave": true
        }
    ]
};