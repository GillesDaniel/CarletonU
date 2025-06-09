/**
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

/** Constants */
import LogConstants from "../rules/constants/LogConstants";

/** Log */
import { log } from "@maximo/maximo-js-api";

/**
 * Creates a wrapper for `save()` method and returns as a callable.
 * This pattern known as currying [2][3].
 *
 * Heads up!
 *   Here we adding the function `safeSave` to encapsulate the
 * data preparation required before sending to server. This is a
 * solution required to prevent the following error when attempting
 * to save calibration points consecutively:
 *
 * > Record 21695775 has been updated by another user. Your changes
 * > have not been saved. Refresh the record and try again. BMXAA8229W
 *
 * Basically, we need to make sure id attribute will always be sent
 * to the server. At the same time, we need to ensure that 'rowstamp'
 * will be ignored and won't be sent to the server.
 *
 * This is meant to be a temporary solution, until we find a way
 * to deal with the grandchildren updates in Graphite [1].
 *
 * More details here: https://jsw.ibm.com/browse/GRAPHITE-75552.
 *
 * References:
 * 1. https://pages.github.ibm.com/maximo-app-framework/graphite-documentation/datasources/multilevelds/
 * 2. https://en.wikipedia.org/wiki/Currying
 * 3. https://stackoverflow.com/a/36321
 *
 * @param {Datasource} datasource : Datasource to use inside the wrapper.
 * @returns {function} Returns a Callable function `safeSave`.
 */
// prettier-ignore
const makeSafeSave = (datasource) => {
    return async () => {

      log.d(LogConstants.TAG_CALIBRATION, "%cHEADS UP! Please read the message below carefully:", "background-color:orange");
      log.d(LogConstants.TAG_CALIBRATION, "========================================================================");
      log.d(LogConstants.TAG_CALIBRATION, "Disclaimer:                                                             ");
      log.d(LogConstants.TAG_CALIBRATION, "                                                                        ");
      log.d(LogConstants.TAG_CALIBRATION, "  This datasource is attempting to save data using the                  ");
      log.d(LogConstants.TAG_CALIBRATION, "  wrapper function 'safeSave'. This method should be used               ");
      log.d(LogConstants.TAG_CALIBRATION, "  exclusively to save calibration points in CalibrationPointsController.");
      log.d(LogConstants.TAG_CALIBRATION, "    If you are in the calibration point form, then ignore this message. ");
      log.d(LogConstants.TAG_CALIBRATION, "  However, if you are seeing this message outside the calibration       ");
      log.d(LogConstants.TAG_CALIBRATION, "  point page, please raise a question to the team responsible           ");
      log.d(LogConstants.TAG_CALIBRATION, "  for the project.                                                      ");
      log.d(LogConstants.TAG_CALIBRATION, "    This is intended to be a temporary solution to save datasheet,      ");
      log.d(LogConstants.TAG_CALIBRATION, "  its children 'assetfunction' and grandchildren 'calibration points'.  ");
      log.d(LogConstants.TAG_CALIBRATION, "                                                                        ");
      log.d(LogConstants.TAG_CALIBRATION, "  More details: https://jsw.ibm.com/browse/GRAPHITE-75552               ");
      log.d(LogConstants.TAG_CALIBRATION, "========================================================================");
      log.d(LogConstants.TAG_CALIBRATION, "                                                                        ");
      log.d(LogConstants.TAG_CALIBRATION, "Attempting to save changes with 'safeSave' ...                          ");

      const clone = { ...datasource.currentItem };
      
      datasource.currentItem._rowstamp = null;
      datasource.currentItem.pluscwodsid = clone.pluscwodsid;

        for (let i = 0; i < datasource.currentItem.pluscwodsinstr.length; i++) {
          
          const clone = { ...datasource.currentItem.pluscwodsinstr[i] };
          
          datasource.currentItem.pluscwodsinstr[i]._rowstamp = null;
          
          datasource.currentItem.pluscwodsinstr[i].pluscwodsinstrid = null;
          datasource.currentItem.pluscwodsinstr[i].pluscwodsinstrid = clone.pluscwodsinstrid;
  
          for (let j = 0; j < datasource.currentItem.pluscwodsinstr[i].pluscwodspoint.length; j++) {
            const clone = { ...datasource.currentItem.pluscwodsinstr[i].pluscwodspoint[j] };

            datasource.currentItem.pluscwodsinstr[i].pluscwodspoint[j]._rowstamp = null;

            datasource.currentItem.pluscwodsinstr[i].pluscwodspoint[j].pluscwodspointid = null;
            datasource.currentItem.pluscwodsinstr[i].pluscwodspoint[j].pluscwodspointid = clone.pluscwodspointid;
          }
        }
  
        log.d(LogConstants.TAG_CALIBRATION, " The following attributes were affected:   ");
        log.d(LogConstants.TAG_CALIBRATION, " * '_rowstamp' attribute was set to 'null' ");
        log.d(LogConstants.TAG_CALIBRATION, " * 'href' attribute was refreshed          ");
        log.d(LogConstants.TAG_CALIBRATION, " * All 'id' attributes were refreshed      ");
        log.d(LogConstants.TAG_CALIBRATION, "                                           ");
        log.d(LogConstants.TAG_CALIBRATION, "Calling base save() now...");
  
        return await datasource.save();
      }
}

export default makeSafeSave;
