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
import WorkOrderCreateController from '../WorkOrderCreateController';
import PageController from '../PageController';
import TaskController from '../TaskController';
import RouteWorkflowDialogController from '../RouteWorkflowDialogController';
import WorkOrderDialogController from '../WorkOrderDialogController';
import WorkOrderSummaryController from '../WorkOrderSummaryController';const DialogRouteAssignment = ()=>'';
const DialogUpdateStatus = ()=>'';
const DialogStartWorkflow = ()=>'';
const DialogShow_SelectOwnerDialog = ()=>'';
const DialogReassignItem = ()=>'';
const LookupOpenReassignLookup = ()=>'';
const LookupOpenPersonLookup = ()=>'';
const LookupWorkTypeLookup = ()=>'';
const LookupFailureClassLookup = ()=>'';
const LookupProblemCodeLookup = ()=>'';
const LookupOpenLocationLookup = ()=>'';
const LookupOpenAssetLookup = ()=>'';
const LookupOpenContractLookup = ()=>'';
const LookupOpenJobPlanLookup = ()=>'';
const LookupOpenInspFormLookup = ()=>'';
const LookupOpenInspectorLookup = ()=>'';
const LookupOpenMeasurementPointLookup = ()=>'';
const LookupOpenShiftLookup = ()=>'';
const DialogAddWorklogComment = ()=>'';
const LookupOpenClassificationListLookup = ()=>'';
const DialogOpenClassificationHierarchicalLookup = ()=>'';
const PagesPages = ()=>'';
const PageWolist = ()=>'';
const StackedPanelWgyprComponent = ()=>'';
const PageWOSummaryPage = ()=>'';
const SlidingDrawerAttachmentdrawer = ()=>'';
const SlidingDrawerTaskAttachmentdrawer = ()=>'';
const SlidingDrawerTaskPredecessorsdrawer = ()=>'';
const SlidingDrawerShowWOStatusHistory = ()=>'';
const ProgressWizardN9q62Component = ()=>'';
const StackedPanelStackedpanel_wodetailComponent = ()=>'';
const PageFollowupWorkOrder = ()=>'';
const DialogInspectionFormDlg = ()=>'';
const DialogJobPlanDlg = ()=>'';
const RichTextEditor = ()=>'';
const PageCreateWorkOrder = ()=>'';
const PageLongDescription = ()=>'';
const RichTextViewer = ()=>'';
const PageTaskLongDescription = ()=>'';
const PageCommunicationLog = ()=>'';
const SlidingDrawerCommlogattachmentdrawer = ()=>'';
const PageCreateTask = ()=>'';
const DialogAddCraftCrewTypeDialog = ()=>'';
const DialogAddLaborCrewDialog = ()=>'';
const LookupOpenCraftLookup = ()=>'';
const LookupOpenCrewTypeLookup = ()=>'';
const LookupOpenCrewLookup = ()=>'';
const LookupOpenLaborLookup = ()=>'';
const LookupOpenPersonGroupLookup = ()=>'';
const LookupOpenCrewWorkGroupLookup = ()=>'';
const LookupOpenDialogCrewWorkGroupLookup = ()=>'';
const LookupOpenOwnerWorkGroupLookup = ()=>'';
const DialogDisplayPredecessor = ()=>'';
const StackedPanelW2n54Component = ()=>'';
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
      name: "WOSUMMARY",
      type: "",
      theme: "default",
      isMaximoApp: true,
      masEnabled: true,
      masID: "manage",
      labels: {},
      defaultMessages: {"none":"None","routeMessage":"Assignment was routed.","reassignMessage":"The assignments were reassigned.","summary":"Summary","related_records":"Related Records","wf_assignments":"Worklfow assignments","work_log":"Work log","communication_log":"Communication log","files":"files","file":"file","predecessors":"predecessors","predecessor":"predecessor","save":"Save","create":"Create","updates":"updates","workorders":"Work orders","success":"Success!","error":"Error!","unspecified":"Unspecified","addComment":"Your comment was posted.","statusmap_wonum_notfound":"ERROR:wonum not found while processing status map","statusmap_sysprop_notfound":"ERROR:RBA.WO.STATUSMAP System property not found","statusmap_sysprop_incorrect":"ERROR:System Property value incorrect for {0}","wo_summary_msg":"Work order {0}","wo_task_creation_msg":"Task {0} was created","wo_task_update_msg":"Task was updated successfully.","wo_resource_update_msg":"Work order resources were updated successfully.","attachment":"attachment","attachments":"attachments","woaiaddedmsg":"{0} work orders were added to AI Training model","woairemovededmsg":"{0} work orders were removed from AI Training model","editTask":"Edit task","editResources":"Edit resources","invalidFailureCode":"Enter a valid failure code."},
      messageGroups: 'viewmanager',
      systemProps: [],
      hasCustomizations: false,
      forceJsonLocalizer: undefined,
      useBrowserRouter: false,
      hideMaximoMenus: false,
      sigoptions: {"WOSUMMARY":{"ENABLEWOAITRAINING":1}},
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
    app.setState(bootstrapInspector.onNewState({"woStatSigOptions":"{\"APPR\" : \"APPR\",\"INIT\" : \"INPRG\",\"WSCH\" : \"WSCH\",\"CANCEL\" : \"CAN\",\"CLOSE\" : \"CLOSE\",\"COMP\" : \"COMP\"}","radioGrpAssignmentLabel":"Radio buttons","routeComment":"","acceptComment":"","rejectComment":"","reassignComment":"","memo":"","transactionDate":"","personId":"","hideEarlierMemo":true,"updateStatusComment":"","initiateWorkflowComment":"","dropdownSelectedItemIndex":1,"selectedTabIndex":0,"followupWONUM":"","followupWOUpdated":false,"hideLongDescription":false,"headerTitle":"","hideEarlierStatusMemo":false,"workflowDialogOpened":false,"workflowInitiated":false,"wtLookupPrimaryButtonDisabled":true,"perLookupPrimaryButtonDisabled":true,"fcLookupPrimaryButtonDisabled":true,"pcLookupPrimaryButtonDisabled":true,"assetLookupPrimaryButtonDisabled":true,"locationLookupPrimaryButtonDisabled":true,"insertUserSite":"","dialogIsBusy":false,"longDescription":"","wonum":"","contractLookupPrimaryButtonDisabled":true,"jobPlanLookupPrimaryButtonDisabled":true,"inspFormLookupPrimaryButtonDisabled":true,"classificationTLookupPrimaryButtonDisabled":true,"classificationHLookupPrimaryButtonDisabled":true,"commlogSubject":"","commlogMessage":"","defaultSelection":false,"editWoClickedFlag":false,"woPlanSelectedTabIndex":0,"newTaskNumber":10,"taskid":"0","craftLookupPrimaryButtonDisabled":true,"loborLookupPrimaryButtonDisabled":true,"taskworkorderid":"","editTask":false,"classificationDS":"CLASSIFICATIONLOOKUP","woresources":false,"taskwonum":""}, 'app'));
    setAppInst(app);

    app.registerController(bootstrapInspector.onNewController(new AppController(), 'AppController', app));
    let page;

    
      // setup the 'wolist' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'wolist', clearStack: false, parent: app, route: '/wolist/*', title: app.getLocalizedLabel("wolist_title", "wolist"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"memo":"","showMapOverlay":0,"selectedSwitch":0,"selectedDS":"woMapListDS","mapPaddingBottom":"","mapWorkorderListHeight":false,"mapAssetCardHeight":false,"mapPaddingRight":"","mapPaddingLeft":""}, 'page'), {});

        
              {
                let controller = new PageController();
                bootstrapInspector.onNewController(controller, 'PageController', page);
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
      

      // setup the 'WOSummaryPage' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'WOSummaryPage', clearStack: false, parent: app, route: '/WOSummaryPage/*', title: app.getLocalizedLabel("WOSummaryPage_title", "Summary"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"selected_wodpanel_Index":0,"selected_tab_WOHistory":0,"progress_wizard_current_step_id":"0","progress_wizard_hide_flag":false,"loadWOAIResourceDS":false,"workorderid":-1,"ai_usefortraining":false,"unspecifiedFlag":false}, 'page'), {});

        
              {
                let controller = new PageController();
                bootstrapInspector.onNewController(controller, 'PageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - woDetailResource
                {
                  let options = {
  platform: `browser`,
  name: `woDetailResource`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    dependsOn: `wolistDS`,
    dependentId: (page.params.clickedItemId),
    default: true,
    autoSave: false,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woDetailResource`,
    select: `wonum,description,allowedstates,rel.wostatus{memo,changeby,changedate},statusdate,status,owner,ownerperson.displayname--ownername,ownergroup,schedstart,schedfinish,targstartdate,targcompdate,failurecode,problemcode,glaccount,assetnum,location,pmnum,jpnum,safetyplanid,contract,contractds.description--contractdesc,inspformnum,inspectionform.name,worktype,wopriority--priority,reportedby,parent,worktype.wtypedesc--wtypedescription,asset.description,location.description,pm.description,jobplan.description--jobplandesc,wosafetyplan.safetyplanid,wosafetyplan.description,inspectionform.name,classstructure.description,inspectionresult.resultnum,classstructure.classificationid,classstructure.hierarchypath,doclinks{*},parent.description--parentdesc,asset.geometry,asset._imagelibref,longdescription.ldtext,location.location,uxsynonymdomain.description,workorderid,parent.workorderid--parentworkorderid,supervisor,amcrew,lead,persongroup,owner,ownergroup,commodity,commoditygroup,crewworkgroup`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      id: `v62eb`
    },
    {
      name: `description`,
      id: `xwevz`
    },
    {
      name: `allowedstates`,
      id: `ypypq`
    },
    {
      name: `computedStates`,
      'computed-function': `computedStates`,
      id: `xna23`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.wostatus{memo,changeby,changedate}`,
      id: `egxpj`
    },
    {
      name: `statusdate`,
      id: `rjk74`
    },
    {
      name: `status`,
      id: `z8d9v`
    },
    {
      name: `owner`,
      id: `rkjm5`
    },
    {
      name: `ownerperson.displayname--ownername`,
      id: `gvb7a`
    },
    {
      name: `ownergroup`,
      id: `gm9r_`
    },
    {
      name: `schedstart`,
      id: `b95gr`
    },
    {
      name: `schedfinish`,
      id: `j3756`
    },
    {
      name: `targstartdate`,
      id: `r454n`
    },
    {
      name: `targcompdate`,
      id: `kqdw9`
    },
    {
      name: `failurecode`,
      id: `a8mb2`
    },
    {
      name: `problemcode`,
      aiinuse: `true`,
      id: `vgz_m`
    },
    {
      name: `glaccount`,
      id: `b676q`
    },
    {
      name: `assetnum`,
      id: `wmd4g`
    },
    {
      name: `location`,
      id: `ernjq`
    },
    {
      name: `pmnum`,
      id: `ayr4e`
    },
    {
      name: `jpnum`,
      id: `b99jb`
    },
    {
      name: `safetyplanid`,
      id: `nbw7v`
    },
    {
      name: `contract`,
      id: `vmpkk`
    },
    {
      name: `contractds.description--contractdesc`,
      id: `wn3ba`
    },
    {
      name: `inspformnum`,
      id: `j7z3v`
    },
    {
      name: `inspectionform.name`,
      id: `gbzqj`
    },
    {
      name: `worktype`,
      id: `qmpme`
    },
    {
      name: `wopriority--priority`,
      id: `een5v`
    },
    {
      name: `reportedby`,
      id: `kg62y`
    },
    {
      name: `parent`,
      id: `n_byx`
    },
    {
      name: `worktype.wtypedesc--wtypedescription`,
      id: `bvjrb`
    },
    {
      name: `asset.description`,
      id: `nna25`
    },
    {
      name: `location.description`,
      id: `a9k2q`
    },
    {
      name: `pm.description`,
      id: `dbkq7`
    },
    {
      name: `jobplan.description--jobplandesc`,
      id: `j8kd7`
    },
    {
      name: `wosafetyplan.safetyplanid`,
      id: `qyjgm`
    },
    {
      name: `wosafetyplan.description`,
      id: `mbp3w`
    },
    {
      name: `inspectionform.name`,
      id: `k2q6r`
    },
    {
      name: `classstructure.description`,
      id: `r3qa6`
    },
    {
      name: `inspectionresult.resultnum`,
      id: `dwzmm`
    },
    {
      name: `classstructure.classificationid`,
      id: `ay3e9`
    },
    {
      name: `classstructure.hierarchypath`,
      id: `by969`
    },
    {
      name: `doclinks{*}`,
      id: `e32qm`
    },
    {
      name: `parent.description--parentdesc`,
      id: `zq6vx`
    },
    {
      name: `asset.geometry`,
      id: `jkzxa`
    },
    {
      name: `asset._imagelibref`,
      id: `kavn9`
    },
    {
      name: `longdescription.ldtext`,
      id: `apenb`
    },
    {
      name: `location.location`,
      id: `p2k55`
    },
    {
      name: `uxsynonymdomain.description`,
      id: `agm52`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `kbrm8`
    },
    {
      name: `parent.workorderid--parentworkorderid`,
      id: `nekn_`
    },
    {
      name: `supervisor`,
      id: `x778b`
    },
    {
      name: `amcrew`,
      id: `zrxbj`
    },
    {
      name: `lead`,
      id: `xw6vy`
    },
    {
      name: `persongroup`,
      id: `mxz6z`
    },
    {
      name: `owner`,
      id: `reb6q`
    },
    {
      name: `ownergroup`,
      id: `pe59y`
    },
    {
      name: `commodity`,
      id: `d6g83`
    },
    {
      name: `commoditygroup`,
      id: `dx6v8`
    },
    {
      name: `crewworkgroup`,
      id: `dde9q`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedStates:     {
      computedFunction: ((item, datasource) => datasource.callController('computedStates', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `dependentId`,
      lastValue: (page.params.clickedItemId),
      check: (()=>{return page.params.clickedItemId})
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woDetailResource

                

                // begin datasource - wpLaborDS
                {
                  let options = {
  platform: `browser`,
  name: `wpLaborDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wplabor`,
    dependsOn: `woDetailResource`,
    select: `wplaboruid,craft,crewworkgroup,laborcode,amcrew,amcrewtype,skilllevel,quantity,laborhrs,vendor,laborcode`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wplaboruid`,
      id: `qgazx`
    },
    {
      name: `craft`,
      id: `nkgyx`
    },
    {
      name: `crewworkgroup`,
      id: `ybg4q`
    },
    {
      name: `laborcode`,
      id: `ek_yp`
    },
    {
      name: `amcrew`,
      id: `jwz_8`
    },
    {
      name: `amcrewtype`,
      id: `rw5dk`
    },
    {
      name: `skilllevel`,
      title: (app.getLocalizedLabel("prppg_title", "Skill level")),
      id: `prppg`
    },
    {
      name: `quantity`,
      id: `wwxmp`
    },
    {
      name: `laborhrs`,
      id: `mjb69`
    },
    {
      name: `vendor`,
      id: `qzn2e`
    },
    {
      name: `laborcode`,
      id: `xqd9k`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wpLaborDS

                

                // begin datasource - wpWOMaterialsDS
                {
                  let options = {
  platform: `browser`,
  name: `wpWOMaterialsDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wpmaterial`,
    dependsOn: `woDetailResource`,
    select: `itemnum,itemsetid,description,itemqty,unitcost,linecost,location,directreq`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      id: `rnbzv`
    },
    {
      name: `itemsetid`,
      id: `g4y5r`
    },
    {
      name: `description`,
      id: `mq322`
    },
    {
      name: `itemqty`,
      id: `ngvmg`
    },
    {
      name: `unitcost`,
      title: (app.getLocalizedLabel("z8k7z_title", "Unit cost")),
      id: `z8k7z`
    },
    {
      name: `linecost`,
      title: (app.getLocalizedLabel("aq3bx_title", "Line cost")),
      id: `aq3bx`
    },
    {
      name: `location`,
      id: `rqajj`
    },
    {
      name: `directreq`,
      title: (app.getLocalizedLabel("g_be3_title", "Direct issue")),
      id: `g_be3`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wpWOMaterialsDS

                

                // begin datasource - wpWOToolsDS
                {
                  let options = {
  platform: `browser`,
  name: `wpWOToolsDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wptool`,
    dependsOn: `woDetailResource`,
    select: `itemnum,itemsetid,description,itemqty,unitcost,hours,rate,linecost,storelocsite,directreq`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      id: `z4ggy`
    },
    {
      name: `itemsetid`,
      id: `r2edy`
    },
    {
      name: `description`,
      id: `qkaxk`
    },
    {
      name: `itemqty`,
      id: `qbzyn`
    },
    {
      name: `unitcost`,
      title: (app.getLocalizedLabel("rege__title", "Unit cost")),
      id: `rege_`
    },
    {
      name: `hours`,
      title: (app.getLocalizedLabel("b678__title", "Tool hours")),
      id: `b678_`
    },
    {
      name: `rate`,
      id: `brd_d`
    },
    {
      name: `linecost`,
      title: (app.getLocalizedLabel("bx3bm_title", "Line cost")),
      id: `bx3bm`
    },
    {
      name: `storelocsite`,
      title: (app.getLocalizedLabel("xr2nk_title", "Storeroom site")),
      id: `xr2nk`
    },
    {
      name: `directreq`,
      title: (app.getLocalizedLabel("a4qg8_title", "Direct issue")),
      id: `a4qg8`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wpWOToolsDS

                

                // begin datasource - wpWOServicesDS
                {
                  let options = {
  platform: `browser`,
  name: `wpWOServicesDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wpservice`,
    dependsOn: `woDetailResource`,
    select: `itemnum,description,itemqty,linecost,unitcost`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      title: (app.getLocalizedLabel("pr3z6_title", "Service")),
      id: `pr3z6`
    },
    {
      name: `description`,
      id: `wz6b4`
    },
    {
      name: `itemqty`,
      id: `n_wyz`
    },
    {
      name: `linecost`,
      title: (app.getLocalizedLabel("x7a25_title", "Line cost")),
      id: `x7a25`
    },
    {
      name: `unitcost`,
      title: (app.getLocalizedLabel("abrvz_title", "Unit cost")),
      id: `abrvz`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wpWOServicesDS

                

                // begin datasource - woattachmentDS
                {
                  let options = {
  platform: `browser`,
  name: `woattachmentDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    attachment: true,
    relationship: `doclinks`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    dependsOn: `woDetailResource`,
    select: `*`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `*`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `*`,
      'unique-id': `true`,
      id: `km6gn`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woattachmentDS

                

                // begin datasource - wostatushistoryDS
                {
                  let options = {
  platform: `browser`,
  name: `wostatushistoryDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `WOSTATUS`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    dependsOn: `woDetailResource`,
    orderBy: `changedate descending`,
    select: `wostatusid,changedate,changeby,memo,status`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wostatusid`,
      id: `wgbwy`
    },
    {
      name: `changedate`,
      id: `bvwv6`
    },
    {
      name: `changeby`,
      id: `nnk3n`
    },
    {
      name: `memo`,
      id: `v__2v`
    },
    {
      name: `status`,
      id: `d2vjgd`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wostatushistoryDS

                

                // begin datasource - woownerhistoryDS
                {
                  let options = {
  platform: `browser`,
  name: `woownerhistoryDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `OWNERHISTORY`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    dependsOn: `woDetailResource`,
    orderBy: `owndate descending`,
    select: `*`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `*`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `*`,
      'unique-id': `true`,
      id: `g7gvy`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woownerhistoryDS

                

                // begin datasource - relatedRecordWO
                {
                  let options = {
  platform: `browser`,
  name: `relatedRecordWO`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `relatedwo`,
    selectionMode: `single`,
    searchAttributes:     [
`relatedreckey`,
`relatedrecwo.description`,
`relatedrecwo.workorderid`,
`relatedrecclass`,
`relatedrecwo.status`,
`relatetype`
    ],
    indexAttributes:     [
`relatedreckey`,
`relatedrecwo.description`,
`relatedrecwo.workorderid--workorderid`,
`relatedrecclass`,
`relatedrecwo.status`,
`relatetype`
    ],
    select: `relatedreckey,relatedrecwo.description,relatedrecwo.workorderid--workorderid,relatedrecclass,relatedrecwo.status,relatetype,relatedrecwo.assetnum--asset,relatedrecwo.location--location,relatedrecwo.classstructure.description--classification,relatedrecwo.classstructure.hierarchypath--hierarchypath,relatedrecwo.href--wohref,relatedrectk.ticketuid--ticketuid`,
    dependsOn: `woDetailResource`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `relatedreckey`,
      title: (app.getLocalizedLabel("jb2___title", "Record")),
      searchable: `true`,
      id: `jb2__`
    },
    {
      name: `relatedrecwo.description`,
      title: (app.getLocalizedLabel("vdq6m_title", "Description")),
      searchable: `true`,
      id: `vdq6m`
    },
    {
      name: `relatedrecwo.workorderid--workorderid`,
      title: (app.getLocalizedLabel("k8va2_title", "WorkOrderId")),
      searchable: `true`,
      id: `k8va2`
    },
    {
      name: `relatedrecclass`,
      title: (app.getLocalizedLabel("vzxwd_title", "Class")),
      searchable: `true`,
      id: `vzxwd`
    },
    {
      name: `relatedrecwo.status`,
      title: (app.getLocalizedLabel("njrxk_title", "Status")),
      searchable: `true`,
      id: `njrxk`
    },
    {
      name: `relatetype`,
      title: (app.getLocalizedLabel("vyq___title", "Relationship")),
      searchable: `true`,
      id: `vyq__`
    },
    {
      name: `relatedrecwo.assetnum--asset`,
      title: (app.getLocalizedLabel("g2g8v_title", "Status")),
      id: `g2g8v`
    },
    {
      name: `relatedrecwo.location--location`,
      title: (app.getLocalizedLabel("gxna8_title", "Status")),
      id: `gxna8`
    },
    {
      name: `relatedrecwo.classstructure.description--classification`,
      title: (app.getLocalizedLabel("r66pk_title", "Status")),
      id: `r66pk`
    },
    {
      name: `relatedrecwo.classstructure.hierarchypath--hierarchypath`,
      title: (app.getLocalizedLabel("p4dyp_title", "Status")),
      id: `p4dyp`
    },
    {
      name: `relatedrecwo.href--wohref`,
      title: (app.getLocalizedLabel("wvwzm_title", "Status")),
      id: `wvwzm`
    },
    {
      name: `relatedrectk.ticketuid--ticketuid`,
      id: `b822r`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - relatedRecordWO

                

                // begin datasource - relatedRecordTicket
                {
                  let options = {
  platform: `browser`,
  name: `relatedRecordTicket`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `relatedticket`,
    selectionMode: `single`,
    searchAttributes:     [
`relatedreckey`,
`relatedrecwo.description`,
`relatedrecwo.workorderid`,
`relatedrecclass`,
`relatedrecwo.status`,
`relatetype`
    ],
    indexAttributes:     [
`relatedreckey`,
`relatedrecwo.description`,
`relatedrecwo.workorderid--workorderid`,
`relatedrecclass`,
`relatedrecwo.status`,
`relatetype`
    ],
    select: `relatedreckey,relatedrecwo.description,relatedrecwo.workorderid--workorderid,relatedrecclass,relatedrecwo.status,relatetype,relatedrecwo.assetnum--asset,relatedrecwo.location--location,relatedrecwo.classstructure.description--classification,relatedrecwo.classstructure.hierarchypath--hierarchypath,relatedrecwo.href--wohref,relatedrectk.ticketuid--ticketuid`,
    dependsOn: `woDetailResource`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `relatedreckey`,
      title: (app.getLocalizedLabel("b24p4_title", "Record")),
      searchable: `true`,
      id: `b24p4`
    },
    {
      name: `relatedrecwo.description`,
      title: (app.getLocalizedLabel("vrezv_title", "Description")),
      searchable: `true`,
      id: `vrezv`
    },
    {
      name: `relatedrecwo.workorderid--workorderid`,
      title: (app.getLocalizedLabel("y6rpn_title", "WorkOrderId")),
      searchable: `true`,
      id: `y6rpn`
    },
    {
      name: `relatedrecclass`,
      title: (app.getLocalizedLabel("vv2w9_title", "Class")),
      searchable: `true`,
      id: `vv2w9`
    },
    {
      name: `relatedrecwo.status`,
      title: (app.getLocalizedLabel("jk_7j_title", "Status")),
      searchable: `true`,
      id: `jk_7j`
    },
    {
      name: `relatetype`,
      title: (app.getLocalizedLabel("kzekn_title", "Relationship")),
      searchable: `true`,
      id: `kzekn`
    },
    {
      name: `relatedrecwo.assetnum--asset`,
      title: (app.getLocalizedLabel("abmyp_title", "Status")),
      id: `abmyp`
    },
    {
      name: `relatedrecwo.location--location`,
      title: (app.getLocalizedLabel("zgvnw_title", "Status")),
      id: `zgvnw`
    },
    {
      name: `relatedrecwo.classstructure.description--classification`,
      title: (app.getLocalizedLabel("e7ye7_title", "Status")),
      id: `e7ye7`
    },
    {
      name: `relatedrecwo.classstructure.hierarchypath--hierarchypath`,
      title: (app.getLocalizedLabel("xm6n6_title", "Status")),
      id: `xm6n6`
    },
    {
      name: `relatedrecwo.href--wohref`,
      title: (app.getLocalizedLabel("kknex_title", "Status")),
      id: `kknex`
    },
    {
      name: `relatedrectk.ticketuid--ticketuid`,
      id: `yp796`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - relatedRecordTicket

                

                // begin datasource - wosummaryWFAssignment
                {
                  let options = {
  platform: `browser`,
  name: `wosummaryWFAssignment`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wfassignment.mxapiwfassignment`,
    dependsOn: `woDetailResource`,
    selectionMode: `none`,
    select: `processname,description,assigncode,rel.memos{memo,personid,transdate},rel.actions{wfactionid,ownernodeid,membernodeid,actionid,ispositive,instruction}`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `processname`,
      title: (app.getLocalizedLabel("ym2ek_title", "Process Name")),
      id: `ym2ek`
    },
    {
      name: `description`,
      title: (app.getLocalizedLabel("ezjvx_title", "Description")),
      id: `ezjvx`
    },
    {
      name: `assigncode`,
      title: (app.getLocalizedLabel("ye33m_title", "Person")),
      id: `ye33m`
    },
    {
      name: `rel.memos{memo,personid,transdate}`,
      id: `n5xj4`
    },
    {
      name: `rel.actions{wfactionid,ownernodeid,membernodeid,actionid,ispositive,instruction}`,
      id: `xbdqj`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wosummaryWFAssignment

                

                // begin datasource - woWorklogDs
                {
                  let options = {
  platform: `browser`,
  name: `woWorklogDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `WOWORKLOG`,
    selectionMode: `none`,
    orderBy: `createdate descending`,
    select: `createdate,description,description_longdescription,person.displayname--displayname,logtype,logtype_description,clientviewable,anywhererefid`,
    dependsOn: `woDetailResource`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `createdate`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `createdate`,
      'unique-id': `true`,
      id: `xrr_e`
    },
    {
      name: `description`,
      id: `pq642`
    },
    {
      name: `description_longdescription`,
      id: `j5n39`
    },
    {
      name: `person.displayname--displayname`,
      id: `emgnn`
    },
    {
      name: `logtype`,
      id: `ze8g4`
    },
    {
      name: `logtype_description`,
      id: `vbrq8`
    },
    {
      name: `clientviewable`,
      id: `evd9x`
    },
    {
      name: `anywhererefid`,
      id: `dwjya`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woWorklogDs

                

                // begin datasource - woAssetDS
                {
                  let options = {
  platform: `browser`,
  name: `woAssetDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `asset`,
    dependsOn: `woDetailResource`,
    cacheExpiryMs: 1,
    select: `assetnum,description,_imagelibref`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `assetnum`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `assetnum`,
      'unique-id': `true`,
      id: `kv8gm`
    },
    {
      name: `description`,
      id: `mpkwe`
    },
    {
      name: `_imagelibref`,
      id: `j4xbe`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

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
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woAssetDS

                

                // begin datasource - wostatus_synonym
                {
                  let options = {
  platform: `browser`,
  name: `wostatus_synonym`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `uxsynonymdomain`,
    objectStructure: `MXAPISYNONYMDOMAIN`,
    dependsOn: `woDetailResource`,
    select: `description,value`
  },
  objectStructure: `MXAPISYNONYMDOMAIN`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      id: `y_kjx`
    },
    {
      name: `value`,
      id: `nywnb`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wostatus_synonym

                

                // begin datasource - woCommlogDs
                {
                  let options = {
  platform: `browser`,
  name: `woCommlogDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `commlog`,
    selectionMode: `none`,
    orderBy: `createdate descending`,
    dependsOn: `woDetailResource`,
    searchAttributes:     [
`createby`,
`createdate`,
`cc`,
`bcc`,
`sendfrom`,
`sendto`,
`subject`,
`message`
    ],
    indexAttributes:     [
`createby`,
`createdate`,
`cc`,
`bcc`,
`sendfrom`,
`sendto`,
`subject`,
`message`
    ],
    select: `commlogid,commloguid,createby,createdate,orgname,templateid,inbound,replyto,cc,bcc,sendfrom,sendto,subject,message,href,doclinks{*}`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `commlogid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `commlogid`,
      'unique-id': `true`,
      id: `vw3ev`
    },
    {
      name: `commloguid`,
      id: `bva9_`
    },
    {
      name: `createby`,
      searchable: `true`,
      id: `jgkx8`
    },
    {
      name: `createdate`,
      searchable: `true`,
      id: `ep2pd`
    },
    {
      name: `orgname`,
      id: `rvgjj`
    },
    {
      name: `templateid`,
      id: `d8ad_`
    },
    {
      name: `inbound`,
      id: `abvgr`
    },
    {
      name: `replyto`,
      id: `j_8rn`
    },
    {
      name: `cc`,
      searchable: `true`,
      id: `d_3zk`
    },
    {
      name: `bcc`,
      searchable: `true`,
      id: `nwj48`
    },
    {
      name: `sendfrom`,
      searchable: `true`,
      id: `kebad`
    },
    {
      name: `sendto`,
      searchable: `true`,
      id: `y5gz8`
    },
    {
      name: `subject`,
      searchable: `true`,
      id: `p_dj4`
    },
    {
      name: `message`,
      searchable: `true`,
      id: `ndaz6`
    },
    {
      name: `href`,
      id: `gp4yv`
    },
    {
      name: `doclinks{*}`,
      id: `xy_a_`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woCommlogDs

                

                // begin datasource - woTaskDS
                {
                  let options = {
  platform: `browser`,
  name: `woTaskDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `woactivity`,
    selectionMode: `none`,
    orderBy: `taskid`,
    dependsOn: `woDetailResource`,
    searchAttributes:     [
`taskid`,
`description`,
`status`
    ],
    indexAttributes:     [
`taskid`,
`description`,
`status`
    ],
    select: `parent,taskid,wonum,workorderid,description,status,owner,ownergroup,inctasksinsched,rel.wplabor{wplaboruid},rel.wpmaterial{wpitemid},rel.wpservice{wpitemid},rel.wptool{wpitemid}`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `parent`,
      id: `qkvq5`
    },
    {
      name: `taskid`,
      searchable: `true`,
      id: `m7jvz`
    },
    {
      name: `wonum`,
      id: `ega3v`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `aapv6`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ng4y3`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `e9drz`
    },
    {
      name: `owner`,
      id: `gj5dp`
    },
    {
      name: `ownergroup`,
      id: `j5qer`
    },
    {
      name: `inctasksinsched`,
      id: `p9b78`
    },
    {
      name: `rel.wplabor{wplaboruid}`,
      id: `pavpb`
    },
    {
      name: `rel.wpmaterial{wpitemid}`,
      id: `a5v6y`
    },
    {
      name: `rel.wpservice{wpitemid}`,
      id: `ve7_9`
    },
    {
      name: `rel.wptool{wpitemid}`,
      id: `ap6v9`
    },
    {
      name: `computeResources`,
      'computed-function': `computeResources`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("w2z5v_title", "Resources")),
      remarks: (app.getLocalizedLabel("w2z5v_remarks", "Identifies Resources for given task")),
      id: `w2z5v`,
      computed: (true),
      local: (true)
    },
    {
      name: `computeResponsibility`,
      'computed-function': `computeResponsibility`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("nnvk8_title", "Responsibility")),
      remarks: (app.getLocalizedLabel("nnvk8_remarks", "Responsibility shows one or more responsible Person or group")),
      id: `nnvk8`,
      computed: (true),
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {
    computeResources:     {
      computedFunction: ((item, datasource) => datasource.callController('computeResources', item))
    },
    computeResponsibility:     {
      computedFunction: ((item, datasource) => datasource.callController('computeResponsibility', item))
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woTaskDS

                

                // begin datasource - taskAttachmentDS
                {
                  let options = {
  platform: `browser`,
  name: `taskAttachmentDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    attachment: true,
    relationship: `doclinks`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    dependsOn: `woTaskDS`,
    select: `*`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `*`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `*`,
      'unique-id': `true`,
      id: `m9dbk`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woTaskDS`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - taskAttachmentDS

                

                // begin datasource - taskDetailResource
                {
                  let options = {
  platform: `browser`,
  name: `taskDetailResource`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    dependsOn: `woTaskDS`,
    dependentId: (page.params.workorderid),
    default: true,
    autoSave: false,
    idAttribute: `_id`,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `taskDetailResource`,
    select: `workorderid,taskid,description,doclinks{*},assetnum,asset.description,location--locationnum,location.description,route,routestopid,parentchgsstatus,inspformnum,inspectionform.name,inspectionresult.resultnum,classstructure.hierarchypath,classstructure.description_class,woacceptscharges,schedstart,schedfinish,inctasksinsched,targstartdate,targcompdate,apptrequired,interruptible,intshift,supervisor,amcrew,lead,persongroup,owner,ownergroup,commodity,commoditygroup,crewworkgroup,inspector,longdescription.ldtext,parentchgsstatus,parent,sneconstraint,fnlconstraint,remdur,estdur`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `kjjvq`
    },
    {
      name: `taskid`,
      id: `mr3dp`
    },
    {
      name: `description`,
      id: `wkprn`
    },
    {
      name: `doclinks{*}`,
      id: `j98y4`
    },
    {
      name: `assetnum`,
      id: `j5g83`
    },
    {
      name: `asset.description`,
      id: `rb5w8`
    },
    {
      name: `location--locationnum`,
      id: `exb6m`
    },
    {
      name: `location.description`,
      id: `r9bw6`
    },
    {
      name: `route`,
      id: `zy6x8`
    },
    {
      name: `routestopid`,
      id: `aag8y`
    },
    {
      name: `parentchgsstatus`,
      id: `ern2z`
    },
    {
      name: `inspformnum`,
      id: `v76ev`
    },
    {
      name: `inspectionform.name`,
      id: `z8g8k`
    },
    {
      name: `inspectionresult.resultnum`,
      id: `xgvxp`
    },
    {
      name: `classstructure.hierarchypath`,
      id: `g487r`
    },
    {
      name: `classstructure.description_class`,
      id: `dk22e`
    },
    {
      name: `woacceptscharges`,
      id: `w2rj7`
    },
    {
      name: `schedstart`,
      'sub-type': `DATE`,
      id: `rxba_`
    },
    {
      name: `schedfinish`,
      'sub-type': `DATE`,
      id: `x22y6`
    },
    {
      name: `inctasksinsched`,
      id: `n98zb`
    },
    {
      name: `targstartdate`,
      'sub-type': `DATE`,
      id: `mq69n`
    },
    {
      name: `targcompdate`,
      'sub-type': `DATE`,
      id: `ww82a`
    },
    {
      name: `apptrequired`,
      'sub-type': `YORN`,
      id: `eg24k`
    },
    {
      name: `interruptible`,
      id: `g65_e`
    },
    {
      name: `intshift`,
      id: `jmdzb`
    },
    {
      name: `supervisor`,
      id: `v4977`
    },
    {
      name: `amcrew`,
      id: `w8da2`
    },
    {
      name: `lead`,
      id: `em652`
    },
    {
      name: `persongroup`,
      id: `ybpvk`
    },
    {
      name: `owner`,
      id: `b_epy`
    },
    {
      name: `ownergroup`,
      id: `y7w4_`
    },
    {
      name: `commodity`,
      id: `yax4m`
    },
    {
      name: `commoditygroup`,
      id: `xyjjn`
    },
    {
      name: `crewworkgroup`,
      id: `zk3j4`
    },
    {
      name: `inspector`,
      id: `veq4v`
    },
    {
      name: `longdescription.ldtext`,
      id: `gq9g8`
    },
    {
      name: `parentchgsstatus`,
      id: `y9z5x`
    },
    {
      name: `parent`,
      id: `b9jad`
    },
    {
      name: `sneconstraint`,
      id: `ve66g`
    },
    {
      name: `fnlconstraint`,
      id: `bwwwz`
    },
    {
      name: `remdur`,
      id: `zaw_7`
    },
    {
      name: `estdur`,
      id: `xvj9w`
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
      name: `dependentId`,
      lastValue: (page.params.workorderid),
      check: (()=>{return page.params.workorderid})
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - taskDetailResource

                

                // begin datasource - showtaskrelationDS
                {
                  let options = {
  platform: `browser`,
  name: `showtaskrelationDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `showtaskrelation`,
    orderBy: `predwonum`,
    selectionMode: `none`,
    select: `predwonum,predecessor.description--description`,
    dependsOn: `taskDetailResource`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `predwonum`,
      id: `yadgw`
    },
    {
      name: `predecessor.description--description`,
      id: `p2ade`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `taskDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - showtaskrelationDS

                

                // begin datasource - wpTaskLaborDS
                {
                  let options = {
  platform: `browser`,
  name: `wpTaskLaborDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wplabor`,
    dependsOn: `taskDetailResource`,
    select: `wplaboruid,wplaborid,craft,crewworkgroup,laborcode,amcrew,amcrewtype,skilllevel,quantity,laborhrs,vendor,laborcode`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `wplaboruid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wplaboruid`,
      'unique-id': `true`,
      id: `y4kvb`
    },
    {
      name: `wplaborid`,
      id: `enaaa`
    },
    {
      name: `craft`,
      id: `njken`
    },
    {
      name: `crewworkgroup`,
      id: `aqq_3`
    },
    {
      name: `laborcode`,
      id: `nxe87`
    },
    {
      name: `amcrew`,
      id: `km3q9`
    },
    {
      name: `amcrewtype`,
      id: `nyd_6`
    },
    {
      name: `skilllevel`,
      id: `z9z7b`
    },
    {
      name: `quantity`,
      id: `p92dq`
    },
    {
      name: `laborhrs`,
      id: `v3we4`
    },
    {
      name: `vendor`,
      id: `vr3k3`
    },
    {
      name: `laborcode`,
      id: `rj92w`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `taskDetailResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wpTaskLaborDS

                

                // begin datasource - wpTaskMaterialsDS
                {
                  let options = {
  platform: `browser`,
  name: `wpTaskMaterialsDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wpmaterial`,
    dependsOn: `taskDetailResource`,
    select: `itemnum,itemsetid,description,itemqty,unitcost,linecost,location,directreq`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      id: `pr98x`
    },
    {
      name: `itemsetid`,
      id: `w3xed`
    },
    {
      name: `description`,
      id: `d63m8`
    },
    {
      name: `itemqty`,
      id: `g38ae`
    },
    {
      name: `unitcost`,
      title: (app.getLocalizedLabel("jype2_title", "Unit cost")),
      id: `jype2`
    },
    {
      name: `linecost`,
      title: (app.getLocalizedLabel("zaw_9_title", "Line cost")),
      id: `zaw_9`
    },
    {
      name: `location`,
      id: `a2bab`
    },
    {
      name: `directreq`,
      title: (app.getLocalizedLabel("k9nen_title", "Direct issue")),
      id: `k9nen`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `taskDetailResource`,
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wpTaskMaterialsDS

                

                // begin datasource - wpTaskToolsDS
                {
                  let options = {
  platform: `browser`,
  name: `wpTaskToolsDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wptool`,
    dependsOn: `taskDetailResource`,
    select: `itemnum,itemsetid,description,itemqty,unitcost,hours,rate,linecost,storelocsite,directreq`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      id: `q7n3a`
    },
    {
      name: `itemsetid`,
      id: `ajj5j`
    },
    {
      name: `description`,
      id: `yd2wj`
    },
    {
      name: `itemqty`,
      id: `z3_nz`
    },
    {
      name: `unitcost`,
      title: (app.getLocalizedLabel("mwrng_title", "Unit cost")),
      id: `mwrng`
    },
    {
      name: `hours`,
      title: (app.getLocalizedLabel("m4jx6_title", "Tool hours")),
      id: `m4jx6`
    },
    {
      name: `rate`,
      id: `b2nng`
    },
    {
      name: `linecost`,
      title: (app.getLocalizedLabel("ppybv_title", "Line cost")),
      id: `ppybv`
    },
    {
      name: `storelocsite`,
      title: (app.getLocalizedLabel("zvqzk_title", "Storeroom site")),
      id: `zvqzk`
    },
    {
      name: `directreq`,
      title: (app.getLocalizedLabel("vdjw2_title", "Direct issue")),
      id: `vdjw2`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `taskDetailResource`,
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wpTaskToolsDS

                

                // begin datasource - wpTaskServicesDS
                {
                  let options = {
  platform: `browser`,
  name: `wpTaskServicesDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wpservice`,
    dependsOn: `taskDetailResource`,
    select: `itemnum,description,itemqty,linecost,unitcost`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      id: `gqgen`
    },
    {
      name: `description`,
      id: `nyan9`
    },
    {
      name: `itemqty`,
      id: `vyyva`
    },
    {
      name: `linecost`,
      title: (app.getLocalizedLabel("qkmda_title", "Line cost")),
      id: `qkmda`
    },
    {
      name: `unitcost`,
      title: (app.getLocalizedLabel("gyv49_title", "Unit cost")),
      id: `gyv49`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `taskDetailResource`,
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wpTaskServicesDS

                

                // begin datasource - createWizardDS
                {
                  let options = {
  name: `createWizardDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `_id`,
      id: `j5x4n`
    },
    {
      name: `status`,
      id: `nbb_g`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `_id`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `_id,status`,
    src: ([])
  },
  autoSave: false,
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
                // end datasource - createWizardDS

                

                // begin datasource - woCraftCrewDS
                {
                  let options = {
  name: `woCraftCrewDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `laborcode`,
      title: (app.getLocalizedLabel("zmz3b_title", "Labor")),
      id: `zmz3b`
    },
    {
      name: `crewworkgroup`,
      title: (app.getLocalizedLabel("nz85p_title", "Crew work group")),
      id: `nz85p`
    },
    {
      name: `amcrew`,
      title: (app.getLocalizedLabel("bjb3e_title", "Crew")),
      id: `bjb3e`
    },
    {
      name: `craft`,
      title: (app.getLocalizedLabel("b_jk9_title", "Craft")),
      id: `b_jk9`
    },
    {
      name: `amcrewtype`,
      title: (app.getLocalizedLabel("njqyy_title", "Crew type")),
      id: `njqyy`
    },
    {
      name: `skilllevel`,
      title: (app.getLocalizedLabel("weywn_title", "Skill level")),
      id: `weywn`
    },
    {
      name: `quantity`,
      title: (app.getLocalizedLabel("g7wa5_title", "Quantity")),
      id: `g7wa5`
    },
    {
      name: `laborhrs`,
      title: (app.getLocalizedLabel("d_wj7_title", "Time to complete")),
      id: `d_wj7`
    },
    {
      name: `vendor`,
      title: (app.getLocalizedLabel("jpk9w_title", "Vendor")),
      id: `jpk9w`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `laborcode,crewworkgroup,amcrew,craft,amcrewtype,skilllevel,quantity,laborhrs,vendor`,
    src: ([])
  },
  autoSave: false,
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
                // end datasource - woCraftCrewDS

                

                // begin datasource - woLaborAssignmentDS
                {
                  let options = {
  name: `woLaborAssignmentDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `laborcode`,
      title: (app.getLocalizedLabel("j7qj5_title", "Labor")),
      id: `j7qj5`
    },
    {
      name: `crewworkgroup`,
      title: (app.getLocalizedLabel("b3p7b_title", "Crew work group")),
      id: `b3p7b`
    },
    {
      name: `amcrew`,
      title: (app.getLocalizedLabel("wmrbx_title", "Crew")),
      id: `wmrbx`
    },
    {
      name: `craft`,
      title: (app.getLocalizedLabel("yp5xp_title", "Craft")),
      id: `yp5xp`
    },
    {
      name: `amcrewtype`,
      title: (app.getLocalizedLabel("p3ajw_title", "Crew type")),
      id: `p3ajw`
    },
    {
      name: `skilllevel`,
      title: (app.getLocalizedLabel("pa7qk_title", "Skill level")),
      id: `pa7qk`
    },
    {
      name: `quantity`,
      title: (app.getLocalizedLabel("yne_e_title", "Quantity")),
      id: `yne_e`
    },
    {
      name: `laborhrs`,
      title: (app.getLocalizedLabel("q9brb_title", "Time to complete")),
      id: `q9brb`
    },
    {
      name: `vendor`,
      title: (app.getLocalizedLabel("rypqe_title", "Vendor")),
      id: `rypqe`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `laborcode,crewworkgroup,amcrew,craft,amcrewtype,skilllevel,quantity,laborhrs,vendor`,
    src: ([])
  },
  autoSave: false,
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
                // end datasource - woLaborAssignmentDS

                

                // begin datasource - taskCraftCrewDS
                {
                  let options = {
  name: `taskCraftCrewDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `laborcode`,
      title: (app.getLocalizedLabel("qmder_title", "Labor")),
      id: `qmder`
    },
    {
      name: `crewworkgroup`,
      title: (app.getLocalizedLabel("dke9v_title", "Crew work group")),
      id: `dke9v`
    },
    {
      name: `amcrew`,
      title: (app.getLocalizedLabel("znrwb_title", "Crew")),
      id: `znrwb`
    },
    {
      name: `craft`,
      title: (app.getLocalizedLabel("mknjp_title", "Craft")),
      id: `mknjp`
    },
    {
      name: `amcrewtype`,
      title: (app.getLocalizedLabel("ek24v_title", "Crew type")),
      id: `ek24v`
    },
    {
      name: `skilllevel`,
      title: (app.getLocalizedLabel("x5x4p_title", "Skill level")),
      id: `x5x4p`
    },
    {
      name: `quantity`,
      title: (app.getLocalizedLabel("xw2z4_title", "Quantity")),
      id: `xw2z4`
    },
    {
      name: `laborhrs`,
      title: (app.getLocalizedLabel("agke2_title", "Time to complete")),
      id: `agke2`
    },
    {
      name: `vendor`,
      title: (app.getLocalizedLabel("njjmd_title", "Vendor")),
      id: `njjmd`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `laborcode,crewworkgroup,amcrew,craft,amcrewtype,skilllevel,quantity,laborhrs,vendor`,
    src: ([])
  },
  autoSave: false,
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
                // end datasource - taskCraftCrewDS

                

                // begin datasource - taskLaborAssignmentDS
                {
                  let options = {
  name: `taskLaborAssignmentDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `laborcode`,
      title: (app.getLocalizedLabel("kv3n4_title", "Labor")),
      id: `kv3n4`
    },
    {
      name: `crewworkgroup`,
      title: (app.getLocalizedLabel("kjpde_title", "Crew work group")),
      id: `kjpde`
    },
    {
      name: `amcrew`,
      title: (app.getLocalizedLabel("d9pb2_title", "Crew")),
      id: `d9pb2`
    },
    {
      name: `craft`,
      title: (app.getLocalizedLabel("pxaz2_title", "Craft")),
      id: `pxaz2`
    },
    {
      name: `amcrewtype`,
      title: (app.getLocalizedLabel("bdvy7_title", "Crew type")),
      id: `bdvy7`
    },
    {
      name: `skilllevel`,
      title: (app.getLocalizedLabel("pba82_title", "Skill level")),
      id: `pba82`
    },
    {
      name: `quantity`,
      title: (app.getLocalizedLabel("edd8b_title", "Quantity")),
      id: `edd8b`
    },
    {
      name: `laborhrs`,
      title: (app.getLocalizedLabel("vdepp_title", "Time to complete")),
      id: `vdepp`
    },
    {
      name: `vendor`,
      title: (app.getLocalizedLabel("k6qgj_title", "Vendor")),
      id: `k6qgj`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `laborcode,crewworkgroup,amcrew,craft,amcrewtype,skilllevel,quantity,laborhrs,vendor`,
    src: ([])
  },
  autoSave: false,
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
                // end datasource - taskLaborAssignmentDS

                
          
                // begin dialog - attachmentdrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `attachmentdrawer`,
  configuration:   {
    id: `attachmentdrawer`,
    type: `slidingDrawer`,
    align: `end`,
    renderer: ((props => {
    return (
      <SlidingDrawerAttachmentdrawer slidingDrawerProps={props} id={"attachmentdrawer_slidingdrawer_container"}  />
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
                // end dialog - attachmentdrawer
                

                // begin dialog - taskAttachmentdrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `taskAttachmentdrawer`,
  configuration:   {
    id: `taskAttachmentdrawer`,
    type: `slidingDrawer`,
    align: `end`,
    renderer: ((props => {
    return (
      <SlidingDrawerTaskAttachmentdrawer slidingDrawerProps={props} id={"taskAttachmentdrawer_slidingdrawer_container"}  />
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
                // end dialog - taskAttachmentdrawer
                

                // begin dialog - taskPredecessorsdrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `taskPredecessorsdrawer`,
  configuration:   {
    id: `taskPredecessorsdrawer`,
    type: `slidingDrawer`,
    align: `end`,
    renderer: ((props => {
    return (
      <SlidingDrawerTaskPredecessorsdrawer slidingDrawerProps={props} id={"taskPredecessorsdrawer_slidingdrawer_container"}  />
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
                // end dialog - taskPredecessorsdrawer
                

                // begin dialog - showWOStatusHistory
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `showWOStatusHistory`,
  configuration:   {
    id: `showWOStatusHistory`,
    type: `slidingDrawer`,
    align: `end`,
    renderer: ((props => {
    return (
      <SlidingDrawerShowWOStatusHistory slidingDrawerProps={props} id={"showWOStatusHistory_slidingdrawer_container"}  />
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
                // end dialog - showWOStatusHistory
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'FollowupWorkOrder' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'FollowupWorkOrder', clearStack: false, parent: app, route: '/FollowupWorkOrder/*', title: app.getLocalizedLabel("FollowupWorkOrder_title", "FollowupWorkOrder"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"useConfirmDialog":true}, 'page'), {});

        
              {
                let controller = new WorkOrderCreateController();
                bootstrapInspector.onNewController(controller, 'WorkOrderCreateController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - parentWODS
                {
                  let options = {
  platform: `browser`,
  name: `parentWODS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    itemUrl: (page.params.href),
    autoSave: false,
    objectStructure: `MXAPIWODETAIL`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `parentWODS`,
    searchAttributes:     [
`ownerperson.displayname`
    ],
    indexAttributes:     [
`ownerperson.displayname--displayname`
    ],
    select: `wonum,description,longdescription.ldtext,description_longdescription,owner,assetnum,asset.description--assetdesc,location.location--location,location.description--locationdesc,worktype,wopriority,worktype.wtypedesc--worktypedescription,wo_failure.failurelist.failurelist--failurelist,failurecode,problemcode,targstartdate,targcompdate,estdur,siteid,orgid,woclass,workorderid,owner,onbehalfof,assetdesc,asset.assetnum--assetnumber,ownerperson.displayname--displayname,contract,contractds.description--contractdesc,jpnum,jobplan.description--jobplandesc,inspformnum,inspectionform.name--inspformname,classstructure.description--classstructuredesc,classstructure.classificationid--classificationid,classstructure.hierarchypath--hierarchypath,classstructureid`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      id: `wby5k`
    },
    {
      name: `description`,
      id: `rbba7`
    },
    {
      name: `longdescription.ldtext`,
      id: `z3mxe`
    },
    {
      name: `description_longdescription`,
      id: `jy_zp`
    },
    {
      name: `owner`,
      id: `dwr4x`
    },
    {
      name: `assetnum`,
      id: `p95a_`
    },
    {
      name: `asset.description--assetdesc`,
      id: `dy6d2`
    },
    {
      name: `location.location--location`,
      id: `nq4a_`
    },
    {
      name: `location.description--locationdesc`,
      id: `qj2ag`
    },
    {
      name: `worktype`,
      id: `br3a2`
    },
    {
      name: `wopriority`,
      type: `NUMBER`,
      'sub-type': `INTEGER`,
      id: `m9kzn`
    },
    {
      name: `worktype.wtypedesc--worktypedescription`,
      id: `dnvrd`
    },
    {
      name: `wo_failure.failurelist.failurelist--failurelist`,
      id: `xw4m7`
    },
    {
      name: `failurecode`,
      id: `jmzkj`
    },
    {
      name: `problemcode`,
      aiinuse: `true`,
      id: `neve_`
    },
    {
      name: `targstartdate`,
      id: `mw7bg`
    },
    {
      name: `targcompdate`,
      id: `z58d6`
    },
    {
      name: `estdur`,
      id: `d_v55`
    },
    {
      name: `siteid`,
      id: `mv27d`
    },
    {
      name: `orgid`,
      id: `wkggd`
    },
    {
      name: `woclass`,
      id: `mq98n`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `x6k76`
    },
    {
      name: `owner`,
      id: `qjg33`
    },
    {
      name: `onbehalfof`,
      id: `z9nwb`
    },
    {
      name: `assetdesc`,
      id: `kkqpz`
    },
    {
      name: `asset.assetnum--assetnumber`,
      id: `e8_e5`
    },
    {
      name: `ownerperson.displayname--displayname`,
      searchable: `true`,
      id: `g5b__`
    },
    {
      name: `contract`,
      id: `qrqe6`
    },
    {
      name: `contractds.description--contractdesc`,
      id: `g4xa7`
    },
    {
      name: `jpnum`,
      id: `anemn`
    },
    {
      name: `jobplan.description--jobplandesc`,
      id: `e86x4`
    },
    {
      name: `inspformnum`,
      id: `q_33v`
    },
    {
      name: `inspectionform.name--inspformname`,
      id: `dx34k`
    },
    {
      name: `classstructure.description--classstructuredesc`,
      id: `wp4aa`
    },
    {
      name: `classstructure.classificationid--classificationid`,
      id: `v8q27`
    },
    {
      name: `classstructure.hierarchypath--hierarchypath`,
      id: `k9p7m`
    },
    {
      name: `classstructureid`,
      id: `e6zqv`
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
                // end datasource - parentWODS

                

                // begin datasource - inspFormALds
                {
                  let options = {
  platform: `browser`,
  name: `inspFormALds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `RECINSPFORMS`,
    dependsOn: `parentWODS`,
    selectionMode: `single`,
    searchAttributes:     [
`inspectionform.name`
    ],
    indexAttributes:     [
`inspectionform.name`
    ],
    select: `inspformnum,inspectionform.name`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `inspformnum`,
      id: `yv39w`
    },
    {
      name: `inspectionform.name`,
      searchable: `true`,
      id: `j27m5`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `parentWODS`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - inspFormALds

                

                // begin datasource - inspFormLookupds1
                {
                  let options = {
  platform: `browser`,
  name: `inspFormLookupds1`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `OTHERINSPFORMS`,
    dependsOn: `parentWODS`,
    selectionMode: `single`,
    searchAttributes:     [
`name`
    ],
    indexAttributes:     [
`name`
    ],
    select: `inspformnum,name`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: `inspformnum`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `inspformnum`,
      'unique-id': `true`,
      id: `qg6qe`
    },
    {
      name: `name`,
      searchable: `true`,
      id: `qqbqe`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `parentWODS`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - inspFormLookupds1

                

                // begin datasource - jobPlanASds
                {
                  let options = {
  platform: `browser`,
  name: `jobPlanASds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `RECJOBPLAN`,
    dependsOn: `parentWODS`,
    selectionMode: `single`,
    searchAttributes:     [
`jpnum`,
`jobplan.description`,
`jobplan.siteid`,
`jobplan.orgid`
    ],
    indexAttributes:     [
`jpnum`,
`jobplan.description`,
`jobplan.siteid`,
`jobplan.orgid`
    ],
    select: `jpnum,jobplan.description,jobplan.jobplanclass.woclass,jobplan.siteid,jobplan.orgid`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `jpnum`,
      searchable: `true`,
      id: `erb37`
    },
    {
      name: `jobplan.description`,
      searchable: `true`,
      id: `wdbg8`
    },
    {
      name: `jobplan.jobplanclass.woclass`,
      id: `v3de8`
    },
    {
      name: `jobplan.siteid`,
      searchable: `true`,
      id: `dwaza`
    },
    {
      name: `jobplan.orgid`,
      searchable: `true`,
      id: `vx_rp`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `parentWODS`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - jobPlanASds

                
          
                // begin dialog - inspectionFormDlg
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `inspectionFormDlg`,
  configuration:   {
    id: `inspectionFormDlg`,
    dialogRenderer: ((props => {
    return (
      <DialogInspectionFormDlg id={"inspectionFormDlg_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new WorkOrderCreateController();
          bootstrapInspector.onNewController(controller, 'WorkOrderCreateController', dialog);
        dialog.registerController(controller);
                  page.registerDialog(dialog);
                }
                // end dialog - inspectionFormDlg
                

                // begin dialog - jobPlanDlg
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `jobPlanDlg`,
  configuration:   {
    id: `jobPlanDlg`,
    dialogRenderer: ((props => {
    return (
      <DialogJobPlanDlg id={"jobPlanDlg_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new WorkOrderCreateController();
          bootstrapInspector.onNewController(controller, 'WorkOrderCreateController', dialog);
        dialog.registerController(controller);
                  page.registerDialog(dialog);
                }
                // end dialog - jobPlanDlg
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'CreateWorkOrder' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'CreateWorkOrder', clearStack: false, parent: app, route: '/CreateWorkOrder/*', title: app.getLocalizedLabel("CreateWorkOrder_title", "CreateWorkOrder"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"useConfirmDialog":true}, 'page'), {});

        
              {
                let controller = new WorkOrderCreateController();
                bootstrapInspector.onNewController(controller, 'WorkOrderCreateController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - createWODS
                {
                  let options = {
  platform: `browser`,
  name: `createWODS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: `wonum="0"`,
    autoSave: false,
    idAttribute: `_id`,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `createWODS`,
    searchAttributes:     [
`ownerperson.displayname`
    ],
    indexAttributes:     [
`ownerperson.displayname--displayname`
    ],
    select: `wonum,description,longdescription.ldtext,description_longdescription,owner,assetnum,asset.description--assetdesc,location.location--location,location.description--locationdesc,worktype,wopriority,worktype.wtypedesc--worktypedescription,wo_failure.failurelist.failurelist--failurelist,failurecode,problemcode,targstartdate,targcompdate,estdur,siteid,orgid,woclass,workorderid,owner,onbehalfof,assetdesc,asset.assetnum--assetnumber,ownerperson.displayname--displayname,jpnum,jobplan.description--jobplandesc,inspformnum,inspectionform.name--inspformname,contract,contractds.description--contractdesc,classstructure.description--classstructuredesc,classstructure.classificationid--classificationid,classstructure.hierarchypath--hierarchypath,classstructureid`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      id: `mrjga`
    },
    {
      name: `description`,
      id: `z45jx`
    },
    {
      name: `longdescription.ldtext`,
      id: `dpwq7`
    },
    {
      name: `description_longdescription`,
      'max-length': `999999`,
      id: `ajypg`
    },
    {
      name: `owner`,
      id: `nwpgx`
    },
    {
      name: `assetnum`,
      id: `v5mn5`
    },
    {
      name: `asset.description--assetdesc`,
      id: `n2588`
    },
    {
      name: `location.location--location`,
      id: `r9b8m`
    },
    {
      name: `location.description--locationdesc`,
      id: `ydmmv`
    },
    {
      name: `worktype`,
      id: `k8yr7`
    },
    {
      name: `wopriority`,
      type: `NUMBER`,
      'sub-type': `INTEGER`,
      id: `dgnbx`
    },
    {
      name: `worktype.wtypedesc--worktypedescription`,
      id: `n3q6j`
    },
    {
      name: `wo_failure.failurelist.failurelist--failurelist`,
      id: `v3_d7`
    },
    {
      name: `failurecode`,
      id: `pjwja`
    },
    {
      name: `problemcode`,
      id: `mwv9a`
    },
    {
      name: `targstartdate`,
      id: `m7zp9`
    },
    {
      name: `targcompdate`,
      id: `ww997`
    },
    {
      name: `estdur`,
      id: `bdd_w`
    },
    {
      name: `siteid`,
      id: `mqynm`
    },
    {
      name: `orgid`,
      id: `q_www`
    },
    {
      name: `woclass`,
      id: `gmjr6`
    },
    {
      name: `workorderid`,
      id: `wggek`
    },
    {
      name: `owner`,
      id: `r8xb9`
    },
    {
      name: `onbehalfof`,
      id: `v8kyw`
    },
    {
      name: `assetdesc`,
      id: `rzxpv`
    },
    {
      name: `asset.assetnum--assetnumber`,
      id: `zbv2n`
    },
    {
      name: `ownerperson.displayname--displayname`,
      searchable: `true`,
      id: `mdqng`
    },
    {
      name: `jpnum`,
      id: `z_825`
    },
    {
      name: `jobplan.description--jobplandesc`,
      id: `bd8ey`
    },
    {
      name: `inspformnum`,
      id: `rjvqy`
    },
    {
      name: `inspectionform.name--inspformname`,
      id: `ek_pj`
    },
    {
      name: `contract`,
      id: `pkw9_`
    },
    {
      name: `contractds.description--contractdesc`,
      id: `km25q`
    },
    {
      name: `classstructure.description--classstructuredesc`,
      id: `px3bk`
    },
    {
      name: `classstructure.classificationid--classificationid`,
      id: `mq67g`
    },
    {
      name: `classstructure.hierarchypath--hierarchypath`,
      id: `d4qgd`
    },
    {
      name: `classstructureid`,
      id: `xmvr6`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - createWODS

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'LongDescription' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'LongDescription', clearStack: false, parent: app, route: '/LongDescription/*', title: app.getLocalizedLabel("LongDescription_title", "LongDescription"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new PageController();
                bootstrapInspector.onNewController(controller, 'PageController', page);
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
      

      // setup the 'TaskLongDescription' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'TaskLongDescription', clearStack: false, parent: app, route: '/TaskLongDescription/*', title: app.getLocalizedLabel("TaskLongDescription_title", "TaskLongDescription"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new PageController();
                bootstrapInspector.onNewController(controller, 'PageController', page);
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
      

      // setup the 'CommunicationLog' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'CommunicationLog', clearStack: false, parent: app, route: '/CommunicationLog/*', title: app.getLocalizedLabel("CommunicationLog_title", "CommunicationLog"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new PageController();
                bootstrapInspector.onNewController(controller, 'PageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
          
                // begin dialog - commlogattachmentdrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `commlogattachmentdrawer`,
  configuration:   {
    id: `commlogattachmentdrawer`,
    type: `slidingDrawer`,
    align: `end`,
    renderer: ((props => {
    return (
      <SlidingDrawerCommlogattachmentdrawer slidingDrawerProps={props} id={"commlogattachmentdrawer_slidingdrawer_container"}  />
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
                // end dialog - commlogattachmentdrawer
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'CreateTask' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'CreateTask', clearStack: false, parent: app, route: '/CreateTask/*', title: app.getLocalizedLabel("CreateTask_title", "CreateTask"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"showCraftCrewOption":"Craft","showLaborCrewOption":"Labor","enableAddCraftCrewPrimaryButton":true,"disableAddLaborCrewPrimaryButton":true,"lookupPrimaryButtonDisabled":true,"selectedRole":"0","showPredecessorOption":"task","editTask":false,"addPredecessor":false}, 'page'), {});

        
              {
                let controller = new TaskController();
                bootstrapInspector.onNewController(controller, 'TaskController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - existingWODetail
                {
                  let options = {
  platform: `browser`,
  name: `existingWODetail`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: (`workorderid=${app.state.workorderid}`),
    default: true,
    autoSave: false,
    objectStructure: `MXAPIWODETAIL`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `existingWODetail`,
    select: `wonum,workorderid,taskid`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      id: `w3bw9`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `dd7k5`
    },
    {
      name: `taskid`,
      id: `mn46r`
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
      lastValue: (`workorderid=${app.state.workorderid}`),
      check: (()=>{return `workorderid=${app.state.workorderid}`})
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - existingWODetail

                

                // begin datasource - woPlanTaskDetailds
                {
                  let options = {
  platform: `browser`,
  name: `woPlanTaskDetailds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `woactivity`,
    selectionMode: `none`,
    select: `wonum,workorderid,taskid,status,owner,siteid,status,woclass,parent,parentchgsstatus,description,description_longdescription,assetnum,asset.description--assetdesc,location.location--location,location.description--locationdesc,route,routestopid,inspformnum,inspectionresult.resultnum,classstructure.hierarchypath--hierarchypath,classstructure.description_class,woacceptscharges,observation,inspector,pointnum,measurementvalue,measuredate,schedstart,schedfinish,targstartdate,targcompdate,sneconstraint,fnlconstraint,estdur,remdur,predessorwos,apptrequired,interruptible,inctasksinsched,intshift,doclinks{*},href,lead,supervisor,ownergroup,crewworkgroup,persongroup`,
    dependsOn: `existingWODetail`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: `workorderid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      id: `wjdgx`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `kpa65`
    },
    {
      name: `taskid`,
      id: `mxn6_`
    },
    {
      name: `status`,
      id: `pm_kw`
    },
    {
      name: `owner`,
      id: `w577q`
    },
    {
      name: `siteid`,
      id: `n285y`
    },
    {
      name: `status`,
      id: `e4b9j`
    },
    {
      name: `woclass`,
      id: `zn7q3`
    },
    {
      name: `parent`,
      id: `d9pwg`
    },
    {
      name: `parentchgsstatus`,
      id: `xv8an`
    },
    {
      name: `description`,
      id: `j9qex`
    },
    {
      name: `description_longdescription`,
      id: `yb34d`
    },
    {
      name: `assetnum`,
      id: `q4pw8`
    },
    {
      name: `asset.description--assetdesc`,
      id: `d_kxm`
    },
    {
      name: `location.location--location`,
      id: `d2qd2`
    },
    {
      name: `location.description--locationdesc`,
      id: `bbzxj`
    },
    {
      name: `route`,
      id: `y6j9r`
    },
    {
      name: `routestopid`,
      id: `jxv9r`
    },
    {
      name: `inspformnum`,
      id: `d5vva`
    },
    {
      name: `inspectionresult.resultnum`,
      id: `neg_z`
    },
    {
      name: `classstructure.hierarchypath--hierarchypath`,
      id: `zzmqg`
    },
    {
      name: `classstructure.description_class`,
      id: `zke2w`
    },
    {
      name: `woacceptscharges`,
      id: `pmma7`
    },
    {
      name: `observation`,
      id: `x6_6b`
    },
    {
      name: `inspector`,
      id: `pq5za`
    },
    {
      name: `pointnum`,
      id: `v2w4x`
    },
    {
      name: `measurementvalue`,
      id: `vg_pp`
    },
    {
      name: `measuredate`,
      id: `rxkg5`
    },
    {
      name: `schedstart`,
      id: `b_kzz`
    },
    {
      name: `schedfinish`,
      id: `kqgmy`
    },
    {
      name: `targstartdate`,
      id: `jj5k8`
    },
    {
      name: `targcompdate`,
      id: `vwdkr`
    },
    {
      name: `sneconstraint`,
      id: `z79g6`
    },
    {
      name: `fnlconstraint`,
      id: `zj3vd`
    },
    {
      name: `estdur`,
      id: `a3z_4`
    },
    {
      name: `remdur`,
      id: `zdwrb`
    },
    {
      name: `predessorwos`,
      id: `jg543`
    },
    {
      name: `apptrequired`,
      id: `jqy4m`
    },
    {
      name: `interruptible`,
      id: `rprxy`
    },
    {
      name: `inctasksinsched`,
      id: `ym35m`
    },
    {
      name: `intshift`,
      id: `ndn9k`
    },
    {
      name: `doclinks{*}`,
      id: `g89j2`
    },
    {
      name: `href`,
      id: `g3mm2`
    },
    {
      name: `lead`,
      id: `r_a2a`
    },
    {
      name: `supervisor`,
      id: `pdpwy`
    },
    {
      name: `ownergroup`,
      id: `beqxp`
    },
    {
      name: `crewworkgroup`,
      id: `eg8a_`
    },
    {
      name: `persongroup`,
      id: `zvpk7`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `existingWODetail`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woPlanTaskDetailds

                

                // begin datasource - woTaskDetail
                {
                  let options = {
  platform: `browser`,
  name: `woTaskDetail`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    itemUrl: (page.params.itemhref),
    autoSave: false,
    objectStructure: `MXAPIWODETAIL`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woTaskDetail`,
    select: `wonum,taskid,workorderid,rel.woactivity{wonum,taskid,description,description_longdescription,siteid,status,workorderid,parentchgsstatus,owner,ownergroup,wosequence,ownerperson.displayname}`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      id: `wxny6`
    },
    {
      name: `taskid`,
      id: `wzxz5`
    },
    {
      name: `workorderid`,
      id: `kgznx`
    },
    {
      name: `rel.woactivity{wonum,taskid,description,description_longdescription,siteid,status,workorderid,parentchgsstatus,owner,ownergroup,wosequence,ownerperson.displayname}`,
      id: `zq42q`
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
      lastValue: (page.params.itemhref),
      check: (()=>{return page.params.itemhref})
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woTaskDetail

                

                // begin datasource - attachmentListDS
                {
                  let options = {
  platform: `browser`,
  name: `attachmentListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `doclinks`,
    selectionMode: `none`,
    select: `*`,
    dependsOn: `woTaskDetail`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `*`,
      id: `eqx_y`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woTaskDetail`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - attachmentListDS

                

                // begin datasource - woTaskResource
                {
                  let options = {
  platform: `browser`,
  name: `woTaskResource`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    autoSave: false,
    objectStructure: `MXAPIWODETAIL`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woTaskResource`,
    select: `wonum,taskid,workorderid`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      id: `dn3ne`
    },
    {
      name: `taskid`,
      id: `mjbqx`
    },
    {
      name: `workorderid`,
      id: `xyxr8`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woTaskResource

                

                // begin datasource - addcraftCrewtypeDS
                {
                  let options = {
  platform: `browser`,
  name: `addcraftCrewtypeDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    objectName: `wplabor`,
    relationship: `showplanlabor`,
    select: `wplaborid,craft,quantity,laborcode,laborhrs,vendor,amcrew,skilllevel,contractnum,amcrewtype,orgid,siteid,wonum`,
    dependsOn: `woTaskResource`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wplaborid`,
      id: `n_nkk`
    },
    {
      name: `craft`,
      id: `wj53v`
    },
    {
      name: `quantity`,
      id: `ekqpr`
    },
    {
      name: `laborcode`,
      id: `d44jg`
    },
    {
      name: `laborhrs`,
      id: `e2x3p`
    },
    {
      name: `vendor`,
      id: `rr9gb`
    },
    {
      name: `amcrew`,
      id: `z2gzk`
    },
    {
      name: `skilllevel`,
      id: `gqj3_`
    },
    {
      name: `contractnum`,
      id: `vr6q_`
    },
    {
      name: `amcrewtype`,
      id: `j467z`
    },
    {
      name: `orgid`,
      id: `y9392`
    },
    {
      name: `siteid`,
      id: `znbgx`
    },
    {
      name: `wonum`,
      id: `z59_v`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woTaskResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - addcraftCrewtypeDS

                

                // begin datasource - addLaborCrewDS
                {
                  let options = {
  platform: `browser`,
  name: `addLaborCrewDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    objectName: `wplabor`,
    relationship: `showplanlabor`,
    select: `wplaborid,quantity,laborcode,laborhrs,vendor,amcrewtype,orgid,siteid,wonum,crewworkgroup`,
    dependsOn: `woTaskResource`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wplaborid`,
      id: `g_dad`
    },
    {
      name: `quantity`,
      id: `w5n5z`
    },
    {
      name: `laborcode`,
      id: `r36g7`
    },
    {
      name: `laborhrs`,
      id: `dvj3n`
    },
    {
      name: `vendor`,
      id: `gpw4v`
    },
    {
      name: `amcrewtype`,
      id: `bk982`
    },
    {
      name: `orgid`,
      id: `xe7wx`
    },
    {
      name: `siteid`,
      id: `yvvdp`
    },
    {
      name: `wonum`,
      id: `jdxr5`
    },
    {
      name: `crewworkgroup`,
      id: `b4_re`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woTaskResource`,
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - addLaborCrewDS

                

                // begin datasource - addAssignmentDS
                {
                  let options = {
  platform: `browser`,
  name: `addAssignmentDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    objectName: `assignment`,
    relationship: `showassignment`,
    select: `wplaborid,wplaboruid,wonum,craft,laborcode,skilllevel,status`,
    dependsOn: `woTaskResource`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wplaborid`,
      id: `b7qj6`
    },
    {
      name: `wplaboruid`,
      id: `p49bp`
    },
    {
      name: `wonum`,
      id: `zkbnd`
    },
    {
      name: `craft`,
      id: `qqzwa`
    },
    {
      name: `laborcode`,
      id: `kakyp`
    },
    {
      name: `skilllevel`,
      id: `zz25d`
    },
    {
      name: `status`,
      id: `bpz2_`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woTaskResource`,
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - addAssignmentDS

                

                // begin datasource - addcraftCrewtypeDSTable
                {
                  let options = {
  name: `addcraftCrewtypeDSTable`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `wplaborid`,
      'unique-id': `true`,
      id: `mnd5a`
    },
    {
      name: `craft`,
      id: `b265v`
    },
    {
      name: `quantity`,
      id: `pvjg7`
    },
    {
      name: `laborcode`,
      id: `j5vy9`
    },
    {
      name: `laborhrs`,
      id: `bbvnm`
    },
    {
      name: `vendor`,
      id: `z_8g5`
    },
    {
      name: `amcrew`,
      id: `m62_e`
    },
    {
      name: `skilllevel`,
      id: `q8pz2`
    },
    {
      name: `contractnum`,
      id: `wq99e`
    },
    {
      name: `amcrewtype`,
      id: `arjw6`
    },
    {
      name: `orgid`,
      id: `xdd2g`
    },
    {
      name: `siteid`,
      id: `jv63a`
    },
    {
      name: `wonum`,
      id: `a6ym3`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `wplaborid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `wplaborid,craft,quantity,laborcode,laborhrs,vendor,amcrew,skilllevel,contractnum,amcrewtype,orgid,siteid,wonum`,
    src: ([])
  },
  autoSave: false,
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
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - addcraftCrewtypeDSTable

                

                // begin datasource - addLaborCrewDSTable
                {
                  let options = {
  name: `addLaborCrewDSTable`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `wplaborid`,
      'unique-id': `true`,
      id: `gdb5p`
    },
    {
      name: `quantity`,
      id: `dd2bw`
    },
    {
      name: `laborcode`,
      id: `d6g6a`
    },
    {
      name: `laborhrs`,
      id: `j93rv`
    },
    {
      name: `vendor`,
      id: `axbjg`
    },
    {
      name: `amcrewtype`,
      id: `wp3n8`
    },
    {
      name: `orgid`,
      id: `wr_79`
    },
    {
      name: `siteid`,
      id: `ryed2`
    },
    {
      name: `wonum`,
      id: `gkeqg`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `wplaborid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `wplaborid,quantity,laborcode,laborhrs,vendor,amcrewtype,orgid,siteid,wonum`,
    src: ([])
  },
  autoSave: false,
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
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - addLaborCrewDSTable

                

                // begin datasource - cancelWpLaborDS
                {
                  let options = {
  name: `cancelWpLaborDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `wplaborid`,
      'unique-id': `true`,
      id: `mbm_4`
    },
    {
      name: `craft`,
      id: `gy9jy`
    },
    {
      name: `quantity`,
      id: `q898x`
    },
    {
      name: `laborcode`,
      id: `mp955`
    },
    {
      name: `laborhrs`,
      id: `bm5vg`
    },
    {
      name: `vendor`,
      id: `nj275`
    },
    {
      name: `amcrew`,
      id: `b9e2n`
    },
    {
      name: `skilllevel`,
      id: `p8m_n`
    },
    {
      name: `contractnum`,
      id: `pepp6`
    },
    {
      name: `amcrewtype`,
      id: `v74qq`
    },
    {
      name: `orgid`,
      id: `e27be`
    },
    {
      name: `siteid`,
      id: `k4zje`
    },
    {
      name: `wonum`,
      id: `eabda`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `wplaborid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `wplaborid,craft,quantity,laborcode,laborhrs,vendor,amcrew,skilllevel,contractnum,amcrewtype,orgid,siteid,wonum`,
    src: ([])
  },
  autoSave: false,
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
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - cancelWpLaborDS

                

                // begin datasource - woTaskRelation
                {
                  let options = {
  platform: `browser`,
  name: `woTaskRelation`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    objectStructure: `MXWOTASKRELATION`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woTaskRelation`,
    select: `orgid,siteid,predwonum,predrefwonum,reltype,predtaskid,predecessor.wonum--wonum,predecessor.parent--parent,predecessor.woclass--woclass,predecessor.description--description,predecessor.location--location,predecessor.workorderid--workorderid,predecessor.status--status`
  },
  objectStructure: `MXWOTASKRELATION`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `orgid`,
      id: `aymwr`
    },
    {
      name: `siteid`,
      id: `d95y2`
    },
    {
      name: `predwonum`,
      id: `r685n`
    },
    {
      name: `predrefwonum`,
      id: `kmrb7`
    },
    {
      name: `reltype`,
      id: `y9ydr`
    },
    {
      name: `predtaskid`,
      id: `v737k`
    },
    {
      name: `predecessor.wonum--wonum`,
      id: `yn53m`
    },
    {
      name: `predecessor.parent--parent`,
      id: `ypn68`
    },
    {
      name: `predecessor.woclass--woclass`,
      id: `zz8xk`
    },
    {
      name: `predecessor.description--description`,
      id: `dg_4k`
    },
    {
      name: `predecessor.location--location`,
      id: `n27na`
    },
    {
      name: `predecessor.workorderid--workorderid`,
      id: `n_2dm`
    },
    {
      name: `predecessor.status--status`,
      id: `xq_j8`
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
                // end datasource - woTaskRelation

                

                // begin datasource - responsibilityTable
                {
                  let options = {
  name: `responsibilityTable`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `role`,
      title: (app.getLocalizedLabel("xy48b_title", "Role")),
      id: `xy48b`
    },
    {
      name: `name`,
      title: (app.getLocalizedLabel("knjvy_title", "Name")),
      id: `knjvy`
    },
    {
      name: `selectName`,
      id: `m94xj`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `role,name,selectName`,
    src: ([])
  },
  autoSave: false,
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
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - responsibilityTable

                

                // begin datasource - laborDS
                {
                  let options = {
  platform: `browser`,
  name: `laborDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapilabor`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `laborDS`,
    searchAttributes:     [
`laborcode`
    ],
    indexAttributes:     [
`laborcode`,
`orgid`
    ],
    select: `laborcode,person.displayname,orgid,laborid,personid`
  },
  objectStructure: `mxapilabor`,
  idAttribute: `laborid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `laborcode`,
      id: `gz6v3`,
      searchable: `true`
    },
    {
      name: `person.displayname`,
      id: `ybn9b`
    },
    {
      name: `orgid`,
      id: `d52nr`,
      index: `true`
    },
    {
      name: `laborid`,
      'unique-id': `true`,
      id: `dz8ew`
    },
    {
      name: `personid`,
      id: `aj3rq`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - laborDS

                

                // begin datasource - craftDS
                {
                  let options = {
  platform: `browser`,
  name: `craftDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapilaborcraftrate`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `craftDS`,
    searchAttributes:     [
`craft.description`
    ],
    indexAttributes:     [
`craft.description`
    ],
    select: `orgid,craft.craft,craft.description`
  },
  objectStructure: `mxapilaborcraftrate`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `orgid`,
      id: `xzzqd`
    },
    {
      name: `craft.craft`,
      id: `dp6pj`
    },
    {
      name: `craft.description`,
      searchable: `true`,
      id: `vpj_n`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - craftDS

                
          
                // begin dialog - addCraftCrewTypeDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `addCraftCrewTypeDialog`,
  configuration:   {
    id: `addCraftCrewTypeDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogAddCraftCrewTypeDialog id={"addCraftCrewTypeDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - addCraftCrewTypeDialog
                

                // begin dialog - addLaborCrewDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `addLaborCrewDialog`,
  configuration:   {
    id: `addLaborCrewDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogAddLaborCrewDialog id={"addLaborCrewDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - addLaborCrewDialog
                

                // begin dialog - openCraftLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openCraftLookup`,
  configuration:   {
    id: `openCraftLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenCraftLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenCraftLookup {...props} />
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - openCraftLookup
                

                // begin dialog - openCrewTypeLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openCrewTypeLookup`,
  configuration:   {
    id: `openCrewTypeLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenCrewTypeLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenCrewTypeLookup {...props} />
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - openCrewTypeLookup
                

                // begin dialog - openCrewLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openCrewLookup`,
  configuration:   {
    id: `openCrewLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenCrewLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenCrewLookup {...props} />
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - openCrewLookup
                

                // begin dialog - openLaborLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openLaborLookup`,
  configuration:   {
    id: `openLaborLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenLaborLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenLaborLookup {...props} />
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - openLaborLookup
                

                // begin dialog - openPersonGroupLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openPersonGroupLookup`,
  configuration:   {
    id: `openPersonGroupLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenPersonGroupLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenPersonGroupLookup {...props} />
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - openPersonGroupLookup
                

                // begin dialog - openCrewWorkGroupLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openCrewWorkGroupLookup`,
  configuration:   {
    id: `openCrewWorkGroupLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenCrewWorkGroupLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenCrewWorkGroupLookup {...props} />
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - openCrewWorkGroupLookup
                

                // begin dialog - openDialogCrewWorkGroupLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openDialogCrewWorkGroupLookup`,
  configuration:   {
    id: `openDialogCrewWorkGroupLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenDialogCrewWorkGroupLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenDialogCrewWorkGroupLookup {...props} />
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - openDialogCrewWorkGroupLookup
                

                // begin dialog - openOwnerWorkGroupLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openOwnerWorkGroupLookup`,
  configuration:   {
    id: `openOwnerWorkGroupLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenOwnerWorkGroupLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenOwnerWorkGroupLookup {...props} />
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - openOwnerWorkGroupLookup
                

                // begin dialog - displayPredecessor
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `displayPredecessor`,
  configuration:   {
    id: `displayPredecessor`,
    dialogRenderer: ((props => {
    return (
      <DialogDisplayPredecessor id={"displayPredecessor_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new TaskController();
          bootstrapInspector.onNewController(controller, 'TaskController', dialog);
        dialog.registerController(controller);
                  page.registerDialog(dialog);
                }
                // end dialog - displayPredecessor
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

    app.setRoutesForApplication();
    
                // begin datasource - wflistDS
                {
                  let options = {
  platform: `browser`,
  name: `wflistDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 10,
  debounceTime: 100,
  query:   {
    pageSize: 10,
    selectionMode: `multiple`,
    orderBy: `duedate descending`,
    objectStructure: `MXAPIWFASSIGNMENT`,
    includeCounts: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `wflistDS`,
    searchAttributes:     [
`description`,
`priority`,
`duedate`,
`startdate`,
`app`,
`assignstatus`,
`ownerdescription`
    ],
    indexAttributes:     [
`description`,
`priority`,
`duedate`,
`startdate`,
`app`,
`assignstatus`,
`ownerdescription`
    ],
    select: `wfassignmentid,description,priority,duedate,startdate,app,assignstatus,ownertable,ownerid,rel.memos{memo,personid,transdate},rel.actions{wfactionid,ownernodeid,membernodeid,actionid,ispositive,instruction},ownerdescription`
  },
  objectStructure: `MXAPIWFASSIGNMENT`,
  idAttribute: `wfassignmentid`,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wfassignmentid`,
      'unique-id': `true`,
      id: `jzzxe`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `bdpxq`
    },
    {
      name: `priority`,
      searchable: `true`,
      id: `ma796`
    },
    {
      name: `duedate`,
      searchable: `true`,
      id: `b2z53`
    },
    {
      name: `dueDateFlag`,
      type: `STRING`,
      id: `y5r6a`,
      computed: (true),
      local: (true)
    },
    {
      name: `startdate`,
      searchable: `true`,
      id: `er5my`
    },
    {
      name: `app`,
      searchable: `true`,
      id: `k22ja`
    },
    {
      name: `assignstatus`,
      searchable: `true`,
      id: `pebkk`
    },
    {
      name: `ownertable`,
      id: `v56pn`
    },
    {
      name: `ownerid`,
      id: `kxbe9`
    },
    {
      name: `rel.memos{memo,personid,transdate}`,
      id: `p697x`
    },
    {
      name: `rel.actions{wfactionid,ownernodeid,membernodeid,actionid,ispositive,instruction}`,
      id: `pwn_2`
    },
    {
      name: `ownerdescription`,
      searchable: `true`,
      id: `drdv8`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    dueDateFlag:     {
      computedFunction: ((item, datasource) => {return (new Date(item.duedate).getTime() - new Date().getTime()-1);})
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - wflistDS

                

                // begin datasource - wolistDS
                {
                  let options = {
  platform: `browser`,
  name: `wolistDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 10,
  debounceTime: 100,
  query:   {
    pageSize: 10,
    selectionMode: `multiple`,
    orderBy: `schedstart`,
    objectStructure: `MXAPIWODETAIL`,
    includeCounts: true,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `wolistDS`,
    searchAttributes:     [
`wonum`,
`description`,
`location`,
`assetnum`,
`glaccount`,
`wopriority`,
`targstartdate`,
`targcompdate`,
`failurecode`,
`pmnum`,
`jpnum`,
`classstructureid`,
`serviceaddress.formattedaddress`,
`status`
    ],
    indexAttributes:     [
`wonum`,
`description`,
`location`,
`assetnum`,
`glaccount`,
`wopriority`,
`targstartdate`,
`targcompdate`,
`failurecode`,
`pmnum`,
`jpnum`,
`classstructureid`,
`serviceaddress.formattedaddress--formattedaddress`,
`status`,
`status_maxvalue`
    ],
    select: `wonum,workorderid,description,location,assetnum,status,schedstart,worktype.wtypedesc,allowedstates,rel.wostatus{memo,changeby,changedate},glaccount,wopriority,targstartdate,targcompdate,failurecode,pmnum,jpnum,classstructureid,href,siteid,woclass,historyflag,istask,autolocate,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,wogroup,worktype--worktypename,istask,taskid,status,status_description,status_maxvalue,uxsynonymdomain.valueid,maxvar.coordinate,maxvar.downprompt,rel.multiassetlocci{rel.asset{assetnum,autolocate,assetid},rel.location{location,autolocate,locationsid},rel.ci{cinum,ciid}}`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: `workorderid`,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      searchable: `true`,
      id: `a6kr3`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `rb3wj`
    },
    {
      name: `description`,
      id: `n7zjz`,
      searchable: `true`
    },
    {
      searchable: `true`,
      name: `location`,
      id: `w657v`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `w657v`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `locationLookupDSMultiSelect`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `m97b3`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `m97b3`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `assetLookupDSMultiSelect`
    },
    {
      name: `status`,
      id: `jgbb6`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `jgbb6`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ]
      },
      datasource: `woliststatus`
    },
    {
      name: `schedstart`,
      'sub-type': `DATE`,
      id: `z_wrp`
    },
    {
      name: `worktype.wtypedesc`,
      id: `gzwk5`
    },
    {
      name: `allowedstates`,
      id: `kjy8b`
    },
    {
      name: `computedStates`,
      'computed-function': `computedStates`,
      id: `a229q`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.wostatus{memo,changeby,changedate}`,
      id: `rrg8x`
    },
    {
      name: `glaccount`,
      searchable: `true`,
      id: `qzrpp`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `gr6vg`
    },
    {
      name: `targstartdate`,
      'sub-type': `DATE`,
      searchable: `true`,
      id: `qmwn4`
    },
    {
      name: `targcompdate`,
      'sub-type': `DATE`,
      searchable: `true`,
      id: `nb968`
    },
    {
      searchable: `true`,
      name: `failurecode`,
      id: `xyg6d`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `xyg6d`,
      lookup:       {
        name: `workfailure`,
        attributeMap:         [
          {
            datasourceField: `failurecode`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `failureclassDSMultiselect`
    },
    {
      searchable: `true`,
      name: `pmnum`,
      id: `x3xp2`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `x3xp2`,
      lookup:       {
        name: `pm`,
        attributeMap:         [
          {
            datasourceField: `pmnum`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `pm`
    },
    {
      searchable: `true`,
      name: `jpnum`,
      id: `rvqvz`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `rvqvz`,
      lookup:       {
        name: `pmjobplan`,
        attributeMap:         [
          {
            datasourceField: `jpnum`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `jobplanLookupds`
    },
    {
      searchable: `true`,
      name: `classstructureid`,
      id: `a84y7`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `a84y7`,
      lookup:       {
        name: `classification`,
        attributeMap:         [
          {
            datasourceField: `classstructureid`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `classification`
    },
    {
      name: `href`,
      id: `n7rv9`
    },
    {
      name: `siteid`,
      type: `STRING`,
      id: `zn2n_`
    },
    {
      name: `woclass`,
      type: `STRING`,
      id: `qzwed`
    },
    {
      name: `historyflag`,
      type: `NUMBER`,
      id: `dqxj7`
    },
    {
      name: `istask`,
      type: `NUMBER`,
      id: `w9w7b`
    },
    {
      name: `autolocate`,
      id: `wymyz`
    },
    {
      name: `serviceaddress.streetaddress`,
      id: `m_n7b`
    },
    {
      name: `serviceaddress.addressline2`,
      id: `xjpby`
    },
    {
      name: `serviceaddress.addressline3`,
      id: `wz84r`
    },
    {
      name: `serviceaddress.city`,
      id: `zp_ra`
    },
    {
      name: `serviceaddress.regiondistrict`,
      id: `nkgv2`
    },
    {
      name: `serviceaddress.stateprovince`,
      id: `y5vxe`
    },
    {
      name: `serviceaddress.postalcode`,
      id: `zp8w6`
    },
    {
      name: `serviceaddress.country`,
      id: `ve579`
    },
    {
      name: `serviceaddress.formattedaddress--formattedaddress`,
      searchable: `true`,
      id: `exe_8`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `nzbrw`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `ex9_v`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("prpew_title", "Work Order")),
      remarks: (app.getLocalizedLabel("prpew_remarks", "Identifies the work order.")),
      id: `prpew`,
      computed: (true),
      local: (true)
    },
    {
      name: `wogroup`,
      id: `j5gkn`
    },
    {
      name: `worktype--worktypename`,
      id: `exkqq`
    },
    {
      name: `istask`,
      id: `a4x2x`
    },
    {
      name: `taskid`,
      id: `gee4q`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `nwn5m`
    },
    {
      name: `status_description`,
      id: `aa374`
    },
    {
      name: `status_maxvalue`,
      index: `true`,
      id: `q97vy`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `ed7ae`
    },
    {
      name: `maxvar.coordinate`,
      id: `rrvmy`
    },
    {
      name: `maxvar.downprompt`,
      id: `za98n`
    },
    {
      name: `rel.multiassetlocci{rel.asset{assetnum,autolocate,assetid},rel.location{location,autolocate,locationsid},rel.ci{cinum,ciid}}`,
      id: `n8_84`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedStates:     {
      computedFunction: ((item, datasource) => datasource.callController('computedStates', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - wolistDS

                

                // begin datasource - woMapListDS
                {
                  let options = {
  platform: `browser`,
  name: `woMapListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 10,
  debounceTime: 100,
  query:   {
    pageSize: 10,
    selectionMode: `none`,
    select: ("wonum,workorderid,description,location,assetnum,status,schedstart,worktype.wtypedesc,allowedstates,rel.wostatus{memo,changeby,changedate},glaccount,wopriority,targstartdate,targcompdate,failurecode,pmnum,jpnum,classstructureid,href,siteid,woclass,historyflag,istask,autolocate,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,wogroup,worktype--worktypename,istask,taskid,status,status_description,status_maxvalue,uxsynonymdomain.valueid,maxvar.coordinate,maxvar.downprompt,rel.multiassetlocci{rel.asset{assetnum,autolocate,assetid},rel.location{location,autolocate,locationsid},rel.ci{cinum,ciid}}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`wonum`,
`description`,
`location`,
`assetnum`,
`glaccount`,
`wopriority`,
`targstartdate`,
`targcompdate`,
`failurecode`,
`pmnum`,
`jpnum`,
`classstructureid`,
`serviceaddress.formattedaddress`,
`status`
    ],
    orderBy: `schedstart`,
    objectStructure: `MXAPIWODETAIL`,
    includeCounts: true,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `wolistDS`,
    indexAttributes:     [
`wonum`,
`description`,
`location`,
`assetnum`,
`glaccount`,
`wopriority`,
`targstartdate`,
`targcompdate`,
`failurecode`,
`pmnum`,
`jpnum`,
`classstructureid`,
`serviceaddress.formattedaddress--formattedaddress`,
`status`,
`status_maxvalue`
    ]
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: `workorderid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      searchable: `true`,
      id: `a6kr3`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `rb3wj`
    },
    {
      name: `description`,
      id: `n7zjz`,
      searchable: `true`
    },
    {
      searchable: `true`,
      name: `location`,
      id: `w657v`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `w657v`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `locationLookupDSMultiSelect`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `m97b3`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `m97b3`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `assetLookupDSMultiSelect`
    },
    {
      name: `status`,
      id: `jgbb6`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `jgbb6`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ]
      },
      datasource: `woliststatus`
    },
    {
      name: `schedstart`,
      'sub-type': `DATE`,
      id: `z_wrp`
    },
    {
      name: `worktype.wtypedesc`,
      id: `gzwk5`
    },
    {
      name: `allowedstates`,
      id: `kjy8b`
    },
    {
      name: `computedStates`,
      'computed-function': `computedStates`,
      id: `a229q`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.wostatus{memo,changeby,changedate}`,
      id: `rrg8x`
    },
    {
      name: `glaccount`,
      searchable: `true`,
      id: `qzrpp`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `gr6vg`
    },
    {
      name: `targstartdate`,
      'sub-type': `DATE`,
      searchable: `true`,
      id: `qmwn4`
    },
    {
      name: `targcompdate`,
      'sub-type': `DATE`,
      searchable: `true`,
      id: `nb968`
    },
    {
      searchable: `true`,
      name: `failurecode`,
      id: `xyg6d`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `xyg6d`,
      lookup:       {
        name: `workfailure`,
        attributeMap:         [
          {
            datasourceField: `failurecode`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `failureclassDSMultiselect`
    },
    {
      searchable: `true`,
      name: `pmnum`,
      id: `x3xp2`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `x3xp2`,
      lookup:       {
        name: `pm`,
        attributeMap:         [
          {
            datasourceField: `pmnum`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `pm`
    },
    {
      searchable: `true`,
      name: `jpnum`,
      id: `rvqvz`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `rvqvz`,
      lookup:       {
        name: `pmjobplan`,
        attributeMap:         [
          {
            datasourceField: `jpnum`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `jobplanLookupds`
    },
    {
      searchable: `true`,
      name: `classstructureid`,
      id: `a84y7`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `a84y7`,
      lookup:       {
        name: `classification`,
        attributeMap:         [
          {
            datasourceField: `classstructureid`,
            lookupField: `value`
          },
          {
            datasourceField: `description`,
            lookupField: `description`
          }
        ]
      },
      datasource: `classification`
    },
    {
      name: `href`,
      id: `n7rv9`
    },
    {
      name: `siteid`,
      type: `STRING`,
      id: `zn2n_`
    },
    {
      name: `woclass`,
      type: `STRING`,
      id: `qzwed`
    },
    {
      name: `historyflag`,
      type: `NUMBER`,
      id: `dqxj7`
    },
    {
      name: `istask`,
      type: `NUMBER`,
      id: `w9w7b`
    },
    {
      name: `autolocate`,
      id: `wymyz`
    },
    {
      name: `serviceaddress.streetaddress`,
      id: `m_n7b`
    },
    {
      name: `serviceaddress.addressline2`,
      id: `xjpby`
    },
    {
      name: `serviceaddress.addressline3`,
      id: `wz84r`
    },
    {
      name: `serviceaddress.city`,
      id: `zp_ra`
    },
    {
      name: `serviceaddress.regiondistrict`,
      id: `nkgv2`
    },
    {
      name: `serviceaddress.stateprovince`,
      id: `y5vxe`
    },
    {
      name: `serviceaddress.postalcode`,
      id: `zp8w6`
    },
    {
      name: `serviceaddress.country`,
      id: `ve579`
    },
    {
      name: `serviceaddress.formattedaddress--formattedaddress`,
      searchable: `true`,
      id: `exe_8`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `nzbrw`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `ex9_v`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("prpew_title", "Work Order")),
      remarks: (app.getLocalizedLabel("prpew_remarks", "Identifies the work order.")),
      id: `prpew`,
      computed: (true),
      local: (true)
    },
    {
      name: `wogroup`,
      id: `j5gkn`
    },
    {
      name: `worktype--worktypename`,
      id: `exkqq`
    },
    {
      name: `istask`,
      id: `a4x2x`
    },
    {
      name: `taskid`,
      id: `gee4q`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `nwn5m`
    },
    {
      name: `status_description`,
      id: `aa374`
    },
    {
      name: `status_maxvalue`,
      index: `true`,
      id: `q97vy`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `ed7ae`
    },
    {
      name: `maxvar.coordinate`,
      id: `rrvmy`
    },
    {
      name: `maxvar.downprompt`,
      id: `za98n`
    },
    {
      name: `rel.multiassetlocci{rel.asset{assetnum,autolocate,assetid},rel.location{location,autolocate,locationsid},rel.ci{cinum,ciid}}`,
      id: `n8_84`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `wolistDS`,
  computedFields:   {
    computedStates:     {
      computedFunction: ((item, datasource) => datasource.callController('computedStates', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - woMapListDS

                

                // begin datasource - jobplanLookupds
                {
                  let options = {
  platform: `browser`,
  name: `jobplanLookupds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    resetDatasource: true,
    objectStructure: `MXAPIJOBPLAN`,
    savedQuery: `JOBPLANLOOKUP`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `jobplanLookupds`,
    searchAttributes:     [
`jpnum`,
`description`,
`jobplanclass.woclass`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`jpnum`,
`description`,
`jobplanclass.woclass`,
`siteid`,
`orgid`
    ],
    select: `jpnum,description,jobplanclass.woclass,siteid,orgid`
  },
  objectStructure: `MXAPIJOBPLAN`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `jpnum`,
      searchable: `true`,
      id: `aqv48`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `za2pe`
    },
    {
      name: `jobplanclass.woclass`,
      searchable: `true`,
      title: (app.getLocalizedLabel("gaxxz_title", "WO class")),
      id: `gaxxz`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `z8r4n`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `b52pb`
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
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - jobplanLookupds

                

                // begin datasource - inspFormLookupds
                {
                  let options = {
  platform: `browser`,
  name: `inspFormLookupds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: `status="ACTIVE"`,
    resetDatasource: true,
    objectStructure: `MXAPIINSPFORM`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `inspFormLookupds`,
    searchAttributes:     [
`inspformnum`,
`name`
    ],
    indexAttributes:     [
`inspformnum`,
`name`
    ],
    select: `inspformnum,name`
  },
  objectStructure: `MXAPIINSPFORM`,
  idAttribute: `inspformnum`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `inspformnum`,
      'unique-id': `true`,
      searchable: `true`,
      id: `q9azv`
    },
    {
      name: `name`,
      searchable: `true`,
      id: `wp5d8`
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
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - inspFormLookupds

                

                // begin datasource - pm
                {
                  let options = {
  platform: `browser`,
  name: `pm`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    objectStructure: `MXAPIPM`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `pm`,
    searchAttributes:     [
`pmnum`,
`description`
    ],
    indexAttributes:     [
`pmnum`,
`description`
    ],
    select: `pmnum,description`
  },
  objectStructure: `MXAPIPM`,
  idAttribute: ``,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `pmnum`,
      searchable: `true`,
      id: `p7kv7`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `wqj3x`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - pm

                

                // begin datasource - classification
                {
                  let options = {
  platform: `browser`,
  name: `classification`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    objectStructure: `MXAPICLASSSTRUCTURE`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `classification`,
    searchAttributes:     [
`classificationid`,
`classstructureid`,
`description`
    ],
    indexAttributes:     [
`classificationid`,
`classstructureid`,
`description`
    ],
    select: `classificationid,classstructureid,description`
  },
  objectStructure: `MXAPICLASSSTRUCTURE`,
  idAttribute: ``,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `classificationid`,
      searchable: `true`,
      id: `mrb5m`
    },
    {
      name: `classstructureid`,
      searchable: `true`,
      id: `yq98p`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `k724w`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - classification

                

                // begin datasource - allStatusDS
                {
                  let options = {
  platform: `browser`,
  name: `allStatusDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    orderBy: `value ascending`,
    itemUrl: `/oslc/os/mxapiwodetail/zombie/getlist~status?oslc.select=description,maxvalue,value,valueid`,
    objectStructure: `MXAPISYNONYMDOMAIN`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `allStatusDS`,
    select: `description,maxvalue,value,valueid`
  },
  objectStructure: `MXAPISYNONYMDOMAIN`,
  idAttribute: ``,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      id: `xkbd6`
    },
    {
      name: `maxvalue`,
      id: `zank3`
    },
    {
      name: `value`,
      id: `vmm73`
    },
    {
      name: `valueid`,
      id: `m5z5d`
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - allStatusDS

                

                // begin datasource - woliststatus
                {
                  let options = {
  platform: `browser`,
  name: `woliststatus`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    select: `description,maxvalue,value,valueid`,
    sortAttributes:     [

    ],
    searchAttributes:     [

    ],
    selectionMode: `multiple`,
    orderBy: `value ascending`,
    itemUrl: `/oslc/os/mxapiwodetail/zombie/getlist~status?oslc.select=description,maxvalue,value,valueid`,
    objectStructure: `MXAPISYNONYMDOMAIN`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `allStatusDS`
  },
  objectStructure: `MXAPISYNONYMDOMAIN`,
  idAttribute: ``,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      id: `xkbd6`
    },
    {
      name: `maxvalue`,
      id: `zank3`
    },
    {
      name: `value`,
      id: `vmm73`
    },
    {
      name: `valueid`,
      id: `m5z5d`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `allStatusDS`,
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
  autoinitwf: false,
  autoLoadRef:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - woliststatus

                

                // begin datasource - logtypeSynonymDomainDS
                {
                  let options = {
  platform: `browser`,
  name: `logtypeSynonymDomainDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: `domainid="LOGTYPE"`,
    objectStructure: `mxapisynonymdomain`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `logtypeSynonymDomainDS`,
    searchAttributes:     [
`value`,
`maxvalue`,
`description`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`value`,
`maxvalue`,
`description`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    select: `value,maxvalue,description,domainid,valueid,siteid,orgid,defaults`
  },
  objectStructure: `mxapisynonymdomain`,
  idAttribute: `maxvalue`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      searchable: `true`,
      id: `xx6yz`
    },
    {
      name: `maxvalue`,
      'unique-id': `true`,
      searchable: `true`,
      id: `yj4dk`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `n847b`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `my5q3`
    },
    {
      name: `valueid`,
      searchable: `true`,
      id: `ygyg4`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `v2w6x`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `wzr8p`
    },
    {
      name: `defaults`,
      id: `zmbj6`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - logtypeSynonymDomainDS

                

                // begin datasource - worktypeDS
                {
                  let options = {
  platform: `browser`,
  name: `worktypeDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: (`orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}" and woclass="WORKORDER"`),
    orderBy: `worktype ascending`,
    idAttribute: `worktypeid`,
    resetDatasource: true,
    objectStructure: `mxapiworktype`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `worktypeDS`,
    searchAttributes:     [
`worktypeid`,
`worktype`,
`wtypedesc`,
`orgid`
    ],
    indexAttributes:     [
`worktypeid`,
`worktype`,
`wtypedesc`,
`orgid`
    ],
    select: `worktypeid,worktype,wtypedesc,orgid,woclass`
  },
  objectStructure: `mxapiworktype`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `worktypeid`,
      searchable: `true`,
      id: `ddr8d`
    },
    {
      name: `worktype`,
      title: (app.getLocalizedLabel("g3r9r_title", "Type")),
      searchable: `true`,
      id: `g3r9r`
    },
    {
      name: `wtypedesc`,
      searchable: `true`,
      id: `bzmqx`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `mb664`
    },
    {
      name: `woclass`,
      id: `rvqzb`
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
      lastValue: (`orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}" and woclass="WORKORDER"`),
      check: (()=>{return `orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}" and woclass="WORKORDER"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - worktypeDS

                

                // begin datasource - failureclassDS
                {
                  let options = {
  platform: `browser`,
  name: `failureclassDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: (`orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}"`),
    orderBy: `failurecode ascending`,
    itemUrl: `/oslc/os/mxapiwodetail/zombie/getlist~failurecode?oslc.select=failurecodeid,failurecode,description,orgid,failurelist.failurelist--failurelist`,
    idAttribute: `failurecodeid`,
    resetDatasource: true,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `failureclassDS`,
    searchAttributes:     [
`failurecodeid`,
`failurecode`,
`description`
    ],
    indexAttributes:     [
`failurecodeid`,
`failurecode`,
`description`
    ],
    select: `failurecodeid,failurecode,description,orgid,failurelist.failurelist--failurelist`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `failurecodeid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `failurecodeid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `xpr64`
    },
    {
      name: `failurecode`,
      searchable: `true`,
      id: `z4ne6`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `y89ap`
    },
    {
      name: `orgid`,
      id: `nmqj8`
    },
    {
      name: `failurelist.failurelist--failurelist`,
      id: `q6nbm`
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
      lastValue: (`orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}"`),
      check: (()=>{return `orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - failureclassDS

                

                // begin datasource - failureclassDSMultiselect
                {
                  let options = {
  platform: `browser`,
  name: `failureclassDSMultiselect`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    select: `failurecodeid,failurecode,description,orgid,failurelist.failurelist--failurelist`,
    sortAttributes:     [

    ],
    searchAttributes:     [
`failurecodeid`,
`failurecode`,
`description`
    ],
    where: (`orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}"`),
    orderBy: `failurecode ascending`,
    itemUrl: `/oslc/os/mxapiwodetail/zombie/getlist~failurecode?oslc.select=failurecodeid,failurecode,description,orgid,failurelist.failurelist--failurelist`,
    idAttribute: `failurecodeid`,
    resetDatasource: true,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `failureclassDS`,
    indexAttributes:     [
`failurecodeid`,
`failurecode`,
`description`
    ]
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `failurecodeid`,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `failurecodeid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `xpr64`
    },
    {
      name: `failurecode`,
      searchable: `true`,
      id: `z4ne6`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `y89ap`
    },
    {
      name: `orgid`,
      id: `nmqj8`
    },
    {
      name: `failurelist.failurelist--failurelist`,
      id: `q6nbm`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `failureclassDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}"`),
      check: (()=>{return `orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - failureclassDSMultiselect

                

                // begin datasource - failurelistDS
                {
                  let options = {
  platform: `browser`,
  name: `failurelistDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    orderBy: `failurecode.failurecode ascending`,
    default: true,
    resetDatasource: true,
    objectStructure: `mxapifailurelist`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `failurelistDS`,
    searchAttributes:     [
`failurelist`,
`failurecode.description`,
`orgid`,
`parent`,
`type`,
`failurecode.failurecode`
    ],
    indexAttributes:     [
`failurelist`,
`failurecode.description`,
`orgid`,
`parent`,
`type`,
`failurecode.failurecode`
    ],
    select: `failurelist,failurecode.description,orgid,parent,type,failurecode.failurecode`
  },
  objectStructure: `mxapifailurelist`,
  idAttribute: `failurelist`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `failurelist`,
      searchable: `true`,
      'unique-id': `true`,
      id: `en5e5`
    },
    {
      name: `failurecode.description`,
      searchable: `true`,
      type: `STRING`,
      'sub-type': `ALN`,
      id: `jgp6e`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `jd3ar`
    },
    {
      name: `parent`,
      searchable: `true`,
      id: `by38p`
    },
    {
      name: `type`,
      searchable: `true`,
      id: `kwe8r`
    },
    {
      name: `failurecode.failurecode`,
      title: (app.getLocalizedLabel("gkvk__title", "Problem code")),
      searchable: `true`,
      id: `gkvk_`
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
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - failurelistDS

                

                // begin datasource - followupWODS
                {
                  let options = {
  platform: `browser`,
  name: `followupWODS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    idAttribute: `workorderid`,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `followupWODS`,
    select: `workorderid,wonum,description,description_longdescription,wopriority,schedstart,schedfinish,worktype,estdur,orgid,siteid,woclass,woassetdesc,wolocationdesc,status,status_maxvalue,reportedby,glaccount`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `ydz6z`
    },
    {
      name: `wonum`,
      id: `e642e`
    },
    {
      name: `description`,
      'max-length': `100`,
      id: `k6dp4`
    },
    {
      name: `description_longdescription`,
      id: `v_g74`
    },
    {
      name: `wopriority`,
      id: `n4p5v`
    },
    {
      name: `schedstart`,
      id: `x789n`
    },
    {
      name: `schedfinish`,
      id: `yd8db`
    },
    {
      name: `worktype`,
      id: `nzbb_`
    },
    {
      name: `estdur`,
      id: `k64n9`
    },
    {
      name: `orgid`,
      id: `bw2r_`
    },
    {
      name: `siteid`,
      id: `n2kdv`
    },
    {
      name: `woclass`,
      id: `v9zew`
    },
    {
      name: `woassetdesc`,
      id: `xqvbx`
    },
    {
      name: `wolocationdesc`,
      id: `bz36p`
    },
    {
      name: `status`,
      id: `ge7zm`
    },
    {
      name: `status_maxvalue`,
      id: `ej4bg`
    },
    {
      name: `reportedby`,
      id: `gzqjj`
    },
    {
      name: `glaccount`,
      id: `y2ep_`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - followupWODS

                

                // begin datasource - classificationListLookupDS
                {
                  let options = {
  platform: `browser`,
  name: `classificationListLookupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    orderBy: `classificationid`,
    resetDatasource: true,
    objectStructure: `mxapiclassstructure`,
    savedQuery: (app.state.classificationDS),
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `classificationListLookupDS`,
    searchAttributes:     [
`classificationid`,
`description`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`classificationid`,
`description`,
`siteid`,
`orgid`
    ],
    select: `classificationid,classstructureid,hierarchypath,description,siteid,orgid,hierarchypath`
  },
  objectStructure: `mxapiclassstructure`,
  idAttribute: `classificationid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `classificationid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `k_ma2`
    },
    {
      name: `classstructureid`,
      hidden: `true`,
      id: `b2mr3`
    },
    {
      name: `hierarchypath`,
      hidden: `true`,
      id: `dpgd4`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `erdx_`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `yaeqk`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `m6rz2`
    },
    {
      name: `hierarchypath`,
      id: `j24kj`
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
      name: `savedQuery`,
      lastValue: (app.state.classificationDS),
      check: (()=>{return app.state.classificationDS})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ],
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new WorkOrderCreateController();
bootstrapInspector.onNewController(controller, 'WorkOrderCreateController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - classificationListLookupDS

                

                // begin datasource - classificationHierarchicalLookupDS
                {
                  let options = {
  platform: `browser`,
  name: `classificationHierarchicalLookupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: `parent!="*"`,
    orderBy: `classificationid`,
    objectStructure: `mxapiclassstructure`,
    savedQuery: (app.state.classificationDS),
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `classificationHierarchicalLookupDS`,
    searchAttributes:     [
`classificationid`,
`description`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`classificationid`,
`description`,
`siteid`,
`orgid`
    ],
    select: `classificationid,classstructureid,description,siteid,orgid,hierarchypath,parent,classifications,children._dbcount--childcount`
  },
  objectStructure: `mxapiclassstructure`,
  idAttribute: `classificationid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `classificationid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `pdk7x`
    },
    {
      name: `classstructureid`,
      hidden: `true`,
      id: `knbx5`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `gr27r`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `pgmqz`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `jz_z7`
    },
    {
      name: `hierarchypath`,
      id: `yagqj`
    },
    {
      name: `parent`,
      id: `reymq`
    },
    {
      name: `classifications`,
      'child-relationship': `children`,
      id: `n9pbv`
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
      name: `savedQuery`,
      lastValue: (app.state.classificationDS),
      check: (()=>{return app.state.classificationDS})
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - classificationHierarchicalLookupDS

                

                // begin datasource - statusDS
                {
                  let options = {
  name: `statusDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `description`,
      id: `b2vpw`
    },
    {
      name: `maxvalue`,
      id: `w42v3`
    },
    {
      name: `value`,
      id: `zr8j3`
    },
    {
      name: `valueid`,
      id: `v87qw`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `_id`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    orderBy: `value ascending`,
    select: `description,maxvalue,value,valueid`,
    src: ([])
  },
  autoSave: false,
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - statusDS

                

                // begin datasource - earlierStatusMemos
                {
                  let options = {
  name: `earlierStatusMemos`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `memo`,
      id: `k9beb`
    },
    {
      name: `changeby`,
      id: `jzngd`
    },
    {
      name: `changedate`,
      id: `gr433`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    orderBy: `changedate desc`,
    select: `memo,changeby,changedate`,
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - earlierStatusMemos

                

                // begin datasource - earlierMemos
                {
                  let options = {
  name: `earlierMemos`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `memo`,
      id: `d55z7`
    },
    {
      name: `personid`,
      id: `vq9gy`
    },
    {
      name: `transdate`,
      id: `xgjvv`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    orderBy: `transdate desc`,
    select: `memo,personid,transdate`,
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - earlierMemos

                

                // begin datasource - routeActions
                {
                  let options = {
  name: `routeActions`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `wfactionid`,
      id: `nw4b7`
    },
    {
      name: `ownernodeid`,
      id: `k9vaq`
    },
    {
      name: `membernodeid`,
      id: `men8k`
    },
    {
      name: `actionid`,
      id: `m9pg9`
    },
    {
      name: `instruction`,
      id: `ww6aa`
    },
    {
      name: `ispositive`,
      id: `g9xeb`
    }
  ],
  sortAttributes:   [

  ],
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    orderBy: `instruction ascending`,
    select: `wfactionid,ownernodeid,membernodeid,actionid,instruction,ispositive`,
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - routeActions

                

                // begin datasource - personDS
                {
                  let options = {
  platform: `browser`,
  name: `personDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    idAttribute: `personid`,
    resetDatasource: true,
    objectStructure: `MXAPIPERSON`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `personDS`,
    searchAttributes:     [
`displayname`,
`personid`,
`locationsite`,
`locationorg`,
`location`,
`title`,
`department`
    ],
    indexAttributes:     [
`displayname`,
`personid`,
`locationsite`,
`locationorg`,
`location`,
`title`,
`department`
    ],
    select: `displayname,personid,ownergroup,organization,locationsite,locationorg,location,title,department,rel.persongroupteam{persongroup.description,persongroup.persongroup}}`
  },
  objectStructure: `MXAPIPERSON`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `displayname`,
      searchable: `true`,
      id: `zvvv6`
    },
    {
      name: `personid`,
      searchable: `true`,
      id: `a99qn`
    },
    {
      name: `ownergroup`,
      id: `yyvdj`
    },
    {
      name: `organization`,
      title: (app.getLocalizedLabel("nbrxz_title", "Organization")),
      id: `nbrxz`
    },
    {
      name: `locationsite`,
      searchable: `true`,
      title: (app.getLocalizedLabel("gjvqk_title", "Site")),
      id: `gjvqk`
    },
    {
      name: `locationorg`,
      searchable: `true`,
      title: (app.getLocalizedLabel("dq8x3_title", "Organization")),
      id: `dq8x3`
    },
    {
      name: `location`,
      title: (app.getLocalizedLabel("n2y73_title", "Location")),
      searchable: `true`,
      id: `n2y73`
    },
    {
      name: `title`,
      searchable: `true`,
      id: `pg3jk`
    },
    {
      name: `department`,
      searchable: `true`,
      id: `pbwav`
    },
    {
      name: `rel.persongroupteam{persongroup.description,persongroup.persongroup}}`,
      id: `m_wyw`
    },
    {
      name: `computedpersongroup`,
      computed: (true),
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("xmaww_title", "Group")),
      remarks: (app.getLocalizedLabel("xmaww_remarks", "Calculated Person Group field")),
      id: `xmaww`,
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedpersongroup:     {
      computedFunction: ((item, datasource) => { return (item.persongroupteam ? item.persongroupteam.join(',') : '') })
    }
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
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new PageController();
bootstrapInspector.onNewController(controller, 'PageController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - personDS

                

                // begin datasource - personGroupDS
                {
                  let options = {
  platform: `browser`,
  name: `personGroupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    resetDatasource: true,
    objectStructure: `mxapipersongroup`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `personGroupDS`,
    searchAttributes:     [
`persongroup`,
`description`
    ],
    indexAttributes:     [
`persongroup`,
`description`
    ],
    select: `persongroup,description,rel.allpeopleinpersongroup{displayname}`
  },
  objectStructure: `mxapipersongroup`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `persongroup`,
      title: (app.getLocalizedLabel("zvpwz_title", "Group")),
      searchable: `true`,
      id: `zvpwz`
    },
    {
      name: `description`,
      title: (app.getLocalizedLabel("xy2ed_title", "Description")),
      searchable: `true`,
      id: `xy2ed`
    },
    {
      name: `rel.allpeopleinpersongroup{displayname}`,
      id: `mrnbj`
    },
    {
      name: `computedperson`,
      computed: (true),
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("xdpxd_title", "Member")),
      remarks: (app.getLocalizedLabel("xdpxd_remarks", "Calculated Person field")),
      id: `xdpxd`,
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedperson:     {
      computedFunction: ((item, datasource) => { return (item.allpeopleinpersongroup ? item.allpeopleinpersongroup.join(',') : '') })
    }
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
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new PageController();
bootstrapInspector.onNewController(controller, 'PageController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - personGroupDS

                

                // begin datasource - processDS
                {
                  let options = {
  platform: `browser`,
  name: `processDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    objectStructure: `MXAPIWODETAIL`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `processDS`,
    select: `processname,objectname,deletable,description,wfprocessid,processrev`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `processname`,
      id: `p5vwb`
    },
    {
      name: `objectname`,
      id: `mm782`
    },
    {
      name: `deletable`,
      id: `mn234`
    },
    {
      name: `description`,
      id: `kknk7`
    },
    {
      name: `wfprocessid`,
      id: `bxzzv`
    },
    {
      name: `processrev`,
      id: `mrxn4`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - processDS

                

                // begin datasource - locationLookupDS
                {
                  let options = {
  platform: `browser`,
  name: `locationLookupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: (`siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}"`),
    orderBy: `location`,
    resetDatasource: true,
    objectStructure: `MXAPIOPERLOC`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `locationLookupDS`,
    searchAttributes:     [
`location`,
`description`,
`type`,
`siteid`
    ],
    indexAttributes:     [
`location`,
`location`,
`description`,
`type`,
`siteid`
    ],
    select: `locationsid,location,description,type,siteid,locoper.failurecode--locfailurecode,rel.asset{parent,assetnum,failurecodes.failurecode}`
  },
  objectStructure: `MXAPIOPERLOC`,
  idAttribute: `locationsid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `locationsid`,
      'unique-id': `true`,
      id: `ww_v7`
    },
    {
      name: `location`,
      searchable: `true`,
      index: `true`,
      id: `aaxp3`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `pw6vp`
    },
    {
      name: `type`,
      searchable: `true`,
      id: `a8z6r`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x2ky2`
    },
    {
      name: `locoper.failurecode--locfailurecode`,
      id: `vyg_y`
    },
    {
      name: `rel.asset{parent,assetnum,failurecodes.failurecode}`,
      id: `dev4j`
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
      lastValue: (`siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}"`),
      check: (()=>{return `siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - locationLookupDS

                

                // begin datasource - locationLookupDSMultiSelect
                {
                  let options = {
  platform: `browser`,
  name: `locationLookupDSMultiSelect`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    select: ("locationsid,location,description,type,siteid,locoper.failurecode--locfailurecode,rel.asset{parent,assetnum,failurecodes.failurecode}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`location`,
`description`,
`type`,
`siteid`
    ],
    where: (`siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}"`),
    orderBy: `location`,
    resetDatasource: true,
    objectStructure: `MXAPIOPERLOC`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `locationLookupDS`,
    indexAttributes:     [
`location`,
`location`,
`description`,
`type`,
`siteid`
    ]
  },
  objectStructure: `MXAPIOPERLOC`,
  idAttribute: `locationsid`,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `locationsid`,
      'unique-id': `true`,
      id: `ww_v7`
    },
    {
      name: `location`,
      searchable: `true`,
      index: `true`,
      id: `aaxp3`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `pw6vp`
    },
    {
      name: `type`,
      searchable: `true`,
      id: `a8z6r`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x2ky2`
    },
    {
      name: `locoper.failurecode--locfailurecode`,
      id: `vyg_y`
    },
    {
      name: `rel.asset{parent,assetnum,failurecodes.failurecode}`,
      id: `dev4j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `locationLookupDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}"`),
      check: (()=>{return `siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - locationLookupDSMultiSelect

                

                // begin datasource - assetLookupDS
                {
                  let options = {
  platform: `browser`,
  name: `assetLookupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: (`siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}" and status!="DECOMMISSIONED"`),
    orderBy: `description`,
    resetDatasource: true,
    objectStructure: `MXAPIASSET`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `assetLookupDS`,
    searchAttributes:     [
`assetnum`,
`description`,
`location.location`,
`location.description`,
`siteid`
    ],
    indexAttributes:     [
`assetnum`,
`description`,
`location.location`,
`location.description`,
`siteid`
    ],
    select: `assetnum,description,location.location,location.description,siteid,location.locoper.failurecode--locfailurecode,failurecodes.failurecode,failurecodes.description`
  },
  objectStructure: `MXAPIASSET`,
  idAttribute: `assetnum`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `assetnum`,
      'unique-id': `true`,
      searchable: `true`,
      id: `a9en2`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `jggwx`
    },
    {
      name: `location.location`,
      searchable: `true`,
      id: `e2wbp`
    },
    {
      name: `location.description`,
      title: (app.getLocalizedLabel("w3pyx_title", "Location")),
      sortable: `false`,
      searchable: `true`,
      id: `w3pyx`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `apv84`
    },
    {
      name: `location.locoper.failurecode--locfailurecode`,
      id: `rrzwm`
    },
    {
      name: `failurecodes.failurecode`,
      id: `w6mrj`
    },
    {
      name: `failurecodes.description`,
      id: `z_rx4`
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
      lastValue: (`siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}" and status!="DECOMMISSIONED"`),
      check: (()=>{return `siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}" and status!="DECOMMISSIONED"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - assetLookupDS

                

                // begin datasource - assetLookupDSMultiSelect
                {
                  let options = {
  platform: `browser`,
  name: `assetLookupDSMultiSelect`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    select: `assetnum,description,location.location,location.description,siteid,location.locoper.failurecode--locfailurecode,failurecodes.failurecode,failurecodes.description`,
    sortAttributes:     [

    ],
    searchAttributes:     [
`assetnum`,
`description`,
`location.location`,
`location.description`,
`siteid`
    ],
    where: (`siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}" and status!="DECOMMISSIONED"`),
    orderBy: `description`,
    resetDatasource: true,
    objectStructure: `MXAPIASSET`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `assetLookupDS`,
    indexAttributes:     [
`assetnum`,
`description`,
`location.location`,
`location.description`,
`siteid`
    ]
  },
  objectStructure: `MXAPIASSET`,
  idAttribute: `assetnum`,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `assetnum`,
      'unique-id': `true`,
      searchable: `true`,
      id: `a9en2`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `jggwx`
    },
    {
      name: `location.location`,
      searchable: `true`,
      id: `e2wbp`
    },
    {
      name: `location.description`,
      title: (app.getLocalizedLabel("w3pyx_title", "Location")),
      sortable: `false`,
      searchable: `true`,
      id: `w3pyx`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `apv84`
    },
    {
      name: `location.locoper.failurecode--locfailurecode`,
      id: `rrzwm`
    },
    {
      name: `failurecodes.failurecode`,
      id: `w6mrj`
    },
    {
      name: `failurecodes.description`,
      id: `z_rx4`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `assetLookupDS`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}" and status!="DECOMMISSIONED"`),
      check: (()=>{return `siteid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertSite:undefined)}" and status!="DECOMMISSIONED"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
  isMaximoMobile: false,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: false,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - assetLookupDSMultiSelect

                

                // begin datasource - contractLookupDs
                {
                  let options = {
  platform: `browser`,
  name: `contractLookupDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: `contracttype="SERVICE" and status="APPR"`,
    orderBy: `description`,
    objectStructure: `MXAPICONTRACT`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `contractLookupDs`,
    searchAttributes:     [
`contractnum`,
`description`,
`contracttype`,
`vendor`,
`orgid`
    ],
    indexAttributes:     [
`contractnum`,
`description`,
`contracttype`,
`vendor`,
`orgid`
    ],
    select: `contractnum,description,contracttype,vendor,orgid`
  },
  objectStructure: `MXAPICONTRACT`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `contractnum`,
      searchable: `true`,
      id: `kaj_3`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `a58m8`
    },
    {
      name: `contracttype`,
      searchable: `true`,
      id: `rwdav`
    },
    {
      name: `vendor`,
      searchable: `true`,
      id: `mj29p`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `gjyrv`
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
  preLoad: true
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - contractLookupDs

                

                // begin datasource - synonymdomainData
                {
                  let options = {
  platform: `browser`,
  name: `synonymdomainData`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapisynonymdomain`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `synonymdomainData`,
    searchAttributes:     [
`value`,
`maxvalue`,
`description`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`value`,
`maxvalue`,
`description`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    select: `value,maxvalue,description,domainid,valueid,siteid,orgid,defaults`
  },
  objectStructure: `mxapisynonymdomain`,
  idAttribute: `valueid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      searchable: `true`,
      id: `pjn9p`
    },
    {
      name: `maxvalue`,
      searchable: `true`,
      id: `zzzax`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `aeaw3`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `j4vm4`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `vjd97`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `nebex`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `qq9pw`
    },
    {
      name: `defaults`,
      id: `x__5n`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - synonymdomainData

                

                // begin datasource - measurementPointDS
                {
                  let options = {
  platform: `browser`,
  name: `measurementPointDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    resetDatasource: true,
    objectStructure: `mhmeasurepoint`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `measurementPointDS`,
    searchAttributes:     [
`pointnum`,
`description`,
`siteid`
    ],
    indexAttributes:     [
`pointnum`,
`description`,
`siteid`
    ],
    select: `pointnum,description,siteid`
  },
  objectStructure: `mhmeasurepoint`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `pointnum`,
      searchable: `true`,
      id: `xrk_a`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `gznq6`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `wz9vr`
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
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - measurementPointDS

                

                // begin datasource - shiftds
                {
                  let options = {
  platform: `browser`,
  name: `shiftds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    where: (`orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}"`),
    resetDatasource: true,
    objectStructure: `mxapishift`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `shiftds`,
    searchAttributes:     [
`shiftnum`,
`description`,
`orgid`
    ],
    indexAttributes:     [
`shiftnum`,
`description`,
`orgid`
    ],
    select: `shiftnum,description,orgid`
  },
  objectStructure: `mxapishift`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `shiftnum`,
      searchable: `true`,
      id: `wzgdx`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `g7g2d`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `zr49g`
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
      lastValue: (`orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}"`),
      check: (()=>{return `orgid="${(app && app.client && app.client.userInfo?app.client.userInfo.insertOrg:undefined)}"`})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: true,
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
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - shiftds

                

                // begin datasource - woTaskPredecessor
                {
                  let options = {
  platform: `browser`,
  name: `woTaskPredecessor`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    autoSave: false,
    objectStructure: `MXAPIWODETAIL`,
    domainInternalWhere: `status!=CAN,CLOSE,COMP`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woTaskPredecessor`,
    searchAttributes:     [
`wonum`,
`parent`,
`taskid`,
`description`
    ],
    indexAttributes:     [
`wonum`,
`parent`,
`taskid`,
`description`
    ],
    select: `wonum,parent,taskid,woclass,description,location,assetnum,status,workorderid,istask,orgid,siteid`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      title: (app.getLocalizedLabel("v72wn_title", "Work order")),
      searchable: `true`,
      id: `v72wn`
    },
    {
      name: `parent`,
      title: (app.getLocalizedLabel("dzveb_title", "Parent WO")),
      searchable: `true`,
      id: `dzveb`
    },
    {
      name: `taskid`,
      title: (app.getLocalizedLabel("nrkn4_title", "Task")),
      searchable: `true`,
      id: `nrkn4`
    },
    {
      name: `woclass`,
      title: (app.getLocalizedLabel("wg_9y_title", "Class")),
      id: `wg_9y`
    },
    {
      name: `description`,
      title: (app.getLocalizedLabel("zpadp_title", "Description")),
      searchable: `true`,
      id: `zpadp`
    },
    {
      name: `location`,
      title: (app.getLocalizedLabel("xmdn2_title", "Location")),
      id: `xmdn2`
    },
    {
      name: `assetnum`,
      title: (app.getLocalizedLabel("we22e_title", "Asset")),
      id: `we22e`
    },
    {
      name: `status`,
      title: (app.getLocalizedLabel("mrp7z_title", "Status")),
      id: `mrp7z`
    },
    {
      name: `workorderid`,
      id: `n_e9a`
    },
    {
      name: `istask`,
      type: `NUMBER`,
      id: `zn2d2`
    },
    {
      name: `orgid`,
      id: `rr2m5`
    },
    {
      name: `siteid`,
      id: `vdbvx`
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
                  let controller = new TaskController();
bootstrapInspector.onNewController(controller, 'TaskController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - woTaskPredecessor

                

                // begin datasource - allwoPredecessor
                {
                  let options = {
  platform: `browser`,
  name: `allwoPredecessor`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    orderBy: `wonum asc`,
    autoSave: false,
    objectStructure: `MXAPIWODETAIL`,
    savedQuery: `TASKPREDECESSOR`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `allwoPredecessor`,
    searchAttributes:     [
`wonum`,
`parent`,
`taskid`,
`description`
    ],
    indexAttributes:     [
`wonum`,
`parent`,
`taskid`,
`description`
    ],
    select: `wonum,parent,taskid,woclass,description,location,assetnum,status,workorderid,istask,orgid,siteid`
  },
  objectStructure: `MXAPIWODETAIL`,
  idAttribute: ``,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      searchable: `true`,
      id: `jjdyj`
    },
    {
      name: `parent`,
      type: `STRING`,
      searchable: `true`,
      id: `bqaw3`
    },
    {
      name: `taskid`,
      searchable: `true`,
      id: `eqr55`
    },
    {
      name: `woclass`,
      id: `n_9jk`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `n4x64`
    },
    {
      name: `location`,
      id: `emkxe`
    },
    {
      name: `assetnum`,
      id: `n_2wb`
    },
    {
      name: `status`,
      id: `vd9nb`
    },
    {
      name: `workorderid`,
      id: `e3rxd`
    },
    {
      name: `istask`,
      type: `NUMBER`,
      id: `zknd6`
    },
    {
      name: `orgid`,
      id: `v2k8j`
    },
    {
      name: `siteid`,
      id: `wbqbd`
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
                  let controller = new TaskController();
bootstrapInspector.onNewController(controller, 'TaskController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - allwoPredecessor

                

                // begin datasource - selectedPredecessor
                {
                  let options = {
  name: `selectedPredecessor`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `items`,
  schema: `schema`,
  schemaExt:   [
    {
      name: `wonum`,
      title: (app.getLocalizedLabel("je8wa_title", "Work order")),
      id: `je8wa`
    },
    {
      name: `parent`,
      title: (app.getLocalizedLabel("w36d9_title", "Parent WO")),
      id: `w36d9`
    },
    {
      name: `taskid`,
      title: (app.getLocalizedLabel("vy4ea_title", "Task")),
      id: `vy4ea`
    },
    {
      name: `woclass`,
      title: (app.getLocalizedLabel("ka64n_title", "Class")),
      id: `ka64n`
    },
    {
      name: `description`,
      title: (app.getLocalizedLabel("pv55d_title", "Description")),
      id: `pv55d`
    },
    {
      name: `location`,
      title: (app.getLocalizedLabel("vpp3w_title", "Location")),
      id: `vpp3w`
    },
    {
      name: `assetnum`,
      title: (app.getLocalizedLabel("yrg68_title", "Asset")),
      id: `yrg68`
    },
    {
      name: `status`,
      title: (app.getLocalizedLabel("jqapp_title", "Status")),
      id: `jqapp`
    },
    {
      name: `workorderid`,
      id: `me9nd`
    },
    {
      name: `istask`,
      type: `NUMBER`,
      id: `argxv`
    },
    {
      name: `predwonum`,
      id: `bm6de`
    },
    {
      name: `predrefwonum`,
      id: `vxped`
    },
    {
      name: `reltype`,
      id: `na5d9`
    },
    {
      name: `predtaskid`,
      id: `eydax`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `wonum`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `wonum,parent,taskid,woclass,description,location,assetnum,status,workorderid,istask,predwonum,predrefwonum,reltype,predtaskid`,
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
                  let controller = new TaskController();
bootstrapInspector.onNewController(controller, 'TaskController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - selectedPredecessor

                

                // begin datasource - woAIResourceDS
                {
                  let options = {
  platform: `browser`,
  name: `woAIResourceDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    autoSave: false,
    idAttribute: `workorderid`,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woAIResourceDS`,
    select: `wonum,workorderid,ai_usefortraining`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      id: `gxzr_`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `jbpqm`
    },
    {
      name: `ai_usefortraining`,
      id: `pd2xw`
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

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - woAIResourceDS

                

                // begin datasource - craftLookup
                {
                  let options = {
  platform: `browser`,
  name: `craftLookup`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    itemUrl: `oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~craft?oslc.select=craftrateid,skilllevel,standardrate,contractnum,craft,vendor`,
    resetDatasource: true,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `craftLookup`,
    searchAttributes:     [
`craft`,
`skilllevel`,
`vendor`,
`contractnum`,
`standardrate`,
`orgid`
    ],
    indexAttributes:     [
`craft`,
`skilllevel`,
`vendor`,
`contractnum`,
`standardrate`,
`orgid`
    ],
    select: `craftrateid,craft,skilllevel,vendor,contractnum,standardrate,orgid`
  },
  idAttribute: `craftrateid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `craftrateid`,
      'unique-id': `true`,
      id: `dnb7r`
    },
    {
      name: `craft`,
      searchable: `true`,
      title: (app.getLocalizedLabel("pee5x_title", "Craft")),
      id: `pee5x`
    },
    {
      name: `skilllevel`,
      searchable: `true`,
      title: (app.getLocalizedLabel("mz_dg_title", "Skill level")),
      id: `mz_dg`
    },
    {
      name: `vendor`,
      searchable: `true`,
      title: (app.getLocalizedLabel("jwg55_title", "Vendor")),
      id: `jwg55`
    },
    {
      name: `contractnum`,
      searchable: `true`,
      title: (app.getLocalizedLabel("mjry__title", "Contract")),
      id: `mjry_`
    },
    {
      name: `standardrate`,
      searchable: `true`,
      title: (app.getLocalizedLabel("vrn3p_title", "Standard rate")),
      id: `vrn3p`
    },
    {
      name: `orgid`,
      searchable: `true`,
      title: (app.getLocalizedLabel("pkmk5_title", "Organization")),
      id: `pkmk5`
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
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - craftLookup

                

                // begin datasource - workGroupLookup
                {
                  let options = {
  platform: `browser`,
  name: `workGroupLookup`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    resetDatasource: true,
    objectStructure: `MXAPIPERSONGROUP`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `workGroupLookup`,
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
  objectStructure: `MXAPIPERSONGROUP`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `persongroup`,
      searchable: `true`,
      title: (app.getLocalizedLabel("p9pkk_title", "Person group")),
      id: `p9pkk`
    },
    {
      name: `description`,
      searchable: `true`,
      title: (app.getLocalizedLabel("vnkkb_title", "Description")),
      id: `vnkkb`
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
  autoinitwf: true,
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - workGroupLookup

                

                // begin datasource - ownerworkGroupLookup
                {
                  let options = {
  platform: `browser`,
  name: `ownerworkGroupLookup`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    resetDatasource: true,
    objectStructure: `MXAPIPERSONGROUP`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `ownerworkGroupLookup`,
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
  objectStructure: `MXAPIPERSONGROUP`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `persongroup`,
      searchable: `true`,
      title: (app.getLocalizedLabel("rw6b8_title", "Person group")),
      id: `rw6b8`
    },
    {
      name: `description`,
      searchable: `true`,
      title: (app.getLocalizedLabel("dbvam_title", "Description")),
      id: `dbvam`
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
  autoinitwf: true,
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - ownerworkGroupLookup

                

                // begin datasource - crewworkGroupLookup
                {
                  let options = {
  platform: `browser`,
  name: `crewworkGroupLookup`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    itemUrl: `oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~CREWWORKGROUP?oslc.select=persongroup,description`,
    resetDatasource: true,
    objectStructure: `mxapiwodetail`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `crewworkGroupLookup`,
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
  objectStructure: `mxapiwodetail`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `persongroup`,
      searchable: `true`,
      title: (app.getLocalizedLabel("n5_2n_title", "Person group")),
      id: `n5_2n`
    },
    {
      name: `description`,
      searchable: `true`,
      title: (app.getLocalizedLabel("vnkb_title", "Description")),
      id: `vnkb`
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
  autoinitwf: true,
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - crewworkGroupLookup

                

                // begin datasource - laborLookup
                {
                  let options = {
  platform: `browser`,
  name: `laborLookup`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    itemUrl: `oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~laborcode?oslc.select=laborcode,personid,orgid`,
    resetDatasource: true,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `laborLookup`,
    searchAttributes:     [
`laborcode`
    ],
    indexAttributes:     [
`laborcode`,
`orgid`
    ],
    select: `laborcode,personid,orgid`
  },
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `laborcode`,
      id: `k2mja`,
      searchable: `true`
    },
    {
      name: `personid`,
      sortable: `false`,
      title: (app.getLocalizedLabel("p688w_title", "Name")),
      id: `p688w`
    },
    {
      name: `orgid`,
      id: `w46m8`,
      index: `true`
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
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - laborLookup

                

                // begin datasource - crewTypeLookupDS
                {
                  let options = {
  platform: `browser`,
  name: `crewTypeLookupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    orderBy: `amcrewtype asc`,
    itemUrl: `oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~amcrewtype?oslc.select=amcrewtype,description,contractnum,orgid`,
    resetDatasource: true,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `crewTypeLookupDS`,
    searchAttributes:     [
`amcrewtype`,
`orgid`
    ],
    indexAttributes:     [
`amcrewtype`,
`orgid`
    ],
    select: `amcrewtype,description,orgid`
  },
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `amcrewtype`,
      searchable: `true`,
      title: (app.getLocalizedLabel("akpky_title", "Crew type")),
      id: `akpky`
    },
    {
      name: `description`,
      sortable: `false`,
      title: (app.getLocalizedLabel("je_qp_title", "Description")),
      id: `je_qp`
    },
    {
      name: `orgid`,
      searchable: `true`,
      title: (app.getLocalizedLabel("wqney_title", "Organization")),
      id: `wqney`
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
  autoinitwf: true,
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - crewTypeLookupDS

                

                // begin datasource - crewLookup
                {
                  let options = {
  platform: `browser`,
  name: `crewLookup`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    orderBy: `amcrew asc`,
    itemUrl: `oslc/os/mxapiwodetail/_QkVERk9SRC8xMjIx/wplabor/newmbo/getlist~amcrew?oslc.select=amcrew,description,amcrewtype,vendor,contractnum,orgid`,
    resetDatasource: true,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `crewLookup`,
    searchAttributes:     [
`amcrew`,
`amcrewtype`,
`vendor`,
`contractnum`,
`orgid`
    ],
    indexAttributes:     [
`amcrew`,
`amcrewtype`,
`vendor`,
`contractnum`,
`orgid`
    ],
    select: `amcrew,description,amcrewtype,vendor,contractnum,orgid`
  },
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `amcrew`,
      searchable: `true`,
      title: (app.getLocalizedLabel("vym6n_title", "Crew")),
      id: `vym6n`
    },
    {
      name: `description`,
      sortable: `false`,
      title: (app.getLocalizedLabel("rzkyv_title", "Description")),
      id: `rzkyv`
    },
    {
      name: `amcrewtype`,
      searchable: `true`,
      title: (app.getLocalizedLabel("nx9k__title", "Crew type")),
      id: `nx9k_`
    },
    {
      name: `vendor`,
      searchable: `true`,
      title: (app.getLocalizedLabel("v4n5z_title", "Vendor")),
      id: `v4n5z`
    },
    {
      name: `contractnum`,
      searchable: `true`,
      title: (app.getLocalizedLabel("gkjxx_title", "Contract")),
      id: `gkjxx`
    },
    {
      name: `orgid`,
      searchable: `true`,
      title: (app.getLocalizedLabel("qbmwa_title", "Organization")),
      id: `qbmwa`
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
  autoinitwf: true,
  autoLoadRef:   [

  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - crewLookup

                
    
                // begin dialog - routeAssignment
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `routeAssignment`,
  configuration:   {
    id: `routeAssignment`,
    dialogRenderer: ((props => {
    return (
      <DialogRouteAssignment id={"routeAssignment_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new RouteWorkflowDialogController();
          bootstrapInspector.onNewController(controller, 'RouteWorkflowDialogController', dialog);
        dialog.registerController(controller);
                  app.registerDialog(dialog);
                }
                // end dialog - routeAssignment
                

                // begin dialog - updateStatus
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `updateStatus`,
  configuration:   {
    id: `updateStatus`,
    dialogRenderer: ((props => {
    return (
      <DialogUpdateStatus id={"updateStatus_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new WorkOrderDialogController();
          bootstrapInspector.onNewController(controller, 'WorkOrderDialogController', dialog);
        dialog.registerController(controller);
                  app.registerDialog(dialog);
                }
                // end dialog - updateStatus
                

                // begin dialog - startWorkflow
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `startWorkflow`,
  configuration:   {
    id: `startWorkflow`,
    dialogRenderer: ((props => {
    return (
      <DialogStartWorkflow id={"startWorkflow_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new WorkOrderDialogController();
          bootstrapInspector.onNewController(controller, 'WorkOrderDialogController', dialog);
        dialog.registerController(controller);
                  app.registerDialog(dialog);
                }
                // end dialog - startWorkflow
                

                // begin dialog - show_SelectOwnerDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `show_SelectOwnerDialog`,
  configuration:   {
    id: `show_SelectOwnerDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogShow_SelectOwnerDialog id={"show_SelectOwnerDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new WorkOrderDialogController();
          bootstrapInspector.onNewController(controller, 'WorkOrderDialogController', dialog);
        dialog.registerController(controller);
                  app.registerDialog(dialog);
                }
                // end dialog - show_SelectOwnerDialog
                

                // begin dialog - reassignItem
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `reassignItem`,
  configuration:   {
    id: `reassignItem`,
    dialogRenderer: ((props => {
    return (
      <DialogReassignItem id={"reassignItem_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new RouteWorkflowDialogController();
          bootstrapInspector.onNewController(controller, 'RouteWorkflowDialogController', dialog);
        dialog.registerController(controller);
                  app.registerDialog(dialog);
                }
                // end dialog - reassignItem
                

                // begin dialog - openReassignLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openReassignLookup`,
  configuration:   {
    id: `openReassignLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenReassignLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenReassignLookup {...props} />
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
                // end dialog - openReassignLookup
                

                // begin dialog - openPersonLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openPersonLookup`,
  configuration:   {
    id: `openPersonLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenPersonLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenPersonLookup {...props} />
    );
  })
  ),
    resetDatasource: true
  }
};
                  bootstrapInspector.onNewDialogOptions(options);
                  let dialog = new Dialog(options)
                  bootstrapInspector.onNewDialog(dialog, options);
                  dialog.addInitializer((dialog, parent, app)=>{
                    
                    
                  });
                  
                  app.registerDialog(dialog);
                }
                // end dialog - openPersonLookup
                

                // begin dialog - workTypeLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `workTypeLookup`,
  configuration:   {
    id: `workTypeLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupWorkTypeLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupWorkTypeLookup {...props} />
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
                // end dialog - workTypeLookup
                

                // begin dialog - failureClassLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `failureClassLookup`,
  configuration:   {
    id: `failureClassLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupFailureClassLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupFailureClassLookup {...props} />
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
                // end dialog - failureClassLookup
                

                // begin dialog - problemCodeLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `problemCodeLookup`,
  configuration:   {
    id: `problemCodeLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupProblemCodeLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupProblemCodeLookup {...props} />
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
                // end dialog - problemCodeLookup
                

                // begin dialog - openLocationLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openLocationLookup`,
  configuration:   {
    id: `openLocationLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenLocationLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenLocationLookup {...props} />
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
                // end dialog - openLocationLookup
                

                // begin dialog - openAssetLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openAssetLookup`,
  configuration:   {
    id: `openAssetLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenAssetLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenAssetLookup {...props} />
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
                // end dialog - openAssetLookup
                

                // begin dialog - openContractLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openContractLookup`,
  configuration:   {
    id: `openContractLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenContractLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenContractLookup {...props} />
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
                // end dialog - openContractLookup
                

                // begin dialog - openJobPlanLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openJobPlanLookup`,
  configuration:   {
    id: `openJobPlanLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenJobPlanLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenJobPlanLookup {...props} />
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
                // end dialog - openJobPlanLookup
                

                // begin dialog - openInspFormLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openInspFormLookup`,
  configuration:   {
    id: `openInspFormLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenInspFormLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenInspFormLookup {...props} />
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
                // end dialog - openInspFormLookup
                

                // begin dialog - openInspectorLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openInspectorLookup`,
  configuration:   {
    id: `openInspectorLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenInspectorLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenInspectorLookup {...props} />
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
                // end dialog - openInspectorLookup
                

                // begin dialog - openMeasurementPointLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openMeasurementPointLookup`,
  configuration:   {
    id: `openMeasurementPointLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenMeasurementPointLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenMeasurementPointLookup {...props} />
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
                // end dialog - openMeasurementPointLookup
                

                // begin dialog - openShiftLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openShiftLookup`,
  configuration:   {
    id: `openShiftLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenShiftLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenShiftLookup {...props} />
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
                // end dialog - openShiftLookup
                

                // begin dialog - addWorklogComment
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `addWorklogComment`,
  configuration:   {
    id: `addWorklogComment`,
    dialogRenderer: ((props => {
    return (
      <DialogAddWorklogComment id={"addWorklogComment_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new WorkOrderSummaryController();
          bootstrapInspector.onNewController(controller, 'WorkOrderSummaryController', dialog);
        dialog.registerController(controller);
                  app.registerDialog(dialog);
                }
                // end dialog - addWorklogComment
                

                // begin dialog - openClassificationListLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openClassificationListLookup`,
  configuration:   {
    id: `openClassificationListLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupOpenClassificationListLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupOpenClassificationListLookup {...props} />
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
                // end dialog - openClassificationListLookup
                

                // begin dialog - openClassificationHierarchicalLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `openClassificationHierarchicalLookup`,
  configuration:   {
    id: `openClassificationHierarchicalLookup`,
    dialogRenderer: ((props => {
    return (
      <DialogOpenClassificationHierarchicalLookup id={"openClassificationHierarchicalLookup_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                  let controller = new WorkOrderCreateController();
          bootstrapInspector.onNewController(controller, 'WorkOrderCreateController', dialog);
        dialog.registerController(controller);
                  app.registerDialog(dialog);
                }
                // end dialog - openClassificationHierarchicalLookup
                
  
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
      