/* Generated File - Do not edit */
/* turn off unused variables that we know we are creating because it is generated code */
/* eslint no-unused-vars: off */
/* turn off lone blocks that we know we are creating because it is generated code due to content switchers */
/* eslint no-lone-blocks: off */
/* turn off === vs == because these are user created == from the MAML file */
/* eslint eqeqeq: off */
/* Turn off React Camel Case warnings, since generated files might not always have proper camel case */
/* eslint react/jsx-pascal-case: off */
/* Turn off React 17 lints in generated code */
/* eslint react/prop-types: off */
/* eslint complexity: off */
/* eslint no-shadow: off */
/* eslint no-duplicate-imports: off */
/* eslint function-paren-newline: off */
/* eslint jsx-quotes: off */
/* eslint dot-notation: off */
/* eslint no-nested-ternary: off */
/* eslint no-implicit-coercion: off */
/* eslint func-style: off */
/* eslint implicit-arrow-linebreak: off */
/* eslint react/jsx-key: off */
/* eslint react/no-children-prop: off */
/* eslint new-cap: off */
/* eslint radix: off */
/* eslint no-empty-function: off */
/* eslint array-bracket-newline: off */
/* eslint no-class-assign: off */
/* eslint init-declarations: off */
/* eslint no-console: off */
/* eslint import/first: off */
/* eslint no-func-assign: off */
/* eslint react-hooks/exhaustive-deps: off */


import 'regenerator-runtime/runtime'
import { Datasource } from '@maximo/maximo-js-api';
import { JSONDataAdapter } from '@maximo/maximo-js-api';
import { Dialog } from '@maximo/maximo-js-api';
import { Application } from '@maximo/maximo-js-api';
import { PlatformFactory } from '@maximo/maximo-js-api';
import { LookupManager } from '@maximo/maximo-js-api';
import { Browser } from '@maximo/maximo-js-api';
import { BootstrapInspector } from '@maximo/maximo-js-api';
import { Page } from '@maximo/maximo-js-api';
import AppController from '../AppController';
import CreateWorkQueueController from '../CreateWorkQueueController';const DialogEditAction = ()=>'';
const LookupQueryLookup = ()=>'';
const DialogObjectStructureDialog = ()=>'';
const DialogMxAppDialog = ()=>'';
const LookupSelectPersonGroupLookup = ()=>'';
const DialogDeleteWqConfirmationDialog = ()=>'';
const PagesPages = ()=>'';
const PageWqListPage = ()=>'';
const TableWorkqueueTable = ()=>'';
const PageCreateWorkQueue = ()=>'';
const ProgressWizardL3s2adComponent = ()=>'';
const PageEditWorkQueue = ()=>'';
const ProgressWizardDkyyyComponent = ()=>'';
const defaultLabels = {};
const customLookups = {};
const databuildInfo = {};


// istanbul ignore file

// istanbul ignore next - test framework
const appInitialize = async (setAppInst, bootstrapInspector) => {
  
    if (!bootstrapInspector) {
      bootstrapInspector = new BootstrapInspector();
    }
    // Create the Application
    let appOptions = {
      platform: 'browser',
      logLevel: 3,
      name: "WQMANAGER",
      type: "",
      theme: "default",
      isMaximoApp: true,
      masEnabled: false,
      masID: "manage",
      labels: {},
      defaultMessages: {"create_wq_name_reqd":"Work queue name is required.","create_wq_query_name_reqd":"A valid query string is required.","create_wq_field_available_reqd":"Field selection is required.","work_queues_brdcrumb":"Work queues","create_wq_query_priority_reqd":"Select a valid priority of 1 and above."},
      messageGroups: 'viewmanager',
      systemProps: [],
      hasCustomizations: false,
      forceJsonLocalizer: undefined,
      useBrowserRouter: false,
      hideMaximoMenus: false,
      sigoptions: {},
      walkmeConfig: undefined
    };

    bootstrapInspector.onNewAppOptions(appOptions);

    let platform = PlatformFactory.newPlatform(appOptions, window.location.href);
    bootstrapInspector.onNewPlatform(platform);
    await platform.configure(appOptions);

    //load default lookups and merge in custom lookups
    bootstrapInspector.onNewLookupOptions(customLookups);
    LookupManager.get().addLookup(customLookups);

    let app = await platform.newApplication(appOptions);

    if(false){
      app.titleResolver = () => {return }
    } else {
      app.title = "Manage";
    }

    bootstrapInspector.onNewApp(app);
    let eventManager = app;
    app.setState(bootstrapInspector.onNewState({"selectedOS":"MXAPIWODETAIL","schemaDsItemUrl":"/oslc/jsonschemas/MXAPIWODETAIL","queryDsItemUrl":"/oslc/allqueries/MXAPIWODETAIL","selectedOsRootObj":"WORKORDER","thisQueuename":"NULL","selectedWQ":""}, 'app'));
    setAppInst(app);

    app.registerController(bootstrapInspector.onNewController(new AppController(), 'AppController', app));
    let page;

    
      // setup the 'wqListPage' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'wqListPage', clearStack: false, parent: app, route: '/wqListPage/*', title: app.getLocalizedLabel("wqListPage_title", "wqListPage"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"stateReadonly":false}, 'page'), {});

        
              {
                let controller = new CreateWorkQueueController();
                bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'CreateWorkQueue' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'CreateWorkQueue', clearStack: false, parent: app, route: '/CreateWorkQueue/*', title: app.getLocalizedLabel("CreateWorkQueue_title", "CreateWorkQueue"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new CreateWorkQueueController();
                bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - assignedPersonGroupDSNew
                {
                  let options = {
  platform: `browser`,
  name: `assignedPersonGroupDSNew`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `none`,
    where: (`objectname="MXAPIOBJECTAUTH" and objectid="${app.state.thisQueuename}"`),
    idAttribute: `secureobjectid`,
    objectStructure: `mxapiobjectauth`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `assignedPersonGroupDSNew`,
    select: `secureobjectid,objectname,objectid,owner,objectauth`
  },
  objectStructure: `mxapiobjectauth`,
  idAttribute: `secureobjectid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `secureobjectid`,
      'unique-id': `true`,
      id: `wn9d7`
    },
    {
      name: `objectname`,
      id: `r8n_v`
    },
    {
      name: `objectid`,
      id: `z_347`
    },
    {
      name: `owner`,
      id: `b_x_9`
    },
    {
      name: `objectauth`,
      id: `j9x8a`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`objectname="MXAPIOBJECTAUTH" and objectid="${app.state.thisQueuename}"`),
      check: (()=>{return `objectname="MXAPIOBJECTAUTH" and objectid="${app.state.thisQueuename}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - assignedPersonGroupDSNew

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'EditWorkQueue' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'EditWorkQueue', clearStack: false, parent: app, route: '/EditWorkQueue/*', title: app.getLocalizedLabel("EditWorkQueue_title", "EditWorkQueue"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new CreateWorkQueueController();
                bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - editWorkQueueDS
                {
                  let options = {
  platform: `browser`,
  name: `editWorkQueueDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: (`queuename="${page.params.queuename}"`),
    itemUrl: (page.params.href),
    autoSave: false,
    idAttribute: `workqueueid`,
    objectStructure: `mxapiworkqueue`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `editWorkQueueDS`,
    select: `workqueueid,queuename,description,priority,app,intobjectname,clausename,isactive`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: `workqueueid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workqueueid`,
      'unique-id': `true`,
      id: `g8nn5`
    },
    {
      name: `queuename`,
      id: `gv3wk`
    },
    {
      name: `description`,
      id: `vpx36`
    },
    {
      name: `priority`,
      id: `ppm82`
    },
    {
      name: `app`,
      id: `x6wwx`
    },
    {
      name: `intobjectname`,
      id: `bdaae`
    },
    {
      name: `clausename`,
      id: `egrmv`
    },
    {
      name: `isactive`,
      id: `jeq_b`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`queuename="${page.params.queuename}"`),
      check: (()=>{return `queuename="${page.params.queuename}"`})
    },
    {
      name: `itemUrl`,
      lastValue: (page.params.href),
      check: (()=>{return page.params.href})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - editWorkQueueDS

                

                // begin datasource - editedworkqueuecols
                {
                  let options = {
  platform: `browser`,
  name: `editedworkqueuecols`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    selectionMode: `none`,
    relationship: `workqueuecols`,
    orderBy: `columnorder`,
    select: `queuename,attributename--title,columnorder`,
    dependsOn: `editWorkQueueDS`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `queuename`,
      id: `q2be4`
    },
    {
      name: `attributename--title`,
      id: `kjbxm`
    },
    {
      name: `columnorder`,
      id: `an2wk`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `editWorkQueueDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - editedworkqueuecols

                

                // begin datasource - editworkqueueactions
                {
                  let options = {
  platform: `browser`,
  name: `editworkqueueactions`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    selectionMode: `none`,
    relationship: `workqueueactions`,
    orderBy: `actionorder`,
    select: `queuename,action,actionlabel,actionorder`,
    dependsOn: `editWorkQueueDS`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `queuename`,
      id: `xaqym`
    },
    {
      name: `action`,
      id: `ydzad`
    },
    {
      name: `actionlabel`,
      id: `bdpyp`
    },
    {
      name: `actionorder`,
      id: `ap79m`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `editWorkQueueDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - editworkqueueactions

                

                // begin datasource - editActionsSelectedDS
                {
                  let options = {
  name: `editActionsSelectedDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `items`,
  schema: `schema`,
  schemaExt:   [
    {
      name: `action`,
      id: `q93dj`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `action`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - editActionsSelectedDS

                

                // begin datasource - editFieldsSelectedDS
                {
                  let options = {
  name: `editFieldsSelectedDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `items`,
  schema: `schema`,
  schemaExt:   [
    {
      name: `title`,
      searchable: `true`,
      id: `p6395`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `_id`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`title`
    ],
    select: `title`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - editFieldsSelectedDS

                

                // begin datasource - assignedPersonGroupDS
                {
                  let options = {
  platform: `browser`,
  name: `assignedPersonGroupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `none`,
    where: (`objectname="MXAPIOBJECTAUTH" and objectid="${app.state.thisQueuename}"`),
    idAttribute: `secureobjectid`,
    objectStructure: `mxapiobjectauth`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `assignedPersonGroupDS`,
    select: `secureobjectid,objectname,objectid,owner,objectauth`
  },
  objectStructure: `mxapiobjectauth`,
  idAttribute: `secureobjectid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `secureobjectid`,
      'unique-id': `true`,
      id: `gdknj`
    },
    {
      name: `objectname`,
      id: `xyakm`
    },
    {
      name: `objectid`,
      id: `zjxnm`
    },
    {
      name: `owner`,
      id: `eqvzk`
    },
    {
      name: `objectauth`,
      id: `vx3pk`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`objectname="MXAPIOBJECTAUTH" and objectid="${app.state.thisQueuename}"`),
      check: (()=>{return `objectname="MXAPIOBJECTAUTH" and objectid="${app.state.thisQueuename}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - assignedPersonGroupDS

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

    app.setRoutesForApplication();
    
                // begin datasource - mxAppsDs
                {
                  let options = {
  platform: `browser`,
  name: `mxAppsDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: (`MAINTBNAME="${app.state.selectedOsRootObj}"`),
    resetDatasource: true,
    objectStructure: `MXAPIMAXAPP`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `mxAppsDs`,
    searchAttributes:     [
`app`,
`description`
    ],
    indexAttributes:     [
`app`,
`description`
    ],
    select: `app,description`
  },
  objectStructure: `MXAPIMAXAPP`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `app`,
      searchable: `true`,
      id: `exyxp`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `byjjm`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`MAINTBNAME="${app.state.selectedOsRootObj}"`),
      check: (()=>{return `MAINTBNAME="${app.state.selectedOsRootObj}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - mxAppsDs

                

                // begin datasource - intOsDs
                {
                  let options = {
  platform: `browser`,
  name: `intOsDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: `USEWITH="INTEGRATION"`,
    resetDatasource: true,
    objectStructure: `MXAPIINTOBJECT`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `intOsDs`,
    searchAttributes:     [
`intobjectname`,
`description`
    ],
    indexAttributes:     [
`intobjectname`,
`description`
    ],
    select: `intobjectname,description`
  },
  objectStructure: `MXAPIINTOBJECT`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `intobjectname`,
      title: (app.getLocalizedLabel("p3z58_title", "Object Structure")),
      searchable: `true`,
      id: `p3z58`
    },
    {
      name: `description`,
      title: (app.getLocalizedLabel("ag6g2_title", "Description")),
      searchable: `true`,
      id: `ag6g2`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - intOsDs

                

                // begin datasource - workqueueListDS
                {
                  let options = {
  platform: `browser`,
  name: `workqueueListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 10,
  debounceTime: 100,
  query:   {
    pageSize: 10,
    selectionMode: `none`,
    orderBy: `queuename`,
    objectStructure: `mxapiworkqueue`,
    includeCounts: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `workqueueListDS`,
    searchAttributes:     [
`queuename`,
`description`,
`priority`,
`app`,
`intobjectname`,
`clausename`
    ],
    indexAttributes:     [
`queuename`,
`description`,
`priority`,
`app`,
`intobjectname`,
`clausename`
    ],
    select: `queuename,description,priority,app,intobjectname,clausename,isactive,queuetype,owner,langcode,itemcount`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: `queuename`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `queuename`,
      title: (app.getLocalizedLabel("pmbq3_title", "Work queue name")),
      'unique-id': `true`,
      searchable: `true`,
      id: `pmbq3`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `qg2na`
    },
    {
      name: `priority`,
      searchable: `true`,
      id: `bra8d`
    },
    {
      name: `app`,
      searchable: `true`,
      id: `prvqm`
    },
    {
      name: `intobjectname`,
      searchable: `true`,
      id: `b_p49`
    },
    {
      name: `clausename`,
      searchable: `true`,
      id: `megre`
    },
    {
      name: `isactive`,
      title: (app.getLocalizedLabel("mad_g_title", "State")),
      searchable: `false`,
      id: `mad_g`
    },
    {
      name: `queuetype`,
      id: `a97vd`
    },
    {
      name: `owner`,
      id: `g25ae`
    },
    {
      name: `langcode`,
      id: `yx73z`
    },
    {
      name: `itemcount`,
      id: `z2y58`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - workqueueListDS

                

                // begin datasource - createWorkQueueDS
                {
                  let options = {
  platform: `browser`,
  name: `createWorkQueueDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: `queuename="0"`,
    autoSave: false,
    objectStructure: `mxapiworkqueue`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `createWorkQueueDS`,
    select: `workqueueid,queuename,description,priority,app,intobjectname,clausename,isactive`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: `workqueueid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workqueueid`,
      'unique-id': `true`,
      id: `an95y`
    },
    {
      name: `queuename`,
      id: `j3xwz`
    },
    {
      name: `description`,
      id: `mbmzv`
    },
    {
      name: `priority`,
      id: `w_adp`
    },
    {
      name: `app`,
      id: `z7jd6`
    },
    {
      name: `intobjectname`,
      id: `p877q`
    },
    {
      name: `clausename`,
      id: `a_e6x`
    },
    {
      name: `isactive`,
      id: `y65a6`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - createWorkQueueDS

                

                // begin datasource - workqueuecols
                {
                  let options = {
  platform: `browser`,
  name: `workqueuecols`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    dependsOn: `createWorkQueueDS`,
    objectName: `workqueuecols`,
    select: `queuename,attributename,columnorder`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `queuename`,
      id: `wkxmk`
    },
    {
      name: `attributename`,
      id: `kxnyq`
    },
    {
      name: `columnorder`,
      id: `wej9y`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `createWorkQueueDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: false,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - workqueuecols

                

                // begin datasource - workqueueactions
                {
                  let options = {
  platform: `browser`,
  name: `workqueueactions`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    dependsOn: `createWorkQueueDS`,
    objectName: `workqueueactions`,
    searchAttributes:     [
`queuename`,
`action`
    ],
    indexAttributes:     [
`queuename`,
`action`
    ],
    select: `queuename,action,actionlabel,actionorder`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `queuename`,
      searchable: `true`,
      id: `be87m`
    },
    {
      name: `action`,
      searchable: `true`,
      id: `mmkbx`
    },
    {
      name: `actionlabel`,
      id: `yw689`
    },
    {
      name: `actionorder`,
      id: `mmdgm`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `createWorkQueueDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - workqueueactions

                

                // begin datasource - deleteWorkQueueDS
                {
                  let options = {
  platform: `browser`,
  name: `deleteWorkQueueDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: (`queuename="${app.state.selectedWQ}"`),
    objectStructure: `mxapiworkqueue`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `deleteWorkQueueDS`,
    select: `workqueueid,queuename,description,priority,app,intobjectname,clausename,isactive`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: `workqueueid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workqueueid`,
      'unique-id': `true`,
      id: `q3z7g`
    },
    {
      name: `queuename`,
      id: `barpp`
    },
    {
      name: `description`,
      id: `p4q3b`
    },
    {
      name: `priority`,
      id: `xpjk2`
    },
    {
      name: `app`,
      id: `pkv6k`
    },
    {
      name: `intobjectname`,
      id: `wpqbn`
    },
    {
      name: `clausename`,
      id: `pn2ke`
    },
    {
      name: `isactive`,
      id: `vw7v7`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`queuename="${app.state.selectedWQ}"`),
      check: (()=>{return `queuename="${app.state.selectedWQ}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - deleteWorkQueueDS

                

                // begin datasource - delWorkqueuecols
                {
                  let options = {
  platform: `browser`,
  name: `delWorkqueuecols`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `workqueuecols`,
    orderBy: `columnorder`,
    objectName: `workqueuecols`,
    select: `WORKQUEUECOLSID,queuename,attributename,columnorder`,
    dependsOn: `deleteWorkQueueDS`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: `WORKQUEUECOLSID`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `WORKQUEUECOLSID`,
      'unique-id': `true`,
      id: `k3pmq`
    },
    {
      name: `queuename`,
      id: `d7w_k`
    },
    {
      name: `attributename`,
      id: `evm6g`
    },
    {
      name: `columnorder`,
      id: `yrgx9`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `deleteWorkQueueDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - delWorkqueuecols

                

                // begin datasource - delWorkqueueactions
                {
                  let options = {
  platform: `browser`,
  name: `delWorkqueueactions`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `workqueueactions`,
    orderBy: `actionorder`,
    objectName: `workqueueactions`,
    searchAttributes:     [
`queuename`,
`action`
    ],
    indexAttributes:     [
`queuename`,
`action`
    ],
    select: `WORKQUEUEACTIONSID,queuename,action,actionlabel,actionorder`,
    dependsOn: `deleteWorkQueueDS`
  },
  objectStructure: `mxapiworkqueue`,
  idAttribute: `WORKQUEUEACTIONSID`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `WORKQUEUEACTIONSID`,
      'unique-id': `true`,
      id: `xn4e7`
    },
    {
      name: `queuename`,
      searchable: `true`,
      id: `gaxjn`
    },
    {
      name: `action`,
      searchable: `true`,
      id: `qeqp7`
    },
    {
      name: `actionlabel`,
      id: `evvm9`
    },
    {
      name: `actionorder`,
      id: `ab_z4`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `deleteWorkQueueDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - delWorkqueueactions

                

                // begin datasource - maximoAllqueriesDS
                {
                  let options = {
  platform: `browser`,
  name: `maximoAllqueriesDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    orderBy: `name ascending`,
    itemUrl: (app.state.queryDsItemUrl),
    resetDatasource: true,
    objectStructure: (app.state.selectedOS),
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `maximoAllqueriesDS`,
    select: `name,title`
  },
  objectStructure: (app.state.selectedOS),
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `name`,
      id: `xkbd6`
    },
    {
      name: `title`,
      id: `vxw59`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `itemUrl`,
      lastValue: (app.state.queryDsItemUrl),
      check: (()=>{return app.state.queryDsItemUrl})
    },
    {
      name: `objectStructure`,
      lastValue: (app.state.selectedOS),
      check: (()=>{return app.state.selectedOS})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - maximoAllqueriesDS

                

                // begin datasource - allqueriesDS
                {
                  let options = {
  name: `allqueriesDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `items`,
  schema: `schema`,
  schemaExt:   [
    {
      name: `name`,
      title: (app.getLocalizedLabel("x3brj_title", "Query")),
      id: `x3brj`
    },
    {
      name: `title`,
      title: (app.getLocalizedLabel("pdrda_title", "Description")),
      id: `pdrda`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `_id`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `name,title`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `single`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - allqueriesDS

                

                // begin datasource - maximoSchemaDS
                {
                  let options = {
  platform: `browser`,
  name: `maximoSchemaDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    orderBy: `title ascending`,
    itemUrl: (app.state.schemaDsItemUrl),
    objectStructure: (app.state.selectedOS),
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `maximoSchemaDS`,
    select: `*`
  },
  objectStructure: (app.state.selectedOS),
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `*`,
      id: `peg77`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `itemUrl`,
      lastValue: (app.state.schemaDsItemUrl),
      check: (()=>{return app.state.schemaDsItemUrl})
    },
    {
      name: `objectStructure`,
      lastValue: (app.state.selectedOS),
      check: (()=>{return app.state.selectedOS})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - maximoSchemaDS

                

                // begin datasource - actionsAvailableDS
                {
                  let options = {
  platform: `browser`,
  name: `actionsAvailableDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: (`objectname="${app.state.selectedOsRootObj}"`),
    orderBy: `action ascending`,
    itemUrl: `/oslc/os/mxapiaction?`,
    idAttribute: `action`,
    resetDatasource: true,
    objectStructure: `MXAPIACTION`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `actionsAvailableDS`,
    searchAttributes:     [
`action`
    ],
    indexAttributes:     [
`action`
    ],
    select: `action`
  },
  objectStructure: `MXAPIACTION`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `action`,
      searchable: `true`,
      id: `r4der`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: false,
  watch:   [
    {
      name: `where`,
      lastValue: (`objectname="${app.state.selectedOsRootObj}"`),
      check: (()=>{return `objectname="${app.state.selectedOsRootObj}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - actionsAvailableDS

                

                // begin datasource - availablePersonGroupDS
                {
                  let options = {
  platform: `browser`,
  name: `availablePersonGroupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    orderBy: `persongroup ascending`,
    idAttribute: `persongroup`,
    objectStructure: `mxapipersongroup`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `availablePersonGroupDS`,
    searchAttributes:     [
`persongroup`,
`description`
    ],
    indexAttributes:     [
`persongroup`,
`description`
    ],
    select: `persongroup,description`
  },
  objectStructure: `mxapipersongroup`,
  idAttribute: ``,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `persongroup`,
      title: (app.getLocalizedLabel("y_qgy_title", "Group")),
      searchable: `true`,
      id: `y_qgy`
    },
    {
      name: `description`,
      title: (app.getLocalizedLabel("p5bb7_title", "Description")),
      searchable: `true`,
      id: `p5bb7`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - availablePersonGroupDS

                

                // begin datasource - actionsSelectedDS
                {
                  let options = {
  name: `actionsSelectedDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `items`,
  schema: `schema`,
  schemaExt:   [
    {
      name: `action`,
      searchable: `true`,
      id: `j6r6_`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`action`
    ],
    select: `action`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: false,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - actionsSelectedDS

                

                // begin datasource - fieldsAvailableDS
                {
                  let options = {
  name: `fieldsAvailableDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 500,
  items: `items`,
  schema: `schema`,
  schemaExt:   [

  ],
  sortAttributes:   [

  ],
  idAttribute: `title`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    src: ([])
  },
  autoSave: false,
  selectionMode: `multiple`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: false,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - fieldsAvailableDS

                

                // begin datasource - fieldsSelectedDS
                {
                  let options = {
  name: `fieldsSelectedDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `items`,
  schema: `schema`,
  schemaExt:   [
    {
      name: `title`,
      id: `n6eej`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `title`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: false,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - fieldsSelectedDS

                

                // begin datasource - selectedPersonGroupDS
                {
                  let options = {
  name: `selectedPersonGroupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 500,
  items: `items`,
  schema: `schema`,
  schemaExt:   [
    {
      name: `persongroup`,
      id: `w2p4y`
    },
    {
      name: `description`,
      id: `qkde9`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `persongroup`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `persongroup,description`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `none`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  debounceTime: 0,
  appResolver: (() => app),
  clearSelectionOnSearch: false,
  watch:   [

  ],
  trackChanges: true,
  resetDatasource: false,
  qbeAttributes:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - selectedPersonGroupDS

                

                // begin datasource - deletePersonGroupDS
                {
                  let options = {
  platform: `browser`,
  name: `deletePersonGroupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `none`,
    where: (`objectname="MXAPIOBJECTAUTH" and objectid="${app.state.selectedWQ}"`),
    idAttribute: `secureobjectid`,
    objectStructure: `mxapiobjectauth`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `deletePersonGroupDS`,
    select: `secureobjectid,objectname,objectid,owner,objectauth`
  },
  objectStructure: `mxapiobjectauth`,
  idAttribute: `secureobjectid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `secureobjectid`,
      'unique-id': `true`,
      id: `qd9j9`
    },
    {
      name: `objectname`,
      id: `jw6by`
    },
    {
      name: `objectid`,
      id: `g_yjp`
    },
    {
      name: `owner`,
      id: `arj8v`
    },
    {
      name: `objectauth`,
      id: `k873_`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`objectname="MXAPIOBJECTAUTH" and objectid="${app.state.selectedWQ}"`),
      check: (()=>{return `objectname="MXAPIOBJECTAUTH" and objectid="${app.state.selectedWQ}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new CreateWorkQueueController();
bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - deletePersonGroupDS

                
    
                // begin dialog - editAction
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `editAction`,
  configuration:   {
    id: `editAction`,
    dialogRenderer: ((props => {
    return (
      <DialogEditAction id={"editAction_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  app.registerDialog(dialog);
                }
                // end dialog - editAction
                

                // begin dialog - queryLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `queryLookup`,
  configuration:   {
    id: `queryLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupQueryLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupQueryLookup {...props} />
    );
  })
  ),
    resetDatasource: false
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  app.registerDialog(dialog);
                }
                // end dialog - queryLookup
                

                // begin dialog - ObjectStructureDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `ObjectStructureDialog`,
  configuration:   {
    id: `ObjectStructureDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogObjectStructureDialog id={"ObjectStructureDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  let controller = new CreateWorkQueueController();
          bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', dialog);
        dialog.registerController(controller);
                  app.registerDialog(dialog);
                }
                // end dialog - ObjectStructureDialog
                

                // begin dialog - MxAppDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `MxAppDialog`,
  configuration:   {
    id: `MxAppDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogMxAppDialog id={"MxAppDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  let controller = new CreateWorkQueueController();
          bootstrapInspector.onNewController(controller, 'CreateWorkQueueController', dialog);
        dialog.registerController(controller);
                  app.registerDialog(dialog);
                }
                // end dialog - MxAppDialog
                

                // begin dialog - selectPersonGroupLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `selectPersonGroupLookup`,
  configuration:   {
    id: `selectPersonGroupLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupSelectPersonGroupLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupSelectPersonGroupLookup {...props} />
    );
  })
  ),
    resetDatasource: false
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  app.registerDialog(dialog);
                }
                // end dialog - selectPersonGroupLookup
                

                // begin dialog - deleteWqConfirmationDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `deleteWqConfirmationDialog`,
  configuration:   {
    id: `deleteWqConfirmationDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogDeleteWqConfirmationDialog id={"deleteWqConfirmationDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
    );
  })
  )
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  app.registerDialog(dialog);
                }
                // end dialog - deleteWqConfirmationDialog
                
  
  return app;
}

// istanbul ignore next - test framework
class TestBootstrapInspector extends BootstrapInspector {
  constructor(options = {}) {
    super();
    this.options = options;
  }

  newOfflineApplicationOptions(initOptions = {}, appOptions) {
    const {
      RESTConnection: TestRESTConnection,
      MaximoClient: TestMaximoClient,
      SuccessAuthenticator: TestAuthenticator,
      JSONLocalizationSource: TestLocalizerSource,
      Localizer: TestLocalizer
    } = require('@maximo/maximo-js-api');
    let conn = TestRESTConnection.newInstance(initOptions.connection);

    let client = new TestMaximoClient(
      new TestAuthenticator(),
      conn,
      initOptions.connection
    );

    client.connect = () => {
      client.authenticated = true;
      client.connected = true;
      return true;
    };
    // istanbul ignore next - for testing
    client.login = () => {
      // istanbul ignore next - for testing
      client.connect();
      // istanbul ignore next - for testing
      return true;
    };
    client.disconnect = () => {
      client.authenticated = false;
      client.connected = false;
      return true;
    };
    client.restclient._fetch = initOptions.fetch || (() => {});
    client.fakeClient = true;
    client.systemProperties = initOptions.systemProperties || {};
    client.getSystemProperties = () => client.systemProperties;
    client.getSystemProperty = (p) => client.systemProperties[p];

    appOptions.client = client;

    appOptions.isMaximoApp = true;
    appOptions.skipInfo = true;
    appOptions.userInfoOnly = false;
    appOptions.forceJsonLocalizer = true;
    appOptions.forceSessionStorage = true;
    appOptions.skipLocaleLabels = true;

    return {...appOptions, client: client};
  }

  onNewAppOptions(options) {
    // setup a completely stubbed out application
    this.newOfflineApplicationOptions(this.options, options);

    // disable logging unless it is set
    options.logLevel = this.options.logLevel || -1;
    return options;
  }

  onNewDataAdapter(da, options, type) {
    if (type === 'RESTDataAdapter' || type === 'AutoMaximoDataAdapter' ||
      (this.options.datasources && this.options.datasources[options.name] && this.options.datasources[options.name].data) ) {
      return new JSONDataAdapter(options);
    }
    return da;
  }

  onNewDatasourceOptions(options) {
    if (this.options.datasources && this.options.datasources[options.name]) {
      if (!options.query) options.query = {};
      if (this.options.datasources[options.name].data) {
        options.query.src = this.options.datasources[options.name].data;
      }
      if (options.query.src && options.query.src.member) {
        options.items = 'member';
      }
      if (
        options.query.src &&
        options.query.src.responseInfo &&
        options.query.src.responseInfo.schema
      ) {
        options.schema = 'responseInfo.schema';
      }
    }

    if (!options.query.src) {
      options.query.src = [];
    }

    return options;
  }

  applyEventSpies(ob, spies) {
    if (spies) {
      Object.keys(spies).forEach(s => {
        ob.on(s, spies[s]);
      });
    }
  }

  onNewDatasource(ds, da, options) {
    if (this.options.datasources && this.options.datasources[options.name]) {
      this.applyEventSpies(
        ds,
        this.options.datasources[options.name].eventSpies
      );
    }
    return ds;
  }
}

/**
 * Creates a new test stub that when called will initialize the applications.
 *
 * @example <caption>Create and initialize a new test app</caption>
 * let initializeApp = newTestStub({currentPage: 'page3'});
 * let app = await inializeApp();
 *
 * @param {TestInitOptions} options - Test options.
 * @param {number} options.logLevel - Set the log level. -1 is off, 0 is error, 5 is trace.
 * @param {string} options.currenPage - Initialize to the given page name.
 * @param {Datasources} datasources - Datasource configuration
 * @param {DatasourceConfig} datasources.dsname - Datasource configuration for datasource 'dsname'
 * @param {DatasourceData} datasources.dsname.data - Datasource data for datasource 'dsname'
 * @param {DatasourceSpies} datasources.dsname.eventSpies - Event spies for datasource 'dsname'
 * @param {Function} onNewPlatform - Called after the Platform object is created.
 * @param {Function} onNewAppOptions - Called after the Application options are created and before the Application is created.
 * @param {Function} onNewLookupOptions - alled after the Lookup options is created and before the Lookups are created
 * @param {Function} onNewApp - Called after the Application has been created and before it is initialized.
 * @param {Function} onNewState - Called when new default state is created for application, page, dialog and datasources
 * @param {Function} onNewController - Called after a controller has been created and before it is registered with an owner.
 * @param {Function} onNewPageOptions - Called after the page options are created and before the page is created.
 * @param {Function} onNewPage - Called after the page has been created and before it has been initialized.
 * @param {Function} onNewDatasourceOptions - Called with the datasource options and before the datasource has been created.
 * @param {Function} onNewDataAdapter - Called with the DataAdapter instance and before the Datasource is created.
 * @param {Function} onNewDatasource - Called after the Datasource has been created and before it has been registered with a page/app/dialog.
 * @param {Function} onNewDialogOptions - Called with the dialog options and before the dialog is created.
 * @param {Function} onNewDialog - Called with the Dialog instance and before it is registered with a page/app.
 * @returns {Function} A Promise that when called will initialize the test application.
 */
// istanbul ignore next
export function newTestStub(options = {}) {
  // turn off logging until it is turned on
  const {log: testLog} = require('@maximo/maximo-js-api');
  testLog.level = -1;

  // stub out xml http request
  window.XMLHttpRequest = {
    open: url => {},
    send: () => {}
  };
  global.XMLHttpRequest = window.XMLHttpRequest;

  // create the app stub
  let resp = {};
  let bootstrap = new TestBootstrapInspector(options);

  // wire up bootstrap methods.
  Object.keys(options).filter(k => k.startsWith('onNew')).forEach(k => {
    bootstrap.wrap(k, options[k]);
  });

  resp.initializeApp = async (args) => {
    if (args) throw new Error('initializeApp does not accept parameters.  Perhaps you mean to pass them to newTestStub instead.');
    let app = await appInitialize(() => {}, bootstrap);
    if (options.currentPage) {
      app.currentPage = app.findPage(options.currentPage);
    }
    await app.initialize();
    return app;
  };
  return resp.initializeApp;
}

export default newTestStub;
      