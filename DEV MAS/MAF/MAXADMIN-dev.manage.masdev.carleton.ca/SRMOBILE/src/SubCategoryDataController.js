/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
class SubCategoryDataController {

  onDatasourceInitialized(ds, app) {
    this.datasource = ds;
    this.app = app;
  }



  calculateDisplayIcon(event) {
    return (event.hassubcategory)? "carbon:arrow--right" : ((event.hasactivetype)? "carbon:arrow--right" : "maximo:select--end");
  }

} export default SubCategoryDataController;