import AppController from "./AppController";

import {
  Application,
  Page,
  JSONDataAdapter,
  Datasource,
} from "@maximo/maximo-js-api";

import sinon from "sinon";

import invuseStatusDomainData from "./test/invbal-invusestatus-domain-data";
import invUseTypeSynonymDomainData from "./test/invusetype-synonymdomain-data";
import itemTypeSynonymDomainData from "./test/itemtype-synonymdomain-data";
import addressJsonData from "./test/test-address-data";

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
    synonymdomainid: "synonymdomainid",
    name: name,
  });

  return ds;
}

describe("AppController", () => {
  it("loads controller", async () => {
    const controller = new AppController();
    let appInitSpy = jest.spyOn(controller, "applicationInitialized");
    const app = new Application();
    app.registerController(controller);

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

    const invUseTypeDomainDS = newDatasource(
      invUseTypeSynonymDomainData,
      "invUseTypeDS"
    );
    invUseTypeDomainDS.registerController(controller);
    app.registerDatasource(invUseTypeDomainDS);

    sinon.stub(invUseTypeDomainDS, "initializeQbe");
    sinon.stub(invUseTypeDomainDS, "setQBE");
    sinon
      .stub(invUseTypeDomainDS, "searchQBE")
      .returns(invUseTypeDomainDS.member);
    sinon.stub(invUseTypeDomainDS, "load").returns(invUseTypeDomainDS.member);

    const itemTypeDomainDS = newDatasource(
      itemTypeSynonymDomainData,
      "itemTypeDS"
    );
    itemTypeDomainDS.registerController(controller);
    app.registerDatasource(itemTypeDomainDS);

    sinon.stub(itemTypeDomainDS, "initializeQbe");
    sinon.stub(itemTypeDomainDS, "setQBE");
    sinon.stub(itemTypeDomainDS, "searchQBE").returns(itemTypeDomainDS.member);
    sinon.stub(itemTypeDomainDS, "load").returns(itemTypeDomainDS.member);

    const billtoshiptoDS = newDatasource(addressJsonData, "billtoshiptoDS");
    billtoshiptoDS.registerController(controller);
    app.registerDatasource(billtoshiptoDS);
    sinon.stub(billtoshiptoDS, "load").returns(addressJsonData.member);
    sinon.stub(billtoshiptoDS, "getItems").returns(addressJsonData.member);

    await app.initialize();
    expect(appInitSpy).toHaveBeenCalled();
    expect(controller.app).toBe(app);
  });

  it("setupIncomingContext should call setCurrentPage", async () => {
    const controller = new AppController();
    const app = new Application();
    const page = new Page({ name: "invUsage" });
    app.registerPage(page);
    // mock the setCurrentPage
    const mockSetPage = jest.fn();
    app.setCurrentPage = mockSetPage;

    app.registerController(controller);

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

    const invUseTypeDomainDS = newDatasource(
      invUseTypeSynonymDomainData,
      "invUseTypeDS"
    );
    invUseTypeDomainDS.registerController(controller);
    app.registerDatasource(invUseTypeDomainDS);

    sinon.stub(invUseTypeDomainDS, "initializeQbe");
    sinon.stub(invUseTypeDomainDS, "setQBE");
    sinon
      .stub(invUseTypeDomainDS, "searchQBE")
      .returns(invUseTypeDomainDS.member);
    sinon.stub(invUseTypeDomainDS, "load").returns(invUseTypeDomainDS.member);

    const itemTypeDomainDS = newDatasource(
      itemTypeSynonymDomainData,
      "itemTypeDS"
    );
    itemTypeDomainDS.registerController(controller);
    app.registerDatasource(itemTypeDomainDS);

    sinon.stub(itemTypeDomainDS, "initializeQbe");
    sinon.stub(itemTypeDomainDS, "setQBE");
    sinon.stub(itemTypeDomainDS, "searchQBE").returns(itemTypeDomainDS.member);
    sinon.stub(itemTypeDomainDS, "load").returns(itemTypeDomainDS.member);

    const billtoshiptoDS = newDatasource(addressJsonData, "billtoshiptoDS");
    billtoshiptoDS.registerController(controller);
    app.registerDatasource(billtoshiptoDS);
    sinon.stub(billtoshiptoDS, "load").returns(addressJsonData.member);
    sinon.stub(billtoshiptoDS, "getItems").returns(addressJsonData.member);

    app.device.isMaximoMobile = true;

    app.state.incomingContext = {
      page: "invUsage",
      href: "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE",
      editTrans: true,
    };
    await app.initialize();
    controller.onContextReceived();

    expect(mockSetPage.mock.calls[0][0].name).toBe("invUsageList");
    expect(mockSetPage.mock.calls[1][0].name).toBe("invUsage");
    expect(mockSetPage.mock.calls[1][0].params.itemUrl).toEqual(
      "oslc/os/mxapiinvuse/_MTEyNy9CRURGT1JE"
    );
  });

  it("loads domains", async () => {
    const controller = new AppController();
    let appInitSpy = jest.spyOn(controller, "applicationInitialized");
    const app = new Application();
    app.registerController(controller);

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

    const invUseTypeDomainDS = newDatasource(
      invUseTypeSynonymDomainData,
      "invUseTypeDS"
    );
    invUseTypeDomainDS.registerController(controller);
    app.registerDatasource(invUseTypeDomainDS);

    sinon.stub(invUseTypeDomainDS, "initializeQbe");
    sinon.stub(invUseTypeDomainDS, "setQBE");
    sinon
      .stub(invUseTypeDomainDS, "searchQBE")
      .returns(invUseTypeDomainDS.member);
    sinon.stub(invUseTypeDomainDS, "load").returns(invUseTypeDomainDS.member);

    const itemTypeDomainDS = newDatasource(
      itemTypeSynonymDomainData,
      "itemTypeDS"
    );
    itemTypeDomainDS.registerController(controller);
    app.registerDatasource(itemTypeDomainDS);

    sinon.stub(itemTypeDomainDS, "initializeQbe");
    sinon.stub(itemTypeDomainDS, "setQBE");
    sinon.stub(itemTypeDomainDS, "searchQBE").returns(itemTypeDomainDS.member);
    sinon.stub(itemTypeDomainDS, "load").returns(itemTypeDomainDS.member);

    const billtoshiptoDS = newDatasource(addressJsonData, "billtoshiptoDS");
    billtoshiptoDS.registerController(controller);
    app.registerDatasource(billtoshiptoDS);
    sinon.stub(billtoshiptoDS, "load").returns(addressJsonData.member);
    sinon.stub(billtoshiptoDS, "getItems").returns(addressJsonData.member);

    await app.initialize();
    await controller.loadDomains();

    expect(appInitSpy).toHaveBeenCalled();
    expect(controller.app).toBe(app);
  });
});
