/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
class PersonDataController {

  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }



  /**
   * Return person display name or ID in case there is no display name
   * @param {item} item Current record of person table
   * @return String value of either displayname or personid
   */
  computedValue(item) {
    let displayname = (item.displayname !== null && typeof item.displayname !== "undefined")? item.displayname : "";
    return (displayname)? displayname : item.personid;
  }

} export default PersonDataController;
