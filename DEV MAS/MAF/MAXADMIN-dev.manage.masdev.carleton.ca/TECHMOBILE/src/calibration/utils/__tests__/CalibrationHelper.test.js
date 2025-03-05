/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/** Test */
// import newTestStub from "../../../test/AppTestStub.js";
// import testCalibrationData from "../../test/test-calibration-data.js";

/** Helpers */
import CalibrationHelper from "../CalibrationHelper.js";

import DatasheetConstants from "../../rules/constants/DatasheetConstants.js";

/**
 * Test suite setup
 * @param {Datasource} datasheetDS
 * @param {Datasource} calpointsDS
 * @returns
 */

describe("CalibrationHelper", () => {
  const setup = (datasheetDS, calpointsDS, assetFunctionDS) =>
    new CalibrationHelper(datasheetDS, calpointsDS, assetFunctionDS);

  // const initializeApp = async (pluscWoDsData = testCalibrationData) => {
  //   const app = await newTestStub({
  //     currentPage: "assetfunctions",
  //     state: {
  //       assetFunctionsDetailsDS: "hello",
  //     },
  //     datasources: {
  //       pluscWoDs: {
  //         data: pluscWoDsData,
  //       }
  //     },
  //     toast: jest.fn(),
  //     getLocalizedLabel: jest.fn(),
  //   })();

  //   return app;
  // };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  describe("updateCalpointsIntoAssetFunction", () => {
    it("should do nothing if index is less than 0", async () => {
      const helper = setup();
      const calpointds = {
        items: {
          find: jest.fn(),
        },
      };
      helper.getCalpointsDS = jest.fn(() => calpointds);
      const assetfunction = {
        currentItem: {
          itemid: 1,
          pluscwodspoint: [
            { itemid: 1, asfoundinput: 2, asfoundoutput: 3 },
            { itemid: 1, asfoundinput: 2, asfoundoutput: 3 },
          ],
        },
      };
      helper.getAssetFunctionDS = jest.fn(() => assetfunction);

      const datasheetDS = {
        currentItem: {
          pluscwodsinstr: {
            findIndex: jest.fn(() => -2),
          },
        },
      };

      helper.getDatasheetDS = jest.fn(() => datasheetDS);
      helper.updateCalpointsIntoAssetFunction();
    });
  });

  describe("checkBrokenOrMissing", () => {
    it("should return MISSING if atleast one asset is MISSING", async () => {
      const point1 = {
        asfoundcalstatus: DatasheetConstants.STATUS_MISSING,
      };

      const point2 = {
        asfoundcalstatus: DatasheetConstants.STATUS_PASS,
      };
      const point3 = {
        asfoundcalstatus: DatasheetConstants.STATUS_BROKEN,
      };
      const assetfunction = [point1, point2, point3];

      const condition = "asfound";

      const status = CalibrationHelper.checkMissingOrBrokenStatus(
        assetfunction,
        condition
      );

      expect(status).toEqual(DatasheetConstants.STATUS_MISSING);
    });

    it("should return MISSING if atleast one asset is BROKEN and no assets is MISSING", async () => {
      const point1 = {
        asfoundcalstatus: DatasheetConstants.STATUS_PASS,
      };

      const point2 = {
        asfoundcalstatus: DatasheetConstants.STATUS_PASS,
      };
      const point3 = {
        asfoundcalstatus: DatasheetConstants.STATUS_BROKEN,
      };
      const assetfunction = [point1, point2, point3];

      const condition = "asfound";

      const status = CalibrationHelper.checkMissingOrBrokenStatus(
        assetfunction,
        condition
      );

      expect(status).toEqual(DatasheetConstants.STATUS_BROKEN);
    });

    it("should return null if there are no missing or broken status", async () => {
      const point1 = {
        asfoundcalstatus: DatasheetConstants.STATUS_FAIL,
      };

      const point2 = {
        asfoundcalstatus: DatasheetConstants.STATUS_PASS,
      };
      const point3 = {
        asfoundcalstatus: DatasheetConstants.STATUS_PASS,
      };
      const assetfunction = [point1, point2, point3];

      const condition = "asfound";

      const status = CalibrationHelper.checkMissingOrBrokenStatus(
        assetfunction,
        condition
      );

      expect(status).toEqual(null);
    });
  });
});
