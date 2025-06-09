/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import 'regenerator-runtime/runtime';
import allPerson from './test/sr-person-data.js';
import srData from './test/test-sr-data.js';
import locationData from './test/test-location-data.js';
import assetData from './test/test-asset-data.js';
import tkspecitem from './test/test-sr-tktempwithspec-data.js';
import newTestStub from './test/AppTestStub';
import stateprovinceData from './test/test-stateprovince-data.js';
import data from './sr-attributes-list.js';
import sinon from 'sinon';
import newticketspecData from './test/test-newticketspecjds-data.js';
import alnDomainData from './test/test-alndomain-data.js';
import tableDomainData from './test/test-tabledomain-data.js';
import numericDomainData from './test/test-numericdom-data.js';



  async function getApp() {
    let initializeApp = newTestStub({
      currentPage: 'createSR',
      datasources: {
        personDS: {
          data: allPerson
        },
        locationLookupDS: {
          data: locationData
        },
        locationFilterDS: {
          data: locationData
        },
        locationHierarchyDS: {
          data: locationData
        },
        locationMapDS: {
          data: locationData
        },
        assetLookupDS: {
          data: assetData
        },
        assetMapDS: {
          data: assetData
        },
        tktemplateds: {
          data: tkspecitem
        },
        tktempds: {
          data: tkspecitem
        },
        stateProvinceList: {
          data: stateprovinceData
        },
        alndomainDS: {
          data: alnDomainData
        },
        alndomainValidationDS: {
          data: alnDomainData
        },
        numericDomainDS: {
          data: numericDomainData
        },
        numericDomainValidationDS: {
          data: numericDomainData
        },
        tableDomainDS: {
          data: tableDomainData
        }
      },
      onNewApp: (app) => {
        app.client.systemProperties = {
          'sr.filter.site': '0',
          'sr.default.priority': '3',
          'sr.high.priority': '2'
        }
      }
    });
    let app = await initializeApp();
    app.client.userInfo = {
      defaultSite: "BEDFORD",
      personid: 'FITZ',
      displayname: "Fitz Cameron",
      primaryphone: "5582123456789",
      primaryemail: "fitzcam@srmobile.cn",
      location: {
        location:"PLANT-W1",
        siteid: "BEDFORD"
      }
    };
    app.setCurrentPage = jest.fn();
    app.currentPage.params = {
      href: "oslc/os/mxapisr/_U1IvMTAwOA--"
    }
    return app;
  }



  it("should perform basic flow", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let item = app.findDatasource("srDS").item;
    //Check default values
    expect(page.state.ishighpriority).toBe(false);
    expect(item.reportedpriority).toBe(undefined); //If undefined, will be set as default priority during controller.createServiceRequest();
    expect(item.reportedbyid).toBe(app.client.userInfo.personid);
    expect(item.reportedby).toBe(app.client.userInfo.personid);
    expect(item.reportedbyname).toBe(app.client.userInfo.displayname);
    expect(item.reportedphone).toBe(app.client.userInfo.primaryphone);
    expect(item.reportedemail).toBe(app.client.userInfo.primaryemail);
    expect(item.affectedpersonid).toBe(app.client.userInfo.personid);
    expect(item.affectedperson).toBe(app.client.userInfo.personid);
    expect(item.affectedusername).toBe(app.client.userInfo.displayname);
    expect(item.affectedphone).toBe(app.client.userInfo.primaryphone);
    expect(item.affectedemail).toBe(app.client.userInfo.primaryemail);
    expect(item.location).toBe(app.client.userInfo.location.location);
    expect(item.assetnum).toBe(undefined);
    //Submit
    await controller.createServiceRequest();
  });



  it("should handle ticket spec", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    page.params.href = undefined;
    page.params.templateid = "1010";
    let newTicketSpecJDS = page.datasources.newTicketSpecJDS;
    newTicketSpecJDS.dataAdapter.src = "tobereplaced";
    newTicketSpecJDS.dataAdapter.jsonResponse = "tobereplaced";
    app.findDatasource("srDS").item.site = {siteid: "tobedeleted"};
    
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    //Numeric, ALN, DATE, TABLE and TABLE_WITH_DOMAINID
    expect(newTicketSpecJDS.items.length).toBe(5);
    
    //Test ALN domain
    newTicketSpecJDS.currentItem = newTicketSpecJDS.items[1];
    controller.handleALNValueSmartLookupClick(newTicketSpecJDS);
    page.showDialog("alnLookup");

    const newALNValue = {
      item: {
        value: "Y",
        description: "Yes"
      },
      datasource: {
        name: "alndomainDS"
      }
    }
    controller.selectALNValue(newALNValue);

    //Test table domain
    newTicketSpecJDS.currentItem = newTicketSpecJDS.items[3];
    controller.handleTableValueSmartLookupClick(newTicketSpecJDS);
    newTicketSpecJDS.currentItem = newTicketSpecJDS.items[4];
    controller.handleTableValueSmartLookupClick(newTicketSpecJDS);
    const newTableValue = {
      item: {
        domainid: "LINEAR JP",
        value: "JPCAL101"
      },
      datasource: {
        name: "tableDomainDS"
      }
    }
    controller.selectTableValue(newTableValue);
  });

  it("should handle stateprovince", async () => {
    let app = await getApp();
    let page = app.currentPage;
	let controller = page.controllers[0];
    page.params.href = undefined;
    page.params.templateid = "1010";
    let newTicketSpecJDS = page.datasources.newTicketSpecJDS;
    newTicketSpecJDS.dataAdapter.src = "tobereplaced";
    newTicketSpecJDS.dataAdapter.jsonResponse = "tobereplaced";
    app.findDatasource("srDS").item.site = {siteid: "tobedeleted"};
    
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    controller.handleALNValueStateProvinceLookupClick(newTicketSpecJDS);
    page.showDialog("stateProvinceLookup");

    const newStateProvinceValue = {
      item: {
        value: "AK",
        description: "Alaska"
      },
      datasource: {
        name: "stateProvinceList"
      }
    }
    controller.selectStateProvinceValue(newStateProvinceValue);

    //tests validate state province
    controller.validateStateProvince("XX");
    controller.validateStateProvince("AK");

    app.findDatasource("srDS").state.canSave = true;

    controller.validateStateProvince("XX");

  });



  it("should open people lookup and select person", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let srListds = page.datasources.SRListds;
    await srListds.forceReload();
    srListds.dataAdapter.src.items = data.items;
    let event = {
      "_rowstamp": "772377",
      "firstname": "Tom",
      "displayname": "Tom Revis",
      "personid": "REVIS",
      "href": "oslc/os/mxapiperson/_UkVWSVM-",
      "primaryphone": "(617) 745-0879",
      "primaryemail": "tom.revis@intergalactic.net",
      "lastname": "Revis",
      "department": "IT"
    }
    await controller.selectPerson(event);
    expect(page.state.contactdetail).toBe(event.displayname);
    await controller.setContactPersonHubInfo();
  });



  it('should save a new high priority service request', async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    page.state.ishighpriority = true;
    await controller.createServiceRequest();
    let item = app.findDatasource("srDS").item;
    expect(item.reportedpriority).toBe(app.state.sysProp.highPriority);
  });



  it("should select location by drill in", async () => {  
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    await controller.drillInLocation(null);

    //TODO The location DS is empty. Needs investigation
    let dslocation = page.datasources.locationHierarchyDS;
    await controller.drillInLocation(dslocation.items[0]);
    await dslocation.load();
  });



  it("should validate when location and asset mismatch", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    
    const dsasset= page.datasources.assetLookupDS;
    let assetItems = await dsasset.load();
    
    const dslocation = page.datasources.locationLookupDS;
    let locationItems = await dslocation.load();

    await controller.pageInitialized(page, app);

    await controller.selectLocation(locationItems[0]);
    await controller.selectAsset(assetItems[0]);
    await controller.selectLocation(locationItems[1]);
    await controller.selectAsset(assetItems[1]);

    //This is set by user from dialog
    page.state.hasInvalidAsset=true;
    page.state.hasInvalidLocation=true;

    //Submit
    await controller.createServiceRequest();
  });



  it("should be able to clear values set", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let srListds = page.datasources.SRListds;
    await srListds.forceReload();
    srListds.dataAdapter.src.items = data.items;
    
    page.state.location = "LOCATIONTEST1";
    page.state.locationdesc = "LOCATIONTEST1 long description";
    page.state.assetnum = "ASSETTEST1";
    page.state.assetdesc = "ASSETTEST1 long description";

    const items = page.datasources.SRListds.dataAdapter.src.items;
    
    //Clear location
    controller.clearvalue(items[2]);

    expect(page.state.location).toBe("");
    expect(page.state.locationdesc).toBe("");
    expect(page.state.assetnum).toBe("ASSETTEST1");
    expect(page.state.assetdesc).toBe("ASSETTEST1 long description");

    //Clear asset
    controller.clearvalue(items[3]);

    expect(page.state.location).toBe("");
    expect(page.state.locationdesc).toBe("");
    expect(page.state.assetnum).toBe("");
    expect(page.state.assetdesc).toBe("");

    //Set asset and save
    let assetLookupDS = page.datasources.assetLookupDS;
    await assetLookupDS.load();
    await controller.selectAsset(assetLookupDS.items[0]);
    await controller.createServiceRequest();
  });



  it("should handle barcode scan", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    const dsasset= page.datasources.assetLookupDS;
    await dsasset.load();
    
    const dslocation = page.datasources.locationLookupDS;
    await dslocation.load();

    await controller.pageInitialized(page, app);

    //Valid scan for location
    let scanEvent = {value: "BOILER"};
    controller.handleLocationScan(scanEvent);

    //Invalid scan for location
    scanEvent = {value: "BOILAAAAR"};
    controller.handleLocationScan(scanEvent);

    //Valid scan for asset
    scanEvent = {value: "CAL300"};
    controller.handleAssetScan(scanEvent);

    //Invalid scan for asset
    scanEvent = {value: "CAL30000"};
    controller.handleAssetScan(scanEvent);
  });
  


  it("should gotoview", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    const SRListds = page.datasources.SRListds;
    await controller.gotoview(SRListds.item);
  });



  it("should go to certained view", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    await controller.gotoviewBtn("2");
    expect(page.state.splitViewIndex).toBe(2);
  });



  it("should come back from any view", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    await controller.gotoviewBtn("3");
    expect(page.state.splitViewIndex).toBe(3);
    await controller.splitViewChanged();
    expect(page.state.splitViewIndex).toBe(0);
  });



  it("should go to next view", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let srListds = page.datasources.SRListds;
    await srListds.forceReload();
    srListds.dataAdapter.src.items = data.items;

    page.state.splitViewIndex = 2;
    await controller.nextSplitViewPage();
    expect(page.state.splitViewIndex).toBe(3);

    //At last page we go back to the first page
    page.state.splitViewIndex = 6;
    await controller.nextSplitViewPage();
    expect(page.state.splitViewIndex).toBe(0);
  });



  it("should go to previous view", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    page.state.splitViewIndex = 2;
    await controller.prevSplitViewPage(app.findDatasource("srDS").item);
    expect(page.state.splitViewIndex).toBe(1);
  });



  it("should be able to open previous page", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    app.state.pagelist = [];
    app.state.isback = false;
    app.state.isUpdateFromBack = false;
    app.state.selectedTopCategory = "";
    app.state.selectedSubCategory = "";
    app.state.subcategory = "";
    app.state.currSubCategoryID = "";
    app.state.currSubCategoryDesc = "";

    app.state.valuesaved = false;
    app.state.pagelist.push({
      pagename: 'SubCategory',
      id: '1143',
      description: 'HR',
      currID: '1155',
      currDesc: 'TerminateTerminate Employee'
    });
    controller.openPrevPage();

    app.state.pagelist.push({
      pagename: 'tktemp',
      id: '1008',
      description: 'New Employee',
      currID: '1155',
      currDesc: 'TerminateTerminate Employee'
    });
    controller.openPrevPage();

    app.state.pagelist.push({
      pagename: 'newRequest',
      id: '',
      description: ''
    });
    controller.openPrevPage();

    app.state.pagelist = [];
    controller.openPrevPage();

    app.state.valuesaved = false;
    app.state.pagelist.push({
      pagename: 'tktemp',
      id: '1008',
      description: 'New Employee',
      currID: '1155',
      currDesc: 'TerminateTerminate Employee'
    });
    controller.openPrevPage();

    app.state.valuesaved = true;
    app.state.pagelist.push({
      pagename: 'tktemp',
      id: '1008',
      description: 'New Employee',
      currID: '1155',
      currDesc: 'TerminateTerminate Employee'
    });
    controller.openPrevPage();
  });



  it('should open the dialog for the map', async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    controller.pageInitialized(page, app);
    //For location
    controller.openMapDialog(false);
    controller.loadLocationJsonForMap();
    page.state.mapValueSelected="BR210";
    controller.selectValueFromMap();
    //For asset
    controller.openMapDialog(true);
    controller.loadAssetJsonForMap();
    page.state.mapValueSelected="7500";
    controller.selectValueFromMap();
  });



  it("should indicate when data saving fails", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    controller.onSaveDataFailed();
    expect(controller.saveDataSuccessful).toBe(false);      
  });


  
  it("should save on user confirmation dialog when leaving page", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    controller.pageInitialized(page, app);

    page.state.location = "PLAN-W1";
    app.state.valuesaved = false;

    const item = app.findDatasource("srDS").item;
    item.ticketid = "1000";
    item.status = "New";
    item.description_longdescription = "this is long";
    item.latitudey = "this is a latitude";
    item.longitudex = "this is a longitude";
    item.srdescription = "";
    

    let event = {
      target: {
        content: "text"
      }
    }
	  controller.setHubDescription(event);
    controller.onCustomSaveTransition();
  });

  it("should test set hub description", async () => {
    const generateRandomCharacters = function(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%ˆ&*()+;';
      let result = '';  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    };
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    controller.pageInitialized(page, app);

    const item = app.findDatasource("srDS").item;

    let event = {
      target: {
        content: generateRandomCharacters(150000)
      }
    }
        
	  await controller.setHubDescription(event);
    expect(item.description_longdescription.length).toBe(150000);
    expect(page.state.srdescription.length).toBe(150000);

    //Let's test while hub is loading
    event = {
      target: {
        content: generateRandomCharacters(150)
      }
    }
    page.state.isLoadingHub = true;
    await controller.setHubDescription(event);
    expect(item.description_longdescription.length).toBe(150);
    expect(page.state.srdescription.length).toBe(150);
  });


  it("should save service address information", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    page.state.srdescription = "a description";
    page.state.formattedaddress = "a formattedaddress";
    page.state.streetaddress = "a streetaddress";
    page.state.city = "a city";
    page.state.stateprovince = "a stateprovince";
    page.state.latitudey = "a latitude";
    page.state.longitudex = "a longitude";
    
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    //Test the method that is only called from app.xml
    controller.setAddressState();

    //Submit
    await controller.createServiceRequest();
  });



  it("should validate stateprovince field", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];

	  await app.initialize();

    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let item = app.findDatasource("srDS").item;
    //Check stateprovince validation
	  item.stateprovince = "XXX";
    //Submit
    await controller.createServiceRequest();
  });



  it("should validate required fields", async () => {
    let initializeApp = newTestStub({
      currentPage: 'createSR',
      datasources: {
        srDS: {
          data: srData
        }
      }
    });
    let app = await initializeApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    let srDS = app.findDatasource("srDS");
    await srDS.initializeQbe();

    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    expect(page.state.detailrequiredState).toBe(true);
    expect(page.state.contactrequiredState).toBe(true);
    expect(page.state.locationrequiredState).toBe(true);
    expect(page.state.assetrequiredState).toBe(true);
    expect(page.state.addressrequiredState).toBe(false);

    //Set service address fields to indicate required state
    srDS.item.tkserviceaddress = [{
      $formattedaddress_meta: {required: true},
      $streetaddress_meta: {required: true},
      $city_meta: {required: true},
      $stateprovince_meta: {required: true}
    }];
    await controller.retrieveRequiredStates(null, srDS.item);
    expect(page.state.addressrequiredState).toBe(true);
    
    //Clear all fields
    srDS.item.affectedperson = "";
    srDS.item.affectedemail = "";
    srDS.item.affectedphone = "";
    srDS.item.location = "";

    //Submit
    await controller.createServiceRequest();

    //Let's test non-required states
    srDS.schema.required = undefined;
    srDS.item.tkserviceaddress = [{
      $formattedaddress_meta: {required: false},
      $streetaddress_meta: {required: false},
      $city_meta: {required: false},
      $stateprovince_meta: {required: false}
    }];
    await controller.retrieveRequiredStates(srDS.schema, srDS.item);
    expect(page.state.detailrequiredState).toBe(false);
    expect(page.state.contactrequiredState).toBe(false);
    expect(page.state.locationrequiredState).toBe(false);
    expect(page.state.assetrequiredState).toBe(false);
    expect(page.state.addressrequiredState).toBe(false);

    //Test of required states in mobile container
    app.state.isMobileContainer = true;
    await controller.retrieveRequiredStates(srDS.schema);
    srDS.schema.properties.tkserviceaddress = {
      items: {
        required: []
      }
    };
    await controller.retrieveRequiredStates(srDS.schema);
    expect(page.state.addressrequiredState).toBe(false);
    srDS.schema.properties.tkserviceaddress.items.required = ["formattedaddress", "streetaddress", "city", "stateprovince"];
    await controller.retrieveRequiredStates(srDS.schema);
    expect(page.state.addressrequiredState).toBe(true);
  });



  it("should validate ticket mandatory fields", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await app.datasources.tktemplateds.load();
    app.state.selectedtkt = "A category description";
    app.state.isMobileContainer = true;
    page.params.href = undefined;
    page.params.templateid = "1010";
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    const srDS = app.findDatasource("srDS");
    const newSRC = srDS.item.ticketspec;
    
    const newTicketSpecJDS = page.datasources.newTicketSpecJDS;
    newTicketSpecJDS.clearState();
    newTicketSpecJDS.resetState();
    newTicketSpecJDS.lastQuery = {};
    newTicketSpecJDS.dataAdapter.src = newSRC;
    newTicketSpecJDS.dataAdapter.jsonResponse = newSRC;
    await newTicketSpecJDS.load({src: newSRC});

    app.state.isMobileContainer = false;

    //Submit
    await controller.createServiceRequest();
  });



  it("should enable and erase asset input", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    //Disabled by default
    expect(page.state.isAssetEditEnabled).toBe(false);

    //Enable
    controller.enableAssetEdit(true);
    expect(page.state.isAssetEditEnabled).toBe(true);

    //Disable
    controller.enableAssetEdit(false);
    expect(page.state.isAssetEditEnabled).toBe(false);
  });

  it("should return empty service address", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    expect(controller.getItemServiceAddress(null)).toBeNull();
    expect(controller.getItemServiceAddress({})).toBeNull();
    expect(controller.getItemServiceAddress({
      serviceaddress: []
    })).toBeNull();
  });

  it("should return service address from array", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    expect(controller.getItemServiceAddress({
      serviceaddress: [
        {
          latitudey: 50.0,
          longitudex: 50.0
        }
      ]
    })).toEqual({
      latitudey: 50.0,
      longitudex: 50.0
    });
  });

  it("should return service address from object", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    expect(controller.getItemServiceAddress({
      serviceaddress: {
        latitudey: 25.0,
        longitudex: 25.0
      }
    })).toEqual({
      latitudey: 25.0,
      longitudex: 25.0
    });
  });

  it("should return empty service address if it is invalid", async () => {
    let app = await getApp();
    let page = app.currentPage;
    let controller = page.controllers[0];

    expect(controller.getItemServiceAddress({
      serviceaddress: {
        longitudex: 25.0
      }
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: {
        latitudey: 25.0,
        longitudex: 'b'
      }
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: [
        {
          latitudey: 'a',
          longitudex: 25.0
        }
      ]
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: [
        {
          latitudey: 30.0,
        }
      ]
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: [
        {
          latitudey: 30.0,
        }
      ]
    })).toBeNull();

    expect(controller.getItemServiceAddress({
      serviceaddress: 'invalid'
    })).toBeNull();
  });



  it("should cover lines added for DT241758", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    page.params.href = "oslc/os/mxapisr/_U1IvMTA1MQ--";
    page.params.templateid = "1010";
    let newTicketSpecJDS = page.datasources.newTicketSpecJDS;
    newTicketSpecJDS.dataAdapter.src = "tobereplaced";
    newTicketSpecJDS.dataAdapter.jsonResponse = "tobereplaced";
    app.findDatasource("srDS").item.site = {siteid: "tobedeleted"};
    
    await controller.pageInitialized(page, app);

    app.findDatasource("srDS").currentItem.ticketspec = "1010";

    await controller.pageResumed(page);
  });



  it("should be able to save on device when disconnected", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    app.state.isMobileContainer = true;
    app.state.networkConnected = false;

    //Submit
    await controller.createServiceRequest();
  });



  it("should be able to count attachment when edit SR with error", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = "TEMP_HREF/1703082296033";
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    app.state.isMobileContainer = true;
    app.state.networkConnected = false;

    app.findDatasource("srDS").item.doclinks = {
      member: {
        length: 2
      }
    }

    //Submit
    await controller.createServiceRequest();
  });



  it("should be able to edit errored transactions", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = "TEMP_HREF/1703082296033";
    app.currentPage.params.editTrans = true;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    
    await controller.openPrevPage();
    await controller.onCustomSaveTransition();
  });



  it('should treat report and contact person info before save', async () => {
    const editedFullName = "Mike Baguncinha";
    const editedPhone = "123321"
    const editedEmail = "mike@bag.nha"

    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let item = app.findDatasource("srDS").item;

    //Remove reportedby to test if ID is properly set
    item.reportedby = "";

    //User can change contact person info only
    item.affectedusername = editedFullName;
    item.affectedphone = editedPhone;
    item.affectedemail = editedEmail;

    page.datasources.personDS.searchQBE = sinon.spy(() => {
      return [];
    }); 
    
    //Test the preparation of reporter and contact info
    await controller.preparePersonInfoForSave();

    //Validate
    expect(item.reportedbyid).toBe(undefined);
    expect(item.reportedby).toBe(app.client.userInfo.personid);
    expect(item.reportedbyname).toBe(app.state.selectedSR.currentReportedByName);
    expect(item.reportedphone).toBe(app.client.userInfo.primaryphone);
    expect(item.reportedemail).toBe(app.client.userInfo.primaryemail);
    expect(item.affectedpersonid).toBe(undefined);
    expect(item.affectedperson).toBe(editedFullName);
    expect(item.affectedusername).toBe(undefined); //This is because field is nonpersistent, so new username is saved in affectedperson field
    expect(item.affectedphone).toBe(editedPhone);
    expect(item.affectedemail).toBe(editedEmail);

    //Test removal of full name of affected person
    item.affectedusername = "";
    await controller.preparePersonInfoForSave();
    expect(item.affectedpersonid).toBe(undefined);
    expect(item.affectedperson).toBe("");
    expect(item.affectedusername).toBe(undefined);
    expect(item.affectedphone).toBe(editedPhone);
    expect(item.affectedemail).toBe(editedEmail);
  });



  it("should use default Spatial reference when map cannot find it", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    //Default value
    expect(page.state.spatialRefs["ASSET"]).toBe("EPSG:4326");
    expect(page.state.spatialRefs["LOCATION"]).toBe("EPSG:4326");
    expect(page.state.spatialRefs["BASEMAP"]).toBe("EPSG:3857");
    
    app.map = [];
    app.map.getLayerSpatialReference = sinon.spy(() => {
      return null;
    });

    app.map.getBasemapSpatialReference = sinon.spy(() => {
      return null;
    });

    await controller.loadLayerReferences();

    //Even if not retrieved, keep default value
    expect(page.state.spatialRefs["ASSET"]).toBe("EPSG:4326");
    expect(page.state.spatialRefs["LOCATION"]).toBe("EPSG:4326");
    expect(page.state.spatialRefs["BASEMAP"]).toBe("EPSG:3857");

    app.map.getLayerSpatialReference = sinon.spy(() => {
      return "TESTLAYERSPATREF";
    });

    app.map.getBasemapSpatialReference = sinon.spy(() => {
      return "TESTBASESPATREF";
    });

    await controller.loadLayerReferences();

    //Now the new value must be set
    expect(page.state.spatialRefs["ASSET"]).toBe("TESTLAYERSPATREF");
    expect(page.state.spatialRefs["LOCATION"]).toBe("TESTLAYERSPATREF");
    expect(page.state.spatialRefs["BASEMAP"]).toBe("TESTBASESPATREF");
  });



  it("should cover all scenarios for retrieveLookupDescription", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let item = app.findDatasource("srDS").item;
    //Location
    item.location = "BR300";
    item.siteid = "BEDFORD";
    let locationDescription = await controller.retrieveLookupDescription("locationdesc");
    expect(locationDescription).toBe("Boiler Room Reciprocating Compressor");
    item.location = "INVALIDLOCATION";
    delete item.siteid;
    locationDescription = await controller.retrieveLookupDescription("locationdesc");
    expect(locationDescription).toBe("");
    //Asset
    item.assetnum = "7122";
    item.assetsiteid = "BEDFORD";
    let assetDescription = await controller.retrieveLookupDescription("assetdesc");
    expect(assetDescription).toBe("Standard Laptop Computer");
    item.assetnum = "INVALIDASSET";
    delete item.assetsiteid;
    assetDescription = await controller.retrieveLookupDescription("assetdesc");
    expect(assetDescription).toBe("");
    //Person
    item.affectedperson = "Miley Iatiley";
    let contactDetail = await controller.retrieveLookupDescription("contactdetail");
    expect(contactDetail).toBe("Miley Iatiley");
    delete item.affectedperson;
    contactDetail = await controller.retrieveLookupDescription("contactdetail");
    expect(contactDetail).toBe("");
    //Default
    const defaultReturn = await controller.retrieveLookupDescription();
    expect(defaultReturn).toBe("");
  });



  it("should cover scenarios where person does not have displayname", async () => {
    let app = await getApp();
    app.client.userInfo = {
      defaultSite: "BEDFORD",
      personid: 'PERSONIDJOAO',
    };
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);
    let item = app.findDatasource("srDS").item;
    expect(item.affectedperson).toBe(app.client.userInfo.personid);
    expect(item.affectedusername).toBe(app.client.userInfo.personid);
    let person = {
      personid: 'PERSONIDNODISPLAYNAME',
      displayname: null
    };
    controller.selectPerson(person);
    expect(item.affectedperson).toBe(person.personid);
    expect(item.affectedusername).toBe(person.personid);
    item.affectedperson = "RAMSDALE"; //User with no displayname
    expect(await controller.retrieveLookupDescription("contactdetail")).toBe("RAMSDALE");
    controller.onContactPersonChange("RAMS");
    expect(item.affectedperson).toBe("RAMSDALE");
    controller.onContactPersonChange("");
    expect(item.affectedperson).toBe("");
  });



  it("should reset page datasources", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    app.currentPage.params.href = undefined;
    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    //After page is initialized and resumed, when we go to another page, it is paused
    //This is the time to call resetPageDatasources()
    await controller.pagePaused();
  });



  it("should validate values input in follow-up questions", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    page.params.href = undefined;

    await controller.pageInitialized(page, app);
    await controller.pageResumed(page);

    //Mock ticket spec fields
    let newTicketSpecJDS = app.findDatasource("newTicketSpecJDS");
    newTicketSpecJDS.clearState();
    newTicketSpecJDS.resetState();
    newTicketSpecJDS.lastQuery = {};
    newTicketSpecJDS.dataAdapter.src = newticketspecData;
    newTicketSpecJDS.dataAdapter.jsonResponse = newticketspecData;
    await newTicketSpecJDS.load({src: newticketspecData});

    //Run validation
    for (const fupItem of newTicketSpecJDS.getItems()) {
      if (!fupItem.assetattributedomainid || fupItem.assetattributedomainid === "PERCTBUFFR") {
        continue;
      }
      switch (fupItem.assetattributedatatype_maxvalue) {
        case "ALN":
          await controller.validateALNDomainValue(fupItem);
          expect(fupItem.invalid).toBe(false);
          fupItem.alnvalue = undefined;
          await controller.validateALNDomainValue(fupItem);
          expect(fupItem.invalid).toBe(false);
          fupItem.alnvalue = "ABC";
          await controller.validateALNDomainValue(fupItem);
          expect(fupItem.invalid).toBe(true);
          fupItem.alnvalue = "UPPER";
          await controller.validateALNDomainValue(fupItem);
          expect(fupItem.invalid).toBe(false);
          break;
        case "NUMERIC":
          await controller.validateNumDomainValue(fupItem);
          expect(fupItem.invalid).toBe(false);
          fupItem.numvalue = 123;
          await controller.validateNumDomainValue(fupItem);
          expect(fupItem.invalid).toBe(true);
          fupItem.numvalue = 0.0;
          await controller.validateNumDomainValue(fupItem);
          expect(fupItem.invalid).toBe(false);
          break;
        case "MAXTABLE":
          await controller.validateTableDomainValue(fupItem);
          expect(fupItem.invalid).toBe(false);
          fupItem.tablevalue = "ABC123";
          await controller.validateTableDomainValue(fupItem);
          expect(fupItem.invalid).toBe(true);
          fupItem.tablevalue = "FITZ";
          await controller.validateTableDomainValue(fupItem);
          expect(fupItem.invalid).toBe(false);
          break;
      }
    }
    //Cover validation scenarios before submit
    await controller.createServiceRequest(); // Can submit 0
    newTicketSpecJDS.items[3].invalid = true;
    await controller.createServiceRequest(); // Numeric invalid
    newTicketSpecJDS.state.canSave = false;
    await controller.createServiceRequest(); // Specifications error
  });



  it("should open follow up questions numeric lookup", async () => {
    let app = await getApp();
    let page = app.currentPage;
	  let controller = page.controllers[0];
    const numericEvent1 = {
      item: {
        assetattributedomainid: undefined
      }
    };
    await controller.handleNumValueSmartLookupClick(numericEvent1); //No item
    const numericEvent2 = {
      item: {
        assetattributedomainid: "VIPLEVEL"
      }
    };
    await controller.handleNumValueSmartLookupClick(numericEvent2);
    const eventValue = {
      value: 2
    };
    await controller.selectNumValue(eventValue);
  });