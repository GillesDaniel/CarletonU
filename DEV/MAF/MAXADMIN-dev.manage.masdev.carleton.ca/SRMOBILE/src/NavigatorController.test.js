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
import topcategorydata from './test/test-category-data.js';
import subcategorydata from './test/test-subcategory-data.js';
import tktmp from './test/test-sr-tktemp-data.js';
import newTestStub from './test/AppTestStub';



async function getApp() {
	let initializeApp = newTestStub({
		currentPage: 'newRequest',
		datasources: {
			allcategoryds: {
				data: topcategorydata
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



it('should go to detail page without default classstructure id', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	controller.gotoDetails(false);
	expect(app.state.topcategorydesc).toBe("");
});



it('should go to detail page with default classstructureid', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);

	app.state.sysProp.defaultClassstructure = "1143";

	controller.gotoDetails(false);
});



it('should go to detail page with top category', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	await controller.goNextLayer("SECURITY");

	expect(app.state.topcategorydesc).toBe("Security");
	expect(app.state.selectedSubCategory).toBe("SECURITY");
	expect(app.state.selectedtkt).toBe("");
	//Page will be createSR
});



it('should go to subcategory page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	await controller.goNextLayer("1138");

	expect(app.state.topcategorydesc).toBe("Request for Service");
	expect(app.state.selectedSubCategory).toBe("1138");
	expect(app.state.selectedtkt).toBe("");
	//Page will be SubCategory
});



it('should go to type page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	await controller.goNextLayer("HEATAIR");

	expect(app.state.topcategorydesc).toBe("Heating & Air");
	expect(app.state.selectedSubCategory).toBe("HEATAIR");
	expect(app.state.selectedtkt).toBe("Heating & Air");
	//Page will be tktemp
});



it('should be able to go back to main page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	expect(page.state.navigateBack).toBeFalsy();
	controller.goBack();
	expect(page.state.navigateBack).toBeTruthy();
});



it('should be able to come back from next page', async () => {
	let app = await getApp();
	let page = app.currentPage;
	let controller = page.controllers[0];
	await controller.pageInitialized(page, app);
	await controller.pageResumed(page);
	
	//Go to next page with empty datasource
	await controller.goNextLayer("RESTROOMS");

	//Go to next page again, now with a loaded datasource
	await controller.goNextLayer("RESTROOMS");

	//Simulate the go back from create SR page
	app.state.isback = true;
	app.state.selectedTopCategory = "RESTROOMS";
	await controller.pageResumed(page);
});
