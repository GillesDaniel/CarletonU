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


    import React, { Component, useEffect, useState } from 'react';
    import {observer, Provider, inject} from 'mobx-react';

    import { Datasource } from '@maximo/maximo-js-api';
import { JSONDataAdapter } from '@maximo/maximo-js-api';
import { Observer } from 'mobx-react';
import { PageHeaderTemplate } from '@maximo/react-components';
import { Dropdown } from '@maximo/react-components';
import { UpdateOnChange } from '@maximo/react-components';
import { MenuButton } from '@maximo/react-components';
import { MenuItem } from '@maximo/react-components';
import { Link } from '@maximo/react-components';
import { Dialog } from '@maximo/maximo-js-api';
import { TagGroup } from '@maximo/react-components';
import { Application } from '@maximo/maximo-js-api';
import { PlatformFactory } from '@maximo/maximo-js-api';
import { LookupManager } from '@maximo/maximo-js-api';
import { Browser } from '@maximo/maximo-js-api';
import { Application as MXApplication } from '@maximo/react-components';
import { Shell as MXShell } from '@maximo/react-components';
import { BootstrapInspector } from '@maximo/maximo-js-api';
import { Page } from '@maximo/maximo-js-api';
import AppController from './AppController';
import PagesPages from './PagesPages';
import PageSchedule from './PageSchedule';
import ScheduleTableController from './ScheduleTableController';
import ScheduleTablePageController from './ScheduleTablePageController';
import IncludeEk32v from './IncludeEk32v';
import PageScheduleDetails from './PageScheduleDetails';
import ScheduleDetailsController from './ScheduleDetailsController';
import ScheduleDetailsPageController from './ScheduleDetailsPageController';
import ButtonGroupV7n9mComponent from './ButtonGroupV7n9mComponent';
import IncludeEf32v from './IncludeEf32v';
import SlidingDrawerDetailsSlidingDrawer from './SlidingDrawerDetailsSlidingDrawer';
import DialogPublishingInProgressDialog from './DialogPublishingInProgressDialog';
import DialogPublishScheduleDialog from './DialogPublishScheduleDialog';
import DialogOptimizeScheduleWithoutSavingDialog from './DialogOptimizeScheduleWithoutSavingDialog';
import DialogOptimizeScheduleDialog from './DialogOptimizeScheduleDialog';
import OptimizeDialogController from './OptimizeDialogController';
import PageOptimizeSchedule from './PageOptimizeSchedule';
import OptimizeSchedulePageController from './OptimizeSchedulePageController';
import ButtonGroupQg93nComponent from './ButtonGroupQg93nComponent';
import ButtonGroupWg5q4Component from './ButtonGroupWg5q4Component';
import ButtonGroupNmnpjComponent from './ButtonGroupNmnpjComponent';
import IncludeAbwgj from './IncludeAbwgj';
import DialogOptimizationProgressLog from './DialogOptimizationProgressLog';
    
let customLookups = {};

    // our main generated App
    let AppSchedulingdashboard = observer(props => {
            if (!props.app) {
              // still waiting to initialize...
              return '';
            }
            const app = props.app;
            const eventManager = app;

            return (
              <MXShell app={app} initialized={app?.state?.initializationComplete} id="schedulingdashboard-shell">
                <Observer>
                {()=>{
                  
                  return (
                    <MXApplication id={"schedulingdashboard"} productName={app.getLocalizedLabel("schedulingdashboard_product-name", "Maximo Application Suite")} version={"9.0.0.0"} loadingTitle={"Loading application"} theme={"default"} userMenuEnabled={true} masMultiWorkspace={true} hasSearch={true} recentLinks={true} datacomponenttype={"maximo-application"} datacomponentoriginalid={"schedulingdashboard"} applicationName={"Manage"}
                      type={app.options.type}
                      app={app}
                      
                      
                      
                      
                      currentRoute={app.state.currentPageName}
                      currentApplication={app.state.currentApplication}
                      changeApplication={app.changeApplication.bind(app)}
                      
                      
                      
                      
                      
                      
                      idleConfiguration={{}}
                      getRoutesForApplication={app.getRoutesForApplication.bind(app)}>
                        <Observer>
                        {()=>{
                          return (
                            <>
                              <PagesPages app ={app}/>

                            </>
                          );
                        }}
                        </Observer>
                    </MXApplication>
                  );
                }}
                </Observer>
              </MXShell>
            )
        });


    // inject 'app' and make it observable
    AppSchedulingdashboard = inject('app')(AppSchedulingdashboard);

    
  const componentDidMount = async (setAppInst, bootstrapInspector) => {
    
    if (!bootstrapInspector) {
      bootstrapInspector = new BootstrapInspector();
    }
    // Create the Application
    let appOptions = {
      platform: 'browser',
      logLevel: 0,
      name: "schedulingdashboard",
      type: "",
      theme: "default",
      isMaximoApp: true,
      masEnabled: true,
      
      labels: {},
      defaultMessages: {"schedule_issue_title_text":"{0} Task {1}","duration_label":"{0} days","schedule_type_label_auto_publish":"Auto publish","schedule_type_label_auto_optimize":"Auto optimize","schedule_type_label_manual":"Manual","activities_refresh_success":"Record has been refreshed","activities_refresh_failure":"Failed to refresh","activities_save_success":"Record has been saved","activities_save_error":"Failed to save record","optimization_success":"Optimization started for {0} schedule","optimization_failure":"Failed to optimize","optimization_params_save_error":"Failed to save optimizer parameters","optimization_stop_success":"Optimization stopped for {0} schedule","optimization_stop_failure":"Failed to stop optimization","optimize_dialog_update_cron_option":"Update cron task settings with these values","publish_schedule_success":"You have successfully published the {0} schedule","publish_schedule_failure":"Failed to publish"},
      messageGroups: 'viewmanager',
      systemProps: [],
      hasCustomizations: false,
      forceJsonLocalizer: undefined,
      useBrowserRouter: false,
      hideMaximoMenus: false,
      sigoptions: {},
      walkmeConfig: {"domains":[{"baseDomain":"ivt.suite.maximo.com","url":"https://cdn.walkme.com/users/b4036cc68bbc42928888cc504fd8450d/test/walkme_b4036cc68bbc42928888cc504fd8450d_https.js"},{"baseDomain":"fyre.ibm.com","url":"https://cdn.walkme.com/users/b4036cc68bbc42928888cc504fd8450d/test/walkme_b4036cc68bbc42928888cc504fd8450d_https.js"},{"baseDomain":"localhost","url":"https://cdn.walkme.com/users/b4036cc68bbc42928888cc504fd8450d/test/walkme_b4036cc68bbc42928888cc504fd8450d_https.js"}],"defaultUrl":"https://cdn.walkme.com/users/b4036cc68bbc42928888cc504fd8450d/walkme_b4036cc68bbc42928888cc504fd8450d_https.js"}
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
    app.setState(bootstrapInspector.onNewState({}, 'app'));
    setAppInst(app);

    app.registerController(bootstrapInspector.onNewController(new AppController(), 'AppController', app));
    let page;

    
      // setup the 'schedule' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'schedule', clearStack: true, parent: app, route: '/schedule/*', title: app.getLocalizedLabel("schedule_title", "Scheduling dashboard"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"selectedSwitch":0,"selectedDatasource":"mySchedules","firstLogin":false,"previousPage":""}, 'page'), {});

        
              {
                let controller = new ScheduleTablePageController();
                bootstrapInspector.onNewController(controller, 'ScheduleTablePageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - skdprojectDS
                {
                  let options = {
  platform: `browser`,
  name: `skdprojectDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPISKDPROJECT`,
    savedQuery: `MYSCHEDULES`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `skdprojectDS`,
    searchAttributes:     [
`scenarioname`,
`description`,
`createdby`,
`usewith`
    ],
    indexAttributes:     [
`scenarioname`,
`description`,
`createdby`,
`usewith`
    ],
    select: `scenarioname,name,skdprojectid,description,description_longdescription,createdby,usewith,enddateacm,startdateacm,duration,projectscenario.scheduletype--scheduletype,projectscenario.skdpublish--skdpublish,SKDODMERUNLATEST.status--optimizationstatus,SKDODMERUNLATEST.skdodmerunid--skdodmerunid,SKDODMERUNLATEST.endtime--optimizationendtime,lastpublishdate,rel.skdscenrunkpi_allresdata{kpiid}`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `scenarioname`,
      title: (app.getLocalizedLabel("dv5ya_title", "Scenario")),
      searchable: `true`,
      id: `dv5ya`
    },
    {
      name: `name`,
      searchable: `false`,
      id: `jke_3`
    },
    {
      name: `skdprojectid`,
      searchable: `false`,
      id: `bkxx7`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `d2qaw`
    },
    {
      name: `description_longdescription`,
      searchable: `false`,
      id: `qyxay`
    },
    {
      name: `createdby`,
      searchable: `true`,
      id: `vvd2m`
    },
    {
      name: `usewith`,
      searchable: `true`,
      id: `dj37k`
    },
    {
      name: `enddateacm`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `nwzg3`
    },
    {
      name: `startdateacm`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `bqagk`
    },
    {
      name: `duration`,
      searchable: `false`,
      id: `cccqp`
    },
    {
      name: `computedDuration`,
      'computed-function': `getDurationString`,
      searchable: `false`,
      id: `xyxgk`,
      computed: (true),
      local: (true)
    },
    {
      name: `projectscenario.scheduletype--scheduletype`,
      searchable: `false`,
      id: `xyyyz`
    },
    {
      name: `projectscenario.skdpublish--skdpublish`,
      searchable: `false`,
      id: `ja3vj`
    },
    {
      name: `ScheduleTypeLabel`,
      'computed-function': `getScheduleTypeLabel`,
      searchable: `false`,
      id: `x_kp4`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusIcon`,
      'computed-function': `getRunStatusIcon`,
      searchable: `false`,
      id: `d85b_`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusLabel`,
      'computed-function': `getRunStatusLabel`,
      searchable: `false`,
      id: `wq4pz`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusTime`,
      'computed-function': `getRunStatusTime`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `wq4py`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusIconColour`,
      'computed-function': `getRunStatusIconColour`,
      searchable: `false`,
      id: `v3pej`,
      computed: (true),
      local: (true)
    },
    {
      name: `SKDODMERUNLATEST.status--optimizationstatus`,
      searchable: `false`,
      id: `j589g`
    },
    {
      name: `SKDODMERUNLATEST.skdodmerunid--skdodmerunid`,
      searchable: `false`,
      id: `mj63a`
    },
    {
      name: `SKDODMERUNLATEST.endtime--optimizationendtime`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `v67_g`
    },
    {
      name: `unscheduled`,
      'computed-function': `getUnscheduledTaskCount`,
      type: `NUMBER`,
      'sub-type': `INTEGER`,
      searchable: `false`,
      id: `qr89e`,
      computed: (true),
      local: (true)
    },
    {
      name: `lastpublishdate`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `v23_z`
    },
    {
      name: `rel.skdscenrunkpi_allresdata{kpiid}`,
      searchable: `false`,
      id: `ep8jz`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedDuration:     {
      computedFunction: ((item, datasource) => datasource.callController('getDurationString', item))
    },
    ScheduleTypeLabel:     {
      computedFunction: ((item, datasource) => datasource.callController('getScheduleTypeLabel', item))
    },
    RunStatusIcon:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusIcon', item))
    },
    RunStatusLabel:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusLabel', item))
    },
    RunStatusTime:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusTime', item))
    },
    RunStatusIconColour:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusIconColour', item))
    },
    unscheduled:     {
      computedFunction: ((item, datasource) => datasource.callController('getUnscheduledTaskCount', item))
    }
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleTableController();
bootstrapInspector.onNewController(controller, 'ScheduleTableController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdprojectDS

                

                // begin datasource - mySchedules
                {
                  let options = {
  platform: `browser`,
  name: `mySchedules`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    savedQuery: `MYSCHEDULES`,
    select: ("scenarioname,name,skdprojectid,description,description_longdescription,createdby,usewith,enddateacm,startdateacm,duration,projectscenario.scheduletype--scheduletype,projectscenario.skdpublish--skdpublish,SKDODMERUNLATEST.status--optimizationstatus,SKDODMERUNLATEST.skdodmerunid--skdodmerunid,SKDODMERUNLATEST.endtime--optimizationendtime,lastpublishdate,rel.skdscenrunkpi_allresdata{kpiid}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`scenarioname`,
`description`,
`createdby`,
`usewith`
    ],
    selectionMode: `single`,
    objectStructure: `MXAPISKDPROJECT`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `skdprojectDS`,
    indexAttributes:     [
`scenarioname`,
`description`,
`createdby`,
`usewith`
    ]
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `scenarioname`,
      title: (app.getLocalizedLabel("dv5ya_title", "Scenario")),
      searchable: `true`,
      id: `dv5ya`
    },
    {
      name: `name`,
      searchable: `false`,
      id: `jke_3`
    },
    {
      name: `skdprojectid`,
      searchable: `false`,
      id: `bkxx7`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `d2qaw`
    },
    {
      name: `description_longdescription`,
      searchable: `false`,
      id: `qyxay`
    },
    {
      name: `createdby`,
      searchable: `true`,
      id: `vvd2m`
    },
    {
      name: `usewith`,
      searchable: `true`,
      id: `dj37k`
    },
    {
      name: `enddateacm`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `nwzg3`
    },
    {
      name: `startdateacm`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `bqagk`
    },
    {
      name: `duration`,
      searchable: `false`,
      id: `cccqp`
    },
    {
      name: `computedDuration`,
      'computed-function': `getDurationString`,
      searchable: `false`,
      id: `xyxgk`,
      computed: (true),
      local: (true)
    },
    {
      name: `projectscenario.scheduletype--scheduletype`,
      searchable: `false`,
      id: `xyyyz`
    },
    {
      name: `projectscenario.skdpublish--skdpublish`,
      searchable: `false`,
      id: `ja3vj`
    },
    {
      name: `ScheduleTypeLabel`,
      'computed-function': `getScheduleTypeLabel`,
      searchable: `false`,
      id: `x_kp4`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusIcon`,
      'computed-function': `getRunStatusIcon`,
      searchable: `false`,
      id: `d85b_`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusLabel`,
      'computed-function': `getRunStatusLabel`,
      searchable: `false`,
      id: `wq4pz`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusTime`,
      'computed-function': `getRunStatusTime`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `wq4py`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusIconColour`,
      'computed-function': `getRunStatusIconColour`,
      searchable: `false`,
      id: `v3pej`,
      computed: (true),
      local: (true)
    },
    {
      name: `SKDODMERUNLATEST.status--optimizationstatus`,
      searchable: `false`,
      id: `j589g`
    },
    {
      name: `SKDODMERUNLATEST.skdodmerunid--skdodmerunid`,
      searchable: `false`,
      id: `mj63a`
    },
    {
      name: `SKDODMERUNLATEST.endtime--optimizationendtime`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `v67_g`
    },
    {
      name: `unscheduled`,
      'computed-function': `getUnscheduledTaskCount`,
      type: `NUMBER`,
      'sub-type': `INTEGER`,
      searchable: `false`,
      id: `qr89e`,
      computed: (true),
      local: (true)
    },
    {
      name: `lastpublishdate`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `v23_z`
    },
    {
      name: `rel.skdscenrunkpi_allresdata{kpiid}`,
      searchable: `false`,
      id: `ep8jz`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectDS`,
  computedFields:   {
    computedDuration:     {
      computedFunction: ((item, datasource) => datasource.callController('getDurationString', item))
    },
    ScheduleTypeLabel:     {
      computedFunction: ((item, datasource) => datasource.callController('getScheduleTypeLabel', item))
    },
    RunStatusIcon:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusIcon', item))
    },
    RunStatusLabel:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusLabel', item))
    },
    RunStatusTime:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusTime', item))
    },
    RunStatusIconColour:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusIconColour', item))
    },
    unscheduled:     {
      computedFunction: ((item, datasource) => datasource.callController('getUnscheduledTaskCount', item))
    }
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
  autoinitwf: false,
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleTableController();
bootstrapInspector.onNewController(controller, 'ScheduleTableController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - mySchedules

                

                // begin datasource - myCommitSchedules
                {
                  let options = {
  platform: `browser`,
  name: `myCommitSchedules`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    savedQuery: `MYCOMMITSCHEDULES`,
    select: ("scenarioname,name,skdprojectid,description,description_longdescription,createdby,usewith,enddateacm,startdateacm,duration,projectscenario.scheduletype--scheduletype,projectscenario.skdpublish--skdpublish,SKDODMERUNLATEST.status--optimizationstatus,SKDODMERUNLATEST.skdodmerunid--skdodmerunid,SKDODMERUNLATEST.endtime--optimizationendtime,lastpublishdate,rel.skdscenrunkpi_allresdata{kpiid}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`scenarioname`,
`description`,
`createdby`,
`usewith`
    ],
    selectionMode: `single`,
    objectStructure: `MXAPISKDPROJECT`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `skdprojectDS`,
    indexAttributes:     [
`scenarioname`,
`description`,
`createdby`,
`usewith`
    ]
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `scenarioname`,
      title: (app.getLocalizedLabel("dv5ya_title", "Scenario")),
      searchable: `true`,
      id: `dv5ya`
    },
    {
      name: `name`,
      searchable: `false`,
      id: `jke_3`
    },
    {
      name: `skdprojectid`,
      searchable: `false`,
      id: `bkxx7`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `d2qaw`
    },
    {
      name: `description_longdescription`,
      searchable: `false`,
      id: `qyxay`
    },
    {
      name: `createdby`,
      searchable: `true`,
      id: `vvd2m`
    },
    {
      name: `usewith`,
      searchable: `true`,
      id: `dj37k`
    },
    {
      name: `enddateacm`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `nwzg3`
    },
    {
      name: `startdateacm`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `bqagk`
    },
    {
      name: `duration`,
      searchable: `false`,
      id: `cccqp`
    },
    {
      name: `computedDuration`,
      'computed-function': `getDurationString`,
      searchable: `false`,
      id: `xyxgk`,
      computed: (true),
      local: (true)
    },
    {
      name: `projectscenario.scheduletype--scheduletype`,
      searchable: `false`,
      id: `xyyyz`
    },
    {
      name: `projectscenario.skdpublish--skdpublish`,
      searchable: `false`,
      id: `ja3vj`
    },
    {
      name: `ScheduleTypeLabel`,
      'computed-function': `getScheduleTypeLabel`,
      searchable: `false`,
      id: `x_kp4`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusIcon`,
      'computed-function': `getRunStatusIcon`,
      searchable: `false`,
      id: `d85b_`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusLabel`,
      'computed-function': `getRunStatusLabel`,
      searchable: `false`,
      id: `wq4pz`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusTime`,
      'computed-function': `getRunStatusTime`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `wq4py`,
      computed: (true),
      local: (true)
    },
    {
      name: `RunStatusIconColour`,
      'computed-function': `getRunStatusIconColour`,
      searchable: `false`,
      id: `v3pej`,
      computed: (true),
      local: (true)
    },
    {
      name: `SKDODMERUNLATEST.status--optimizationstatus`,
      searchable: `false`,
      id: `j589g`
    },
    {
      name: `SKDODMERUNLATEST.skdodmerunid--skdodmerunid`,
      searchable: `false`,
      id: `mj63a`
    },
    {
      name: `SKDODMERUNLATEST.endtime--optimizationendtime`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `v67_g`
    },
    {
      name: `unscheduled`,
      'computed-function': `getUnscheduledTaskCount`,
      type: `NUMBER`,
      'sub-type': `INTEGER`,
      searchable: `false`,
      id: `qr89e`,
      computed: (true),
      local: (true)
    },
    {
      name: `lastpublishdate`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `v23_z`
    },
    {
      name: `rel.skdscenrunkpi_allresdata{kpiid}`,
      searchable: `false`,
      id: `ep8jz`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectDS`,
  computedFields:   {
    computedDuration:     {
      computedFunction: ((item, datasource) => datasource.callController('getDurationString', item))
    },
    ScheduleTypeLabel:     {
      computedFunction: ((item, datasource) => datasource.callController('getScheduleTypeLabel', item))
    },
    RunStatusIcon:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusIcon', item))
    },
    RunStatusLabel:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusLabel', item))
    },
    RunStatusTime:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusTime', item))
    },
    RunStatusIconColour:     {
      computedFunction: ((item, datasource) => datasource.callController('getRunStatusIconColour', item))
    },
    unscheduled:     {
      computedFunction: ((item, datasource) => datasource.callController('getUnscheduledTaskCount', item))
    }
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
  autoinitwf: false,
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleTableController();
bootstrapInspector.onNewController(controller, 'ScheduleTableController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - myCommitSchedules

                

                // begin datasource - skdodmerunDS
                {
                  let options = {
  platform: `browser`,
  name: `skdodmerunDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    objectStructure: `MXAPISKDODMERUN`,
    savedQuery: `LATESTRUNS`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `skdodmerunDS`,
    select: `skdodmerunid,rel.SKDSCENARIORUNKPI_RUN_GLOBAL{kpiid,kpivalue,kpidimension}`
  },
  objectStructure: `MXAPISKDODMERUN`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `skdodmerunid`,
      id: `ykw3g`
    },
    {
      name: `rel.SKDSCENARIORUNKPI_RUN_GLOBAL{kpiid,kpivalue,kpidimension}`,
      id: `vmxvx`
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdodmerunDS

                

                // begin datasource - jdashboardKPIds
                {
                  let options = {
  name: `jdashboardKPIds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `unperformedTasks`,
      id: `g5_eq`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `unperformedTasks`,
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
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - jdashboardKPIds

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'scheduleDetails' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'scheduleDetails', clearStack: false, parent: app, route: '/scheduleDetails/*', title: app.getLocalizedLabel("scheduleDetails_title", "Schedule Details"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"selectedTab":1,"useConfirmDialog":true,"startTime":"","timeSpan":"14","resourceid":""}, 'page'), {});

        
              {
                let controller = new ScheduleDetailsPageController();
                bootstrapInspector.onNewController(controller, 'ScheduleDetailsPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - skdprojActivityDS
                {
                  let options = {
  platform: `browser`,
  name: `skdprojActivityDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `none`,
    where: (`skdprojectid=${page.params.projectid}`),
    objectStructure: `MXAPISKDPROJACTIVITY`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `skdprojActivityDS`,
    select: `name--projectname`
  },
  objectStructure: `MXAPISKDPROJACTIVITY`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `name--projectname`,
      searchable: `false`,
      id: `q2bmn`
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
      lastValue: (`skdprojectid=${page.params.projectid}`),
      check: (()=>{return `skdprojectid=${page.params.projectid}`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdprojActivityDS

                

                // begin datasource - skdactivityDS
                {
                  let options = {
  platform: `browser`,
  name: `skdactivityDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `SKDACTIVITY`,
    objectName: `SKDACTIVITY`,
    selectionMode: `none`,
    select: `id,name,skdprojectid,initialized,duration,sneconstraint,fnlconstraint,wopriority,interruptible,endtime,starttime`,
    dependsOn: `skdprojActivityDS`
  },
  objectStructure: `MXAPISKDPROJACTIVITY`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `id`,
      searchable: `false`,
      id: `k37zg`
    },
    {
      name: `name`,
      searchable: `false`,
      id: `xjjy3`
    },
    {
      name: `skdprojectid`,
      searchable: `false`,
      id: `npx4m`
    },
    {
      name: `initialized`,
      id: `zw65_`
    },
    {
      name: `duration`,
      searchable: `false`,
      id: `n2gj9`
    },
    {
      name: `sneconstraint`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `qq4zx`
    },
    {
      name: `fnlconstraint`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `kzxvr`
    },
    {
      name: `wopriority`,
      searchable: `false`,
      id: `gx_z8`
    },
    {
      name: `interruptible`,
      type: `BOOL`,
      searchable: `false`,
      id: `b9j_2`
    },
    {
      name: `endtime`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `w3pkd`
    },
    {
      name: `starttime`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `jw4yj`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojActivityDS`,
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDetailsController();
bootstrapInspector.onNewController(controller, 'ScheduleDetailsController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdactivityDS

                

                // begin datasource - skdprojectsDS
                {
                  let options = {
  platform: `browser`,
  name: `skdprojectsDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `none`,
    objectStructure: `MXAPISKDPROJECT`,
    savedQuery: `MYSCHEDULES`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `skdprojectsDS`,
    select: `skdactivityunscheduled.id--id,name--projectname,skdactivityunscheduled.name--name,skdactivityunscheduled.duration--duration,skdactivityunscheduled.sneconstraint--sne,skdactivityunscheduled.fnlconstraint--fnl,skdactivityunscheduled.wopriority--priority,skdactivityunscheduled.interruptible--interruptible,SKDODMERUNLATEST.skdodmerunid,SKDODMERUNLATEST.endtime--optimizationendtime,lastpublishdate`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `skdactivityunscheduled.id--id`,
      searchable: `false`,
      id: `jke_4`
    },
    {
      name: `name--projectname`,
      searchable: `false`,
      id: `jz293`
    },
    {
      name: `skdactivityunscheduled.name--name`,
      searchable: `false`,
      id: `bkxx9`
    },
    {
      name: `skdactivityunscheduled.duration--duration`,
      searchable: `false`,
      id: `bjjt6`
    },
    {
      name: `skdactivityunscheduled.sneconstraint--sne`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `jke_5`
    },
    {
      name: `skdactivityunscheduled.fnlconstraint--fnl`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `bkyy8`
    },
    {
      name: `skdactivityunscheduled.wopriority--priority`,
      searchable: `false`,
      id: `bjjt3`
    },
    {
      name: `skdactivityunscheduled.interruptible--interruptible`,
      type: `BOOL`,
      searchable: `false`,
      id: `bxsda`
    },
    {
      name: `SKDODMERUNLATEST.skdodmerunid`,
      id: `ygwa5`
    },
    {
      name: `SKDODMERUNLATEST.endtime--optimizationendtime`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `qyqbj`
    },
    {
      name: `lastpublishdate`,
      searchable: `false`,
      'sub-type': `DATETIME`,
      type: `STRING`,
      id: `ea_pe`
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdprojectsDS

                

                // begin datasource - skdactivityunscheduledDS
                {
                  let options = {
  platform: `browser`,
  name: `skdactivityunscheduledDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `SKDACTIVITYUNSCHEDULED`,
    objectName: `SKDACTIVITY`,
    selectionMode: `none`,
    select: `id,name,skdprojectid,initialized,duration,sneconstraint,fnlconstraint,wopriority,interruptible,intshift,modified,WORKORDER.wonum--wonum,WORKORDER.wogroup--wogroup,WORKORDER.taskid--taskid,rel.schedulingerrors{reasoncode,taskname,valmsg,reasoncodedescription,skdodmerunid}`,
    dependsOn: `skdprojectsDS`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `id`,
      searchable: `false`,
      id: `mm566`
    },
    {
      name: `name`,
      searchable: `false`,
      id: `yzgap`
    },
    {
      name: `skdprojectid`,
      searchable: `false`,
      id: `zx5vx`
    },
    {
      name: `initialized`,
      id: `kpk8b`
    },
    {
      name: `duration`,
      searchable: `false`,
      id: `p7wjj`
    },
    {
      name: `sneconstraint`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `n266y`
    },
    {
      name: `fnlconstraint`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `kyer2`
    },
    {
      name: `wopriority`,
      searchable: `false`,
      id: `w_p_n`
    },
    {
      name: `interruptible`,
      type: `BOOL`,
      searchable: `false`,
      id: `zreqa`
    },
    {
      name: `intshift`,
      type: `STRING`,
      searchable: `false`,
      id: `q8rmn`
    },
    {
      name: `modified`,
      searchable: `false`,
      id: `jwmg6`
    },
    {
      name: `WORKORDER.wonum--wonum`,
      searchable: `false`,
      id: `xqpz4`
    },
    {
      name: `WORKORDER.wogroup--wogroup`,
      searchable: `false`,
      id: `rkwb6`
    },
    {
      name: `WORKORDER.taskid--taskid`,
      searchable: `false`,
      id: `dmzwb`
    },
    {
      name: `rel.schedulingerrors{reasoncode,taskname,valmsg,reasoncodedescription,skdodmerunid}`,
      searchable: `false`,
      id: `dpe6n`
    },
    {
      name: `computedIssueIcon`,
      'computed-function': `computedIssueIcon`,
      id: `zmx57`,
      computed: (true),
      local: (true)
    },
    {
      name: `hideIssuesSpacing`,
      'computed-function': `hideIssuesSpacing`,
      id: `nexx8`,
      computed: (true),
      local: (true)
    },
    {
      name: `computeIssueTitleString`,
      'computed-function': `getIssueTitleString`,
      id: `gmz8_`,
      computed: (true),
      local: (true)
    },
    {
      name: `computeChanged`,
      computed: (true),
      id: `gvb5n`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectsDS`,
  computedFields:   {
    computedIssueIcon:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIssueIcon', item))
    },
    hideIssuesSpacing:     {
      computedFunction: ((item, datasource) => datasource.callController('hideIssuesSpacing', item))
    },
    computeIssueTitleString:     {
      computedFunction: ((item, datasource) => datasource.callController('getIssueTitleString', item))
    }
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDetailsController();
bootstrapInspector.onNewController(controller, 'ScheduleDetailsController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdactivityunscheduledDS

                

                // begin datasource - resourceLoadTableds
                {
                  let options = {
  platform: `browser`,
  name: `resourceLoadTableds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `SKDRESOURCE`,
    orderBy: `objectname asc`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    cacheExpiryMs: 1,
    ctx: (`rlstartTime=${page.state.startTime},rltimeSpan=${page.state.timeSpan}`),
    accumulate: false,
    select: `id,name,skdresourceamcrewt.amcrewtype--resnamecrewtype,resourcecraftinfo.craft--resnamecraft,skdresourcetoolitem.itemnum--resnametoolitem,objectname,refobjtname,initialized,objectid,rel.skdresourceviewday{*}`,
    dependsOn: `skdprojectsDS`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: `id`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `id`,
      'unique-id': `true`,
      id: `vaa2m`
    },
    {
      name: `name`,
      id: `r8kg3`
    },
    {
      name: `skdresourceamcrewt.amcrewtype--resnamecrewtype`,
      id: `bwx8m`
    },
    {
      name: `resourcecraftinfo.craft--resnamecraft`,
      id: `jawpm`
    },
    {
      name: `skdresourcetoolitem.itemnum--resnametoolitem`,
      id: `wek9d`
    },
    {
      name: `resourcename`,
      'computed-function': `getResourceIDString`,
      id: `nw9zg`,
      computed: (true),
      local: (true)
    },
    {
      name: `objectname`,
      id: `bqmgv`
    },
    {
      name: `refobjtname`,
      id: `p8nx9`
    },
    {
      name: `initialized`,
      id: `eeky5`
    },
    {
      name: `objectid`,
      id: `p_qkx`
    },
    {
      name: `rel.skdresourceviewday{*}`,
      id: `qpj7j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectsDS`,
  computedFields:   {
    resourcename:     {
      computedFunction: ((item, datasource) => datasource.callController('getResourceIDString', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [
    {
      name: `ctx`,
      lastValue: (`rlstartTime=${page.state.startTime},rltimeSpan=${page.state.timeSpan}`),
      check: (()=>{return `rlstartTime=${page.state.startTime},rltimeSpan=${page.state.timeSpan}`})
    }
  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDetailsController();
bootstrapInspector.onNewController(controller, 'ScheduleDetailsController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - resourceLoadTableds

                

                // begin datasource - resourceLevelingDs
                {
                  let options = {
  platform: `browser`,
  name: `resourceLevelingDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `SKDRESOURCE`,
    where: (`id="${page.state.resourceid}"`),
    orderBy: `objectname asc`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    cacheExpiryMs: 1,
    ctx: (`rlstartTime=${page.state.startTime},rltimeSpan=${page.state.timeSpan}`),
    accumulate: false,
    select: `id,name,objectname,refobjtname,initialized,objectid,rel.skdresourceviewday{scheduledhrs,resourceid,enddate,load,createddate,skdprojectid,availablehrs,objectname,resourcename,startdate,rel.skdresourceviewday_activity{wopriority,objectname,endtime,starttime,refobjname,interruptible,duration,skdprojectid,name,initialized,objectid,id,status,workorder.wonum--workordernum,sneconstraint,fnlconstraint}}`,
    dependsOn: `skdprojectsDS`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: `id`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `id`,
      'unique-id': `true`,
      id: `gdn9g`
    },
    {
      name: `name`,
      id: `k96xv`
    },
    {
      name: `objectname`,
      id: `bmg22`
    },
    {
      name: `refobjtname`,
      id: `x4eda`
    },
    {
      name: `initialized`,
      id: `dazaa`
    },
    {
      name: `objectid`,
      id: `pp474`
    },
    {
      name: `rel.skdresourceviewday{scheduledhrs,resourceid,enddate,load,createddate,skdprojectid,availablehrs,objectname,resourcename,startdate,rel.skdresourceviewday_activity{wopriority,objectname,endtime,starttime,refobjname,interruptible,duration,skdprojectid,name,initialized,objectid,id,status,workorder.wonum--workordernum,sneconstraint,fnlconstraint}}`,
      id: `vvbm3`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectsDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [
    {
      name: `where`,
      lastValue: (`id="${page.state.resourceid}"`),
      check: (()=>{return `id="${page.state.resourceid}"`})
    },
    {
      name: `ctx`,
      lastValue: (`rlstartTime=${page.state.startTime},rltimeSpan=${page.state.timeSpan}`),
      check: (()=>{return `rlstartTime=${page.state.startTime},rltimeSpan=${page.state.timeSpan}`})
    }
  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - resourceLevelingDs

                

                // begin datasource - resourceTypesDS
                {
                  let options = {
  platform: `browser`,
  name: `resourceTypesDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `SKDRESOURCE`,
    orderBy: `objectname asc`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    cacheExpiryMs: 1,
    accumulate: false,
    select: `id,name,skdresourceamcrewt.amcrewtype--resnamecrewtype,resourcecraftinfo.craft--resnamecraft,skdresourcetoolitem.itemnum--resnametoolitem,objectname`,
    dependsOn: `skdprojectsDS`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: `id`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `id`,
      'unique-id': `true`,
      id: `w6pp2`
    },
    {
      name: `name`,
      id: `aqe3q`
    },
    {
      name: `skdresourceamcrewt.amcrewtype--resnamecrewtype`,
      id: `g5j7x`
    },
    {
      name: `resourcecraftinfo.craft--resnamecraft`,
      id: `xb3xk`
    },
    {
      name: `skdresourcetoolitem.itemnum--resnametoolitem`,
      id: `rq22k`
    },
    {
      name: `resourcename`,
      'computed-function': `getResourceIDString`,
      id: `ev4nm`,
      computed: (true),
      local: (true)
    },
    {
      name: `objectname`,
      id: `jp4er`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectsDS`,
  computedFields:   {
    resourcename:     {
      computedFunction: ((item, datasource) => datasource.callController('getResourceIDString', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDetailsController();
bootstrapInspector.onNewController(controller, 'ScheduleDetailsController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - resourceTypesDS

                

                // begin datasource - skdodmerunlatestDS
                {
                  let options = {
  platform: `browser`,
  name: `skdodmerunlatestDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `SKDODMERUNLATEST`,
    dependsOn: `skdprojectsDS`,
    selectionMode: `none`,
    select: `rel.SKDSCENARIORUNKPI_RUN_GLOBAL{kpiid,kpivalue,kpidimension}`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `rel.SKDSCENARIORUNKPI_RUN_GLOBAL{kpiid,kpivalue,kpidimension}`,
      id: `peeex`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectsDS`,
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdodmerunlatestDS

                

                // begin datasource - skdprojectshiftsDS
                {
                  let options = {
  platform: `browser`,
  name: `skdprojectshiftsDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `SKDPRJSHIFT`,
    select: `shiftnum`,
    dependsOn: `skdprojectsDS`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `shiftnum`,
      searchable: `false`,
      id: `a9re3`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectsDS`,
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdprojectshiftsDS

                

                // begin datasource - skdprojectscenarioDS
                {
                  let options = {
  platform: `browser`,
  name: `skdprojectscenarioDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `PROJECTSCENARIO`,
    where: `optscenario="RESLEVEL"`,
    objectName: `SKDPROJECTSCENARIO`,
    dependsOn: `skdprojectsDS`,
    selectionMode: `none`,
    select: `inputname,inputobj,inputobjid,optscenario,projectname,SKDRESLEVELPARAM{*}`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `inputname`,
      id: `zrrav`
    },
    {
      name: `inputobj`,
      id: `kpvrz`
    },
    {
      name: `inputobjid`,
      id: `z8prg`
    },
    {
      name: `optscenario`,
      id: `mb_8j`
    },
    {
      name: `projectname`,
      id: `ye4j3`
    },
    {
      name: `SKDRESLEVELPARAM{*}`,
      id: `e88d7`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectsDS`,
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdprojectscenarioDS

                

                // begin datasource - jglobalKPIds
                {
                  let options = {
  name: `jglobalKPIds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `unperformedTasks`,
      id: `em86n`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `unperformedTasks`,
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
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - jglobalKPIds

                

                // begin datasource - jresourceLevelingTaskDS
                {
                  let options = {
  name: `jresourceLevelingTaskDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `name`,
      id: `y2jy4`
    },
    {
      name: `duration`,
      type: `NUMBER`,
      'sub-type': `DURATION`,
      searchable: `false`,
      id: `gk2g2`
    },
    {
      name: `sneconstraint`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `beakq`
    },
    {
      name: `fnlconstraint`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `z9ypv`
    },
    {
      name: `wopriority`,
      type: `NUMBER`,
      'sub-type': `INTEGER`,
      searchable: `false`,
      id: `ebz5g`
    },
    {
      name: `interruptible`,
      type: `BOOL`,
      searchable: `false`,
      id: `w2w8k`
    },
    {
      name: `starttime`,
      type: `STRING`,
      'sub-type': `DATETIME`,
      searchable: `false`,
      id: `pnp5p`
    },
    {
      name: `status`,
      searchable: `false`,
      id: `q7emx`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `name,duration,sneconstraint,fnlconstraint,wopriority,interruptible,starttime,status`,
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
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - jresourceLevelingTaskDS

                
          
                // begin dialog - detailsSlidingDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `detailsSlidingDrawer`,
  configuration:   {
    id: `detailsSlidingDrawer`,
    type: `slidingDrawer`,
    align: `end`,
    renderer: ((props => {
    return (
      <SlidingDrawerDetailsSlidingDrawer slidingDrawerProps={props} id={"detailsSlidingDrawer_slidingdrawer_container"}  />
    );
  })
  ),
    appResolver: (() => app)
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  page.registerDialog(dialog);
                }
                // end dialog - detailsSlidingDrawer
                

                // begin dialog - publishingInProgressDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `publishingInProgressDialog`,
  configuration:   {
    id: `publishingInProgressDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogPublishingInProgressDialog id={"publishingInProgressDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - publishingInProgressDialog
                

                // begin dialog - publishScheduleDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `publishScheduleDialog`,
  configuration:   {
    id: `publishScheduleDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogPublishScheduleDialog id={"publishScheduleDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - publishScheduleDialog
                

                // begin dialog - optimizeScheduleWithoutSavingDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `optimizeScheduleWithoutSavingDialog`,
  configuration:   {
    id: `optimizeScheduleWithoutSavingDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogOptimizeScheduleWithoutSavingDialog id={"optimizeScheduleWithoutSavingDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - optimizeScheduleWithoutSavingDialog
                

                // begin dialog - optimizeScheduleDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `optimizeScheduleDialog`,
  configuration:   {
    id: `optimizeScheduleDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogOptimizeScheduleDialog id={"optimizeScheduleDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new OptimizeDialogController();
          bootstrapInspector.onNewController(controller, 'OptimizeDialogController', dialog);
        dialog.registerController(controller);
                  page.registerDialog(dialog);
                }
                // end dialog - optimizeScheduleDialog
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'optimizeSchedule' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'optimizeSchedule', clearStack: false, parent: app, route: '/optimizeSchedule/*', title: app.getLocalizedLabel("optimizeSchedule_title", "Optimize schedule"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new OptimizeSchedulePageController();
                bootstrapInspector.onNewController(controller, 'OptimizeSchedulePageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - skdprojectForOptimizeDS
                {
                  let options = {
  platform: `browser`,
  name: `skdprojectForOptimizeDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `none`,
    objectStructure: `MXAPISKDPROJECT`,
    savedQuery: `MYSCHEDULES`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `skdprojectForOptimizeDS`,
    select: `name--projectname,id`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `name--projectname`,
      searchable: `false`,
      id: `x327z`
    },
    {
      name: `id`,
      searchable: `false`,
      id: `zawny`
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdprojectForOptimizeDS

                

                // begin datasource - skdactivityForOptimizeDS
                {
                  let options = {
  platform: `browser`,
  name: `skdactivityForOptimizeDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `SKDACTIVITYUNSCHEDULED`,
    objectName: `SKDACTIVITY`,
    selectionMode: `none`,
    select: `id`,
    dependsOn: `skdprojectForOptimizeDS`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `id`,
      searchable: `false`,
      id: `pmw7n`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectForOptimizeDS`,
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDetailsController();
bootstrapInspector.onNewController(controller, 'ScheduleDetailsController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdactivityForOptimizeDS

                

                // begin datasource - skdodmerunForOptimizeDS
                {
                  let options = {
  platform: `browser`,
  name: `skdodmerunForOptimizeDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `SKDODMERUNLATEST`,
    dependsOn: `skdprojectForOptimizeDS`,
    selectionMode: `none`,
    select: `status--optimizationstatus,rel.SKDOPASCPSSTATUS{*},rel.SKDOPASCPSKPI{turnaroundtimedays},rel.SKDODMERESOURCESUMMARY{shiftname,skillname,lvl,availablehours,loadhours},rel.SKDOPASCPSALERT{severity,alerttype,message}`
  },
  objectStructure: `MXAPISKDPROJECT`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `status--optimizationstatus`,
      id: `xgryk`
    },
    {
      name: `rel.SKDOPASCPSSTATUS{*}`,
      id: `rybdg`
    },
    {
      name: `rel.SKDOPASCPSKPI{turnaroundtimedays}`,
      id: `gwe4b`
    },
    {
      name: `rel.SKDODMERESOURCESUMMARY{shiftname,skillname,lvl,availablehours,loadhours}`,
      id: `gng28`
    },
    {
      name: `rel.SKDOPASCPSALERT{severity,alerttype,message}`,
      id: `p32r2`
    },
    {
      name: `computeOptimizationStatusTag`,
      'computed-function': `computeOptimizationStatusTag`,
      id: `bz_k3`,
      computed: (true),
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `skdprojectForOptimizeDS`,
  computedFields:   {
    computeOptimizationStatusTag:     {
      computedFunction: ((item, datasource) => datasource.callController('computeOptimizationStatusTag', item))
    }
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
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new OptimizeSchedulePageController();
bootstrapInspector.onNewController(controller, 'OptimizeSchedulePageController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - skdodmerunForOptimizeDS

                

                // begin datasource - jOptimizeAlertsDS
                {
                  let options = {
  name: `jOptimizeAlertsDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `severity`,
      id: `jxqdw`
    },
    {
      name: `alerttype`,
      id: `gp5dz`
    },
    {
      name: `message`,
      id: `rr5by`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `severity,alerttype,message`,
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
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - jOptimizeAlertsDS

                

                // begin datasource - jOptimizeSummaryDS
                {
                  let options = {
  name: `jOptimizeSummaryDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `shiftname`,
      id: `xqz9e`
    },
    {
      name: `skillname`,
      id: `mz4nd`
    },
    {
      name: `lvl`,
      id: `vqedj`
    },
    {
      name: `availablehours`,
      id: `marej`
    },
    {
      name: `loadhours`,
      id: `pv_67`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `shiftname,skillname,lvl,availablehours,loadhours`,
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
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - jOptimizeSummaryDS

                
          
                // begin dialog - optimizationProgressLog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `optimizationProgressLog`,
  configuration:   {
    id: `optimizationProgressLog`,
    dialogRenderer: ((props => {
    return (
      <DialogOptimizationProgressLog id={"optimizationProgressLog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - optimizationProgressLog
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

    app.setRoutesForApplication(() => {return [
  {
    id: `schedule_apjxz`,
    label: (app.getLocalizedLabel("apjxz_label", "Schedule")),
    icon: ("carbon:calendar--heat-map"),
    application: `schedulingdashboard`,
    name: `schedule`,
    hidden: (undefined),
    onClick: ((event)=>{eventManager.emit('change-page', {name: 'schedule' }, event)}),
    page: `schedule`,
    content: (app.getLocalizedLabel("apjxz_label", "Schedule"))
  }
];});
    
    
  
    return app.initialize();
  };
  

    // main loader where the application initialization is wired up.
    const AppLoader = (props => {
        const [appInst, setAppInst] = useState(null);

        useEffect(()=>{
          if (!appInst) {
            componentDidMount(setAppInst);
          } else {
            appInst.appTransitionLogout = true;
            // we are being called due a dev reload
            const doReload = async () => {
              const resp = await appInst.userInteractionManager.ask(
                'Developer Mode - Reload current page?', 8,
                'Changes were detected that should require a full application reload.  Click the "X" to remain on this page, but some things may not function.  Click "Yes" to reload this page.  Click "No" to reload the entire application.');
              if (resp === 'no') {
                Browser.get().reloadEntryPoint();
              } else if (resp === 'yes') {
                window.location.reload();
              } else {
                appInst.log.w('RELOAD', 'Reload aborted by developer', resp);
              }
            };
            doReload();
          }
        },[]);

            return (
                <Provider app={appInst}>
                    <AppSchedulingdashboard app={appInst}/>
                </Provider>
            );
        });


    export default AppLoader;
    
