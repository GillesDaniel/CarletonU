/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import { log } from "@maximo/maximo-js-api";
import MapPreLoadAPI from '@maximo/map-component/build/ejs/framework/loaders/MapPreLoadAPI';
import { transform } from 'ol/proj';

const TAG = "CreateSRController";

const mapsPageSize = 5000;

const fillColor = '#0F62FE';
const drawingColor = '#FFFFFF';
const fillPointColor = '#0F62FE';
let popcurrentitem;
const symbols = {
  ASSET: {
      OPERATING: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="35px" height="41px" viewBox="0 0 35 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <title>pin-asset_operating</title>
       <g id="Asset-Operating,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
         <g id="6.-Badges-+-Tags/Location-Pins/32px/dark-Copy-19" transform="translate(-19.949811, -7.500500)">
           <path d="M32,15.0010198 C25.4609176,14.9160989 20.089775,20.1456386 20,26.6846561 C20.0027577,29.2238271 20.8467315,31.690532 22.4,33.6992016 L32,47.7282925 L41.6,33.6992016 C43.1532685,31.690532 43.9972423,29.2238271 44,26.6846561 C43.910225,20.1456386 38.5390824,14.9160989 32,15.0010198 Z" id="Pin-Background" fill="${fillColor}"></path>
           <g id="Group" transform="translate(21.500000, 17.000000)" fill="${drawingColor}">
             <g id="Icon" transform="translate(3.500000, 3.500000)">
               <path d="M5.29375,0.874975163 C4.45472128,0.872144705 3.63329365,1.11553067 2.93125,1.575 L5.73125,4.375 C5.91963837,4.53573561 6.03516217,4.76571505 6.05163501,5.01280767 C6.06810785,5.25990028 5.98413463,5.50317952 5.81875,5.6875 C5.63442952,5.85288463 5.39115028,5.93685785 5.14405767,5.92038501 C4.89696505,5.90391217 4.66698561,5.78838837 4.50625,5.6 L1.61875,2.8 C1.11951572,3.53462158 0.859726721,4.4056788 0.875,5.29375 C0.884592331,7.7301739 2.8573261,9.70290767 5.29375,9.7125 C5.676812,9.71459577 6.05873115,9.67052818 6.43125,9.58125 L9.3625,12.5125 C10.2202673,13.3702672 11.6109827,13.3702672 12.46875,12.5125 C13.3265172,11.6547327 13.3265172,10.2640173 12.46875,9.40625 L9.5375,6.475 C9.62677818,6.10248115 9.67084577,5.720562 9.66875,5.3375 C9.69226288,4.1620923 9.24172771,3.02668212 8.41869376,2.18718749 C7.59565981,1.34769286 6.46939283,0.874764847 5.29375,0.874975163 Z M8.79375,5.29375 C8.79310815,5.60462573 8.74892903,5.91387958 8.6625,6.2125 L8.53125,6.69375 L8.88125,7.04375 L11.8125,9.975 C12.0648075,10.213864 12.2072847,10.5463108 12.20625,10.89375 C12.2162188,11.2429497 12.0722437,11.5788914 11.8125,11.8125 C11.5730327,12.0639407 11.2409776,12.20625 10.89375,12.20625 C10.5465224,12.20625 10.2144673,12.0639407 9.975,11.8125 L7.04375,8.88125 L6.69375,8.53125 L6.2125,8.6625 C5.91387958,8.74892903 5.60462573,8.79310815 5.29375,8.79375 C4.36409439,8.79116791 3.47110468,8.43083873 2.8,7.7875 C2.11369387,7.14172238 1.73231406,6.23594534 1.75,5.29375 C1.75060336,4.96849724 1.7947454,4.64478896 1.88125,4.33125 L3.80625,6.25625 C4.1348262,6.61380606 4.59321683,6.82444849 5.0785394,6.8409001 C5.56386198,6.85735171 6.0354648,6.67823449 6.3875,6.34375 C6.72198449,5.9917148 6.90110171,5.52011198 6.8846501,5.0347894 C6.86819849,4.54946683 6.65755606,4.0910762 6.3,3.7625 L4.375,1.8375 C4.65795066,1.74801218 4.95324634,1.70371783 5.25,1.70614727 C6.17965561,1.70883209 7.07264532,2.06916127 7.74375,2.7125 C8.41547307,3.40404607 8.79199921,4.32967283 8.79375,5.29375 L8.79375,5.29375 Z" id="Fill"></path>
             </g>
           </g>
           <g id="Oval-Copy" transform="translate(0.000000, 8.000000)" fill="${fillPointColor}">
             <circle cx="49" cy="5" r="5"></circle>
           </g>
         </g>
       </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      },
      OTHERS: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="35px" height="41px" viewBox="0 0 35 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>pin-asset_others</title>
     <g id="Asset-Others,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
       <g id="6.-Badges-+-Tags/Location-Pins/32px/dark-Copy-17" transform="translate(-19.949811, -7.500500)">
         <path d="M32,15.0010198 C25.4609176,14.9160989 20.089775,20.1456386 20,26.6846561 C20.0027577,29.2238271 20.8467315,31.690532 22.4,33.6992016 L32,47.7282925 L41.6,33.6992016 C43.1532685,31.690532 43.9972423,29.2238271 44,26.6846561 C43.910225,20.1456386 38.5390824,14.9160989 32,15.0010198 Z" id="Pin-Background" fill="${fillColor}"></path>
         <g id="Group" transform="translate(21.500000, 17.000000)" fill="${drawingColor}">
           <g id="Icon" transform="translate(3.500000, 3.500000)">
             <path d="M5.2828125,10.5 C4.31631419,10.5 3.5328125,9.71649831 3.5328125,8.75 C3.5328125,7.78350169 4.31631419,7 5.2828125,7 C6.24931081,7 7.0328125,7.78350169 7.0328125,8.75 C7.03184785,9.71609846 6.24891096,10.4990353 5.2828125,10.5 L5.2828125,10.5 Z M5.2828125,7.875 C4.79956334,7.875 4.4078125,8.26675084 4.4078125,8.75 C4.4078125,9.23324916 4.79956334,9.625 5.2828125,9.625 C5.76606166,9.625 6.1578125,9.23324916 6.1578125,8.75 C6.15733017,8.26695077 5.76586173,7.87548233 5.2828125,7.875 L5.2828125,7.875 Z M13.125,2.625 C13.1240353,1.65890154 12.3410985,0.875964652 11.375,0.875 C11.0916011,0.876982072 10.8130413,0.948650362 10.563875,1.0836875 L3.3936875,4.7936875 C1.64323145,5.61312552 0.638649845,7.48480063 0.923226761,9.39649909 C1.20780368,11.3081976 2.71398595,12.8061184 4.62722069,13.0801766 C6.54045543,13.3542347 8.40657697,12.339374 9.216375,10.5844375 L12.93075,3.4094375 C13.0565876,3.16698574 13.1231576,2.89815665 13.125,2.625 Z M11.375,1.75 C11.8582492,1.75 12.25,2.14175084 12.25,2.625 C12.25,3.10824916 11.8582492,3.5 11.375,3.5 C10.8917508,3.5 10.5,3.10824916 10.5,2.625 C10.5004823,2.14195077 10.8919508,1.75048233 11.375,1.75 Z M9.63375,2.541 C9.632,2.5694375 9.625,2.596125 9.625,2.625 C9.62596465,3.59109846 10.4089015,4.37403535 11.375,4.375 C11.4034375,4.375 11.42925,4.368 11.45725,4.3666875 L9.562,8.0250625 C9.2487999,6.18692932 7.80679097,4.74825554 5.9679375,4.4393125 L9.63375,2.541 Z M5.25,12.25 C3.31700338,12.25 1.75,10.6829966 1.75,8.75 C1.75,6.81700338 3.31700338,5.25 5.25,5.25 C7.18299662,5.25 8.75,6.81700338 8.75,8.75 C8.74758952,10.6819973 7.18199729,12.2475895 5.25,12.25 L5.25,12.25 Z" id="Fill"></path>
           </g>
         </g>
         <g id="Oval-Copy" transform="translate(0.000000, 8.000000)" fill="${fillPointColor}">
           <circle cx="49" cy="5" r="5"></circle>
         </g>
       </g>
     </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      },
      CLUSTER: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="33px" height="34px" viewBox="0 0 33 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>pin-asset_cluster</title>
     <g id="Asset-Cluster,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
       <g id="pin-cluster" transform="translate(-19.949811, -14.500500)">
         <path d="M40.1374606,15 L40.3009595,15.0016204 C46.7030983,15.0780787 51.9116061,20.2469999 52,26.6854172 C51.9973801,29.0976296 51.2355629,31.4444414 49.8276541,33.3952751 L49.6,33.6999626 L40,47.7290535 L37.4772299,44.043 L43.5782299,35.127 L43.7709613,34.8718027 C45.5004633,32.4970131 46.4368004,29.6327325 46.4399986,26.6880672 C46.373099,21.8032194 43.8845868,17.5325587 40.1374606,15 Z M44,26.6854172 C43.9973801,29.0976296 43.2355629,31.4444414 41.8276541,33.3952751 L41.6,33.6999626 L32,47.7290535 L22.4,33.6999626 C20.8467315,31.6912931 20.0027577,29.2245881 20,26.6854172 C20.0883939,20.2469999 25.2969017,15.0780787 31.6990405,15.0016204 L32,15.0017808 C38.5390824,14.9168599 43.910225,20.1463996 44,26.6854172 Z" id="Shape" fill="${fillColor}"></path>
         <g id="Number-or-icon?" transform="translate(21.500000, 17.000000)"></g>
       </g>
     </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      }
  },
  LOCATION: {
      CLUSTER: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="33px" height="34px" viewBox="0 0 33 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>pin-location-cluster</title>
     <g id="Location-Cluster,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
       <g id="pin-cluster" transform="translate(-19.949811, -14.500500)">
         <path d="M40.1374606,15 L40.3009595,15.0016204 C46.7030983,15.0780787 51.9116061,20.2469999 52,26.6854172 C51.9973801,29.0976296 51.2355629,31.4444414 49.8276541,33.3952751 L49.6,33.6999626 L40,47.7290535 L37.4772299,44.043 L43.5782299,35.127 L43.7709613,34.8718027 C45.5004633,32.4970131 46.4368004,29.6327325 46.4399986,26.6880672 C46.373099,21.8032194 43.8845868,17.5325587 40.1374606,15 Z M44,26.6854172 C43.9973801,29.0976296 43.2355629,31.4444414 41.8276541,33.3952751 L41.6,33.6999626 L32,47.7290535 L22.4,33.6999626 C20.8467315,31.6912931 20.0027577,29.2245881 20,26.6854172 C20.0883939,20.2469999 25.2969017,15.0780787 31.6990405,15.0016204 L32,15.0017808 C38.5390824,14.9168599 43.910225,20.1463996 44,26.6854172 Z" id="Shape" fill="${fillColor}"></path>
         <g id="Number-or-icon?" transform="translate(21.500000, 17.000000)"></g>
       </g>
     </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      },
      OPERATING: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="35px" height="41px" viewBox="0 0 35 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
       <title>pin-location_operating</title>
       <g id="Location-Operating,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
         <g id="6.-Badges-+-Tags/Location-Pins/32px/dark-Copy-18" transform="translate(-19.949811, -7.500500)">
           <path d="M32,15.0010198 C25.4609176,14.9160989 20.089775,20.1456386 20,26.6846561 C20.0027577,29.2238271 20.8467315,31.690532 22.4,33.6992016 L32,47.7282925 L41.6,33.6992016 C43.1532685,31.690532 43.9972423,29.2238271 44,26.6846561 C43.910225,20.1456386 38.5390824,14.9160989 32,15.0010198 Z" id="Pin-Background" fill="${fillColor}"></path>
           <g id="Group" transform="translate(21.500000, 17.000000)" fill="${drawingColor}">
             <g id="Icon" transform="translate(3.500000, 3.500000)">
               <path d="M7,0.875 C3.61725591,0.875 0.875,3.61725591 0.875,7 C0.875,10.3827441 3.61725591,13.125 7,13.125 C10.3827441,13.125 13.125,10.3827441 13.125,7 C13.125,5.375549 12.4796894,3.81763128 11.331029,2.66897097 C10.1823687,1.52031065 8.624451,0.875 7,0.875 Z M7,12.25 C4.10050506,12.25 1.75,9.89949494 1.75,7 C1.75,4.10050506 4.10050506,1.75 7,1.75 C9.89949494,1.75 12.25,4.10050506 12.25,7 C12.25,9.89949494 9.89949494,12.25 7,12.25 L7,12.25 Z M7,4.375 C5.55025253,4.375 4.375,5.55025253 4.375,7 C4.375,8.44974747 5.55025253,9.625 7,9.625 C8.44974747,9.625 9.625,8.44974747 9.625,7 C9.625,5.55025253 8.44974747,4.375 7,4.375 Z" id="Fill"></path>
             </g>
           </g>
           <g id="Oval-Copy" transform="translate(0.000000, 8.000000)" fill="${fillPointColor}">
             <circle cx="49" cy="5" r="5"></circle>
           </g>
         </g>
       </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      },
      OTHERS: {
          symbol: `<?xml version="1.0" encoding="UTF-8"?>
     <svg width="35px" height="41px" viewBox="0 0 35 41" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
     <title>pin-location_others</title>
     <g id="Location-Others,-map-view-(updated-s33)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
       <g id="6.-Badges-+-Tags/Location-Pins/32px/dark-Copy-23" transform="translate(-19.949811, -7.500500)">
         <path d="M32,15.0010198 C25.4609176,14.9160989 20.089775,20.1456386 20,26.6846561 C20.0027577,29.2238271 20.8467315,31.690532 22.4,33.6992016 L32,47.7282925 L41.6,33.6992016 C43.1532685,31.690532 43.9972423,29.2238271 44,26.6846561 C43.910225,20.1456386 38.5390824,14.9160989 32,15.0010198 Z" id="Pin-Background" fill="${fillColor}"></path>
         <g id="Group" transform="translate(21.500000, 17.000000)" fill="${drawingColor}">
           <g id="Icon" transform="translate(3.500000, 3.500000)">
             <path d="M7,0.875 C3.61725591,0.875 0.875,3.61725591 0.875,7 C0.875,10.3827441 3.61725591,13.125 7,13.125 C10.3827441,13.125 13.125,10.3827441 13.125,7 C13.125,5.375549 12.4796894,3.81763128 11.331029,2.66897097 C10.1823687,1.52031065 8.624451,0.875 7,0.875 Z M7,12.25 C4.10050506,12.25 1.75,9.89949494 1.75,7 C1.75,4.10050506 4.10050506,1.75 7,1.75 C9.89949494,1.75 12.25,4.10050506 12.25,7 C12.25,9.89949494 9.89949494,12.25 7,12.25 L7,12.25 Z M7,4.375 C5.55025253,4.375 4.375,5.55025253 4.375,7 C4.375,8.44974747 5.55025253,9.625 7,9.625 C8.44974747,9.625 9.625,8.44974747 9.625,7 C9.625,5.55025253 8.44974747,4.375 7,4.375 Z" id="Fill"></path>
           </g>
         </g>
         <g id="Rectangle-Copy-3" transform="translate(0.000000, 8.000000)" fill="${fillPointColor}">
           <rect x="44" y="0" width="10" height="10"></rect>
         </g>
       </g>
     </g>
     </svg>`,
          alignment: {
              offsetx: 10,
              offsety: 40,
              width: 48,
              height: 40
          }
      }
  }
};

class CreateSRController {

  /**
   * The constructor of CreateSRController class
   */
  constructor() {
    this.memoizedSymbols = {};
    this.onSaveDataFailed = this.onSaveDataFailed.bind(this);
    this.saveDataSuccessful = true;
  }

  /**
   * Function to set flag for 'save-data-failed' event
   */
   onSaveDataFailed() {
    this.saveDataSuccessful = false;
    this.app.state.pageLoading = false;
  }



  pageInitialized(page, app) {
    this.page = page;
    this.app = app;
    this.app.state.pageLoading = true;

    this.initializeNewSrDatasource();
    this.initializeFields();
  }



  /**
   * This initializes the datasource that will receive the new SR.
   * At this point, we expect datasource to be empty.
   */
  async initializeNewSrDatasource() {
    let srDS = this.app.findDatasource("srDS");
    let schema = srDS.getSchema();
    //istanbul ignore if
    if (!schema) {
      // Force schema load
      schema = await srDS.dataAdapter.resolveSchema(
        null,
        srDS.options.query,
        true
      );
      srDS.setSchema(schema);
    }
  }



  async retrieveRequiredStates(schema, item) {
    if (schema) {
      //Remove required state of all sections
      this.page.state.detailrequiredState = false;
      this.page.state.contactrequiredState = false;
      this.page.state.locationrequiredState = false;
      this.page.state.assetrequiredState = false;
      let reqFields = schema.required; 
      if (reqFields) {
        if(reqFields.includes("description")){
          this.page.state.isRequired.description = true;
          this.page.state.detailrequiredState =  true;
        }
        if(reqFields.includes("description_longdescription")){
          this.page.state.isRequired.description_longdescription = true;
          this.page.state.detailrequiredState =  true;
        }
        if(reqFields.includes("affectedperson")){
          this.page.state.isRequired.affectedperson = true;
          this.page.state.contactrequiredState =  true;
        }
        if(reqFields.includes("affectedemail")){
          this.page.state.isRequired.affectedemail = true;
          this.page.state.contactrequiredState =  true;
        }
        if(reqFields.includes("affectedphone")){
          this.page.state.isRequired.affectedphone = true;
          this.page.state.contactrequiredState =  true;
        }
        if(reqFields.includes("location")){
          this.page.state.isRequired.location = true;
          this.page.state.locationrequiredState =  true;
        }
        if(reqFields.includes("assetnum")){
          this.page.state.isRequired.assetnum = true;
          this.page.state.assetrequiredState =  true;
        }
      }
      if (this.app.state.isMobileContainer) {
        this.page.state.addressrequiredState = false;
        reqFields = schema.properties?.tkserviceaddress?.items?.required;
        if (reqFields) {
          if(reqFields.includes("formattedaddress")){
            this.page.state.isRequired.formattedaddress = true;
            this.page.state.addressrequiredState = true;
          }
          if(reqFields.includes("streetaddress")){
            this.page.state.isRequired.streetaddress = true;
            this.page.state.addressrequiredState = true;
          }
          if(reqFields.includes("city")){
            this.page.state.isRequired.city = true;
            this.page.state.addressrequiredState = true;
          }
          if(reqFields.includes("stateprovince")){
            this.page.state.isRequired.stateprovince = true;
            this.page.state.addressrequiredState = true;
          }
        }
      }
    }
    //In schema, the required list does not contain service address fields, so we grab them from the item metadata
    if (item) {
      const sa = (item.tkserviceaddress)? item.tkserviceaddress[0] : null;
      if (sa) {
        this.page.state.addressrequiredState = false;
        if(sa.$formattedaddress_meta?.required){
          this.page.state.isRequired.formattedaddress = true;
          this.page.state.addressrequiredState = true;
        }
        if(sa.$streetaddress_meta?.required){
          this.page.state.isRequired.streetaddress = true;
          this.page.state.addressrequiredState = true;
        }
        if(sa.$city_meta?.required){
          this.page.state.isRequired.city = true;
          this.page.state.addressrequiredState = true;
        }
        if(sa.$stateprovince_meta?.required){
          this.page.state.isRequired.stateprovince = true;
          this.page.state.addressrequiredState = true;
        }
      }
    }
  }



  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  async initializeMap(isForAsset) {
    this.app.state.pageLoading = true;
    try {
      if (!this.mapPreloadAPI) {
        this.mapPreloadAPI = new MapPreLoadAPI();
      }
      if (this.app.state.isMapValid) {
        if (isForAsset) {
          this.page.state.canLoad.assetMap = true;
          const assetMapDS = this.page.datasources["assetMapDS"];
          if (!assetMapDS.state.hasData) {
            await assetMapDS.load({pageSize: mapsPageSize});
          }
          //await this.loadAssetJsonForMap();
        } else {
          this.page.state.canLoad.locationMap = true;
          const locationMapDS = this.page.datasources["locationMapDS"];
          if (!locationMapDS.state.hasData) {
            await locationMapDS.load({pageSize: mapsPageSize});
          }
          //await this.loadLocationJsonForMap();
        }
      }
    } catch (error) {
      //istanbul ignore next
      log.e(error);
    } finally {
      this.app.state.pageLoading = false;
    }
  }



  initializeFields() {   
    this.app.state.attachCount = 0; 
    this.page.state.lastcategorydesc = this.page.params.lastcategorydesc;
    if (this.app.client && this.app.client.userInfo){
      this.page.state.siteid = this.app.client.userInfo.defaultSite;
      this.page.state.orgid = this.app.client.userInfo.defaultOrg;
    }
  }



  // istanbul ignore next
  async setInvalidState(isAsset) {
    let dsName = (isAsset)? "assetLookupDS" : "locationLookupDS";
    let attr = (isAsset)? "assetnum" : "location";
    let stateVar = (isAsset)? "hasInvalidAsset" : "hasInvalidLocation";
    let isInvalid = false;
    let value = this.app.findDatasource("srDS").item[attr];
    if (value && (value.trim() !== "")) {
      value = value.trim().toUpperCase();
      if (value !== this.page.state[attr]) {
        isInvalid = true;
        let ds = this.page.datasources[dsName];
        if (ds.state.currentSearch) {
          await ds.reset(ds.baseQuery);
        }
        ds.initializeQbe();
        ds.setQBE("assetnum", "=", value);
        await ds.searchQBE();
        isInvalid = !ds.items.length;
        if (!isInvalid) {
          if (isAsset) {  
            this.selectAsset(ds.item);
          } else {
            this.selectLocation(ds.item);
          }
        }  else {
          //Is invalid, but we want to support a scenario where the asset scanned or added is not in the lookup
          //on the device and it can still be processed on the insert when the SR is submitted.
          if (isAsset && this.app.state.isMobileContainer) {
            let newSr = this.app.findDatasource("srDS").item;
            this.page.state.assetnum = newSr.assetnum;
            this.page.state.assetdesc = "";
            isInvalid = false;
            this.loadHub();
            let label = this.app.getLocalizedMessage(this.app.name, 'assetNotFound', 'Asset not found');
            this.app.toast(label, 'info');
          }
        }
      }
    }
    this.page.state[stateVar] = isInvalid;
  }

  // istanbul ignore next	
  async setAddressState(stateVar) {
    let srDS = this.app.findDatasource("srDS");
    if (stateVar === "stateprovince") {
      await this.validateStateProvince(srDS.item[stateVar]);
    } else {
      this.page.state[stateVar] = srDS.item[stateVar];
    }
    this.loadHub();
  }

   /**
   * This method is used to validate if the inputed state/province exists
   * and user can submit the SR and validate on the go.
   */

  async validateStateProvince(spItem) {
    let srDS = this.app.findDatasource("srDS");
    let spList = this.app.findDatasource("stateProvinceList");
    spList.initializeQbe();
    spList.setQBE("value","=", spItem);
    let searchResult = await spList.searchQBE();
    spList.clearQBE();
    // istanbul ignore else
    if ((searchResult && searchResult.length === 1) || spItem === "" ) {
      this.page.state["stateprovince"] = spItem;
      srDS.state.canSave = true;
    } else {
      spList.setQBE("value","=", "%" + spItem + "%");
      searchResult = await spList.searchQBE();
    }
    // istanbul ignore next - fail-safe code
    if(searchResult.length === 0 && srDS.state.canSave) {
      let label = this.app.getLocalizedMessage(this.app.name, 'invalidStateProvince', 'Invalid state province');
      this.app.toast(label, 'info');
      srDS.state.canSave = false;
      } 
    spList.clearQBE();
  }



  async validateALNDomainValue(fupItem) {
    if (fupItem.alnvalue !== '' && fupItem.assetattributedomainid) {
      //istanbul ignore next - This is only required due device ghost click calling validation twice 
      if (!this.app.client.fakeClient && fupItem.lastValidated && (Date.now() - fupItem.lastValidated) < 500) {
        return;
      }
      fupItem.lastValidated = Date.now();
      fupItem.errormsg = this.getFupDomainErrorMsg();
      const foundValue = await this.foundFupValueInDomain("alndomainValidationDS", fupItem.assetattributedomainid, fupItem.alnvalue);
      fupItem.invalid  = !foundValue;
      this.app.findDatasource("srDS").state.canSave = foundValue;
    } else {
      fupItem.invalid = false;
      this.app.findDatasource("srDS").state.canSave = true;
    }
  }



  async validateNumDomainValue(fupItem) {
    if (fupItem.numvalue !== '' && fupItem.assetattributedomainid) {
      //istanbul ignore next - This is only required due device ghost click calling validation twice 
      if (!this.app.client.fakeClient && fupItem.lastValidated && (Date.now() - fupItem.lastValidated) < 500) {
        return;
      }
      fupItem.lastValidated = Date.now();
      fupItem.errormsg = this.getFupDomainErrorMsg();
      const foundValue = await this.foundFupValueInDomain("numericDomainValidationDS", fupItem.assetattributedomainid, fupItem.numvalue);
      fupItem.invalid  = !foundValue;
      this.app.findDatasource("srDS").state.canSave = foundValue;
    } else {
      fupItem.invalid = false;
      this.app.findDatasource("srDS").state.canSave = true;
    }
  }



  /**
   * Validation is available to be added to field, but not used OOTB
   * @param {*} fupItem 
   */
  async validateTableDomainValue(fupItem) {
    if (fupItem.tablevalue !== '' && fupItem.assetattributedomainid) {
      //istanbul ignore next - This is only required due device ghost click calling validation twice 
      if (!this.app.client.fakeClient && fupItem.lastValidated && (Date.now() - fupItem.lastValidated) < 500) {
        return;
      }
      fupItem.lastValidated = Date.now();
      fupItem.errormsg = this.getFupDomainErrorMsg();
      const foundValue = await this.foundFupValueInDomain("tableDomainDS", fupItem.assetattributedomainid, fupItem.tablevalue);
      fupItem.invalid  = !foundValue;
      this.app.findDatasource("srDS").state.canSave = foundValue;
    } else {
      fupItem.invalid = false;
    }
  }



  async foundFupValueInDomain(dsName, fupDomainId, fupValue) {
    let foundValue = true;
    if (fupValue || fupValue === 0) {
      const domainDS = this.app.findDatasource(dsName);
      domainDS.reset(domainDS.baseQuery, false);
      await domainDS.initializeQbe();
      domainDS.setQBE('domainid', '=', fupDomainId);
      if (dsName === "tableDomainDS") {
        await domainDS.searchQBE();
      } else {
        domainDS.setQBE('value', '=', fupValue);
        await domainDS.searchQBE();
      }
      foundValue = domainDS.items.map(item => item.value).includes(fupValue);
      domainDS.reset(domainDS.baseQuery, false);
      domainDS.initializeQbe();
    }
    if (!foundValue) {
      this.page.state.invalidFupDomainValue = true;
    }
    return foundValue;
  }



  getFupDomainErrorMsg() {
    return this.app.getLocalizedMessage(this.app.name, 'invalidFupDomainValue', 'Value could not be found in domain.');
  }



  /**
   * Function to select contact person
   */
   async selectPerson(event) {
    let srDS = this.app.findDatasource("srDS");
    this.page.state.contactdetail = (event.displayname)? event.displayname : event.personid;
    srDS.item["affectedpersonid"] = event.personid;
    srDS.item["affectedperson"] = event.personid;
    srDS.item["affectedusername"] = this.page.state.contactdetail;
    srDS.item["affectedphone"] = event.primaryphone;
    srDS.item["affectedemail"] = event.primaryemail;
    this.loadHub();

  }



  /**
   * Function to select a location
   */
   async selectLocation(item) {
    let srDS = this.app.findDatasource("srDS");
    srDS.item.location = item.location;
    srDS.item.assetsiteid = item.siteid ? item.siteid : this.page.state.siteid ;
    srDS.item.assetorgid = item.orgid ? item.orgid : this.page.state.orgid ;	   
    this.page.state.location = item.location;
    this.page.state.locationdesc = item.description;
    this.checkAssetMismatch(item.location);
    this.page.state.splitViewIndex = 4;
    this.loadHub();
  }

  async checkAssetMismatch(location) {
    let assetnum = this.page.state.assetnum;
    let assetLookupDS = this.page.datasources['assetLookupDS'];
    assetLookupDS.initializeQbe();
    // istanbul ignore next
    if (assetnum) {
      assetLookupDS.setQBE('assetnum', '=', assetnum);
      await assetLookupDS.searchQBE();
      let assetLocation = assetLookupDS.item.location;
      assetLookupDS.clearSelections();
      assetLookupDS.clearState();
      if (location !== assetLocation) {
        this.page.state.dialogBMXMessage = this.app.getLocalizedMessage(
          this.app.name, 
          "locationAssetMismatch",
          "The location you entered does not contain the current asset. Would you like to update the asset with the asset that resides in this location?"
        );
        this.page.showDialog("sysMsgAssetMismatchDialog");
        this.page.state.assetlocationmismatch = true;
      }
    }else{
      assetLookupDS.setQBE('location', '=', this.page.state.location);
      await assetLookupDS.searchQBE();
      if (assetLookupDS.items.length === 1) {
        let item = assetLookupDS.items[0];
        this.page.state.assetnum = item.assetnum;
        this.page.state.assetdesc = item.description;
        let srDS = this.app.findDatasource("srDS");
        srDS.item.assetnum = item.assetnum;
        srDS.item.assetsiteid = item.siteid ? item.siteid : this.page.state.siteid ;
        srDS.item.assetorgid = item.orgid ? item.orgid : this.page.state.orgid ;
        this.loadHub();
      }
    }
  }



  // istanbul ignore next
  async replaceMismatchedAsset() {
    let csyn = this.page.findDialog("sysMsgAssetMismatchDialog");
    if(csyn) {
      csyn.closeDialog();
    }
    let assetLookupDS = this.page.datasources['assetLookupDS'];
    assetLookupDS.initializeQbe();
    assetLookupDS.setQBE('location', '=', this.page.state.location);
    await assetLookupDS.searchQBE();
    let srDS = this.app.findDatasource("srDS");
    srDS.item.assetnum='';
    srDS.item.assetsiteid=''; 
    srDS.item.assetorgid='';
    this.page.state.assetnum = '';
    this.page.state.assetdesc = '';
    if (assetLookupDS.items.length === 1) {
      let item = assetLookupDS.items[0];
      this.page.state.assetnum = item.assetnum;
      this.page.state.assetdesc = item.description;
      srDS.item.assetnum = item.assetnum;
      srDS.item.assetsiteid = item.siteid ? item.siteid : this.page.state.siteid ;
      srDS.item.assetorgid = item.orgid ? item.orgid : this.page.state.orgid ;
    }
    assetLookupDS.clearSelections();
    assetLookupDS.clearState();
    this.page.state.splitViewIndex=4;
    this.loadHub();
  }



  // istanbul ignore next
  async handleLocationScan(event) {
    let found = false;
    let scannedValue = event.value;
    if (scannedValue) {
      scannedValue = scannedValue.trim().toUpperCase();
    } else {
      scannedValue = "";
    }
    let locationDS = this.page.datasources['locationLookupDS'];
    locationDS.initializeQbe();
    locationDS.setQBE('location', '=', scannedValue);
    await locationDS.searchQBE();
    for (let i = 0; i < locationDS.items.length; i++) {
      let item = locationDS.items[i];
      if(item.location === scannedValue) {
        found = true;
				this.selectLocation(item);
        break;
			}
    }
    if (!found) {
      let label = this.app.getLocalizedMessage(this.app.name, 'search_noSuggest', 'No results found');
      this.app.toast(label, 'error');
      //Even if no result is found we set the value anyway so user can decide what to do with what was read
      this.app.findDatasource("srDS").item.location = scannedValue; 
    }
    locationDS.resetState();
    await locationDS.searchQBE();
  }



  /**
   * Function to select an asset
   */
   async selectAsset(item) {
    let srDS = this.app.findDatasource("srDS");
    srDS.item.assetnum = item.assetnum;
    srDS.item.assetsiteid = item.siteid ? item.siteid : this.page.state.siteid ;
    // istanbul ignore next
    srDS.item.assetorgid = item.orgid ? item.orgid : this.page.state.orgid ;
    this.page.state.assetnum = item.assetnum;
    this.page.state.assetdesc = item.description;
    // istanbul ignore next
    if (this.page.state.location) {
      this.page.state.assetLocation = item.location;
      this.page.state.assetLocationDesc = item.locationdesc;
      this.checkLocationMismatch(item.location);
    } else {
      this.page.state.location = item.location;
      this.page.state.locationdesc = item.locationdesc;
      srDS.item.location = item.location;
      srDS.item.siteid = item.siteid;
      this.resetAssetQbe();
    }
    this.page.state.splitViewIndex = 5;
    this.loadHub();
  }



  async enableAssetEdit(isEnabled) {
    this.page.state.isAssetEditEnabled = isEnabled;
    if (!isEnabled) { //Upon click erase button
      this.app.findDatasource("srDS").item.assetnum = "";
      this.resetAsset();
      this.loadHub();
    }
  }



  /**
   * Function to switch to next split-view page
   */
   async nextSplitViewPage(item) {
    let srListDS = this.page.datasources["SRListds"];
    let nextIndex = Number(this.page.state.splitViewIndex) + 1;
    // istanbul ignore if
    if (srListDS) {
      let itemsLength = (srListDS.dataAdapter.src)? srListDS.dataAdapter.src.items.length : srListDS.dataAdapter.items.length ;
      if (itemsLength > 0 && itemsLength < nextIndex) {
        nextIndex = 0;
      }
	  }
    this.page.state.splitViewIndex = nextIndex;
    this.loadHub();
  }

  /**
   * Function to switch to previous split-view page
   */
   async prevSplitViewPage(item) {
    this.page.state.splitViewIndex = Number(this.page.state.splitViewIndex) - 1;
    this.loadHub();
  }

  
  checkLocationMismatch(assetLocation) {
    let currentLocation = this.page.state.location;
    // istanbul ignore else
    if (currentLocation && assetLocation) {
      // istanbul ignore else
      if (currentLocation !== assetLocation) {
        this.page.state.dialogBMXMessage = this.app.getLocalizedMessage(
          this.app.name, 
          "assetLocationMismatch",
          "The asset you selected does not reside in the current location. Would you like to update the location to the asset’s location?"
        );
        this.page.showDialog("sysMsgLocationMismatchDialog");
        this.page.state.assetlocationmismatch = true;
      }
    }
  }

  // istanbul ignore next
  async replaceMismatchedLocation() {
    let csyn = this.page.findDialog("sysMsgLocationMismatchDialog");
    if(csyn) {
      csyn.closeDialog();
    }
    this.page.state.location = this.page.state.assetLocation;
    this.page.state.locationdesc = this.page.state.assetLocationDesc;
    this.app.findDatasource("srDS").item.location = this.page.state.assetLocation;
    this.page.state.splitViewIndex=3;
    this.loadHub();
  }

  // istanbul ignore next
  async handleAssetScan(event) {
    let found = false;
    let scannedValue = event.value;
    if (scannedValue) {
      scannedValue = scannedValue.trim().toUpperCase();
    } else {
      scannedValue = "";
    }
    let assetDS = this.page.datasources['assetLookupDS'];
    assetDS.initializeQbe();
    assetDS.setQBE('assetnum', '=', scannedValue);
    await assetDS.searchQBE();
    for (let i = 0; i < assetDS.items.length; i++) {
      let item = assetDS.items[i];
      if(item.assetnum === scannedValue) {
        found = true;
				this.selectAsset(item);
        break;
			}
    }
    if (!found) {
      let label = this.app.getLocalizedMessage(this.app.name, 'assetNotFound', 'Asset not found');
      if (this.app.state.isMobileContainer) {
        this.app.toast(label, 'info');
        this.page.state.isAssetEditEnabled = true;
      } else {
        this.app.toast(label, 'error');
      }
      
      //Even if no result is found we set the value anyway so user can decide what to do with what was read
      this.app.findDatasource("srDS").item.assetnum = scannedValue; 
      this.page.state.assetnum = scannedValue;
    }
    assetDS.resetState();
    await assetDS.searchQBE();
  }
  


  async openPrevPage() {
    // Make sure that the dialog will be displayed
    this.page.state.useConfirmDialog = true;
    this.app.state.isback = true;

    if (this.page.params.editTrans) {
      this.app.setCurrentPage({name: 'main'});
    } else if(this.app.state.pagelist.length>0 || this.app.state.valuesaved){ 
      // istanbul ignore else
      if(!this.app.state.valuesaved) {
        popcurrentitem = this.app.state.pagelist.slice().reverse()[0];
      }
      let currentitem = popcurrentitem;
      // istanbul ignore else
      if(currentitem){
        this.app.state.backPageName = currentitem.pagename;
        this.app.state.isFromDescribleReq = currentitem.isFromDescribleReq;
        if (this.app.state.backPageName === 'SubCategory'){
          this.app.state.selectedSubCategory=currentitem.id;
          this.app.state.subcategory=currentitem.description;
          this.app.state.currSubCategoryID=currentitem.currID;
          this.app.state.currSubCategoryDesc=currentitem.currDesc;
          //Back to Subcategory Page from CreateSR page
          this.app.setCurrentPage({name: this.app.state.backPageName});
        } else if (this.app.state.backPageName === 'tktemp'){
          this.app.state.templateid=currentitem.id;
          //Back to Ticket Template Page from CreateSR page
          this.app.setCurrentPage({name: this.app.state.backPageName,params:{lastcategorydesc:currentitem.description}});
        } else {
          //Go from CreateSR page back to the previous page
          this.app.setCurrentPage({name: this.app.state.backPageName});
          this.page.state.navigateBack = true;
        } 
      }
    } else {
      //Go back to the previous page
      this.app.setCurrentPage({name: 'newRequest'});
      this.page.state.navigateBack = true;
    }
  }



  // eslint-disable-next-line
  async pageResumed(page) { 
    await this.app.state.sysProp.filterSite; //Unit test fails if we remove this
    this.app.state.pageLoading = true;
    this.page.state.lastcategorydesc = this.page.params.lastcategorydesc ?? this.app.datasources.subcategoryds?.item?.classificationid;
    this.page.state.splitViewIndex = 0;

    const srDS = this.app.findDatasource("srDS");
    this.retrieveRequiredStates(srDS.getSchema());
	
    if(page.params.href) {
      await srDS.forceReload();
      await srDS.load({ noCache: true, itemUrl: this.page.params.href });
      const attachmentDS = this.app.findDatasource("attachmentDS");
      await attachmentDS.clearState();
      await attachmentDS.load({ noCache: true, src: srDS.item?.doclinks?.member })
      this.page.state.doclinksCount = attachmentDS.items.length;
      this.page.state.srdescription = srDS.item['description_longdescription'];
      this.page.state.location = srDS.item['location'];
      this.page.state.assetnum = srDS.item['assetnum'];
      this.page.state.locationdesc = await this.retrieveLookupDescription("locationdesc");
      this.page.state.assetdesc = await this.retrieveLookupDescription("assetdesc");
      this.page.state.contactdetail = await this.retrieveLookupDescription("contactdetail");
      this.page.state.formattedaddress = srDS.item.formattedaddress;
      this.page.state.streetaddress = srDS.item.streetaddress;
      this.page.state.city = srDS.item.city;
      this.page.state.stateprovince = srDS.item.stateprovince;
      if (srDS.currentItem?.ticketspec) {
        let newTicketSpecJDS = this.page.datasources['newTicketSpecJDS'];
        await newTicketSpecJDS.load({ src: srDS.currentItem.ticketspec });
      }
      this.page.state.ishighpriority = (srDS.item["reportedpriority"] === this.app.state.sysProp.highPriority);
      await this.fillInstructionsInfo(srDS.item["templateid"]);
      this.loadHub();
      this.app.state.pageLoading = false;
      this.resetLocationQbe();
      this.resetAssetQbe();
      srDS.item['affectedusername'] = this.page.state.contactdetail;
      return;
    }
  
    await this.addNewServiceRequest();
    this.loadHub();
    this.page.state.valuesavedOnPageResumed = this.app.state.valuesaved;
    this.app.state.valuesaved = false;
    this.page.state.canLoad.locationJsonMap = false;
    this.page.state.canLoad.locationMap = false;
    this.page.state.canLoad.assetJsonMap = false;
    this.page.state.canLoad.assetMap = false;
    this.page.state.useConfirmDialog = true; //Confirm dialog will be displayed if user tries to leave app
  }

  async pagePaused() {
    this.resetPageDatasources();
  }

  async gotoview(event) {
    let index = Number(event.viewindex);
    // istanbul ignore next
    if (!this.app.client.fakeClient)
      this.page.datasources.SRListds.setSelected(event.viewindex - 1, true);
    return this.page.state.splitViewIndex=index;
  } 

  async gotoviewBtn(viewindex) {
    let index = Number(viewindex);
    // istanbul ignore next
    if (!this.app.client.fakeClient)
      this.page.datasources.SRListds.setSelected(viewindex - 1, true);
    return this.page.state.splitViewIndex=index;
  }

  async clearvalue(item) {
    item.value="";
    // istanbul ignore else
    if(item.viewindex === '3'){
      this.page.state.location="";
      this.page.state.locationdesc="";
      this.app.findDatasource("srDS").item["location"]="";
      let locationDS = this.page.datasources["locationLookupDS"];
      // istanbul ignore next
      if (locationDS) {
        locationDS.resetState();
        locationDS.clearState();
        await this.drillInLocation();
        locationDS.forceReload();
      }
      this.resetMapQbe("locationMapDS");
    } 
    // istanbul ignore else
    if(item.viewindex === '4'){
      this.page.state.assetnum="";
      this.page.state.assetdesc="";
      this.app.findDatasource("srDS").item["assetnum"]="";
      let assetDS = this.page.datasources["assetLookupDS"];
      // istanbul ignore next
      if (assetDS) {
        assetDS.resetState();
        assetDS.clearState();
        assetDS.forceReload();
      }
      this.resetMapQbe("assetMapDS");
      this.page.state.isAssetEditEnabled = false;
    }
    this.resetAssetQbe();
    // istanbul ignore next
    if(item.viewindex === '5'){
      this.page.state.latitudey="";
      this.page.state.longitudex="";
      this.page.state.formattedaddress="";
      this.page.state.streetaddress="";
      this.page.state.city="";
      this.page.state.stateprovince="";
    }
    this.loadHub();
  }

  // istanbul ignore next
  async resetMapQbe(dsName) {
    if (this.app.state.isMapValid) {
      let ds = this.page.datasources[dsName];
      ds.resetState();
      ds.clearState();
      ds.forceReload();
    }
    
  }

  async splitViewChanged() {
    this.page.state.splitViewIndex = 0;
  }



  async addNewServiceRequest() {
    // Resets invalid states for asset and location
    this.page.state.hasInvalidAsset = false;
    this.page.state.hasInvalidLocation = false;
    // We do not want false confirmation dialogs when add a new SR
    this.page.state.useConfirmDialog = false;
    // Reset the description unless the value was saved
    // istanbul ignore else
    if (!this.app.state.valuesaved) {
		  // Resets the state variable.
		  this.app.state.attachCount = 0; 
    	this.page.state.srdescription = "";
		  // Resets High Priority using default false value.
		  this.page.state.ishighpriority = false;
      // Resets service address
      this.page.state.formattedaddress = "";
      this.page.state.streetaddress = "";
      this.page.state.city = "";
      this.page.state.stateprovince = "";
      this.page.state.latitudey = "";
      this.page.state.longitudex = "";
      // Resets editability state of asset
      this.page.state.isAssetEditEnabled = false;
	  }
    let newTicketSpecJDS = this.page.datasources['newTicketSpecJDS'];
    let personDS = this.page.datasources['personDS'];

    
    if (this.app.client && this.app.client.userInfo && personDS) {
      
      let loctoservreq;

      await personDS.initializeQbe();
      personDS.setQBE("personid", "=", this.app.client.userInfo.personid);
      let currentUserArr = await personDS.searchQBE();

      // istanbul ignore next
      if (currentUserArr.length > 0) {
        loctoservreq = currentUserArr[0].loctoservreq;
      }
      
      // istanbul ignore else
      if (!this.app.state.valuesaved) {
        // Resets contact to the current user
        this.page.state.contactdetail = (this.app.client.userInfo.displayname)? this.app.client.userInfo.displayname : this.app.client.userInfo.personid;
      }

      // istanbul ignore else
      if (this.app.client.userInfo.location && !this.app.state.valuesaved) {
        // Resets Location and Asset Value.
		    // istanbul ignore else
        if (loctoservreq !== false) {
          this.page.state.location = this.app.client.userInfo.location.location;
          this.page.state.locationdesc = this.app.client.userInfo.location.description;
        } else {
          this.page.state.location = '';
          this.page.state.locationdesc = '';
        }
      }
      
      personDS.clearState();
      personDS.resetState();
    }
    this.resetLocationQbe();
    this.resetAsset();
        
    let srDS = this.app.findDatasource("srDS");

    // Register srDS to createSR page
    if (!this.page.getDatasource("srDS"))
      this.page.registerDatasource(srDS);

    // For some reason if forceReload or getSchema happens here for UT, it breaks the srListDS
    // istanbul ignore next
    if (!this.app.client.fakeClient) {
      // This avoids update_on_createuri error and
      // ensures the datasource is empty before add a SR
      await srDS.forceReload();
      srDS.clearState();
    }
    
    // Call the api method to create the SR and any dependent objects such 
    // as ticketspec based on the selected template
    let templateid = this.page.params.templateid;
    // istanbul ignore else
    if (!templateid){
      templateid = '';
      newTicketSpecJDS.clearState();
      newTicketSpecJDS.resetState();
      newTicketSpecJDS.lastQuery = {};
    }

    srDS.options.selectedRecordHref = '';
	  
    await srDS.addNew({selectedRecordHref:"", interactive: false});

    this.retrieveRequiredStates(null, srDS.item);
	  
    //istanbul ignore if
    if(!srDS.item["status"]) {
      srDS.item["status"] = await this.app.state.synonym.newSRStatus.value;
    }
    //istanbul ignore if
    if(!srDS.item["class"]) {
      srDS.item["class"] = await this.app.state.synonym.srClass.value;
    }
		if(this.page.state.srdescription) {
			srDS.item["description_longdescription"] = this.page.state.srdescription;
		}
		if(this.page.state.location) {
			srDS.item["location"] = this.page.state.location;
		}
		if(this.page.state.formattedaddress) {
			srDS.item["formattedaddress"] = this.page.state.formattedaddress;
		}
		if(this.page.state.streetaddress) {
			srDS.item["streetaddress"] = this.page.state.streetaddress;
		}
		if(this.page.state.city) {
			srDS.item["city"] = this.page.state.city;
		}
		if(this.page.state.stateprovince) {
			srDS.item["stateprovince"] = this.page.state.stateprovince;
		}
    if(this.page.state.latitudey) {
			srDS.item["latitudey"] = this.page.state.latitudey;
		}
    if(this.page.state.longitudex) {
			srDS.item["longitudex"] = this.page.state.longitudex;
		}
      if (this.app.client && this.app.client.userInfo) {
        if (this.app.state.valuesaved) {
          srDS.item["reportedby"] = this.page.state.contactdetails.reportedbyid;
          srDS.item["reportedbyid"] = this.page.state.contactdetails.reportedbyid;
          srDS.item["reportedbyname"] = this.page.state.contactdetails.reportedbyname;
          srDS.item["reportedphone"] = this.page.state.contactdetails.reportedphone;
          srDS.item["reportedemail"] = this.page.state.contactdetails.reportedemail;
          srDS.item["affectedpersonid"] = this.page.state.contactdetails.affectedpersonid;
          srDS.item["affectedperson"] = this.page.state.contactdetails.affectedperson;
          srDS.item["affectedusername"] = this.page.state.contactdetails.affectedusername;
          srDS.item["affectedphone"] = this.page.state.contactdetails.affectedphone;
          srDS.item["affectedemail"] = this.page.state.contactdetails.affectedemail;
        } else {
          srDS.item["reportedby"] = this.app.client.userInfo.personid;
          srDS.item["reportedbyid"] = this.app.client.userInfo.personid;
          srDS.item["reportedbyname"] = this.app.client.userInfo.displayname;
          srDS.item["reportedphone"] = this.app.client.userInfo.primaryphone;
          srDS.item["reportedemail"] = this.app.client.userInfo.primaryemail;
          srDS.item["affectedpersonid"] = this.app.client.userInfo.personid;
          srDS.item["affectedperson"] = this.app.client.userInfo.personid;
          srDS.item["affectedusername"] = (this.app.client.userInfo.displayname)? this.app.client.userInfo.displayname : this.app.client.userInfo.personid;
          srDS.item["affectedphone"] = this.app.client.userInfo.primaryphone;
          srDS.item["affectedemail"] = this.app.client.userInfo.primaryemail;
        }
        //istanbul ignore next - Following IF content does not work in UT
        if (!this.app.client.fakeClient) {
          srDS.item["reportdate"] = this.app.dataFormatter.convertDatetoISO(new Date());;
        }
      }
      if (templateid){
        srDS.item["templateid"] = templateid;
        /**Try to change the way of how to get followup questions */
        this.app.state.canLoad.tktemplate = true;
        let mobiledstkspec= this.app.findDatasource("tktempds");
        mobiledstkspec.clearState();
        mobiledstkspec.resetState();
        mobiledstkspec.lastQuery = {};
        await mobiledstkspec.initializeQbe();
        mobiledstkspec.setQBE('templateid', '=', templateid);      
        await mobiledstkspec.searchQBE();
        let newSRC = mobiledstkspec.item.tktemplatespec;
        this.app.state.canLoad.tktemplate = false;
        this.page.state.classstructureid = mobiledstkspec.item.classstructureid;
        srDS.item["classstructureid"] = this.page.state.classstructureid;
        //handle ticket tech spec save
        //istanbul ignore next
        if (newSRC){
          for(let i=0; i < mobiledstkspec.item.tktemplatespec.length; i++){      
            newSRC[i].ticketid= srDS.item.ticketid;
            delete newSRC[i].refobjectid; // newSRC[i].refobjectid = srDS.item.ticketuid;
            newSRC[i].refobjectname = 'SR';  
            newSRC[i].ticketspecid = newSRC[i].tktemplatespecid;
            }
            srDS.item.ticketspec = newSRC;
        }  
        // istanbul ignore next
        if (!newSRC){
          newSRC = {};
        }
        //Bind the created ticketspec to a json datasource to display them on the UI 
        //for the user to enter their input    
        // istanbul ignore else
        if (newTicketSpecJDS) {
          newTicketSpecJDS.clearState();
          newTicketSpecJDS.resetState();
          newTicketSpecJDS.lastQuery = {};
          // istanbul ignore else
          if (newTicketSpecJDS && newTicketSpecJDS.dataAdapter) {
            // istanbul ignore else
            if (newTicketSpecJDS.dataAdapter.src) {
              newTicketSpecJDS.dataAdapter.src = newSRC;
            }
            // istanbul ignore else
            if (newTicketSpecJDS.dataAdapter.jsonResponse) {
              newTicketSpecJDS.dataAdapter.jsonResponse = newSRC;
            }
          }
          this.page.state.newTicketSpecSRC = newSRC;
          await newTicketSpecJDS.load({src: newSRC});
          // istanbul ignore else
          if(newTicketSpecJDS.state.itemCount){
            newTicketSpecJDS.getItems().forEach(item => {
              // istanbul ignore else 
              if(item.mandatory){
                this.page.state.detailrequiredState = true;
              }
            });
          }
        }
      } else {
		  if(this.app.state.selectedSubCategory) {
			srDS.item["classstructureid"] = this.app.state.selectedSubCategory;
		  }
	  }

      // This is to make sure that Submit is disabled if description is required
      srDS.item["description"] = "";
      //istanbul ignore next
      if (!srDS.item["description_longdescription"]) {
        srDS.item["description_longdescription"] = "";
      }

      // istanbul ignore next
      if(this.app.state.selectedtkt) {
        // by default, populate description with the category summary
        srDS.item["description"] = this.app.state.selectedtkt;
      }
      // istanbul ignore next
      if(this.app.state.subcategory){
        srDS.item["description"] = this.app.state.subcategory;
      } else if (this.app.state.topcategorydesc) {
        srDS.item["description"] = this.app.state.topcategorydesc;
      }
      let tktemp = await this.fillInstructionsInfo(templateid);
      if (tktemp) {
        //istanbul ignore else
        if (tktemp.description) {
          srDS.item["description"] = tktemp.description;
        } else if (tktemp.templateid) {
          srDS.item["description"] = tktemp.templateid;
        }
        //If ticket template has orgid, we need to set in SR to be able to apply the template
        //istanbul ignore next
        if (tktemp.orgid) {
          //We already filtered the templates by orgid, so it is the same as the one from user
          srDS.item["orgid"] = this.page.state.orgid;
          srDS.item["siteid"] = this.page.state.siteid;
        }
      }

    srDS.validateAll();
    this.app.state.pageLoading = false;
  }



  async fillInstructionsInfo(templateid) {
    this.app.state.canLoad.tktemplate = true;
    let tktempds = this.app.findDatasource("tktempds");
    await tktempds.initializeQbe();
    tktempds.setQBE('templateid', '=', (templateid)? templateid : "null");
    await tktempds.searchQBE();
    this.app.state.canLoad.tktemplate = false;
    return tktempds.items[0];
  }



  // For custom primary save button
  async onCustomSaveTransition(event) {
    if (this.page.params.editTrans) {
      await this.preparePersonInfoForSave();
      this.callDefaultSave = true;
    } else {
      let srDS = this.app.findDatasource("srDS");
      this.page.state.srdescription = srDS.item['description_longdescription'];
      this.page.state.location = srDS.item['location'];
      //istanbul ignore else
      if (!this.page.state.valuesavedOnPageResumed) {
        this.page.state.assetnum = srDS.item['assetnum'];
      }
	    this.page.state.contactdetail = srDS.item['affectedusername'];
      this.page.state.formattedaddress = srDS.item['formattedaddress'];
      this.page.state.streetaddress = srDS.item['streetaddress'];
      this.page.state.city = srDS.item['city'];
      this.page.state.stateprovince = srDS.item['stateprovince'];
      // istanbul ignore else
      if (srDS.item['latitudey']) {
        this.page.state.latitudey = srDS.item['latitudey'];
        this.page.state.longitudex = srDS.item['longitudex'];
      }
      this.page.state.contactdetails = {
        reportedbyid: srDS.item['reportedbyid'],
        reportedbyname: srDS.item['reportedbyname'],
        reportedphone: srDS.item['reportedphone'],
        reportedemail: srDS.item['reportedemail'],
        affectedpersonid: srDS.item['affectedpersonid'],
        affectedperson: srDS.item['affectedperson'],
        affectedusername: srDS.item['affectedusername'],
        affectedphone: srDS.item['affectedphone'],
        affectedemail: srDS.item['affectedemail']
      }
      this.callDefaultSave = false;
      this.app.state.valuesaved = true;
    }
    this.saveDataSuccessful = true;
    return {saveDataSuccessful: this.saveDataSuccessful, callDefaultSave: this.callDefaultSave};
  }

  async createServiceRequest(evt) {
    this.app.state.pageLoading = true;
    let canSubmit = true;
    let srCreateResource = this.app.findDatasource("srDS");
    let newTicketSpecJDS = this.page.datasources['newTicketSpecJDS'];
    let stateProvinceList = this.app.datasources['stateProvinceList'];
    this.page.state.invalidFupDomainValue = false;

    //Validate required fields
    const srFields = [
      "description", 
      "description_longdescription", 
      "affectedperson", 
      "affectedemail", 
      "affectedphone", 
      "location", 
      "assetnum",
      "formattedaddress",
      "streetaddress",
      "city",
      "stateprovince"
    ]
    for (const srField of srFields) {
      if (this.page.state.isRequired[srField] && !srCreateResource.item[srField]) {
        canSubmit = false;
        break;
      }
    }
    
    //Validate ticket specs fields
    if (canSubmit && newTicketSpecJDS.state.itemCount && !this.page.params?.editTrans) {
      for (const item of newTicketSpecJDS.getItems()) {
        if(item.mandatory){
          if(item["assetattributedatatype_maxvalue"]==='ALN' && !item["alnvalue"]){
            canSubmit=false;
          }
          if(item["assetattributedatatype_maxvalue"]==='NUMERIC' && Number.isNaN(Number.parseFloat(item["numvalue"]))){
            canSubmit=false;
          }
          if(item["assetattributedatatype_maxvalue"]==='DATE' && !item["datevalue"]){
            canSubmit=false;
          }
          if(item["assetattributedatatype_maxvalue"]==='MAXTABLE' && !item["tablevalue"]){
            canSubmit=false;
          }
        }
        if (canSubmit && item.assetattributedomainid) {
          switch (item.assetattributedatatype_maxvalue) {
            case "ALN":
              canSubmit = !item["alnvalue"] || await this.foundFupValueInDomain("alndomainValidationDS", item.assetattributedomainid, item.alnvalue);
              break;
            case "NUMERIC":
              canSubmit = Number.isNaN(Number.parseFloat(item["numvalue"])) || await this.foundFupValueInDomain("numericDomainValidationDS", item.assetattributedomainid, item.numvalue);
              break;
            case "MAXTABLE":
              //Validation for table domain is disabled OOTB
              // canSubmit = !item["tablevalue"] || await this.foundFupValueInDomain("tableDomainDS", item.assetattributedomainid, item.tablevalue);
              break;
          }
        }
      }
    }

    //Validate StateProvince field
    let spFound = false;
    if (canSubmit) {
      if(stateProvinceList && srCreateResource.item["stateprovince"]){
        await stateProvinceList.load();

        if(this.page.state.stateprovince !== srCreateResource.item["stateprovince"]) {
          await this.validateStateProvince(srCreateResource.item["stateprovince"]);
        }

        stateProvinceList.getItems().forEach(item => {
          // istanbul ignore next 			
          if(item["value"]===srCreateResource.item["stateprovince"].toUpperCase())	{
            spFound=true;
            return true;
          }
        });
        canSubmit = spFound;
      }
    }
	  
    //Validate asset and location
    if (canSubmit) {
      if(!this.page.state.hasInvalidLocation) {
        await this.setInvalidState(false); //isAsset = false
      }
      if(!this.page.state.hasInvalidAsset) {
        await this.setInvalidState(true); //isAsset = true
      }
      if(this.page.state.hasInvalidLocation||this.page.state.hasInvalidAsset) {
        canSubmit=false;
      }
    }
    
    if(!canSubmit){
      this.app.state.pageLoading = false;
	    let invalidStateProvince = (srCreateResource.item["stateprovince"] && !spFound);
      if (this.page.state.hasInvalidLocation||this.page.state.hasInvalidAsset||invalidStateProvince) {
        if (this.page.state.hasInvalidLocation) {
          let label = this.app.getLocalizedMessage(this.app.name, "invalidLocation", "The location selected is invalid. Please review.");
          this.app.toast(label, "error");
        }
        // istanbul ignore else
        if (this.page.state.hasInvalidAsset) {
              let label = this.app.getLocalizedMessage(this.app.name, "invalidAsset", "The asset selected is invalid. Please review.");
              this.app.toast(label, "error");
          }
        if(invalidStateProvince) {
              let label = this.app.getLocalizedMessage(this.app.name, "invalidStateProvince", "The state/province selected is invalid. Please review.");
              this.app.toast(label, "error");
        }
      } else {
        this.page.showDialog('cannotSubmit');
      }
    }else{
	    this.createServiceRequestSubmit(true);
    }
  }



  async createServiceRequestSubmit(doSubmit){
  // istanbul ignore else
	if(doSubmit) {
    let srCreateResource = this.app.findDatasource("srDS");
    this.setTicketPriority();
    try {
      if(this.page.state.location) {
        srCreateResource.item["location"] = this.page.state.location;
      }
      if(this.page.state.assetnum) {
        srCreateResource.item["assetnum"] = this.page.state.assetnum;
      }
	  //istanbul ignore next
      if(this.page.state.formattedaddress) {
        srCreateResource.item["formattedaddress"] = this.page.state.formattedaddress;
      }
	  //istanbul ignore next
      if(this.page.state.streetaddress) {
        srCreateResource.item["streetaddress"] = this.page.state.streetaddress;
      }
	  //istanbul ignore next
      if(this.page.state.city) {
        srCreateResource.item["city"] = this.page.state.city;
      }
	  //istanbul ignore next
      if(this.page.state.stateprovince) {
        srCreateResource.item["stateprovince"] = this.page.state.stateprovince;
      }
	  //istanbul ignore next
      if(this.page.state.latitudey) {
        srCreateResource.item["latitudey"] = this.page.state.latitudey;
      }
	  //istanbul ignore next
      if(this.page.state.longitudex) {
        srCreateResource.item["longitudex"] = this.page.state.longitudex;
      }
      /**if asset and location mismatch, user choose to keep the mismatch, set interactive=0 to avoild maximo side throw error message to ask user confirm again. */
	    //istanbul ignore next
      if(this.page.state.assetlocationmismatch){
        srCreateResource.options.query.interactive = 0;
      }else{
        srCreateResource.options.query.interactive = 1;
      }

      await this.preparePersonInfoForSave();

      //DT197320 Error while creating an SR with location in Service Request
        // istanbul ignore next
        if(srCreateResource.item["location"] && srCreateResource.item["assetorgid"] === "" && srCreateResource.item["assetsiteid"] === ""){
          if(this.page.state.orgid && this.page.state.siteid){
            srCreateResource.item["assetorgid"] = this.page.state.orgid;
            srCreateResource.item["assetsiteid"] = this.page.state.siteid;
          }
        }
        //END OF DT

      // include Service Address information for saving SR
      srCreateResource.item.tkserviceaddress = {
        formattedaddress: this.page.state.formattedaddress,
        streetaddress: this.page.state.streetaddress,
        city: this.page.state.city,
        stateprovince: this.page.state.stateprovince,
        latitudey: this.page.state.latitudey,
        longitudex: this.page.state.longitudex,
        class: this.app.state.synonym.srClass.value,
      }

      this.page.state.noConfirm = true;
      this.page.state.useConfirmDialog = false;
      const isContainer = await this.app.state.isMobileContainer;

      //istanbul ignore next
      if(srCreateResource.item && srCreateResource.item.ticketspec && !this.page.params?.editTrans)
      {
        let newTicketSpecJDS = this.page.datasources['newTicketSpecJDS'];
        srCreateResource.item.ticketspec = newTicketSpecJDS.items;
        for (let i=0; i < srCreateResource.item.ticketspec.length; i++) {
          let ticketSpec = srCreateResource.item.ticketspec[i];
          let remFromTicketSpec = [
            'templateid',
            'tktemplatespecid',
            '_rowstamp'
          ];
          if (!isContainer) {
            remFromTicketSpec.push('href');
          }
          remFromTicketSpec.forEach(e => Reflect.deleteProperty(ticketSpec, e));       
        }

      }
     
      this.app.state.refreshActiveRequests = true;

      //remove site tag to prevent try insert site again
      // istanbul ignore if	    
      if (srCreateResource.item.site){
        delete srCreateResource.item.site;
      } 

      let response;
      try {
        response = await srCreateResource.save({interactive: false});
      } catch(error) {
        //istanbul ignore next
        log.t(TAG, error);
      } finally {
        //istanbul ignore if
        if (response && response.error) {
          this.app.toast(null, "error", response.error.message, 5000, false, false);
          return;
        }
      }

      //Response will now be the selected SR to be displayed in details page
      this.app.state.selectedSR = response.items[0];

      //When SR is created on device, these variables need to be manually set
      if (this.app.state.isMobileContainer) {
        this.app.state.selectedSR.status_description = this.app.state.synonym.newSRStatus.description;
        this.app.state.selectedSR.reportedpriority_description = this.app.state.numericDom.priorityDescriptionList[this.app.state.selectedSR.reportedpriority];
        this.app.state.selectedSR.computedSRDescription = this.app.state.selectedSR.description;
        this.app.state.selectedSR.computedSRStatusPriority = [
          {
            label: this.app.state.selectedSR.status_description,
            type: 'cool-gray'
          },
          {
            label: this.app.state.selectedSR.reportedpriority_description,
            type: 'dark-gray'
          }
        ];
        const worklogItems = await this.app.findDatasource("worklogDS").forceReload();
        this.app.state.selectedSR.computedWorklogCount = worklogItems.length;
        this.app.state.selectedSR.computedDoclinksCount = (srCreateResource.item.doclinks)? srCreateResource.item.doclinks.member.length : 0;
      } else {
        this.app.state.selectedSR.computedWorklogCount = 0;
        this.app.state.selectedSR.computedDoclinksCount = 0;
      }

      //Go to SR details page
      this.app.setCurrentPage({
        name: "srDetails",
        resetScroll: true,
        params: {
          doclinksCountOverridden: false
        }
      });

      //Display ticket created message
      let label = "";
      //istanbul ignore if (In tests we do not have a returned SR with ticketid in the save)
      if (this.app.state.selectedSR?.ticketid) {
        label = this.app.getLocalizedMessage(this.app.name, 'srCreated_msg', 'Request {0} submitted', [response.items[0].ticketid]);
      } else {
        label = this.app.getLocalizedMessage(this.app.name, 'srCreated_nonumber_msg', 'Request submitted');
      }
      this.app.toast(label, 'success');
    } catch (error) {
      // istanbul ignore next
      log.t(TAG, error);
    } finally {
      srCreateResource.off('save-data-failed', this.onSaveDataFailed);     
      this.page.state.noConfirm = false;
      this.page.state.useConfirmDialog = true;
      this.app.state.pageLoading = false;
    }

	}
  }



  async preparePersonInfoForSave() {
    let sr = this.app.findDatasource("srDS").item;
    if (!sr.reportedby) {
      sr.reportedby = sr.reportedbyid;
    }
    if (sr.affectedusername === "") {
      sr.affectedperson = "";
    } else {
      let personDS = this.app.findDatasource("personDS");
      await personDS.initializeQbe();
      personDS.setQBE("displayname", "=", sr.affectedusername);
      let personFound = await personDS.searchQBE();
      if (!personFound.length) {
        sr.affectedperson = sr.affectedusername;
      }
    }
    //These are all non-persistent, only used for UI or app logic
    delete sr.reportedbyname;
    delete sr.reportedbyid;
    delete sr.affectedusername;
    delete sr.affectedpersonid;
  }



  async resetPageDatasources() {
    const lookups = [
      "assetLookupDS", 
      "assetMapDS", 
      "assetJsonMapDS", 
      "locationLookupDS",
      "locationFilterDS", 
      "locationMapDS", 
      "locationHierarchyDS", 
      "locationJsonMapDS",
      "newTicketSpecJDS",
      "personDS"
    ];
    for (const lookup of lookups) {
      const ds = this.app.findDatasource(lookup);
      await ds.reset(ds.baseQuery, false);
      while(ds.dependentChildren.length > 0) {
        //istanbul ignore next (In unit test we do not have hanging children for datasource)
        ds.dependentChildren.pop();
      }
    }
  }



  setContactPersonHubInfo() {
    let sr = this.app.findDatasource("srDS").item;
    this.page.state.srdescription = sr.description_longdescription;
    this.page.state.contactdetail = sr.affectedusername;
    let srListds = this.page.findDatasource('SRListds');
    //istanbul ignore else
    if (srListds.dataAdapter.src) {
      srListds.dataAdapter.src.items[0].value=this.page.state.srdescription;
      srListds.dataAdapter.src.items[1].value=this.page.state.contactdetail;
    } else {
      srListds.dataAdapter.items[0].value=this.page.state.srdescription;
      srListds.dataAdapter.items[1].value=this.page.state.contactdetail;
    }
    this.loadHub();
  }



  onContactPersonChange(affectedusername) {
    if (affectedusername === "") {
      let sr = this.app.findDatasource("srDS").item;
      sr.affectedperson = "";
      sr.affectedpersonid = "";
    }
  }



  //istanbul ignore next
  async drillInLocation(item){
    let ds = this.page.datasources["locationHierarchyDS"];
    ds.initializeQbe();
    if (ds.lastQuery) {
      ds.lastQuery.searchText = ""; //Clear text search on-drill-in
    }
    if (this.app.state.isMobileContainer){
      if (item) {
        ds.setQBE("parent", "=", item.location);
        ds.setQBE("primarysystem", true);
        ds.setQBE("systemid", "=", item.systemid);
      } else {
        ds.setQBE("parent", "!=", "*");
        ds.setQBE("primarysystem", true);
      }  
    }else {
      if (item) {
        ds.setQBE("LOCHIERLOCONLY.parent", "=", item.location);
        ds.setQBE("LOCHIERLOCONLY.LOCSYSTEM.primarysystem", "=true");
      } else {
        ds.setQBE("LOCHIERLOCONLY.parent", "=", "null");
        ds.setQBE("LOCHIERLOCONLY.LOCSYSTEM.primarysystem", "=true");
      }
    }
    await ds.searchQBE();
  }
    

  async loadHub(){
    let srListds = this.page.datasources['SRListds'];
    this.page.state.isLoadingHub = true;
    await srListds.load({src: 'sr-attributes-list.js'});
    // istanbul ignore else
    if (srListds) {
      let attrMap = new Map();
      let conditionalAttrMap = new Map();

      conditionalAttrMap.set('Location', {
        closehide: !this.page.state.location
      });

      conditionalAttrMap.set('Asset', {
        closehide: !this.page.state.assetnum
      })

      conditionalAttrMap.set('ServiceAddress', {
        desc: ((this.page.state.latitudey && this.page.state.longitudex) ? this.page.state.latitudey + ' ' + this.page.state.longitudex : ''),
        closehide: !(this.page.state.formattedaddress || this.page.state.latitudey)
      });

      // istanbul ignore next
      for (let item of srListds.items) {
        // istanbul ignore else
        if (item.attrid !== 'Details' || (item.attrid === 'Details' && this.app.findDatasource("srDS"))) {
          attrMap.set(item.viewindex, {
            label: this.app.getLocalizedMessage(this.app.name, item.attrid, item.label),
            value: this.page.state[item.value],
            desc: this.page.state[item.desc] ?? conditionalAttrMap.get(item.attrid)?.desc,
            requiredstate: this.page.state[item.requiredstate],
            closehide: item.closehide ?? conditionalAttrMap.get(item.attrid).closehide,
            showvaluefield: item.showvaluefield,
            showbutton1field: item.showbutton1field,
            showdescfield: item.showdescfield,
            viewindex: item.viewindex
          });
        }
      }

      let newList = [];

      // istanbul ignore next
      for (let i = 1; i <= attrMap.size; i++) {
        newList.push(attrMap.get(`${i}`));
      }

      let newSRC = {items: newList};
      //let srListds = this.page.findDatasource('SRListds');
      srListds.clearState();
      srListds.resetState();
      srListds.lastQuery = {};
      srListds.dataAdapter.src = newSRC;
      srListds.load({src: newSRC}).then(() => {
        // istanbul ignore next
        if (!this.app.client.fakeClient && this.page.state.splitViewIndex > 0)
          this.page.datasources.SRListds.setSelected(this.page.state.splitViewIndex - 1, true);
      });
      this.page.state.canLoad.page = true;
      this.page.state.isLoadingHub = false;
    }
  }



   // Resets the asset value and asset query where clause.
   async resetAsset(){
    // istanbul ignore next
    if(!this.app.state.valuesaved){
      this.page.state.assetnum = "";
      this.page.state.assetdesc = "";
      this.page.state.assetlocationmismatch = false;
    }
    this.resetAssetQbe(); 
  }

  async resetAssetQbe(){
    let assetLookupDS = this.page.datasources["assetLookupDS"];
    assetLookupDS.clearState();
    assetLookupDS.resetState();
    assetLookupDS.lastQuery = {};
    assetLookupDS.state.currentSearch = "";
    await assetLookupDS.forceReload();
    if (this.page.state.location) {
      await assetLookupDS.initializeQbe();
      assetLookupDS.setQBE('location', '=', this.page.state.location);
      await assetLookupDS.searchQBE();
    }
  }



  // Resets the location query where clause
  async resetLocationQbe() {
    let locationHierarchyDS = this.page.datasources["locationHierarchyDS"];
    let locationLookupDS = this.page.datasources["locationLookupDS"];
    await locationHierarchyDS.initializeQbe();
    await locationLookupDS.initializeQbe();
    locationHierarchyDS.lastQuery = {};
    locationLookupDS.lastQuery = {};
    locationHierarchyDS.state.currentSearch = "";
    locationLookupDS.state.currentSearch = "";
  }



  /**
   * Used to open dialog for maps
   * @param {string} isForAsset If true, opens map dialog in asset select mode, otherwise opens for location select mode
   */
  openMapDialog(isForAsset) {
    this.initializeMap(isForAsset);
    // istanbul ignore if
    if (!this.app.state.networkConnected) {
      let mapUnavailableOfflineErrorMsg = this.app.getLocalizedMessage(this.app.name, "mapUnavailableOfflineError", "Maps can't be used while offline.");
      this.app.toast(mapUnavailableOfflineErrorMsg, "error");
      return;
    }
    this.page.state.mapIsForAsset = isForAsset;
    this.page.showDialog("mapDialog");

    setTimeout(() => {
      this.resizeMapDialog();
    }, 0);
  }



  //istanbul ignore next - This logic is used by Map component for UI purposes only
  resizeMapDialog() {
    const mapDiv = document.querySelector(".mx--map-mapDiv");
    if (!mapDiv) {
      return;
    }

    const mapDialog = mapDiv.closest('.bx--modal-container');
    if (!mapDialog) {
      return;
    }

    let height = mapDialog.clientHeight;
    const width = mapDialog.clientWidth;

    let headerHeight = 0;
    const mapDialogHeader = mapDialog.querySelector('.bx--modal-header');
    if (mapDialogHeader) {
      height -= mapDialogHeader.offsetHeight;
      headerHeight = mapDialogHeader.offsetHeight;
    }

    let footerHeight = 0;
    const mapDialogFooter = mapDialog.querySelector('.mx--dialog-footer');
    if (mapDialogFooter) {
      height -= mapDialogFooter.offsetHeight;
      footerHeight = mapDialogFooter.offsetHeight;
    }

    const mapDialogContent = mapDiv.closest('.mx--dialog-content');
    if (!mapDialogContent) {
      return;
    }

    const maxDialogContentHeight = window.innerHeight - headerHeight - footerHeight;
    const border = 1;
    const contentHeight = Math.min(height - border, maxDialogContentHeight);
    mapDialogContent.style.height = contentHeight + 'px';
    mapDialogContent.style.width = width + 'px';
    mapDialogContent.parentElement.style.borderBottom = `${border}px solid rgba(0, 0, 0, 0.16)`;

    const mapDialogContentBody = mapDialogContent.parentElement;
    mapDialogContentBody.style.height = contentHeight + 'px';
    mapDialogContentBody.style.padding = 0;
    mapDialogContentBody.style.overflow = 'hidden';

    const mapDialogContentWrapper = mapDialogContentBody.parentElement;
    mapDialogContentWrapper.style.height = (contentHeight + footerHeight) + 'px';
  }



  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  async onMapInitialized(map) {
    this.app.map = map;
    await this.loadLayerReferences();
    const extent = map.maximoMap.getCurrentMapExtent();
    if (extent) {
      if (this.page.state.mapIsForAsset) {
        this.loadAssetJsonForMap(extent);
      } else {
        this.loadLocationJsonForMap(extent);
      }
    }
  }



  async loadLayerReferences() {
    const retrievedAssetSpatialReference = await this.app.map.getLayerSpatialReference("ASSET");
    const retrievedLocationSpatialReference = await this.app.map.getLayerSpatialReference("LOCATION");
    const retrievedBasemapSpatialReference = await this.app.map.getBasemapSpatialReference();
    if (retrievedAssetSpatialReference) {
      this.page.state.spatialRefs.ASSET = retrievedAssetSpatialReference;
    }
    if (retrievedLocationSpatialReference) {
      this.page.state.spatialRefs.LOCATION = retrievedLocationSpatialReference;
    }
    if (retrievedBasemapSpatialReference) {
      this.page.state.spatialRefs.BASEMAP = retrievedBasemapSpatialReference;
    }
  }



  // istanbul ignore next
  async loadAssetJsonForMap(extent) {
    let assetMapDS = this.page.datasources["assetMapDS"];
    let assetMapList = [];
    for (const item of assetMapDS.getItems()) {
      if (item.autolocate && this.app.map) {
        if (this.page.state.location && this.page.state.location !== item.location) {
          continue;
        }
        let distanceCalculated = await this.calculateDistance(item);
        const geometry = this.app.map.parseGeometry(item.autolocate);
        const geometryCenter = this.app.map.getGeometryCenter(geometry);
        const coordinates = geometryCenter.getCoordinates();
        if (coordinates[1] > extent[1] && coordinates[1] < extent[3] && coordinates[0] > extent[0] && coordinates[0] < extent[2] ) {
          assetMapList.push({
            _id: item.assetuid,
            assetuid: item.assetuid,
            assetnum: item.assetnum,
            description: item.description,
            status_maxvalue: item.status_maxvalue,
            distance: distanceCalculated,
            autolocate: item.autolocate,
            location: item.location,
            locationdesc: item.locationdesc,
            latitudey: coordinates[1],
            longitudex: coordinates[0]
          })
        }
      }
    }
    this.page.state.canLoad.assetJsonMap = true;
    await this.page.datasources["assetJsonMapDS"].load({
      src: assetMapList,
      pageSize: mapsPageSize
    });
  }



  // istanbul ignore next
  async loadLocationJsonForMap(extent) {
    let locationMapDS = this.page.datasources["locationMapDS"];
    let locationMapList = [];
    for (const item of locationMapDS.getItems()) {
      if (item.autolocate && this.app.map) {
        const geometry = this.app.map.parseGeometry(item.autolocate);
        const geometryCenter = this.app.map.getGeometryCenter(geometry);
        const coordinates = geometryCenter.getCoordinates();
        if (coordinates[1] > extent[1] && coordinates[1] < extent[3] && coordinates[0] > extent[0] && coordinates[0] < extent[2] ) {
          let distanceCalculated = await this.calculateDistance(item);
          locationMapList.push({
            _id: item.locationsid,
            locationsid: item.locationsid,
            location: item.location,
            description: item.description,
            status_maxvalue: item.status_maxvalue,
            distance: distanceCalculated,
            autolocate: item.autolocate,
            latitudey: coordinates[1],
            longitudex: coordinates[0]
          });
        }
      }
    }
    this.page.state.canLoad.locationJsonMap = true;
    await this.page.datasources["locationJsonMapDS"].load({
      src: locationMapList,
      pageSize: mapsPageSize
    });
  }



    // istanbul ignore next
    async calculateDistance(item) {
      let distance = null;
      if (item.autolocate && this.app.map) {
  
        let geolocationState = this.app.geolocation.state;
        let userCoordinates = null;
        if (geolocationState && geolocationState.enabled && !geolocationState.hasError) {
          if (geolocationState.latitude === 0 && geolocationState.longitude === 0) {
            await this.app.geolocation.updateGeolocation();
          }
          userCoordinates = [geolocationState.longitude, geolocationState.latitude];
        }
        if (userCoordinates === null) {
          return null;
        }
  
        distance = this.app.map.getDistanceFromCoordsToGeometry(userCoordinates, item.autolocate);
      }
      return distance;
    }



  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  /**
   *
   * @param {*} layerName
   * @param {*} maxState
   */
  getHighLightSymbols(layerName, maxState) {
    let base64Symbol = null;
    if (
        this.memoizedSymbols[layerName] &&
        this.memoizedSymbols[layerName][maxState]
    ) {
        base64Symbol = this.memoizedSymbols[layerName][maxState];
    } else {
        const layerSymbols = symbols[layerName.toUpperCase()];
        const symbol = layerSymbols[maxState.toUpperCase()] || layerSymbols['OTHERS'];
        base64Symbol = Object.assign(
            {
                url:
                    'data:image/svg+xml;base64,' +
                    window.btoa(symbol.symbol),
                scale: 1
            },
            symbol.alignment
        );
        if (this.memoizedSymbols[layerName]) {
            this.memoizedSymbols[layerName][maxState] = base64Symbol;
        } else {
            this.memoizedSymbols[layerName] = {
                maxState: base64Symbol
            };
        }
    }
    return base64Symbol;
  }
  
  
  
// istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  async handleMapMove(mapInfo) {
    const dsName = (this.page.state.mapIsForAsset) ? "assetMapDS" : "locationMapDS";
    const ds = this.page.datasources[dsName];
    if (ds.lastQuery) {
      ds.lastQuery.searchText = "";
    }
    const coordinates = mapInfo.extent;
    let mapLayerName = (this.page.state.mapIsForAsset)? "ASSET" : "LOCATION";
    const extentBottomLeft =  this.app.map.convertCoordinates(
      [coordinates[0], coordinates[1]],
      this.page.state.spatialRefs.BASEMAP,
      this.page.state.spatialRefs[mapLayerName]
    );
    const extentUpperRight =  this.app.map.convertCoordinates(
      [coordinates[2], coordinates[3]],
      this.page.state.spatialRefs.BASEMAP,
      this.page.state.spatialRefs[mapLayerName]
    );
    const extent = [extentBottomLeft[0], extentBottomLeft[1], extentUpperRight[0], extentUpperRight[1]];
    if (this.page.state.mapIsForAsset) {
      this.loadAssetJsonForMap(extent);
    } else {
      this.loadLocationJsonForMap(extent);
    }
  }



  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  handleMapClick(item) {
    if (
        item.hasFeature &&
        item.featuresAndLayers &&
        item.featuresAndLayers.length > 0
    ) {
        const layerName = item.featuresAndLayers[0].layer.get('layerName');
        if (!layerName) {
            log.i('Layer name is empty.');
            return;
        }

        if (
            item.featuresAndLayers[0].feature.values_.features &&
            item.featuresAndLayers[0].feature.values_.features.length > 1
        ) {
            let featureCluster = item.featuresAndLayers[0].feature;
            const highlightSymbolCluster = this.getHighLightSymbols(
                layerName,
                'cluster'
            );
            const size =
                item.featuresAndLayers[0].feature.values_.features.length;
            const scale = 1 + 0.3 * Math.log(size);
            highlightSymbolCluster.scale = scale;
            let styleCluster = this.app.map.getNewStyle(
                highlightSymbolCluster
            );
            this.app.map.changeFeatureStyle(featureCluster, styleCluster, {
                layer: item.featuresAndLayers[0].layer
            });
            this.page.state.mapSelectDisabled=true; //Cannot set cluster as selection
            let label = this.app.getLocalizedMessage(this.app.name, 'mapClusterCannotBeSelected', 'A cluster is not a valid selection.');
            this.app.toast(label, 'error');
        } else {
            let feature = item.featuresAndLayers[0].feature;
            let maximoAttributes = feature.get('features')[0].get('maximoAttributes');
            const highlightSymbol = this.getHighLightSymbols(layerName, maximoAttributes.status_maxvalue);
            let style = this.app.map.getNewStyle(highlightSymbol);
            this.app.map.changeFeatureStyle(feature, style, {
                autoRestoreOnZoom: false,
                layer: item.featuresAndLayers[0].layer
            });
            this.page.state.mapValueSelected = maximoAttributes;
            this.page.state.mapSelectDisabled=false;
            this.selectItemInList(maximoAttributes);
        }
    } else {
        this.app.map.clearFeatureStyle();
        this.page.state.mapSelectDisabled=true;
    }
  }



  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  selectItemInList(maximoAttributes) {
    const itemId = maximoAttributes._id;
    const dsName = (this.page.state.mapIsForAsset)? "assetJsonMapDS" : "locationJsonMapDS";
    let jsonMapDS = this.page.datasources[dsName];
    for (const item of jsonMapDS.getItems()) {
      if (item._id === itemId) {
        jsonMapDS.clearSelections();
        jsonMapDS.setSelectedItem(item, true);
        break;
      }
    }
  }



  // istanbul ignore next
  // ignoring as for map openlayers cannot be emulated
  handleItemClick(item) {
    if (!item.autolocate || !this.app.map) {
      return;
    }

    this.app.map.clearFeatureStyle();

    let mapLayerName = (this.page.state.mapIsForAsset)? "ASSET" : "LOCATION";

    let itemGeometry = this.app.map.parseGeometry(item.autolocate);
    let center = this.app.map.getGeometryCenter(itemGeometry);
    let centerCoordinates = center.getCoordinates();
    if (this.page.state.spatialRefs[mapLayerName] !== this.page.state.spatialRefs.BASEMAP) {
        centerCoordinates = this.app.map.convertCoordinates(
            centerCoordinates,
            this.page.state.spatialRefs[mapLayerName],
            this.page.state.spatialRefs.BASEMAP
        );
    }

    let feature = this.app.map.getFeatureByGeo({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: centerCoordinates
      }
    }, 'geojson');

    if (
        feature &&
        feature.hasFeature &&
        feature.featuresAndLayers &&
        feature.featuresAndLayers.length > 0
    ) {
        let maximoAttributes = feature.featuresAndLayers[0].feature.get('maximoAttributes');

        const layerName = feature.featuresAndLayers[0].layer.get('layerName');
        const highlightSymbol = this.getHighLightSymbols(layerName, maximoAttributes.status_maxvalue);
        
        let style = this.app.map.getNewStyle(highlightSymbol);

        if (feature.featuresAndLayers.length > 0) {
            this.app.map.changeFeatureStyle(
                feature.featuresAndLayers[0].feature,
                style,
                { autoRestoreOnZoom: false }
            );
            if (this.page.state.mapIsForAsset) {
              this.page.state.canLoad.assetJsonMap = false;
            } else {
              this.page.state.canLoad.locationJsonMap = false;
            }
            this.app.map.centerTo(
                centerCoordinates[0],
                centerCoordinates[1],
                false
            );
        }

        this.page.state.mapValueSelected = item;
        this.page.state.mapSelectDisabled=false;
    }
  }



  /**
   * When the checkmark icon is clicked on map dialog
   */
  selectValueFromMap() {
    if (this.page.state.mapIsForAsset && this.page.state.mapValueSelected) {
      this.selectAsset(this.page.state.mapValueSelected);
    } else {
      this.selectLocation(this.page.state.mapValueSelected);
    }
    //istanbul ignore else
    if (this.page.state.mapValueSelected) this.page.state.isLoadingHubFromMap = true;

    this.closeMapDialog();
  }



  closeMapDialog() {
    this.page.state.mapValueSelected=null;
    this.page.state.mapAssetValueSelected=null;
    this.page.state.mapLocationValueSelected=null;
    this.page.state.canLoad.locationJsonMap = false;
    this.page.state.canLoad.locationMap = false;
    this.page.state.canLoad.assetJsonMap = false;
    this.page.state.canLoad.assetMap = false;
    //istanbul ignore next 
    if (this.page && this.page.findDialog('mapDialog')) {
      this.page.findDialog('mapDialog').closeDialog();
      if(!this.page.state.isLoadingHubFromMap) {
        this.loadHub();
      }
      this.page.state.isLoadingHubFromMap=false;
    }
  }



  /**
   * Reset the alndomain data using the doaminid from the asset attribute fro the lookup    
  */
   handleALNValueSmartLookupClick(event) {
    this.page.state.newALNTicketSpec = event.item;
    
    let alnDS = this.app.datasources["alndomainDS"];
    
    // istanbul ignore next
    if (alnDS && !event.item.assetattributedomainid){
      alnDS.clearState();
      alnDS.resetState();
      alnDS.lastQuery = {};
    }
   
    // istanbul ignore next
    if (alnDS && event.item.assetattributedomainid) {
      alnDS.initializeQbe();
      alnDS.setQBE('domainid', '=', event.item.assetattributedomainid); 
      alnDS.searchQBE();
      alnDS.waitForLoad();
    }
    
    this.page.showDialog("alnLookup");
  }

  /**
   * Function to select ALN value from the lookup
   */
  async selectALNValue(event) {
    this.page.state.newALNTicketSpec["alnvalue"] = event.value;
    this.page.state.newALNTicketSpec.invalid = false;
    this.app.findDatasource("srDS").state.canSave = true;
    this.loadHub();
  }



  handleALNValueStateProvinceLookupClick(event) {
    this.page.showDialog("stateProvinceLookup");
  }

  async selectStateProvinceValue(event) {
    let srDS = this.app.findDatasource("srDS");
    this.page.state["stateprovince"] = event.value;
		srDS.item["stateprovince"] = this.page.state.stateprovince;
    this.loadHub();
  }



  handleNumValueSmartLookupClick(event) {
    this.page.state.newNumTicketSpec = event.item;
    let numDS = this.app.datasources["numericDomainDS"];
    if (event.item.assetattributedomainid) {
      numDS.initializeQbe();
      numDS.setQBE('domainid', '=', event.item.assetattributedomainid); 
      numDS.searchQBE();
    } else {
      numDS.clearState();
      numDS.resetState();
      numDS.lastQuery = {};
    }
    this.page.showDialog("numericLookup");
  }

  /**
   * Function to select numeric value from the lookup
   */
  async selectNumValue(event) {
    this.page.state.newNumTicketSpec["numvalue"] = event.value;
    this.page.state.newNumTicketSpec.invalid = false;
    this.app.findDatasource("srDS").state.canSave = true;
    this.loadHub();
  }

  

  /**
   * Reset the table domain data using the doaminid from the asset attribute fro the lookup    
  */
  async handleTableValueSmartLookupClick(event) {
    this.page.state.newTableDomainTicketSpec = event.item;
    
    let tableDomainDS = this.app.datasources["tableDomainDS"];
    if (event.item.assetattributedomainid) {
      await tableDomainDS.initializeQbe();
      tableDomainDS.setQBE('domainid', '=', event.item.assetattributedomainid); 
      tableDomainDS.searchQBE();
    } else {
      tableDomainDS.clearState();
      tableDomainDS.resetState();
      tableDomainDS.lastQuery = {};
      tableDomainDS.state.currentSearch = "";
    }
    
    this.page.showDialog("tableDomainLookup");
  }

  /**
   * Function to select table domain value from the lookup
   */
  async selectTableValue(event) {
    this.page.state.newTableDomainTicketSpec["tablevalue"] = event.value;
    this.loadHub();
    let tableDomainDS = this.app.datasources["tableDomainDS"];
    tableDomainDS.lastQuery = {};
    tableDomainDS.state.currentSearch = "";
  }



  /**
   * Function to set description to be displayed in hub
   */
  async setHubDescription(event) {
    this.app.findDatasource("srDS").item["description_longdescription"] = event.target.content;
    this.page.state.srdescription = event.target.content;
    if (!this.page.state.isLoadingHub) {
      this.loadHub();
    }
  }



  /**
   * Save GPS latitude and longitude in service address
   */
  // istanbul ignore next
  async saveGPSLocation() {
    const GEOLOCATION_TIMEOUT_MS = 60 * 1000; //1 minute
    let geolocation = this.app.geolocation;
    let timeoutId;
    if (geolocation) {
      const geolocationUpdated = async (location) => {
        let srDS = this.app.findDatasource("srDS");
        let deviceCoordinates = [location.longitude, location.latitude];
        if (this.app.state.maxvarCoordinate !== 'LATLONG') {
          if (!this.mapPreloadAPI) {
            this.mapPreloadAPI = new MapPreLoadAPI();
          }
          //Get the map spatial reference
          const mapConfiguration = await this.mapPreloadAPI.loadMapConfiguration(this.app);
          const layers = await this.mapPreloadAPI.loadLayers(mapConfiguration, this.app);

          const baseMapInfo = layers ? await this.mapPreloadAPI.getBaseMapInfo(layers[0]) : null;
          let basemapSpatialReference = null;
          if (baseMapInfo.type === 'indexedVector') {
            basemapSpatialReference = baseMapInfo?.tileInfo?.spatialReference;
          } else {
            basemapSpatialReference = baseMapInfo?.spatialReference;
          }
          if (basemapSpatialReference && basemapSpatialReference.wkid !== 4326) {
            const { wkid } = basemapSpatialReference;
            let projCode = null;

            if (wkid) {
              projCode = 'EPSG:' + wkid;
              //Look for the Spatial Reference definition
              const { spatialReferences = [] } = mapConfiguration;
              spatialReferences.forEach((spatialReference) => {
                if (spatialReference.wkid === basemapSpatialReference.wkid) {
                  MapPreLoadAPI.registerSpatialReference(spatialReference);
                }
              });
            } else {
              const { wkt } = basemapSpatialReference;
              projCode = 'EPSG:BASEMAP';
              const baseMapCustomSR = {
                wkid: projCode,
                definition: wkt
              }
              MapPreLoadAPI.registerSpatialReference(baseMapCustomSR);
            }

            deviceCoordinates = transform(
              deviceCoordinates,
              'EPSG:4326',
              projCode
            );
          } else {
            log.e("ERROR: Basemap not configured");
          }

          let obj = {
            geometry: {
              coordinates: deviceCoordinates,
              type: 'Point'
            },
            type: 'Feature'
          };
          srDS.item.autolocate = JSON.stringify(obj);
        }
        this.page.state.latitudey = srDS.item.latitudey = deviceCoordinates[1];
        this.page.state.longitudex = srDS.item.longitudex = deviceCoordinates[0];
        this.page.state.captureCoordinatesInProg = false;
        this.loadHub();
        this.app.geolocation.off('geolocation-updated', geolocationUpdated);
        this.app.geolocation.off('geolocation-error', geolocationError);
        window.clearTimeout(timeoutId);
      };
      const geolocationError = (error) => {
        this.page.state.captureCoordinatesInProg = false;
        let label = this.app.getLocalizedMessage(this.app.name, 'mapRetrieveLocationError', 'There was an error to retrieve location.');
        this.app.toast(label, 'error', '');
        log.e(error);
        this.app.geolocation.off('geolocation-updated', geolocationUpdated);
        this.app.geolocation.off('geolocation-error', geolocationError);
        window.clearTimeout(timeoutId);
      };
      const geolocationTimeout = () => {
        this.page.state.captureCoordinatesInProg = false;
        let label = this.app.getLocalizedMessage(this.app.name, 'mapRetrieveLocationTimeoutError', 'GPS failed to retrieve location due to timeout.');
        this.app.toast(label, 'error', '');
        this.app.geolocation.off('geolocation-updated', geolocationUpdated);
        this.app.geolocation.off('geolocation-error', geolocationError);
      };
      geolocation.on(
        'geolocation-updated',
        geolocationUpdated,
        this
      );
      geolocation.on(
        'geolocation-error',
        geolocationError
      );
      timeoutId = window.setTimeout(geolocationTimeout, GEOLOCATION_TIMEOUT_MS);
      this.page.state.captureCoordinatesInProg = true;
      geolocation.updateGeolocation();
    }
  }

  getItemServiceAddress(item) {
    if (!item) {
      return null;
    }

    const serviceaddress = Array.isArray(item.serviceaddress) ? item.serviceaddress[0] : item.serviceaddress;

    if (!serviceaddress || isNaN(serviceaddress.latitudey) || isNaN(serviceaddress.longitudex)) {
      return null;
    }

    return serviceaddress
  }



  async setTicketPriority() {
    let srDS = this.app.findDatasource("srDS");
    if (this.page.state.ishighpriority) {
      srDS.item["reportedpriority"] = await this.app.state.sysProp.highPriority;
    } else {
      srDS.item["reportedpriority"] = await this.app.state.sysProp.defaultPriority;
    }
  }



  async retrieveLookupDescription(stateName) {
    let srDS = this.app.findDatasource("srDS");
    let stateValue = "";
    switch(stateName) {
      case "locationdesc":
        if (srDS.item['location']) {
          let locationLookupDS = this.app.findDatasource("locationLookupDS");
          await locationLookupDS.forceReload();
          await locationLookupDS.initializeQbe();
          locationLookupDS.setQBE("location", "=", srDS.item['location']);
          if (srDS.item['siteid']) {
            locationLookupDS.setQBE("siteid", "=", srDS.item['siteid']);
          }
          let locationFound = await locationLookupDS.searchQBE();
          if (locationFound.length) {
            stateValue = locationFound[0].description;
          }
        }
        break;
      case "assetdesc":
        if (srDS.item['assetnum']) {
          let assetLookupDS = this.app.findDatasource("assetLookupDS");
          await assetLookupDS.forceReload();
          await assetLookupDS.initializeQbe();
          assetLookupDS.setQBE("assetnum", "=", srDS.item['assetnum']);
          if (srDS.item['assetsiteid']) {
            assetLookupDS.setQBE("siteid", "=", srDS.item['assetsiteid']);
          }
          let assetFound = await assetLookupDS.searchQBE();
          if (assetFound.length) {
            stateValue = assetFound[0].description;
          }
        }
        break;
      case "contactdetail":
        if (srDS.item['affectedperson']) {
          let personDS = this.app.findDatasource("personDS");
          await personDS.forceReload();
          await personDS.initializeQbe();
          personDS.setQBE("personid", "=", srDS.item['affectedperson']);
          let personFound = await personDS.searchQBE();
          if (personFound.length) {
            stateValue = (personFound[0].displayname)? personFound[0].displayname : personFound[0].personid;
          } else {
            stateValue = srDS.item['affectedperson'];
          }
        }
        break;
      default:
        stateValue = "";
    }
    return stateValue;
  }

} export default CreateSRController;
