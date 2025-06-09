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

class SubCategoryController extends CategoryCommonController {
  
    pageInitialized(page, app) {
        this.app = app;
        this.page = page;
        this.initFields();
    }
  
    initFields() {    
      this.app.state.selectedSubcategory = this.page.params.selectedSubcategoryId;
      this.app.state.subcategory = this.page.params.selectedSubcategorydesc;
      // this.page.sitefilteron = this.page.params.sitefilteron;
    }

   /**
   * Filter only selected category -subcategories.
   * And change the arrow based on has children /has type.
   */
    pageResumed(page) {
      // istanbul ignore next
      if (this.app.lastPage?.name === "createSR" && this.app.state.pagelist?.slice().reverse()[0]?.pagename === "SubCategory") {
        this.app.state.pagelist.pop();
      }
      let selectedSubCat = this.app.state.selectedSubCategory;
      this.page.state.initLastSelectedID = selectedSubCat;
      this.page.state.initLastSelectedDesc = this.app.state.subcategory;

      let subcategoryds = this.app.datasources.subcategoryds;
      if (subcategoryds.items.length === 0 && this.app.lastPage && this.app.lastPage.name !== 'newRequest') {
        this.loadCategoryDS(selectedSubCat);
      }
      //clear selection if it is first time entering, if it is back, set selection.
      subcategoryds.clearSelections();
      if (this.app.state.isback){
        let selItem = {'classstructureid' : this.app.state.currSubCategoryID} ;
        subcategoryds.setSelectedItem(selItem, true);
        this.app.state.isUpdateFromBack = true;
      } else {
        this.app.state.isUpdateFromBack = false;
      }
    
    }

  /**
   * Go back to previose page.
   */
   async goBack() {
	    this.app.state.isback = true;
      this.app.state.isUpdateFromBack = true;
      this.app.state.navigateBack = true;
      if(this.app.state.pagelist.length>0){  
          let currentitem=this.app.state.pagelist.pop();
          this.app.state.backPageName = currentitem.pagename;
          if (this.app.state.backPageName !== 'newRequest'){
            this.app.state.selectedSubCategory=currentitem.id;
            this.app.state.subcategory=currentitem.description;

            this.page.state.initLastSelectedID = currentitem.id;
            this.page.state.initLastSelectedDesc = currentitem.description;

            this.app.state.currSubCategoryID=currentitem.currID;
            this.app.state.currSubCategoryDesc=currentitem.currDesc;

            this.app.state.lastCurrSelectedID = currentitem.currID;
            this.app.state.lastCurrSelectedDesc = currentitem.currDesc;
          
            // Set item selected from history page. 
            let parent = await this.app.state.selectedSubCategory;
            let subcategoryds = await this.loadCategoryDS(parent);
            
            let selItem = {'classstructureid' : this.app.state.currSubCategoryID};
            await subcategoryds.setSelectedItem(selItem, true);
          
          } else {
            this.app.setCurrentPage({name: 'newRequest'});
            this.app.state.selectedTopCategory=currentitem.id;
            this.page.state.navigateBack = true;
          }
        }
	  }

  /**
   * Function to open a new layer of Subcategory
   * @param event should contain
   * the selected top subcategory item.
   */
    async subcategoryLayer(event) {
      if (!event.displayIcon) {
        return; //Ignore clicks while loading
      }

      /**first we need to record the current page, because we are leaving this page
      **push the current page paramters to the pagelist for goback to use.
      */
	    let id = this.app.state.selectedSubCategory;
      let description = this.app.state.subcategory;
      this.page.state.initLastSelectedID = this.app.state.selectedSubCategory;
      this.page.state.initLastSelectedDesc = this.app.state.subcategory;
  
      //Real action to handle open next page    
      let classstructureid = event.classstructureid;
      let classificationdesc = event.classificationdesc ?? event.classificationid;

      this.app.state.lastCurrSelectedID = classstructureid;
      this.app.state.lastCurrSelectedDesc= classificationdesc;

      // Only updates selectedSubCategory when still goes to the subcategory page.
      this.app.state.selectedSubCategory = classstructureid; 
      this.app.state.subcategory = classificationdesc;

      if (this.app.state.isback){
        this.app.state.isUpdateFromBack = true; 
      } else {
        this.app.state.isUpdateFromBack = false; 
      }
      this.app.state.isback = false;  

		  this.app.state.pagelist.push({
        pagename: 'SubCategory',
        id: id,
        description: description,
        currID: classstructureid,
        currDesc: classificationdesc
      });

      //clear the previous filter
      let isSearch=this.app.datasources['subcategoryds'].lastQuery.searchText;
      if(isSearch!==''){
        this.app.datasources['subcategoryds'].lastQuery.searchText="";
      }

      if (event.hassubcategory) {
        await this.loadCategoryDS(this.app.state.selectedSubCategory);
      
      } else if (event.hasactivetype) {
        this.app.state.selectedtkt = classificationdesc;
        await this.loadTypeDS(this.app.state.selectedSubCategory);
        this.app.setCurrentPage({name: 'tktemp',params:{lastcategorydesc:classificationdesc}, resetScroll: true});
      
      } else {
        this.page.state.navigateToCreateSRPage = true;
        this.app.setCurrentPage({name: 'createSR', params:{lastcategorydesc:classificationdesc}});
      }
    }



  /**
   * Base Function of gotoDetails.
   */
  gotoDetails() {
    // When it's the first time going to subcategory page.
    //istanbul ignore else
    if (this.page.state.initLastSelectedID === ""){
      this.page.state.initLastSelectedID = this.app.state.selectedSubCategory;
      this.page.state.initLastSelectedDesc = this.app.state.subcategory;
    } 
    
    if (this.app.state.isUpdateFromBack){
      this.app.state.pagelist.push({
        pagename: 'SubCategory',
        isFromDescribleReq: 'Y',
        id: this.page.state.initLastSelectedID,
        description: this.page.state.initLastSelectedDesc,
        currID: this.app.state.lastCurrSelectedID,
        currDesc: this.app.state.lastCurrSelectedDesc
      });

    } else {
      this.app.state.pagelist.push({
        pagename: 'SubCategory',
        isFromDescribleReq: 'Y',
        id: this.app.state.selectedSubCategory,
        description: this.app.state.subcategory
      });

    }
  
    this.app.setCurrentPage({name: 'createSR', params:{lastcategorydesc:''}});
    this.page.state.navigateToCreateSRPage = true;
  }

}
export default SubCategoryController;
