/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import {log, Device} from "@maximo/maximo-js-api";
import MaximoMapConfigurationLoader from "@maximo/map-component/build/ejs/framework/loaders/MaximoMapConfigurationLoader";
import MapConfigurationLoader from "@maximo/map-component/build/ejs/framework/loaders/MapConfigurationLoader";
import MapPreLoadAPI from '@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI';
import StorageManager from "@maximo/map-component/build/ejs/framework/storage/StorageManager";
import LocalStorageManager from "@maximo/map-component/build/ejs/framework/storage/LocalStorageManager";
import FileSystemStorageManager from "@maximo/map-component/build/ejs/framework/storage/FileSystemStorageManager";
const TAG = "WORKORDER";

class AppController {
  applicationInitialized(app) {
    this.app = app;
    log.t(TAG, "Workorder app is initialized");
    this.setupIncomingContext();
    this.configureMap();
  }

  // istanbul ignore next - for browser testing context
  onContextReceived({context, app}) {
    if(context && context.uniqueid) {
      this.app.setCurrentPage({name: 'WOSummaryPage', params: { clickedItemId: context.uniqueid }});
    } else {
      log.w(TAG,"context or context.uniqueid is empty.");
    }
  }

  /*
   * Method to handle app switching
   */
  setupIncomingContext() {
    const incomingContext = this.app && this.app.state && this.app.state.incomingContext;

    if (incomingContext && incomingContext.page && ((incomingContext.wonum && incomingContext.href))) {
     this.app.setCurrentPage({name: 'wolist'});
     this.app.setCurrentPage({
        name: incomingContext.page,
        resetScroll: true,
        params: {wonum: incomingContext.wonum, siteid: incomingContext.siteid, href: incomingContext.href}
      });
    }
  }

  configureMap() {
    // Update the Default Map Configuration Loader
    MapConfigurationLoader.setImplementation(MaximoMapConfigurationLoader);

    //Update the Default Storage Manager
    if (Device.get().isMaximoMobile) {
      StorageManager.setImplementation(FileSystemStorageManager);
    } else {
      StorageManager.setImplementation(LocalStorageManager);
    }

    //istanbul ignore next
    try {
      this.mapPreloadAPI = new MapPreLoadAPI();

      //istanbul ignore next
      this.mapPreloadAPI.validateMapConfiguration(this.app)
        .then((validMapConfiguration) => {
          this.app.state.isMapValid = validMapConfiguration;
        })
        .catch(error => {
          this.app.state.isMapValid = false
          log.t(TAG, 'validateMapConfiguration: ', error);
        });
    } catch (error) {
      log.t(TAG, error);
    }
  }
}
export default AppController;

