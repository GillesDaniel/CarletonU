try {
  load('nashorn:mozilla_compat.js');
} catch (err) { }

importPackage(Packages.psdi.server);
importPackage(Packages.psdi.util.logging);
importPackage(Packages.psdi.mbo);

var logger = MXLoggerFactory.getLogger("maximo.script.DENORMALIZE_SCANNMAX_DATA");

denormalizeVendors();

logger.info('Successfully denormalize vendors');

function denormalizeVendors() {
  var properties = MXServer.getMXServer().getConfig();
  var filterFieldNameSection = properties.getProperty('scannmax.vendorFilter.fieldName');
  var customVendorFieldsSection = properties.getProperty('scannmax.customVendor.fields');

  var vendorSet = MXServer.getMXServer().getMboSet('COMPANIES', MXServer.getMXServer().getSystemUserInfo());
  
  vendorSet.setWhere("DISABLED=0");

  var denormalizedVendors = { vendors: [] };

  for (var vendorMbo = vendorSet.moveFirst(); vendorMbo !== null; vendorMbo = vendorSet.moveNext()) {
    var denormalizedVendor = {
      orgid: vendorMbo.getString("ORGID") + '',
      companiesid: vendorMbo.getInt("COMPANIESID"),
      name: vendorMbo.getString("NAME") + '',
      company: vendorMbo.getString("COMPANY") + '',
      type: vendorMbo.getString("TYPE") + '',
      remitaddress1: vendorMbo.getString("REMITADDRESS1") + '',
      remitaddress2: vendorMbo.getString("REMITADDRESS2") + '',
      remitaddress3: vendorMbo.getString("REMITADDRESS3") + '',
      remitaddress4: vendorMbo.getString("REMITADDRESS4") + '',
      remitaddress5: vendorMbo.getString("REMITADDRESS5") + '',
      address1: vendorMbo.getString("ADDRESS1") + '',
      address2: vendorMbo.getString("ADDRESS2") + '',
      address3: vendorMbo.getString("ADDRESS3") + '',
      address4: vendorMbo.getString("ADDRESS4") + '',
      address5: vendorMbo.getString("ADDRESS5") + '',
    };
    if(filterFieldNameSection) {
      denormalizedVendor[filterFieldNameSection] = vendorMbo.getBoolean(filterFieldNameSection) + '';
    }

    if(customVendorFieldsSection) {
      var extraFields = getExtraCompanyFields(customVendorFieldsSection);

      extraFields.map(function (extraField) {
        denormalizedVendor[extraField] = vendorMbo.getString(extraField) + '';
      })
    }

    denormalizedVendors.vendors.push(denormalizedVendor);
  }
  vendorSet.close();

  var scannmaxDenormalizeDataSet = MXServer.getMXServer().getMboSet('SCANNMAXDENORMALIZED', MXServer.getMXServer().getSystemUserInfo());
  scannmaxDenormalizeDataSet.setWhere("OBJECTNAME = 'VENDORS'");

  var scannmaxDenormalizeVendorMbo = getScannmaxDenormalizeVendorMbo(scannmaxDenormalizeDataSet);

  scannmaxDenormalizeVendorMbo.setValue('OBJECTNAME', 'VENDORS');
  scannmaxDenormalizeVendorMbo.setValue('DENORMALIZEDDATA', JSON.stringify(denormalizedVendors.vendors));

  scannmaxDenormalizeDataSet.save();
  scannmaxDenormalizeDataSet.close();
}

function getScannmaxDenormalizeVendorMbo(scannmaxDenormalizeDataSet) {
  if(scannmaxDenormalizeDataSet.count() === 0) {
    return scannmaxDenormalizeDataSet.add();
  } else {
    return scannmaxDenormalizeDataSet.moveFirst();
  }
}

function getExtraCompanyFields(customVendorFieldsSection) {
  var extraTablesWithAttributes = RegExp('(?:,|^)([a-zA-Z]{1,}?\\{.*?\\})').exec(customVendorFieldsSection);
  while(extraTablesWithAttributes !== null){
    customVendorFieldsSection = customVendorFieldsSection.replace(extraTablesWithAttributes[0],'');
    extraTablesWithAttributes = RegExp('(?:,|^)([a-zA-Z]{1,}?\\{.*?)\\}').exec(customVendorFieldsSection);
  }

  return customVendorFieldsSection.split(',').filter(function (extraField){
    return extraField;
  });
}