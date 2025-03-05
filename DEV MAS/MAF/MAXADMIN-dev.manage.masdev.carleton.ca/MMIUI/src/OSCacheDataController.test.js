/*
 * Licensed Materials - Property of IBM
 * 5737-M66, 5900-AAA
 * (C) Copyright IBM Corp. 2020, 2021 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication, or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */


import OSCacheDataController from './OSCacheDataController';
import oscachedata from './data/oscache';
import sinon from 'sinon';

import {
  JSONDataAdapter,
  Datasource,
  Application
} from '@maximo/maximo-js-api';

function newJSONDatasource(data = oscachedata, uniqueid = 'assetuid', name = 'testds', itemsAttr = 'member') {
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

it('filter result with onAfterLoadData', async () => {
  const controller = new OSCacheDataController();
  const app = new Application();
 
  const oscacheds = newJSONDatasource(oscachedata, '_rowstamp', 'oscacheds');
  app.registerDatasource(oscacheds);
  oscacheds.registerController(controller);
  const osDetailOrphansJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osDetailOrphansJsonDs','osDetailOrphans');
  let loadStubFirst = sinon.stub(osDetailOrphansJsonDs, 'load');
  app.registerDatasource(osDetailOrphansJsonDs);
  const osDetailsNoHeaderJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osDetailsNoHeaderJsonDs','osDetailsNoHeader');
  app.registerDatasource(osDetailsNoHeaderJsonDs);
  const osHeaderNoDetailsJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osHeaderNoDetailsJsonDs','osHeaderNoDetails');
  app.registerDatasource(osHeaderNoDetailsJsonDs);
  const osNoPrimaryObjectJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osNoPrimaryObjectJsonDs','osNoPrimaryObject');
  app.registerDatasource(osNoPrimaryObjectJsonDs);
  const osColsOrphansJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osColsOrphansJsonDs','osColsOrphans');
  app.registerDatasource(osColsOrphansJsonDs);
  const osColsNoDetailsJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osColsNoDetailsJsonDs','osColsNoDetails');
  app.registerDatasource(osColsNoDetailsJsonDs);
  const osEntServiceNoIntJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osEntServiceNoIntJsonDs','osEntServiceNoInt');
  app.registerDatasource(osEntServiceNoIntJsonDs);
  const osExtSystemNoEntServiceJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osExtSystemNoEntServiceJsonDs','osExtSystemNoEntService');
  app.registerDatasource(osExtSystemNoEntServiceJsonDs);
  const osPubChannelNoIntJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osPubChannelNoIntJsonDs','osPubChannelNoInt');
  app.registerDatasource(osPubChannelNoIntJsonDs);
  const osExtSystemNoPubChannelJsonDs = newJSONDatasource(oscachedata, '_rowstamp', 'osExtSystemNoPubChannelJsonDs','osExtSystemNoPubChannel');
  app.registerDatasource(osExtSystemNoPubChannelJsonDs);
  let loadStubLast = sinon.stub(osExtSystemNoPubChannelJsonDs, 'load');

  await app.initialize();
  await oscacheds.load();
  expect(controller.app).toBe(app);
  expect(controller.owner).toBe(app);

  let items = [];
  items[0] = oscachedata;
  await controller.onAfterLoadData(oscachedata, items);
  expect(loadStubFirst.called).toBe(true);
  expect(loadStubLast.called).toBe(true);

});
