/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020, 2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */
import newTestStub from './test/AppTestStub';
import mainPageData from './test/sr-mainpage-data.js'
import worklogData from './test/sr-worklog-data.js'

async function getApp() {
  let initializeApp = newTestStub({
    currentPage: 'main',
    datasources: {
      srDS: {
        data: mainPageData
      },
      worklogDS: {
        data: worklogData
      }
    },
    onNewApp: (app) => {
      app.client.systemProperties = {
        'sr.filter.site': '0',
        'sr.default.priority': '3',
        'sr.high.priority': '2'
      }
    }
  });
  let app = await initializeApp();
  app.client.userInfo = {
    defaultSite: "BEDFORD",
    personid: 'FITZ',
    displayname: "Fitz Cameron",
    primaryphone: "5582123456789",
    primaryemail: "fitzcam@srmobile.cn",
    location: {
      location:"PLANT-W1",
      siteid: "BEDFORD"
    }
  };
  return app;
}



it('should be able to open SR comments and add a new comment', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  let srDS = app.findDatasource("srDS");
  let event = {
    item: srDS.item
  }
  await controller.openWorkLogDrawer(event);
  
  let value = {
    summary: "Testing 123",
    longDescription: "Testing 123 long description"
  }
  await controller.saveWorkLog(value);
});



it('should NOT be able to add a comment with more than 999999 chars', async () => {
  const generateRandomCharacters = function(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };
  const richTextValue = generateRandomCharacters(1500000);

  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  //Text with over a million chars
  const value = {
    dialogOpen: true,
    longDescription: richTextValue,
  }
  expect(value.longDescription.length).toBe(1500000);

  //Call the watch to trim the size of text
  controller.watchChatLogChanges(value);
  expect(value.longDescription.length).toBe(999999);

  //Call again to make sure nothing changes
  controller.watchChatLogChanges(value);
  expect(value.longDescription.length).toBe(999999);
});



it('should allow add new comment to SR being synced', async () => {
  let app = await getApp();
  let page = app.currentPage;
  let controller = page.controllers[0];

  app.client.txManager = {
    info: {
      recordsWithAllTransactions: jest.fn()
    }
  }
  

  await controller.pageInitialized(page, app);
  await controller.pageResumed(page);

  let srDS = app.findDatasource("srDS");
  let event = {
    item: srDS.item
  }

  //Condition to not allow add new comment
  app.state.isMobileContainer = true;
  app.state.networkConnected = true;
  event.item.href = "TEMP_HREF/5612564878sdf951265sdfsfd46"

  await controller.openWorkLogDrawer(event);

  //Chat log must be read-only
  expect(page.state.chatLogReadOnly).toBe(false);

  //Covers the call to reload unsynced SRs list
  page.state.selectedDropdown = "unsyncedrequests";
  controller.updateWorkLogCount();
});