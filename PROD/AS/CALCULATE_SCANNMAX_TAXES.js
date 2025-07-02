var body = { linesTaxTotal: [] };

try {
  load('nashorn:mozilla_compat.js');
} catch (err) {}

importPackage(Packages.psdi.server);
importPackage(Packages.psdi.util.logging);
importPackage(Packages.psdi.mbo);

var logger = MXLoggerFactory.getLogger("maximo.script.CALCULATE_SCANNMAX_TAXES");

var lines = JSON.parse(requestBody).lines;

calculateTaxesForPoLines();
calculateTaxesForInvoiceLines();

logger.info('Successfully retrieved tax');

var responseBody = JSON.stringify(body);

function calculateTaxesForPoLines() {
  if(!request.getQueryParam('ponum')) {
    return;
  }

  var poSet = MXServer.getMXServer().getMboSet('PO', request.getUserInfo());
  var poMbo = getCurrentPoRevisionOrLast(poSet);

  if(!poMbo) {
    return;
  }

  var duplicatedPoMbo = duplicatePo(poSet, poMbo);

  var poLineSet = duplicatedPoMbo.getMboSet('POLINE');

  for(var poLineMbo = poLineSet.moveFirst(); poLineMbo !== null; poLineMbo=poLineSet.moveNext())
  {
    var line = lines.filter(function (line) { return poLineMbo.getInt('POLINENUM') === line.polinenum });

    if(line.length > 0){

      if(line[0].linecost) {
        poLineMbo.setValue('LINECOST', line[0].linecost);
      }
  
      body.linesTaxTotal.push(
        { 
          id: line[0].id,
          lineTax1: poLineMbo.getString("TAX1") + '', 
          lineTax2: poLineMbo.getString("TAX2") + '', 
          lineTax3: poLineMbo.getString("TAX3") + '', 
          lineTax4: poLineMbo.getString("TAX4") + '', 
          lineTax5: poLineMbo.getString("TAX5") + ''
        });
    }

    removeAlreadyCalculatedLine(line[0]);
  }

  poLineSet.close();
  poSet.close();
}

function getCurrentPoRevisionOrLast(poSet) {
  var ponum = request.getQueryParam('ponum');


  if(poSet.count() === 0) {
    return null;
  }
  
  if(poSet.count() === 1) {
    return poSet.moveFirst();
  }
  
  if (poSet.count() > 0) {
    poSet.setWhere("PONUM = '" + ponum + "' and exists (select value from synonymdomain where domainid = 'POSTATUS' and maxvalue = 'APPR' and value = status)");
    if(poSet.count() === 0) {
      poSet.setWhere("PONUM = '" + ponum + "' and exists (select value from synonymdomain where domainid = 'POSTATUS' and maxvalue = 'INPRG' and value = status)");
    }
  }

  if(poSet.count() === 0) {
    poSet.setWhere("PONUM = '" + ponum + "'");
  }

  poSet.setOrderBy('REVISIONNUM');

  return poSet.moveLast();
}

function duplicatePo(poSet, poMbo) {
  poSet.setAutoKeyFlag(false);
  var duplicatedPoMbo = poSet.add();
  poSet.setAutoKeyFlag(true);

  duplicatedPoMbo.setValue('ORDERDATE', poMbo.getString("ORDERDATE"));
  duplicatedPoMbo.setValue('VENDOR', poMbo.getString("VENDOR"));
  duplicatedPoMbo.setValue('DESCRIPTION', poMbo.getString("DESCRIPTION"));

  var poLineSet = poMbo.getMboSet('POLINE');
  var duplicatedPoLineSet = duplicatedPoMbo.getMboSet('POLINE');
  poLineSet.copy(duplicatedPoLineSet);

  return duplicatedPoMbo;
}

function isPoExist() {
  var ponum = request.getQueryParam('ponum');
  var poSet = MXServer.getMXServer().getMboSet('PO', request.getUserInfo());
  poSet.setWhere("PONUM = '" + ponum + "'");
  return poSet.count() > 0;
}

function removeAlreadyCalculatedLine(line) {
  if(line) {
    var indexToRemove = lines.map(function(l) { return l.id; } ).indexOf(line.id);
    lines.splice(indexToRemove, 1);
  }
}

function calculateTaxesForInvoiceLines() {
  if(isVendorExist()) {
    var invoiceSet = MXServer.getMXServer().getMboSet('INVOICE', request.getUserInfo());
  
    var newTemporaryInvoiceMbo = createInvoice(invoiceSet);
    setVendor(newTemporaryInvoiceMbo);
    calculateInvoiceLineTaxes(newTemporaryInvoiceMbo);
  
    invoiceSet.close();
  }
}

function isVendorExist() {
  var vendor = request.getQueryParam('vendor');
  var companySet = MXServer.getMXServer().getMboSet('COMPANIES', request.getUserInfo());
  companySet.setWhere("COMPANY = '" + vendor + "'");
  return companySet.count() > 0;
}

function createInvoice(invoiceSet) {
  invoiceSet.setAutoKeyFlag(false);
  var newTemporaryInvoiceMbo = invoiceSet.add();
  invoiceSet.setAutoKeyFlag(true);
  return newTemporaryInvoiceMbo;
}

function setVendor(invoiceMbo) {
  var vendor = request.getQueryParam('vendor');
  invoiceMbo.setValue('VENDOR', vendor);
}

function calculateInvoiceLineTaxes(invoiceMbo) {
  lines.forEach(function (line) {
    var invoiceLineSet = invoiceMbo.getMboSet('INVOICELINE');
    var newInvoiceLine = invoiceLineSet.add();
    newInvoiceLine.setValue('DESCRIPTION', 'test');
    
    if(line.linecost) {
      newInvoiceLine.setValue('LINECOST', line.linecost);
    }

    body.linesTaxTotal.push(
      { 
        id: line.id,
        lineTax1: invoiceMbo.getString("TOTALTAX1FORUI") + '', 
        lineTax2: invoiceMbo.getString("TOTALTAX2FORUI") + '', 
        lineTax3: invoiceMbo.getString("TOTALTAX3FORUI") + '', 
        lineTax4: invoiceMbo.getString("TOTALTAX4FORUI") + '', 
        lineTax5: invoiceMbo.getString("TOTALTAX5FORUI") + ''
      });

    newInvoiceLine.delete();
    invoiceLineSet.close();
  });
}