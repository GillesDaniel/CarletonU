/*
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA
 * (C) Copyright IBM Corp. 2021, 2022 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */


import DetailPageController from './DetailPageController';
import testData from './data/test-data';
import sinon from 'sinon';

import {
  JSONDataAdapter,
  Datasource,
  Application,
  Page
} from '@maximo/maximo-js-api';

function newJSONDatasource(data = testData, uniqueid = 'assetuid', name = 'testds', itemsAttr = 'member') {
  const da = new JSONDataAdapter({
    src: data,
    items: itemsAttr,
    schema: 'responseInfo.schema'
  });

  const ds = new Datasource(da, {
    idAttribute: uniqueid,
    name: name
  });

  return ds;
}

it('tileClickCallBack', async () => {
  const controller = new DetailPageController();
  const app = new Application();
  const page = new Page({ name: 'detail' });
  page.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  expect(controller.app).toBe(app);
  expect(controller.page).toBe(page);

  app.state.currentServerId = 'test123';
  
  const mockSetPage = jest.fn();
  app.setCurrentPage = mockSetPage;
  let event = {'page':'system'};
  controller.tileClickCallBack(event);
  expect(mockSetPage.mock.calls[0][0].name).toBe('system');
  expect(mockSetPage.mock.calls[0][0].params.serverIdentifier).toBe('test123');
});


it('handleTestConnection', async () => {
  const controller = new DetailPageController();
  const app = new Application();
  const page = new Page({ name: 'detail' });
  page.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  expect(controller.app).toBe(app);
  expect(controller.page).toBe(page);

  const testconds = newJSONDatasource(testData, '_rowstamp', 'testConnectionDs');
  let loadStub = sinon.stub(testconds,'load').callsFake(() => {return [{'canConnect':true}]});
  page.registerDatasource(testconds)

  let event = {item:{testConnection:{resource:'href'}}};
  await controller.handleTestConnection(event);
  expect(loadStub.called).toBe(true);
});

it('handleBrowseMessage', async () => {
  const controller = new DetailPageController();
  const app = new Application();
  const page = new Page({ name: 'detail' });
  page.registerController(controller);
  app.registerPage(page);
  await app.initialize();
  expect(controller.app).toBe(app);
  expect(controller.page).toBe(page);

  const testconds = newJSONDatasource(testData, '_rowstamp', 'browseMessagesDs');
  let loadStub = sinon.stub(testconds,'load').callsFake(() => {return [{'name':'value'},{'name':'value'}]});
  page.registerDatasource(testconds)

  let event = {item:{browseMessage:{resource:'href'}}};
  await controller.handleBrowseMessage(event);
  expect(loadStub.called).toBe(true);
});
