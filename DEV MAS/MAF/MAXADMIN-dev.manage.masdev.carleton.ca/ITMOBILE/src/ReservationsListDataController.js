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
import "regenerator-runtime/runtime";
import CommonUtil from "./utils/CommonUtil";

class ReservationsListDataController {
  onDatasourceInitialized(ds, owner, app) {
    this.datasource = ds;
    this.owner = owner;
    this.app = app;
  }

  /**
   * Compute the 'computedDueDate' attribute
   */
  computedDueDate(item) {
    if (item.requireddate) {
      return this.app?.dataFormatter
        ?.convertISOtoDate(item.requireddate)
        .toLocaleDateString();
    } else {
      return "";
    }
  }

  computedRotating(item) {
    return item.item.rotating
      ? this.app.getLocalizedLabel("yes", "Yes")
      : this.app.getLocalizedLabel("no", "No");
  }

  /**
   * Function called after loading the data
   * @param {dataSource} dataSource
   * @param {items} items
   */
  onAfterLoadData(dataSource, items) {
    //istanbul ignore else
    if (dataSource.name === "reservationsListDS" && items) {
      // use memory filter, we count the number of calqty = 0 as candidate when calculate the value bellow
      // when we display the total number, just delete current calqty = 0 in memory, set state.totalCount = dataAdaptor.itemCount - candidate
      // consider set state.totalCount in onChange event
      // ds.on('changed', function(datasource) {})
      let zeroCount = 0;
      //Set calqty attribute value
      items.forEach((reserveitem) => {
        let totalQtyUsed = 0;
        reserveitem.calqty = reserveitem.reservedqty;
        totalQtyUsed = CommonUtil.getTotalQtyUsed(reserveitem, this.app);
        reserveitem.calqty = reserveitem.reservedqty - totalQtyUsed;
        // istanbul ignore else
        if (reserveitem.calqty === 0) {
          zeroCount++;
        }
      });
      dataSource.currentZeroQty = zeroCount;
      // for mobile use inMemoryFilter for reservationsListDS
      // istanbul ignore else
      if (this.app.device.isMaximoMobile) {
        // if does not contain qty = 0, filter new value not changed
        // if contains qty = 0, always use the new value
        const savedFields = [
          "savedVirtualIndex",
          "savedItemCount",
          "savedTotalCount",
          "savedIdToIndexMap",
        ];
        if (dataSource.lastQuery?.searchText) {
          // istanbul ignore else
          if (!dataSource.meta) {
            // save the meta data
            dataSource.meta = {};
            for (let field of savedFields) {
              dataSource.meta[field] = dataSource[field];
            }
          }
          // set savedVirtualIndex to null to avoid the problem in framework
          dataSource.savedVirtualIndex = null;
        } else {
          if (dataSource.meta) {
            // restore the meta data
            for (let field of savedFields) {
              dataSource[field] = dataSource.meta[field];
            }
            delete dataSource.meta;
          } else {
            dataSource.savedVirtualIndex = null;
          }
        }
        dataSource.applyInMemoryFilter((item) => {
          return item.calqty > 0;
        });
      }
    }
  }
}
export default ReservationsListDataController;
