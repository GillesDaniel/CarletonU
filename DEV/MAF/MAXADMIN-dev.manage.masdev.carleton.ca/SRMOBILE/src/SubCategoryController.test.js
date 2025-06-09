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
import categorydata from './test/test-category-data.js';
import subcategorydata from './test/test-subcategory-data.js';
import tktmp from './test/test-sr-tktemp-data.js';
import newTestStub from './test/AppTestStub';



async function getApp() {
	let initializeApp = newTestStub({
		currentPage: 'SubCategory',
		datasources: {
			allcategoryds: {
				data: categorydata
			},
			subcategoryds: {
				data: subcategorydata
			},
			tktemplateds: {
				data: tktmp
			},
			tktempds: {
				data: tktmp
			}
		}
	});
	let app = await initializeApp();
	app.client.userInfo = {
		defaultSite: "BEDFORD",
		defaultOrg: "EAGLENA",
		personid: 'FITZ',
		displayname: "Fitz Cameron",
		primaryphone: "5582123456789",
		primaryemail: "fitzcam@srmobile.cn"
	};
	app.setCurrentPage = jest.fn();
	return app;
}



it('should go to detail page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];

	// Test go back from createSR page


	await controller.pageInitialized(page, app);

	app.lastPage = { name: 'createSR' };
	app.state.pagelist = [ {pagename: "SubCategory"} ];
	await controller.pageResumed(page);

	app.state.pagelist = [];

	await controller.gotoDetails();

	app.state.isUpdateFromBack = true;

	await controller.gotoDetails();
});



it('should go to create SR when select subcategory without children or types', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];

	app.state.selectedSubCategory = "1630"; //Parent of 1641
	await controller.loadCategoryDS(app.state.selectedSubCategory);
	
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);

	app.state.pagelist = [];

	let items = app.findDatasource("subcategoryds").getItems();

	//Exercise clean of search before try find the subcategory
	app.findDatasource("subcategoryds").lastQuery.searchText = "To be or not to be?";

	//The hassubcategory for selected subcategory is false.
	//The hasactivetype for selected subcategory is false.
	let layer1 = items[0];
	await controller.subcategoryLayer(layer1);
	expect(app.state.subcategory).toBe("E1CSR");
	expect(app.state.pagelist.length).toBe(1);
	// should set app.state.subcategory to classificationid when subcategory description is empty
	layer1.classificationdesc = undefined;
	layer1.classificationid = "E1CSRTEST"
	await controller.subcategoryLayer(layer1);
	expect(app.state.subcategory).toBe("E1CSRTEST");
});



it('should be able to navigate between pages', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	
	app.state.selectedSubCategory = "1138";
	await controller.loadCategoryDS(app.state.selectedSubCategory);
	
	await controller.pageInitialized(page, app);

	await controller.pageResumed(page);

	app.state.pagelist = [];

	let items = app.findDatasource("subcategoryds").getItems();

	//The hassubcategory for selected subcategory is true.
	//The hasactivetype does not matter.
	let layer1 = items[0];
	await controller.subcategoryLayer(layer1);
	expect(app.state.subcategory).toBe('HR');
	expect(app.state.pagelist.length).toBe(1);

	items = app.findDatasource("subcategoryds").getItems();

	//The hassubcategory for selected subcategory is false.
	//The hasactivetype for selected subcategory is true.
	let layer2 = items[0];
	await controller.subcategoryLayer(layer2);
	expect(app.state.subcategory).toBe("Terminate Employee");
	expect(app.state.selectedtkt).toBe("Terminate Employee");
	expect(app.state.selectedSubCategory).toBe('1155');
	expect(app.state.pagelist.length).toBe(2);

	items = app.findDatasource("tktemplateds").getItems();

	//Found the ticket template (type) for the subcategory
	let layer3 = items[0];
	expect(layer3.description).toBe('Employee Departure/Termination');
	expect(layer3.templateid).toBe('1009');

	//Verify the go back functions.
	controller.goBack();
	expect(app.state.pagelist.length).toBe(1);
	controller.goBack();
	expect(app.state.pagelist.length).toBe(0);
	controller.goBack();
	expect(app.state.navigateBack).toBeTruthy();

	// Covers the code in pageResumed.
	app.state.selectedSubCategory = '1143';
	app.state.subcategory = 'HR';
	app.state.currSubCategoryID = '1155';
	app.state.currSubCategoryDesc = 'Terminate Employee';
	await controller.pageResumed(page, app);

	// Covers test for go back to newRequest page.
	app.state.pagelist.push({
		pagename: 'newRequest',
		id: ''
	});
	controller.goBack();
	expect(app.state.navigateBack).toBeTruthy();

	await app.datasources.subcategoryds.search("123");
	app.state.isback = true;
	await controller.subcategoryLayer(layer1);

	// Test ignore clicks while category hierarchy is being validated (display icon empty)
	layer1.displayIcon = "";
	let pagelistLengthBeforeLoadingTest = app.state.pagelist.length;
	await controller.subcategoryLayer(layer1);
	expect(app.state.pagelist.length).toBe(pagelistLengthBeforeLoadingTest);
});