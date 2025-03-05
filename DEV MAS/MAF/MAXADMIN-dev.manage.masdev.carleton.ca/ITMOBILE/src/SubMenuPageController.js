/*
 * Licensed Materials - Property of IBM
 * 5737-M66
 * (C) Copyright IBM Corp. 2023 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */

const ACTIONLISTDS = "actionListDS";
const ACTIONLISTDS2 = "actionListDS2";
const ISSUE = "ISSUE";
const TRANSFER = "TRANSFER";

class SubMenuPageController {
  pageInitialized(page, app) {
    this.app = app;
    this.page = page;
  }

  pageResumed(page, app) {
    this.page = page;
    this.app = app;

    let actionList = [
      {
        _id: 0,
        label: this.app.getLocalizedLabel("issue", "Issue"),
        usetype: ISSUE,
        page: "invUsage",
      },
      {
        _id: 1,
        label: this.app.getLocalizedLabel("transfer", "Transfer"),
        usetype: TRANSFER,
        page: "invUsage",
      },
    ];

    this.loadMenu(actionList, ACTIONLISTDS);

    actionList = [
      {
        _id: 0,
        label: this.app.getLocalizedLabel(
          "inventory_usage_records",
          "Inventory usage records"
        ),
        page: "invUsageList",
      },
    ];

    this.loadMenu(actionList, ACTIONLISTDS2);
  }

  /**
   * Load Menu for the action list
   *
   * @param {Object} args - Contains event with page property
   */
  async loadMenu(actionList, actionListDSName) {
    let newSRC = { items: actionList };
    let actionListDS = this.page.findDatasource(actionListDSName);
    // istanbul ignore else
    if (actionListDS) {
      actionListDS.clearState();
      actionListDS.resetState();
      actionListDS.lastQuery = {};
      actionListDS.dataAdapter.src = newSRC;
      actionListDS.load({ src: newSRC });
    }
  }

  /**
   * Event handler to handle decision to select Issues or Transfer
   *
   * @param {Object} args - Contains event with page property
   */
  async subMenuListGotoCreateInv(args) {
    await this.checkDefaultStoreroomAndSetupPage();
    // istanbul ignore else
    if (!this.app.client.userInfo.defaultStoreroom) {
      return;
    }
    let targPage = args.page;
    // istanbul ignore else
    if (targPage) {
      let gotoPage = this.app.findPage(targPage);
      // istanbul ignore else
      if (gotoPage) {
        gotoPage.clearStack = true;
        gotoPage.params = {
          usetype: args.usetype,
          addingmoreitems: false,
          draftInvUsage: true,
        };
        this.app.setCurrentPage(gotoPage);
      }
    }
  }

  async subMenuListGoto(args) {
    await this.checkDefaultStoreroomAndSetupPage();
    // istanbul ignore else
    if (!this.app.client.userInfo.defaultStoreroom) {
      return;
    }
    let targPage = args;
    // istanbul ignore else
    if (targPage) {
      let gotoPage = this.app.findPage(targPage);
      // istanbul ignore else
      if (gotoPage) {
        gotoPage.clearStack = true;
        gotoPage.params = {};
        this.app.setCurrentPage(gotoPage);
      }
    }
  }

  /*
      retrieves the default storeroom for the current user from Maximo using the /myuser endpoint. 
      The function returns the default storeroom ID or null if no default storeroom is defined.
  */
  async getDefaultUserStoreroom() {
    let myuserJson = await this.app.client.restclient.get("/myuser");
    return myuserJson?.defstoreroom;
  }

  /*
   The checkDefaultStoreroomAndSetupPage function checks if there is a default storeroom defined for the current user. 
    If not, it tries to retrieve the default storeroom from Maximo and sets it in the app's state.
    If no default storeroom can be found, the user is prompted to set a default storeroom in Maximo.
  */
  async checkDefaultStoreroomAndSetupPage() {
    // istanbul ignore else
    if (!this.app.client.userInfo.defaultStoreroom) {
      this.app.client.userInfo.defaultStoreroom =
        await this.getDefaultUserStoreroom();
      // istanbul ignore else
      if (!this.app.client.userInfo.defaultStoreroom) {
        // Needs to set default storeroom for the login user in Maximo.
        let message = this.app.getLocalizedLabel(
          "default_storeroom_not_defined_msg",
          "You must define a default storeroom for this user before issuing or transferring items."
        );
        this.app.toast(
          message,
          "error",
          "Set the user’s default storeroom information in the Default Information page of the Maximo Application Suite user profile.",
          -1,
          false,
          false
        );
      }
    }
  }
}

export default SubMenuPageController;
