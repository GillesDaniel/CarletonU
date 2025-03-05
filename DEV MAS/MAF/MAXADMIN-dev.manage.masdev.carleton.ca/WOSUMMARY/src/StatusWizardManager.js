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

import { log } from "@maximo/maximo-js-api";
const TAG = "StatusWizardManager:";

/**
 * Class created to contain Business rules and logic to query, extract, validate, massage the
 * data from backend. This data is the statuses in form of comma delimted string eg WAPPR, WMATL, APPR,..
 * This class implements algorithm to extract the statuses and populate the component ProgressWizard on the 
 * WOSummary page of the application.
 */
export class StatusWizardManager {

    /**
     * Class instance storing refs for app and page
     * Gets called from the PageController
     * @param {Object} app 
     * @param {Object} page 
     */
    constructor(app,page) {
        this.app = app;
        this.page = page;
        //url for fetching sys props
        this.sysprop_oslc_url = "maximo/oslc/os/mxapiprop?oslc.where=propname=\"RBA.WO.STATUSMAP%25\"&oslc.select=propname&lean=1";
        //url for getting details for a given sys prop
        this.sysprop_value_oslc_url = "maximo/oslc/service/system?action=wsmethod:getProperties&propNames=_PROPNAME_";
        //url to execute a condition
        this.condition_exp_oslc_url ="maximo/oslc/os/mxapiwodetail?oslc.select=wonum,description,location,cond._CONDITION_&oslc.where=wonum=\"_WONUM_\"";
        this.condition_to_sysprop_map = new Map();
        this.item = {};
        this.pwutil = new ProgressWizardUtility(app,page);
    }

    /**
     * @returns the selected wo object stored in this instance
     */
    getSelectedWoItem() {
        return this.item;
    }

    /**
     * Process the system properties(RBA.WO.STATUSMAP*) to extract the value and 
     * return the result status , i.e. comman delimited values of statuses eg WAPPR, WMATL, APPR,..
     */
    async execute(item) {
        log.i(TAG,"ececute() called");

        if(item && item.wonum) {
            this.item = item;
            this.target_wonum = item.wonum;
            log.i(TAG,"Target wonum found:"+this.target_wonum);
        } else {
            this.target_wonum = "";
            log.e(TAG,"Target wonum not found:"+this.target_wonum);
        }

        //Should work on a wo context
        // istanbul ignore else
        if(!this.target_wonum) {
            log.e(TAG,"Can't execute(), wonum not found!"+this.target_wonum);
            let wonumnotfound_msg = this.app.getLocalizedMessage('WOSUMMARY','statusmap_wonum_notfound','ERROR:wonum not found while processing status map');
            return wonumnotfound_msg;
        }
        //Fetch sys props
        let return_obj = await this.getStatusSystemProperties();
        let obj = {};
        // istanbul ignore else
        if(return_obj && return_obj.obj) {
            obj = return_obj.obj;
        }
        let sysprop_array = [];
        // istanbul ignore else
        if(obj && obj.member) {
            if(obj.member.length > 0) {
                obj.member.forEach(element => sysprop_array.push(element.propname));
                log.i(TAG,"System property names:"+sysprop_array);
            } else {
                log.e(TAG,"No RBA.WO.STATUSMAP system properties found!");
                let statusmap_sysprop_notfound_msg = this.app.getLocalizedMessage('WOSUMMARY','statusmap_sysprop_notfound','ERROR:RBA.WO.STATUSMAP System property not found');
                return statusmap_sysprop_notfound_msg;
            }
        } else if (obj && obj.Error && obj.Error.message) {
            log.e(TAG,"Error reading RBA.WO.STATUSMAP system properties-"+obj.Error.message);
            return "ERROR:"+obj.Error.message;
        } else {// shouldn't happen
            log.e(TAG,"Error while querying system property RBA.WO.STATUSMAP");
            return "ERROR:Error while querying system property RBA.WO.STATUSMAP";
        }
        
        //Parse for conditions if any
        let target_condition = "";
        // istanbul ignore else
        if(sysprop_array && sysprop_array.length > 0) {
            sysprop_array.sort();
            let condition_array = this.parseConditions(sysprop_array);
            // istanbul ignore else
            if(condition_array && condition_array.length > 0) {
                for(let i=0;i<condition_array.length;i++) {
                    // istanbul ignore else
                    if(await this.evaluateCondition(condition_array[i])) {
                        target_condition = condition_array[i];
                        log.i(TAG,"Condition evaluated to true:"+target_condition);
                        break;
                    }
                }
                log.i(TAG,"Condition evaluation:"+target_condition);
            }else {//No condition found
                log.i(TAG,"Zero conditions found for RBA.WO.STATUSMAP property");
            }
        }

        //Identify the system property to be picked up
        let target_system_property = "";
        // istanbul ignore else
        if(target_condition) {
            target_system_property = this.condition_to_sysprop_map.get(target_condition);
        } else {// init to OOTB sys prop TODO if system doesn't have the sys prop
            if(sysprop_array[0] === "RBA.WO.STATUSMAP") {
                target_system_property = sysprop_array[0];
            } else {
                log.e(TAG,"No RBA.WO.STATUSMAP system properties found, post conditions eval!");
                let statusmap_sysprop_notfound_msg = this.app.getLocalizedMessage('WOSUMMARY','statusmap_sysprop_notfound','ERROR:RBA.WO.STATUSMAP System property not found');
                return statusmap_sysprop_notfound_msg;
                }
        }

        //Get the value of the sys prop as stored in expression manager
        let str_status = await this.getSystemPropertyDetail(target_system_property);
        log.i(TAG,"Result WOStatus="+target_system_property+":"+str_status);
        str_status = this.validateData(str_status);
        // istanbul ignore else
        if(!str_status) {
            log.e(TAG,"System property value incorrect.");
            let statusmap_sysprop_incorrect_msg = this.app.getLocalizedMessage('WOSUMMARY','statusmap_sysprop_incorrect','ERROR:System Property value incorrect',[target_system_property]);
            return statusmap_sysprop_incorrect_msg;
        } else {
            return str_status;
        }
    }

    /**
     * Takes a string and populates the progress wizard widget using the wo status field
     * @param {string} status_value 
     * @param {object} item containing the wo
     */
    async populateProgressWizard(status_value, item) {
        this.page.state.unspecifiedFlag = false;
        // istanbul ignore else
        if (this.page.datasources && this.page.datasources.createWizardDS && status_value) {
            let current_wo_status = item.status;
          // istanbul ignore else
          if (status_value.startsWith("ERROR")) {
            status_value = status_value.substring(6);
            this.pwutil.setError(status_value);
            return;
            //TODO On error need to set the status value in the widget to empty or so
          } else {
            let records = this.getStatusRecords(status_value, "status");
            let wostatushistoryDS = this.app.findDatasource("wostatushistoryDS");
            await wostatushistoryDS.load();
            this.updateChangeDate(records);
            await this.pwutil.populate(records);
            log.i(TAG,"Records populated");
            this.pwutil.populateDS();
            let found_flag = this.pwutil.setCurrentStatus(current_wo_status);
            // istanbul ignore else
            if(!found_flag) {
                log.i(TAG, "Status not found in records, going for Historical Status:" + current_wo_status);
                let latest_status = this.processStatusHistory();
                let hist_found_flag = false;
                // istanbul ignore else
                if(latest_status) {
                    hist_found_flag = this.pwutil.setCurrentStatus(latest_status);
                }
                // istanbul ignore else
                if(!hist_found_flag) {
                    this.pwutil.setUnSpecified();
                    log.e(TAG,"Can't populate progress wizard, status in history not found in sys prop value:" + latest_status);
                } else {
                    log.i(TAG, "Historical Status populated in progress wizard:" + latest_status);
                }
            } else {
                log.i(TAG, "Status populated in progress wizard:" + current_wo_status);
            }
          log.i(TAG,"page states current_step:hide:"+this.page.state.progress_wizard_current_step_id+":"+ this.page.state.progress_wizard_hide_flag);
        } 
      } else {
        this.pwutil.hide(true);
        log.e(TAG, "Can't populate progress wizard, status value:" + this.page.datasources+":"+status_value);
      }
    }

    /**
     * Pull status history and get the latest transaction
     * @returns latest status from status history
     */
    processStatusHistory() {
        let wostatushistoryDS = this.app.findDatasource("wostatushistoryDS");
        let items = wostatushistoryDS.items;
        let latest_status = "";
        // istanbul ignore else
        if(items && items.length > 0) {
            items.sort((item1,item2) => 
            {
                let datestr1 = item1.changedate;
                let datestr2 = item2.changedate;
                let date1 = this.app.dataFormatter.convertISOtoDate(datestr1);
                let date2 = this.app.dataFormatter.convertISOtoDate(datestr2);
                return date1-date2;
            });
            //Extract the latest
            latest_status = items[items.length-1].status;
        }
        return latest_status;
    }  
    
    /**
     * Generates a array of objects compatible for a DS
     * @param {string} items is a comman delited status string
     * @param {string} fieldName the 'status' field to be added to the array
     * @returns {[]} records
     */
    getStatusRecords(items,fieldName) {
        let id = 0;
        items = items.split(', ');
        let records = items.map(item => {
        let obj = {};
        obj[fieldName] = item;
        obj._id = String(id);
        obj.changedate = "";
        id++;
        return obj;
        });
        return records;
    }
    
    /**
     * Adds field changedate to the records array from the historical statuses of the wo
     * @param {array} records is array of objects containing status and _id
     */
    updateChangeDate(records) {
        let wostatushistoryDS = this.app.findDatasource("wostatushistoryDS");
        let items = wostatushistoryDS.items;
        // istanbul ignore else
        if(items && items.length > 0) {
            items.sort((item1,item2) =>
            {
                let status1 = item1.status;
                let status2 = item2.status;
                if (status1 < status2) {
                    return 1;
                } else if (status1 > status2) {
                    return -1;
                } else {
                    let datestr1 = item1.changedate;
                    let datestr2 = item2.changedate;
                    let date1 = this.app.dataFormatter.convertISOtoDate(datestr1);
                    let date2 = this.app.dataFormatter.convertISOtoDate(datestr2);
                    return date2-date1;
                }
            });
        }

        // istanbul ignore else
        if(records && records.length > 0) {
        records.forEach(element => {
            this.getChangeDate(element,items);
        });
        }
    }

    /**
     * Retrieve the changedate field from the status history for a given status value
     * @param {obj} item object containing the wo
     */
    getChangeDate(item,items) {
        // istanbul ignore else
        if(items && items.length > 0) {
            for(let i=0;i<items.length;i++) {
                // istanbul ignore else
                if(items[i].status === item.status) {
                    // istanbul ignore else
                    if(items[i].changedate) {
                        item.changedate = this.app.dataFormatter.dateToString(this.app.dataFormatter.convertISOtoDate(items[i].changedate), this.app.dataFormatter.dateTimeFormat,'DATETIME');
                        break;
                    }
                }
            }
        } else {
            log.i(TAG,"status history empty:"+items);
        }
    }

    /**
     * Function to make a call using oslc query
     * @param {string} oslc query to be fired
     * @returns array of json objects
     */
    async loader(query) {
          let itemResp = await fetch(window.location.origin+"/"+query,{ headers: {'Cache-Control': 'no-cache, no-store, must-revalidate'}});
          // istanbul ignore else
          if(itemResp) {
            let obj = await itemResp.json();
            log.i(TAG,"query:"+query);
            // istanbul ignore else
            if(obj) {
                log.i(TAG,"obj:"+JSON.stringify(obj));
            } else {
                log.e(TAG,"obj is null");
            }
            return {obj};
        } else {
            return {};
        }
    };

   /**
     * Retrieve the system properties starting with 'RBA.WO.STATUSMAP%'
     * returns a array of system properties
     */
    async getStatusSystemProperties() {
        return await this.loader(this.sysprop_oslc_url);
    }

    /**
     * Retrive status conditions given property names.
     * returns a array of conditions
     * @param (Array) sysprop_array containing system properties as json objects
     */
    parseConditions(sysprop_array) {
        let condition_array = [];
        sysprop_array.forEach(str=>{
            let prop_array = str.split(".");
            // istanbul ignore else
            if(prop_array && prop_array[3] && prop_array[3].length > 0) {
                condition_array.push(prop_array[3]);
                this.condition_to_sysprop_map.set(prop_array[3],str);
            }
        });
        return condition_array;
    }

    /**
     * Execute oslc query to check if the condition(s) evaluates to true for a given wo.
     * returns true/false for a given condition
     * @param (String) condition is the name appended to the system property RBA.WO.STATUSMAP.[condition]
     */
    async evaluateCondition(condition) {
        let custom_query = this.condition_exp_oslc_url.replace("_CONDITION_",condition);
        custom_query = custom_query.replace("_WONUM_",this.target_wonum);
        let return_obj = await this.loader(custom_query);
        let obj = {};
        // istanbul ignore else
        if(return_obj && return_obj.obj) {
            obj = return_obj.obj;
        } else {
            return false;
        }
        condition = condition.toLowerCase();
        // istanbul ignore else
        if(obj && obj.member && obj.member.length > 0) {
            // istanbul ignore else
            if(obj.member[0][condition] && obj.member[0][condition] === 1) {
                return true;
            }
        } else {
            return false;
        }
    }

    /**
     * Retrieve the detail of given system property 
     * returns a comma delimited string entered by user
     * @param (String) sys_prop system property name for which to get the details from backend
     */
    async getSystemPropertyDetail(sys_prop) {
        let custom_url = this.sysprop_value_oslc_url.replace("_PROPNAME_",sys_prop);
        let return_obj = await this.loader(custom_url);
        let obj = {};
        // istanbul ignore else
        if(return_obj && return_obj.obj) {
            obj = return_obj.obj;
            return obj[sys_prop];
        } else {
            log.e("Error:No value found for system property:"+sys_prop);
            return "";
        }
    }

   /**
     * Get the data(string) and validate if has comma seperated string, if multiple values are entered.
     * returns a valid string for eg WAPPR,INPROG,APPR
     * @param (String) value is comma delimited statuses extracted from the backend
     */
    validateData(value) {
        // istanbul ignore else
        if(value === null || value.length < 1) {
            return "";
        }
        // istanbul ignore else
        if(value.indexOf(" ") > -1 && value.indexOf(",") < 0) {
            return "";
        }
        value = value.replace(" ","");
        value = value.replace(",",", ");
        return value;
    } 
}

/**
 * A utility class used to program the Progress Wizard component
 * Contains logic to show error,hide,select status on the component.
 * Used as inner class for StatusWizardManager
 */
class ProgressWizardUtility {
    
    /**
     * Instance having TAG to display in the log
     * @param {Object} app 
     * @param {Object} page 
     */
    constructor(app,page) {
        this.TAG = "ProgressWizardUtility";
        this.app = app;
        this.page = page;
        this.records = [];
    }

    /**
     * Stores array of json objects for later user
     * @param {Array} records 
     */
    async populate(records) {
        this.records = records;
    }

    /**
     * Populate the DS of the Progress Wizard component
     */
    async populateDS() {
        this.hide(false);
        let createWizardDS = this.app.findDatasource("createWizardDS");
        await createWizardDS.load({ src: this.records, noCache: true });
    }

    /**
     * Find the status in the records and set the page state accordingly
     * @param {String} current_status status of the wo
     * @returns 
     */
    setCurrentStatus(current_status) {
        let index = this.getStatusIndex(current_status);
        // istanbul ignore else
        if(index !== -1) {
            this.page.state.progress_wizard_current_step_id = String(index);
            return true;
          } 
        this.page.state.progress_wizard_current_step_id = String(0);
        return false;
    }

    /**
     * Traverse the records and get the index of the current_status
     * @param {String} current_status 
     * @returns 
     */
    getStatusIndex(current_status) {
        let status_found_index=-1;
        for(let i=0;i<this.records.length;i++) {
            // istanbul ignore else
            if(current_status === this.records[i].status) {
            status_found_index = i;
            break;
            }
        }
        return status_found_index;
      }

    /**
     * If there is error in the program display on the screen and hide the Progress Wizard component
     * @param {String} error 
     */
    setError(error) {
        this.page.state.progress_wizard_current_step_id = String(0);
        this.hide(true);
        this.app.toast(error,'warning',"","",false,true);
        log.e(TAG,error);
    }

    /**
     * Add unspecified node and focus on it
     */
    setUnSpecified() {
        let obj = {};
        obj['status'] = this.app.getLocalizedMessage('WOSUMMARY','unspecified','Unspecified');
        obj._id = String(0);
        obj.changedate = "";
        this.records.unshift(obj);
        for(let i=1;i<this.records.length;i++) {
            this.records[i]._id++;
        }
        this.populateDS();
        this.page.state.progress_wizard_current_step_id = String(0);
        this.page.state.unspecifiedFlag = true;
    }

    /**
     * Hide/Unhide
     * @param {boolean} hide_flag 
     */
    hide(hide_flag) {
        this.page.state.progress_wizard_hide_flag = hide_flag;
    }

}
