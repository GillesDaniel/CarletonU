var body = { pos: [] };

try {
  load('nashorn:mozilla_compat.js');
} catch (err) { }

importPackage(Packages.psdi.server);
importPackage(Packages.psdi.util.logging);
importPackage(Packages.psdi.mbo);

var logger = MXLoggerFactory.getLogger("maximo.script.GET_SCANNMAX_DATA");

var properties = MXServer.getMXServer().getConfig();
var extraField = properties.getProperty('scannmax.get_scannmax_po_candidates.extraField');

if(extraField){
  fixPos(extraField);
}

fixPos('ponum');

logger.info('Successfully fix PO');

var responseBody = JSON.stringify(body);

function fixPos(poAttributeToSearch) {

  var documentText = JSON.parse(requestBody).documentText + '';

  var poSet = MXServer.getMXServer().getMboSet('PO', request.getUserInfo());

  var dateSearch = "TO_DATE('" + getMaxStatusDate() + "','YYYY-MM-DD')";

  var connectionString = getDBServer();

  if(connectionString === 'sqlserver') {
    dateSearch = "CONVERT(DATETIME,'" + getMaxStatusDate() + "',120)";
  }

  poSet.setWhere("'" + documentText.substring(0, 3800) + "' like CONCAT(CONCAT('% ',REPLACE(REPLACE(" + poAttributeToSearch + ", '_', ''), '-', '')),' %') and statusdate >= " + dateSearch + " and exists (select value from synonymdomain where domainid = 'POSTATUS' and maxvalue in ('APPR', 'INPRG') and value = status)");

  for (var poMbo = poSet.moveFirst(); poMbo !== null; poMbo = poSet.moveNext()) {
    body.pos.push(
      {
        poid: poMbo.getInt("POID") + '',
        ponum: poMbo.getString("PONUM") + '',
        vendor: poMbo.getString("VENDOR") + '',
        siteid: poMbo.getString("SITEID") + '',
        statusdate: poMbo.getDate("STATUSDATE") + '',
      });
  }
  poSet.close();
}

function getMaxStatusDate() {
  var days = properties.getProperty('scannmax.get_scannmax_po_candidates.limit.day');
  var currentDate = new Date();
  return new Date(currentDate.setDate(currentDate.getDate() - Number(days))).toISOString().split('T')[0].toString();
}

function getDBServer(){
  return RegExp('jdbc:([a-zA-Z0-9]*):').exec(properties.getProperty('mxe.db.url'))[1];
}