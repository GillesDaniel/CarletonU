import AssetLookupController from "./AssetLookupController";
import {
  Application,
  Datasource,
  JSONDataAdapter,
} from "@maximo/maximo-js-api";
import sinon from "sinon";

function newDatasource(data = [], name = "assetLookupDS") {
  const da = new JSONDataAdapter({
    src: data,
    items: "member",
    schema: "responseInfo.schema",
  });

  const ds = new Datasource(da, {
    name: name,
  });

  return ds;
}

it("loads AssetLookupController", async () => {
  const controller = new AssetLookupController();
  const app = new Application();
  const assetDS = newDatasource([], "assetLookupDS");
  assetDS.registerController(controller);
  app.registerDatasource(assetDS);
  const splitDS = newDatasource([], "invsplitjsonDS");
  app.registerDatasource(splitDS);
  sinon.stub(splitDS, "getItems").returns([{ rotassetnum: "1234" }]);

  await app.initialize();

  expect(controller.app).toBe(app);

  controller.onAfterLoadData(assetDS, [{ assetnum: "1234" }]);
});
