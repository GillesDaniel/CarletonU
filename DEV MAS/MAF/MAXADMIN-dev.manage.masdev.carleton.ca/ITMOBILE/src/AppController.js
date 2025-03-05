/* eslint-disable no-console */
import { log } from "@maximo/maximo-js-api";
const TAG = "Issues and Transfers app";

const INVUSESTATUS_SYNONYM_DOMAINID = "INVUSESTATUS";
const INVUSETYPE_SYNONYM_DOMAINID = "INVUSETYPE";
const ITEMTYPE_SYNONYM_DOMAINID = "ITEMTYPE";
const INVUSESTATUSDS = "invUseStatusDS";
const INVUSETYPEDS = "invUseTypeDS";
const ITEMTYPEDS = "itemTypeDS";
const BILLTOSHIPTODS = "billtoshiptoDS";

class AppController {
  applicationInitialized(app) {
    this.app = app;
    log.t(TAG, "Issues and Transfers app is initialized");

    // Sets the mxapiinvuse datasource name
    this.app.state.selectedInvUseDSName = "invUseDS";
    //istanbul ignore else
    if (this.app.device.isMaximoMobile) {
      this.app.state.selectedInvUseDSName = "invUseDS4Cal_local";
    }

    //this.app.state.invUseDSTotalCount = 0;

    this.app.allinvuses = [];
    this.app.allreserveditems = [];
    this.app.state.reservationLoaded = false;
    this.app.state.isFromReservedItemsPage = true;
    this.app.state.synonymDomainCache = {};

    this.setupIncomingContext();
    this.loadDomains();
    this.loadOtherLookups();
  }

  onContextReceived() {
    this.setupIncomingContext();
  }

  setupIncomingContext() {
    const incomingContext = this?.app?.state?.incomingContext;
    //istanbul ignore else
    if (incomingContext) {
      // istanbul ignore else
      if (incomingContext.editTrans) {
        incomingContext.page = "invUsage";
      }

      // istanbul ignore else
      if (incomingContext.page && incomingContext.href) {
        this.app.setCurrentPage({ name: "invUsageList" });
        this.app.setCurrentPage({
          name: incomingContext.page,
          resetScroll: true,
          params: {
            itemUrl: incomingContext.href,
            addingmoreitems: false,
          },
        });
      }
    }
  }

  async loadDomains() {
    let domainCache = await this.app.findDatasource(INVUSESTATUSDS).load();
    this.app.state.synonymDomainCache[INVUSESTATUS_SYNONYM_DOMAINID] =
      domainCache;
    domainCache = await this.app.findDatasource(INVUSETYPEDS).load();
    this.app.state.synonymDomainCache[INVUSETYPE_SYNONYM_DOMAINID] =
      domainCache;
    domainCache = await this.app.findDatasource(ITEMTYPEDS).load();
    this.app.state.synonymDomainCache[ITEMTYPE_SYNONYM_DOMAINID] = domainCache;
  }

  async loadOtherLookups() {
    await this.app.findDatasource(BILLTOSHIPTODS).load;
  }
}
export default AppController;
