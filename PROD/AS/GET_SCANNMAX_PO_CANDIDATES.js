var body = { pos: [] };

try {
  load('nashorn:mozilla_compat.js');
} catch (err) { }

importPackage(Packages.psdi.server);
importPackage(Packages.psdi.util.logging);
importPackage(Packages.psdi.mbo);

var logger = MXLoggerFactory.getLogger("maximo.script.GET_SCANNMAX_DATA");

fixPos();

logger.info('Successfully fix PO');

var responseBody = JSON.stringify(body);

function fixPos() {

  var documentText = JSON.parse(requestBody).documentText + '';

  var poSet = MXServer.getMXServer().getMboSet('PO', request.getUserInfo());

  var date = new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0].toString();

  poSet.setWhere("'" + documentText.substring(0, 28000) + "' like CONCAT(CONCAT('% ',REPLACE(REPLACE(ponum, '_', ''), '-', '')),' %') and statusdate >= '" + date + "' and exists (select value from synonymdomain where domainid = 'POSTATUS' and maxvalue in ('APPR', 'INPRG') and value = status)");

  for (var poMbo = poSet.moveFirst(); poMbo !== null; poMbo = poSet.moveNext()) {
    body.pos.push(
      {
        poid: poMbo.getString("POID") + '',
        ponum: poMbo.getString("PONUM") + '',
        vendor: poMbo.getString("VENDOR") + '',
        siteid: poMbo.getString("SITEID") + '',
      });
  }
}

var scriptConfig={
    "autoscript": "GET_SCANNMAX_PO_CANDIDATES",
    "description": "Try to find PO for the given invoice text",
    "version": "1.0",
    "active": true,
    "logLevel": "ERROR",
    "allowInvokingScriptFunctions": false
};