import InventoryUsageLineDataController from "./InventoryUsageLineDataController";
import {
  Application,
  Datasource,
  JSONDataAdapter,
} from "@maximo/maximo-js-api";

function newDatasource(data = [], name = "jsoninusageDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    idAttribute: "inventoryid",
    name: name,
  });

  return ds;
}

it("loads InventoryUsageLineDataController", async () => {
  const controller = new InventoryUsageLineDataController();
  const app = new Application();
  const ds = newDatasource([], "jsoninusageDS");
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();

  expect(controller.app).toBe(app);

  controller.computedRotating({ item: [{ rotating: true }] });
  controller.computedRotating({ item: { rotating: true } });
  controller.computedRotating({ item: [{ rotating: false }] });

  controller.computedItemType({ itemtype: "ITEM" });
  controller.computedItemType({ linetype: "ITEM" });

  controller.computedIssueUnit({});
  controller.computedIssueUnit({ issueunit: "EACH" });
  controller.computedIssueUnit({ inventory: [{ issueunit: "EACH" }] });

  controller.computedResType({});
  controller.computedResType({ restype: "ABC" });
  controller.computedResType({ invreserve: [{ restype: "ABC" }] });

  controller.computedReservedQty({});
  controller.computedReservedQty({ reservedqty: 1 });
  controller.computedReservedQty({ invreserve: [{ reservedqty: 1 }] });

  controller.computedAvblbalance({});
  controller.computedAvblbalance({ avblbalance: 1 });
  controller.computedAvblbalance({ inventory: [{ avblbalance: 1 }] });

  controller.computedDueDate({});
  controller.computedDueDate({ requireddate: "2011-02-18T13:40:47+00:00" });
  controller.computedDueDate({
    invreserve: [{ requireddate: "2011-02-18T13:40:47+00:00" }],
  });
  controller.computedDueDate({
    requireddate: "",
    invreserve: [{ requireddate: "" }],
  });
});
