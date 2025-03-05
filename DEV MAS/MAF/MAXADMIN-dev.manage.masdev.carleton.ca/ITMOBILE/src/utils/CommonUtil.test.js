import CommonUtil from "./CommonUtil";
import invusejsonDS from "../test/test-invusejson-data";
import reservationsData from "../test/test-reservations-data";
import invuseStatusDomainData from "../test/invbal-invusestatus-domain-data";
import {
  Application,
  Datasource,
  JSONDataAdapter,
} from "@maximo/maximo-js-api";
import sinon from "sinon";

function newDatasource(
  data = invuseStatusDomainData,
  name = "synonymdomainDS"
) {
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

describe("CommonUtil", () => {
  it("getTotalQtyUsed", async () => {
    let reserveitem = reservationsData.member[0];
    let app = new Application();

    app.allinvuses = invusejsonDS.member;

    const calQty = CommonUtil.getTotalQtyUsed(reserveitem, app);
    expect(calQty).toBeTruthy();

    app.device.isMaximoMobile = true;
    CommonUtil.getTotalQtyUsed(reserveitem, app, 1);
  });

  it("computeDueDate returns empty string", async () => {
    let app = new Application();

    const computedDueDate = CommonUtil.computeDueDate(undefined, app);
    expect(computedDueDate).toBe("");
  });

  it("cache the synonymdomain", async () => {
    let app = new Application();

    const invuseStatusDomainDS = newDatasource(
      invuseStatusDomainData,
      "synonymdomainDS"
    );
    app.registerDatasource(invuseStatusDomainDS);
    app.initialize();

    sinon.stub(invuseStatusDomainDS, "initializeQbe");
    sinon.stub(invuseStatusDomainDS, "setQBE");
    sinon
      .stub(invuseStatusDomainDS, "searchQBE")
      .returns(invuseStatusDomainData.member);

    let cached = await CommonUtil.cacheSynonymdomain(app, "ITEMTYPE");
    expect(cached).not.toBe(null);
    expect(cached.length > 0).toBe(true);

    cached = await CommonUtil.cacheSynonymdomain(app, "ITEMTYPE", {
      key: "maxvalue",
      value: "ITEM",
    });
    expect(cached).not.toBe(null);
    expect(cached.maxvalue).toBe("ITEM");
  });
});
