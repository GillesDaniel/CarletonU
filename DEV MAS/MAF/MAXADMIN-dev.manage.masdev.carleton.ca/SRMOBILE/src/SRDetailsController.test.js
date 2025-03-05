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
import newTestStub from './test/AppTestStub';
import mainPageData from './test/sr-mainpage-data.js'
import worklogData from './test/sr-worklog-data.js'
import {JSONDataAdapter, Datasource } from '@maximo/maximo-js-api';
import allPerson from './test/sr-person-data.js';

async function getApp() {
  let initializeApp = newTestStub({
    currentPage: 'srDetails',
    datasources: {
      srDS: {
        data: mainPageData
      },
      worklogDS: {
        data: worklogData
      }
    }
  });
  let app = await initializeApp();
  app.setCurrentPage = jest.fn();
  return app;
}


it('should update worklog count when comment added from SR details page', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  await controller.updateWorkLogCount();

  let srDS = app.findDatasource("srDS");
  let event = {
    item: srDS.item
  }
  await controller.openWorkLogDrawer(event);
});



it('should send user to attachments page', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  let pageSetter = jest.fn();

  const originalSetter = app.setCurrentPage;
  app.setCurrentPage = pageSetter;

  await controller.pageInitialized(page, app);

  let event = {
    item: { href: 'oslc/os/mxapisr/_U1IvMTE3Ng--' },
  };
  await controller.openAttachmentPage(event);

  expect(pageSetter.mock.calls.length).toEqual(1);
  expect(pageSetter.mock.calls[0][0].name).toEqual('attachments');

  app.setCurrentPage = originalSetter;
});



it('bring user back from attachments page', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  page.params.doclinksCountOverridden = true;

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);
});

function newDatasource(data = allPerson, name = "personDS") {
  const da = new JSONDataAdapter({
    src: allPerson,
    items: 'member'
  });

  const ds = new Datasource(da, {
    idAttribute: 'personid',
    name: name,
  });

  return ds;
}

it('should cover validateReporter method', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];
  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  app.state.currentSR = app.findDatasource("srDS").item;

  let item = app.findDatasource("srDS").item;

  item.reportedBy = app.state.currentSR.reportedBy;
  

  const da = newDatasource(allPerson, "personDS");
  app.registerDatasource(da);

  item.reportedbyname = "";
  
  await controller.validateReporter(item);
  
  if (app.state.selectedSR.currentReportedByName) {
    (expect(app.state.selectedSR.currentReportedBy).toBe(item.reportby));
  } else {
    (expect(app.state.selectedSR.currentReportedBy).toBe(item.displayname));
  }
  
  item.reportedbyname = "Fitz Gardner";
  await controller.validateReporter(item);

  item.reportedbyname ="";
  item.reportedby = "EPAMINONDAS";
  await controller.validateReporter(item);

  item.reportedbyname ="";
  item.reportedBy = "SMALL";
  await controller.validateReporter(item);


  });


it('should retry load specs and ticket owner when on device', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  app.state.isMobileContainer = true;

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);
});


it('should always go back to main page', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  page.params.doclinksCountOverridden = true;

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  expect(app.currentPage.name).toBe("srDetails");

  await controller.goBack();

  window.setTimeout(() => {
    expect(app.currentPage.name).toBe("main");
  }, 1);
});
