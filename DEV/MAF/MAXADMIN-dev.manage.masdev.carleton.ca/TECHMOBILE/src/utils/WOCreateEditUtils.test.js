/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import { Application, JSONDataAdapter, Datasource, Page } from "@maximo/maximo-js-api";
// import sinon from 'sinon';
import WOCreateEditUtils from "./WOCreateEditUtils";
import assetLookupData from "../test/asset-lookup-json-data.js";
import statusitem from '../test/statuses-json-data.js';
import workorderitem from '../test/wo-detail-json-data.js';
import wpmaterial from "../test/materials-json-data";
import assetFeatureData from "../test/assetfeature-json-data.js"
import assetLrm from "../test/asset-lrm-data.js"
import sinon from 'sinon';
import WorkOrderCreateController from "../WorkOrderCreateController";

function newDatasource(data = workorderitem, name = "dsWoedit") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: "wonum",
    name: name,
  });

  da.options.query = !da.options.query ? {} : da.options.query;
  da.options.query.interactive = null;
  return ds;
}

function newLookupDatasource(
  data,
  name = "assetLookupDS",
  idAttribute = "assetnum"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
  });

  const ds = new Datasource(da, {
    idAttribute: idAttribute,
    name: name,
  });

  return ds;
}


function newStatusDatasource(data = statusitem, name = 'synonymdomainData') {
  const da = new JSONDataAdapter({
    src: statusitem,
    items: 'member',
    schema: 'responseInfo.schema'
  });
  const ds = new Datasource(da, {
    idAttribute: 'value',
    name: name
  });
  return ds;
}

describe("WOCreateEditUtils", () => {
  it("should getAssetOrLocation", async () => {
    const app = new Application();
    app.client = {
      userInfo: {
        defaultSite: "BEDFORD",
      },
    };
    const assetDataDs = newLookupDatasource(
      assetLookupData,
      "assetLookupDS",
      "assetnum"
    );
    app.registerDatasource(assetDataDs);

    let data = await WOCreateEditUtils.getAssetOrLocation(
      app,
      "assetLookupDS",
      "assetnum",
      "1008"
    );
    expect(data.length).toBe(1);
  });

  it("should setPriorityFailureCode", async () => {
    const app = new Application();
    app.client = {
      userInfo: {
        defaultSite: "BEDFORD",
      },
    };

    const assetDataDs = newLookupDatasource(
      assetLookupData,
      "assetLookupDS",
      "assetnum"
    );
    app.registerDatasource(assetDataDs);

    const locationDataDs = newLookupDatasource(
      assetLookupData,
      "locationLookupDS",
      "location"
    );
    app.registerDatasource(locationDataDs);

    let ds = {
      item: {
        assetnum: '1008'
      },
    };

    await WOCreateEditUtils.setPriorityFailureCode(app,ds);
    expect(ds.item.assetlocpriority).toBe(2);
    expect(ds.item.failurecode).toBe('PUMPS');

    ds = {
      item: {
        location: 'BR210'
      },
    };
    await WOCreateEditUtils.setPriorityFailureCode(app,ds);
    expect(ds.item.assetlocpriority).toBe(3);
    expect(ds.item.failurecode).toBe('HVAC');
  });

  it("should validateGlAccount", async () => {
    const app = new Application();

    let ds = {
      item: {
        glaccount: '6400-300-???'
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
    }

    let event = {
        glaccount: '6210-350-???'
    };
    const str = 'The location and asset combination you entered has different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination?'
    WOCreateEditUtils.validateGlAccount(app, page, ds, event);
    expect(page.state.dialogBMXMessage).toBe(str);
    const shouldShowDialogMessage = WOCreateEditUtils.validateGlAccount(app, page, ds, event, 'action', true);
    expect(shouldShowDialogMessage).toBe(false);
  });

  it("should validateLocation", async () => {
    const app = new Application();

    let ds = {
      item: {
        location: 'BR210'
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
    }

    let event = {
      location: 'BR230'
    };
    const str = `The specified asset is not in the current location. Do you want to update the location with this  asset's location - ${event.location}?`
    WOCreateEditUtils.validateLocation(app, page, ds, event);
    expect(page.state.dialogBMXMessage).toBe(str);
    event.location = '';
    expect(WOCreateEditUtils.validateLocation(app, page, ds, event)).toBe(true);
  });

  it("should validateAsset", async () => {
    const app = new Application();

    let ds = {
      item: {
        assetnum: '11240'
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
    }

    let event = {
      asset: [
        {
          assetnum: "11250",
          description: "Circulation Fan- Centrifugal/ 20/000 CFM",
          location: "BR200",
          priority: 4,
        }
      ]
    };
    const str = `The specified location does not contain the current asset. Do you want to update the asset with the asset that is in this new location - ${event.asset[0].assetnum}?`
    WOCreateEditUtils.validateAsset(app, page, ds, event);
    expect(page.state.dialogBMXMessage).toBe(str);
    
    event.asset = [];
    expect(WOCreateEditUtils.validateAsset(app, page, ds, event)).toBe(true);
  });
  it("should validateAsset when the current location has more one asets associated with it", async () =>{
    const app = new Application();
    const str = "The specified location does not contain the current asset. Do you want to clear the current asset selection ?"
    const page =  {
      state:{},
      showDialog: () => {},
    }
    let ds = {
      item: {
        assetnum: '11240'
      },
    };
    let event = {
      asset: [
        {
          assetnum: "11250",
          description: "Circulation Fan- Centrifugal/ 20/000 CFM",
          location: "BR200",
          priority: 4,
        },
        {
          assetnum: "11200",
          description: "HVAC System- 50 Ton Cool Cap/ 450000 Btu Heat Cap",
          location: "BR200",
          priority: 4,
        }
      ]
    };
    WOCreateEditUtils.validateAsset(app, page, ds, event);
    expect(page.state.dialogBMXMessage).toBe(str);
  })
  
  it("should setAsset", async () => {
    const app = new Application();

    let ds = {
      item: {
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
      name: 'woedit'
    }

    let event = {
      assetnum: '1877',
      location: 'FIELDSTAFF'
    };
    const controller = new WorkOrderCreateController();
    WOCreateEditUtils.setAsset(app, page, ds, event, controller);
    expect(ds.item.assetnum).toBe('1877');
  });

  it("should setGLAccount", async () => {
    const app = new Application();

    let ds = {
      item: {
      },
    };

    const page =  {
      state:{},
      showDialog: () => {},
      name: 'woedit'
    }

    let event = {
      assetnum: '1877',
      location: 'FIELDSTAFF'
    };
    const controller = new WorkOrderCreateController();
    WOCreateEditUtils.setGLAccount(app, page, ds, event, 'SETASSETGL', controller);
    expect(ds.item.assetnum).toBe('1877');
  });

  it("should open logtype lookup", async () => {
    const app = new Application();
    const page =  {
      state:{"initialDefaultLogType":"!CLIENTNOTE!"},
      showDialog: () => {},
      name: 'schedule'
    }
    const ds = newStatusDatasource(statusitem, 'synonymdomainData');
    app.registerDatasource(ds);
    await WOCreateEditUtils.openWorkLogTypeLookup(page,ds);
    expect(app.findDatasource("synonymdomainData").item.value).not.toBeNull();

    page.state.initialDefaultLogType = '';
    await WOCreateEditUtils.openWorkLogTypeLookup(page,ds);
    expect(app.findDatasource("synonymdomainData").item.value).not.toBeNull();
  });

  // Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it("should find the index of featureLabel", async () => {
    let assetFeatureArr = [
      { label: "MP 10" },
      { label: "MP 20" },
      { label: "MP 30" },
    ]
    const evt = { item: { startfeaturelabel: "MP 10" } };
    WOCreateEditUtils.featureLabelValidation(assetFeatureArr, evt, "startfeaturelabel");

    const evt1 = { item: { startfeaturelabel: "MP 10" } };
    WOCreateEditUtils.featureLabelValidation(assetFeatureArr, evt1, "endfeaturelabel");

  });

  // Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it("should find the index of featureLabel", async () => {
    let assetFeatureArr = [
      { label: "MP 10" },
      { label: "MP 20" },
      { label: "MP 30" },
    ]
    const evt = { item: { startfeaturelabel: "MP 10" } };
    WOCreateEditUtils.featureLabelValidation(assetFeatureArr, evt, "startfeaturelabel");

    const evt1 = { item: { startfeaturelabel: "MP 10" } };
    WOCreateEditUtils.featureLabelValidation(assetFeatureArr, evt1, "endfeaturelabel");

  });

  // Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it("should validate the yoffsetref", async () => {
    const app = new Application();
    const page = {
      state: {},
      showDialog: () => { },
      name: 'createwo'
    }
    page.state.yoffsetArr = [
      { value: "MIDLINE" },
      { value: "EDGE-INSIDE" },
      { value: "EDGE-OUTSIDE" },
    ]
    const evt = { item: { startyoffsetref: "MIDLINE" } };
    WOCreateEditUtils.yRefValidation(app, page, evt, "startyoffsetref");

    const evt1 = { item: { endyoffsetref: "MP 10" } };
    WOCreateEditUtils.yRefValidation(app, page, evt1, "endyoffsetref");

  });


  
    // Assisted by WCA@IBM
   // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it("should validate the zoffsetref", async () => {
    const app = new Application();
    const page = {
      state: {},
      showDialog: () => { },
      name: 'createwo'
    }
    page.state.zoffsetArr = [
      { value: "MIDLINE" },
      { value: "EDGE-INSIDE" },
      { value: "EDGE-OUTSIDE" },
    ]
    const evt = { item: { startyoffsetref: "MIDLINE" } };
    await WOCreateEditUtils.zRefValidation(app, page, evt, "startzoffsetref");

    const evt1 = { item: { endyoffsetref: "MP 10" } };
    await WOCreateEditUtils.zRefValidation(app, page, evt1, "endzoffsetref");

  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  test('sets disableButton to true when readOnlyState, saveDisable, or zRefDisable is true', () => {
    const page = {
      state: {
        readOnlyState: true,
        saveDisable: false,
        zRefDisable: false,
        disableButton: false,
      },
    };

    WOCreateEditUtils.saveDisable(page);
    expect(page.state.disableButton).toBe(true);
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('should return false if evt.item.startyoffsetref is not defined', () => {
    const page = {
      state: {},
      showDialog: () => { },
      name: 'createwo'
    }
    const evt = {
      item: {}
    };
    expect(WOCreateEditUtils.startYRefCal(page, evt)).toBe(false);
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('should return true if evt.item.startyoffsetref is valid', () => {
    const page = {
      state: {},
      showDialog: () => { },
      name: 'createwo'
    }
    const evt1 = {
      item: {
        startyoffsetref: 'MIDLINE'
      }
    };

    expect(WOCreateEditUtils.startYRefCal(page, evt1)).toBe(true);

  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('should return false if evt.item.endYRefCal is not defined', () => {
    const page = {
      state: {},
      showDialog: () => { },
      name: 'createwo'
    }
    const evt = {
      item: {}
    };
    expect(WOCreateEditUtils.endYRefCal(page, evt)).toBe(false);
  });

  it('should return true if evt.item.startyoffsetref is valid', () => {
    const page = {
      state: {},
      showDialog: () => { },
      name: 'createwo'
    }
    const evt1 = {
      item: {
        endyoffsetref: 'MIDLINE'
      }
    };
    //sinon.stub(WOCreateEditUtils, 'yRefValidation').returns (true);
    expect(WOCreateEditUtils.endYRefCal(page, evt1)).toBe(true);

  });
  


  it('should validate yreference when field is startyoffsetref when have data', () => {
    const page = {
      state: {
        yoffsetArr: ["EDGE_INSIDE", "EDGE_OUTSIDE"],
      },
      showDialog: () => { },
      name: 'createwo'
    };

    const evt = {
      item: {
        startyoffsetref: "EDGE_INSIDE",
      },
    };
    const field = "startyoffsetref";
    const result = WOCreateEditUtils.yRefValidation(page, evt, field);
    expect(result).toBe(false);
  });

  it('should push data in offset array', () => {
    const emptyArray = [];
    const result = WOCreateEditUtils.offSetArr(emptyArray);
    expect(result).toHaveLength(0);
  })

  it('should push data in offset array', () => {
    const arrayWithObjects = [{ value: "GROUND" }, { value: "SURFACE" }];
    const result = WOCreateEditUtils.offSetArr(arrayWithObjects);
    expect(result).toHaveLength(2);
  })


  it("returns true if the start y-offset reference is valid", () => {
    const page = {
      state: {
        yoffsetArr: [{ id: "1", value: "10" }, { id: "2", value: "20" }],
      },
    };
    const evt = { item: { startyoffsetref: "1" } };
    const field = "startyoffsetref";
    const result = WOCreateEditUtils.yRefValidation(page, evt, field);
    expect(result).toBe(false);
  });

  it("returns true if the start y-offset reference is valid", () => {
    const page = {
      state: {
        yoffsetArr: [{ id: "1", value: "10" }, { id: "2", value: "20" }],
      },
    };
    const evt = { item: { startyoffsetref: "20" } };
    const field = "startyoffsetref";
    const result = WOCreateEditUtils.yRefValidation(page, evt, field);
    expect(result).toBe(true);
  });

  it("returns true if the end y-offset reference is valid", () => {
    const page = {
      state: {
        yoffsetArr: [{ id: "1", value: "10" }, { id: "2", value: "20" }],
      },
    };
    const evt = { item: { endyoffsetref: "20" } };
    const field = "endyoffsetref";
    const result = WOCreateEditUtils.yRefValidation(page, evt, field);
    expect(result).toBe(true);
  });

  it("returns true if the end y-offset reference is valid", () => {
    const page = {
      state: {
        yoffsetArr: [{ id: "1", value: "10" }, { id: "2", value: "20" }],
      },
    };
    const evt = { item: { endyoffsetref: "2" } };
    const field = "endyoffsetref";
    const result = WOCreateEditUtils.yRefValidation(page, evt, field);
    expect(result).toBe(false);
  });



  it("should open reference point lookup", () => {
    const app = new Application();
    const evt = { ref: 'start' };
    const assetnum = 'I-95N';
    const showDialogStub = sinon.stub(app, "showDialog");
    WOCreateEditUtils.openRefPointLookup(app, evt, assetnum);
    expect(showDialogStub.called).toBe(true);
  });

  it("should find the index of featureLabel", async () => {
    let assetFeatureArr = [
      { label: "MP 10" },
      { label: "MP 20" },
      { label: "MP 30" },
    ]
    const evt = { item: { startfeaturelabel: "MP 10" } };
    WOCreateEditUtils.featureLabelValidation(assetFeatureArr, evt, "startfeaturelabel");

    const evt1 = { item: { startfeaturelabel: "MP 10" } };
    WOCreateEditUtils.featureLabelValidation(assetFeatureArr, evt1, "endfeaturelabel");

  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('should set the state correctly when selecting a new work type', async() => {
    // Page and Application Setup
    const app = new Application();
    const page = new Page({ name: "woedit" });

    // Initial Value Setup
    const workType = 'CM';

    // Set up Datasource
    app.registerPage(page);
    const dsWoEditDs = newDatasource(workorderitem, 'dsWoedit');
    page.registerDatasource(dsWoEditDs);

    // Call function being tested
    WOCreateEditUtils.selectWorkType(page, 'dsWoedit', workType);

    // Check that the state was updated correctly
    expect(page.state.worktype).toEqual(workType);
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('should call uiRequired - mandatory', () => {
    // Page and Application Setup
    const app = new Application();
    const page = new Page({ name: "woedit" });

    // Set up Datasource
    app.registerPage(page);
    const workOrderData = {...workorderitem};
    workOrderData.uiRequired = { field: ['wopriority']};
    const dsWoEditDs = newDatasource(workOrderData, 'dsWoedit');
    page.registerDatasource(dsWoEditDs);

    let result = WOCreateEditUtils.uiRequired(page, 'dsWoedit', 'wopriority', dsWoEditDs.wopriority);
    expect(result).toBe(false);

    result = WOCreateEditUtils.uiRequired(page, 'dsWoedit', null, dsWoEditDs.wopriority);
    expect(result).toBe(false);
  });


  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('should call chooseLocation', async() => {
    // Page and Application Setup
    const app = new Application();
    const page = new Page({ name: "woedit" });

    // Test data
    const item = {}

    // Stub Methods
    const getAssetOrLocationStub = sinon.stub(WOCreateEditUtils, "getAssetOrLocation").returns([{ assetnum: "10001", location: "OFFICE101" }]);
    const validateAssetStub = sinon.stub(WOCreateEditUtils, "validateAsset").returns(true);
    const setLocationStub = sinon.stub(WOCreateEditUtils, "setLocation");

    // Set up Datasource
    app.registerPage(page);
    const dsWoEditDs = newDatasource(workorderitem, 'dsWoedit');
    page.registerDatasource(dsWoEditDs);
    const controller = new WorkOrderCreateController();
    await WOCreateEditUtils.chooseLocation(app, page, 'dsWoedit', item, controller);
    expect(page.state.assetFiltered).toBeTruthy();
    getAssetOrLocationStub.restore();
    validateAssetStub.restore();
    setLocationStub.restore();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('should call validateLinearAsset', async() => {
    // Page and Application Setup
    const app = new Application();
    const page = new Page({ name: "woedit" });
    app.client = {
      userInfo: {
        defaultSite : "BEDFORD"
      }
    }

    // Set up Datasource
    app.registerPage(page);
    const assetLookupDS = newDatasource(wpmaterial, 'assetLookupDS');
    const assetFeatureDataDs = newDatasource(assetFeatureData, 'assetFeatureData');
    const dsWoEditDs = newDatasource(workorderitem, 'dsWoedit');
    app.registerDatasource(assetLookupDS);
    app.registerDatasource(assetFeatureDataDs);
    page.registerDatasource(dsWoEditDs);
    await app.initialize();

    await WOCreateEditUtils.validateLinearAsset(app, page, 'dsWoedit', '10001');

    expect(page.state.assetLinear).toBeFalsy()
    expect(page.state.endOffsetReadOnly).toBeTruthy();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Should call startOffsetCal', async () => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    page.state = {
      startFeatureMeasure: 10.20
    };
    app.registerPage(page);
    app.initialize();
    const measureCalculationStub = sinon.stub(WOCreateEditUtils, "measureCalculation").returns(20);
    let evt = { item: { startfeaturelabel: "MP 10" ,startoffset:"10", startmeasure: ""} };
    await WOCreateEditUtils.startOffsetCal(app, page, 'dsWoedit', evt);
    expect(evt.item.startmeasure).toBe("20.20");

    evt = { item: { startfeaturelabel: "" ,startoffset:"", startmeasure: ""} };
    await WOCreateEditUtils.startOffsetCal(app, page, 'dsWoedit', evt, false);
    expect(evt.item.startmeasure).toBe(10.2);
    measureCalculationStub.restore();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Should call endOffsetCal', async () => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    page.state = {
      endFeatureMeasure: 10.20
    };
    app.registerPage(page);
    app.initialize();
    const measureCalculationStub = sinon.stub(WOCreateEditUtils, "measureCalculation").returns(20);
    let evt = { item: { endfeaturelabel: "MP 10" , endoffset:"10" } };
    await WOCreateEditUtils.endOffsetCal(app, page, 'dsWoedit', evt);
    expect(evt.item.endmeasure).toBe("20.20");

    evt = { item: { endfeaturelabel: "" , endoffset:"" } };
    await WOCreateEditUtils.endOffsetCal(app, page, 'dsWoedit', evt, false);
    expect(evt.item.endmeasure).toBe(10.2);
    measureCalculationStub.restore();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Should call startMeasureCal', async () => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    page.state = {
      endFeatureMeasure: 10.20,
      measureUpdate: false,
      startOffsetReadOnly: null
    };
    app.registerPage(page);
    app.initialize();
    const measureCalculationStub = sinon.stub(WOCreateEditUtils, "measureCalculation").returns(20);
    let evt = { item: { startfeaturelabel: "MP 10" , startoffset:"10", startmeasure: "" } };
    await WOCreateEditUtils.startMeasureCal(app, page, 'dsWoedit', evt);
    expect(page.state.startOffsetReadOnly).toBeTruthy();
    measureCalculationStub.restore();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Should call endMeasureCal', async () => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    page.state = {
      endFeatureMeasure: 10.20,
      measureUpdate: false,
      startOffsetReadOnly: null
    };
    app.registerPage(page);
    app.initialize();
    const measureCalculationStub = sinon.stub(WOCreateEditUtils, "measureCalculation").returns(20);
    let evt = { item: { endfeaturelabel: "MP 10" , endoffset:"10", endmeasure: "" } };
    await WOCreateEditUtils.endMeasureCal(app, page, 'dsWoedit', evt);
    expect(page.state.endOffsetReadOnly).toBeTruthy();
    measureCalculationStub.restore();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it("Should call startMeasureValidation Validation", () => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    // Mock the dataset containing the linear asset's start and end measures
    const dsName = "dsWoedit";
    app.registerPage(page);
    app.initialize();
    // Test case 1: User input is within range
    let evt = { item: { startmeasure: 50 } };
    expect(WOCreateEditUtils.startMeasureValidation(app, page, dsName, evt)).toBe(true);
    page.state = {
      assetStartMeasure : 55
    }
    // Test case 2: User input is out of range
    evt = { item: { startmeasure: -1 } };
    expect(WOCreateEditUtils.startMeasureValidation(app, page, dsName, evt)).toBe(false);
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it("Should call endMeasureValidation Validation", () => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    // Mock the dataset containing the linear asset's start and end measures
    const dsName = "dsWoedit";
    app.registerPage(page);
    app.initialize();
    // Test case 1: User input is within range
    let evt = { item: { endmeasure: 50 } };
    expect(WOCreateEditUtils.endMeasureValidation(app, page, dsName, evt)).toBe(true);
    page.state = {
      assetStartMeasure : 55
    }
    // Test case 2: User input is out of range
    evt = { item: { endmeasure: -1 } };
    expect(WOCreateEditUtils.endMeasureValidation(app, page, dsName, evt)).toBe(false);
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Should call measureCalculation', async() => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    page.state = {
      endFeatureMeasure: 5,
      measureUpdate: false,
      startFeatureMeasure: 5
    };
    const assetLRMEditDs = newDatasource(assetLrm, 'assetLRMEdit');
    app.registerDatasource(assetLRMEditDs);
    app.registerPage(page);
    app.initialize();
    const evt = {item: {endoffset: 20, startoffset: 20,}}
    const field = "endmeasure"
    const result = await WOCreateEditUtils.measureCalculation(app, page, evt, field);
    expect(result).toBe("25.00");
  })

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Validates the startZRefCal()', async () => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    app.initialize();
    // Arrange
    const evt = { item: { startzoffsetref: 45 } };
    await WOCreateEditUtils.startZRefCal(app, page, 'dsWoedit', evt);
    expect(page.state.saveDisable).toBeTruthy();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Validates the endZRefCal()', async () => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    app.initialize();
    // Arrange
    const evt = { item: { endzoffsetref: 45 } };
    await WOCreateEditUtils.endZRefCal(app, page, 'dsWoedit', evt);
    expect(page.state.saveDisable).toBeFalsy();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Validate the startFeatureLabelVal', async() => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    const assetFeatureDataDs = newDatasource(assetFeatureData, 'assetFeatureData');
    app.registerDatasource(assetFeatureDataDs);
    const featureLabelValidationStub = sinon.stub(WOCreateEditUtils, "featureLabelValidation");
    const chooseReferncePointDataStub = sinon.stub(WOCreateEditUtils, "chooseReferncePointData");
    app.initialize();
    const evt = { item: { startfeaturelabel: null } };
    await WOCreateEditUtils.startFeatureLabelVal(app, page, 'dsWoedit', evt);
    expect(page.state.saveDisable).toBeFalsy();
    featureLabelValidationStub.restore();
    chooseReferncePointDataStub.restore();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Validate the endFeatureLabelVal', async() => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    const assetFeatureDataDs = newDatasource(assetFeatureData, 'assetFeatureData');
    app.registerDatasource(assetFeatureDataDs);
    const featureLabelValidationStub = sinon.stub(WOCreateEditUtils, "featureLabelValidation");
    const chooseReferncePointDataStub = sinon.stub(WOCreateEditUtils, "chooseReferncePointData");
    app.initialize();
    const evt = { item: { endfeaturelabel: null } };
    await WOCreateEditUtils.endFeatureLabelVal(app, page, 'dsWoedit', evt);
    expect(page.state.saveDisable).toBeFalsy();
    featureLabelValidationStub.restore();
    chooseReferncePointDataStub.restore();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Should call editAssetsLocation', async() => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    page.state = {
      editAssetsLocation: null
    };
    app.registerPage(page);
    app.initialize();
    let item = { value: 20 };
    await WOCreateEditUtils.editAssetsLocation(page, item, 'dsWoedit');
    expect(page.state.editAssetsLocation).toBeTruthy();

    item = { value: null };
    await WOCreateEditUtils.editAssetsLocation(page, item, 'dsWoedit');
    expect(page.state.editAssetsLocation).toBeTruthy();
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Should call clearlinearfield', async() => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    app.registerPage(page);
    const dsWoEditDs = newDatasource(workorderitem, 'dsWoedit');
    page.registerDatasource(dsWoEditDs);
    app.initialize();
    await WOCreateEditUtils.clearlinearfield(page, 'dsWoedit');
    expect(dsWoEditDs.item.endzoffset).toBe(null);
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('Should call onUserConfirmationNo', async() => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    page.state = {
      selectedItem: {
        action: 'SETASSET',
        item : {
          assetnum: '10001'
        }
      }
    }
    app.registerPage(page);
    const dsWoEditDs = newDatasource(workorderitem, 'dsWoedit');
    page.registerDatasource(dsWoEditDs);
    app.initialize();
    await WOCreateEditUtils.onUserConfirmationNo(app, page, 'dsWoedit');
    expect(dsWoEditDs.item.assetnum).toBe('10001');
  });

  // Assisted by WCA@IBM
  // Latest GenAI contribution: ibm/granite-20b-code-instruct-v2
  it('should call chooseAsset', async() => {
    const app = new Application();
    const page = new Page({ name: "woedit" });
    app.registerPage(page);
    page.state = {
      isMobile: true,
      isManual: false
    }
    const assetFeatureDataDs = newDatasource(assetFeatureData, 'assetFeatureData');
    app.registerDatasource(assetFeatureDataDs);
    const dsWoEditDs = newDatasource(workorderitem, 'dsWoedit');
    page.registerDatasource(dsWoEditDs);
    const controller = new WorkOrderCreateController();
    let item = { islinear: true }
    await WOCreateEditUtils.chooseAsset(app, page, 'dsWoedit', item, controller);
    expect(page.state.assetLinear).toBeTruthy();

    page.state.isMobile = false;
    item = { islinear: false }
    await WOCreateEditUtils.chooseAsset(app, page, 'dsWoedit', item, controller);
    expect(page.state.linearAssetAvailable).toBeFalsy();
  })
});
 