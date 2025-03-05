import InventoryUsageDataController from "./InventoryUsageDataController";
import {
  Application,
  Datasource,
  JSONDataAdapter,
} from "@maximo/maximo-js-api";
import sinon from "sinon";
import reservationsData from "./test/test-reservations-data";
import invusageData from "./test/test-invusage-data";
import invuseStatusDomainData from "./test/invbal-invusestatus-domain-data";
import invUseTypeSynonymDomainData from "./test/invusetype-synonymdomain-data";
import itemTypeSynonymDomainData from "./test/itemtype-synonymdomain-data";
import addressJsonData from "./test/test-address-data";
import AppController from "./AppController";

function newDatasource(data = invusageData, name = "invusageData") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "invuseid",
    name: name,
  });

  return ds;
}

function newReserveDatasource(
  data = reservationsData,
  name = "reservationsListDS"
) {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "invreserveid",
    name: name,
  });

  return ds;
}

it("loads InventoryUsageDataController", async () => {
  const controller = new InventoryUsageDataController();
  const appController = new AppController();
  const app = new Application();
  app.registerController(appController);

  const invUseTypeDomainDS = newDatasource(
    invUseTypeSynonymDomainData,
    "invUseTypeDS"
  );
  app.registerDatasource(invUseTypeDomainDS);
  sinon.stub(invUseTypeDomainDS, "initializeQbe");
  sinon.stub(invUseTypeDomainDS, "setQBE");
  sinon
    .stub(invUseTypeDomainDS, "searchQBE")
    .returns(invUseTypeSynonymDomainData.member);
  sinon
    .stub(invUseTypeDomainDS, "getItems")
    .returns(invUseTypeSynonymDomainData.member);
  sinon
    .stub(invUseTypeDomainDS, "load")
    .returns(invUseTypeSynonymDomainData.member);

  const itemTypeDomainDS = newDatasource(
    itemTypeSynonymDomainData,
    "itemTypeDS"
  );
  app.registerDatasource(itemTypeDomainDS);
  sinon.stub(itemTypeDomainDS, "initializeQbe");
  sinon.stub(itemTypeDomainDS, "setQBE");
  sinon
    .stub(itemTypeDomainDS, "searchQBE")
    .returns(itemTypeSynonymDomainData.member);
  sinon
    .stub(itemTypeDomainDS, "getItems")
    .returns(itemTypeSynonymDomainData.member);
  sinon
    .stub(itemTypeDomainDS, "load")
    .returns(itemTypeSynonymDomainData.member);

  const invuseStatusDomainDS = newDatasource(
    invuseStatusDomainData,
    "synonymdomainDS"
  );
  invuseStatusDomainDS.registerController(controller);
  app.registerDatasource(invuseStatusDomainDS);

  sinon.stub(invuseStatusDomainDS, "initializeQbe");
  sinon.stub(invuseStatusDomainDS, "setQBE");
  sinon
    .stub(invuseStatusDomainDS, "searchQBE")
    .returns(invuseStatusDomainData.member);

  const invuseStatusDomainDS_Separate = newDatasource(
    invuseStatusDomainData,
    "invUseStatusDS"
  );
  app.registerDatasource(invuseStatusDomainDS_Separate);
  sinon.stub(invuseStatusDomainDS_Separate, "initializeQbe");
  sinon.stub(invuseStatusDomainDS_Separate, "setQBE");
  sinon
    .stub(invuseStatusDomainDS_Separate, "searchQBE")
    .returns(invuseStatusDomainDS_Separate.member);
  sinon
    .stub(invuseStatusDomainDS_Separate, "getItems")
    .returns(invuseStatusDomainData.member);
  sinon
    .stub(invuseStatusDomainDS_Separate, "load")
    .returns(invuseStatusDomainData.member);

  const ds = newDatasource(invusageData, "invUseDS");
  ds.registerController(controller);
  app.registerDatasource(ds);
  app.allinvuses = [];

  const billtoshiptoDS = newDatasource(addressJsonData, "billtoshiptoDS");
  billtoshiptoDS.registerController(controller);
  app.registerDatasource(billtoshiptoDS);
  sinon.stub(billtoshiptoDS, "load").returns(addressJsonData.member);
  sinon.stub(billtoshiptoDS, "getItems").returns(addressJsonData.member);

  const reservationsListDS = newReserveDatasource(
    reservationsData,
    "reservationsListDS"
  );
  reservationsListDS.registerController(controller);
  app.registerDatasource(reservationsListDS);

  await app.initialize();
  await ds.load();
  await reservationsListDS.load();

  expect(controller.app).toBe(app);

  app.allreserveditems = [
    {
      requestedby: "MAXADMIN",
      requestnum: "1001",
      item: [
        {
          rotating: false,
          conditionenabled: false,
        },
      ],
      requireddate: "2023-08-11T10:13:02+08:00",
      siteid: "BEDFORD",
    },
  ];
  controller.onAfterSaveData(ds, invusageData, true);

  app.allreserveditems = [
    {
      requestedby: "MAXADMIN",
      requestnum: "1001",
      item: [
        {
          rotating: false,
          conditionenabled: false,
        },
      ],
      requireddate: "2023-08-11T10:13:02+08:00",
      siteid: "BEDFORD123",
    },
  ];
  controller.onAfterSaveData(ds, invusageData, true);

  controller.computedStatusLabel({});
  let tag = controller.computedStatusLabel({
    status: "STAGED",
    usetype: "ISSUE",
  });
  expect(tag[1].label).toBe("Staged");
  controller.computedDueDate({
    invuseline: [{ invreserve: [{ requireddate: "" }] }],
  });
  controller.computedDueDate({
    invuseline: [
      { invreserve: [{ requireddate: "2011-02-18T13:40:47+00:00" }] },
      { invreserve: [{ requireddate: "2011-02-18T13:30:47+00:00" }] },
    ],
  });
  controller.computedFromStoreroom({});
  controller.computedInvuselineCounts({});
  controller.computedInvuselineCounts(invusageData.member[0]);
  controller.computedSplitBin({});
  controller.computedSplitBin({ frombin: "abc" });
  controller.computedSplitQuantity({});
  controller.computedSplitQuantity({ quantity: 1 });
  controller.computedAssetBin({});
  controller.computedAssetBin({ binnum: "abc" });
  controller.computedShipmentsiteId(invusageData.member[0]);
  controller.computedShipmentsiteId({});
});
