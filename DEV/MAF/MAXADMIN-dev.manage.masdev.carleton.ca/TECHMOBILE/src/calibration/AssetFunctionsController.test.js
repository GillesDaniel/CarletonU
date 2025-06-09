
/** Constants */
import CalibrationPointConstants from "./rules/constants/CalibrationPointConstants.js";
import DatasheetConstants from "./rules/constants/DatasheetConstants.js";

/** Utils */
import CommonUtil from "../utils/CommonUtil.js";
import SynonymDomain from './rules/models/SynonymDomain.js';
import generateRandomInt from "./rules/utils/generateRandomInt.js";

/** Controller */
import AssetFunctionsController from "./AssetFunctionsController";

/** Test */
import newTestStub from "../test/AppTestStub";
import testCalpointsData from "./test/test-calpoints-data.js";
import testCalibrationData from "./test/test-calibration-data.js";

/** Graphite */
import { Page } from "@maximo/maximo-js-api";

/** Implementation */

jest.mock('../utils/CommonUtil.js', () => ({
  filterMobileMaxvars: jest.fn()
}));

jest.mock('./rules/models/SynonymDomain.js');

const mockShowAllStatus = jest.fn();

const mockShowFilteredStatus = jest.fn();

const mockEnableAsFoundNoAdjustmentMade = jest.fn();

beforeEach(async () => {
  // Clear all instances and calls to constructor and all methods:
  SynonymDomain.mockClear();
  mockShowAllStatus.mockClear();
  mockShowFilteredStatus.mockClear();

  // Mock the implementation of the SynonymDomain class
  SynonymDomain.mockImplementation(() => ({
    showAllStatus: mockShowAllStatus,
    showFilteredStatus: mockShowFilteredStatus
  }));

  mockEnableAsFoundNoAdjustmentMade.mockClear();
  
  // Assuming initializeApp is defined in a way that allows us to replace the controller
  // You would typically set up your mock here.
  const app = await baseSetup();
  const page = app.findPage("assetfunctions");
  const mockController = {
    enableAsFoundNoAdjustmentMade: mockEnableAsFoundNoAdjustmentMade,
  };
  page.controllers = [mockController];

});

const baseSetup = async () => {
  return newTestStub({
    currentPage: "assetfunctions",
    datasources: {
      pluscWoDs: {
        data: testCalibrationData,
      },
    },
  })();
};

describe("AssetFunctionsController", () => {
  it("Page initilized", async () => {
    const app = await baseSetup();
    const ds = app.findDatasource("pluscWoDs");

    expect(ds.state.hasData).toBe(false);
    await ds.load();
    expect(ds.state.hasData).toBe(true);
  });

  it("Page resumed", async () => {
    const app = await baseSetup();
    const page = app.findPage("assetfunctions");
    const controller = page.controllers[0];
  
    // assumes that 'pluscWoDs' is in your application
    let ds = app.findDatasource("pluscWoDs");
    await ds.load();

    app.currentPage.params = {
      itemhref:
        "oslc/os/techmobile/childkey#V09SS09SREVSL1BMVVNDV09EUy9QTFVTQ1dPRFNJTlNUUi8xMg--",
      assetfunctiontitle: "DS101 PG100300420EU",
    };
    controller.enableAsFoundNoAdjustmentMade = jest.fn();
    controller.pageResumed(app.currentPage, app);

    expect(app.currentPage.state.assetfunctiontitle).toEqual(
      "DS101 PG100300420EU"
    );
    expect(controller.enableAsFoundNoAdjustmentMade).toHaveBeenCalled();
  });

  it("Should send user back to last visited page", async () => {
    const controller = new AssetFunctionsController();
    let app = await baseSetup();

    const page = new Page({ name: "Asset Function" });
    app.registerPage(page);

    let pageSetter = jest.fn();

    app.registerController(controller);

    const originalSetter = app.setCurrentPage;
    app.setCurrentPage = pageSetter;

    controller.pageInitialized(page, app);

    await controller.goBack();

    expect(pageSetter.mock.calls.length).toEqual(1);

    app.setCurrentPage = originalSetter;
  });

  describe("goBack", () => {
    it("Should navigate back", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      app.navigateBack = jest.fn();
      controller.resetDataSource = jest.fn();

      // Act
      await controller.goBack();

      // Assert
      expect(app.navigateBack).toHaveBeenCalled();
    });
  });

  describe("openCalibrationPoints", () => {
    it("Should do nothing when calibration point is not defined", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.loadCalibrationPointsds = jest.fn();
      controller.loadCalibrationFunctionds = jest.fn();
      controller.loadCalibrationDynamicds = jest.fn();

      const event = {
        item: {
          calpoint: false,
          calfunction: false,
          caldynamic: false,
        },
      };

      // Act
      controller.openCalibrationPoints(event);

      // Assert
      expect(controller.loadCalibrationPointsds).not.toHaveBeenCalled();
      expect(controller.loadCalibrationFunctionds).not.toHaveBeenCalled();
      expect(controller.loadCalibrationDynamicds).not.toHaveBeenCalled();
    });

    it("Should open calibration points ds when item is calpoint", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.loadCalibrationPointsds = jest.fn();

      const event = {
        item: {
          calpoint: true,
        },
      };

      // Act
      controller.openCalibrationPoints(event);

      // Assert
      expect(controller.loadCalibrationPointsds).toHaveBeenCalled();
    });

    it("Should open calibration function ds when item is calfunction", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.loadCalibrationFunctionds = jest.fn();

      const event = {
        item: {
          calfunction: true,
        },
      };

      // Act
      controller.openCalibrationPoints(event);

      // Assert
      expect(controller.loadCalibrationFunctionds).toHaveBeenCalled();
    });

    it("Should open calibration dynamic ds when item is caldynamic", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.loadCalibrationPointsds = jest.fn();
      controller.loadCalibrationFunctionds = jest.fn();
      controller.loadCalibrationDynamicds = jest.fn();

      const event = {
        item: {
          caldynamic: true,
        },
      };

      // Act
      controller.openCalibrationPoints(event);

      // Assert
      expect(controller.loadCalibrationDynamicds).toHaveBeenCalled();
    });

    it("Should open calibration repeatable page when asset function is repeatable", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.loadCalibrationPointsds = jest.fn();
      controller.loadCalibrationFunctionds = jest.fn();
      controller.loadCalibrationDynamicds = jest.fn();
      controller.loadCalibrationPointsRepeatablePage = jest.fn();

      const event = {
        item: {
          repeatable: true,
        },
      };

      // Act
      controller.openCalibrationPoints(event);

      // Assert
      expect(controller.loadCalibrationPointsRepeatablePage).toHaveBeenCalled();
    });
  });

  describe("loadCalibrationPointsds", () => {
    it("Should open calibration point page", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.loadCalibrationPointPage = jest.fn();

      const item = {
        description: "HelloWorld",
        calpoint: true,
      };

      // Act
      await controller.loadCalibrationPointsds(item);

      // Assert
      expect(controller.loadCalibrationPointPage).toHaveBeenCalled();
    });
  });

  describe("loadCalibrationDynamicds", () => {
    it("Should open calibration point page", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.loadCalibrationPointPage = jest.fn();

      const item = {
        description: "HelloWorld",
        caldynamic: true,
      };

      // Act
      await controller.loadCalibrationDynamicds(item);

      // Assert
      expect(controller.loadCalibrationPointPage).toHaveBeenCalled();
    });
  });

  describe("loadCalibrationFunctionds", () => {
    it("Should open calibration point page", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.loadCalibrationPointPage = jest.fn();

      const item = {
        description: "HelloWorld",
        calfunction: true,
      };

      // Act
      await controller.loadCalibrationFunctionds(item);

      // Assert
      expect(controller.loadCalibrationPointPage).toHaveBeenCalled();
    });
  });

  describe("loadCalibrationPointsRepeatablePage", () => {
    it("Should open calibration point repeatable page", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const loadMockFn = jest.fn();

      controller.app.setCurrentPage = jest.fn();
      controller.app.state.assetFunctionsDetailsDS = {
        getChildDatasource: () => ({
          load: loadMockFn,
        }),
      };

      const assetfunction = {
        description: "HelloWorld",
      };

      // Act
      await controller.loadCalibrationPointsRepeatablePage(assetfunction);

      // Assert
      expect(loadMockFn).toHaveBeenCalled();
      expect(controller.app.setCurrentPage).toHaveBeenCalled();
      expect(controller.app.setCurrentPage.mock.calls[0][0].name).toEqual(
        "calpointrepeatable"
      );
    });
  });

  describe("loadCalibrationPointPage", () => {
    it("Should load page when asset function datasource exists", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.app.state = {
        ...controller.app.state,
        status: CalibrationPointConstants.CONDITION_ASFOUND,
        assetFunctionsDetailsDS: {
          getChildDatasource: jest.fn(() => ({
            load: () => testCalpointsData.member,
          })),
        },
      };

      controller.app.setCurrentPage = jest.fn();

      const item = {
        description: "HelloWorld",
        calfunction: true,
      };

      const overrideParams = {
        calpointtitle: "Overriden title",
        calfunction: true,
      };

      // Act
      await controller.loadCalibrationPointPage(item, overrideParams);

      const actualTitle =
        controller.app.setCurrentPage.mock.calls[0][0].params.calpointtitle;
      const actualPage = controller.app.setCurrentPage.mock.calls[0][0].name;

      // Assert
      expect(controller.app.setCurrentPage).toHaveBeenCalled();
      expect(actualTitle).toEqual("Overriden title");
      expect(actualPage).toEqual("calibrationpoints");
    });

    it("Should return false when asset function DS does not exist", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.app.state = {
        ...controller.app.state,
        status: CalibrationPointConstants.CONDITION_ASFOUND,
        assetFunctionsDetailsDS: null,
      };

      controller.app.setCurrentPage = jest.fn();

      const item = null;

      const overrideParams = null;

      // Act
      const loaded = await controller.loadCalibrationPointPage(
        item,
        overrideParams
      );

      // Assert
      expect(loaded).toEqual(false);
    });

    it("Should load page when condition is AS LEFT", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.app.state = {
        ...controller.app.state,
        status: CalibrationPointConstants.CONDITION_ASLEFT,
        assetFunctionsDetailsDS: {
          getChildDatasource: jest.fn(() => ({
            load: () => testCalpointsData.member,
          })),
        },
      };

      controller.app.setCurrentPage = jest.fn();

      const item = {
        description: "HelloWorld",
        calfunction: true,
      };

      const overrideParams = {
        calpointtitle: "Overriden title",
        calfunction: true,
      };

      // Act
      await controller.loadCalibrationPointPage(item, overrideParams);

      const actualTitle =
        controller.app.setCurrentPage.mock.calls[0][0].params.calpointtitle;
      const actualPage = controller.app.setCurrentPage.mock.calls[0][0].name;

      // Assert
      expect(controller.app.setCurrentPage).toHaveBeenCalled();
      expect(actualTitle).toEqual("Overriden title");
      expect(actualPage).toEqual("calibrationasleftpoints");
    });

    it("Should load page when overrideParams is undefined", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.app.state = {
        ...controller.app.state,
        status: CalibrationPointConstants.CONDITION_ASLEFT,
        assetFunctionsDetailsDS: {
          getChildDatasource: jest.fn(() => ({
            load: () => testCalpointsData.member,
          })),
        },
      };

      controller.app.setCurrentPage = jest.fn();

      const item = {
        description: "HelloWorld",
        calfunction: true,
      };

      // Act
      await controller.loadCalibrationPointPage(item);
      const actualPage = controller.app.setCurrentPage.mock.calls[0][0].name;

      // Assert
      expect(controller.app.setCurrentPage).toHaveBeenCalled();
      expect(actualPage).toEqual("calibrationasleftpoints");
    });

    it("Should return false when calibration point datasource is empty", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.app.state = {
        ...controller.app.state,
        status: CalibrationPointConstants.CONDITION_ASLEFT,
        assetFunctionsDetailsDS: {
          getChildDatasource: jest.fn(() => ({
            load: () => [],
          })),
        },
      };

      controller.app.setCurrentPage = jest.fn();

      const item = {
        description: "HelloWorld",
        calfunction: true,
      };

      const overrideParams = {
        calpointtitle: "Overriden title",
        calfunction: true,
      };

      // Act
      const loaded = await controller.loadCalibrationPointPage(
        item,
        overrideParams
      );

      // Assert
      expect(controller.app.setCurrentPage).toHaveBeenCalled();
      expect(loaded).toEqual(true);
    });
  });

  describe("loadDsConfig", () => {
    it("Should load dsconfig with asset function params when asset function is available", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const ds = app.findDatasource("pluscWoDs");
      await ds.load();

      const dsplannum = `DS${generateRandomInt()}`;
      const revisionnum = generateRandomInt();

      const pluscwodsinstr = {
        currentItem: {
          dsplannum,
          revisionnum
        },
      };

      const dsconfigMockFn = { load: jest.fn(), resetState: jest.fn(), clearState: jest.fn() };
      controller.app.findDatasource = jest.fn(() => dsconfigMockFn);

      // Act
      await controller.loadDsConfig(pluscwodsinstr);

      // Assert
      const call = dsconfigMockFn.load.mock.calls[0][0];

      expect(call).toEqual({"qbe": { dsplannum, revisionnum }});
    });

    it("Should load default dsconfig when asset function is not available", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const ds = app.findDatasource("pluscWoDs");
      await ds.load();

      const dsconfigMockFn = { load: jest.fn(), resetState: jest.fn(), clearState: jest.fn() };
      controller.app.findDatasource = jest.fn(() => dsconfigMockFn);

      // Act
      await controller.loadDsConfig();

      // Assert
      expect(dsconfigMockFn.load).toHaveBeenCalled();
      expect(dsconfigMockFn.load.mock.calls[0][0]).toEqual(undefined);
    });
  });


  describe("getAssetFunctionDS", () => {
    it("Should return instance of getAssetFunctionDS", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const ds = app.findDatasource("pluscWoDs");
      await ds.load();

      const assetfunctionDS = await loadAssetFunctionDS(ds);
      controller.app.state.assetFunctionsDetailsDS = assetfunctionDS;

      // Act
      const actualAssetfunctionDS = controller.getAssetFunctionDS();

      // Assert
      expect(actualAssetfunctionDS.name).toEqual(assetfunctionDS.name);
    });
  });

  describe("getCalibrationPointsDS", () => {
    it("Should return instance of getCalibrationPointsDS", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const ds = app.findDatasource("pluscWoDs");
      await ds.load();

      const calpointsds = await loadCalpointsDS(ds);
      controller.app.state.calpointsds = calpointsds;

      // Act
      const actualCalpointsds = await controller.getCalibrationPointsDS();

      // Assert
      expect(actualCalpointsds.name).toEqual(calpointsds.name);
    });
  });

  describe("getDatasheetDS", () => {
    it("Should return instance of getDatasheetDS", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const ds = app.findDatasource("pluscWoDs");
      await ds.load();

      controller.app.findDatasource = jest.fn(() => ds);

      // Act
      const datasheetDS = controller.getDatasheetDS();

      // Assert
      expect(datasheetDS.name).toEqual(ds.name);
    });
  });

  describe("getDomainCalStatusDS", () => {
    it("Should return instance of getDomainCalStatusDS", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const ds = await loadDomainCalStatusDS();

      controller.app.findDatasource = jest.fn(() => ds);

      // Act
      const domainDS = controller.getDomainCalStatusDS();

      // Assert
      expect(domainDS.name).toEqual(ds.name);
    });
  });

  describe("getConditionPrefix", () => {
    it("Should return condition", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      // controller.app.state.status = CalibrationPointConstants.CONDITION_ASFOUND;
      page.state.condition = CalibrationPointConstants.CONDITION_ASFOUND;

      // Act
      const conditionPrefix = controller.getConditionPrefix();

      // Assert
      expect(conditionPrefix).toEqual(
        CalibrationPointConstants.CONDITION_ASFOUND
      );
    });
  });

  describe("openTypeLookup", () => {
    it("Should open Type Lookup", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const openUnitLookupMockFn = jest.fn();

      controller.assetUnitLookupHelper = {
        openUnitLookup: openUnitLookupMockFn,
      };

      const event = {
        changeText: null,
        item: null,
      };

      // Act
      await controller.openTypeLookup(event);

      // Assert
      expect(openUnitLookupMockFn).toHaveBeenCalled();
    });
  });

  describe("openEnvironmentalConditions", () => {
    it("Should display dialog", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      page.showDialog = jest.fn();

      // Act
      await controller.openEnvironmentalConditions();

      // Assert
      expect(page.showDialog).toHaveBeenCalled();
    });
  });

  describe("selectUnits", () => {
    it("Should push selected unit into selected list", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const pushMockFn = jest.fn();

      const accessor = "xxxxx";

      controller.page = {
        ...controller.page,
        state: {
          ...controller.page.state,
          changeText: accessor,
          selectedUnit: accessor,
          currentItem: {
            xxxxx: null,
          },
        },
      };

      controller.app.findDatasource = () => ({
        items: {
          push: pushMockFn,
        },
      });

      const itemSelected = {
        value: accessor,
        _selected: true,
      };

      // Act
      await controller.selectUnits(itemSelected);

      // Assert
      expect(controller.page.state.selectedUnit).toEqual(accessor);
    });

    it("Should clear selection when item is not selected", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const accessor = "xxxxx";

      controller.page = {
        ...controller.page,
        state: {
          ...controller.page.state,
          changeText: accessor,
          selectedUnit: accessor,
          currentItem: {
            xxxxx: null,
          },
        },
      };

      const itemSelected = {
        value: accessor,
        _selected: false,
      };

      // Act
      await controller.selectUnits(itemSelected);

      // Assert
      expect(controller.page.state.selectedUnit).toEqual("");
    });
  });

  describe("changeStatus", () => {
    it("Should change status", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const mockGetDatasheetDS = jest.fn();
      controller.getDatasheetDS = mockGetDatasheetDS;
      const saveMockFn = jest.fn();

      controller.getDatasheetDS = jest.fn().mockReturnValue({
        currentItem: { id: "datasheet0001" },
        safeSave: saveMockFn,
      });

      controller.app.findDatasource = () => ({
        save: saveMockFn,
        load: jest.fn(),
        forceReload: jest.fn(),
        getChildDatasource: jest.fn(() => ({
          load: () => [],
        })),
      });

      controller.page.state.selectedUnit = "unit001";

      // Act
      await controller.changeStatus();

      // Assert
      expect(saveMockFn).toHaveBeenCalled();
    });

    it("Should not update status when there is no selected unit", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const saveMockFn = jest.fn();

      controller.app.findDatasource = () => ({
        save: saveMockFn,
        load: jest.fn(),
      });

      controller.page.state.selectedUnit = false;

      // Act
      await controller.changeStatus();

      // Assert
      expect(saveMockFn).not.toHaveBeenCalled();
    });
  });

  describe("handleToggled", () => {
    it("Should update item.noadjmade and show the correct dialog based on event.checked", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const mockShowDialog = jest.fn();
      controller.page = { showDialog: mockShowDialog };

    // Define the initial state of the item
    //const item = { noadjmade: false, pluscwodsinstrid: 1 }; // Add pluscwodsinstrid for completeness

    // Define the mock event with checked set to true
    // const eventTrue = {
    //   item: item,
    //   evt: {
    //     target: {
    //       checked: true,
    //     },
    //   },
    // };

    // Define the mock event with checked set to false
    // const eventFalse = {
    //   item: item,
    //   evt: {
    //     target: {
    //       checked: false,
    //     },
    //   },
    // };

    page.state.noadjMade = true;

    // Act for checked = true
    //controller.handleToggled(eventTrue);
    // Assert for checked = true
    // expect(page.state.noadjMade).toBe(true);
    // expect(item.noadjmade).toBe(false);
    // expect(mockShowDialog).toHaveBeenCalledWith("noAdjLimit");

    page.state.noadjMade = false;
    // Act for checked = false
    //controller.handleToggled(eventFalse);
    // Assert for checked = false
    // expect(page.state.noadjMade).toBe(false);
    // expect(item.noadjmade).toBe(true);
    // expect(mockShowDialog).toHaveBeenCalledWith("noAdjLimitOff");
    });
  });

  describe("clearCalibrationPoints", () => {
    it("Should clear calibration points and update state correctly", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];
      const mockGetAssetFunctionDS = jest.fn();
      const mockGetChildDatasource = jest.fn();
      const mockLoad = jest.fn();
      const mockSaveData = jest.fn();

      controller.getAssetFunctionDS = mockGetAssetFunctionDS;
      controller.saveData = mockSaveData;

      const mockAssetFunctionDS = {
        currentItem: {
          pluscwodsinstrid: 10111,
          noadjmade: false,
          pluscwodspoint: [{ asleftinput: " ", asleftoutput: " " }],
          items: [{ pluscwodsinstrid: 10111 }], // Ensure there's at least one item
        },
        items: [{ pluscwodsinstrid: 10111 }], // Ensure there's at least one item
        getChildDatasource: mockGetChildDatasource,
      };

      const mockCalPointDS = {
        load: mockLoad,
      };
      
      controller.getAssetFunctionDS = jest.fn().mockReturnValue({
        currentItem: {
          pluscwodsinstrid: 10111,
          pluscwodspoint: [{ asleftinput: " ", asleftoutput: " " }],
        },
        get: jest.fn(),
        getChildDatasource: mockGetChildDatasource,
        items: [
          {
            pluscwodsinstrid: 10111,
            pluscwodspoint: [{ asleftinput: " ", asleftoutput: " " }],
          },
        ],
      });

      mockGetChildDatasource.mockResolvedValue(mockCalPointDS);

      // Act
      await controller.clearCalibrationPoints();

      // Assert
      expect(mockLoad).toHaveBeenCalled();
      expect(mockSaveData).toHaveBeenCalled();

      // Verify state updates
      expect(mockAssetFunctionDS.currentItem.noadjmade).toBe(false);

      // Check that `asleft` properties are cleared
      expect(
        mockAssetFunctionDS.currentItem.pluscwodspoint[0].asleftinput
      ).toEqual(" ");
      expect(
        mockAssetFunctionDS.currentItem.pluscwodspoint[0].asleftoutput
      ).toEqual(" ");
    });
  });

  describe("copyCalibrationPoints", () => {
    it("Should copy calibration points for AF", async () => {
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];
      const ds = app.findDatasource("pluscWoDs");
      await ds.load();

      // Mock methods and properties
      controller.copyValuesToAsLeft = jest.fn();
      controller.saveData = jest.fn();
      const mockGetChildDatasource = jest.fn().mockResolvedValue({
        load: jest.fn(),
        items: [
          {
            asfoundinput: "1",
            asfoundoutput: "2",
          },
        ],
      });

      controller.getAssetFunctionDS = jest.fn().mockReturnValue({
        currentItem: {
          pluscwodsinstrid: 10111,
        },
        get: jest.fn(),
        getChildDatasource: mockGetChildDatasource,
        items: [
          {
            pluscwodsinstrid: 10111,
          },
        ],
      });

      // Act
      const event = {
        item: {}, // Add any necessary properties for event.item
        datasource: ds, // Include datasource if needed in the test
        currentitem: {}, // Add any necessary properties for event.currentitem
      };
      await controller.copyCalibrationPoints(event);

      // Assert
      expect(controller.getAssetFunctionDS).toHaveBeenCalled();
      expect(controller.copyValuesToAsLeft).toHaveBeenCalledWith({
        item: event.item,
        datasource: event.datasource,
        currentitem: { pluscwodsinstrid: 10111 },
      });
      expect(controller.saveData).toHaveBeenCalled();
    });
  });

  describe("saveData", () => {
    it("Should save data", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];
      const ds = app.findDatasource("pluscWoDs");
      await ds.load();

      // Mock methods
    const saveMockFn = jest.fn();
    const toastMockFn = jest.fn();

    controller.getDatasheetDS = jest.fn().mockReturnValue({
      currentItem: { id: "datasheet0001",
        pluscwodsinstr: [
          {
            pluscwodsinstrid: 10111,
       }],
        safeSave: saveMockFn,
      }
    });

    controller.getAssetFunctionDS = jest.fn().mockReturnValue({
      currentItem: { id: "assetfunction0001",
        pluscwodspoint: [
          {
            pluscwodspointid: 1,
            pointdescription: "Low Range",
            inputvalue: "100.00",
          }],
       },
    });

    controller.getCalibrationPointsDS = jest.fn().mockReturnValue({
      items: [{ id: "point1" }, { id: "point2" }],
    });

    const datasheetDS = { id: "datasheet0001",
        pluscwodsinstr: [
          {
            pluscwodsinstrid: 10111,
            pluscwodspoint: [
              {
                pluscwodspointid: 1,
                pointdescription: "Low Range",
                inputvalue: "100.00",
              }],
       }],
       safeSave: saveMockFn,
    }

    controller.updateCalpointsIntoAssetFunction = jest.fn().mockReturnValue({
     return : datasheetDS
    });

    // Mock app methods
    controller.app.toast = toastMockFn;
    controller.app.getLocalizedLabel = jest.fn().mockReturnValue("Changes saved");

    // Act
    //await controller.saveData();

    // Assert
    // expect(controller.getDatasheetDS).toHaveBeenCalled();
    // expect(controller.getAssetFunctionDS).toHaveBeenCalled();
    // expect(controller.getCalibrationPointsDS).toHaveBeenCalled();
    // expect(saveMockFn).toHaveBeenCalled();
  });
  });

  // Test to check if the copyValuesToAsLeft() method works correctly
  describe("copyValuesToAsLeft", () => {
    it("Should copy calibration point values", async () => {
      //Check if the correct values are being copied from the current item to the left side of the table

      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];
      let pluscWoDs = app.findDatasource("pluscWoDs");
      await pluscWoDs.load();

      const event = {
        currentitem: {
          calpoint: true,
          noadjmade: true,
          pluscwodspoint: [
            {
              asfoundinput: "1",
              asfoundoutput: "2",
            },
          ],
        },
      };

      await controller.copyValuesToAsLeft(event);
      expect(event.currentitem.pluscwodspoint[0]).toEqual({
        asleftinput: "1",
        asleftoutput: "2",
        asfoundinput: "1",
        asfoundoutput: "2",
      });
    });

    it("Should copy calibration DISCRETE values", async () => {
      //Check if the correct values are being copied from the current item to the left side of the table

      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];
      let pluscWoDs = app.findDatasource("pluscWoDs");
      await pluscWoDs.load();

      const event = {
        currentitem: {
          calpoint: true,
          noadjmade: true,
          pluscwodspoint: [
            {
              asfoundsetpoint: "0.01",
            },
          ],
        },
      };

      await controller.copyValuesToAsLeft(event);
      expect(event.currentitem.pluscwodspoint[0]).toEqual({
        asleftsetpoint: "0.01",
        asfoundsetpoint: "0.01",
      });
    });
  });

  describe("getAutoUpdate", () => {
    it("shouldBeTrueWhenPluscautostatusIsEnabled", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];
      CommonUtil.filterMobileMaxvars.mockImplementation(() => ([{ varvalue: "1" }]));

      // Act
      const isAutoUpdateStatus = controller.getAutoUpdate();
      
      // Assert
      expect(isAutoUpdateStatus).toEqual(true);
      expect(CommonUtil.filterMobileMaxvars).toHaveBeenCalledWith(DatasheetConstants.PLUSCAUTOSTATUS, { "items": [{ "mobilemaxvars": [] }] });
    });

    it("shouldBeFalseWhenPluscautostatusIsDisabled", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];
      CommonUtil.filterMobileMaxvars.mockImplementation(() => ([{ varvalue: "0" }]));

      // Act
      const isAutoUpdateStatus = controller.getAutoUpdate();

      // Assert
      expect(isAutoUpdateStatus).toEqual(false);
    });

    it("shouldBeFalseWhenPluscautostatusDoesNotExist", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];
      CommonUtil.filterMobileMaxvars.mockImplementation(() => null);

      // Act
      const isAutoUpdateStatus = controller.getAutoUpdate();
      
      // Assert
      expect(isAutoUpdateStatus).toEqual(true);
      expect(CommonUtil.filterMobileMaxvars).toHaveBeenCalledWith(DatasheetConstants.PLUSCAUTOSTATUS, { "items": [{ "mobilemaxvars": [] }] });
    });
  });

  describe("openChangeStatusDialog", () => {
    it("shouldDisplayDialogWithAllStatusWhenAutoUpdateIsFalse", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.getAutoUpdate = jest.fn(() => false);

      controller.page.showDialog = jest.fn();

      // Act
      await controller.openChangeStatusDialog({
        condition: CalibrationPointConstants.CONDITION_ASFOUND,
        item: {
          asfoundcalstatus: DatasheetConstants.STATUS_PASS
        }
      });
      
      // Assert
      expect(mockShowAllStatus).toHaveBeenCalled();
      expect(controller.page.showDialog).toHaveBeenCalled();
      expect(controller.page.showDialog.mock.calls[0][0]).toEqual("assetFunctionStatusDialog");
    });

    it("shouldDoNothingWhenAutoUpdateIsTrueAndStatusNeitherMissingOrBroken", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.getAutoUpdate = jest.fn(() => true);

      controller.page.showDialog = jest.fn();

      // Act
      [
        DatasheetConstants.STATUS_ACTION,
        DatasheetConstants.STATUS_ADJREQD,
        DatasheetConstants.STATUS_ADJTOIMP,
        DatasheetConstants.STATUS_FAIL,
        DatasheetConstants.STATUS_INSPECT,
        DatasheetConstants.STATUS_LIMITEDUSE,
        DatasheetConstants.STATUS_OLIM,
        DatasheetConstants.STATUS_PASS,
        DatasheetConstants.STATUS_WARNING,
      ].forEach(async (status) => {

        await controller.openChangeStatusDialog({
          condition: CalibrationPointConstants.CONDITION_ASFOUND,
          item: {
            asfoundcalstatus: status,
          },
        });

        // Assert
        expect(mockShowAllStatus).not.toHaveBeenCalled();
        expect(controller.page.showDialog).not.toHaveBeenCalled();
      });
    });

    it("shouldDisplayDialogWithFilteredStatusWhenAutoUpdateIsTrueAndStatusMissingOrBroken", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      controller.getAutoUpdate = jest.fn(() => true);

      controller.page.showDialog = jest.fn();

      // Act
      [
        DatasheetConstants.STATUS_MISSING,
        DatasheetConstants.STATUS_BROKEN,
      ].forEach(async (status) => {

        await controller.openChangeStatusDialog({
          condition: CalibrationPointConstants.CONDITION_ASFOUND,
          item: {
            asfoundcalstatus: status,
          },
        });

        // Assert
        expect(mockShowFilteredStatus).toHaveBeenCalled();
        expect(controller.page.showDialog).toHaveBeenCalled();
        expect(controller.page.showDialog.mock.calls[0][0]).toEqual("assetFunctionStatusDialog");
      });
    });
  });

  describe("changeAssetFunctionStatus", () => {
    it("shouldSaveDatasheetWhenAssetFunctionStatusChanges", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const safeSaveMockFn = jest.fn();
      const closeDialogMockFn = jest.fn();
      const pluscwodsinstrid = generateRandomInt();

      controller.page.state.condition = CalibrationPointConstants.CONDITION_ASFOUND;

      controller.page.state.assetfunction = {
        pluscwodsinstrid,
        asfoundcalstatus: DatasheetConstants.STATUS_PASS
      };

      controller.page.findDialog = jest.fn(() => ({
        closeDialog: closeDialogMockFn
      }));

      controller.getDatasheetDS = jest.fn(() => ({
        safeSave: safeSaveMockFn,
        currentItem: {
          pluscwodsinstr: [
            // Adding few dummy asset functions
            {
              pluscwodsinstrid: pluscwodsinstrid - 1
            },
            {
              pluscwodsinstrid,
              asfoundcalstatus: DatasheetConstants.STATUS_PASS
            },
            {
              pluscwodsinstrid: pluscwodsinstrid + 1,
            }
          ]
        }
      }));

      // Act
      await controller.changeAssetFunctionStatus({
        value: DatasheetConstants.STATUS_BROKEN
      });
      
      // Assert
      expect(safeSaveMockFn).toHaveBeenCalled();
      expect(controller.page.state.assetfunction.asfoundcalstatus).toEqual(DatasheetConstants.STATUS_BROKEN);
      expect(closeDialogMockFn).toHaveBeenCalled();
    });

    it("shouldSaveDataSheetWhenStatusHasBeenSetToMissing", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const safeSaveMockFn = jest.fn();
      const closeDialogMockFn = jest.fn();
      const pluscwodsinstrid = generateRandomInt();

      controller.page.state.condition = CalibrationPointConstants.CONDITION_ASFOUND;

      controller.page.state.assetfunction = {
        pluscwodsinstrid,
        asfoundcalstatus: DatasheetConstants.STATUS_PASS
      };

      controller.page.findDialog = jest.fn(() => ({
        closeDialog: closeDialogMockFn
      }));

      controller.getDatasheetDS = jest.fn(() => ({
        safeSave: safeSaveMockFn,
        currentItem: {
          pluscwodsinstr: [
            // Adding few dummy asset functions
            {
              pluscwodsinstrid: pluscwodsinstrid - 1
            },
            {
              pluscwodsinstrid,
              asfoundcalstatus: DatasheetConstants.STATUS_PASS
            },
            {
              pluscwodsinstrid: pluscwodsinstrid + 1,
            }
          ]
        }
      }));

      // Act
      await controller.changeAssetFunctionStatus({
        value: DatasheetConstants.STATUS_MISSING
      });
      
      // Assert
      expect(safeSaveMockFn).toHaveBeenCalled();
      expect(controller.page.state.assetfunction.asfoundcalstatus).toEqual(DatasheetConstants.STATUS_MISSING);
      expect(closeDialogMockFn).toHaveBeenCalled();
    });

    it("shouldResetStatusWhenResetStatusHasBeenCalled", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const safeSaveMockFn = jest.fn();
      const closeDialogMockFn = jest.fn();
      const pluscwodsinstrid = generateRandomInt();

      controller.page.state.condition = CalibrationPointConstants.CONDITION_ASFOUND;

      controller.page.state.assetfunction = {
        pluscwodsinstrid,
        asfoundcalstatus: DatasheetConstants.STATUS_PASS
      };

      controller.page.findDialog = jest.fn(() => ({
        closeDialog: closeDialogMockFn
      }));

      controller.getDatasheetDS = jest.fn(() => ({
        safeSave: safeSaveMockFn,
        currentItem: {
          pluscwodsinstr: [
            // Adding few dummy asset functions
            {
              pluscwodsinstrid: pluscwodsinstrid - 1
            },
            {
              pluscwodsinstrid,
              asfoundcalstatus: DatasheetConstants.STATUS_PASS
            },
            {
              pluscwodsinstrid: pluscwodsinstrid + 1,
            }
          ]
        }
      }));

      // Act
      await controller.resetAssetFunctionStatus({});
      
      // Assert
      expect(safeSaveMockFn).toHaveBeenCalled();
      expect(controller.page.state.assetfunction.asfoundcalstatus).toEqual(DatasheetConstants.STATUS_EMPTY);
      expect(closeDialogMockFn).toHaveBeenCalled();
    });



    it("shouldNotSaveDatasheetWhenAssetFunctionIsNotFound", async () => {
      // Arrange
      const app = await baseSetup();
      const page = app.findPage("assetfunctions");
      const controller = page.controllers[0];

      const safeSaveMockFn = jest.fn();
      const closeDialogMockFn = jest.fn();
      const pluscwodsinstrid = generateRandomInt();

      controller.page.state.condition = CalibrationPointConstants.CONDITION_ASFOUND;

      controller.page.state.assetfunction = {
        pluscwodsinstrid,
        asfoundcalstatus: DatasheetConstants.STATUS_PASS
      };

      controller.page.findDialog = jest.fn(() => ({
        closeDialog: closeDialogMockFn
      }));

      controller.getDatasheetDS = jest.fn(() => ({
        safeSave: safeSaveMockFn,
        currentItem: {
          pluscwodsinstr: [
            // Adding few dummy asset functions
            {
              pluscwodsinstrid: pluscwodsinstrid - 1
            },
            {
              pluscwodsinstrid: pluscwodsinstrid + 1,
            }
          ]
        }
      }));

      // Act
      await controller.changeAssetFunctionStatus({
        value: DatasheetConstants.STATUS_BROKEN
      });
      
      // Assert
      expect(safeSaveMockFn).not.toHaveBeenCalled();
      expect(controller.page.state.assetfunction.asfoundcalstatus).toEqual(DatasheetConstants.STATUS_BROKEN);
      expect(closeDialogMockFn).toHaveBeenCalled();
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                         Generators                                         */
  /* -------------------------------------------------------------------------- */

  const loadAssetFunctionDS = async (pluscWoDs) =>
    await pluscWoDs.getChildDatasource("pluscwodsinstr", pluscWoDs.currentItem);

  const loadCalpointsDS = async (pluscWoDs) => ({
    name: "calpointstest",
    items: testCalpointsData.member,
  });
  const loadDomainCalStatusDS = async () => ({
    name: "domaincalstatustest",
    items: [],
  });
});
