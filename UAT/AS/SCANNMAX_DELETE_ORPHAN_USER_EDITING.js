try {
  try {
    load('nashorn:mozilla_compat.js');
  } catch (err) {}
  importPackage(Packages.psdi.server);
  importPackage(Packages.psdi.util.logging);
  importPackage(Packages.psdi.mbo);
  var logger = MXLoggerFactory.getLogger("maximo.script.SCANNMAX_DELETE_ORPHAN_USER_EDITING");

  var scannmaxUserEditingSet = MXServer.getMXServer().getMboSet('SCANNMAXUSEREDITING', mbo.getUserInfo());
  if(mbo.getInt('SCANNMAXID').toString() !== '') {
    scannmaxUserEditingSet.setWhere("SCANNMAXID IN (" + mbo.getInt('SCANNMAXID').toString() + ")");
  }
  scannmaxUserEditingSet.deleteAll();
  scannmaxUserEditingSet.save();
  scannmaxUserEditingSet.close();

  logger.info('Successfully executed SCANNMAX_DELETE_ORPHAN_USER_EDITING');
} catch (err) {
  logger.error(err);
}