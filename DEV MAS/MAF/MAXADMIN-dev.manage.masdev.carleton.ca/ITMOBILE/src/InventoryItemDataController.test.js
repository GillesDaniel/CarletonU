import InventoryItemDataController from "./InventoryItemDataController";
import {
  Application,
  Datasource,
  JSONDataAdapter,
} from "@maximo/maximo-js-api";
import invitemList from "./test/test-inventoryitem-data";

function newDatasource(data = invitemList, name = "invitemListDS") {
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

it("loads InventoryItemDataController", async () => {
  const controller = new InventoryItemDataController();
  const app = new Application();
  const ds = newDatasource(invitemList, "invitemListDS");
  ds.registerController(controller);
  app.registerDatasource(ds);

  await app.initialize();

  expect(controller.app).toBe(app);

  controller.computedRotating({ item: { rotating: true } });
  controller.computedRotating({ item: { rotating: false } });
});
