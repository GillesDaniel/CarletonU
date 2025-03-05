import sinon from "sinon";
import ShipmentCommonUtil from "./ShipmentCommonUtil";
import matreceiptinputitem from "../test/shipment-matrectrans-json-data";
import shipmentlineitem from "../test/shipmentline-json-data";
import mobileitem from "../test/shipmentmobilerec-json-data";

import {
  Datasource,
  JSONDataAdapter,
  Application,
} from "@maximo/maximo-js-api";

function newMobileRecDatasource(data = mobileitem, name = "mobileReceipts") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "_id",
    name: name,
  });

  return ds;
}

function newMatrectransDatasource(
  data = matreceiptinputitem,
  name = "shipmentMatrectransDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "matrectransid",
    name: name,
  });

  return ds;
}

function newShipmentLineDatasource(
  data = shipmentlineitem,
  name = "shipmentlineDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "shipmentlineid",
    name: name,
  });

  return ds;
}

describe("ShipmentCommonUtil", () => {
  it("build items", async () => {
    let item = {
      siteid: "abc",
      revisionnum: 1,
      quantity: 1,
      asn: "abc",
    };
    // const assetItem = CommonUtil.buildAssetItem(item);
    // expect(assetItem.siteid).toEqual(item.siteid);
    // const inspectItem = ShipmentCommonUtil.buildShipInspectItem(item, 1, 1, 0);
    // expect(inspectItem.siteid).toEqual(item.siteid);
    let app = new Application();
    app.state.issuetypeshipreceipt = "SHIPRECEIPT";
    app.state.issuetypeshipreturn = "SHIPRETURN";
    app.state.issuetypetransfer = "TRANSFER";
    app.state.issuetypeshiptransfer = "SHIPTRANSFER";
    app.state.issuetypeshipvoid = "VOIDSHIPRECEIPT";

    ShipmentCommonUtil.calculateReturnQty({}, []);
    ShipmentCommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        status_maxvalue: "COMP",
      },
      []
    );
    ShipmentCommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        inspectedqty: 5,
        status_maxvalue: "WINSP",
      },
      [],
      true
    );
    ShipmentCommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        inspectedqty: 5,
        status_maxvalue: "WINSP",
      },
      [
        {
          receiptquantity: 2,
        },
      ],
      true
    );
    ShipmentCommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        inspectedqty: 5,
        status_maxvalue: "COMP",
      },
      [
        {
          receiptquantity: 2,
        },
      ],
      true
    );

    ShipmentCommonUtil.calculateReturnQty(
      {
        rejectqty: 3,
        inspectedqty: 5,
        inspected: true,
        status_maxvalue: "WINSP",
        receiptquantity: 8,
      },
      [],
      true
    );

    const shipmentlineDs = newShipmentLineDatasource(
      shipmentlineitem,
      "shipmentlineDS"
    );
    const matreceiptDS = newMatrectransDatasource(
      matreceiptinputitem,
      "shipmentMatrectransDS"
    );
    const mobileRecDs = newMobileRecDatasource(mobileitem, "mobileReceipts");

    await mobileRecDs.load();
    sinon.stub(mobileRecDs, "getItems").returns(mobileitem.member);

    await shipmentlineDs.load();
    sinon.stub(shipmentlineDs, "getItems").returns(shipmentlineitem.member);

    await matreceiptDS.load();
    sinon.stub(matreceiptDS, "getItems").returns(matreceiptinputitem.member);

    ShipmentCommonUtil.computedOthersRemaining(
      {
        shipmentMatrectransItems: matreceiptDS.getItems(),
        shipmentlineitems: [shipmentlineitem.member],
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      "test",
      app
    );

    ShipmentCommonUtil.computedOthersRemaining(
      {
        shipmentMatrectransItems: matreceiptDS.getItems(),
        shipmentlineitems: shipmentlineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      "1001",
      app
    );
    ShipmentCommonUtil.computedRecInspRemaining(
      {
        shipmentMatrectransItems: matreceiptDS.getItems(),
        shipmentlineitems: shipmentlineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      shipmentlineitem.member[0],
      app
    );
    ShipmentCommonUtil.computedRecInspRemaining(
      {
        shipmentMatrectransItems: matreceiptDS.getItems(),
        shipmentlineitems: shipmentlineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      shipmentlineitem.member[1],
      app
    );
    ShipmentCommonUtil.computedRecInspRemaining(
      {
        shipmentMatrectransItems: matreceiptDS.getItems(),
        shipmentlineitems: shipmentlineitem.member,
        mobilerecds: mobileRecDs,
        isMaximoMobile: true,
      },
      shipmentlineitem.member[2],
      app
    );
    const receiptItem = ShipmentCommonUtil.buildShipReceiptItem(
      item,
      "test desc",
      "testid",
      [],
      "rotassetnum",
      true
    );
    //expect(receiptItem.positeid).toEqual(item.siteid);
    const receiveItem = ShipmentCommonUtil.buildShipReceiveItem(item);
    expect(receiveItem.siteid).toEqual(item.siteid);
    ShipmentCommonUtil.getDatasourceCopy("test", matreceiptDS, {
      href: "href",
    });
    ShipmentCommonUtil.getDatasourceCopy("shipmentMatrectransDS", matreceiptDS);
    ShipmentCommonUtil.loadjsonds(matreceiptDS, {});
    ShipmentCommonUtil.resetDataSource(matreceiptDS);
  });
});
