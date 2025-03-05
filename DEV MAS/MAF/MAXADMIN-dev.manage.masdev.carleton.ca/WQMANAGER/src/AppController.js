/* eslint-disable no-console */
import {log} from "@maximo/maximo-js-api";
const TAG = "work-queue-manager";

class AppController {
  applicationInitialized(app) {
    this.app = app;
    log.t(TAG, "work-queue-manager app is initialized");
  }
}
export default AppController;
