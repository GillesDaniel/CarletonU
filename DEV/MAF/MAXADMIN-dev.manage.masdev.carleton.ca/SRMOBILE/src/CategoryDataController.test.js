/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import CategoryDataController from './CategoryDataController.js';
import categorydata from './test/test-category-data.js';
import newTestStub from './test/AppTestStub';
import sinon from 'sinon';



it('can use the app stub', async () => {
	let spies = {};
	let initializeApp = newTestStub({
		onNewApp: (app) => {
			spies.initSpy = sinon.spy(app, 'initialize');
		},
	});

	await initializeApp();
	expect(spies.initSpy.callCount).toBe(1);
});



it('should call method of calculated field when it is required', async () => {
	let initializeApp = newTestStub({
		currentPage: 'newRequest',
		datasources: {
			allcategoryds: {
				data: categorydata
			}
		}
	});
	let app = await initializeApp();
	expect(app.datasources.allcategoryds.controllers[0].calculateDisplayIcon()).toBe("");
});



it('should display category ID when description not available', async () => {
	const controller = new CategoryDataController();
	const app = {
		state: {
			subcatDisplayIcon: []
		}
	};
	controller.onDatasourceInitialized(null, app);
	const items = [	
		{
			classificationid: 1
		},
		{
			classificationid: 2,
			classificationdesc: "HASDESC"
		}
	]
	controller.onAfterLoadData(null, items);
	expect(items[0].classificationdesc).toBe(1);
	expect(items[1].classificationdesc).toBe("HASDESC");
});