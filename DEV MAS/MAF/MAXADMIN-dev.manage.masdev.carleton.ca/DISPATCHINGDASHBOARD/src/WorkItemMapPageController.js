import MaximoMapConfigurationLoader from '@maximo/map-component/build/ejs/framework/loaders/MaximoMapConfigurationLoader';
import MapConfigurationLoader from '@maximo/map-component/build/ejs/framework/loaders/MapConfigurationLoader';
import StorageManager from '@maximo/map-component/build/ejs/framework/storage/StorageManager';
import LocalStorageManager from '@maximo/map-component/build/ejs/framework/storage/LocalStorageManager';

/**
 * @typedef {object} BreadcrumbItem
 * @property {'dispatching' | 'details'} value
 * @property {string} label
 */

export default class WorkItemMapPageController {
  pageInitialized(page, app) {
    this.page = page;
    this.app = app;

    StorageManager.setImplementation(LocalStorageManager);
    MapConfigurationLoader.setImplementation(MaximoMapConfigurationLoader);
  }

  /**
   * @param {BreadcrumbItem} item
   */
  onBreadcrumbItemClick = (item) => {
    switch (item.value) {
      case 'dispatching':
        return this.app.setCurrentPage({
          name: 'dispatch',
        });

      default:
        return this.app.setCurrentPage({
          name: 'workItemDetails',
        });
    }
  };
}
