/* eslint-disable no-console */
import {
  log,
  ShellCommunicator,
  AppSwitcher,
  Browser,
  MASAPI,
  DataFormatter
} from "@maximo/maximo-js-api";
import { toJS } from "mobx";
import { GetDefaultPath } from "./utils";

const TAG = "ManageShellApp";
const DEFAULT_PATH = GetDefaultPath(window.location);
class AppController {
  applicationInitialized(app) {
    this.app = app;
    this.app.state.hasSideNav = true;
    this.app.state.hideMenuButton = false;
    this.app.getHeaderActions = this.getHeaderActions.bind(this);
    this.app.getProfileActions = this.getProfileActions.bind(this);
    this.app.getHelpActions = this.getHelpActions.bind(this);
    this.app.toggleSideNav = this.toggleSideNav.bind(this);
    this.app.cleanUp = this.cleanUp.bind(this);

    // Because of a delay in how the Manage Shell initialized
    // because of MASCommonShell waiting for resources
    // We need to ensure the ShellCommunicator is fully
    // initialized before doing the full wire up of the communicator
    if (!ShellCommunicator.get()?.messageIdToken) {
      log.t(TAG, "ManageShellApp is waiting for ShellCommunicator...");
      window.setTimeout(() => this.applicationInitialized(app), 200);
      return;
    }

    /* istanbul ignore next - required integration */
    this.setupShell();
  }

  /* istanbul ignore next - required integration */
  setupShell() {
    log.t(TAG, "ManageShellApp app is initialized");
    ShellCommunicator.get().on(
      "mas-shell-changeHeader",
      this.changeHeader.bind(this)
    );

    // Event "mas-shell-fetch-css-override" is used to fetch user-defined CSS
    ShellCommunicator.get().on("mas-shell-fetch-css-override", async () => {
      let CSSlink = await this.fetchUserDefinedCSS().then((value) => {
        return value;
      });
      // Event "mas-shell-apply-css-override" is used to override application style with fetched CSS (user-defined CSS)
      ShellCommunicator.get().emit("mas-shell-apply-css-override", CSSlink);
    });

    /* istanbul ignore else */
    if (!Browser.get().queryParam("loadapp")) {
      let path = DEFAULT_PATH;
      /* istanbul ignore else */
      if (!Browser.get().queryParam("event")) {
        if (this.getSessionId()) {
          path += `?uisessionid=${this.getSessionId()}`;
        }
      } else {
        if (!Browser.get().queryParam("uisessionid") && this.getSessionId()) {
          path += `?uisessionid=${this.getSessionId()}`;
        }
      }
      //Lazy load once initialized in case loadapp is not there
      setTimeout(() => AppSwitcher.get().gotoURL(path));
    }
    window.addEventListener("hashchange", this.skipTo.bind(this));
  }

  sendEvent(args) {
    ShellCommunicator.get().emit("mas-shell-sendEvent", args);
  }

  changeHeader(config) {
    Object.keys(config).forEach((key) => {
      if (key === "uisessionid") {
        this.updateSessionId(config[key]);
      } else {
        this.app.state[key] = config[key];
      }
    });
  }

  // Fetch user defined CSS using MASAPI and retun the CSS link
  async fetchUserDefinedCSS() {
    let resp = await MASAPI.get().getMastheadResources({lang: DataFormatter.get().lang, appId: MASAPI.get().appId});
    let cssOverride = resp?.customization?.css?.main;
    return cssOverride;
  }

  callFunction(args, evt) {
    let { left, right, top, bottom } = evt
      ? evt.target.getBoundingClientRect()
      : {};
    let id = evt?.currentTarget ? evt.currentTarget.id : '';
    let position = { left, right, top, bottom, id };
    let tempargs = {functionName: args.functionName};
    if (args.args) {
      tempargs.args = [...args.args, position];
    } else {
      tempargs.args = [position];
    }
    ShellCommunicator.get().emit("mas-shell-callFunction", tempargs);
  }
  getHeaderActions() {
    const headerAction = toJS(this.app.state.headerActions);
    /* istanbul ignore else */
    if (!headerAction) {
      return [];
    }
    return headerAction.map((item, idx) => {
      return {
        id: `${item.id}_${idx}`,
        label: item.label,
        count: item.count,
        icon: item.icon,
        onClick: (e) => {
          /* istanbul ignore else */
          if (item.clickAction && this[item.clickAction]) {
            this[item.clickAction](item.clickArgs, e);
          }
        },
      };
    });
  }
  getProfileActions() {
    const profileAction = toJS(this.app.state.profileActions);
    /* istanbul ignore else */
    if (!profileAction) {
      return [];
    }
    return profileAction.map((item, idx) => {
      return {
        id: `${item.id}_${idx}`,
        label: item.label,
        onClick: (e) => {
          /* istanbul ignore else */
          if (item.clickAction && this[item.clickAction]) {
            this[item.clickAction](item.clickArgs, e);
          }
        },
      };
    });
  }

  getHelpActions() {
    const helpAction = toJS(this.app.state.helpActions);
    /* istanbul ignore else */
    if (!helpAction) {
      return [];
    }
    return helpAction.map((item, idx) => {
      return {
        id: `${item.id}_${idx}`,
        label: item.label,
        href: item.href,
        onClick: (e) => {
          /* istanbul ignore else */
          if (item.clickAction && this[item.clickAction]) {
            this[item.clickAction](item.clickArgs, e);
          }
        },
      };
    });
  }
  toggleSideNav(e) {
    const sideNav = toJS(this.app.state.sideNav);
    /* istanbul ignore else */
    if (!sideNav) {
      return false;
    }
    if (sideNav.clickAction && this[sideNav.clickAction]) {
      this[sideNav.clickAction](sideNav.clickArgs, e);
    }
  }
  skipTo() {
    const skipTo = toJS(this.app.state.skipTo);
    /* istanbul ignore else */
    if (!skipTo) {
      return false;
    }
    /* istanbul ignore else */
    if (
      window.location.hash.toLocaleLowerCase() === "#/main-content" &&
      skipTo.clickAction
    ) {
      this[skipTo.clickAction](skipTo.clickArgs);
    }
  }
  getSessionId() {
    let val = sessionStorage.getItem("uisessionid");
    return val ? parseInt(val) : false;
  }
  updateSessionId(val) {
    sessionStorage.setItem("uisessionid", val);
  }
  cleanUp() {
    sessionStorage.removeItem("uisessionid");
  }
}
export default AppController;
