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

class TKTemplateController {
    pageInitialized(page, app) {
        this.app = app;
        this.page = page;

    }


    pageResumed(page) {
        if (this.app.lastPage?.name === "createSR" && this.app.state.pagelist?.slice().reverse()[0]?.pagename === "tktemp") {
            this.app.state.pagelist.pop();
        }
    }

    async gotoDetailsFromSelectedType() {
        let templateid;
        let tktemplateds = this.app.datasources['tktemplateds'];
        // istanbul ignore next
        if(tktemplateds && tktemplateds.getSelectedItems()[0]){
            templateid = tktemplateds.getSelectedItems()[0].templateid;
            tktemplateds.clearSelections();
        }
        this.app.state.isBack = false;
        this.app.setCurrentPage({name: 'createSR', params: {templateid:templateid,lastcategorydesc:this.page.params.lastcategorydesc} });
        this.page.state.navigateToCreateSRPage = true;
        this.app.state.pagelist.push({
            pagename: 'tktemp',
            id: templateid,
            description: this.page.params.lastcategorydesc
        }); 
    }

    async gotoDetails() {
        this.app.state.pagelist.push({
          pagename: 'tktemp',
          id: this.app.state.templateid,
          isFromDescribleReq: 'Y'
        });
        this.app.setCurrentPage({name: 'createSR', params: {templateid:'',lastcategorydesc:this.page.params.lastcategorydesc} });
        this.page.state.navigateToCreateSRPage = true;
    }

    /**
    * Go back to previose page.
    */
     goBack() {
        this.app.state.isback = true;
        this.app.state.isUpdateFromBack = true;
        let currentitem=this.app.state.pagelist.pop();
        this.app.state.backPageName = currentitem.pagename;
        if (this.app.state.backPageName !== 'newRequest'){
            this.app.state.selectedSubCategory=currentitem.id;
            this.app.state.subcategory=currentitem.description;
            this.app.state.currSubCategoryID=currentitem.currID;
            this.app.state.currSubCategoryDesc=currentitem.currDesc;
            //Go back to Subcategory Page from TKTemplate
            this.app.setCurrentPage({name: 'SubCategory'});
        } else {
            //Go back to the top categories page
            this.app.setCurrentPage({name: 'newRequest'});
            this.page.state.navigateBack = true;
        }

	}

}

export default TKTemplateController;
