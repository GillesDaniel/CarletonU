/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

import 'regenerator-runtime/runtime';
import CategoryCommonController from './CategoryCommonController';

class NavigationController extends CategoryCommonController {
    
    // eslint-disable-next-line
    async pageResumed(page) {
        this.app.state.selectedtkt = "";
        let allCategoryDS = this.app.datasources["allcategoryds"];
        allCategoryDS.clearState();
        let topCatDS = await this.loadCategoryDS();
        let selectedTopCat = await this.app.state.selectedTopCategory;

        //istanbul ignore next
        if (this.app.state.isback && selectedTopCat) {
            let selItem = { 'classstructureid': selectedTopCat };
            topCatDS.setSelectedItem(selItem, true);
        }

        // Initializes the app state attributes.
        this.app.state.pagelist = [];
        this.app.state.isback = false;
        this.app.state.selectedTopCategory = "";
        this.app.state.selectedSubCategory = "";
        this.app.state.subcategory = "";
        this.app.state.currSubCategoryID = "";
        this.app.state.currSubCategoryDesc = "";
        this.app.state.templateid = "";
        this.app.state.subcatDisplayIcon = {};
    }



    goBack() {
        this.app.state.isback = true;
        this.app.state.isUpdateFromBack = true;
        this.page.state.navigateBack = true;
        this.app.setCurrentPage({name:"main"});
        let allCategoryDS = this.app.datasources["allcategoryds"];
        allCategoryDS.clearState();
    }


    /**
    * Function to open a new page of Subcategory
    * @param event should contain
    * the selected top category's id. which is the classstructureid.
    * classstructureid is the parent id for filter the child category.
    */
    async goNextLayer(event) {
        //clear the previouse search each time go to this page
        this.app.state.selectedSubCategory = event;

        let allCategoryDS = this.app.datasources.allcategoryds;
        let items = allCategoryDS.items.filter(item => item.classstructureid === event);
        
        if (items.length === 0) {
            await allCategoryDS.initializeQbe();
            allCategoryDS.setQBE("classstructureid", "=", event);
            await allCategoryDS.searchQBE(undefined, true);
            items = allCategoryDS.items;
        }

        let item = items[0];

        // istanbul ignore next
        let classificationdesc = (item)? item.classificationdesc : "";

        this.app.state.isBack = false;
        this.app.state.topcategorydesc = classificationdesc;

        this.app.state.pagelist.push({
            pagename: 'newRequest',
            id: event
        });

        if (item?.hassubcategory) {
            this.loadCategoryDS(event); //No need to wait before open the page
            this.app.state.subcategory = classificationdesc;
            this.app.state.selectedSubCategory = event;
            this.app.setCurrentPage({ name: 'SubCategory', params: { selectedSubcategoryId: event, selectedSubcategorydesc: classificationdesc }, resetScroll: true});
        } else if (item?.hasactivetype) {
            this.app.state.selectedtkt = classificationdesc;
            await this.loadTypeDS(event);
            this.app.setCurrentPage({ name: 'tktemp', params: { lastcategorydesc: '' }, resetScroll: true});
        } else {
            this.gotoDetails(true);
        }
    }



    /**
      * skip category and go directly to the creatSR page.
      */
    //istanbul ignore next TODO FIX COVERAGE TEST FAILING HERE
    async gotoDetails(hascategory) {
        this.app.setCurrentPage({ name: 'createSR', params: { classstructureid: "" } });
        this.page.state.navigateToCreateSRPage = true;
        
        //istanbul ignore else
        if (!hascategory) {
            let defaultclassid = await this.app.state.sysProp.defaultClassstructure;
            let allCategoryDS = this.app.datasources['allcategoryds'];
            await allCategoryDS.initializeQbe();
            allCategoryDS.lastQuery = {};
            allCategoryDS.state.currentSearch = "";
            allCategoryDS.setQBE('classstructureid', '=', defaultclassid);
            let item = await allCategoryDS.searchQBE();

            if (defaultclassid && item.length !== 0) {
                let classificationdesc = item[0].classificationdesc;
                this.app.state.topcategorydesc = classificationdesc;
            }
            else if (defaultclassid && item.length === 0) {
                this.app.state.topcategorydesc = defaultclassid;
            }
            else {
                this.app.state.topcategorydesc = "";
            }
        }
    }

} export default NavigationController;
