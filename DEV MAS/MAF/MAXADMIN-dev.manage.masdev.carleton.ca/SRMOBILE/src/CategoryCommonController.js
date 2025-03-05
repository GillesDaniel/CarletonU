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
class CategoryCommonController {

    pageInitialized(page, app) {
        this.app = app;
        this.page = page;
    }



    /**
     * Load data for the category datasource.
     * @param {*} parent The parent category to load subcategories. If not specified, will load top categories.
     * @returns The categories datasource
     */
    async loadCategoryDS(parent) {
        this.app.state.pageLoading = true;
        let categoryDS = this.app.findDatasource((parent)? "subcategoryds" : "allcategoryds");
        try {
            this.app.state.canLoad.categories = false;
            await categoryDS.initializeQbe();
            this.app.state.canLoad.categories = true;
            if (parent) {
                categoryDS.lastQuery.searchText=""; //Clear the user search
                categoryDS.setQBE('parent', '=', parent);
            } else {
                categoryDS.setQBE('parent', '=', 'null');
            }
            //istanbul ignore next
            if (this.app.state.isMobileContainer) {
                categoryDS.setQBE('usewithsr', true);
            } else if (!this.app.client.fakeClient) {
                //Attribute inside relationship does not work for device
                categoryDS.setQBE('classusewith.objectname', '=', 'SR');
            }
            await categoryDS.searchQBE(undefined, true);
        } finally {
            this.app.state.pageLoading = false;
        }
        return categoryDS;
    }



    async loadTypeDS(classstructureid) {
        this.app.state.pageLoading = true;
        try {
            if (classstructureid) {
                let tktemplateds = this.app.findDatasource("tktemplateds");
                await tktemplateds.initializeQbe();
                tktemplateds.setQBE("classstructureid", "=", classstructureid);
                await tktemplateds.searchQBE(undefined, true);
            }
        } finally {
            this.app.state.pageLoading = false;
        }
    }

} export default CategoryCommonController;