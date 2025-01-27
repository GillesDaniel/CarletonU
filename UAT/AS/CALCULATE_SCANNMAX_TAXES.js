var body = { linesTaxTotal: [] };

try {
  load('nashorn:mozilla_compat.js');
} catch (err) {}

importPackage(Packages.psdi.server);
importPackage(Packages.psdi.util.logging);
importPackage(Packages.psdi.mbo);
importPackage(Packages.psdi.app.common);

var logger = MXLoggerFactory.getLogger("maximo.script.CALCULATE_SCANNMAX_TAXES");

var lines = JSON.parse(requestBody).lines;

var invoiceSet = MXServer.getMXServer().getMboSet('INVOICE', request.getUserInfo());
var temporaryInvoiceMbo = createInvoice(invoiceSet);
var invoiceLineSet = temporaryInvoiceMbo.getMboSet('INVOICELINE');
var myDummyInvoiceLine = invoiceLineSet.add();

var taxCalculator = new Taxes(myDummyInvoiceLine);

lines.forEach(function (line) {
  body.linesTaxTotal.push(
    {
      id: line.id,
      lineTax1: taxCalculator.calculateTax(line.linecost, line.tax1Code, 1),
      lineTax2: taxCalculator.calculateTax(line.linecost, line.tax2Code, 2),
      lineTax3: taxCalculator.calculateTax(line.linecost, line.tax3Code, 3),
      lineTax4: taxCalculator.calculateTax(line.linecost, line.tax4Code, 4),
      lineTax5: taxCalculator.calculateTax(line.linecost, line.tax5Code, 5),
    });
});

temporaryInvoiceMbo.delete();
myDummyInvoiceLine.delete();
invoiceLineSet.close();
invoiceSet.close();

logger.info('Successfully retrieved tax');

var responseBody = JSON.stringify(body);

function createInvoice(invoiceSet) {
  invoiceSet.setAutoKeyFlag(false);
  invoiceSet.setInsertSite(request.getQueryParam('siteid'));
  var newTemporaryInvoiceMbo = invoiceSet.add();
  invoiceSet.setAutoKeyFlag(true);
  return newTemporaryInvoiceMbo;
}