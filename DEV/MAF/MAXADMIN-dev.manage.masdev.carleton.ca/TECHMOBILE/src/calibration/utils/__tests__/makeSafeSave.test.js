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

/** Utils */
import makeSafeSave from "../makeSafeSave";

describe("parseBool", () => {
  it("should save the datasource when called", async () => {
    const datasource = {
      currentItem: {
        pluscwodsinstr: [
          {
            pluscwodspoint: [
              {
                _rowstamp: 10,
              },
            ],
          },
        ],
      },
      save: jest.fn(),
    };

    // Act
    const safeSave = makeSafeSave(datasource);

    safeSave();

    // Assert
    expect(datasource.save).toHaveBeenCalled();
    expect(
      datasource.currentItem.pluscwodsinstr[0].pluscwodspoint[0]._rowstamp
    ).toEqual(null);
  });
});
