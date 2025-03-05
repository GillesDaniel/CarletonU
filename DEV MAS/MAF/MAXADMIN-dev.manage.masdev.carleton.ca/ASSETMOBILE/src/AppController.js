/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/* eslint-disable no-console */
import {log, Device} from "@maximo/maximo-js-api";
import MaximoMapConfigurationLoader from "@maximo/map-component/build/ejs/framework/loaders/MaximoMapConfigurationLoader";
import MapConfigurationLoader from "@maximo/map-component/build/ejs/framework/loaders/MapConfigurationLoader";
import MapPreLoadAPI from '@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI';
import StorageManager from "@maximo/map-component/build/ejs/framework/storage/StorageManager";
import LocalStorageManager from "@maximo/map-component/build/ejs/framework/storage/LocalStorageManager";
import FileSystemStorageManager from "@maximo/map-component/build/ejs/framework/storage/FileSystemStorageManager";
import {Browser} from '@maximo/maximo-js-api/build/device/Browser';
const TAG = "ASSETMANAGER";

class AppController {
  applicationInitialized(app) {
    this.app = app;
    log.t(TAG, "ASSETMANAGER app is initialized");
    
    this.setupIncomingContext();
    this.configureMap();
    
  }

  /*
   * Method to handle app switching
   */
  setupIncomingContext() {
    const incomingContext = this.app && this.app.state && this.app.state.incomingContext;
    let pageParams = {};
    let nextPage;

    if (incomingContext) {
      nextPage = 'assetlist';

      if (incomingContext.page) {
        nextPage = incomingContext.page;
      }

      if (incomingContext.assetnum) {
        pageParams["assetnum"] = incomingContext.assetnum;
      }

      if (incomingContext.href) {
        pageParams["href"] = incomingContext.href;

        if (!incomingContext.page) {
          nextPage = 'assetDetails';
        }
      }

      if (incomingContext.siteid) {
        pageParams["siteid"] = incomingContext.siteid;
      }

      this.app.setCurrentPage({
        name: nextPage,
        resetScroll: true,
        params: pageParams
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
