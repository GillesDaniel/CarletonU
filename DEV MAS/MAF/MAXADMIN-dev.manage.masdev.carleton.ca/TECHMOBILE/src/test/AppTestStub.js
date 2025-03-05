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
import WorkOrderDataController from '../WorkOrderDataController';
import ScheduleDataController from '../ScheduleDataController';
import SchedulePageController from '../SchedulePageController';
import RejectController from '../RejectController';
import ChangeStatusController from '../ChangeStatusController';
import QuickReportController from '../QuickReportController';
import CreateWorkOrderController from '../CreateWorkOrderController';
import TaskController from '../TaskController';
import TaskMeterController from '../TaskMeterController';
import MaterialsPageController from '../MaterialsPageController';
import WorkOrderDetailsController from '../WorkOrderDetailsController';
import MaterialRequestPageController from '../MaterialRequestPageController';
import ReserveMaterialsDataController from '../ReserveMaterialsDataController';
import ReserveMaterialsPageController from '../ReserveMaterialsPageController';
import ReportWorkDataController from '../ReportWorkDataController';
import ReportWorkPageController from '../ReportWorkPageController';
import dataassetds from '.././mocked/asset-detail.js';
import v_assets_pumppng from '../assets/pump.png';
import FailureDetailsPageController from '../FailureDetailsPageController';
import AttachmentController from '../AttachmentController';
import RelatedWoDataController from '../RelatedWoDataController';
import RelatedWoController from '../RelatedWoController';
import MapPageController from '../MapPageController';
import AssetWoController from '../AssetWoController';
import WorkOrderEditController from '../WorkOrderEditController';
import WorkOrderCreateController from '../WorkOrderCreateController';
import v_calibration_DataSheetListController from '.././calibration/DataSheetListController';
import v_calibration_AssetFunctionsController from '.././calibration/AssetFunctionsController';
import v_calibration_CalibrationPointsController from '.././calibration/CalibrationPointsController';
import v_calibration_CalibrationPointsRepeatableController from '.././calibration/CalibrationPointsRepeatableController';const CalpointGroupListItemTemplate = ()=>'';
const WarningLabelTemplate = ()=>'';
const AssetProcessErrorTemplate = ()=>'';
const ToleranceErrorTemplate = ()=>'';
const CalpointToleranceSummaryTemplate = ()=>'';
const CaldynamicTemplate = ()=>'';
const CalfunctionTemplate = ()=>'';
const CalpointTemplate = ()=>'';
const AssetfunctionToleranceTemplate = ()=>'';
const LookupWithFilterMaxlib_asset_lookup_filter = ()=>'';
const LookupWithFilterMaxlib_location_lookup_filter = ()=>'';
const DialogAppAssetMisMatchDialog = ()=>'';
const DialogAppAssetScanDialog = ()=>'';
const LookupYRefenceLookup = ()=>'';
const LookupEndYRefenceLookup = ()=>'';
const LookupZRefenceLookup = ()=>'';
const LookupEndZRefenceLookup = ()=>'';
const LookupStartReferncePointLookup = ()=>'';
const LookupEndReferncePointLookup = ()=>'';
const DialogDataSheetWarnings = ()=>'';
const DialogToolsError = ()=>'';
const DialogToolsWarnings = ()=>'';
const LookupUnitLookup = ()=>'';
const PagesPages = ()=>'';
const PageSchedule = ()=>'';
const StackedPanelQzfnmComponent = ()=>'';
const SlidingDrawerSlidingwomaterials = ()=>'';
const SlidingDrawerWorkLogDrawer = ()=>'';
const DialogSaveDiscardWorkLog = ()=>'';
const SlidingDrawerRejectAssignment = ()=>'';
const SlidingDrawerWoStatusChangeDialog = ()=>'';
const SlidingDrawerMeterReadingDrawer = ()=>'';
const SlidingDrawerUpdate_meterReading_drawer = ()=>'';
const DialogSaveDiscardMeterReadingList = ()=>'';
const LookupMeterReadingLookup = ()=>'';
const DialogRollOverDialog = ()=>'';
const SlidingDrawerSlidingwohazard = ()=>'';
const DialogWoConfirmLabTimeOnSchedule = ()=>'';
const PageQuickreport = ()=>'';
const PageCreateworkorder = ()=>'';
const PageTasks = ()=>'';
const DialogPlanTaskLongDesc = ()=>'';
const SlidingDrawerTaskStatusChangeDialog = ()=>'';
const LookupMeterReadingLookupNew = ()=>'';
const SlidingDrawerTaskMeterChangeDialog = ()=>'';
const SlidingDrawerTaskMeterReadingDrawer = ()=>'';
const SlidingDrawerUpdate_taskMeterReading_drawer_detail = ()=>'';
const LookupTaskMeterReadingLookupDetail = ()=>'';
const DialogSaveDiscardTaskMeter = ()=>'';
const DialogSaveDiscardTaskAssetLocMeter = ()=>'';
const DialogTaskRollOverDialogDetail = ()=>'';
const DataListQ439v = ()=>'';
const PageMaterials = ()=>'';
const PanelN76qgComponent = ()=>'';
const PanelWz55yComponent = ()=>'';
const PageWorkOrderDetails = ()=>'';
const DialogWoDetailsDialog = ()=>'';
const DialogLinearDetailsDialog = ()=>'';
const DialogCalibrationDetailsDialog = ()=>'';
const DialogWoConfirmLabTime = ()=>'';
const SlidingDrawerWoWorkLogDrawer = ()=>'';
const DialogSaveDiscardWorkLogDetail = ()=>'';
const SlidingDrawerWohazardDrawer = ()=>'';
const LookupLogTypeLookupDetailsPage = ()=>'';
const SlidingDrawerSlidingwodetailsmaterials = ()=>'';
const DialogAssetMisMatchDialog = ()=>'';
const LookupDownTimeCodeLookup = ()=>'';
const SlidingDrawerAssetStatusDialog = ()=>'';
const DialogSaveDiscardassetDialog = ()=>'';
const SlidingDrawerMultiMeterReadingDrawer = ()=>'';
const SlidingDrawerUpdate_multiMeterReading_drawer = ()=>'';
const LookupMultiMeterReadingLookup = ()=>'';
const DialogMultiMeterrollOverDialog = ()=>'';
const DialogSaveDiscardMultiMeterReadingDetailDialog = ()=>'';
const SlidingDrawerMeterReadingDrawerDetail = ()=>'';
const SlidingDrawerUpdate_meterReading_drawer_detail = ()=>'';
const DialogSaveDiscardMeterReadingDetail = ()=>'';
const LookupMeterReadingLookupDetail = ()=>'';
const DialogRollOverDialogDetail = ()=>'';
const SlidingDrawerWoSpecificationDrawer = ()=>'';
const ButtonGroupYyb2kComponent = ()=>'';
const RichTextViewer = ()=>'';
const ButtonGroupByzkjComponent = ()=>'';
const DataListG84j2 = ()=>'';
const PageMaterialRequest = ()=>'';
const LookupItemsListLookup = ()=>'';
const LookupStoreRoomListLookup = ()=>'';
const LookupConditionCodeLookup = ()=>'';
const SlidingDrawerAddItemDrawer = ()=>'';
const PanelYrpj2Component = ()=>'';
const ButtonGroupW3m6rComponent = ()=>'';
const PageReserveMaterials = ()=>'';
const DialogSaveDiscardDialog_reservePage = ()=>'';
const PanelK5ympComponent = ()=>'';
const PanelWdzxnComponent = ()=>'';
const PanelX98z6Component = ()=>'';
const PageReport_work = ()=>'';
const PanelR34mkComponent = ()=>'';
const LookupTransTypeLookup = ()=>'';
const LookupCraftLookup = ()=>'';
const LookupLaborLookup = ()=>'';
const LookupTechnicianLookup = ()=>'';
const LookupManufacturerLookup = ()=>'';
const DialogSaveDiscardLaborsDialog = ()=>'';
const SlidingDrawerReportTimeDrawer = ()=>'';
const LookupMaterialLookup = ()=>'';
const LookupStoreRoomLookup = ()=>'';
const LookupBinLookup = ()=>'';
const LookupTransactionTypeLookup = ()=>'';
const LookupRotatingAssetLookup = ()=>'';
const SlidingDrawerMaterialsDrawer = ()=>'';
const LookupToolLookup = ()=>'';
const LookupToolStoreRoomLookup = ()=>'';
const LookupToolBinLookup = ()=>'';
const LookupToolRotatingAssetLookup = ()=>'';
const LookupWithFilterCalibrationToolRotatingAssetLookup = ()=>'';
const LookupToolTaskLookup = ()=>'';
const SlidingDrawerCalibrationToolsDrawer = ()=>'';
const SlidingDrawerToolsDrawer = ()=>'';
const DialogToolsDueDateError = ()=>'';
const DialogQualificationError = ()=>'';
const DialogQualificationWarning = ()=>'';
const PanelG_b4vComponent = ()=>'';
const PanelEgzq9Component = ()=>'';
const PanelG4kn4Component = ()=>'';
const PageAssetDetails = ()=>'';
const ButtonGroupEnewvComponent = ()=>'';
const ButtonGroupD55jmComponent = ()=>'';
const PageFailureDetails = ()=>'';
const PanelB27__Component = ()=>'';
const PanelMq6byComponent = ()=>'';
const DataListQxk5x = ()=>'';
const DataListXwv_6 = ()=>'';
const DataListEjq22 = ()=>'';
const DataListMwj6x = ()=>'';
const PageAttachments = ()=>'';
const PanelVn25kComponent = ()=>'';
const PageRelatedWorkOrder = ()=>'';
const PanelAgve2Component = ()=>'';
const PanelWkwndComponent = ()=>'';
const PageMap = ()=>'';
const PageAssetWorkOrder = ()=>'';
const PanelPw46_Component = ()=>'';
const PanelM_5y5Component = ()=>'';
const PageWoedit = ()=>'';
const DialogWoDetailsEditDialog = ()=>'';
const LookupWorkTypeLookup = ()=>'';
const DialogSaveDiscardDialog = ()=>'';
const DialogSysMsgDialog_woedit = ()=>'';
const PanelA_5a4Component = ()=>'';
const PageCreatewo = ()=>'';
const DialogLongdsEditDialog = ()=>'';
const LookupWorkTyLookup = ()=>'';
const DialogSaveDiscardDialogCreatePage = ()=>'';
const DialogSysMsgDialog_createwo = ()=>'';
const PanelVba9yComponent = ()=>'';
const PageDatasheets = ()=>'';
const SlidingDrawerDataSheetStatusDialog = ()=>'';
const DataListPm6j_ = ()=>'';
const PageAssetfunctions = ()=>'';
const LookupUnitsLookup = ()=>'';
const DialogNoAdjLimit = ()=>'';
const DialogNoAdjLimitOff = ()=>'';
const SlidingDrawerAssetFunctionStatusDialog = ()=>'';
const DataListQ6aap4ne = ()=>'';
const SlidingDrawerEnvironmentalConditionsDialog = ()=>'';
const PageCalibrationpoints = ()=>'';
const LookupUnitspointLookup = ()=>'';
const DialogSaveDiscardRules = ()=>'';
const DataListQqkbe = ()=>'';
const DataListKen7r = ()=>'';
const DataListDgvzy = ()=>'';
const PageCalibrationasleftpoints = ()=>'';
const LookupUnitspointsLookup = ()=>'';
const DialogSaveAsLeftDiscardRules = ()=>'';
const DataListZ5bj_ = ()=>'';
const DataListE54gy = ()=>'';
const DataListEwprm = ()=>'';
const PageCalpointrepeatable = ()=>'';
const DialogDiscardChanges = ()=>'';
const DataListYye87 = ()=>'';
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
      platform: 'maximoMobile',
      logLevel: 0,
      name: "techmobile",
      type: "",
      theme: "touch",
      isMaximoApp: true,
      masEnabled: false,
      
      labels: {},
      defaultMessages: {"changes_saved":"Changes saved","fail_class_placeholder":"Failure class","problem_placeholder":"Problem","cause_placeholder":"Cause","remedy_placeholder":"Remedy","details_placeholder":"Details","meter_cont_error":"The new reading ({0}) entered on {1} should be greater than the previous reading ({2}) entered on ({3}).","startdate_msg":"Start date is required","future_startdate_msg":"Start date cannot be in the future","future_enddate_msg":"End date cannot be in the future","start_enddate_compare_msg":"End date should be later than start date","regularhr_msg":"Hours exceed duration between start and end time","regularhr_overtime_msg":"Regular hours plus overtime exceeds duration between start and end date","regularhr_req_msg":"Regular hours is required","regularhr_invalid_msg":"Invalid regular hours","rollover_error":"Readings cannot exceed rollover values. The reading {0} is greater than the rollover point {1}.","relatedwo_created_msg":"Follow-up work created","future_starttime_msg":"Start time can not be in the future","future_endtime_msg":"End time can not be in the future","start_endtime_compare_msg":"End time should be later than start time","asset_confirmed":"Asset confirmed","unknown":"Unknown","defaultWorkType":"Actual work time","fail_get_synonym":"Can not get the synonym data({0}","record_not_on_device":"This record is not on your device. Try again or wait until you are online.","asset_not_attached":"Asset not attached at task level.","regularhr_with_futuredate_msg":"Actual labor can not be with future dates and times","gps_location_saved":"Device location saved","Select_a_type_label":"Select a type","startdate_enddate_compare_msg":"The start date must be before the finish date","priority_error_msg":"Priority {0} is not a valid priority value between {1} and {2}","assetStatusDateRequired":"Status Date is required.","assetStatusDateCompare":"New asset status change date must be greater than change dates on all previous transactions for this asset.","assetPromptDownMessage":"The asset currently has a status of Down. To change the status of the asset now, you must cancel the current status change and report downtime.","edit_work_order":"{0} Edit work order","wotask_edit_work_order":"{0}-{1} Edit work order","create_followup_label":"Create follow-up WO","est_dur_msg":"The duration should be positive value","woCompleted_label":"Work order {0} completed","woCostDrawerTitle_lable":"Cost","priority_label":"Priority {0}","materialsAndToolsLabel":"Materials and tools","toolsLabel":"Tools","materialsLabel":"Materials","locationConflictUpdateAssetBmxLabel":"The specified location does not contain the current asset. Do you want to update the asset with the asset that is in this new location - {0}?","glConflictBmxLabel":"The location and asset combination you entered has different GL account than is currently specified on the work order. Would you like to update the work orders GL account based on the new asset/location combination?","assetConflictBmxLabel":"The specified asset is not in the current location. Do you want to update the location with this  asset's location - {0}?","multiAssetlocationConflictBmxLabel":"The specified location does not contain the current asset. Do you want to clear the current asset selection ?","resevered_items":"Reserved items added","future_meterdatetime_msg":"Date or time of reading cannot be in the future","meter_saved_msg":"Reading saved","new_meter_drawer_title":"Enter readings","old_meter_drawer_title":"Enter old readings","timer_started":"Timer already started","cluster":"Cluster","inprogress":"In Progress","completed":"Completed","approved":"Approved","waitappr":"Waiting for Approval","others":"Others","accepted":"Accepted","rejected":"Rejected","accepted_wo":"Assignment {0} was assigned to you.","accepted_wo_failure":"Assignment {0} could not be assigned to you.","rejected_wo":"Assignment {0} was rejected and returned to the dispatcher.","rejected_wo_failure":"Assignment {0} could not be rejected. Resync data and try again.","meter_cont_lesser_error":"The new reading ({0}) entered on {1} should be lesser than the previous reading ({2}) entered on ({3}).","safetyplanreview_timer":"You must review the safety plan before you start work.","safetyplanreview_status":"You must review the safety plan before you change the status.","blank_meterdatetime_msg":"Date or time cannot be blank","report_work_title":"{0} Report work","wotask_report_work_title":"{0}-{1} Report work","tasks_title":"{0} Tasks","worklog_woStarted_without_scan":"The work order was started without scanning an asset.","worklog_woCompleted_without_scan":"The work order was completed without scanning an asset.","record_not_available_device":"Record not available in the device","missed_tolerances_range":"Missed tolerances range","measure_error_msg":"Start Measure must be between the linear asset's Start Measure {0} and End Measure {1}. (BMXAA6139)","cannot_be_empty_value":"Cannot be empty value","enter_numeric_value":"Enter a numeric value","entered_number_is_too_long":"Entered number is too long","input":"input","output":"output","number_is_out_of_range_short":"Number is out of range ({0} to {1})","to_save_the_record_fix_the_validation_errors":"To save the record, fix the validation errors.","number_is_out_of_range":"The {0} {1} {2} is outside the range of {3} to {4}.","as_found":"As Found","as_left":"As Left","no_errors_to_show":"No errors to show","n_a":"NA","n_errors":"{0} error(s)","one_or_more_as_found_tolerance_limits_have_been_exceeded":"One or more As Found tolerance limits have been exceeded on this calibration point. (BMXAR0010)","one_or_more_as_left_tolerance_limits_have_been_exceeded":"One or more As Left tolerance limits have been exceeded on this calibration point. (BMXAR0010)","one_or_more_tolerance_limits_have_been_exceeded":"One or more {0} tolerance limits have been exceeded on this calibration point. (BMXAR0010)"},
      messageGroups: 'viewmanager',
      systemProps: ["mxe.mobile.travel.prompt","mxe.mobile.travel.radius","mxe.mobile.travel.navigation","maximo.mobile.usetimer","maximo.mobile.statusforphysicalsignature","maximo.mobile.wostatusforesig","maximo.mobile.completestatus","mxe.mobile.navigation.windows","mxe.mobile.navigation.ios","mxe.mobile.navigation.android","maximo.mobile.allowmultipletimers","maximo.mobile.safetyplan.review","maximo.mobile.gotoreportwork","maximo.mobile.QuickWoPriority","maximo.mobile.QuickWoWorktype"],
      hasCustomizations: false,
      forceJsonLocalizer: undefined,
      useBrowserRouter: false,
      hideMaximoMenus: false,
      sigoptions: {"MXAPIWODETAIL":{"createnewwo":1,"quickrep":1}},
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
      app.title = "Technician";
    }

    bootstrapInspector.onNewApp(app);
    let eventManager = app;
    app.setState(bootstrapInspector.onNewState({"systemProp":{"maximo.mobile.usetimer":"1","maximo.mobile.completestatus":"COMP"},"defaultTravTrans":{"value":"TRAV","description":"Travel time"},"workorderLimit":3,"fromQuickReport":false,"woStatSigOptions":"{\"APPR\" : \"APPR\",\"INIT\" : \"INPRG\",\"UNDOAPPR\" : \"WAPPR\",\"WSCH\" : \"WSCH\",\"CANCEL\" : \"CAN\",\"CLOSE\" : \"CLOSE\",\"COMP\" : \"COMP\"}","refreshOnSubsequentLogin":false,"scanParameter":"{}","calibParameter":"{}","disableToolWarning":false,"skipToolWarning":false,"skipQualWarning":false,"skipSignature":false,"disableScan":false,"skipScan":false,"woOSName":"MXAPIWODETAIL","linearinfo":"{}","canloadwodetailds":true}, 'app'));
    setAppInst(app);

    app.registerController(bootstrapInspector.onNewController(new AppController(), 'AppController', app));
    let page;

    
      // setup the 'schedule' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'schedule', clearStack: true, parent: app, route: '/schedule/*', title: app.getLocalizedLabel("schedule_title", "My Schedule"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"selectedSwitch":0,"dialogLabel":"","selectedDS":"todaywoassignedDS","assetMeterHeader":"","locationMeterHeader":"","firstWO":"","firstLogin":false,"showMapOverlay":0,"mapWOListHeight":"45%","mapWOCardHeight":"60%","mapPaddingRight":"","mapPaddingLeft":"","previousPage":"","mapOriginPage":"","mapPaddingBottom":"","compDomainStatus":"","dataSourceIntializationCount":0,"checkForUpdateButton":false,"canloadwodetails":true,"editWo":false}, 'page'), {});

        
              {
                let controller = new SchedulePageController();
                bootstrapInspector.onNewController(controller, 'SchedulePageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - dswolist
                {
                  let options = {
  platform: `maximoMobile`,
  name: `dswolist`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `false`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    orderBy: `wopriority`,
    default: false,
    objectStructure: `mxapiwodetail`,
    savedQuery: `uxtechnicianownerfilter`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dswolist`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    searchAttributes:     [
`wonum`,
`description`,
`location.description`,
`location.location`,
`wopriority`,
`worktype`,
`status`,
`assetnum`,
`asset.description`,
`asset.assetnum`,
`serviceaddress.formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ],
    indexAttributes:     [
`wonum`,
`description`,
`location.description--locationdesc`,
`location.location--locationnum`,
`wopriority`,
`worktype`,
`status`,
`status_maxvalue`,
`assetnum`,
`asset.description--assetdesc`,
`asset.assetnum--assetnumber`,
`serviceaddress.formattedaddress--formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ],
    select: `autolocate,wonum,description,locationnum,location.description--locationdesc,location.location--locationnum,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},pluscwods._dbcount--pluscwodscount,pluscwods,location,location,wopriority,worktype,schedfinish,actfinish,status,status,status_description,status_maxvalue,assetnum,assetnum,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,asset.ISCALIBRATION--ISCALIBRATION,asset,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,serviceaddress,showplanmaterial._dbcount--materialcount,showplanmaterial,showplantool._dbcount--toolcount,showplantool,uxshowactualtool._dbcount--actualtoolcount,uxshowactualtool,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activeassetmeter,activelocationmeter._dbcount--locationmetercount,activelocationmeter,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,maxvar.pluscvaltool,maxvar.pluscqualtech,np_statusmemo,rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost},estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,wtypedesc,worktype,worktype,orgid,woclass,maxvar.downprompt,istask,wogroup,taskid,flowcontrolled,anywhererefid,wohazard._dbcount--wohazardcount,wohazard,splanreviewdate,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure},rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid},rel.mapsketch{sketchList,sketchname,mapsketchid}`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `autolocate`,
      sortable: `false`,
      id: `wymyz`
    },
    {
      name: `wonum`,
      sortable: `false`,
      searchable: `true`,
      id: `g4dk9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ej423`
    },
    {
      name: `locationnum`,
      sortable: `false`,
      id: `n_pxp`
    },
    {
      name: `location.description--locationdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `d_m_3`
    },
    {
      name: `location.location--locationnum`,
      searchable: `true`,
      id: `gy6zb`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `gevgw`
    },
    {
      name: `computedShowAssignment`,
      'computed-function': `computedShowAssignment`,
      id: `y5xx2`,
      computed: (true),
      local: (true)
    },
    {
      name: `isRejected`,
      'computed-function': `isRejected`,
      id: `ed_z2`,
      computed: (true),
      local: (true)
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `v42x2`
    },
    {
      name: `pluscwods`,
      id: `a6vyk`
    },
    {
      name: `location`,
      id: `ge39a`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ge39a`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `location`,
      id: `ge39a`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `x3nyj`
    },
    {
      name: `worktype`,
      searchable: `true`,
      id: `dpw__`
    },
    {
      name: `schedfinish`,
      sortable: `false`,
      id: `d23z7`
    },
    {
      name: `actfinish`,
      sortable: `false`,
      id: `d24z7`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `wq39_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wq39_`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `value,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wq39_`
    },
    {
      name: `status_description`,
      sortable: `false`,
      id: `mk837`
    },
    {
      name: `status_maxvalue`,
      sortable: `false`,
      index: `true`,
      id: `v68e9`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `j6w_q`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `j6w_q`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          }
        ]
      },
      datasource: `assetFilterDS`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `j6w_q`
    },
    {
      name: `asset.description--assetdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `z7qd3`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      sortable: `false`,
      id: `xn_54`
    },
    {
      name: `asset.assethealth--ahealth`,
      sortable: `false`,
      id: `d9b9n`
    },
    {
      name: `asset.assetnum--assetnumber`,
      sortable: `false`,
      searchable: `true`,
      id: `g3qg8`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      sortable: `false`,
      id: `mq3gw`
    },
    {
      name: `asset`,
      sortable: `false`,
      id: `kjyen`
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
      sortable: `false`,
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
      name: `serviceaddress`,
      sortable: `false`,
      id: `vqm4x`
    },
    {
      name: `showplanmaterial._dbcount--materialcount`,
      id: `pjvv3`
    },
    {
      name: `showplanmaterial`,
      sortable: `false`,
      id: `zqw_e`
    },
    {
      name: `showplantool._dbcount--toolcount`,
      id: `rn2j5`
    },
    {
      name: `showplantool`,
      sortable: `false`,
      id: `j_6ya`
    },
    {
      name: `uxshowactualtool._dbcount--actualtoolcount`,
      id: `vn8k7`
    },
    {
      name: `uxshowactualtool`,
      sortable: `false`,
      id: `pmmpe`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("w8m82_title", "Work Order")),
      remarks: (app.getLocalizedLabel("w8m82_remarks", "Identifies the work order.")),
      id: `w8m82`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedAssetNum`,
      'computed-function': `computedAssetNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("yzx7x_title", "Asset")),
      remarks: (app.getLocalizedLabel("yzx7x_remarks", "Asset Number")),
      id: `yzx7x`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsOverDue`,
      'computed-function': `computedIsOverDue`,
      title: (app.getLocalizedLabel("bzz5w_title", "computedIsOverDue")),
      remarks: (app.getLocalizedLabel("bzz5w_remarks", "computedIsOverDue")),
      id: `bzz5w`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedDisableButton`,
      'computed-function': `computedDisableButton`,
      id: `g32ag`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsAssetLoc`,
      'computed-function': `computedIsAssetLoc`,
      id: `dzgzx`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `n9ryw`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `g_p2y`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `qda4x`
    },
    {
      name: `activeassetmeter`,
      sortable: `false`,
      id: `j78xx`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `jg5k2`
    },
    {
      name: `activelocationmeter`,
      sortable: `false`,
      id: `ja796`
    },
    {
      name: `computedDisableMeter`,
      'computed-function': `computedDisableMeter`,
      id: `zjy8q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedTimerStatus`,
      'computed-function': `computedTimerStatus`,
      id: `e5_6n`,
      computed: (true),
      local: (true)
    },
    {
      name: `labtrans`,
      sortable: `false`,
      id: `a_n6a`
    },
    {
      name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
      sortable: `false`,
      id: `xz4k5`
    },
    {
      name: `maxvar.starttimerinprg`,
      sortable: `false`,
      id: `p2qk4`
    },
    {
      name: `maxvar.confirmlabtrans`,
      sortable: `false`,
      id: `pr7y9`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `y67d9`
    },
    {
      name: `maxvar.pluscqualtech`,
      id: `wk4v9`
    },
    {
      name: `computedWOStatusPriority`,
      'computed-function': `computedWOStatusPriority`,
      id: `ewgm6`,
      computed: (true),
      local: (true)
    },
    {
      name: `np_statusmemo`,
      id: `zd69q`
    },
    {
      name: `computedWorkTypeStatus`,
      'computed-function': `computedWorkTypeStatus`,
      id: `vdqrw`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost}`,
      id: `g29p_`
    },
    {
      name: `accessWoCostData`,
      'computed-function': `accessWoCostData`,
      id: `k9yga`,
      computed: (true),
      local: (true)
    },
    {
      name: `estintlabhrs`,
      sortable: `false`,
      id: `pjj4p`
    },
    {
      name: `estoutlabhrs`,
      sortable: `false`,
      id: `djrbn`
    },
    {
      name: `estlabhrs`,
      sortable: `false`,
      id: `peayb`
    },
    {
      name: `estintlabcost`,
      sortable: `false`,
      id: `j6g9a`
    },
    {
      name: `estoutlabcost`,
      sortable: `false`,
      id: `vpb7b`
    },
    {
      name: `laborcosts`,
      id: `r8gdg`
    },
    {
      name: `estmatcost`,
      sortable: `false`,
      id: `w74m5`
    },
    {
      name: `esttoolcost`,
      sortable: `false`,
      id: `kngn7`
    },
    {
      name: `estservcost`,
      sortable: `false`,
      id: `zpwre`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `vdnby`
    },
    {
      name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
      id: `jdxwr`
    },
    {
      name: `workorderid`,
      sortable: `false`,
      'unique-id': `true`,
      id: `gzwj2`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `zypep`
    },
    {
      name: `maxvar.coordinate`,
      id: `mwkdp`
    },
    {
      name: `wtypedesc`,
      id: `araxv`
    },
    {
      name: `worktype`,
      id: `wnpqk`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wnpqk`,
      lookup:       {
        name: `worktype`,
        attributeMap:         [
          {
            datasourceField: `worktype,wtypedesc`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `worktype`,
            lookupField: `value`
          }
        ]
      },
      datasource: `workTypeFilterDS`
    },
    {
      name: `worktype`,
      id: `wnpqk`
    },
    {
      name: `orgid`,
      id: `mr29q`
    },
    {
      name: `woclass`,
      sortable: `false`,
      id: `kpg33`
    },
    {
      name: `maxvar.downprompt`,
      id: `j973v`
    },
    {
      name: `istask`,
      sortable: `false`,
      id: `mm8km`
    },
    {
      name: `wogroup`,
      searchable: `true`,
      sortable: `false`,
      id: `qv3me`
    },
    {
      name: `taskid`,
      sortable: `false`,
      searchable: `true`,
      id: `ex4xn`
    },
    {
      name: `flowcontrolled`,
      sortable: `false`,
      id: `zw9xq`
    },
    {
      name: `anywhererefid`,
      sortable: `false`,
      id: `wyryp`
    },
    {
      name: `wohazard._dbcount--wohazardcount`,
      id: `v89mp`
    },
    {
      name: `wohazard`,
      id: `z58yp`
    },
    {
      name: `splanreviewdate`,
      sortable: `false`,
      id: `ympwe`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `zaxe9`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure}`,
      id: `vn7ym`
    },
    {
      name: `rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid}`,
      id: `n8_84`
    },
    {
      name: `rel.mapsketch{sketchList,sketchname,mapsketchid}`,
      id: `x9z3j`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedShowAssignment:     {
      computedFunction: ((item, datasource) => datasource.callController('computedShowAssignment', item))
    },
    isRejected:     {
      computedFunction: ((item, datasource) => datasource.callController('isRejected', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
    },
    computedAssetNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedAssetNum', item))
    },
    computedIsOverDue:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsOverDue', item))
    },
    computedDisableButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableButton', item))
    },
    computedIsAssetLoc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsAssetLoc', item))
    },
    computedDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableMeter', item))
    },
    computedTimerStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTimerStatus', item))
    },
    computedWOStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWOStatusPriority', item))
    },
    computedWorkTypeStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkTypeStatus', item))
    },
    accessWoCostData:     {
      computedFunction: ((item, datasource) => datasource.callController('accessWoCostData', item))
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
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [
    {
      'app-id': `plusassetswitch`,
      'datasource-id': `AcmDS`,
      'min-interval': `300`,
      trigger: `dswolist`,
      'trigger-children':       [
`todaywoassignedDS`,
`pmduewolistDS`,
`myworkDS`,
`myworkCreatedLocally`,
`myWorkOrder`,
`completedCloseDS`,
`serverSearch`
      ]
    },
    {
      'app-id': `plusassetswitch`,
      'datasource-id': `AcmDS`,
      'min-interval': `300`,
      trigger: `todaywoassignedDS`
    },
    {
      'app-id': `plusassetswitch`,
      'datasource-id': `AcmDS`,
      'min-interval': `300`,
      trigger: `pmduewolistDS`
    },
    {
      'app-id': `plusassetswitch`,
      'datasource-id': `AcmDS`,
      'min-interval': `300`,
      trigger: `myworkDS`
    },
    {
      'app-id': `plusassetswitch`,
      'datasource-id': `AcmDS`,
      'min-interval': `300`,
      trigger: `myworkCreatedLocally`
    },
    {
      'app-id': `plusassetswitch`,
      'datasource-id': `AcmDS`,
      'min-interval': `300`,
      trigger: `myWorkOrder`
    },
    {
      'app-id': `plusassetswitch`,
      'datasource-id': `AcmDS`,
      'min-interval': `300`,
      trigger: `completedCloseDS`
    },
    {
      'app-id': `plusassetswitch`,
      'datasource-id': `AcmDS`,
      'min-interval': `300`,
      trigger: `serverSearch`
    }
  ],
  preLoad: false
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - dswolist

                

                // begin datasource - todaywoassignedDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `todaywoassignedDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    savedQuery: `ASSIGNEDWOLIST`,
    mobileQbeFilter: ({'status_maxvalue': '!=COMP,CAN,CLOSE,WAPPR', 'assignment[0].status_maxvalue' : '!=WAITASGN'}),
    offlineImmediateDownload: true,
    default: true,
    select: ("autolocate,wonum,description,locationnum,location.description--locationdesc,location.location--locationnum,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},pluscwods._dbcount--pluscwodscount,pluscwods,location,location,wopriority,worktype,schedfinish,actfinish,status,status,status_description,status_maxvalue,assetnum,assetnum,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,asset.ISCALIBRATION--ISCALIBRATION,asset,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,serviceaddress,showplanmaterial._dbcount--materialcount,showplanmaterial,showplantool._dbcount--toolcount,showplantool,uxshowactualtool._dbcount--actualtoolcount,uxshowactualtool,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activeassetmeter,activelocationmeter._dbcount--locationmetercount,activelocationmeter,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,maxvar.pluscvaltool,maxvar.pluscqualtech,np_statusmemo,rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost},estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,wtypedesc,worktype,worktype,orgid,woclass,maxvar.downprompt,istask,wogroup,taskid,flowcontrolled,anywhererefid,wohazard._dbcount--wohazardcount,wohazard,splanreviewdate,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure},rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid},rel.mapsketch{sketchList,sketchname,mapsketchid}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`wonum`,
`description`,
`location.description`,
`location.location`,
`wopriority`,
`worktype`,
`status`,
`assetnum`,
`asset.description`,
`asset.assetnum`,
`serviceaddress.formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ],
    selectionMode: `single`,
    orderBy: `wopriority`,
    objectStructure: `mxapiwodetail`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dswolist`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    indexAttributes:     [
`wonum`,
`description`,
`location.description--locationdesc`,
`location.location--locationnum`,
`wopriority`,
`worktype`,
`status`,
`status_maxvalue`,
`assetnum`,
`asset.description--assetdesc`,
`asset.assetnum--assetnumber`,
`serviceaddress.formattedaddress--formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ]
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `autolocate`,
      sortable: `false`,
      id: `wymyz`
    },
    {
      name: `wonum`,
      sortable: `false`,
      searchable: `true`,
      id: `g4dk9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ej423`
    },
    {
      name: `locationnum`,
      sortable: `false`,
      id: `n_pxp`
    },
    {
      name: `location.description--locationdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `d_m_3`
    },
    {
      name: `location.location--locationnum`,
      searchable: `true`,
      id: `gy6zb`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `gevgw`
    },
    {
      name: `computedShowAssignment`,
      'computed-function': `computedShowAssignment`,
      id: `y5xx2`,
      computed: (true),
      local: (true)
    },
    {
      name: `isRejected`,
      'computed-function': `isRejected`,
      id: `ed_z2`,
      computed: (true),
      local: (true)
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `v42x2`
    },
    {
      name: `pluscwods`,
      id: `a6vyk`
    },
    {
      name: `location`,
      id: `ge39a`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ge39a`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `location`,
      id: `ge39a`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `x3nyj`
    },
    {
      name: `worktype`,
      searchable: `true`,
      id: `dpw__`
    },
    {
      name: `schedfinish`,
      sortable: `false`,
      id: `d23z7`
    },
    {
      name: `actfinish`,
      sortable: `false`,
      id: `d24z7`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `wq39_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wq39_`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `value,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wq39_`
    },
    {
      name: `status_description`,
      sortable: `false`,
      id: `mk837`
    },
    {
      name: `status_maxvalue`,
      sortable: `false`,
      index: `true`,
      id: `v68e9`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `j6w_q`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `j6w_q`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          }
        ]
      },
      datasource: `assetFilterDS`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `j6w_q`
    },
    {
      name: `asset.description--assetdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `z7qd3`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      sortable: `false`,
      id: `xn_54`
    },
    {
      name: `asset.assethealth--ahealth`,
      sortable: `false`,
      id: `d9b9n`
    },
    {
      name: `asset.assetnum--assetnumber`,
      sortable: `false`,
      searchable: `true`,
      id: `g3qg8`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      sortable: `false`,
      id: `mq3gw`
    },
    {
      name: `asset`,
      sortable: `false`,
      id: `kjyen`
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
      sortable: `false`,
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
      name: `serviceaddress`,
      sortable: `false`,
      id: `vqm4x`
    },
    {
      name: `showplanmaterial._dbcount--materialcount`,
      id: `pjvv3`
    },
    {
      name: `showplanmaterial`,
      sortable: `false`,
      id: `zqw_e`
    },
    {
      name: `showplantool._dbcount--toolcount`,
      id: `rn2j5`
    },
    {
      name: `showplantool`,
      sortable: `false`,
      id: `j_6ya`
    },
    {
      name: `uxshowactualtool._dbcount--actualtoolcount`,
      id: `vn8k7`
    },
    {
      name: `uxshowactualtool`,
      sortable: `false`,
      id: `pmmpe`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("w8m82_title", "Work Order")),
      remarks: (app.getLocalizedLabel("w8m82_remarks", "Identifies the work order.")),
      id: `w8m82`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedAssetNum`,
      'computed-function': `computedAssetNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("yzx7x_title", "Asset")),
      remarks: (app.getLocalizedLabel("yzx7x_remarks", "Asset Number")),
      id: `yzx7x`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsOverDue`,
      'computed-function': `computedIsOverDue`,
      title: (app.getLocalizedLabel("bzz5w_title", "computedIsOverDue")),
      remarks: (app.getLocalizedLabel("bzz5w_remarks", "computedIsOverDue")),
      id: `bzz5w`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedDisableButton`,
      'computed-function': `computedDisableButton`,
      id: `g32ag`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsAssetLoc`,
      'computed-function': `computedIsAssetLoc`,
      id: `dzgzx`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `n9ryw`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `g_p2y`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `qda4x`
    },
    {
      name: `activeassetmeter`,
      sortable: `false`,
      id: `j78xx`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `jg5k2`
    },
    {
      name: `activelocationmeter`,
      sortable: `false`,
      id: `ja796`
    },
    {
      name: `computedDisableMeter`,
      'computed-function': `computedDisableMeter`,
      id: `zjy8q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedTimerStatus`,
      'computed-function': `computedTimerStatus`,
      id: `e5_6n`,
      computed: (true),
      local: (true)
    },
    {
      name: `labtrans`,
      sortable: `false`,
      id: `a_n6a`
    },
    {
      name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
      sortable: `false`,
      id: `xz4k5`
    },
    {
      name: `maxvar.starttimerinprg`,
      sortable: `false`,
      id: `p2qk4`
    },
    {
      name: `maxvar.confirmlabtrans`,
      sortable: `false`,
      id: `pr7y9`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `y67d9`
    },
    {
      name: `maxvar.pluscqualtech`,
      id: `wk4v9`
    },
    {
      name: `computedWOStatusPriority`,
      'computed-function': `computedWOStatusPriority`,
      id: `ewgm6`,
      computed: (true),
      local: (true)
    },
    {
      name: `np_statusmemo`,
      id: `zd69q`
    },
    {
      name: `computedWorkTypeStatus`,
      'computed-function': `computedWorkTypeStatus`,
      id: `vdqrw`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost}`,
      id: `g29p_`
    },
    {
      name: `accessWoCostData`,
      'computed-function': `accessWoCostData`,
      id: `k9yga`,
      computed: (true),
      local: (true)
    },
    {
      name: `estintlabhrs`,
      sortable: `false`,
      id: `pjj4p`
    },
    {
      name: `estoutlabhrs`,
      sortable: `false`,
      id: `djrbn`
    },
    {
      name: `estlabhrs`,
      sortable: `false`,
      id: `peayb`
    },
    {
      name: `estintlabcost`,
      sortable: `false`,
      id: `j6g9a`
    },
    {
      name: `estoutlabcost`,
      sortable: `false`,
      id: `vpb7b`
    },
    {
      name: `laborcosts`,
      id: `r8gdg`
    },
    {
      name: `estmatcost`,
      sortable: `false`,
      id: `w74m5`
    },
    {
      name: `esttoolcost`,
      sortable: `false`,
      id: `kngn7`
    },
    {
      name: `estservcost`,
      sortable: `false`,
      id: `zpwre`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `vdnby`
    },
    {
      name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
      id: `jdxwr`
    },
    {
      name: `workorderid`,
      sortable: `false`,
      'unique-id': `true`,
      id: `gzwj2`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `zypep`
    },
    {
      name: `maxvar.coordinate`,
      id: `mwkdp`
    },
    {
      name: `wtypedesc`,
      id: `araxv`
    },
    {
      name: `worktype`,
      id: `wnpqk`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wnpqk`,
      lookup:       {
        name: `worktype`,
        attributeMap:         [
          {
            datasourceField: `worktype,wtypedesc`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `worktype`,
            lookupField: `value`
          }
        ]
      },
      datasource: `workTypeFilterDS`
    },
    {
      name: `worktype`,
      id: `wnpqk`
    },
    {
      name: `orgid`,
      id: `mr29q`
    },
    {
      name: `woclass`,
      sortable: `false`,
      id: `kpg33`
    },
    {
      name: `maxvar.downprompt`,
      id: `j973v`
    },
    {
      name: `istask`,
      sortable: `false`,
      id: `mm8km`
    },
    {
      name: `wogroup`,
      searchable: `true`,
      sortable: `false`,
      id: `qv3me`
    },
    {
      name: `taskid`,
      sortable: `false`,
      searchable: `true`,
      id: `ex4xn`
    },
    {
      name: `flowcontrolled`,
      sortable: `false`,
      id: `zw9xq`
    },
    {
      name: `anywhererefid`,
      sortable: `false`,
      id: `wyryp`
    },
    {
      name: `wohazard._dbcount--wohazardcount`,
      id: `v89mp`
    },
    {
      name: `wohazard`,
      id: `z58yp`
    },
    {
      name: `splanreviewdate`,
      sortable: `false`,
      id: `ympwe`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `zaxe9`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure}`,
      id: `vn7ym`
    },
    {
      name: `rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid}`,
      id: `n8_84`
    },
    {
      name: `rel.mapsketch{sketchList,sketchname,mapsketchid}`,
      id: `x9z3j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `dswolist`,
  computedFields:   {
    computedShowAssignment:     {
      computedFunction: ((item, datasource) => datasource.callController('computedShowAssignment', item))
    },
    isRejected:     {
      computedFunction: ((item, datasource) => datasource.callController('isRejected', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
    },
    computedAssetNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedAssetNum', item))
    },
    computedIsOverDue:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsOverDue', item))
    },
    computedDisableButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableButton', item))
    },
    computedIsAssetLoc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsAssetLoc', item))
    },
    computedDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableMeter', item))
    },
    computedTimerStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTimerStatus', item))
    },
    computedWOStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWOStatusPriority', item))
    },
    computedWorkTypeStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkTypeStatus', item))
    },
    accessWoCostData:     {
      computedFunction: ((item, datasource) => datasource.callController('accessWoCostData', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `mobileQbeFilter`,
      lastValue: ({'status_maxvalue': '!=COMP,CAN,CLOSE,WAPPR', 'assignment[0].status_maxvalue' : '!=WAITASGN'}),
      check: (()=>{return {'status_maxvalue': '!=COMP,CAN,CLOSE,WAPPR', 'assignment[0].status_maxvalue' : '!=WAITASGN'}})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - todaywoassignedDS

                

                // begin datasource - pmduewolistDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `pmduewolistDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `false`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    savedQuery: `PMWOLIST`,
    where: `schedfinish>="&SYSDAY&" and schedfinish<="&SYSDAY&+7D"`,
    mobileQbeFilter: ({'status_maxvalue': '!=COMP,CAN,CLOSE,WAPPR', 'assignment[0].status_maxvalue' : '!=WAITASGN'}),
    offlineImmediateDownload: true,
    default: false,
    select: ("autolocate,wonum,description,locationnum,location.description--locationdesc,location.location--locationnum,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},pluscwods._dbcount--pluscwodscount,pluscwods,location,location,wopriority,worktype,schedfinish,actfinish,status,status,status_description,status_maxvalue,assetnum,assetnum,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,asset.ISCALIBRATION--ISCALIBRATION,asset,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,serviceaddress,showplanmaterial._dbcount--materialcount,showplanmaterial,showplantool._dbcount--toolcount,showplantool,uxshowactualtool._dbcount--actualtoolcount,uxshowactualtool,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activeassetmeter,activelocationmeter._dbcount--locationmetercount,activelocationmeter,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,maxvar.pluscvaltool,maxvar.pluscqualtech,np_statusmemo,rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost},estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,wtypedesc,worktype,worktype,orgid,woclass,maxvar.downprompt,istask,wogroup,taskid,flowcontrolled,anywhererefid,wohazard._dbcount--wohazardcount,wohazard,splanreviewdate,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure},rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid},rel.mapsketch{sketchList,sketchname,mapsketchid}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`wonum`,
`description`,
`location.description`,
`location.location`,
`wopriority`,
`worktype`,
`status`,
`assetnum`,
`asset.description`,
`asset.assetnum`,
`serviceaddress.formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ],
    selectionMode: `single`,
    orderBy: `wopriority`,
    objectStructure: `mxapiwodetail`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dswolist`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    indexAttributes:     [
`wonum`,
`description`,
`location.description--locationdesc`,
`location.location--locationnum`,
`wopriority`,
`worktype`,
`status`,
`status_maxvalue`,
`assetnum`,
`asset.description--assetdesc`,
`asset.assetnum--assetnumber`,
`serviceaddress.formattedaddress--formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ]
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `autolocate`,
      sortable: `false`,
      id: `wymyz`
    },
    {
      name: `wonum`,
      sortable: `false`,
      searchable: `true`,
      id: `g4dk9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ej423`
    },
    {
      name: `locationnum`,
      sortable: `false`,
      id: `n_pxp`
    },
    {
      name: `location.description--locationdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `d_m_3`
    },
    {
      name: `location.location--locationnum`,
      searchable: `true`,
      id: `gy6zb`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `gevgw`
    },
    {
      name: `computedShowAssignment`,
      'computed-function': `computedShowAssignment`,
      id: `y5xx2`,
      computed: (true),
      local: (true)
    },
    {
      name: `isRejected`,
      'computed-function': `isRejected`,
      id: `ed_z2`,
      computed: (true),
      local: (true)
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `v42x2`
    },
    {
      name: `pluscwods`,
      id: `a6vyk`
    },
    {
      name: `location`,
      id: `ge39a`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ge39a`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `location`,
      id: `ge39a`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `x3nyj`
    },
    {
      name: `worktype`,
      searchable: `true`,
      id: `dpw__`
    },
    {
      name: `schedfinish`,
      sortable: `false`,
      id: `d23z7`
    },
    {
      name: `actfinish`,
      sortable: `false`,
      id: `d24z7`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `wq39_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wq39_`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `value,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wq39_`
    },
    {
      name: `status_description`,
      sortable: `false`,
      id: `mk837`
    },
    {
      name: `status_maxvalue`,
      sortable: `false`,
      index: `true`,
      id: `v68e9`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `j6w_q`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `j6w_q`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          }
        ]
      },
      datasource: `assetFilterDS`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `j6w_q`
    },
    {
      name: `asset.description--assetdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `z7qd3`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      sortable: `false`,
      id: `xn_54`
    },
    {
      name: `asset.assethealth--ahealth`,
      sortable: `false`,
      id: `d9b9n`
    },
    {
      name: `asset.assetnum--assetnumber`,
      sortable: `false`,
      searchable: `true`,
      id: `g3qg8`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      sortable: `false`,
      id: `mq3gw`
    },
    {
      name: `asset`,
      sortable: `false`,
      id: `kjyen`
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
      sortable: `false`,
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
      name: `serviceaddress`,
      sortable: `false`,
      id: `vqm4x`
    },
    {
      name: `showplanmaterial._dbcount--materialcount`,
      id: `pjvv3`
    },
    {
      name: `showplanmaterial`,
      sortable: `false`,
      id: `zqw_e`
    },
    {
      name: `showplantool._dbcount--toolcount`,
      id: `rn2j5`
    },
    {
      name: `showplantool`,
      sortable: `false`,
      id: `j_6ya`
    },
    {
      name: `uxshowactualtool._dbcount--actualtoolcount`,
      id: `vn8k7`
    },
    {
      name: `uxshowactualtool`,
      sortable: `false`,
      id: `pmmpe`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("w8m82_title", "Work Order")),
      remarks: (app.getLocalizedLabel("w8m82_remarks", "Identifies the work order.")),
      id: `w8m82`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedAssetNum`,
      'computed-function': `computedAssetNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("yzx7x_title", "Asset")),
      remarks: (app.getLocalizedLabel("yzx7x_remarks", "Asset Number")),
      id: `yzx7x`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsOverDue`,
      'computed-function': `computedIsOverDue`,
      title: (app.getLocalizedLabel("bzz5w_title", "computedIsOverDue")),
      remarks: (app.getLocalizedLabel("bzz5w_remarks", "computedIsOverDue")),
      id: `bzz5w`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedDisableButton`,
      'computed-function': `computedDisableButton`,
      id: `g32ag`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsAssetLoc`,
      'computed-function': `computedIsAssetLoc`,
      id: `dzgzx`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `n9ryw`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `g_p2y`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `qda4x`
    },
    {
      name: `activeassetmeter`,
      sortable: `false`,
      id: `j78xx`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `jg5k2`
    },
    {
      name: `activelocationmeter`,
      sortable: `false`,
      id: `ja796`
    },
    {
      name: `computedDisableMeter`,
      'computed-function': `computedDisableMeter`,
      id: `zjy8q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedTimerStatus`,
      'computed-function': `computedTimerStatus`,
      id: `e5_6n`,
      computed: (true),
      local: (true)
    },
    {
      name: `labtrans`,
      sortable: `false`,
      id: `a_n6a`
    },
    {
      name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
      sortable: `false`,
      id: `xz4k5`
    },
    {
      name: `maxvar.starttimerinprg`,
      sortable: `false`,
      id: `p2qk4`
    },
    {
      name: `maxvar.confirmlabtrans`,
      sortable: `false`,
      id: `pr7y9`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `y67d9`
    },
    {
      name: `maxvar.pluscqualtech`,
      id: `wk4v9`
    },
    {
      name: `computedWOStatusPriority`,
      'computed-function': `computedWOStatusPriority`,
      id: `ewgm6`,
      computed: (true),
      local: (true)
    },
    {
      name: `np_statusmemo`,
      id: `zd69q`
    },
    {
      name: `computedWorkTypeStatus`,
      'computed-function': `computedWorkTypeStatus`,
      id: `vdqrw`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost}`,
      id: `g29p_`
    },
    {
      name: `accessWoCostData`,
      'computed-function': `accessWoCostData`,
      id: `k9yga`,
      computed: (true),
      local: (true)
    },
    {
      name: `estintlabhrs`,
      sortable: `false`,
      id: `pjj4p`
    },
    {
      name: `estoutlabhrs`,
      sortable: `false`,
      id: `djrbn`
    },
    {
      name: `estlabhrs`,
      sortable: `false`,
      id: `peayb`
    },
    {
      name: `estintlabcost`,
      sortable: `false`,
      id: `j6g9a`
    },
    {
      name: `estoutlabcost`,
      sortable: `false`,
      id: `vpb7b`
    },
    {
      name: `laborcosts`,
      id: `r8gdg`
    },
    {
      name: `estmatcost`,
      sortable: `false`,
      id: `w74m5`
    },
    {
      name: `esttoolcost`,
      sortable: `false`,
      id: `kngn7`
    },
    {
      name: `estservcost`,
      sortable: `false`,
      id: `zpwre`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `vdnby`
    },
    {
      name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
      id: `jdxwr`
    },
    {
      name: `workorderid`,
      sortable: `false`,
      'unique-id': `true`,
      id: `gzwj2`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `zypep`
    },
    {
      name: `maxvar.coordinate`,
      id: `mwkdp`
    },
    {
      name: `wtypedesc`,
      id: `araxv`
    },
    {
      name: `worktype`,
      id: `wnpqk`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wnpqk`,
      lookup:       {
        name: `worktype`,
        attributeMap:         [
          {
            datasourceField: `worktype,wtypedesc`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `worktype`,
            lookupField: `value`
          }
        ]
      },
      datasource: `workTypeFilterDS`
    },
    {
      name: `worktype`,
      id: `wnpqk`
    },
    {
      name: `orgid`,
      id: `mr29q`
    },
    {
      name: `woclass`,
      sortable: `false`,
      id: `kpg33`
    },
    {
      name: `maxvar.downprompt`,
      id: `j973v`
    },
    {
      name: `istask`,
      sortable: `false`,
      id: `mm8km`
    },
    {
      name: `wogroup`,
      searchable: `true`,
      sortable: `false`,
      id: `qv3me`
    },
    {
      name: `taskid`,
      sortable: `false`,
      searchable: `true`,
      id: `ex4xn`
    },
    {
      name: `flowcontrolled`,
      sortable: `false`,
      id: `zw9xq`
    },
    {
      name: `anywhererefid`,
      sortable: `false`,
      id: `wyryp`
    },
    {
      name: `wohazard._dbcount--wohazardcount`,
      id: `v89mp`
    },
    {
      name: `wohazard`,
      id: `z58yp`
    },
    {
      name: `splanreviewdate`,
      sortable: `false`,
      id: `ympwe`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `zaxe9`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure}`,
      id: `vn7ym`
    },
    {
      name: `rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid}`,
      id: `n8_84`
    },
    {
      name: `rel.mapsketch{sketchList,sketchname,mapsketchid}`,
      id: `x9z3j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `dswolist`,
  computedFields:   {
    computedShowAssignment:     {
      computedFunction: ((item, datasource) => datasource.callController('computedShowAssignment', item))
    },
    isRejected:     {
      computedFunction: ((item, datasource) => datasource.callController('isRejected', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
    },
    computedAssetNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedAssetNum', item))
    },
    computedIsOverDue:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsOverDue', item))
    },
    computedDisableButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableButton', item))
    },
    computedIsAssetLoc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsAssetLoc', item))
    },
    computedDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableMeter', item))
    },
    computedTimerStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTimerStatus', item))
    },
    computedWOStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWOStatusPriority', item))
    },
    computedWorkTypeStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkTypeStatus', item))
    },
    accessWoCostData:     {
      computedFunction: ((item, datasource) => datasource.callController('accessWoCostData', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `mobileQbeFilter`,
      lastValue: ({'status_maxvalue': '!=COMP,CAN,CLOSE,WAPPR', 'assignment[0].status_maxvalue' : '!=WAITASGN'}),
      check: (()=>{return {'status_maxvalue': '!=COMP,CAN,CLOSE,WAPPR', 'assignment[0].status_maxvalue' : '!=WAITASGN'}})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - pmduewolistDS

                

                // begin datasource - myworkDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `myworkDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `false`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    savedQuery: `MYWORK`,
    mobileQbeFilter: ({'status_maxvalue': '!=COMP,CAN,CLOSE,WAPPR', 'assignment[0].status_maxvalue' : '!=WAITASGN'}),
    select: ("autolocate,wonum,description,locationnum,location.description--locationdesc,location.location--locationnum,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},pluscwods._dbcount--pluscwodscount,pluscwods,location,location,wopriority,worktype,schedfinish,actfinish,status,status,status_description,status_maxvalue,assetnum,assetnum,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,asset.ISCALIBRATION--ISCALIBRATION,asset,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,serviceaddress,showplanmaterial._dbcount--materialcount,showplanmaterial,showplantool._dbcount--toolcount,showplantool,uxshowactualtool._dbcount--actualtoolcount,uxshowactualtool,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activeassetmeter,activelocationmeter._dbcount--locationmetercount,activelocationmeter,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,maxvar.pluscvaltool,maxvar.pluscqualtech,np_statusmemo,rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost},estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,wtypedesc,worktype,worktype,orgid,woclass,maxvar.downprompt,istask,wogroup,taskid,flowcontrolled,anywhererefid,wohazard._dbcount--wohazardcount,wohazard,splanreviewdate,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure},rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid},rel.mapsketch{sketchList,sketchname,mapsketchid}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`wonum`,
`description`,
`location.description`,
`location.location`,
`wopriority`,
`worktype`,
`status`,
`assetnum`,
`asset.description`,
`asset.assetnum`,
`serviceaddress.formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ],
    selectionMode: `single`,
    orderBy: `wopriority`,
    default: false,
    objectStructure: `mxapiwodetail`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dswolist`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    indexAttributes:     [
`wonum`,
`description`,
`location.description--locationdesc`,
`location.location--locationnum`,
`wopriority`,
`worktype`,
`status`,
`status_maxvalue`,
`assetnum`,
`asset.description--assetdesc`,
`asset.assetnum--assetnumber`,
`serviceaddress.formattedaddress--formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ]
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `autolocate`,
      sortable: `false`,
      id: `wymyz`
    },
    {
      name: `wonum`,
      sortable: `false`,
      searchable: `true`,
      id: `g4dk9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ej423`
    },
    {
      name: `locationnum`,
      sortable: `false`,
      id: `n_pxp`
    },
    {
      name: `location.description--locationdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `d_m_3`
    },
    {
      name: `location.location--locationnum`,
      searchable: `true`,
      id: `gy6zb`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `gevgw`
    },
    {
      name: `computedShowAssignment`,
      'computed-function': `computedShowAssignment`,
      id: `y5xx2`,
      computed: (true),
      local: (true)
    },
    {
      name: `isRejected`,
      'computed-function': `isRejected`,
      id: `ed_z2`,
      computed: (true),
      local: (true)
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `v42x2`
    },
    {
      name: `pluscwods`,
      id: `a6vyk`
    },
    {
      name: `location`,
      id: `ge39a`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ge39a`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `location`,
      id: `ge39a`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `x3nyj`
    },
    {
      name: `worktype`,
      searchable: `true`,
      id: `dpw__`
    },
    {
      name: `schedfinish`,
      sortable: `false`,
      id: `d23z7`
    },
    {
      name: `actfinish`,
      sortable: `false`,
      id: `d24z7`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `wq39_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wq39_`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `value,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wq39_`
    },
    {
      name: `status_description`,
      sortable: `false`,
      id: `mk837`
    },
    {
      name: `status_maxvalue`,
      sortable: `false`,
      index: `true`,
      id: `v68e9`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `j6w_q`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `j6w_q`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          }
        ]
      },
      datasource: `assetFilterDS`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `j6w_q`
    },
    {
      name: `asset.description--assetdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `z7qd3`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      sortable: `false`,
      id: `xn_54`
    },
    {
      name: `asset.assethealth--ahealth`,
      sortable: `false`,
      id: `d9b9n`
    },
    {
      name: `asset.assetnum--assetnumber`,
      sortable: `false`,
      searchable: `true`,
      id: `g3qg8`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      sortable: `false`,
      id: `mq3gw`
    },
    {
      name: `asset`,
      sortable: `false`,
      id: `kjyen`
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
      sortable: `false`,
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
      name: `serviceaddress`,
      sortable: `false`,
      id: `vqm4x`
    },
    {
      name: `showplanmaterial._dbcount--materialcount`,
      id: `pjvv3`
    },
    {
      name: `showplanmaterial`,
      sortable: `false`,
      id: `zqw_e`
    },
    {
      name: `showplantool._dbcount--toolcount`,
      id: `rn2j5`
    },
    {
      name: `showplantool`,
      sortable: `false`,
      id: `j_6ya`
    },
    {
      name: `uxshowactualtool._dbcount--actualtoolcount`,
      id: `vn8k7`
    },
    {
      name: `uxshowactualtool`,
      sortable: `false`,
      id: `pmmpe`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("w8m82_title", "Work Order")),
      remarks: (app.getLocalizedLabel("w8m82_remarks", "Identifies the work order.")),
      id: `w8m82`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedAssetNum`,
      'computed-function': `computedAssetNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("yzx7x_title", "Asset")),
      remarks: (app.getLocalizedLabel("yzx7x_remarks", "Asset Number")),
      id: `yzx7x`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsOverDue`,
      'computed-function': `computedIsOverDue`,
      title: (app.getLocalizedLabel("bzz5w_title", "computedIsOverDue")),
      remarks: (app.getLocalizedLabel("bzz5w_remarks", "computedIsOverDue")),
      id: `bzz5w`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedDisableButton`,
      'computed-function': `computedDisableButton`,
      id: `g32ag`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsAssetLoc`,
      'computed-function': `computedIsAssetLoc`,
      id: `dzgzx`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `n9ryw`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `g_p2y`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `qda4x`
    },
    {
      name: `activeassetmeter`,
      sortable: `false`,
      id: `j78xx`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `jg5k2`
    },
    {
      name: `activelocationmeter`,
      sortable: `false`,
      id: `ja796`
    },
    {
      name: `computedDisableMeter`,
      'computed-function': `computedDisableMeter`,
      id: `zjy8q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedTimerStatus`,
      'computed-function': `computedTimerStatus`,
      id: `e5_6n`,
      computed: (true),
      local: (true)
    },
    {
      name: `labtrans`,
      sortable: `false`,
      id: `a_n6a`
    },
    {
      name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
      sortable: `false`,
      id: `xz4k5`
    },
    {
      name: `maxvar.starttimerinprg`,
      sortable: `false`,
      id: `p2qk4`
    },
    {
      name: `maxvar.confirmlabtrans`,
      sortable: `false`,
      id: `pr7y9`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `y67d9`
    },
    {
      name: `maxvar.pluscqualtech`,
      id: `wk4v9`
    },
    {
      name: `computedWOStatusPriority`,
      'computed-function': `computedWOStatusPriority`,
      id: `ewgm6`,
      computed: (true),
      local: (true)
    },
    {
      name: `np_statusmemo`,
      id: `zd69q`
    },
    {
      name: `computedWorkTypeStatus`,
      'computed-function': `computedWorkTypeStatus`,
      id: `vdqrw`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost}`,
      id: `g29p_`
    },
    {
      name: `accessWoCostData`,
      'computed-function': `accessWoCostData`,
      id: `k9yga`,
      computed: (true),
      local: (true)
    },
    {
      name: `estintlabhrs`,
      sortable: `false`,
      id: `pjj4p`
    },
    {
      name: `estoutlabhrs`,
      sortable: `false`,
      id: `djrbn`
    },
    {
      name: `estlabhrs`,
      sortable: `false`,
      id: `peayb`
    },
    {
      name: `estintlabcost`,
      sortable: `false`,
      id: `j6g9a`
    },
    {
      name: `estoutlabcost`,
      sortable: `false`,
      id: `vpb7b`
    },
    {
      name: `laborcosts`,
      id: `r8gdg`
    },
    {
      name: `estmatcost`,
      sortable: `false`,
      id: `w74m5`
    },
    {
      name: `esttoolcost`,
      sortable: `false`,
      id: `kngn7`
    },
    {
      name: `estservcost`,
      sortable: `false`,
      id: `zpwre`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `vdnby`
    },
    {
      name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
      id: `jdxwr`
    },
    {
      name: `workorderid`,
      sortable: `false`,
      'unique-id': `true`,
      id: `gzwj2`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `zypep`
    },
    {
      name: `maxvar.coordinate`,
      id: `mwkdp`
    },
    {
      name: `wtypedesc`,
      id: `araxv`
    },
    {
      name: `worktype`,
      id: `wnpqk`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wnpqk`,
      lookup:       {
        name: `worktype`,
        attributeMap:         [
          {
            datasourceField: `worktype,wtypedesc`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `worktype`,
            lookupField: `value`
          }
        ]
      },
      datasource: `workTypeFilterDS`
    },
    {
      name: `worktype`,
      id: `wnpqk`
    },
    {
      name: `orgid`,
      id: `mr29q`
    },
    {
      name: `woclass`,
      sortable: `false`,
      id: `kpg33`
    },
    {
      name: `maxvar.downprompt`,
      id: `j973v`
    },
    {
      name: `istask`,
      sortable: `false`,
      id: `mm8km`
    },
    {
      name: `wogroup`,
      searchable: `true`,
      sortable: `false`,
      id: `qv3me`
    },
    {
      name: `taskid`,
      sortable: `false`,
      searchable: `true`,
      id: `ex4xn`
    },
    {
      name: `flowcontrolled`,
      sortable: `false`,
      id: `zw9xq`
    },
    {
      name: `anywhererefid`,
      sortable: `false`,
      id: `wyryp`
    },
    {
      name: `wohazard._dbcount--wohazardcount`,
      id: `v89mp`
    },
    {
      name: `wohazard`,
      id: `z58yp`
    },
    {
      name: `splanreviewdate`,
      sortable: `false`,
      id: `ympwe`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `zaxe9`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure}`,
      id: `vn7ym`
    },
    {
      name: `rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid}`,
      id: `n8_84`
    },
    {
      name: `rel.mapsketch{sketchList,sketchname,mapsketchid}`,
      id: `x9z3j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `dswolist`,
  computedFields:   {
    computedShowAssignment:     {
      computedFunction: ((item, datasource) => datasource.callController('computedShowAssignment', item))
    },
    isRejected:     {
      computedFunction: ((item, datasource) => datasource.callController('isRejected', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
    },
    computedAssetNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedAssetNum', item))
    },
    computedIsOverDue:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsOverDue', item))
    },
    computedDisableButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableButton', item))
    },
    computedIsAssetLoc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsAssetLoc', item))
    },
    computedDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableMeter', item))
    },
    computedTimerStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTimerStatus', item))
    },
    computedWOStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWOStatusPriority', item))
    },
    computedWorkTypeStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkTypeStatus', item))
    },
    accessWoCostData:     {
      computedFunction: ((item, datasource) => datasource.callController('accessWoCostData', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `mobileQbeFilter`,
      lastValue: ({'status_maxvalue': '!=COMP,CAN,CLOSE,WAPPR', 'assignment[0].status_maxvalue' : '!=WAITASGN'}),
      check: (()=>{return {'status_maxvalue': '!=COMP,CAN,CLOSE,WAPPR', 'assignment[0].status_maxvalue' : '!=WAITASGN'}})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - myworkDS

                

                // begin datasource - myworkCreatedLocally
                {
                  let options = {
  platform: `maximoMobile`,
  name: `myworkCreatedLocally`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `false`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    savedQuery: `CREATEDLOCALLY`,
    mobileQbeFilter: ({'status_maxvalue': '!=COMP,CAN,CLOSE'}),
    select: ("autolocate,wonum,description,locationnum,location.description--locationdesc,location.location--locationnum,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},pluscwods._dbcount--pluscwodscount,pluscwods,location,location,wopriority,worktype,schedfinish,actfinish,status,status,status_description,status_maxvalue,assetnum,assetnum,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,asset.ISCALIBRATION--ISCALIBRATION,asset,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,serviceaddress,showplanmaterial._dbcount--materialcount,showplanmaterial,showplantool._dbcount--toolcount,showplantool,uxshowactualtool._dbcount--actualtoolcount,uxshowactualtool,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activeassetmeter,activelocationmeter._dbcount--locationmetercount,activelocationmeter,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,maxvar.pluscvaltool,maxvar.pluscqualtech,np_statusmemo,rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost},estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,wtypedesc,worktype,worktype,orgid,woclass,maxvar.downprompt,istask,wogroup,taskid,flowcontrolled,anywhererefid,wohazard._dbcount--wohazardcount,wohazard,splanreviewdate,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure},rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid},rel.mapsketch{sketchList,sketchname,mapsketchid}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`wonum`,
`description`,
`location.description`,
`location.location`,
`wopriority`,
`worktype`,
`status`,
`assetnum`,
`asset.description`,
`asset.assetnum`,
`serviceaddress.formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ],
    selectionMode: `single`,
    orderBy: `wopriority`,
    default: false,
    objectStructure: `mxapiwodetail`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dswolist`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    indexAttributes:     [
`wonum`,
`description`,
`location.description--locationdesc`,
`location.location--locationnum`,
`wopriority`,
`worktype`,
`status`,
`status_maxvalue`,
`assetnum`,
`asset.description--assetdesc`,
`asset.assetnum--assetnumber`,
`serviceaddress.formattedaddress--formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ]
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `autolocate`,
      sortable: `false`,
      id: `wymyz`
    },
    {
      name: `wonum`,
      sortable: `false`,
      searchable: `true`,
      id: `g4dk9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ej423`
    },
    {
      name: `locationnum`,
      sortable: `false`,
      id: `n_pxp`
    },
    {
      name: `location.description--locationdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `d_m_3`
    },
    {
      name: `location.location--locationnum`,
      searchable: `true`,
      id: `gy6zb`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `gevgw`
    },
    {
      name: `computedShowAssignment`,
      'computed-function': `computedShowAssignment`,
      id: `y5xx2`,
      computed: (true),
      local: (true)
    },
    {
      name: `isRejected`,
      'computed-function': `isRejected`,
      id: `ed_z2`,
      computed: (true),
      local: (true)
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `v42x2`
    },
    {
      name: `pluscwods`,
      id: `a6vyk`
    },
    {
      name: `location`,
      id: `ge39a`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ge39a`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `location`,
      id: `ge39a`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `x3nyj`
    },
    {
      name: `worktype`,
      searchable: `true`,
      id: `dpw__`
    },
    {
      name: `schedfinish`,
      sortable: `false`,
      id: `d23z7`
    },
    {
      name: `actfinish`,
      sortable: `false`,
      id: `d24z7`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `wq39_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wq39_`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `value,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wq39_`
    },
    {
      name: `status_description`,
      sortable: `false`,
      id: `mk837`
    },
    {
      name: `status_maxvalue`,
      sortable: `false`,
      index: `true`,
      id: `v68e9`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `j6w_q`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `j6w_q`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          }
        ]
      },
      datasource: `assetFilterDS`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `j6w_q`
    },
    {
      name: `asset.description--assetdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `z7qd3`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      sortable: `false`,
      id: `xn_54`
    },
    {
      name: `asset.assethealth--ahealth`,
      sortable: `false`,
      id: `d9b9n`
    },
    {
      name: `asset.assetnum--assetnumber`,
      sortable: `false`,
      searchable: `true`,
      id: `g3qg8`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      sortable: `false`,
      id: `mq3gw`
    },
    {
      name: `asset`,
      sortable: `false`,
      id: `kjyen`
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
      sortable: `false`,
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
      name: `serviceaddress`,
      sortable: `false`,
      id: `vqm4x`
    },
    {
      name: `showplanmaterial._dbcount--materialcount`,
      id: `pjvv3`
    },
    {
      name: `showplanmaterial`,
      sortable: `false`,
      id: `zqw_e`
    },
    {
      name: `showplantool._dbcount--toolcount`,
      id: `rn2j5`
    },
    {
      name: `showplantool`,
      sortable: `false`,
      id: `j_6ya`
    },
    {
      name: `uxshowactualtool._dbcount--actualtoolcount`,
      id: `vn8k7`
    },
    {
      name: `uxshowactualtool`,
      sortable: `false`,
      id: `pmmpe`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("w8m82_title", "Work Order")),
      remarks: (app.getLocalizedLabel("w8m82_remarks", "Identifies the work order.")),
      id: `w8m82`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedAssetNum`,
      'computed-function': `computedAssetNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("yzx7x_title", "Asset")),
      remarks: (app.getLocalizedLabel("yzx7x_remarks", "Asset Number")),
      id: `yzx7x`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsOverDue`,
      'computed-function': `computedIsOverDue`,
      title: (app.getLocalizedLabel("bzz5w_title", "computedIsOverDue")),
      remarks: (app.getLocalizedLabel("bzz5w_remarks", "computedIsOverDue")),
      id: `bzz5w`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedDisableButton`,
      'computed-function': `computedDisableButton`,
      id: `g32ag`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsAssetLoc`,
      'computed-function': `computedIsAssetLoc`,
      id: `dzgzx`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `n9ryw`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `g_p2y`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `qda4x`
    },
    {
      name: `activeassetmeter`,
      sortable: `false`,
      id: `j78xx`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `jg5k2`
    },
    {
      name: `activelocationmeter`,
      sortable: `false`,
      id: `ja796`
    },
    {
      name: `computedDisableMeter`,
      'computed-function': `computedDisableMeter`,
      id: `zjy8q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedTimerStatus`,
      'computed-function': `computedTimerStatus`,
      id: `e5_6n`,
      computed: (true),
      local: (true)
    },
    {
      name: `labtrans`,
      sortable: `false`,
      id: `a_n6a`
    },
    {
      name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
      sortable: `false`,
      id: `xz4k5`
    },
    {
      name: `maxvar.starttimerinprg`,
      sortable: `false`,
      id: `p2qk4`
    },
    {
      name: `maxvar.confirmlabtrans`,
      sortable: `false`,
      id: `pr7y9`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `y67d9`
    },
    {
      name: `maxvar.pluscqualtech`,
      id: `wk4v9`
    },
    {
      name: `computedWOStatusPriority`,
      'computed-function': `computedWOStatusPriority`,
      id: `ewgm6`,
      computed: (true),
      local: (true)
    },
    {
      name: `np_statusmemo`,
      id: `zd69q`
    },
    {
      name: `computedWorkTypeStatus`,
      'computed-function': `computedWorkTypeStatus`,
      id: `vdqrw`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost}`,
      id: `g29p_`
    },
    {
      name: `accessWoCostData`,
      'computed-function': `accessWoCostData`,
      id: `k9yga`,
      computed: (true),
      local: (true)
    },
    {
      name: `estintlabhrs`,
      sortable: `false`,
      id: `pjj4p`
    },
    {
      name: `estoutlabhrs`,
      sortable: `false`,
      id: `djrbn`
    },
    {
      name: `estlabhrs`,
      sortable: `false`,
      id: `peayb`
    },
    {
      name: `estintlabcost`,
      sortable: `false`,
      id: `j6g9a`
    },
    {
      name: `estoutlabcost`,
      sortable: `false`,
      id: `vpb7b`
    },
    {
      name: `laborcosts`,
      id: `r8gdg`
    },
    {
      name: `estmatcost`,
      sortable: `false`,
      id: `w74m5`
    },
    {
      name: `esttoolcost`,
      sortable: `false`,
      id: `kngn7`
    },
    {
      name: `estservcost`,
      sortable: `false`,
      id: `zpwre`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `vdnby`
    },
    {
      name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
      id: `jdxwr`
    },
    {
      name: `workorderid`,
      sortable: `false`,
      'unique-id': `true`,
      id: `gzwj2`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `zypep`
    },
    {
      name: `maxvar.coordinate`,
      id: `mwkdp`
    },
    {
      name: `wtypedesc`,
      id: `araxv`
    },
    {
      name: `worktype`,
      id: `wnpqk`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wnpqk`,
      lookup:       {
        name: `worktype`,
        attributeMap:         [
          {
            datasourceField: `worktype,wtypedesc`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `worktype`,
            lookupField: `value`
          }
        ]
      },
      datasource: `workTypeFilterDS`
    },
    {
      name: `worktype`,
      id: `wnpqk`
    },
    {
      name: `orgid`,
      id: `mr29q`
    },
    {
      name: `woclass`,
      sortable: `false`,
      id: `kpg33`
    },
    {
      name: `maxvar.downprompt`,
      id: `j973v`
    },
    {
      name: `istask`,
      sortable: `false`,
      id: `mm8km`
    },
    {
      name: `wogroup`,
      searchable: `true`,
      sortable: `false`,
      id: `qv3me`
    },
    {
      name: `taskid`,
      sortable: `false`,
      searchable: `true`,
      id: `ex4xn`
    },
    {
      name: `flowcontrolled`,
      sortable: `false`,
      id: `zw9xq`
    },
    {
      name: `anywhererefid`,
      sortable: `false`,
      id: `wyryp`
    },
    {
      name: `wohazard._dbcount--wohazardcount`,
      id: `v89mp`
    },
    {
      name: `wohazard`,
      id: `z58yp`
    },
    {
      name: `splanreviewdate`,
      sortable: `false`,
      id: `ympwe`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `zaxe9`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure}`,
      id: `vn7ym`
    },
    {
      name: `rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid}`,
      id: `n8_84`
    },
    {
      name: `rel.mapsketch{sketchList,sketchname,mapsketchid}`,
      id: `x9z3j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `dswolist`,
  computedFields:   {
    computedShowAssignment:     {
      computedFunction: ((item, datasource) => datasource.callController('computedShowAssignment', item))
    },
    isRejected:     {
      computedFunction: ((item, datasource) => datasource.callController('isRejected', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
    },
    computedAssetNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedAssetNum', item))
    },
    computedIsOverDue:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsOverDue', item))
    },
    computedDisableButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableButton', item))
    },
    computedIsAssetLoc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsAssetLoc', item))
    },
    computedDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableMeter', item))
    },
    computedTimerStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTimerStatus', item))
    },
    computedWOStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWOStatusPriority', item))
    },
    computedWorkTypeStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkTypeStatus', item))
    },
    accessWoCostData:     {
      computedFunction: ((item, datasource) => datasource.callController('accessWoCostData', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `mobileQbeFilter`,
      lastValue: ({'status_maxvalue': '!=COMP,CAN,CLOSE'}),
      check: (()=>{return {'status_maxvalue': '!=COMP,CAN,CLOSE'}})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - myworkCreatedLocally

                

                // begin datasource - myWorkOrder
                {
                  let options = {
  platform: `maximoMobile`,
  name: `myWorkOrder`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `false`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    savedQuery: `uxtechnicianstatusfilteredwolist`,
    mobileQbeFilter: ({'assignment[0].status_maxvalue' : '!=WAITASGN'}),
    select: ("autolocate,wonum,description,locationnum,location.description--locationdesc,location.location--locationnum,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},pluscwods._dbcount--pluscwodscount,pluscwods,location,location,wopriority,worktype,schedfinish,actfinish,status,status,status_description,status_maxvalue,assetnum,assetnum,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,asset.ISCALIBRATION--ISCALIBRATION,asset,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,serviceaddress,showplanmaterial._dbcount--materialcount,showplanmaterial,showplantool._dbcount--toolcount,showplantool,uxshowactualtool._dbcount--actualtoolcount,uxshowactualtool,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activeassetmeter,activelocationmeter._dbcount--locationmetercount,activelocationmeter,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,maxvar.pluscvaltool,maxvar.pluscqualtech,np_statusmemo,rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost},estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,wtypedesc,worktype,worktype,orgid,woclass,maxvar.downprompt,istask,wogroup,taskid,flowcontrolled,anywhererefid,wohazard._dbcount--wohazardcount,wohazard,splanreviewdate,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure},rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid},rel.mapsketch{sketchList,sketchname,mapsketchid}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`wonum`,
`description`,
`location.description`,
`location.location`,
`wopriority`,
`worktype`,
`status`,
`assetnum`,
`asset.description`,
`asset.assetnum`,
`serviceaddress.formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ],
    selectionMode: `single`,
    orderBy: `wopriority`,
    default: false,
    objectStructure: `mxapiwodetail`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dswolist`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    indexAttributes:     [
`wonum`,
`description`,
`location.description--locationdesc`,
`location.location--locationnum`,
`wopriority`,
`worktype`,
`status`,
`status_maxvalue`,
`assetnum`,
`asset.description--assetdesc`,
`asset.assetnum--assetnumber`,
`serviceaddress.formattedaddress--formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ]
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `autolocate`,
      sortable: `false`,
      id: `wymyz`
    },
    {
      name: `wonum`,
      sortable: `false`,
      searchable: `true`,
      id: `g4dk9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ej423`
    },
    {
      name: `locationnum`,
      sortable: `false`,
      id: `n_pxp`
    },
    {
      name: `location.description--locationdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `d_m_3`
    },
    {
      name: `location.location--locationnum`,
      searchable: `true`,
      id: `gy6zb`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `gevgw`
    },
    {
      name: `computedShowAssignment`,
      'computed-function': `computedShowAssignment`,
      id: `y5xx2`,
      computed: (true),
      local: (true)
    },
    {
      name: `isRejected`,
      'computed-function': `isRejected`,
      id: `ed_z2`,
      computed: (true),
      local: (true)
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `v42x2`
    },
    {
      name: `pluscwods`,
      id: `a6vyk`
    },
    {
      name: `location`,
      id: `ge39a`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ge39a`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `location`,
      id: `ge39a`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `x3nyj`
    },
    {
      name: `worktype`,
      searchable: `true`,
      id: `dpw__`
    },
    {
      name: `schedfinish`,
      sortable: `false`,
      id: `d23z7`
    },
    {
      name: `actfinish`,
      sortable: `false`,
      id: `d24z7`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `wq39_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wq39_`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `value,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wq39_`
    },
    {
      name: `status_description`,
      sortable: `false`,
      id: `mk837`
    },
    {
      name: `status_maxvalue`,
      sortable: `false`,
      index: `true`,
      id: `v68e9`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `j6w_q`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `j6w_q`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          }
        ]
      },
      datasource: `assetFilterDS`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `j6w_q`
    },
    {
      name: `asset.description--assetdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `z7qd3`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      sortable: `false`,
      id: `xn_54`
    },
    {
      name: `asset.assethealth--ahealth`,
      sortable: `false`,
      id: `d9b9n`
    },
    {
      name: `asset.assetnum--assetnumber`,
      sortable: `false`,
      searchable: `true`,
      id: `g3qg8`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      sortable: `false`,
      id: `mq3gw`
    },
    {
      name: `asset`,
      sortable: `false`,
      id: `kjyen`
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
      sortable: `false`,
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
      name: `serviceaddress`,
      sortable: `false`,
      id: `vqm4x`
    },
    {
      name: `showplanmaterial._dbcount--materialcount`,
      id: `pjvv3`
    },
    {
      name: `showplanmaterial`,
      sortable: `false`,
      id: `zqw_e`
    },
    {
      name: `showplantool._dbcount--toolcount`,
      id: `rn2j5`
    },
    {
      name: `showplantool`,
      sortable: `false`,
      id: `j_6ya`
    },
    {
      name: `uxshowactualtool._dbcount--actualtoolcount`,
      id: `vn8k7`
    },
    {
      name: `uxshowactualtool`,
      sortable: `false`,
      id: `pmmpe`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("w8m82_title", "Work Order")),
      remarks: (app.getLocalizedLabel("w8m82_remarks", "Identifies the work order.")),
      id: `w8m82`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedAssetNum`,
      'computed-function': `computedAssetNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("yzx7x_title", "Asset")),
      remarks: (app.getLocalizedLabel("yzx7x_remarks", "Asset Number")),
      id: `yzx7x`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsOverDue`,
      'computed-function': `computedIsOverDue`,
      title: (app.getLocalizedLabel("bzz5w_title", "computedIsOverDue")),
      remarks: (app.getLocalizedLabel("bzz5w_remarks", "computedIsOverDue")),
      id: `bzz5w`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedDisableButton`,
      'computed-function': `computedDisableButton`,
      id: `g32ag`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsAssetLoc`,
      'computed-function': `computedIsAssetLoc`,
      id: `dzgzx`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `n9ryw`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `g_p2y`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `qda4x`
    },
    {
      name: `activeassetmeter`,
      sortable: `false`,
      id: `j78xx`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `jg5k2`
    },
    {
      name: `activelocationmeter`,
      sortable: `false`,
      id: `ja796`
    },
    {
      name: `computedDisableMeter`,
      'computed-function': `computedDisableMeter`,
      id: `zjy8q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedTimerStatus`,
      'computed-function': `computedTimerStatus`,
      id: `e5_6n`,
      computed: (true),
      local: (true)
    },
    {
      name: `labtrans`,
      sortable: `false`,
      id: `a_n6a`
    },
    {
      name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
      sortable: `false`,
      id: `xz4k5`
    },
    {
      name: `maxvar.starttimerinprg`,
      sortable: `false`,
      id: `p2qk4`
    },
    {
      name: `maxvar.confirmlabtrans`,
      sortable: `false`,
      id: `pr7y9`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `y67d9`
    },
    {
      name: `maxvar.pluscqualtech`,
      id: `wk4v9`
    },
    {
      name: `computedWOStatusPriority`,
      'computed-function': `computedWOStatusPriority`,
      id: `ewgm6`,
      computed: (true),
      local: (true)
    },
    {
      name: `np_statusmemo`,
      id: `zd69q`
    },
    {
      name: `computedWorkTypeStatus`,
      'computed-function': `computedWorkTypeStatus`,
      id: `vdqrw`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost}`,
      id: `g29p_`
    },
    {
      name: `accessWoCostData`,
      'computed-function': `accessWoCostData`,
      id: `k9yga`,
      computed: (true),
      local: (true)
    },
    {
      name: `estintlabhrs`,
      sortable: `false`,
      id: `pjj4p`
    },
    {
      name: `estoutlabhrs`,
      sortable: `false`,
      id: `djrbn`
    },
    {
      name: `estlabhrs`,
      sortable: `false`,
      id: `peayb`
    },
    {
      name: `estintlabcost`,
      sortable: `false`,
      id: `j6g9a`
    },
    {
      name: `estoutlabcost`,
      sortable: `false`,
      id: `vpb7b`
    },
    {
      name: `laborcosts`,
      id: `r8gdg`
    },
    {
      name: `estmatcost`,
      sortable: `false`,
      id: `w74m5`
    },
    {
      name: `esttoolcost`,
      sortable: `false`,
      id: `kngn7`
    },
    {
      name: `estservcost`,
      sortable: `false`,
      id: `zpwre`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `vdnby`
    },
    {
      name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
      id: `jdxwr`
    },
    {
      name: `workorderid`,
      sortable: `false`,
      'unique-id': `true`,
      id: `gzwj2`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `zypep`
    },
    {
      name: `maxvar.coordinate`,
      id: `mwkdp`
    },
    {
      name: `wtypedesc`,
      id: `araxv`
    },
    {
      name: `worktype`,
      id: `wnpqk`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wnpqk`,
      lookup:       {
        name: `worktype`,
        attributeMap:         [
          {
            datasourceField: `worktype,wtypedesc`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `worktype`,
            lookupField: `value`
          }
        ]
      },
      datasource: `workTypeFilterDS`
    },
    {
      name: `worktype`,
      id: `wnpqk`
    },
    {
      name: `orgid`,
      id: `mr29q`
    },
    {
      name: `woclass`,
      sortable: `false`,
      id: `kpg33`
    },
    {
      name: `maxvar.downprompt`,
      id: `j973v`
    },
    {
      name: `istask`,
      sortable: `false`,
      id: `mm8km`
    },
    {
      name: `wogroup`,
      searchable: `true`,
      sortable: `false`,
      id: `qv3me`
    },
    {
      name: `taskid`,
      sortable: `false`,
      searchable: `true`,
      id: `ex4xn`
    },
    {
      name: `flowcontrolled`,
      sortable: `false`,
      id: `zw9xq`
    },
    {
      name: `anywhererefid`,
      sortable: `false`,
      id: `wyryp`
    },
    {
      name: `wohazard._dbcount--wohazardcount`,
      id: `v89mp`
    },
    {
      name: `wohazard`,
      id: `z58yp`
    },
    {
      name: `splanreviewdate`,
      sortable: `false`,
      id: `ympwe`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `zaxe9`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure}`,
      id: `vn7ym`
    },
    {
      name: `rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid}`,
      id: `n8_84`
    },
    {
      name: `rel.mapsketch{sketchList,sketchname,mapsketchid}`,
      id: `x9z3j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `dswolist`,
  computedFields:   {
    computedShowAssignment:     {
      computedFunction: ((item, datasource) => datasource.callController('computedShowAssignment', item))
    },
    isRejected:     {
      computedFunction: ((item, datasource) => datasource.callController('isRejected', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
    },
    computedAssetNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedAssetNum', item))
    },
    computedIsOverDue:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsOverDue', item))
    },
    computedDisableButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableButton', item))
    },
    computedIsAssetLoc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsAssetLoc', item))
    },
    computedDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableMeter', item))
    },
    computedTimerStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTimerStatus', item))
    },
    computedWOStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWOStatusPriority', item))
    },
    computedWorkTypeStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkTypeStatus', item))
    },
    accessWoCostData:     {
      computedFunction: ((item, datasource) => datasource.callController('accessWoCostData', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `mobileQbeFilter`,
      lastValue: ({'assignment[0].status_maxvalue' : '!=WAITASGN'}),
      check: (()=>{return {'assignment[0].status_maxvalue' : '!=WAITASGN'}})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - myWorkOrder

                

                // begin datasource - completedCloseDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `completedCloseDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `false`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    savedQuery: `MOBWORKHIST`,
    select: ("autolocate,wonum,description,locationnum,location.description--locationdesc,location.location--locationnum,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},pluscwods._dbcount--pluscwodscount,pluscwods,location,location,wopriority,worktype,schedfinish,actfinish,status,status,status_description,status_maxvalue,assetnum,assetnum,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,asset.ISCALIBRATION--ISCALIBRATION,asset,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,serviceaddress,showplanmaterial._dbcount--materialcount,showplanmaterial,showplantool._dbcount--toolcount,showplantool,uxshowactualtool._dbcount--actualtoolcount,uxshowactualtool,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activeassetmeter,activelocationmeter._dbcount--locationmetercount,activelocationmeter,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,maxvar.pluscvaltool,maxvar.pluscqualtech,np_statusmemo,rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost},estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,wtypedesc,worktype,worktype,orgid,woclass,maxvar.downprompt,istask,wogroup,taskid,flowcontrolled,anywhererefid,wohazard._dbcount--wohazardcount,wohazard,splanreviewdate,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure},rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid},rel.mapsketch{sketchList,sketchname,mapsketchid}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`wonum`,
`description`,
`location.description`,
`location.location`,
`wopriority`,
`worktype`,
`status`,
`assetnum`,
`asset.description`,
`asset.assetnum`,
`serviceaddress.formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ],
    selectionMode: `single`,
    orderBy: `wopriority`,
    default: false,
    objectStructure: `mxapiwodetail`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dswolist`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    indexAttributes:     [
`wonum`,
`description`,
`location.description--locationdesc`,
`location.location--locationnum`,
`wopriority`,
`worktype`,
`status`,
`status_maxvalue`,
`assetnum`,
`asset.description--assetdesc`,
`asset.assetnum--assetnumber`,
`serviceaddress.formattedaddress--formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ]
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `autolocate`,
      sortable: `false`,
      id: `wymyz`
    },
    {
      name: `wonum`,
      sortable: `false`,
      searchable: `true`,
      id: `g4dk9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ej423`
    },
    {
      name: `locationnum`,
      sortable: `false`,
      id: `n_pxp`
    },
    {
      name: `location.description--locationdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `d_m_3`
    },
    {
      name: `location.location--locationnum`,
      searchable: `true`,
      id: `gy6zb`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `gevgw`
    },
    {
      name: `computedShowAssignment`,
      'computed-function': `computedShowAssignment`,
      id: `y5xx2`,
      computed: (true),
      local: (true)
    },
    {
      name: `isRejected`,
      'computed-function': `isRejected`,
      id: `ed_z2`,
      computed: (true),
      local: (true)
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `v42x2`
    },
    {
      name: `pluscwods`,
      id: `a6vyk`
    },
    {
      name: `location`,
      id: `ge39a`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ge39a`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `location`,
      id: `ge39a`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `x3nyj`
    },
    {
      name: `worktype`,
      searchable: `true`,
      id: `dpw__`
    },
    {
      name: `schedfinish`,
      sortable: `false`,
      id: `d23z7`
    },
    {
      name: `actfinish`,
      sortable: `false`,
      id: `d24z7`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `wq39_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wq39_`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `value,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wq39_`
    },
    {
      name: `status_description`,
      sortable: `false`,
      id: `mk837`
    },
    {
      name: `status_maxvalue`,
      sortable: `false`,
      index: `true`,
      id: `v68e9`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `j6w_q`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `j6w_q`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          }
        ]
      },
      datasource: `assetFilterDS`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `j6w_q`
    },
    {
      name: `asset.description--assetdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `z7qd3`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      sortable: `false`,
      id: `xn_54`
    },
    {
      name: `asset.assethealth--ahealth`,
      sortable: `false`,
      id: `d9b9n`
    },
    {
      name: `asset.assetnum--assetnumber`,
      sortable: `false`,
      searchable: `true`,
      id: `g3qg8`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      sortable: `false`,
      id: `mq3gw`
    },
    {
      name: `asset`,
      sortable: `false`,
      id: `kjyen`
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
      sortable: `false`,
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
      name: `serviceaddress`,
      sortable: `false`,
      id: `vqm4x`
    },
    {
      name: `showplanmaterial._dbcount--materialcount`,
      id: `pjvv3`
    },
    {
      name: `showplanmaterial`,
      sortable: `false`,
      id: `zqw_e`
    },
    {
      name: `showplantool._dbcount--toolcount`,
      id: `rn2j5`
    },
    {
      name: `showplantool`,
      sortable: `false`,
      id: `j_6ya`
    },
    {
      name: `uxshowactualtool._dbcount--actualtoolcount`,
      id: `vn8k7`
    },
    {
      name: `uxshowactualtool`,
      sortable: `false`,
      id: `pmmpe`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("w8m82_title", "Work Order")),
      remarks: (app.getLocalizedLabel("w8m82_remarks", "Identifies the work order.")),
      id: `w8m82`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedAssetNum`,
      'computed-function': `computedAssetNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("yzx7x_title", "Asset")),
      remarks: (app.getLocalizedLabel("yzx7x_remarks", "Asset Number")),
      id: `yzx7x`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsOverDue`,
      'computed-function': `computedIsOverDue`,
      title: (app.getLocalizedLabel("bzz5w_title", "computedIsOverDue")),
      remarks: (app.getLocalizedLabel("bzz5w_remarks", "computedIsOverDue")),
      id: `bzz5w`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedDisableButton`,
      'computed-function': `computedDisableButton`,
      id: `g32ag`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsAssetLoc`,
      'computed-function': `computedIsAssetLoc`,
      id: `dzgzx`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `n9ryw`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `g_p2y`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `qda4x`
    },
    {
      name: `activeassetmeter`,
      sortable: `false`,
      id: `j78xx`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `jg5k2`
    },
    {
      name: `activelocationmeter`,
      sortable: `false`,
      id: `ja796`
    },
    {
      name: `computedDisableMeter`,
      'computed-function': `computedDisableMeter`,
      id: `zjy8q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedTimerStatus`,
      'computed-function': `computedTimerStatus`,
      id: `e5_6n`,
      computed: (true),
      local: (true)
    },
    {
      name: `labtrans`,
      sortable: `false`,
      id: `a_n6a`
    },
    {
      name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
      sortable: `false`,
      id: `xz4k5`
    },
    {
      name: `maxvar.starttimerinprg`,
      sortable: `false`,
      id: `p2qk4`
    },
    {
      name: `maxvar.confirmlabtrans`,
      sortable: `false`,
      id: `pr7y9`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `y67d9`
    },
    {
      name: `maxvar.pluscqualtech`,
      id: `wk4v9`
    },
    {
      name: `computedWOStatusPriority`,
      'computed-function': `computedWOStatusPriority`,
      id: `ewgm6`,
      computed: (true),
      local: (true)
    },
    {
      name: `np_statusmemo`,
      id: `zd69q`
    },
    {
      name: `computedWorkTypeStatus`,
      'computed-function': `computedWorkTypeStatus`,
      id: `vdqrw`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost}`,
      id: `g29p_`
    },
    {
      name: `accessWoCostData`,
      'computed-function': `accessWoCostData`,
      id: `k9yga`,
      computed: (true),
      local: (true)
    },
    {
      name: `estintlabhrs`,
      sortable: `false`,
      id: `pjj4p`
    },
    {
      name: `estoutlabhrs`,
      sortable: `false`,
      id: `djrbn`
    },
    {
      name: `estlabhrs`,
      sortable: `false`,
      id: `peayb`
    },
    {
      name: `estintlabcost`,
      sortable: `false`,
      id: `j6g9a`
    },
    {
      name: `estoutlabcost`,
      sortable: `false`,
      id: `vpb7b`
    },
    {
      name: `laborcosts`,
      id: `r8gdg`
    },
    {
      name: `estmatcost`,
      sortable: `false`,
      id: `w74m5`
    },
    {
      name: `esttoolcost`,
      sortable: `false`,
      id: `kngn7`
    },
    {
      name: `estservcost`,
      sortable: `false`,
      id: `zpwre`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `vdnby`
    },
    {
      name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
      id: `jdxwr`
    },
    {
      name: `workorderid`,
      sortable: `false`,
      'unique-id': `true`,
      id: `gzwj2`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `zypep`
    },
    {
      name: `maxvar.coordinate`,
      id: `mwkdp`
    },
    {
      name: `wtypedesc`,
      id: `araxv`
    },
    {
      name: `worktype`,
      id: `wnpqk`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wnpqk`,
      lookup:       {
        name: `worktype`,
        attributeMap:         [
          {
            datasourceField: `worktype,wtypedesc`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `worktype`,
            lookupField: `value`
          }
        ]
      },
      datasource: `workTypeFilterDS`
    },
    {
      name: `worktype`,
      id: `wnpqk`
    },
    {
      name: `orgid`,
      id: `mr29q`
    },
    {
      name: `woclass`,
      sortable: `false`,
      id: `kpg33`
    },
    {
      name: `maxvar.downprompt`,
      id: `j973v`
    },
    {
      name: `istask`,
      sortable: `false`,
      id: `mm8km`
    },
    {
      name: `wogroup`,
      searchable: `true`,
      sortable: `false`,
      id: `qv3me`
    },
    {
      name: `taskid`,
      sortable: `false`,
      searchable: `true`,
      id: `ex4xn`
    },
    {
      name: `flowcontrolled`,
      sortable: `false`,
      id: `zw9xq`
    },
    {
      name: `anywhererefid`,
      sortable: `false`,
      id: `wyryp`
    },
    {
      name: `wohazard._dbcount--wohazardcount`,
      id: `v89mp`
    },
    {
      name: `wohazard`,
      id: `z58yp`
    },
    {
      name: `splanreviewdate`,
      sortable: `false`,
      id: `ympwe`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `zaxe9`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure}`,
      id: `vn7ym`
    },
    {
      name: `rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid}`,
      id: `n8_84`
    },
    {
      name: `rel.mapsketch{sketchList,sketchname,mapsketchid}`,
      id: `x9z3j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `dswolist`,
  computedFields:   {
    computedShowAssignment:     {
      computedFunction: ((item, datasource) => datasource.callController('computedShowAssignment', item))
    },
    isRejected:     {
      computedFunction: ((item, datasource) => datasource.callController('isRejected', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
    },
    computedAssetNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedAssetNum', item))
    },
    computedIsOverDue:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsOverDue', item))
    },
    computedDisableButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableButton', item))
    },
    computedIsAssetLoc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsAssetLoc', item))
    },
    computedDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableMeter', item))
    },
    computedTimerStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTimerStatus', item))
    },
    computedWOStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWOStatusPriority', item))
    },
    computedWorkTypeStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkTypeStatus', item))
    },
    accessWoCostData:     {
      computedFunction: ((item, datasource) => datasource.callController('accessWoCostData', item))
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
  isMaximoMobile: true,
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
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - completedCloseDS

                

                // begin datasource - serverSearch
                {
                  let options = {
  platform: `maximoMobile`,
  name: `serverSearch`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 20,
  default: `false`,
  debounceTime: 100,
  query:   {
    pageSize: 20,
    savedQuery: `SERVERSEARCH`,
    mobileServerSearch: true,
    select: ("autolocate,wonum,description,locationnum,location.description--locationdesc,location.location--locationnum,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},pluscwods._dbcount--pluscwodscount,pluscwods,location,location,wopriority,worktype,schedfinish,actfinish,status,status,status_description,status_maxvalue,assetnum,assetnum,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.assethealth--ahealth,asset.assetnum--assetnumber,asset.ISCALIBRATION--ISCALIBRATION,asset,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,serviceaddress,showplanmaterial._dbcount--materialcount,showplanmaterial,showplantool._dbcount--toolcount,showplantool,uxshowactualtool._dbcount--actualtoolcount,uxshowactualtool,siteid,orgid,activeassetmeter._dbcount--assetmetercount,activeassetmeter,activelocationmeter._dbcount--locationmetercount,activelocationmeter,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},maxvar.starttimerinprg,maxvar.confirmlabtrans,maxvar.pluscvaltool,maxvar.pluscqualtech,np_statusmemo,rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost},estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum},workorderid,uxsynonymdomain.valueid,maxvar.coordinate,wtypedesc,worktype,worktype,orgid,woclass,maxvar.downprompt,istask,wogroup,taskid,flowcontrolled,anywhererefid,wohazard._dbcount--wohazardcount,wohazard,splanreviewdate,wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum},rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure},rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid},rel.mapsketch{sketchList,sketchname,mapsketchid}"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`wonum`,
`description`,
`location.description`,
`location.location`,
`wopriority`,
`worktype`,
`status`,
`assetnum`,
`asset.description`,
`asset.assetnum`,
`serviceaddress.formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ],
    selectionMode: `single`,
    orderBy: `wopriority`,
    default: false,
    objectStructure: `mxapiwodetail`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dswolist`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    indexAttributes:     [
`wonum`,
`description`,
`location.description--locationdesc`,
`location.location--locationnum`,
`wopriority`,
`worktype`,
`status`,
`status_maxvalue`,
`assetnum`,
`asset.description--assetdesc`,
`asset.assetnum--assetnumber`,
`serviceaddress.formattedaddress--formattedaddress`,
`siteid`,
`wogroup`,
`taskid`
    ]
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `autolocate`,
      sortable: `false`,
      id: `wymyz`
    },
    {
      name: `wonum`,
      sortable: `false`,
      searchable: `true`,
      id: `g4dk9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `ej423`
    },
    {
      name: `locationnum`,
      sortable: `false`,
      id: `n_pxp`
    },
    {
      name: `location.description--locationdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `d_m_3`
    },
    {
      name: `location.location--locationnum`,
      searchable: `true`,
      id: `gy6zb`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `gevgw`
    },
    {
      name: `computedShowAssignment`,
      'computed-function': `computedShowAssignment`,
      id: `y5xx2`,
      computed: (true),
      local: (true)
    },
    {
      name: `isRejected`,
      'computed-function': `isRejected`,
      id: `ed_z2`,
      computed: (true),
      local: (true)
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `v42x2`
    },
    {
      name: `pluscwods`,
      id: `a6vyk`
    },
    {
      name: `location`,
      id: `ge39a`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ge39a`,
      lookup:       {
        name: `location`,
        attributeMap:         [
          {
            datasourceField: `location,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `location`,
      id: `ge39a`
    },
    {
      name: `wopriority`,
      searchable: `true`,
      id: `x3nyj`
    },
    {
      name: `worktype`,
      searchable: `true`,
      id: `dpw__`
    },
    {
      name: `schedfinish`,
      sortable: `false`,
      id: `d23z7`
    },
    {
      name: `actfinish`,
      sortable: `false`,
      id: `d24z7`
    },
    {
      searchable: `true`,
      name: `status`,
      id: `wq39_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wq39_`,
      lookup:       {
        name: `wostatus`,
        attributeMap:         [
          {
            datasourceField: `value,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wq39_`
    },
    {
      name: `status_description`,
      sortable: `false`,
      id: `mk837`
    },
    {
      name: `status_maxvalue`,
      sortable: `false`,
      index: `true`,
      id: `v68e9`
    },
    {
      searchable: `true`,
      name: `assetnum`,
      id: `j6w_q`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `j6w_q`,
      lookup:       {
        name: `asset`,
        attributeMap:         [
          {
            datasourceField: `assetnum,description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `assetnum`,
            lookupField: `value`
          }
        ]
      },
      datasource: `assetFilterDS`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `j6w_q`
    },
    {
      name: `asset.description--assetdesc`,
      sortable: `false`,
      searchable: `true`,
      id: `z7qd3`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      sortable: `false`,
      id: `xn_54`
    },
    {
      name: `asset.assethealth--ahealth`,
      sortable: `false`,
      id: `d9b9n`
    },
    {
      name: `asset.assetnum--assetnumber`,
      sortable: `false`,
      searchable: `true`,
      id: `g3qg8`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      sortable: `false`,
      id: `mq3gw`
    },
    {
      name: `asset`,
      sortable: `false`,
      id: `kjyen`
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
      sortable: `false`,
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
      name: `serviceaddress`,
      sortable: `false`,
      id: `vqm4x`
    },
    {
      name: `showplanmaterial._dbcount--materialcount`,
      id: `pjvv3`
    },
    {
      name: `showplanmaterial`,
      sortable: `false`,
      id: `zqw_e`
    },
    {
      name: `showplantool._dbcount--toolcount`,
      id: `rn2j5`
    },
    {
      name: `showplantool`,
      sortable: `false`,
      id: `j_6ya`
    },
    {
      name: `uxshowactualtool._dbcount--actualtoolcount`,
      id: `vn8k7`
    },
    {
      name: `uxshowactualtool`,
      sortable: `false`,
      id: `pmmpe`
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("w8m82_title", "Work Order")),
      remarks: (app.getLocalizedLabel("w8m82_remarks", "Identifies the work order.")),
      id: `w8m82`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedAssetNum`,
      'computed-function': `computedAssetNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("yzx7x_title", "Asset")),
      remarks: (app.getLocalizedLabel("yzx7x_remarks", "Asset Number")),
      id: `yzx7x`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsOverDue`,
      'computed-function': `computedIsOverDue`,
      title: (app.getLocalizedLabel("bzz5w_title", "computedIsOverDue")),
      remarks: (app.getLocalizedLabel("bzz5w_remarks", "computedIsOverDue")),
      id: `bzz5w`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedDisableButton`,
      'computed-function': `computedDisableButton`,
      id: `g32ag`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedIsAssetLoc`,
      'computed-function': `computedIsAssetLoc`,
      id: `dzgzx`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      sortable: `false`,
      searchable: `true`,
      id: `n9ryw`
    },
    {
      name: `orgid`,
      sortable: `false`,
      id: `g_p2y`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `qda4x`
    },
    {
      name: `activeassetmeter`,
      sortable: `false`,
      id: `j78xx`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `jg5k2`
    },
    {
      name: `activelocationmeter`,
      sortable: `false`,
      id: `ja796`
    },
    {
      name: `computedDisableMeter`,
      'computed-function': `computedDisableMeter`,
      id: `zjy8q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedTimerStatus`,
      'computed-function': `computedTimerStatus`,
      id: `e5_6n`,
      computed: (true),
      local: (true)
    },
    {
      name: `labtrans`,
      sortable: `false`,
      id: `a_n6a`
    },
    {
      name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
      sortable: `false`,
      id: `xz4k5`
    },
    {
      name: `maxvar.starttimerinprg`,
      sortable: `false`,
      id: `p2qk4`
    },
    {
      name: `maxvar.confirmlabtrans`,
      sortable: `false`,
      id: `pr7y9`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `y67d9`
    },
    {
      name: `maxvar.pluscqualtech`,
      id: `wk4v9`
    },
    {
      name: `computedWOStatusPriority`,
      'computed-function': `computedWOStatusPriority`,
      id: `ewgm6`,
      computed: (true),
      local: (true)
    },
    {
      name: `np_statusmemo`,
      id: `zd69q`
    },
    {
      name: `computedWorkTypeStatus`,
      'computed-function': `computedWorkTypeStatus`,
      id: `vdqrw`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.woactivity{taskid,status,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost}`,
      id: `g29p_`
    },
    {
      name: `accessWoCostData`,
      'computed-function': `accessWoCostData`,
      id: `k9yga`,
      computed: (true),
      local: (true)
    },
    {
      name: `estintlabhrs`,
      sortable: `false`,
      id: `pjj4p`
    },
    {
      name: `estoutlabhrs`,
      sortable: `false`,
      id: `djrbn`
    },
    {
      name: `estlabhrs`,
      sortable: `false`,
      id: `peayb`
    },
    {
      name: `estintlabcost`,
      sortable: `false`,
      id: `j6g9a`
    },
    {
      name: `estoutlabcost`,
      sortable: `false`,
      id: `vpb7b`
    },
    {
      name: `laborcosts`,
      id: `r8gdg`
    },
    {
      name: `estmatcost`,
      sortable: `false`,
      id: `w74m5`
    },
    {
      name: `esttoolcost`,
      sortable: `false`,
      id: `kngn7`
    },
    {
      name: `estservcost`,
      sortable: `false`,
      id: `zpwre`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `vdnby`
    },
    {
      name: `wptool{wpitemid,itemqty,itemnum,hours,description,location,location.description--locationdesc,location.location--locationnum}`,
      id: `jdxwr`
    },
    {
      name: `workorderid`,
      sortable: `false`,
      'unique-id': `true`,
      id: `gzwj2`
    },
    {
      name: `uxsynonymdomain.valueid`,
      id: `zypep`
    },
    {
      name: `maxvar.coordinate`,
      id: `mwkdp`
    },
    {
      name: `wtypedesc`,
      id: `araxv`
    },
    {
      name: `worktype`,
      id: `wnpqk`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `wnpqk`,
      lookup:       {
        name: `worktype`,
        attributeMap:         [
          {
            datasourceField: `worktype,wtypedesc`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `worktype`,
            lookupField: `value`
          }
        ]
      },
      datasource: `workTypeFilterDS`
    },
    {
      name: `worktype`,
      id: `wnpqk`
    },
    {
      name: `orgid`,
      id: `mr29q`
    },
    {
      name: `woclass`,
      sortable: `false`,
      id: `kpg33`
    },
    {
      name: `maxvar.downprompt`,
      id: `j973v`
    },
    {
      name: `istask`,
      sortable: `false`,
      id: `mm8km`
    },
    {
      name: `wogroup`,
      searchable: `true`,
      sortable: `false`,
      id: `qv3me`
    },
    {
      name: `taskid`,
      sortable: `false`,
      searchable: `true`,
      id: `ex4xn`
    },
    {
      name: `flowcontrolled`,
      sortable: `false`,
      id: `zw9xq`
    },
    {
      name: `anywhererefid`,
      sortable: `false`,
      id: `wyryp`
    },
    {
      name: `wohazard._dbcount--wohazardcount`,
      id: `v89mp`
    },
    {
      name: `wohazard`,
      id: `z58yp`
    },
    {
      name: `splanreviewdate`,
      sortable: `false`,
      id: `ympwe`
    },
    {
      name: `wpmaterial{wpitemid,itemqty,itemnum,description,materiallocation.description--locationdesc,location.location--locationnum}`,
      id: `zaxe9`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure}`,
      id: `vn7ym`
    },
    {
      name: `rel.multiassetlocci{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},location.location--location,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,ci.cinum,ci.ciid}`,
      id: `n8_84`
    },
    {
      name: `rel.mapsketch{sketchList,sketchname,mapsketchid}`,
      id: `x9z3j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `dswolist`,
  computedFields:   {
    computedShowAssignment:     {
      computedFunction: ((item, datasource) => datasource.callController('computedShowAssignment', item))
    },
    isRejected:     {
      computedFunction: ((item, datasource) => datasource.callController('isRejected', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
    },
    computedAssetNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedAssetNum', item))
    },
    computedIsOverDue:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsOverDue', item))
    },
    computedDisableButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableButton', item))
    },
    computedIsAssetLoc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedIsAssetLoc', item))
    },
    computedDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableMeter', item))
    },
    computedTimerStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTimerStatus', item))
    },
    computedWOStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWOStatusPriority', item))
    },
    computedWorkTypeStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkTypeStatus', item))
    },
    accessWoCostData:     {
      computedFunction: ((item, datasource) => datasource.callController('accessWoCostData', item))
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
  isMaximoMobile: true,
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
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - serverSearch

                

                // begin datasource - wodetails
                {
                  let options = {
  platform: `maximoMobile`,
  name: `wodetails`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `wodetails`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    select: `workorderid,wonum,siteid,rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure},assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},location.location--locationnum,location.description--locationdesc,labtrans,flowcontrolled,splanreviewdate,facilityid,levelid`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `wmkv_`
    },
    {
      name: `wonum`,
      id: `mwjz6`
    },
    {
      name: `siteid`,
      id: `gqb8q`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear,startmeasure,endmeasure}`,
      id: `z84xw`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `z92g5`
    },
    {
      name: `computedShowAssignment`,
      'computed-function': `computedShowAssignment`,
      id: `g3adq`,
      computed: (true),
      local: (true)
    },
    {
      name: `location.location--locationnum`,
      id: `rzrxe`
    },
    {
      name: `location.description--locationdesc`,
      id: `xy3wa`
    },
    {
      name: `labtrans`,
      id: `kzjd2`
    },
    {
      name: `flowcontrolled`,
      id: `qzdw4`
    },
    {
      name: `splanreviewdate`,
      id: `rzyn8`
    },
    {
      name: `facilityid`,
      sortable: `false`,
      id: `mvvpd`
    },
    {
      name: `levelid`,
      id: `p76kx`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedShowAssignment:     {
      computedFunction: ((item, datasource) => datasource.callController('computedShowAssignment', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(page.state.canloadwodetails)),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - wodetails

                

                // begin datasource - signatureAttachment
                {
                  let options = {
  platform: `maximoMobile`,
  name: `signatureAttachment`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    attachment: true,
    relationship: `doclinks`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    select: `*`,
    dependsOn: `wodetails`,
    dsParentObject: `mxapiwodetail`
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
      id: `qgd_5`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `wodetails`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.doNotLoadWoDetailsChilds)),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - signatureAttachment

                

                // begin datasource - woWorklogDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woWorklogDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 200,
  query:   {
    pageSize: 200,
    selectionMode: `none`,
    relationship: `woworklog`,
    objectName: `worklog`,
    itemUrl: (page.params.href),
    select: `createdate,description,description_longdescription,person.displayname--createby,logtype,anywhererefid,clientviewable`,
    dependsOn: `wodetails`,
    dsParentObject: `mxapiwodetail`
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
      id: `jn_ae`
    },
    {
      name: `description`,
      id: `wa58q`
    },
    {
      name: `description_longdescription`,
      id: `y7apk`
    },
    {
      name: `person.displayname--createby`,
      id: `zb66a`
    },
    {
      name: `logtype`,
      id: `ezq9r`
    },
    {
      name: `anywhererefid`,
      id: `em_rn`
    },
    {
      name: `clientviewable`,
      id: `ame2j`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `wodetails`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.doNotLoadWoDetailsChilds)),
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
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woWorklogDs

                

                // begin datasource - womaterialsds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `womaterialsds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `showplanmaterial`,
    selectionMode: `none`,
    dependsOn: `wodetails`,
    notifyWhenParentLoads: true,
    itemUrl: (page.params.href),
    select: `itemnum,description,itemqty,materiallocation.description--locationdesc,wpitemid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `wpitemid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      id: `zzxbj`
    },
    {
      name: `description`,
      id: `v4e9a`
    },
    {
      name: `itemqty`,
      id: `pvg5x`
    },
    {
      name: `computedItemNum`,
      'computed-function': `computedItemNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("zpjz9_title", "Item")),
      remarks: (app.getLocalizedLabel("zpjz9_remarks", "Identifies the item.")),
      id: `zpjz9`,
      computed: (true),
      local: (true)
    },
    {
      name: `materiallocation.description--locationdesc`,
      id: `q4qj7`
    },
    {
      name: `wpitemid`,
      'unique-id': `true`,
      id: `mp7wv`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `wodetails`,
  computedFields:   {
    computedItemNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedItemNum', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.doNotLoadWoDetailsChilds)),
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
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - womaterialsds

                

                // begin datasource - wotoolsds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `wotoolsds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `showplantool`,
    selectionMode: `none`,
    dependsOn: `wodetails`,
    notifyWhenParentLoads: true,
    itemUrl: (page.params.href),
    select: `itemnum,description,storelocsite,location.location--locationnum,location.description--locationdesc,itemqty,hours,wpitemid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `wpitemid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      'unique-id': `true`,
      id: `vepx8`
    },
    {
      name: `description`,
      id: `x8err`
    },
    {
      name: `storelocsite`,
      id: `x4mwj`
    },
    {
      name: `location.location--locationnum`,
      id: `n77mn`
    },
    {
      name: `location.description--locationdesc`,
      id: `xj4xg`
    },
    {
      name: `itemqty`,
      id: `kwnxe`
    },
    {
      name: `hours`,
      id: `nvng_`
    },
    {
      name: `wpitemid`,
      'unique-id': `true`,
      id: `npq6k`
    },
    {
      name: `computedItemNum`,
      'computed-function': `computedItemNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("a3vdy_title", "Tool")),
      remarks: (app.getLocalizedLabel("a3vdy_remarks", "Identifies the tool.")),
      id: `a3vdy`,
      computed: (true),
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `wodetails`,
  computedFields:   {
    computedItemNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedItemNum', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.doNotLoadWoDetailsChilds)),
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
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - wotoolsds

                

                // begin datasource - woLaborDetaildsOnSchedule
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woLaborDetaildsOnSchedule`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `labtransid`,
    relationship: `uxshowactuallabor`,
    notifyWhenParentLoads: true,
    dependsOn: `wodetails`,
    childFilters:     [
      {
        "workorder.uxshowactuallabor.limit": `50`,
        "workorder.uxshowactuallabor.orderBy": `-labtransid`
      }
    ],
    searchAttributes:     [
`timerstatus`,
`laborcode`
    ],
    indexAttributes:     [
`timerstatus`,
`laborcode`
    ],
    select: `startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `labtransid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `startdate`,
      id: `dym6j`
    },
    {
      name: `starttime`,
      id: `z4nae`
    },
    {
      name: `startdatetime`,
      id: `z3346`
    },
    {
      name: `finishdate`,
      id: `pym8j`
    },
    {
      name: `finishtime`,
      id: `wee94`
    },
    {
      name: `finishdatetime`,
      id: `b5483`
    },
    {
      name: `regularhrs`,
      id: `d34eb`
    },
    {
      name: `transtype`,
      id: `wme9p`
    },
    {
      name: `labtransid`,
      'unique-id': `true`,
      id: `e3_92`
    },
    {
      name: `timerstatus`,
      searchable: `true`,
      id: `k3ba4`
    },
    {
      name: `laborcode`,
      searchable: `true`,
      id: `xj8ve`
    },
    {
      name: `anywhererefid`,
      id: `a7je9`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `wodetails`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - woLaborDetaildsOnSchedule

                

                // begin datasource - rejectList
                {
                  let options = {
  name: `rejectList`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `statusItems`,
  schemaExt:   [
    {
      name: `value`,
      id: `r7dz6`
    },
    {
      name: `description`,
      id: `dgvvp`
    },
    {
      name: `valuid`,
      id: `yrebn`
    },
    {
      name: `domainid`,
      id: `a9azp`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `value`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `value,description,valuid,domainid`,
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
                // end datasource - rejectList

                

                // begin datasource - dsstatusDomainList
                {
                  let options = {
  name: `dsstatusDomainList`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `statusItems`,
  schemaExt:   [
    {
      name: `value`,
      id: `pqyvz`
    },
    {
      name: `description`,
      id: `k8k8k`
    },
    {
      name: `maxvalue`,
      id: `rawnz`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `value`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `value,description,maxvalue`,
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
                // end datasource - dsstatusDomainList

                
          
                // begin dialog - slidingwomaterials
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `slidingwomaterials`,
  configuration:   {
    id: `slidingwomaterials`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerSlidingwomaterials slidingDrawerProps={props} id={"slidingwomaterials_slidingdrawer_container"}  />
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
                // end dialog - slidingwomaterials
                

                // begin dialog - workLogDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `workLogDrawer`,
  configuration:   {
    id: `workLogDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerWorkLogDrawer slidingDrawerProps={props} id={"workLogDrawer_slidingdrawer_container"}  />
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
                // end dialog - workLogDrawer
                

                // begin dialog - saveDiscardWorkLog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardWorkLog`,
  configuration:   {
    id: `saveDiscardWorkLog`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardWorkLog id={"saveDiscardWorkLog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardWorkLog
                

                // begin dialog - rejectAssignment
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `rejectAssignment`,
  configuration:   {
    id: `rejectAssignment`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerRejectAssignment slidingDrawerProps={props} id={"rejectAssignment_slidingdrawer_container"}  />
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
                  let controller = new RejectController();
          bootstrapInspector.onNewController(controller, 'RejectController', dialog);
        dialog.registerController(controller);
                  page.registerDialog(dialog);
                }
                // end dialog - rejectAssignment
                

                // begin dialog - woStatusChangeDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `woStatusChangeDialog`,
  configuration:   {
    id: `woStatusChangeDialog`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerWoStatusChangeDialog slidingDrawerProps={props} id={"woStatusChangeDialog_slidingdrawer_container"}  />
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
                  let controller = new ChangeStatusController();
          bootstrapInspector.onNewController(controller, 'ChangeStatusController', dialog);
        dialog.registerController(controller);
                  page.registerDialog(dialog);
                }
                // end dialog - woStatusChangeDialog
                

                // begin dialog - meterReadingDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `meterReadingDrawer`,
  configuration:   {
    id: `meterReadingDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerMeterReadingDrawer slidingDrawerProps={props} id={"meterReadingDrawer_slidingdrawer_container"}  />
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
                // end dialog - meterReadingDrawer
                

                // begin dialog - update_meterReading_drawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `update_meterReading_drawer`,
  configuration:   {
    id: `update_meterReading_drawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerUpdate_meterReading_drawer slidingDrawerProps={props} id={"update_meterReading_drawer_slidingdrawer_container"}  />
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
                // end dialog - update_meterReading_drawer
                

                // begin dialog - saveDiscardMeterReadingList
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardMeterReadingList`,
  configuration:   {
    id: `saveDiscardMeterReadingList`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardMeterReadingList id={"saveDiscardMeterReadingList_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardMeterReadingList
                

                // begin dialog - meterReadingLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `meterReadingLookup`,
  configuration:   {
    id: `meterReadingLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupMeterReadingLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupMeterReadingLookup {...props} />
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
                // end dialog - meterReadingLookup
                

                // begin dialog - rollOverDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `rollOverDialog`,
  configuration:   {
    id: `rollOverDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogRollOverDialog id={"rollOverDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - rollOverDialog
                

                // begin dialog - slidingwohazard
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `slidingwohazard`,
  configuration:   {
    id: `slidingwohazard`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerSlidingwohazard slidingDrawerProps={props} id={"slidingwohazard_slidingdrawer_container"}  />
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
                // end dialog - slidingwohazard
                

                // begin dialog - woConfirmLabTimeOnSchedule
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `woConfirmLabTimeOnSchedule`,
  configuration:   {
    id: `woConfirmLabTimeOnSchedule`,
    dialogRenderer: ((props => {
    return (
      <DialogWoConfirmLabTimeOnSchedule id={"woConfirmLabTimeOnSchedule_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - woConfirmLabTimeOnSchedule
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'quickreport' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'quickreport', clearStack: true, parent: app, route: '/quickreport/*', title: app.getLocalizedLabel("quickreport_title", "New work order (via Quick Reporting)"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new QuickReportController();
                bootstrapInspector.onNewController(controller, 'QuickReportController', page);
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
      

      // setup the 'createworkorder' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'createworkorder', clearStack: true, parent: app, route: '/createworkorder/*', title: app.getLocalizedLabel("createworkorder_title", "create work order"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new CreateWorkOrderController();
                bootstrapInspector.onNewController(controller, 'CreateWorkOrderController', page);
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
      

      // setup the 'tasks' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'tasks', clearStack: false, parent: app, route: '/tasks/*', title: app.getLocalizedLabel("tasks_title", "tasks"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new TaskController();
                bootstrapInspector.onNewController(controller, 'TaskController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - taskstatusDomainList
                {
                  let options = {
  name: `taskstatusDomainList`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `statusItems`,
  schemaExt:   [
    {
      name: `value`,
      id: `xvwp_`
    },
    {
      name: `description`,
      id: `bparw`
    },
    {
      name: `maxvalue`,
      id: `q5n8w`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `value`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `value,description,maxvalue`,
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
                // end datasource - taskstatusDomainList

                
          
                // begin dialog - planTaskLongDesc
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `planTaskLongDesc`,
  configuration:   {
    id: `planTaskLongDesc`,
    dialogRenderer: ((props => {
    return (
      <DialogPlanTaskLongDesc id={"planTaskLongDesc_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - planTaskLongDesc
                

                // begin dialog - taskStatusChangeDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `taskStatusChangeDialog`,
  configuration:   {
    id: `taskStatusChangeDialog`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerTaskStatusChangeDialog slidingDrawerProps={props} id={"taskStatusChangeDialog_slidingdrawer_container"}  />
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
                  let controller = new ChangeStatusController();
          bootstrapInspector.onNewController(controller, 'ChangeStatusController', dialog);
        dialog.registerController(controller);
                  page.registerDialog(dialog);
                }
                // end dialog - taskStatusChangeDialog
                

                // begin dialog - meterReadingLookupNew
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `meterReadingLookupNew`,
  configuration:   {
    id: `meterReadingLookupNew`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupMeterReadingLookupNew {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupMeterReadingLookupNew {...props} />
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
                // end dialog - meterReadingLookupNew
                

                // begin dialog - taskMeterChangeDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `taskMeterChangeDialog`,
  configuration:   {
    id: `taskMeterChangeDialog`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerTaskMeterChangeDialog slidingDrawerProps={props} id={"taskMeterChangeDialog_slidingdrawer_container"}  />
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
                    
                    
                // begin datasource - woPlanTaskDetaildsSelected
                {
                  let options = {
  name: `woPlanTaskDetaildsSelected`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `bvm52`
    },
    {
      name: `taskid`,
      'sub-type': `ALN`,
      id: `zbjxe`
    },
    {
      name: `description`,
      id: `k5g7y`
    },
    {
      name: `description_longdescription`,
      id: `g3xyj`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `zbk45`
    },
    {
      name: `status_description`,
      id: `g5e6m`
    },
    {
      name: `status_maxvalue`,
      id: `w2p8p`
    },
    {
      name: `inspectionform.name--inspname`,
      id: `neaea`
    },
    {
      name: `rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href,status,status_maxvalue,status_description--statusdesc}`,
      id: `d3g6q`
    },
    {
      name: `doclinks{*}`,
      id: `q3g8n`
    },
    {
      name: `predessorwos`,
      id: `d3kmw`
    },
    {
      name: `woclassbywogroup.flowcontrolled--woflowcontrolled`,
      id: `pe7y9`
    },
    {
      name: `computedTaskStatus`,
      'computed-function': `computedTaskStatus`,
      id: `y_rwz`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedBorderDisplay`,
      'computed-function': `computedBorderDisplay`,
      id: `a7br4`,
      computed: (true),
      local: (true)
    },
    {
      name: `hideLockIcon`,
      'computed-function': `hideLockIcon`,
      title: (app.getLocalizedLabel("bpjen_title", "hideLockIcon")),
      remarks: (app.getLocalizedLabel("bpjen_remarks", "hideLockIcon")),
      id: `bpjen`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `y597m`
    },
    {
      name: `pointnum`,
      id: `d9p42`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `gyxjx`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `ygr35`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `e3qr5`
    },
    {
      name: `asset.description--assetdescription`,
      id: `ynm_3`
    },
    {
      name: `measuredate`,
      id: `gm54p`
    },
    {
      name: `measurementvalue`,
      id: `p_9wn`
    },
    {
      name: `inspector`,
      id: `amrba`
    },
    {
      name: `wonum`,
      id: `y9yd5`
    },
    {
      name: `observation`,
      id: `xdyeg`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `qx88x`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `w_pvz`
    },
    {
      name: `measurepoint.description`,
      id: `k_xzk`
    },
    {
      name: `measurepoint.assetnum`,
      id: `zm2rd`
    },
    {
      name: `measurepoint.asset.description`,
      id: `dar5m`
    },
    {
      name: `measurepoint.meter.description`,
      id: `mbyne`
    },
    {
      name: `measurepoint.meter.metertype`,
      id: `bygpj`
    },
    {
      name: `measurepoint.meter.domainid`,
      id: `n8q6k`
    },
    {
      name: `measurepoint.meter.measureunit.description--unitdescription`,
      id: `jm24y`
    },
    {
      name: `location.description--locationdesc`,
      id: `ekg2x`
    },
    {
      name: `computedPredecessorString`,
      'computed-function': `computedPredecessorString`,
      title: (app.getLocalizedLabel("da78q_title", "computedPredecessorString")),
      remarks: (app.getLocalizedLabel("da78q_remarks", "computedPredecessorString")),
      id: `da78q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedParentAssetLocation`,
      'computed-function': `computedParentAssetLocation`,
      id: `kjxmb`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurDate`,
      'sub-type': `DATE`,
      'computed-function': `computedMeterCurDate`,
      id: `vym3j`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurTime`,
      'sub-type': `TIME`,
      'computed-function': `computedMeterCurTime`,
      id: `m64e6`,
      computed: (true),
      local: (true)
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `workorderid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`status`,
`siteid`,
`orgid`,
`assetnum`,
`location`
    ],
    select: `workorderid,taskid,description,description_longdescription,status,status_description,status_maxvalue,inspectionform.name--inspname,rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href,status,status_maxvalue,status_description--statusdesc},doclinks{*},predessorwos,woclassbywogroup.flowcontrolled--woflowcontrolled,siteid,pointnum,orgid,assetnum,location,asset.description--assetdescription,measuredate,measurementvalue,inspector,wonum,observation,activeassetmeter._dbcount--assetmetercount,activelocationmeter._dbcount--locationmetercount,measurepoint.description,measurepoint.assetnum,measurepoint.asset.description,measurepoint.meter.description,measurepoint.meter.metertype,measurepoint.meter.domainid,measurepoint.meter.measureunit.description--unitdescription,location.description--locationdesc`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `single`,
  computedFields:   {
    computedTaskStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTaskStatus', item))
    },
    computedBorderDisplay:     {
      computedFunction: ((item, datasource) => datasource.callController('computedBorderDisplay', item))
    },
    hideLockIcon:     {
      computedFunction: ((item, datasource) => datasource.callController('hideLockIcon', item))
    },
    computedPredecessorString:     {
      computedFunction: ((item, datasource) => datasource.callController('computedPredecessorString', item))
    },
    computedParentAssetLocation:     {
      computedFunction: ((item, datasource) => datasource.callController('computedParentAssetLocation', item))
    },
    computedMeterCurDate:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurDate', item))
    },
    computedMeterCurTime:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurTime', item))
    }
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
                  
                  if (!dialog.hasDatasource(ds)) {
                    dialog.registerDatasource(ds);
                  }
                }
                // end datasource - woPlanTaskDetaildsSelected

                
                  });
                  let controller = new TaskMeterController();
          bootstrapInspector.onNewController(controller, 'TaskMeterController', dialog);
        dialog.registerController(controller);
                  page.registerDialog(dialog);
                }
                // end dialog - taskMeterChangeDialog
                

                // begin dialog - taskMeterReadingDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `taskMeterReadingDrawer`,
  configuration:   {
    id: `taskMeterReadingDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerTaskMeterReadingDrawer slidingDrawerProps={props} id={"taskMeterReadingDrawer_slidingdrawer_container"}  />
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
                // end dialog - taskMeterReadingDrawer
                

                // begin dialog - update_taskMeterReading_drawer_detail
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `update_taskMeterReading_drawer_detail`,
  configuration:   {
    id: `update_taskMeterReading_drawer_detail`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerUpdate_taskMeterReading_drawer_detail slidingDrawerProps={props} id={"update_taskMeterReading_drawer_detail_slidingdrawer_container"}  />
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
                // end dialog - update_taskMeterReading_drawer_detail
                

                // begin dialog - taskMeterReadingLookupDetail
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `taskMeterReadingLookupDetail`,
  configuration:   {
    id: `taskMeterReadingLookupDetail`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupTaskMeterReadingLookupDetail {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupTaskMeterReadingLookupDetail {...props} />
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
                // end dialog - taskMeterReadingLookupDetail
                

                // begin dialog - saveDiscardTaskMeter
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardTaskMeter`,
  configuration:   {
    id: `saveDiscardTaskMeter`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardTaskMeter id={"saveDiscardTaskMeter_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardTaskMeter
                

                // begin dialog - saveDiscardTaskAssetLocMeter
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardTaskAssetLocMeter`,
  configuration:   {
    id: `saveDiscardTaskAssetLocMeter`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardTaskAssetLocMeter id={"saveDiscardTaskAssetLocMeter_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardTaskAssetLocMeter
                

                // begin dialog - taskRollOverDialogDetail
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `taskRollOverDialogDetail`,
  configuration:   {
    id: `taskRollOverDialogDetail`,
    dialogRenderer: ((props => {
    return (
      <DialogTaskRollOverDialogDetail id={"taskRollOverDialogDetail_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - taskRollOverDialogDetail
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'materials' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'materials', clearStack: true, parent: app, route: '/materials/*', title: app.getLocalizedLabel("materials_title", "Materials & Tools"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"selectedDS":"todaywoassignedDS","hideMaterial":false,"hideTool":false,"hideToolMaterial":true}, 'page'), {});

        
              {
                let controller = new MaterialsPageController();
                bootstrapInspector.onNewController(controller, 'MaterialsPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - jtoolsds
                {
                  let options = {
  name: `jtoolsds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `wptool`,
  schema: `schema`,
  schemaExt:   [
    {
      name: `itemnum`,
      id: `dgy62`
    },
    {
      name: `description`,
      id: `y2wmq`
    },
    {
      name: `itemqty`,
      id: `e8xk5`
    },
    {
      name: `location`,
      id: `qz7dd`
    },
    {
      name: `locationDesc`,
      id: `qzdwy`
    },
    {
      name: `wonumDesc`,
      id: `z8_nm`
    },
    {
      name: `locHours`,
      id: `vpgxp`
    },
    {
      name: `itemnumDesc`,
      id: `n9r2v`
    },
    {
      name: `wpitemid`,
      id: `grz5a`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `wpitemid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `itemnum,description,itemqty,location,locationDesc,wonumDesc,locHours,itemnumDesc,wpitemid`,
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
                // end datasource - jtoolsds

                

                // begin datasource - jmaterialsds
                {
                  let options = {
  name: `jmaterialsds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `wpmaterial`,
  schema: `schema`,
  schemaExt:   [
    {
      name: `itemnum`,
      id: `aaj7a`
    },
    {
      name: `description`,
      id: `r7znb`
    },
    {
      name: `itemqty`,
      id: `a6v9p`
    },
    {
      name: `locationDesc`,
      id: `a4mwg`
    },
    {
      name: `location`,
      id: `r93xk`
    },
    {
      name: `wonumDesc`,
      id: `vrn6k`
    },
    {
      name: `itemnumDesc`,
      id: `wjp2j`
    },
    {
      name: `wpitemid`,
      id: `my7w6`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `wpitemid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `itemnum,description,itemqty,locationDesc,location,wonumDesc,itemnumDesc,wpitemid`,
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
                // end datasource - jmaterialsds

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'workOrderDetails' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'workOrderDetails', clearStack: false, parent: app, route: '/workOrderDetails/*', title: app.getLocalizedLabel("workOrderDetails_title", "Work order"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"assetMeterData":null,"locationMeterData":null,"assetMeterHeader":"","locationMeterHeader":"","assetLocation":true}, 'page'), {});

        
              {
                let controller = new WorkOrderDetailsController();
                bootstrapInspector.onNewController(controller, 'WorkOrderDetailsController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - woDetailResource
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woDetailResource`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    cacheExpiryMs: 1,
    where: (`wonum="${page.params.wonum}" and siteid="${page.params.siteid}"`),
    default: true,
    itemUrl: (page.params.href),
    objectStructure: `mxapiwodetail`,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woDetailResource`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    select: `autolocate,workorderid,wonum,title,description,description_longdescription,problemcode,failurecode,status,status_description,statusdate,date,duration,type,number,assetlocpriority,wopriority,assetnum,location.description--locationdesc,location.location--locationnum,location.PLUSCLOOP--PLUSCLOOP,worktype,parent,estdur,workorderid,serviceaddress.streetaddress,serviceaddress.addressline2,serviceaddress.addressline3,serviceaddress.city,serviceaddress.regiondistrict,serviceaddress.stateprovince,serviceaddress.postalcode,serviceaddress.country,serviceaddress.formattedaddress--formattedaddress,serviceaddress.latitudey,serviceaddress.longitudex,schedstart,schedfinish,pluscnextdate,pluscphyloc,pluscphyloc_LONGDESCRIPTION,pluscoverduedate,labtrans,uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid},uxshowactualtool._dbcount--actualtoolcount,wpmaterial{wpitemid},wptool{wpitemid, itemnum},reportdate,phone,reportedby,reportedbyperson.displayname,reportedbyperson.primaryphone,siteid,asset.description--assetdesc,asset.assetnum--assetnumber,asset.assettype--assettype,asset.manufacturer--company,asset.isrunning--assetisrunning,asset.ISCALIBRATION--ISCALIBRATION,asset.pluscphyloc_LONGDESCRIPTION--pluscphyloc_LONGDESCRIPTION,activeassetmeter._dbcount--assetmetercount,activelocationmeter._dbcount--locationmetercount,doclinks._dbcount--doclinkscount,pluscwods._dbcount--pluscwodscount,maxvar.starttimerinprg,maxvar.confirmlabtrans,maxvar.pluscvaltool,maxvar.pluscqualtech ,rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href},np_statusmemo,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid},relatedwo._dbcount--relatedwocount,relatedwo,relatedticket._dbcount--relatedticketcount,relatedticket,owner,actstart,targstartdate,failure.description--failuredesc,failure,classstructure.hierarchypath,rel.workorderspec{workorderspecid,assetattrid,measureunitid,datevalue,numvalue,alnvalue,assetattribute.description--assetattributedesc,displaysequence},maxvar.coordinate,orgid,woclass,rel.moddowntimehist{*},maxvar.downprompt,onbehalfof,assetuid,istask,wogroup,taskid,flowcontrolled,woactivity{taskid,status},anywhererefid,rel.asset.mxapiasset{assetnum,description,plusacatid,islinear,lrm,direction,startmeasure,endmeasure},location.location--locationnum,location.description--locationdesc,rel.wohazard{wohazardid},splanreviewdate,rel.linearrelated{rel.asset.mxapiasset{assetid,assetnum,description,endmeasure,startmeasure},multiid,endzoffset,startzoffset,endyoffset,startyoffset,endmeasure,startmeasure,endoffset,startoffset,endfeaturelabel,startfeaturelabel,endAssetFeatureId,startAssetFeatureId,startyoffsetref,endyoffsetref,startzoffsetref,endzoffsetref},wohazard._dbcount--wohazardcount,wohazard`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `autolocate`,
      id: `yn258`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `p6d4b`
    },
    {
      name: `wonum`,
      id: `q9qmr`
    },
    {
      name: `title`,
      id: `gmp_2`
    },
    {
      name: `description`,
      id: `kq9yq`
    },
    {
      name: `description_longdescription`,
      id: `m75qa`
    },
    {
      name: `problemcode`,
      id: `kn86y`
    },
    {
      name: `failurecode`,
      id: `ka5d_`
    },
    {
      name: `status`,
      id: `g35x5`
    },
    {
      name: `status_description`,
      id: `a33d_`
    },
    {
      name: `statusdate`,
      id: `gjnk4`
    },
    {
      name: `date`,
      id: `b4226`
    },
    {
      name: `duration`,
      id: `awq9y`
    },
    {
      name: `type`,
      id: `rk8_4`
    },
    {
      name: `number`,
      id: `k69_8`
    },
    {
      name: `assetlocpriority`,
      id: `p657z`
    },
    {
      name: `wopriority`,
      id: `ze_za`
    },
    {
      name: `assetnum`,
      id: `xzaqk`
    },
    {
      name: `location.description--locationdesc`,
      id: `bbj92`
    },
    {
      name: `location.location--locationnum`,
      id: `wak89`
    },
    {
      name: `location.PLUSCLOOP--PLUSCLOOP`,
      id: `yvxdx`
    },
    {
      name: `worktype`,
      id: `p_e6n`
    },
    {
      name: `parent`,
      sortable: `false`,
      id: `d5gyx`
    },
    {
      name: `estdur`,
      id: `wvee9`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `p5dwp`
    },
    {
      name: `serviceaddress.streetaddress`,
      id: `rbenx`
    },
    {
      name: `serviceaddress.addressline2`,
      id: `nrdbd`
    },
    {
      name: `serviceaddress.addressline3`,
      id: `jk4rb`
    },
    {
      name: `serviceaddress.city`,
      id: `wgkwq`
    },
    {
      name: `serviceaddress.regiondistrict`,
      id: `dppqa`
    },
    {
      name: `serviceaddress.stateprovince`,
      id: `vm724`
    },
    {
      name: `serviceaddress.postalcode`,
      id: `z9266`
    },
    {
      name: `serviceaddress.country`,
      id: `jp23y`
    },
    {
      name: `serviceaddress.formattedaddress--formattedaddress`,
      id: `qrpjw`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `je2n4`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `jwr58`
    },
    {
      name: `schedstart`,
      id: `g8bj5`
    },
    {
      name: `schedfinish`,
      id: `ybp_9`
    },
    {
      name: `pluscnextdate`,
      id: `vnmx5`
    },
    {
      name: `pluscphyloc`,
      id: `j3xk_`
    },
    {
      name: `pluscphyloc_LONGDESCRIPTION`,
      id: `zvmpk`
    },
    {
      name: `pluscoverduedate`,
      id: `v_ek5`
    },
    {
      name: `labtrans`,
      id: `r3g6x`
    },
    {
      name: `uxshowactuallabor{startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid}`,
      id: `a2j3r`
    },
    {
      name: `uxshowactualtool._dbcount--actualtoolcount`,
      id: `yzvk8`
    },
    {
      name: `wpmaterial{wpitemid}`,
      id: `b7q9j`
    },
    {
      name: `wptool{wpitemid, itemnum}`,
      id: `y4ydy`
    },
    {
      name: `computedDisableButton`,
      'computed-function': `computedDisableButton`,
      id: `a5ame`,
      computed: (true),
      local: (true)
    },
    {
      name: `reportdate`,
      id: `xavzp`
    },
    {
      name: `phone`,
      sortable: `false`,
      id: `ae76_`
    },
    {
      name: `reportedby`,
      id: `q59bm`
    },
    {
      name: `reportedbyperson.displayname`,
      id: `j4nm5`
    },
    {
      name: `reportedbyperson.primaryphone`,
      id: `g3xxa`
    },
    {
      name: `siteid`,
      id: `qvk79`
    },
    {
      name: `asset.description--assetdesc`,
      id: `p2r49`
    },
    {
      name: `asset.assetnum--assetnumber`,
      id: `jvmw9`
    },
    {
      name: `asset.assettype--assettype`,
      id: `v6yaw`
    },
    {
      name: `asset.manufacturer--company`,
      id: `rvwvm`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      id: `r3xq5`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      id: `be69x`
    },
    {
      name: `asset.pluscphyloc_LONGDESCRIPTION--pluscphyloc_LONGDESCRIPTION`,
      id: `yy63m`
    },
    {
      name: `activeassetmeter._dbcount--assetmetercount`,
      id: `xj6vv`
    },
    {
      name: `activelocationmeter._dbcount--locationmetercount`,
      id: `e5w95`
    },
    {
      name: `computedDisableMeter`,
      'computed-function': `computedDisableMeter`,
      id: `an4mg`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedWorkType`,
      'computed-function': `computedWorkType`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("mabr__title", "Work Order")),
      remarks: (app.getLocalizedLabel("mabr__remarks", "Groups worktype with wonum.")),
      id: `mabr_`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedWOTimerStatus`,
      'computed-function': `computedWOTimerStatus`,
      id: `yrbxw`,
      computed: (true),
      local: (true)
    },
    {
      name: `doclinks._dbcount--doclinkscount`,
      id: `eb8_v`
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `q83d7`
    },
    {
      name: `maxvar.starttimerinprg`,
      id: `en2mb`
    },
    {
      name: `maxvar.confirmlabtrans`,
      id: `rv5pg`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `de467`
    },
    {
      name: `maxvar.pluscqualtech `,
      id: `g76a3`
    },
    {
      name: `rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href}`,
      id: `vap4b`
    },
    {
      name: `np_statusmemo`,
      id: `nvxv5`
    },
    {
      name: `computedWODtlStatusPriority`,
      'computed-function': `computedWODtlStatusPriority`,
      id: `bzb4d`,
      computed: (true),
      local: (true)
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `r5ayn`
    },
    {
      name: `computedWorkTypeButton`,
      'computed-function': `computedWorkTypeButton`,
      id: `dzvj5`,
      computed: (true),
      local: (true)
    },
    {
      name: `relatedwo._dbcount--relatedwocount`,
      id: `vgz4w`
    },
    {
      name: `relatedwo`,
      id: `xwana`
    },
    {
      name: `relatedticket._dbcount--relatedticketcount`,
      id: `znzd7`
    },
    {
      name: `relatedticket`,
      id: `xz3xe`
    },
    {
      name: `owner`,
      id: `n7n29`
    },
    {
      name: `actstart`,
      id: `epykq`
    },
    {
      name: `targstartdate`,
      id: `xd2pe`
    },
    {
      name: `failure.description--failuredesc`,
      id: `p9k93`
    },
    {
      name: `failure`,
      id: `ewkz_`
    },
    {
      name: `classstructure.hierarchypath`,
      id: `rzz58`
    },
    {
      name: `rel.workorderspec{workorderspecid,assetattrid,measureunitid,datevalue,numvalue,alnvalue,assetattribute.description--assetattributedesc,displaysequence}`,
      id: `zrkm9`
    },
    {
      name: `maxvar.coordinate`,
      id: `x8x84`
    },
    {
      name: `orgid`,
      id: `ma383`
    },
    {
      name: `woclass`,
      id: `wg2mn`
    },
    {
      name: `rel.moddowntimehist{*}`,
      id: `wrbxe`
    },
    {
      name: `maxvar.downprompt`,
      id: `bw2k4`
    },
    {
      name: `onbehalfof`,
      id: `v752d`
    },
    {
      name: `assetuid`,
      id: `dpz5q`
    },
    {
      name: `istask`,
      id: `y27jd`
    },
    {
      name: `wogroup`,
      id: `ek3yq`
    },
    {
      name: `taskid`,
      id: `rj394`
    },
    {
      name: `flowcontrolled`,
      id: `m57va`
    },
    {
      name: `woactivity{taskid,status}`,
      id: `a226d`
    },
    {
      name: `anywhererefid`,
      id: `ya4g8`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,plusacatid,islinear,lrm,direction,startmeasure,endmeasure}`,
      id: `kpn4_`
    },
    {
      name: `location.location--locationnum`,
      id: `jmpan`
    },
    {
      name: `location.description--locationdesc`,
      id: `d348z`
    },
    {
      name: `rel.wohazard{wohazardid}`,
      id: `q3gp3`
    },
    {
      name: `splanreviewdate`,
      id: `edz8j`
    },
    {
      name: `rel.linearrelated{rel.asset.mxapiasset{assetid,assetnum,description,endmeasure,startmeasure},multiid,endzoffset,startzoffset,endyoffset,startyoffset,endmeasure,startmeasure,endoffset,startoffset,endfeaturelabel,startfeaturelabel,endAssetFeatureId,startAssetFeatureId,startyoffsetref,endyoffsetref,startzoffsetref,endzoffsetref}`,
      id: `r_a67`
    },
    {
      name: `wohazard._dbcount--wohazardcount`,
      id: `zk6xx`
    },
    {
      name: `wohazard`,
      id: `vb8vd`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    computedDisableButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableButton', item))
    },
    computedDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedDisableMeter', item))
    },
    computedWorkType:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkType', item))
    },
    computedWOTimerStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWOTimerStatus', item))
    },
    computedWODtlStatusPriority:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWODtlStatusPriority', item))
    },
    computedWorkTypeButton:     {
      computedFunction: ((item, datasource) => datasource.callController('computedWorkTypeButton', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  clearSelectionOnSearch: true,
  watch:   [
    {
      name: `where`,
      lastValue: (`wonum="${page.params.wonum}" and siteid="${page.params.siteid}"`),
      check: (()=>{return `wonum="${page.params.wonum}" and siteid="${page.params.siteid}"`})
    },
    {
      name: `itemUrl`,
      lastValue: (page.params.href),
      check: (()=>{return page.params.href})
    }
  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [
    {
      'app-id': `inspection`,
      'datasource-id': `assignedworktolist`,
      'min-interval': -1,
      trigger: `woDetailResource`
    },
    {
      'app-id': `inspection`,
      'datasource-id': `assignedworktolist`,
      'min-interval': -1,
      trigger: `woMultiAssetLocationds`
    }
  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new WorkOrderDataController();
bootstrapInspector.onNewController(controller, 'WorkOrderDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woDetailResource

                

                // begin datasource - woSpecification
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woSpecification`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    orderBy: `displaysequence`,
    idAttribute: `workorderspecid`,
    relationship: `workorderspec`,
    selectionMode: `none`,
    dependsOn: `woDetailResource`,
    notifyWhenParentLoads: true,
    cacheExpiryMs: 1,
    select: `workorderspecid,assetattrid,measureunitid,numvalue,alnvalue,datevalue,assetattribute.description--assetattributedesc,displaysequence`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderspecid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderspecid`,
      'unique-id': `true`,
      id: `prr8j`
    },
    {
      name: `assetattrid`,
      id: `y424j`
    },
    {
      name: `measureunitid`,
      id: `qbw59`
    },
    {
      name: `numvalue`,
      scale: `2`,
      id: `wj68z`
    },
    {
      name: `alnvalue`,
      id: `n7v5d`
    },
    {
      name: `datevalue`,
      id: `ykr2x`
    },
    {
      name: `assetattribute.description--assetattributedesc`,
      id: `a4885`
    },
    {
      name: `displaysequence`,
      id: `mmg76`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - woSpecification

                

                // begin datasource - woDetailsWorklogDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woDetailsWorklogDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 200,
  query:   {
    pageSize: 200,
    relationship: `woworklog`,
    objectName: `worklog`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    cacheExpiryMs: 1,
    select: `createdate,description,description_longdescription,person.displayname--createby,logtype,anywhererefid,clientviewable`,
    dependsOn: `woDetailResource`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `anywhererefid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `createdate`,
      id: `n9_y9`
    },
    {
      name: `description`,
      id: `pb2gg`
    },
    {
      name: `description_longdescription`,
      id: `qjb5w`
    },
    {
      name: `person.displayname--createby`,
      id: `e3np9`
    },
    {
      name: `logtype`,
      id: `d7amj`
    },
    {
      name: `anywhererefid`,
      'unique-id': `true`,
      id: `xge76`
    },
    {
      name: `clientviewable`,
      id: `adx3r`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - woDetailsWorklogDs

                

                // begin datasource - woAssetLocationds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woAssetLocationds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `asset`,
    dependsOn: `woDetailResource`,
    cacheExpiryMs: 1,
    childFilters:     [
      {
        "asset.wobyasset.limit": `3`,
        "asset.wobyasset.orderBy": `-statusdate`,
        "asset.wobyasset.where": `status in ["COMP","CLOSE"]`
      }
    ],
    select: `assetnum,description,islinear,isrunning,lrm,direction,manufacturer,purchaseprice,_imagelibref,rel.wobyasset{wonum,description,status,status_maxvalue,statusdate,worktype,siteid}`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `assetnum`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `assetnum`,
      'unique-id': `true`,
      id: `jxzdm`
    },
    {
      name: `description`,
      id: `pbpbp`
    },
    {
      name: `islinear`,
      id: `r8p99`
    },
    {
      name: `isrunning`,
      id: `b8ne6`
    },
    {
      name: `lrm`,
      id: `jxrq8`
    },
    {
      name: `direction`,
      id: `bxm8m`
    },
    {
      name: `manufacturer`,
      id: `e2xwp`
    },
    {
      name: `purchaseprice`,
      'sub-type': `BIGINT`,
      id: `vj3y7`
    },
    {
      name: `_imagelibref`,
      id: `jr54e`
    },
    {
      name: `rel.wobyasset{wonum,description,status,status_maxvalue,statusdate,worktype,siteid}`,
      id: `w74bm`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woAssetLocationds

                

                // begin datasource - woLocationds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woLocationds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wo_location`,
    dependsOn: `woDetailResource`,
    cacheExpiryMs: 1,
    childFilters:     [
      {
        "locations.wobylocation.limit": `6`,
        "locations.wobylocation.orderBy": `-statusdate`,
        "locations.wobylocation.where": `status in ["COMP","CLOSE"]`
      }
    ],
    select: `location,description,rel.wobylocation{wonum,description,status,status_maxvalue,statusdate,worktype,siteid}`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `location`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `location`,
      'unique-id': `true`,
      id: `zp6n8`
    },
    {
      name: `description`,
      id: `exe4v`
    },
    {
      name: `rel.wobylocation{wonum,description,status,status_maxvalue,statusdate,worktype,siteid}`,
      id: `n7d8n`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woLocationds

                

                // begin datasource - woDetailsMaterialds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woDetailsMaterialds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `showplanmaterial`,
    dependsOn: `woDetailResource`,
    selectionMode: `none`,
    select: `description,itemnum,itemqty,materiallocation.description--locationdesc,wpitemid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `wpitemid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      id: `d33xn`
    },
    {
      name: `itemnum`,
      id: `dvyae`
    },
    {
      name: `itemqty`,
      id: `vqj4k`
    },
    {
      name: `computedItemNum`,
      'computed-function': `computedItemNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("k3gvx_title", "Item")),
      remarks: (app.getLocalizedLabel("k3gvx_remarks", "Identifies the item.")),
      id: `k3gvx`,
      computed: (true),
      local: (true)
    },
    {
      name: `materiallocation.description--locationdesc`,
      id: `x2gpr`
    },
    {
      name: `wpitemid`,
      'unique-id': `true`,
      id: `p3mr8`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {
    computedItemNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedItemNum', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new WorkOrderDataController();
bootstrapInspector.onNewController(controller, 'WorkOrderDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woDetailsMaterialds

                

                // begin datasource - woDetailsToolds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woDetailsToolds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `showplantool`,
    dependsOn: `woDetailResource`,
    selectionMode: `none`,
    cacheExpiryMs: 1,
    select: `itemnum,description,storelocsite,location.location--locationnum,location.description--locationdesc,itemqty,wpitemid,hours`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `itemnum`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      'unique-id': `true`,
      id: `pdjgp`
    },
    {
      name: `description`,
      id: `n4b6q`
    },
    {
      name: `storelocsite`,
      id: `z6nbk`
    },
    {
      name: `location.location--locationnum`,
      id: `jke74`
    },
    {
      name: `location.description--locationdesc`,
      id: `eqgj6`
    },
    {
      name: `itemqty`,
      id: `jx6db`
    },
    {
      name: `wpitemid`,
      id: `z9mmx`
    },
    {
      name: `hours`,
      id: `p7w32`
    },
    {
      name: `computedItemNum`,
      'computed-function': `computedItemNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("jb3p5_title", "Tool")),
      remarks: (app.getLocalizedLabel("jb3p5_remarks", "Identifies the tool.")),
      id: `jb3p5`,
      computed: (true),
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {
    computedItemNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedItemNum', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new WorkOrderDataController();
bootstrapInspector.onNewController(controller, 'WorkOrderDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woDetailsToolds

                

                // begin datasource - woLaborDetailds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woLaborDetailds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `labtransid`,
    relationship: `uxshowactuallabor`,
    cacheExpiryMs: 1,
    select: `startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,timerstatus,laborcode,anywhererefid`,
    dependsOn: `woDetailResource`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `labtransid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `startdate`,
      id: `r8d2a`
    },
    {
      name: `starttime`,
      id: `jgzbq`
    },
    {
      name: `startdatetime`,
      id: `x4b7z`
    },
    {
      name: `finishdate`,
      id: `z9rnn`
    },
    {
      name: `finishtime`,
      id: `bdrb7`
    },
    {
      name: `finishdatetime`,
      id: `g6n39`
    },
    {
      name: `regularhrs`,
      id: `kz9nd`
    },
    {
      name: `transtype`,
      id: `nrvpx`
    },
    {
      name: `labtransid`,
      'unique-id': `true`,
      id: `ra5k7`
    },
    {
      name: `timerstatus`,
      id: `pr996`
    },
    {
      name: `laborcode`,
      id: `j8bkv`
    },
    {
      name: `anywhererefid`,
      id: `bxyxv`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - woLaborDetailds

                

                // begin datasource - woServiceAddress
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woServiceAddress`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `woserviceaddressid`,
    relationship: `serviceaddress`,
    cacheExpiryMs: 1,
    select: `woserviceaddressid,latitudey,longitudex,anywhererefid,maxvar.coordinate`,
    dependsOn: `woDetailResource`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `woserviceaddressid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `woserviceaddressid`,
      'unique-id': `true`,
      id: `q_p8z`
    },
    {
      name: `latitudey`,
      id: `awem6`
    },
    {
      name: `longitudex`,
      id: `y_67d`
    },
    {
      name: `anywhererefid`,
      id: `wk2z2`
    },
    {
      name: `maxvar.coordinate`,
      id: `pwp8g`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  expiryTime: 1,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - woServiceAddress

                

                // begin datasource - woMultiAssetLocationds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woMultiAssetLocationds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `multiid`,
    relationship: `multiassetlocci`,
    orderBy: `sequence`,
    selectionMode: `none`,
    dependsOn: `woDetailResource`,
    childFilters:     [
      {
        "multiassetlocci.activeassetmeter.orderBy": `+sequence`
      }
    ],
    searchAttributes:     [
`assetnum`
    ],
    indexAttributes:     [
`assetnum`
    ],
    select: `multiid,assetnum,asset.description--assetdescription,location,location.location--location,location.description--locationdesc,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,progress,isprimary,siteid,sequence,rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href},activeassetmeter._dbcount--multiassetmetercount,activelocationmeter._dbcount--multilocationmetercount,rel.activeassetmeter.mxapiassetmeter{metername,lastreading,measureunitid,lastreadingdate,assetnum,active,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,siteid,sequence,newreading,rollover,newreadingFlag,anywhererefid,meter.measureunit.description--unitdescription},rel.activelocationmeter.mxapilocationmeter{metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,domainid,href,index,locationmeterid,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence,anywhererefid,meter.measureunit.description--unitdescription},rel.asset.mxapiasset{assetid,assetnum,description,autolocate},ci.cinum,ci.ciid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `multiid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `multiid`,
      'unique-id': `true`,
      id: `jbg87`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `ezwjb`
    },
    {
      name: `asset.description--assetdescription`,
      id: `r39aj`
    },
    {
      name: `location`,
      id: `xmwzn`
    },
    {
      name: `location.location--location`,
      id: `q8zrk`
    },
    {
      name: `location.description--locationdesc`,
      id: `vnkq_`
    },
    {
      name: `location.autolocate--locationautolocate`,
      id: `gzzdr`
    },
    {
      name: `location.locationsid--locationlocationsid`,
      id: `gwav9`
    },
    {
      name: `progress`,
      id: `m45__`
    },
    {
      name: `isprimary`,
      id: `b99dp`
    },
    {
      name: `siteid`,
      id: `z888b`
    },
    {
      name: `sequence`,
      id: `wk42z`
    },
    {
      name: `rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href}`,
      id: `gn5jr`
    },
    {
      name: `computedAssetLoc`,
      'computed-function': `computedAssetLoc`,
      id: `nvxx3`,
      computed: (true),
      local: (true)
    },
    {
      name: `activeassetmeter._dbcount--multiassetmetercount`,
      id: `eg6j3`
    },
    {
      name: `activelocationmeter._dbcount--multilocationmetercount`,
      id: `jymwp`
    },
    {
      name: `computedMultiDisableMeter`,
      'computed-function': `computedMultiDisableMeter`,
      id: `v6nmj`,
      computed: (true),
      local: (true)
    },
    {
      name: `rel.activeassetmeter.mxapiassetmeter{metername,lastreading,measureunitid,lastreadingdate,assetnum,active,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,siteid,sequence,newreading,rollover,newreadingFlag,anywhererefid,meter.measureunit.description--unitdescription}`,
      id: `ba4n9`
    },
    {
      name: `rel.activelocationmeter.mxapilocationmeter{metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,domainid,href,index,locationmeterid,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence,anywhererefid,meter.measureunit.description--unitdescription}`,
      id: `gny9k`
    },
    {
      name: `rel.asset.mxapiasset{assetid,assetnum,description,autolocate}`,
      id: `ewd28`
    },
    {
      name: `computedMeterCurDate`,
      'sub-type': `DATE`,
      'computed-function': `computedMeterCurDate`,
      id: `mx9pp`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurTime`,
      'sub-type': `TIME`,
      'computed-function': `computedMeterCurTime`,
      id: `v5y3q`,
      computed: (true),
      local: (true)
    },
    {
      name: `ci.cinum`,
      id: `zebdw`
    },
    {
      name: `ci.ciid`,
      id: `z_5n7`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {
    computedAssetLoc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedAssetLoc', item))
    },
    computedMultiDisableMeter:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMultiDisableMeter', item))
    },
    computedMeterCurDate:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurDate', item))
    },
    computedMeterCurTime:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurTime', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [
    {
      'app-id': `inspection`,
      'datasource-id': `assignedworktolist`,
      'min-interval': -1,
      trigger: `woMultiAssetLocationds`
    }
  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new WorkOrderDataController();
bootstrapInspector.onNewController(controller, 'WorkOrderDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woMultiAssetLocationds

                

                // begin datasource - mrDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `mrDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    where: `status in ["WAPPR","DRAFT","REJECT"]`,
    relationship: `mr`,
    dependsOn: `woDetailResource`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    idAttribute: `mrnum`,
    searchAttributes:     [
`requireddate`,
`description`,
`status`,
`mrdate`
    ],
    indexAttributes:     [
`requireddate`,
`description`,
`status`,
`mrdate`
    ],
    select: `mrnum,requireddate,description,status,status_description,mrdate,anywhererefid,mrid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `mrnum`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `mrnum`,
      'unique-id': `true`,
      id: `ee6na`
    },
    {
      name: `requireddate`,
      searchable: `true`,
      id: `qn456`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `kvdxe`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `em4xy`
    },
    {
      name: `status_description`,
      id: `yankw`
    },
    {
      name: `mrdate`,
      searchable: `true`,
      id: `jkm45`
    },
    {
      name: `anywhererefid`,
      id: `jy8r6`
    },
    {
      name: `mrid`,
      id: `eq97v`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - mrDS

                

                // begin datasource - mrRequest
                {
                  let options = {
  platform: `maximoMobile`,
  name: `mrRequest`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    where: `status in ["APPR"]`,
    relationship: `mr`,
    selectionMode: `none`,
    idAttribute: `mrnum`,
    objectName: `mr`,
    searchAttributes:     [
`mrnum`,
`status`
    ],
    indexAttributes:     [
`mrnum`,
`status`
    ],
    select: `mrid,mrnum,storeloc,requireddate,status,status_description,rel.mrline{itemnum,description,mrlineid,orderunit,storeloc,locations.description--storeloc_desc,qty,manufacturer,vendor}`,
    dependsOn: `woDetailResource`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `mrnum`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `mrid`,
      id: `djk78`
    },
    {
      name: `mrnum`,
      'unique-id': `true`,
      searchable: `true`,
      id: `jknm8`
    },
    {
      name: `storeloc`,
      id: `jjn23`
    },
    {
      name: `requireddate`,
      id: `jk3nm`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `hjn3k`
    },
    {
      name: `status_description`,
      id: `dj_yu`
    },
    {
      name: `rel.mrline{itemnum,description,mrlineid,orderunit,storeloc,locations.description--storeloc_desc,qty,manufacturer,vendor}`,
      id: `fkn_9`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - mrRequest

                

                // begin datasource - attachmentListWoDetailDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `attachmentListWoDetailDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 250,
  query:   {
    pageSize: 250,
    attachment: true,
    relationship: `doclinks`,
    selectionMode: `none`,
    select: `*`,
    dependsOn: `woDetailResource`,
    dsParentObject: `mxapiwodetail`
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
      id: `jdnb2`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(!page.state.notLoadWoDetailChilds)),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - attachmentListWoDetailDS

                

                // begin datasource - workLogTypeDomain
                {
                  let options = {
  platform: `maximoMobile`,
  name: `workLogTypeDomain`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapisynonymdomain`,
    savedQuery: `MOBILEDOMAIN`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `workLogTypeDomain`,
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
      id: `ypja7`
    },
    {
      name: `maxvalue`,
      searchable: `true`,
      id: `wrany`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `amn2z`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `dv3g6`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `q33e3`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `gqbgm`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `a5jxb`
    },
    {
      name: `defaults`,
      id: `bx64w`
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
  isMaximoMobile: true,
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
                // end datasource - workLogTypeDomain

                

                // begin datasource - downTimeReportAsset
                {
                  let options = {
  name: `downTimeReportAsset`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `downTimeItems`,
  schemaExt:   [
    {
      name: `statuschangedate`,
      id: `axp27`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `statuschangedate`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `statuschangedate`,
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
                // end datasource - downTimeReportAsset

                
          
                // begin dialog - woDetailsDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `woDetailsDialog`,
  configuration:   {
    id: `woDetailsDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogWoDetailsDialog id={"woDetailsDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - woDetailsDialog
                

                // begin dialog - linearDetailsDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `linearDetailsDialog`,
  configuration:   {
    id: `linearDetailsDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogLinearDetailsDialog id={"linearDetailsDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - linearDetailsDialog
                

                // begin dialog - calibrationDetailsDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `calibrationDetailsDialog`,
  configuration:   {
    id: `calibrationDetailsDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogCalibrationDetailsDialog id={"calibrationDetailsDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - calibrationDetailsDialog
                

                // begin dialog - woConfirmLabTime
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `woConfirmLabTime`,
  configuration:   {
    id: `woConfirmLabTime`,
    dialogRenderer: ((props => {
    return (
      <DialogWoConfirmLabTime id={"woConfirmLabTime_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - woConfirmLabTime
                

                // begin dialog - woWorkLogDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `woWorkLogDrawer`,
  configuration:   {
    id: `woWorkLogDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerWoWorkLogDrawer slidingDrawerProps={props} id={"woWorkLogDrawer_slidingdrawer_container"}  />
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
                // end dialog - woWorkLogDrawer
                

                // begin dialog - saveDiscardWorkLogDetail
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardWorkLogDetail`,
  configuration:   {
    id: `saveDiscardWorkLogDetail`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardWorkLogDetail id={"saveDiscardWorkLogDetail_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardWorkLogDetail
                

                // begin dialog - wohazardDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `wohazardDrawer`,
  configuration:   {
    id: `wohazardDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerWohazardDrawer slidingDrawerProps={props} id={"wohazardDrawer_slidingdrawer_container"}  />
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
                // end dialog - wohazardDrawer
                

                // begin dialog - logTypeLookupDetailsPage
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `logTypeLookupDetailsPage`,
  configuration:   {
    id: `logTypeLookupDetailsPage`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupLogTypeLookupDetailsPage {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupLogTypeLookupDetailsPage {...props} />
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
                // end dialog - logTypeLookupDetailsPage
                

                // begin dialog - slidingwodetailsmaterials
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `slidingwodetailsmaterials`,
  configuration:   {
    id: `slidingwodetailsmaterials`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerSlidingwodetailsmaterials slidingDrawerProps={props} id={"slidingwodetailsmaterials_slidingdrawer_container"}  />
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
                // end dialog - slidingwodetailsmaterials
                

                // begin dialog - assetMisMatchDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `assetMisMatchDialog`,
  configuration:   {
    id: `assetMisMatchDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogAssetMisMatchDialog id={"assetMisMatchDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - assetMisMatchDialog
                

                // begin dialog - downTimeCodeLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `downTimeCodeLookup`,
  configuration:   {
    id: `downTimeCodeLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupDownTimeCodeLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupDownTimeCodeLookup {...props} />
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
                // end dialog - downTimeCodeLookup
                

                // begin dialog - assetStatusDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `assetStatusDialog`,
  configuration:   {
    id: `assetStatusDialog`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerAssetStatusDialog slidingDrawerProps={props} id={"assetStatusDialog_slidingdrawer_container"}  />
    );
  })
  ),
    validateOnExit: (()=>(['woDetailResource','downTimeReportAsset'])),
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
                // end dialog - assetStatusDialog
                

                // begin dialog - saveDiscardassetDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardassetDialog`,
  configuration:   {
    id: `saveDiscardassetDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardassetDialog id={"saveDiscardassetDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardassetDialog
                

                // begin dialog - multiMeterReadingDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `multiMeterReadingDrawer`,
  configuration:   {
    id: `multiMeterReadingDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerMultiMeterReadingDrawer slidingDrawerProps={props} id={"multiMeterReadingDrawer_slidingdrawer_container"}  />
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
                // end dialog - multiMeterReadingDrawer
                

                // begin dialog - update_multiMeterReading_drawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `update_multiMeterReading_drawer`,
  configuration:   {
    id: `update_multiMeterReading_drawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerUpdate_multiMeterReading_drawer slidingDrawerProps={props} id={"update_multiMeterReading_drawer_slidingdrawer_container"}  />
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
                // end dialog - update_multiMeterReading_drawer
                

                // begin dialog - multiMeterReadingLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `multiMeterReadingLookup`,
  configuration:   {
    id: `multiMeterReadingLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupMultiMeterReadingLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupMultiMeterReadingLookup {...props} />
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
                // end dialog - multiMeterReadingLookup
                

                // begin dialog - multiMeterrollOverDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `multiMeterrollOverDialog`,
  configuration:   {
    id: `multiMeterrollOverDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogMultiMeterrollOverDialog id={"multiMeterrollOverDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - multiMeterrollOverDialog
                

                // begin dialog - saveDiscardMultiMeterReadingDetailDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardMultiMeterReadingDetailDialog`,
  configuration:   {
    id: `saveDiscardMultiMeterReadingDetailDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardMultiMeterReadingDetailDialog id={"saveDiscardMultiMeterReadingDetailDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardMultiMeterReadingDetailDialog
                

                // begin dialog - meterReadingDrawerDetail
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `meterReadingDrawerDetail`,
  configuration:   {
    id: `meterReadingDrawerDetail`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerMeterReadingDrawerDetail slidingDrawerProps={props} id={"meterReadingDrawerDetail_slidingdrawer_container"}  />
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
                // end dialog - meterReadingDrawerDetail
                

                // begin dialog - update_meterReading_drawer_detail
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `update_meterReading_drawer_detail`,
  configuration:   {
    id: `update_meterReading_drawer_detail`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerUpdate_meterReading_drawer_detail slidingDrawerProps={props} id={"update_meterReading_drawer_detail_slidingdrawer_container"}  />
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
                // end dialog - update_meterReading_drawer_detail
                

                // begin dialog - saveDiscardMeterReadingDetail
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardMeterReadingDetail`,
  configuration:   {
    id: `saveDiscardMeterReadingDetail`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardMeterReadingDetail id={"saveDiscardMeterReadingDetail_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardMeterReadingDetail
                

                // begin dialog - meterReadingLookupDetail
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `meterReadingLookupDetail`,
  configuration:   {
    id: `meterReadingLookupDetail`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupMeterReadingLookupDetail {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupMeterReadingLookupDetail {...props} />
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
                // end dialog - meterReadingLookupDetail
                

                // begin dialog - rollOverDialogDetail
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `rollOverDialogDetail`,
  configuration:   {
    id: `rollOverDialogDetail`,
    dialogRenderer: ((props => {
    return (
      <DialogRollOverDialogDetail id={"rollOverDialogDetail_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - rollOverDialogDetail
                

                // begin dialog - woSpecificationDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `woSpecificationDrawer`,
  configuration:   {
    id: `woSpecificationDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerWoSpecificationDrawer slidingDrawerProps={props} id={"woSpecificationDrawer_slidingdrawer_container"}  />
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
                // end dialog - woSpecificationDrawer
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'materialRequest' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'materialRequest', clearStack: false, parent: app, route: '/materialRequest/*', title: app.getLocalizedLabel("materialRequest_title", "Material request"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"isItemSelected":false,"mrPriority":1,"useConfirmDialog":false,"loadingDel":false,"hasConditionCode":false}, 'page'), {});

        
              {
                let controller = new MaterialRequestPageController();
                bootstrapInspector.onNewController(controller, 'MaterialRequestPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - woMaterialRequestResource
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woMaterialRequestResource`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    itemUrl: (page.params.href),
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woMaterialRequestResource`,
    select: `wonum,description,workorderid,siteid,orgid`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `wonum`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      'unique-id': `true`,
      id: `yz4k2`
    },
    {
      name: `description`,
      id: `brk25`
    },
    {
      name: `workorderid`,
      id: `gb5ed`
    },
    {
      name: `siteid`,
      id: `k5ayd`
    },
    {
      name: `orgid`,
      id: `wpxb7`
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
  isMaximoMobile: true,
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
                // end datasource - woMaterialRequestResource

                

                // begin datasource - mrLineDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `mrLineDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `mr`,
    dependsOn: `woMaterialRequestResource`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    idAttribute: `mrnum`,
    objectName: `mr`,
    searchAttributes:     [
`mrnum`,
`shipto`,
`status`
    ],
    indexAttributes:     [
`mrnum`,
`shipto`,
`status`
    ],
    select: `mrid,mrnum,shipto,droppoint,priority,requireddate,status,status_description,rel.mrline{itemnum,description,mrlineid,orderunit,storeloc,locations.description--storeloc_desc,qty,manufacturer,vendor},anywhererefid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `mrnum`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `mrid`,
      id: `zqn2x`
    },
    {
      name: `mrnum`,
      'unique-id': `true`,
      searchable: `true`,
      id: `n3g78`
    },
    {
      name: `shipto`,
      searchable: `true`,
      id: `pdb87`
    },
    {
      name: `droppoint`,
      id: `n499w`
    },
    {
      name: `priority`,
      id: `z87gz`
    },
    {
      name: `requireddate`,
      id: `y48w4`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `prwx7`
    },
    {
      name: `status_description`,
      id: `m_5mw`
    },
    {
      name: `rel.mrline{itemnum,description,mrlineid,orderunit,storeloc,locations.description--storeloc_desc,qty,manufacturer,vendor}`,
      id: `nm_k6`
    },
    {
      name: `anywhererefid`,
      id: `r_7gg`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woMaterialRequestResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - mrLineDS

                

                // begin datasource - mrLineListDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `mrLineListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `mrline`,
    dependsOn: `woMaterialRequestResource`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    searchAttributes:     [
`mrnum`
    ],
    indexAttributes:     [
`mrnum`
    ],
    select: `itemnum,description,mrlineid,orderunit,storeloc,qty,manufacturer,vendor,mrnum`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `mrlineid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      id: `d7amb`
    },
    {
      name: `description`,
      id: `pzw5g`
    },
    {
      name: `mrlineid`,
      'unique-id': `true`,
      id: `baep8`
    },
    {
      name: `orderunit`,
      id: `g__ee`
    },
    {
      name: `storeloc`,
      id: `env4p`
    },
    {
      name: `qty`,
      id: `rpd_y`
    },
    {
      name: `manufacturer`,
      id: `wm597`
    },
    {
      name: `vendor`,
      id: `xb7q7`
    },
    {
      name: `mrnum`,
      searchable: `true`,
      id: `jkkxj`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woMaterialRequestResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - mrLineListDS

                

                // begin datasource - mrLineDsJson
                {
                  let options = {
  name: `mrLineDsJson`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `mrLineItems`,
  schemaExt:   [
    {
      name: `itemnum`,
      id: `nxmpd`
    },
    {
      name: `description`,
      id: `zyj6b`
    },
    {
      name: `mrlineid`,
      searchable: `true`,
      'unique-id': `true`,
      id: `mpk43`
    },
    {
      name: `orderunit`,
      id: `a266r`
    },
    {
      name: `storeloc`,
      id: `y9m85`
    },
    {
      name: `qty`,
      id: `m8aq_`
    },
    {
      name: `manufacturer`,
      id: `br4m7`
    },
    {
      name: `vendor`,
      id: `r46jn`
    },
    {
      name: `storeloc_desc`,
      id: `mrv2x`
    },
    {
      name: `computedItemDescription`,
      id: `mpyg5`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `mrlineid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`mrlineid`
    ],
    select: `itemnum,description,mrlineid,orderunit,storeloc,qty,manufacturer,vendor,storeloc_desc,computedItemDescription`,
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
                // end datasource - mrLineDsJson

                

                // begin datasource - inventoryListDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `inventoryListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIINVENTORY`,
    savedQuery: `SHOWINVENTORY`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `inventoryListDS`,
    searchAttributes:     [
`inventoryid`,
`siteid`,
`itemsetid`,
`itemnum`,
`location`,
`issueunit`,
`orderunit`,
`status`,
`siteid`
    ],
    indexAttributes:     [
`inventoryid`,
`siteid`,
`itemsetid`,
`itemnum`,
`location`,
`issueunit`,
`orderunit`,
`status`,
`siteid`
    ],
    select: `inventoryid,siteid,itemsetid,itemnum,location,issueunit,orderunit,status,siteid`
  },
  objectStructure: `MXAPIINVENTORY`,
  idAttribute: `inventoryid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `inventoryid`,
      searchable: `true`,
      'unique-id': `true`,
      id: `k832n`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `gvxz9`
    },
    {
      name: `itemsetid`,
      searchable: `true`,
      id: `x5bvm`
    },
    {
      name: `itemnum`,
      searchable: `true`,
      id: `wvvae`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `dbwjr`
    },
    {
      name: `issueunit`,
      searchable: `true`,
      id: `avpqb`
    },
    {
      name: `orderunit`,
      searchable: `true`,
      id: `wyvr4`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `qw82j`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `mreq4`
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
  isMaximoMobile: true,
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
                // end datasource - inventoryListDS

                

                // begin datasource - itemListDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `itemListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIITEM`,
    savedQuery: `SHOWITEMS`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `itemListDS`,
    searchAttributes:     [
`description`,
`itemnum`,
`orderunit`
    ],
    indexAttributes:     [
`description`,
`itemnum`,
`itemid`,
`orderunit`,
`status`,
`itemtype`,
`itemsetid`
    ],
    select: `description,itemnum,itemid,orderunit,status,itemtype,itemsetid,asset.manufacturer,asset.vendor,rel.itemcondition{*}`
  },
  objectStructure: `MXAPIITEM`,
  idAttribute: `itemid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      searchable: `true`,
      id: `rk3qj`
    },
    {
      name: `itemnum`,
      searchable: `true`,
      id: `ygem9`
    },
    {
      name: `itemid`,
      index: `true`,
      'unique-id': `true`,
      id: `w_qgd`
    },
    {
      name: `orderunit`,
      searchable: `true`,
      id: `d2mj8`
    },
    {
      name: `status`,
      index: `true`,
      id: `nd334`
    },
    {
      name: `itemtype`,
      index: `true`,
      id: `eeb_k`
    },
    {
      name: `itemsetid`,
      index: `true`,
      id: `wbvax`
    },
    {
      name: `asset.manufacturer`,
      id: `pvyvd`
    },
    {
      name: `asset.vendor`,
      id: `yxnrb`
    },
    {
      name: `rel.itemcondition{*}`,
      id: `g3m5y`
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
  isMaximoMobile: true,
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
                // end datasource - itemListDS

                

                // begin datasource - locationListDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `locationListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIOPERLOC`,
    savedQuery: `MOBILELOCATION`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `locationListDS`,
    searchAttributes:     [
`description`,
`location`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`description`,
`location`,
`siteid`,
`orgid`
    ],
    select: `description,location,siteid,orgid`
  },
  objectStructure: `MXAPIOPERLOC`,
  idAttribute: `location`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      searchable: `true`,
      id: `vm5rp`
    },
    {
      name: `location`,
      searchable: `true`,
      'unique-id': `true`,
      id: `epx6e`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `kqrxb`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `drj24`
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
  isMaximoMobile: true,
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
                // end datasource - locationListDS

                

                // begin datasource - materialRequestSynonymDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `materialRequestSynonymDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapisynonymdomain`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `materialRequestSynonymDS`,
    searchAttributes:     [
`maxvalue`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`maxvalue`,
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
      id: `rkk94`
    },
    {
      name: `maxvalue`,
      searchable: `true`,
      id: `y4v_r`
    },
    {
      name: `description`,
      id: `b33jd`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `wb98b`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `pd_k6`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `em593`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `dy4me`
    },
    {
      name: `defaults`,
      id: `an4g9`
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
  isMaximoMobile: true,
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
                // end datasource - materialRequestSynonymDS

                

                // begin datasource - itemConditionDS
                {
                  let options = {
  name: `itemConditionDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `conditionCodeItems`,
  schemaExt:   [
    {
      name: `itemconditionid`,
      'unique-id': `true`,
      id: `x498w`
    },
    {
      name: `conditioncode`,
      searchable: `true`,
      id: `ggmb7`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `j97a3`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `itemconditionid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`conditioncode`,
`description`
    ],
    select: `itemconditionid,conditioncode,description`,
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
                // end datasource - itemConditionDS

                
          
                // begin dialog - itemsListLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `itemsListLookup`,
  configuration:   {
    id: `itemsListLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupItemsListLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupItemsListLookup {...props} />
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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - itemsListLookup
                

                // begin dialog - storeRoomListLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `storeRoomListLookup`,
  configuration:   {
    id: `storeRoomListLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupStoreRoomListLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupStoreRoomListLookup {...props} />
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
                // end dialog - storeRoomListLookup
                

                // begin dialog - conditionCodeLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `conditionCodeLookup`,
  configuration:   {
    id: `conditionCodeLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupConditionCodeLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupConditionCodeLookup {...props} />
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
                // end dialog - conditionCodeLookup
                

                // begin dialog - AddItemDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `AddItemDrawer`,
  configuration:   {
    id: `AddItemDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerAddItemDrawer slidingDrawerProps={props} id={"AddItemDrawer_slidingdrawer_container"}  />
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
                // end dialog - AddItemDrawer
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'reserveMaterials' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'reserveMaterials', clearStack: false, parent: app, route: '/reserveMaterials/*', title: app.getLocalizedLabel("reserveMaterials_title", "Items"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"sendSelectedAssets":true}, 'page'), {});

        
              {
                let controller = new ReserveMaterialsPageController();
                bootstrapInspector.onNewController(controller, 'ReserveMaterialsPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - woMaterialResource
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woMaterialResource`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    itemUrl: (page.params.href),
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woMaterialResource`,
    select: `wonum,description,workorderid,siteid,orgid`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `wonum`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      'unique-id': `true`,
      id: `y8wwq`
    },
    {
      name: `description`,
      id: `p8y5p`
    },
    {
      name: `workorderid`,
      id: `bj_dz`
    },
    {
      name: `siteid`,
      id: `dd4d3`
    },
    {
      name: `orgid`,
      id: `ra7nw`
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
  isMaximoMobile: true,
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
                // end datasource - woMaterialResource

                

                // begin datasource - woReservedMaterialds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woReservedMaterialds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `showinvreserveitems`,
    dependsOn: `woMaterialResource`,
    selectionMode: `single`,
    select: `description,invreserve,itemnum,itemqty,assetqty,locations.description--locationsdesc,location,binnum,requestnum,pendingqty,reservedqty,actualqty,storeloc,assetnum,storelocsiteid,oplocation,matusetrans{*},siteid,wonum,item.rotating--isrotating,invreserveid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `invreserveid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      id: `rq7dk`
    },
    {
      name: `invreserve`,
      id: `w2rbw`
    },
    {
      name: `itemnum`,
      id: `d7q5m`
    },
    {
      name: `itemqty`,
      id: `vg9eg`
    },
    {
      name: `computedItemNum`,
      'computed-function': `computedItemNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("v7eg2_title", "Item")),
      remarks: (app.getLocalizedLabel("v7eg2_remarks", "Identifies the item.")),
      id: `v7eg2`,
      computed: (true),
      local: (true)
    },
    {
      name: `assetqty`,
      type: `NUMBER`,
      'default-value': `1`,
      id: `ezrwv`
    },
    {
      name: `locations.description--locationsdesc`,
      id: `vkr9y`
    },
    {
      name: `location`,
      id: `mvgre`
    },
    {
      name: `binnum`,
      id: `nm_ey`
    },
    {
      name: `requestnum`,
      id: `kpm7r`
    },
    {
      name: `pendingqty`,
      id: `r_xpr`
    },
    {
      name: `reservedqty`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `x3pqq`
    },
    {
      name: `actualqty`,
      id: `ek372`
    },
    {
      name: `storeloc`,
      id: `axy7r`
    },
    {
      name: `assetnum`,
      id: `jqvr8`
    },
    {
      name: `storelocsiteid`,
      id: `e38ee`
    },
    {
      name: `oplocation`,
      id: `dbgbd`
    },
    {
      name: `matusetrans{*}`,
      id: `g_vwb`
    },
    {
      name: `siteid`,
      id: `r_jdv`
    },
    {
      name: `wonum`,
      id: `ngdgp`
    },
    {
      name: `item.rotating--isrotating`,
      id: `vxw42`
    },
    {
      name: `invreserveid`,
      'unique-id': `true`,
      id: `dqerq`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woMaterialResource`,
  computedFields:   {
    computedItemNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedItemNum', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReserveMaterialsDataController();
bootstrapInspector.onNewController(controller, 'ReserveMaterialsDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woReservedMaterialds

                

                // begin datasource - reservedActualMaterialDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reservedActualMaterialDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `matusetransid`,
    objectName: `matusetrans`,
    relationship: `uxshowactualmaterial`,
    dependsOn: `woMaterialResource`,
    selectionMode: `none`,
    childFilters:     [
      {
        "workorder.uxshowactualmaterial.limit": `50`,
        "workorder.uxshowactualmaterial.orderBy": `-matusetransid`
      }
    ],
    select: `matusetransid,siteid,itemnum,description,storeloc,locations.description--locdesc,positivequantity,issuetype,anywhererefid,refwo,binnum,rotassetnum,itemsetid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `matusetransid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `matusetransid`,
      'unique-id': `true`,
      id: `q8jkk`
    },
    {
      name: `siteid`,
      id: `byezb`
    },
    {
      name: `itemnum`,
      id: `jqrag`
    },
    {
      name: `description`,
      id: `bxvp2`
    },
    {
      name: `storeloc`,
      id: `ax7j6`
    },
    {
      name: `locations.description--locdesc`,
      id: `mv9qe`
    },
    {
      name: `positivequantity`,
      id: `qgz_w`
    },
    {
      name: `issuetype`,
      id: `r5w7r`
    },
    {
      name: `anywhererefid`,
      id: `ge9am`
    },
    {
      name: `refwo`,
      id: `qgeyx`
    },
    {
      name: `binnum`,
      id: `g5gqj`
    },
    {
      name: `rotassetnum`,
      id: `j7xeb`
    },
    {
      name: `itemsetid`,
      id: `byrefd`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woMaterialResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - reservedActualMaterialDs

                

                // begin datasource - reservedItemRotatingAssetDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reservedItemRotatingAssetDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    objectStructure: `MXAPIASSET`,
    savedQuery: `MOBILEASSET`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `reservedItemRotatingAssetDS`,
    select: `itemnum,location,description,assetnum,assetqty,serialnum`
  },
  objectStructure: `MXAPIASSET`,
  idAttribute: `assetnum`,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      id: `qkevv`
    },
    {
      name: `location`,
      id: `eqp76`
    },
    {
      name: `description`,
      id: `jdb2q`
    },
    {
      name: `assetnum`,
      'unique-id': `true`,
      id: `b3nn6`
    },
    {
      name: `assetqty`,
      type: `NUMBER`,
      'default-value': `1`,
      id: `xmynr`
    },
    {
      name: `serialnum`,
      id: `naq94`
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
  isMaximoMobile: true,
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
                // end datasource - reservedItemRotatingAssetDS

                

                // begin datasource - woReservedMaterialNonRotating
                {
                  let options = {
  name: `woReservedMaterialNonRotating`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `description`,
      id: `a2bg9`
    },
    {
      name: `itemnum`,
      id: `y5p85`
    },
    {
      name: `itemqty`,
      id: `d86pr`
    },
    {
      name: `computedItemNum`,
      'computed-function': `computedItemNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("zwjqy_title", "Item")),
      remarks: (app.getLocalizedLabel("zwjqy_remarks", "Identifies the item.")),
      id: `zwjqy`,
      computed: (true),
      local: (true)
    },
    {
      name: `locations.description--locationsdesc`,
      id: `zd5ne`
    },
    {
      name: `location`,
      id: `vj8de`
    },
    {
      name: `binnum`,
      id: `kgznw`
    },
    {
      name: `requestnum`,
      id: `x2xba`
    },
    {
      name: `pendingqty`,
      id: `rndbn`
    },
    {
      name: `reservedqty`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `q7jze`
    },
    {
      name: `actualqty`,
      id: `p7x5_`
    },
    {
      name: `storeloc`,
      id: `b92jn`
    },
    {
      name: `assetnum`,
      id: `z9gpg`
    },
    {
      name: `storelocsiteid`,
      id: `wwj53`
    },
    {
      name: `oplocation`,
      id: `rpa55`
    },
    {
      name: `matusetrans{*}`,
      id: `raaje`
    },
    {
      name: `siteid`,
      id: `zqxz2`
    },
    {
      name: `wonum`,
      id: `z3gyp`
    },
    {
      name: `item.rotating--isrotating`,
      id: `jgk78`
    },
    {
      name: `invreserveid`,
      'unique-id': `true`,
      id: `r5g6r`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `invreserveid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `description,itemnum,itemqty,locations.description--locationsdesc,location,binnum,requestnum,pendingqty,reservedqty,actualqty,storeloc,assetnum,storelocsiteid,oplocation,matusetrans{*},siteid,wonum,item.rotating--isrotating,invreserveid`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `multiple`,
  computedFields:   {
    computedItemNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedItemNum', item))
    }
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
                // end datasource - woReservedMaterialNonRotating

                

                // begin datasource - woReservedMaterialRotating
                {
                  let options = {
  name: `woReservedMaterialRotating`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `description`,
      id: `gz233`
    },
    {
      name: `itemnum`,
      id: `a97bp`
    },
    {
      name: `itemqty`,
      id: `ran6x`
    },
    {
      name: `computedItemNum`,
      'computed-function': `computedItemNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("jggj9_title", "Item")),
      remarks: (app.getLocalizedLabel("jggj9_remarks", "Identifies the item.")),
      id: `jggj9`,
      computed: (true),
      local: (true)
    },
    {
      name: `locations.description--locationsdesc`,
      id: `wbzar`
    },
    {
      name: `location`,
      id: `zwyx7`
    },
    {
      name: `binnum`,
      id: `zjzey`
    },
    {
      name: `requestnum`,
      id: `j5eg8`
    },
    {
      name: `pendingqty`,
      id: `zvd58`
    },
    {
      name: `reservedqty`,
      id: `px6va`
    },
    {
      name: `assetqty`,
      type: `NUMBER`,
      'default-value': `1`,
      id: `z7zdy`
    },
    {
      name: `actualqty`,
      id: `ebn2q`
    },
    {
      name: `storeloc`,
      id: `k59ke`
    },
    {
      name: `assetnum`,
      id: `bg8qw`
    },
    {
      name: `storelocsiteid`,
      id: `qmv8y`
    },
    {
      name: `oplocation`,
      id: `z7gpr`
    },
    {
      name: `matusetrans{*}`,
      id: `n3rjg`
    },
    {
      name: `siteid`,
      id: `k33xe`
    },
    {
      name: `wonum`,
      id: `bw2nm`
    },
    {
      name: `item.rotating--isrotating`,
      id: `d9q_5`
    },
    {
      name: `invreserveid`,
      'unique-id': `true`,
      id: `j7y4r`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `invreserveid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `description,itemnum,itemqty,locations.description--locationsdesc,location,binnum,requestnum,pendingqty,reservedqty,assetqty,actualqty,storeloc,assetnum,storelocsiteid,oplocation,matusetrans{*},siteid,wonum,item.rotating--isrotating,invreserveid`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `multiple`,
  computedFields:   {
    computedItemNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedItemNum', item))
    }
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
                // end datasource - woReservedMaterialRotating

                

                // begin datasource - woReservedMaterialNonRotating
                {
                  let options = {
  name: `woReservedMaterialNonRotating`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `description`,
      id: `qpzrg`
    },
    {
      name: `itemnum`,
      id: `e66jm`
    },
    {
      name: `itemqty`,
      id: `y_rb8`
    },
    {
      name: `computedItemNum`,
      'computed-function': `computedItemNum`,
      type: `STRING`,
      'sub-type': `ALN`,
      title: (app.getLocalizedLabel("y52v3_title", "Item")),
      remarks: (app.getLocalizedLabel("y52v3_remarks", "Identifies the item.")),
      id: `y52v3`,
      computed: (true),
      local: (true)
    },
    {
      name: `locations.description--locationsdesc`,
      id: `ygdba`
    },
    {
      name: `location`,
      id: `w6x9y`
    },
    {
      name: `binnum`,
      id: `ngy8z`
    },
    {
      name: `requestnum`,
      id: `wbqwj`
    },
    {
      name: `pendingqty`,
      id: `jnevr`
    },
    {
      name: `reservedqty`,
      id: `axk37`
    },
    {
      name: `assetqty`,
      type: `NUMBER`,
      'default-value': `1`,
      id: `n6ywa`
    },
    {
      name: `actualqty`,
      id: `brme4`
    },
    {
      name: `storeloc`,
      id: `wynge`
    },
    {
      name: `assetnum`,
      id: `ejrve`
    },
    {
      name: `storelocsiteid`,
      id: `ympqq`
    },
    {
      name: `oplocation`,
      id: `mgn73`
    },
    {
      name: `matusetrans{*}`,
      id: `gkzq5`
    },
    {
      name: `siteid`,
      id: `bryn_`
    },
    {
      name: `wonum`,
      id: `gwpyn`
    },
    {
      name: `item.rotating--isrotating`,
      id: `yvbg4`
    },
    {
      name: `invreserveid`,
      'unique-id': `true`,
      id: `pjm3z`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `invreserveid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `description,itemnum,itemqty,locations.description--locationsdesc,location,binnum,requestnum,pendingqty,reservedqty,assetqty,actualqty,storeloc,assetnum,storelocsiteid,oplocation,matusetrans{*},siteid,wonum,item.rotating--isrotating,invreserveid`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `multiple`,
  computedFields:   {
    computedItemNum:     {
      computedFunction: ((item, datasource) => datasource.callController('computedItemNum', item))
    }
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
                // end datasource - woReservedMaterialNonRotating

                
          
                // begin dialog - saveDiscardDialog_reservePage
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardDialog_reservePage`,
  configuration:   {
    id: `saveDiscardDialog_reservePage`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardDialog_reservePage id={"saveDiscardDialog_reservePage_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardDialog_reservePage
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'report_work' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'report_work', clearStack: false, parent: app, route: '/report_work/*', title: app.getLocalizedLabel("report_work_title", "report_work"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"groupedByLabor":true,"useConfirmDialog":false,"callMethodAction":"","qualificationParams":"{}","skipQualification":false}, 'page'), {});

        
              {
                let controller = new ReportWorkPageController();
                bootstrapInspector.onNewController(controller, 'ReportWorkPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - woDetailsReportWork
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woDetailsReportWork`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    default: true,
    itemUrl: (page.params.itemhref ? page.params.itemhref : page.params.href),
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woDetailsReportWork`,
    searchAttributes:     [
`asset.assetnum`
    ],
    indexAttributes:     [
`asset.assetnum--assetnumber`
    ],
    select: `workorderid,wonum,location.location--locationnum,problemcode,failurecode,faildate,failure.description,problem.description,failure.failurelist.failurelist,problem.failurelist.failurelist,problem.failurelist.failurecode,failurereport{type,linenum,failurecode.failurecode,failurecode.description},siteid,orgid,maxvar.labtranstolerance,status,remarkdesc,remarkdesc_longdescription,failureclassdelete,problemdelete,causedelete,remedydelete,maxvar.downprompt,asset.assetnum--assetnumber,asset.description--assetdesc,asset.isrunning--assetisrunning,asset.ISCALIBRATION--ISCALIBRATION,pluscwods._dbcount--pluscwodscount,maxvar.pluscvaltool,maxvar.pluscqualtech,istask,wogroup,taskid,flowcontrolled`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `rnxdv`
    },
    {
      name: `wonum`,
      id: `qbbd8`
    },
    {
      name: `location.location--locationnum`,
      id: `x2aqe`
    },
    {
      name: `problemcode`,
      id: `gpk5a`
    },
    {
      name: `failurecode`,
      id: `er5rq`
    },
    {
      name: `faildate`,
      id: `a536d`
    },
    {
      name: `failure.description`,
      id: `qav2r`
    },
    {
      name: `problem.description`,
      id: `ax797`
    },
    {
      name: `failure.failurelist.failurelist`,
      id: `mjjjw`
    },
    {
      name: `problem.failurelist.failurelist`,
      id: `wdm7g`
    },
    {
      name: `problem.failurelist.failurecode`,
      id: `d42gz`
    },
    {
      name: `failurereport{type,linenum,failurecode.failurecode,failurecode.description}`,
      id: `pb64d`
    },
    {
      name: `siteid`,
      id: `ab9v6`
    },
    {
      name: `orgid`,
      id: `dggp2`
    },
    {
      name: `maxvar.labtranstolerance`,
      id: `mjyt`
    },
    {
      name: `status`,
      id: `djzv_`
    },
    {
      name: `remarkdesc`,
      id: `m79p2`
    },
    {
      name: `remarkdesc_longdescription`,
      id: `yrz46`
    },
    {
      name: `failureclassdelete`,
      type: `BOOL`,
      'default-value': `false`,
      id: `j9mpp`
    },
    {
      name: `problemdelete`,
      type: `BOOL`,
      'default-value': `false`,
      id: `e8467`
    },
    {
      name: `causedelete`,
      type: `BOOL`,
      'default-value': `false`,
      id: `dqy4n`
    },
    {
      name: `remedydelete`,
      type: `BOOL`,
      'default-value': `false`,
      id: `m6r_j`
    },
    {
      name: `maxvar.downprompt`,
      id: `xapy7`
    },
    {
      name: `asset.assetnum--assetnumber`,
      searchable: `true`,
      id: `z5jbx`
    },
    {
      name: `asset.description--assetdesc`,
      id: `mr_2g`
    },
    {
      name: `asset.isrunning--assetisrunning`,
      id: `j95dm`
    },
    {
      name: `asset.ISCALIBRATION--ISCALIBRATION`,
      id: `rg26v`
    },
    {
      name: `pluscwods._dbcount--pluscwodscount`,
      id: `mzpx8`
    },
    {
      name: `maxvar.pluscvaltool`,
      id: `jpqby`
    },
    {
      name: `maxvar.pluscqualtech`,
      id: `mxzyk`
    },
    {
      name: `istask`,
      id: `dknkg`
    },
    {
      name: `wogroup`,
      id: `azazq`
    },
    {
      name: `taskid`,
      id: `pnxnq`
    },
    {
      name: `flowcontrolled`,
      id: `j3g49`
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
      lastValue: (page.params.itemhref ? page.params.itemhref : page.params.href),
      check: (()=>{return page.params.itemhref ? page.params.itemhref : page.params.href})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReportWorkDataController();
bootstrapInspector.onNewController(controller, 'ReportWorkDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - woDetailsReportWork

                

                // begin datasource - reportWorkActualMaterialDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reportWorkActualMaterialDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `matusetransid`,
    objectName: `matusetrans`,
    relationship: `uxshowactualmaterial`,
    dependsOn: `woDetailsReportWork`,
    selectionMode: `none`,
    childFilters:     [
      {
        "workorder.uxshowactualmaterial.limit": `50`,
        "workorder.uxshowactualmaterial.orderBy": `-matusetransid`
      }
    ],
    select: `matusetransid,siteid,itemnum,description,storeloc,locations.description--locdesc,positivequantity,issuetype,anywhererefid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `matusetransid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `matusetransid`,
      'unique-id': `true`,
      id: `a386_`
    },
    {
      name: `siteid`,
      id: `n94v8`
    },
    {
      name: `itemnum`,
      id: `egk5z`
    },
    {
      name: `description`,
      id: `e437y`
    },
    {
      name: `storeloc`,
      id: `bgdw2`
    },
    {
      name: `locations.description--locdesc`,
      id: `e9gnj`
    },
    {
      name: `positivequantity`,
      id: `apwjz`
    },
    {
      name: `issuetype`,
      id: `yqnxz`
    },
    {
      name: `computedItem`,
      'computed-function': `computedItem`,
      type: `STRING`,
      'sub-type': `ALN`,
      id: `ygy3j`,
      computed: (true),
      local: (true)
    },
    {
      name: `anywhererefid`,
      id: `rz9vj`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailsReportWork`,
  computedFields:   {
    computedItem:     {
      computedFunction: ((item, datasource) => datasource.callController('computedItem', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReportWorkDataController();
bootstrapInspector.onNewController(controller, 'ReportWorkDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - reportWorkActualMaterialDs

                

                // begin datasource - reportWorkMaterialDetailDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reportWorkMaterialDetailDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `matusetransid`,
    objectName: `matusetrans`,
    relationship: `uxshowactualmaterial`,
    dependsOn: `woDetailsReportWork`,
    selectionMode: `none`,
    select: `matusetransid,siteid,itemnum,description,storeloc,locations.description--locdesc,positivequantity,issuetype,anywhererefid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `matusetransid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `matusetransid`,
      'unique-id': `true`,
      id: `nrzwd`
    },
    {
      name: `siteid`,
      id: `vxx4_`
    },
    {
      name: `itemnum`,
      id: `w83ww`
    },
    {
      name: `description`,
      id: `w3xaw`
    },
    {
      name: `storeloc`,
      id: `q574j`
    },
    {
      name: `locations.description--locdesc`,
      id: `gvz9m`
    },
    {
      name: `positivequantity`,
      id: `yxg7j`
    },
    {
      name: `issuetype`,
      id: `apb4j`
    },
    {
      name: `anywhererefid`,
      id: `pzy9x`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailsReportWork`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReportWorkDataController();
bootstrapInspector.onNewController(controller, 'ReportWorkDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - reportWorkMaterialDetailDs

                

                // begin datasource - reportWorkActualToolsDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reportWorkActualToolsDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `tooltransid`,
    objectName: `tooltrans`,
    relationship: `uxshowactualtool`,
    dependsOn: `woDetailsReportWork`,
    selectionMode: `none`,
    childFilters:     [
      {
        "workorder.uxshowactualtool.limit": `50`,
        "workorder.uxshowactualtool.orderBy": `-tooltransid`
      }
    ],
    select: `tooltransid,siteid,itemnum,toolitem.description,toolqty,toolhrs,anywhererefid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `tooltransid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `tooltransid`,
      'unique-id': `true`,
      id: `rnjnz`
    },
    {
      name: `siteid`,
      id: `b_9dm`
    },
    {
      name: `itemnum`,
      id: `b338p`
    },
    {
      name: `toolitem.description`,
      id: `ygwk3`
    },
    {
      name: `toolqty`,
      id: `v6pk_`
    },
    {
      name: `toolhrs`,
      id: `byz23`
    },
    {
      name: `computedToolItem`,
      'computed-function': `computedToolItem`,
      type: `STRING`,
      'sub-type': `ALN`,
      id: `w4_vy`,
      computed: (true),
      local: (true)
    },
    {
      name: `anywhererefid`,
      id: `r6b63`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailsReportWork`,
  computedFields:   {
    computedToolItem:     {
      computedFunction: ((item, datasource) => datasource.callController('computedToolItem', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReportWorkDataController();
bootstrapInspector.onNewController(controller, 'ReportWorkDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - reportWorkActualToolsDs

                

                // begin datasource - reportWorkActualToolsDetailDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reportWorkActualToolsDetailDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `tooltransid`,
    objectName: `tooltrans`,
    relationship: `uxshowactualtool`,
    dependsOn: `woDetailsReportWork`,
    selectionMode: `none`,
    select: `tooltransid,siteid,itemnum,toolitem.description,toolqty,toolhrs,anywhererefid`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `tooltransid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `tooltransid`,
      'unique-id': `true`,
      id: `je3vd`
    },
    {
      name: `siteid`,
      id: `ek654`
    },
    {
      name: `itemnum`,
      id: `k7mrg`
    },
    {
      name: `toolitem.description`,
      id: `ajr9b`
    },
    {
      name: `toolqty`,
      id: `xaw2e`
    },
    {
      name: `toolhrs`,
      id: `pmzbj`
    },
    {
      name: `anywhererefid`,
      id: `jpzdg`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailsReportWork`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReportWorkDataController();
bootstrapInspector.onNewController(controller, 'ReportWorkDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - reportWorkActualToolsDetailDs

                

                // begin datasource - reportworkLaborDetailds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reportworkLaborDetailds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `labtransid`,
    objectName: `labtrans`,
    relationship: `uxshowactuallabor`,
    dependsOn: `woDetailsReportWork`,
    searchAttributes:     [
`labtransid`
    ],
    indexAttributes:     [
`labtransid`
    ],
    select: `labtransid,startdate,starttime,startdatetime,finishdate,finishtime,finishdatetime,regularhrs,transtype,labtransid,craft,craft.description--craftdescription,craft.craft--craftid,skilllevel,timerstatus,rel.craftskill{skilllevel,description--skillleveldesc},anywhererefid,payrate,timerstatus,person.displayname--displayname,laborcode,taskid,actualtaskid,tasklabor.description--task_description`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `labtransid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `labtransid`,
      'unique-id': `true`,
      id: `rj_gm`
    },
    {
      name: `startdate`,
      id: `drgkz`
    },
    {
      name: `starttime`,
      id: `d6bge`
    },
    {
      name: `startdatetime`,
      id: `g_baa`
    },
    {
      name: `finishdate`,
      id: `m2ag8`
    },
    {
      name: `finishtime`,
      id: `enznd`
    },
    {
      name: `finishdatetime`,
      id: `jjpwp`
    },
    {
      name: `regularhrs`,
      id: `rwmdr`
    },
    {
      name: `transtype`,
      id: `r49zx`
    },
    {
      name: `labtransid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `egwkn`
    },
    {
      name: `craft`,
      id: `nwdex`
    },
    {
      name: `craft.description--craftdescription`,
      id: `wqa8m`
    },
    {
      name: `craft.craft--craftid`,
      id: `w66a5`
    },
    {
      name: `skilllevel`,
      id: `md2jm`
    },
    {
      name: `timerstatus`,
      id: `azvva`
    },
    {
      name: `rel.craftskill{skilllevel,description--skillleveldesc}`,
      id: `y8yba`
    },
    {
      name: `anywhererefid`,
      id: `wpkvn`
    },
    {
      name: `payrate`,
      id: `v_gxm`
    },
    {
      name: `timerstatus`,
      id: `mka59`
    },
    {
      name: `person.displayname--displayname`,
      id: `aqaqj`
    },
    {
      name: `laborcode`,
      id: `dr9pv`
    },
    {
      name: `taskid`,
      id: `x9d5w`
    },
    {
      name: `actualtaskid`,
      id: `rxg7m`
    },
    {
      name: `tasklabor.description--task_description`,
      id: `zmzn5`
    },
    {
      name: `computedstartdate`,
      'computed-function': `formattedLaborDate`,
      id: `z42kr`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedfinishdate`,
      'computed-function': `formattedLaborDate`,
      id: `ge7vy`,
      computed: (true),
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailsReportWork`,
  computedFields:   {
    computedstartdate:     {
      computedFunction: ((item, datasource) => datasource.callController('formattedLaborDate', item))
    },
    computedfinishdate:     {
      computedFunction: ((item, datasource) => datasource.callController('formattedLaborDate', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ReportWorkDataController();
bootstrapInspector.onNewController(controller, 'ReportWorkDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - reportworkLaborDetailds

                

                // begin datasource - dsManufacturer
                {
                  let options = {
  platform: `maximoMobile`,
  name: `dsManufacturer`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIVENDOR`,
    savedQuery: `REQUESTCOMPANYLIST`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dsManufacturer`,
    searchAttributes:     [
`company`,
`type`,
`name`,
`orgid`
    ],
    indexAttributes:     [
`company`,
`type`,
`name`,
`orgid`
    ],
    select: `companiesid,company,type,name,orgid`
  },
  objectStructure: `MXAPIVENDOR`,
  idAttribute: `companiesid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `companiesid`,
      'unique-id': `true`,
      id: `rw5p8`
    },
    {
      name: `company`,
      searchable: `true`,
      id: `ynk5x`
    },
    {
      name: `type`,
      searchable: `true`,
      id: `wvaw_`
    },
    {
      name: `name`,
      searchable: `true`,
      id: `ygqda`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `p27y5`
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
  isMaximoMobile: true,
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
                // end datasource - dsManufacturer

                

                // begin datasource - synonymDSData
                {
                  let options = {
  platform: `maximoMobile`,
  name: `synonymDSData`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapisynonymdomain`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `synonymDSData`,
    searchAttributes:     [
`maxvalue`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`maxvalue`,
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
      id: `yv9wg`
    },
    {
      name: `maxvalue`,
      searchable: `true`,
      id: `xv_xe`
    },
    {
      name: `description`,
      id: `m79d9`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `wq2dz`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `dg_3v`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `m9832`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `x2pk4`
    },
    {
      name: `defaults`,
      id: `eze2r`
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
  isMaximoMobile: true,
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
                // end datasource - synonymDSData

                

                // begin datasource - inventoryDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `inventoryDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIINVENTORY`,
    savedQuery: `SHOWINVENTORY`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `inventoryDS`,
    searchAttributes:     [
`itemnum`,
`location`,
`status`,
`siteid`,
`item.conditionenabled`
    ],
    indexAttributes:     [
`itemnum`,
`location`,
`status`,
`siteid`,
`item.conditionenabled--conditionenabled`
    ],
    select: `inventoryid,itemnum,location,status,siteid,item.conditionenabled--conditionenabled`
  },
  objectStructure: `MXAPIINVENTORY`,
  idAttribute: `inventoryid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `inventoryid`,
      searchable: `false`,
      'unique-id': `true`,
      id: `kd2er`
    },
    {
      name: `itemnum`,
      searchable: `true`,
      id: `y6de_`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `ww9n7`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `da37m`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `jrppa`
    },
    {
      name: `item.conditionenabled--conditionenabled`,
      searchable: `true`,
      id: `jmppa`
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
  isMaximoMobile: true,
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
                // end datasource - inventoryDS

                

                // begin datasource - inventoryToolDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `inventoryToolDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPITOOLINV`,
    savedQuery: `SHOWTOOLS`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `inventoryToolDS`,
    searchAttributes:     [
`itemnum`,
`location`,
`status`,
`siteid`
    ],
    indexAttributes:     [
`itemnum`,
`location`,
`status`,
`siteid`
    ],
    select: `inventoryid,itemnum,location,status,siteid`
  },
  objectStructure: `MXAPITOOLINV`,
  idAttribute: `inventoryid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `inventoryid`,
      searchable: `false`,
      'unique-id': `true`,
      id: `maxmy`
    },
    {
      name: `itemnum`,
      searchable: `true`,
      id: `kv63g`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `q7xk8`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wx934`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `qym2g`
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
  isMaximoMobile: true,
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
                // end datasource - inventoryToolDS

                

                // begin datasource - itemsDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `itemsDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIITEM`,
    savedQuery: `SHOWITEMS`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `itemsDS`,
    searchAttributes:     [
`description`,
`itemnum`,
`itemid`,
`itemsetid`
    ],
    indexAttributes:     [
`description`,
`itemnum`,
`itemid`,
`itemsetid`
    ],
    select: `description,itemnum,itemid,itemsetid,rotating`
  },
  objectStructure: `MXAPIITEM`,
  idAttribute: `itemid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      searchable: `true`,
      id: `x3epr`
    },
    {
      name: `itemnum`,
      searchable: `true`,
      id: `wmyjj`
    },
    {
      name: `itemid`,
      searchable: `true`,
      'unique-id': `true`,
      id: `xa5w3`
    },
    {
      name: `itemsetid`,
      searchable: `true`,
      id: `rgp7b`
    },
    {
      name: `rotating`,
      id: `em5aq`
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
  isMaximoMobile: true,
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
                // end datasource - itemsDS

                

                // begin datasource - toolDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `toolDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPITOOLITEM`,
    savedQuery: `USERTOOLLIST`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `toolDS`,
    searchAttributes:     [
`description`,
`itemnum`,
`itemid`
    ],
    indexAttributes:     [
`description`,
`itemnum`,
`itemid`
    ],
    select: `description,itemnum,itemid,rel.toolqual{qualificationid},rotating,pluscsolution`
  },
  objectStructure: `MXAPITOOLITEM`,
  idAttribute: `itemid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      searchable: `true`,
      id: `pabqg`
    },
    {
      name: `itemnum`,
      searchable: `true`,
      id: `zer7x`
    },
    {
      name: `itemid`,
      searchable: `true`,
      'unique-id': `true`,
      id: `prkk4`
    },
    {
      name: `rel.toolqual{qualificationid}`,
      id: `qw3bq`
    },
    {
      name: `rotating`,
      id: `ejwm5`
    },
    {
      name: `pluscsolution`,
      id: `nx4q6`
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
  isMaximoMobile: true,
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
                // end datasource - toolDS

                

                // begin datasource - rotatingAssetDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `rotatingAssetDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIASSET`,
    savedQuery: `MOBILEASSET`,
    lookupData: true,
    offlineImmediateDownload: true,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `rotatingAssetDS`,
    searchAttributes:     [
`itemnum`,
`assetnum`,
`location`,
`description`,
`siteid`,
`binnum`,
`assettag`,
`assettype`,
`location.description`,
`manufacturer`,
`serialnum`,
`vendor`,
`location.glaccount`,
`status`,
`parent`
    ],
    indexAttributes:     [
`itemnum`,
`assetnum`,
`location`,
`description`,
`siteid`,
`binnum`,
`assettag`,
`assettype`,
`location.description--locationdesc`,
`manufacturer`,
`serialnum`,
`vendor`,
`location.glaccount--locglaccount`,
`status`,
`parent`
    ],
    select: `itemnum,assetuid,assetnum,location,description,siteid,binnum,assethealth,assettag,assettype,isrunning,location.description--locationdesc,manufacturer,priority,serialnum,vendor,assetchildren,children._dbcount--childcount,location.glaccount--locglaccount,children._dbcount--childcount,autolocate,children._dbcount--childcount,status,children._dbcount--childcount,failurecode,children._dbcount--childcount,parent,children._dbcount--childcount,location.locpriority--locpriority,children._dbcount--childcount,location.failurecode--locfailurecode,children._dbcount--childcount,pluscduedate_np,children._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},children._dbcount--childcount`
  },
  objectStructure: `MXAPIASSET`,
  idAttribute: `assetuid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemnum`,
      searchable: `true`,
      id: `g987x`
    },
    {
      name: `assetuid`,
      'unique-id': `true`,
      id: `p3k2m`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `nex38`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `enxnp`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `aw3_r`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `mnz7b`
    },
    {
      name: `binnum`,
      searchable: `true`,
      id: `wkamw`
    },
    {
      name: `assethealth`,
      id: `rgqrx`
    },
    {
      name: `assettag`,
      searchable: `true`,
      id: `p_34r`
    },
    {
      name: `assettype`,
      searchable: `true`,
      id: `x7q_a`
    },
    {
      name: `isrunning`,
      id: `nk579`
    },
    {
      name: `location.description--locationdesc`,
      searchable: `true`,
      id: `v62jz`
    },
    {
      name: `manufacturer`,
      searchable: `true`,
      id: `rbdg5`
    },
    {
      name: `priority`,
      id: `q4wq6`
    },
    {
      name: `serialnum`,
      searchable: `true`,
      id: `bab76`
    },
    {
      name: `vendor`,
      searchable: `true`,
      id: `q32nr`
    },
    {
      name: `assetchildren`,
      'child-relationship': `children`,
      id: `ar5d4`
    },
    {
      name: `location.glaccount--locglaccount`,
      searchable: `true`,
      id: `w32e5`
    },
    {
      name: `autolocate`,
      id: `rz43v`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `aj2yv`
    },
    {
      name: `failurecode`,
      id: `kkazx`
    },
    {
      name: `parent`,
      searchable: `true`,
      id: `m2w5v`
    },
    {
      name: `location.locpriority--locpriority`,
      id: `nrnvj`
    },
    {
      name: `location.failurecode--locfailurecode`,
      id: `bkda8`
    },
    {
      name: `pluscduedate_np`,
      id: `qyxvq`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `qaqd_`
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
  isMaximoMobile: true,
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
                // end datasource - rotatingAssetDS

                

                // begin datasource - locationDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `locationDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIOPERLOC`,
    savedQuery: `MOBILELOCATION`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `locationDS`,
    searchAttributes:     [
`description`,
`location`,
`siteid`
    ],
    indexAttributes:     [
`description`,
`location`,
`siteid`
    ],
    select: `description,location,siteid`
  },
  objectStructure: `MXAPIOPERLOC`,
  idAttribute: `location`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `description`,
      searchable: `true`,
      id: `wxqde`
    },
    {
      name: `location`,
      searchable: `true`,
      'unique-id': `true`,
      id: `gemj_`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `p66d4`
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
  isMaximoMobile: true,
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
                // end datasource - locationDS

                

                // begin datasource - inventbalDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `inventbalDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapiinvbal`,
    savedQuery: `ACTIVEITEMSITE`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `inventbalDS`,
    searchAttributes:     [
`siteid`,
`itemnum`,
`location`,
`binnum`,
`curbal`,
`lotnum`
    ],
    indexAttributes:     [
`siteid`,
`itemnum`,
`location`,
`binnum`,
`curbal`,
`lotnum`
    ],
    select: `invbalancesid,siteid,itemnum,location,binnum,curbal,lotnum,conditioncode`
  },
  objectStructure: `mxapiinvbal`,
  idAttribute: `invbalancesid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `invbalancesid`,
      'unique-id': `true`,
      id: `nvabm`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `e756b`
    },
    {
      name: `itemnum`,
      searchable: `true`,
      id: `rnpnq`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `nbnnq`
    },
    {
      name: `binnum`,
      searchable: `true`,
      id: `p3neq`
    },
    {
      name: `curbal`,
      searchable: `true`,
      id: `wkn2a`
    },
    {
      name: `lotnum`,
      searchable: `true`,
      id: `v_7q6`
    },
    {
      name: `conditioncode`,
      id: `vz75g`
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
  isMaximoMobile: true,
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
                // end datasource - inventbalDS

                

                // begin datasource - reportworksSynonymData
                {
                  let options = {
  platform: `maximoMobile`,
  name: `reportworksSynonymData`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `single`,
    objectStructure: `mxapisynonymdomain`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `reportworksSynonymData`,
    searchAttributes:     [
`maxvalue`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`maxvalue`,
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
      id: `nkan_`
    },
    {
      name: `maxvalue`,
      id: `ekd_7`,
      searchable: `true`
    },
    {
      name: `description`,
      id: `zjjqa`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `pee7e`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `yqx2w`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x5_p9`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `pr_jp`
    },
    {
      name: `defaults`,
      id: `wwxqb`
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
  isMaximoMobile: true,
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
                // end datasource - reportworksSynonymData

                

                // begin datasource - craftrate
                {
                  let options = {
  platform: `maximoMobile`,
  name: `craftrate`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapilaborcraftrate`,
    savedQuery: `LABORSITEMOB`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `craftrate`,
    searchAttributes:     [
`craft.description`,
`craftskill.description`
    ],
    indexAttributes:     [
`craft.description--craftdescription`,
`craftskill.description--skillleveldescdata`,
`laborcode`
    ],
    select: `orgid,craft,craft.description--craftdescription,craftskill.skilllevel--skillleveldata,craftskill.description--skillleveldescdata,defaultcraft,rate,laborcraftrateid,laborcode`
  },
  objectStructure: `mxapilaborcraftrate`,
  idAttribute: `laborcraftrateid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `orgid`,
      id: `kd6p_`
    },
    {
      name: `craft`,
      id: `dx85z`
    },
    {
      name: `craft.description--craftdescription`,
      searchable: `true`,
      id: `w3_zv`
    },
    {
      name: `craftskill.skilllevel--skillleveldata`,
      id: `xzn_8`
    },
    {
      name: `craftskill.description--skillleveldescdata`,
      searchable: `true`,
      id: `kr4qn`
    },
    {
      name: `defaultcraft`,
      id: `xade2`
    },
    {
      name: `rate`,
      id: `py985`
    },
    {
      name: `laborcraftrateid`,
      'unique-id': `true`,
      id: `wbjq8`
    },
    {
      name: `laborcode`,
      index: `true`,
      id: `n5wg3`
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
  isMaximoMobile: true,
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
                // end datasource - craftrate

                

                // begin datasource - jreportworkLabords
                {
                  let options = {
  name: `jreportworkLabords`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schema: `schema`,
  schemaExt:   [
    {
      name: `labtransid`,
      'unique-id': `true`,
      id: `wzmxj`
    },
    {
      name: `startdate`,
      id: `dpvvq`
    },
    {
      name: `starttime`,
      id: `j3k3j`
    },
    {
      name: `finishdate`,
      id: `p534p`
    },
    {
      name: `finishtime`,
      id: `vr537`
    },
    {
      name: `regularhrs`,
      id: `k_jey`
    },
    {
      name: `transtype`,
      id: `a6xd5`
    },
    {
      name: `laborcode`,
      searchable: `true`,
      id: `mwqbe`
    },
    {
      name: `anywhererefid`,
      id: `vbmqk`
    },
    {
      name: `timerstatus`,
      id: `am55j`
    },
    {
      name: `displayname`,
      id: `pnre4`
    },
    {
      name: `groupedlabor`,
      id: `b63k8`
    },
    {
      name: `computedstartdate`,
      'computed-function': `formattedLaborDate`,
      id: `y5ee2`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedfinishdate`,
      'computed-function': `formattedLaborDate`,
      id: `k_53e`,
      computed: (true),
      local: (true)
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `labtransid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`laborcode`
    ],
    select: `labtransid,startdate,starttime,finishdate,finishtime,regularhrs,transtype,laborcode,anywhererefid,timerstatus,displayname,groupedlabor`,
    src: ([])
  },
  autoSave: false,
  selectionMode: `single`,
  computedFields:   {
    computedstartdate:     {
      computedFunction: ((item, datasource) => datasource.callController('formattedLaborDate', item))
    },
    computedfinishdate:     {
      computedFunction: ((item, datasource) => datasource.callController('formattedLaborDate', item))
    }
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
                // end datasource - jreportworkLabords

                

                // begin datasource - laborDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `laborDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `mxapilabor`,
    savedQuery: `LABORSITEMOB`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `laborDs`,
    searchAttributes:     [
`laborcode`,
`person.displayname`
    ],
    indexAttributes:     [
`laborcode`,
`orgid`,
`person.displayname--displayname`
    ],
    select: `laborcode,orgid,person.displayname--displayname,laborid,rel.laborqual{qualificationid},personid`
  },
  objectStructure: `mxapilabor`,
  idAttribute: `laborid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `laborcode`,
      id: `m3ypr`,
      searchable: `true`
    },
    {
      name: `orgid`,
      id: `m3xd5`,
      index: `true`
    },
    {
      name: `person.displayname--displayname`,
      searchable: `true`,
      id: `zvvv6`
    },
    {
      name: `laborid`,
      'unique-id': `true`,
      id: `x4j_b`
    },
    {
      name: `rel.laborqual{qualificationid}`,
      id: `xqwqg`
    },
    {
      name: `personid`,
      id: `a99qn`
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
  isMaximoMobile: true,
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
                // end datasource - laborDs

                
          
                // begin dialog - transTypeLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `transTypeLookup`,
  configuration:   {
    id: `transTypeLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupTransTypeLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupTransTypeLookup {...props} />
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
                // end dialog - transTypeLookup
                

                // begin dialog - craftLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `craftLookup`,
  configuration:   {
    id: `craftLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupCraftLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupCraftLookup {...props} />
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
                // end dialog - craftLookup
                

                // begin dialog - laborLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `laborLookup`,
  configuration:   {
    id: `laborLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupLaborLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupLaborLookup {...props} />
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
                // end dialog - laborLookup
                

                // begin dialog - technicianLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `technicianLookup`,
  configuration:   {
    id: `technicianLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupTechnicianLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupTechnicianLookup {...props} />
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
                // end dialog - technicianLookup
                

                // begin dialog - manufacturerLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `manufacturerLookup`,
  configuration:   {
    id: `manufacturerLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupManufacturerLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupManufacturerLookup {...props} />
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
                // end dialog - manufacturerLookup
                

                // begin dialog - saveDiscardLaborsDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardLaborsDialog`,
  configuration:   {
    id: `saveDiscardLaborsDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardLaborsDialog id={"saveDiscardLaborsDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardLaborsDialog
                

                // begin dialog - reportTimeDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `reportTimeDrawer`,
  configuration:   {
    id: `reportTimeDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerReportTimeDrawer slidingDrawerProps={props} id={"reportTimeDrawer_slidingdrawer_container"}  />
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
                // end dialog - reportTimeDrawer
                

                // begin dialog - materialLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `materialLookup`,
  configuration:   {
    id: `materialLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupMaterialLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupMaterialLookup {...props} />
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
                // end dialog - materialLookup
                

                // begin dialog - storeRoomLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `storeRoomLookup`,
  configuration:   {
    id: `storeRoomLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupStoreRoomLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupStoreRoomLookup {...props} />
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
                // end dialog - storeRoomLookup
                

                // begin dialog - binLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `binLookup`,
  configuration:   {
    id: `binLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupBinLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupBinLookup {...props} />
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
                // end dialog - binLookup
                

                // begin dialog - transactionTypeLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `transactionTypeLookup`,
  configuration:   {
    id: `transactionTypeLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupTransactionTypeLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupTransactionTypeLookup {...props} />
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
                // end dialog - transactionTypeLookup
                

                // begin dialog - rotatingAssetLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `rotatingAssetLookup`,
  configuration:   {
    id: `rotatingAssetLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupRotatingAssetLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupRotatingAssetLookup {...props} />
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
                // end dialog - rotatingAssetLookup
                

                // begin dialog - materialsDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `materialsDrawer`,
  configuration:   {
    id: `materialsDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerMaterialsDrawer slidingDrawerProps={props} id={"materialsDrawer_slidingdrawer_container"}  />
    );
  })
  ),
    validateOnExit:     [
`reportWorkMaterialDetailDs`
    ],
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
                // end dialog - materialsDrawer
                

                // begin dialog - toolLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `toolLookup`,
  configuration:   {
    id: `toolLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupToolLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupToolLookup {...props} />
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
                // end dialog - toolLookup
                

                // begin dialog - toolStoreRoomLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `toolStoreRoomLookup`,
  configuration:   {
    id: `toolStoreRoomLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupToolStoreRoomLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupToolStoreRoomLookup {...props} />
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
                // end dialog - toolStoreRoomLookup
                

                // begin dialog - toolBinLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `toolBinLookup`,
  configuration:   {
    id: `toolBinLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupToolBinLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupToolBinLookup {...props} />
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
                // end dialog - toolBinLookup
                

                // begin dialog - toolRotatingAssetLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `toolRotatingAssetLookup`,
  configuration:   {
    id: `toolRotatingAssetLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupToolRotatingAssetLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupToolRotatingAssetLookup {...props} />
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
                // end dialog - toolRotatingAssetLookup
                

                // begin dialog - calibrationToolRotatingAssetLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `calibrationToolRotatingAssetLookup`,
  configuration:   {
    id: `calibrationToolRotatingAssetLookup`,
    type: `lookupWithFilter`,
    isSingleTone: true,
    dialogRenderer: ((props => {
    return (
      <LookupWithFilterCalibrationToolRotatingAssetLookup {...props} />
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
                // end dialog - calibrationToolRotatingAssetLookup
                

                // begin dialog - toolTaskLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `toolTaskLookup`,
  configuration:   {
    id: `toolTaskLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupToolTaskLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupToolTaskLookup {...props} />
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
                // end dialog - toolTaskLookup
                

                // begin dialog - calibrationToolsDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `calibrationToolsDrawer`,
  configuration:   {
    id: `calibrationToolsDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerCalibrationToolsDrawer slidingDrawerProps={props} id={"calibrationToolsDrawer_slidingdrawer_container"}  />
    );
  })
  ),
    validateOnExit:     [
`reportWorkActualToolsDetailDs`
    ],
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
                // end dialog - calibrationToolsDrawer
                

                // begin dialog - toolsDrawer
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `toolsDrawer`,
  configuration:   {
    id: `toolsDrawer`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerToolsDrawer slidingDrawerProps={props} id={"toolsDrawer_slidingdrawer_container"}  />
    );
  })
  ),
    validateOnExit:     [
`reportWorkActualToolsDetailDs`
    ],
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
                // end dialog - toolsDrawer
                

                // begin dialog - toolsDueDateError
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `toolsDueDateError`,
  configuration:   {
    id: `toolsDueDateError`,
    dialogRenderer: ((props => {
    return (
      <DialogToolsDueDateError id={"toolsDueDateError_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - toolsDueDateError
                

                // begin dialog - qualificationError
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `qualificationError`,
  configuration:   {
    id: `qualificationError`,
    dialogRenderer: ((props => {
    return (
      <DialogQualificationError id={"qualificationError_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - qualificationError
                

                // begin dialog - qualificationWarning
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `qualificationWarning`,
  configuration:   {
    id: `qualificationWarning`,
    dialogRenderer: ((props => {
    return (
      <DialogQualificationWarning id={"qualificationWarning_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - qualificationWarning
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'assetDetails' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'assetDetails', clearStack: false, parent: app, route: '/assetDetails/*', title: app.getLocalizedLabel("assetDetails_title", "assetDetails"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        

          
                // begin datasource - assetds
                {
                  let options = {
  name: `assetds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `member`,
  schemaExt:   [
    {
      name: `assetnum`,
      id: `z_e4m`
    },
    {
      name: `title`,
      id: `xwyq6`
    },
    {
      name: `description`,
      id: `xj2dj`
    },
    {
      name: `install_date`,
      id: `pydpz`
    },
    {
      name: `status`,
      id: `dqzqe`
    },
    {
      name: `est_end_of_life`,
      id: `zyv5_`
    },
    {
      name: `next_PM`,
      id: `q9qkx`
    },
    {
      name: `next_failure`,
      id: `kne59`
    },
    {
      name: `location`,
      id: `r64w5`
    },
    {
      name: `service_address`,
      id: `j22mw`
    },
    {
      name: `number`,
      id: `ry894`
    },
    {
      name: `priority`,
      id: `k6my8`
    },
    {
      name: `asset`,
      id: `mrd55`
    },
    {
      name: `parent_asset`,
      id: `a6dk8`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `assetnum`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `assetnum,title,description,install_date,status,est_end_of_life,next_PM,next_failure,location,service_address,number,priority,asset,parent_asset`,
    src: (dataassetds)
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
  preLoad: true,
  srcName: `./mocked/asset-detail.js`
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(new JSONDataAdapter(options), options, 'JSONDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - assetds

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'failureDetails' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'failureDetails', clearStack: false, parent: app, route: '/failureDetails/*', title: app.getLocalizedLabel("failureDetails_title", "Failure"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"splitViewIndex":0,"hideDoneBtn":false}, 'page'), {});

        
              {
                let controller = new FailureDetailsPageController();
                bootstrapInspector.onNewController(controller, 'FailureDetailsPageController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - dsfailureDetailsList
                {
                  let options = {
  name: `dsfailureDetailsList`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `failurelistid`,
      'unique-id': `true`,
      id: `abybp`
    },
    {
      name: `failurecode`,
      id: `gz977`
    },
    {
      name: `description`,
      id: `vwakv`
    },
    {
      name: `type`,
      id: `yg2pq`
    },
    {
      name: `failurelist`,
      id: `dn5zx`
    },
    {
      name: `index`,
      id: `kqb6w`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `failurelistid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `failurelistid,failurecode,description,type,failurelist,index`,
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
                // end datasource - dsfailureDetailsList

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'attachments' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'attachments', clearStack: false, parent: app, route: '/attachments/*', title: app.getLocalizedLabel("attachments_title", "Attachments"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new AttachmentController();
                bootstrapInspector.onNewController(controller, 'AttachmentController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - workOrderAttachmentResource
                {
                  let options = {
  platform: `maximoMobile`,
  name: `workOrderAttachmentResource`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    default: true,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `workOrderAttachmentResource`,
    select: `wonum,description,workorderid,doclinks{*}`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `wonum`,
      id: `xbmn_`
    },
    {
      name: `description`,
      id: `nqz35`
    },
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `p67dz`
    },
    {
      name: `doclinks{*}`,
      id: `dekpd`
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
  isMaximoMobile: true,
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
                // end datasource - workOrderAttachmentResource

                

                // begin datasource - attachmentListDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `attachmentListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 250,
  query:   {
    pageSize: 250,
    attachment: true,
    relationship: `doclinks`,
    selectionMode: `none`,
    select: `*`,
    dependsOn: `workOrderAttachmentResource`,
    dsParentObject: `mxapiwodetail`
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
      id: `mbqx3`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `workOrderAttachmentResource`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'relatedWorkOrder' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'relatedWorkOrder', clearStack: false, parent: app, route: '/relatedWorkOrder/*', title: app.getLocalizedLabel("relatedWorkOrder_title", "Follow-up work"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"forceSyncFollowUP":false}, 'page'), {});

        
              {
                let controller = new RelatedWoController();
                bootstrapInspector.onNewController(controller, 'RelatedWoController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - woDetailRelatedWorkOrder
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woDetailRelatedWorkOrder`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    default: true,
    itemUrl: (page.params.itemhref),
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woDetailRelatedWorkOrder`,
    select: `workorderid,wonum,title,description,status,statusdate,siteid,orgid,worktype,description_longdescription,wopriority,assetnum,href,location.location--locationnum`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `pba3q`
    },
    {
      name: `wonum`,
      id: `ak5eg`
    },
    {
      name: `title`,
      id: `ekwkq`
    },
    {
      name: `description`,
      id: `rb8ja`
    },
    {
      name: `status`,
      id: `wapd_`
    },
    {
      name: `statusdate`,
      id: `g2ym6`
    },
    {
      name: `siteid`,
      id: `xbxwj`
    },
    {
      name: `orgid`,
      id: `jwvm6`
    },
    {
      name: `worktype`,
      id: `j9knn`
    },
    {
      name: `description_longdescription`,
      id: `jxaze`
    },
    {
      name: `wopriority`,
      id: `kzykr`
    },
    {
      name: `assetnum`,
      id: `xy3jm`
    },
    {
      name: `href`,
      id: `k66ge`
    },
    {
      name: `location.location--locationnum`,
      id: `pkb3a`
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
  isMaximoMobile: true,
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
                // end datasource - woDetailRelatedWorkOrder

                

                // begin datasource - relatedrecwo
                {
                  let options = {
  platform: `maximoMobile`,
  name: `relatedrecwo`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `relatedwo`,
    dependsOn: `woDetailRelatedWorkOrder`,
    selectionMode: `none`,
    select: `relatedreckey,relatedrecwo.description--relatedwodesc,relatedrecclass,href,relatetype.description--relatetypedesc`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `relatedreckey`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `relatedreckey`,
      'unique-id': `true`,
      id: `mygag`
    },
    {
      name: `relatedrecwo.description--relatedwodesc`,
      id: `xygy8`
    },
    {
      name: `relatedrecclass`,
      id: `z875w`
    },
    {
      name: `href`,
      id: `kwn2r`
    },
    {
      name: `relatetype.description--relatetypedesc`,
      id: `x69p4`
    },
    {
      name: `computedRelatedRecordDesc`,
      'computed-function': `computedRelatedRecordDesc`,
      id: `w86e8`,
      computed: (true),
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailRelatedWorkOrder`,
  computedFields:   {
    computedRelatedRecordDesc:     {
      computedFunction: ((item, datasource) => datasource.callController('computedRelatedRecordDesc', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new RelatedWoDataController();
bootstrapInspector.onNewController(controller, 'RelatedWoDataController', ds);
ds.registerController(controller);

                  if (!page.hasDatasource(ds)) {
                    page.registerDatasource(ds);
                  }
                }
                // end datasource - relatedrecwo

                

                // begin datasource - relatedrectkt
                {
                  let options = {
  platform: `maximoMobile`,
  name: `relatedrectkt`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `relatedticket`,
    dependsOn: `woDetailRelatedWorkOrder`,
    selectionMode: `none`,
    select: `relatedreckey,relatedrectkt.description--relatedtktdesc,relatedrecclass,relatetype.description--relatetypedesc`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `relatedreckey`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `relatedreckey`,
      'unique-id': `true`,
      id: `y9zvb`
    },
    {
      name: `relatedrectkt.description--relatedtktdesc`,
      id: `begq4`
    },
    {
      name: `relatedrecclass`,
      id: `x6jd8`
    },
    {
      name: `relatetype.description--relatetypedesc`,
      id: `jjbgq`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailRelatedWorkOrder`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - relatedrectkt

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'map' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'map', clearStack: true, parent: app, route: '/map/*', title: app.getLocalizedLabel("map_title", "map"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({}, 'page'), {});

        
              {
                let controller = new MapPageController();
                bootstrapInspector.onNewController(controller, 'MapPageController', page);
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
      

      // setup the 'assetWorkOrder' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'assetWorkOrder', clearStack: false, parent: app, route: '/assetWorkOrder/*', title: app.getLocalizedLabel("assetWorkOrder_title", "Asset and location history"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"isAsset":false,"isLocation":false}, 'page'), {});

        
              {
                let controller = new AssetWoController();
                bootstrapInspector.onNewController(controller, 'AssetWoController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - assetWorkOrderList
                {
                  let options = {
  name: `assetWorkOrderList`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `AssetWoItems`,
  schemaExt:   [
    {
      name: `wonum`,
      id: `den98`
    },
    {
      name: `description`,
      id: `dw9na`
    },
    {
      name: `status`,
      id: `yebjr`
    },
    {
      name: `status_description`,
      id: `wnr_j`
    },
    {
      name: `worktype`,
      id: `x65mr`
    },
    {
      name: `computedWorkTypeWonum`,
      id: `yjd2z`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `wonum`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `wonum,description,status,status_description,worktype,computedWorkTypeWonum`,
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
                // end datasource - assetWorkOrderList

                

                // begin datasource - locationWorkOrderList
                {
                  let options = {
  name: `locationWorkOrderList`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `LocationWoItems`,
  schemaExt:   [
    {
      name: `wonum`,
      id: `yqe76`
    },
    {
      name: `description`,
      id: `ez74d`
    },
    {
      name: `status`,
      id: `bbmwy`
    },
    {
      name: `status_description`,
      id: `rqp_e`
    },
    {
      name: `worktype`,
      id: `py6pq`
    },
    {
      name: `computedWorkTypeWonum`,
      id: `gwqkn`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `wonum`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `wonum,description,status,status_description,worktype,computedWorkTypeWonum`,
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
                // end datasource - locationWorkOrderList

                
          
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'woedit' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'woedit', clearStack: false, parent: app, route: '/woedit/*', title: app.getLocalizedLabel("woedit_title", "woedit"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"minPriority":0,"maxPriority":999,"useConfirmDialog":true,"validateEstimatedDuration":false,"minEstimatedDuration":0}, 'page'), {});

        
              {
                let controller = new WorkOrderEditController();
                bootstrapInspector.onNewController(controller, 'WorkOrderEditController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - dsWoedit
                {
                  let options = {
  name: `dsWoedit`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `workorderid`,
      title: (app.getLocalizedLabel("rbamw_title", "workorderid")),
      'unique-id': `true`,
      id: `rbamw`
    },
    {
      name: `wonum`,
      title: (app.getLocalizedLabel("b3aar_title", "wonum")),
      id: `b3aar`
    },
    {
      name: `description`,
      title: (app.getLocalizedLabel("jzyej_title", "description")),
      id: `jzyej`
    },
    {
      name: `description_longdescription`,
      title: (app.getLocalizedLabel("wx24__title", "longdescription")),
      id: `wx24_`
    },
    {
      name: `wopriority`,
      title: (app.getLocalizedLabel("rgzm8_title", "priority")),
      id: `rgzm8`
    },
    {
      name: `schedstart`,
      title: (app.getLocalizedLabel("vv6dq_title", "shceduled start")),
      id: `vv6dq`
    },
    {
      name: `schedfinish`,
      title: (app.getLocalizedLabel("nnv6n_title", "scheduled finish")),
      id: `nnv6n`
    },
    {
      name: `worktype`,
      title: (app.getLocalizedLabel("d7b3a_title", "worktype")),
      id: `d7b3a`
    },
    {
      name: `estdur`,
      id: `gy265`
    },
    {
      name: `orgid`,
      id: `e6pe8`
    },
    {
      name: `woclass`,
      id: `gbq2a`
    },
    {
      name: `assetnum`,
      id: `ed9xp`
    },
    {
      name: `assetdesc`,
      id: `rqr49`
    },
    {
      name: `locationnum`,
      id: `qy45w`
    },
    {
      name: `locationdesc`,
      id: `na3kz`
    },
    {
      name: `href`,
      id: `mayrx`
    },
    {
      name: `failurecode`,
      id: `ebnn_`
    },
    {
      name: `assetlocpriority`,
      id: `zkvpy`
    },
    {
      name: `glaccount`,
      id: `mmkrk`
    },
    {
      name: `startyoffsetref`,
      id: `e3prb`
    },
    {
      name: `endyoffsetref`,
      id: `mz_vm`
    },
    {
      name: `startAssetFeatureId`,
      id: `q6xqw`
    },
    {
      name: `endAssetFeatureId`,
      id: `w38k8`
    },
    {
      name: `startzoffsetref`,
      id: `w9vp9`
    },
    {
      name: `endzoffsetref`,
      id: `mq876`
    },
    {
      name: `startfeaturelabel`,
      id: `prd_g`
    },
    {
      name: `endfeaturelabel`,
      id: `ykzke`
    },
    {
      name: `startoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `da5wv`
    },
    {
      name: `endoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `x9b3j`
    },
    {
      name: `startmeasure`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `env2d`
    },
    {
      name: `endmeasure`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `nnm6y`
    },
    {
      name: `startyoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `k3yb8`
    },
    {
      name: `endyoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `bqevb`
    },
    {
      name: `startzoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `j2da2`
    },
    {
      name: `endzoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `b6p_2`
    },
    {
      name: `multiassetlocci`,
      id: `zery_`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `workorderid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `workorderid,wonum,description,description_longdescription,wopriority,schedstart,schedfinish,worktype,estdur,orgid,woclass,assetnum,assetdesc,locationnum,locationdesc,href,failurecode,assetlocpriority,glaccount,startyoffsetref,endyoffsetref,startAssetFeatureId,endAssetFeatureId,startzoffsetref,endzoffsetref,startfeaturelabel,endfeaturelabel,startoffset,endoffset,startmeasure,endmeasure,startyoffset,endyoffset,startzoffset,endzoffset,multiassetlocci`,
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
                // end datasource - dsWoedit

                

                // begin datasource - newWorkOrderds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `newWorkOrderds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: `wonum="0"`,
    idAttribute: `workorderid`,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `newWorkOrderds`,
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
      sortable: `false`,
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
  isMaximoMobile: true,
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
                // end datasource - newWorkOrderds

                
          
                // begin dialog - woDetailsEditDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `woDetailsEditDialog`,
  configuration:   {
    id: `woDetailsEditDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogWoDetailsEditDialog id={"woDetailsEditDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - woDetailsEditDialog
                

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
                  
                  page.registerDialog(dialog);
                }
                // end dialog - workTypeLookup
                

                // begin dialog - saveDiscardDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardDialog`,
  configuration:   {
    id: `saveDiscardDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardDialog id={"saveDiscardDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardDialog
                

                // begin dialog - sysMsgDialog_woedit
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `sysMsgDialog_woedit`,
  configuration:   {
    id: `sysMsgDialog_woedit`,
    dialogRenderer: ((props => {
    return (
      <DialogSysMsgDialog_woedit id={"sysMsgDialog_woedit_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - sysMsgDialog_woedit
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'createwo' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'createwo', clearStack: false, parent: app, route: '/createwo/*', title: 'createwo', usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"minPriority":0,"maxPriority":999,"useConfirmDialog":true,"validateEstimatedDuration":false,"minEstimatedDuration":0,"quickReport":false}, 'page'), {});

        
              {
                let controller = new WorkOrderCreateController();
                bootstrapInspector.onNewController(controller, 'WorkOrderCreateController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - dsCreateWo
                {
                  let options = {
  platform: `maximoMobile`,
  name: `dsCreateWo`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: `wonum="0"`,
    itemUrl: (app.device.isMaximoMobile ? 'nohref' : undefined),
    autoSave: false,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dsCreateWo`,
    searchAttributes:     [
`workorderid`,
`wonum`,
`siteid`
    ],
    indexAttributes:     [
`workorderid`,
`wonum`,
`siteid`
    ],
    select: `workorderid,wonum,description,description_longdescription,wopriority,schedstart,schedfinish,worktype,glaccount,estdur,orgid,woclass,siteid,woclass_maxvalue,woclass_description,status,status_maxvalue,status_description,asset.description--assetdesc,location.description--locationdesc,statusdate,reportedby,reportdate,assetnum,location,failurecode,assetlocpriority,startyoffsetref,endyoffsetref,startzoffsetref,endzoffsetref,endAssetFeatureId,startfeaturelabel,endfeaturelabel,startoffset,endoffset,startmeasure,endmeasure,startyoffset,endyoffset,startzoffset,endzoffset,startassetfeatureid,endassetfeatureid`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderid`,
      searchable: `true`,
      'unique-id': `true`,
      id: `bj6qp`
    },
    {
      name: `wonum`,
      searchable: `true`,
      id: `n52n8`
    },
    {
      name: `description`,
      'max-length': `100`,
      id: `y7g99`
    },
    {
      name: `description_longdescription`,
      id: `r8gpn`
    },
    {
      name: `wopriority`,
      id: `ye34g`
    },
    {
      name: `schedstart`,
      'sub-type': `DATETIME`,
      id: `xd5k8`
    },
    {
      name: `schedfinish`,
      'sub-type': `DATETIME`,
      id: `v6_mw`
    },
    {
      name: `worktype`,
      id: `y6nm_`
    },
    {
      name: `glaccount`,
      sortable: `false`,
      id: `xez22`
    },
    {
      name: `estdur`,
      'sub-type': `DURATION`,
      id: `q27_n`
    },
    {
      name: `orgid`,
      id: `d_5qk`
    },
    {
      name: `woclass`,
      id: `y2xkq`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `b2vn9`
    },
    {
      name: `woclass_maxvalue`,
      id: `njbxd`
    },
    {
      name: `woclass_description`,
      id: `x_j2k`
    },
    {
      name: `status`,
      id: `ykz6e`
    },
    {
      name: `status_maxvalue`,
      id: `g3jwx`
    },
    {
      name: `status_description`,
      id: `g7pjk`
    },
    {
      name: `asset.description--assetdesc`,
      id: `g48mq`
    },
    {
      name: `location.description--locationdesc`,
      id: `nkjbq`
    },
    {
      name: `statusdate`,
      id: `p52as`
    },
    {
      name: `reportedby`,
      id: `brb_z`
    },
    {
      name: `reportdate`,
      'sub-type': `DATETIME`,
      id: `ba7kj`
    },
    {
      name: `assetnum`,
      id: `gv96g`
    },
    {
      name: `location`,
      id: `jz7n7`
    },
    {
      name: `failurecode`,
      id: `rq2zd`
    },
    {
      name: `assetlocpriority`,
      id: `nejzq`
    },
    {
      name: `startyoffsetref`,
      id: `nzjjd`
    },
    {
      name: `endyoffsetref`,
      id: `qe344`
    },
    {
      name: `startzoffsetref`,
      id: `nzz3v`
    },
    {
      name: `endzoffsetref`,
      id: `wawv2`
    },
    {
      name: `endAssetFeatureId`,
      id: `e77e2`
    },
    {
      name: `startfeaturelabel`,
      id: `rjrq3`
    },
    {
      name: `endfeaturelabel`,
      id: `w_epp`
    },
    {
      name: `startoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `dbq2v`
    },
    {
      name: `endoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `r6ga7`
    },
    {
      name: `startmeasure`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `da87b`
    },
    {
      name: `endmeasure`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `v6_yp`
    },
    {
      name: `startyoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `avk6p`
    },
    {
      name: `endyoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `kna35`
    },
    {
      name: `startzoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `p8dxr`
    },
    {
      name: `endzoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `dq5p7`
    },
    {
      name: `startassetfeatureid`,
      id: `qqexe`
    },
    {
      name: `endassetfeatureid`,
      id: `jr8kw`
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
      lastValue: (app.device.isMaximoMobile ? 'nohref' : undefined),
      check: (()=>{return app.device.isMaximoMobile ? 'nohref' : undefined})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - dsCreateWo

                
          
                // begin dialog - longdsEditDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `longdsEditDialog`,
  configuration:   {
    id: `longdsEditDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogLongdsEditDialog id={"longdsEditDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - longdsEditDialog
                

                // begin dialog - workTyLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `workTyLookup`,
  configuration:   {
    id: `workTyLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupWorkTyLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupWorkTyLookup {...props} />
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
                // end dialog - workTyLookup
                

                // begin dialog - saveDiscardDialogCreatePage
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardDialogCreatePage`,
  configuration:   {
    id: `saveDiscardDialogCreatePage`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardDialogCreatePage id={"saveDiscardDialogCreatePage_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardDialogCreatePage
                

                // begin dialog - sysMsgDialog_createwo
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `sysMsgDialog_createwo`,
  configuration:   {
    id: `sysMsgDialog_createwo`,
    dialogRenderer: ((props => {
    return (
      <DialogSysMsgDialog_createwo id={"sysMsgDialog_createwo_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - sysMsgDialog_createwo
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'datasheets' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'datasheets', clearStack: false, parent: app, route: '/datasheets/*', title: app.getLocalizedLabel("datasheets_title", "Mob Calibration"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"datasheetlistds":"","dataSheetTitle":"","loading":false,"autoupdate":false}, 'page'), {"dataSheetTitle":{"name":"dataSheetTitle","type":"string","url-alias":"title","url-enabled":"true","id":"gzd85","_originalId":"gzd85"}});

        
              {
                let controller = new v_calibration_DataSheetListController();
                bootstrapInspector.onNewController(controller, 'v_calibration_DataSheetListController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - changeStatusList
                {
                  let options = {
  name: `changeStatusList`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `statusItems`,
  schemaExt:   [
    {
      name: `value`,
      id: `mj9kg`
    },
    {
      name: `description`,
      id: `az48k`
    },
    {
      name: `maxvalue`,
      id: `a4_np`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `value`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `value,description,maxvalue`,
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
                // end datasource - changeStatusList

                
          
                // begin dialog - dataSheetStatusDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `dataSheetStatusDialog`,
  configuration:   {
    id: `dataSheetStatusDialog`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerDataSheetStatusDialog slidingDrawerProps={props} id={"dataSheetStatusDialog_slidingdrawer_container"}  />
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
                // end dialog - dataSheetStatusDialog
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'assetfunctions' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'assetfunctions', clearStack: false, parent: app, route: '/assetfunctions/*', title: app.getLocalizedLabel("assetfunctions_title", "Asset Function"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"assetFunctionsDetailsDS":"","assetfunctiontitle":"","loading":"false","selectedStatus":"","assetfunction":"","condition":""}, 'page'), {});

        
              {
                let controller = new v_calibration_AssetFunctionsController();
                bootstrapInspector.onNewController(controller, 'v_calibration_AssetFunctionsController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - unitsLookupDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `unitsLookupDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `single`,
    objectStructure: `mxapialndomain`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `unitsLookupDs`,
    searchAttributes:     [
`domainid`
    ],
    indexAttributes:     [
`domainid`
    ],
    select: `value,valueid,description,domainid,siteid,orgid`
  },
  objectStructure: `mxapialndomain`,
  idAttribute: `value`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      'unique-id': `true`,
      id: `m9aer`
    },
    {
      name: `valueid`,
      id: `qpj2b`
    },
    {
      name: `description`,
      id: `nwnve`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `ervzg`
    },
    {
      name: `siteid`,
      id: `v345y`
    },
    {
      name: `orgid`,
      id: `q3erp`
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
  isMaximoMobile: true,
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
                // end datasource - unitsLookupDs

                

                // begin datasource - assetFunctionStatusListDS
                {
                  let options = {
  name: `assetFunctionStatusListDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  items: `statusItems`,
  schemaExt:   [
    {
      name: `value`,
      id: `oicwufgd`
    },
    {
      name: `description`,
      id: `fsnppibe`
    },
    {
      name: `maxvalue`,
      id: `ybhicii6`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `value`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `value,description,maxvalue`,
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
                // end datasource - assetFunctionStatusListDS

                
          
                // begin dialog - unitsLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `unitsLookup`,
  configuration:   {
    id: `unitsLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupUnitsLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupUnitsLookup {...props} />
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
                // end dialog - unitsLookup
                

                // begin dialog - noAdjLimit
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `noAdjLimit`,
  configuration:   {
    id: `noAdjLimit`,
    dialogRenderer: ((props => {
    return (
      <DialogNoAdjLimit id={"noAdjLimit_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - noAdjLimit
                

                // begin dialog - noAdjLimitOff
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `noAdjLimitOff`,
  configuration:   {
    id: `noAdjLimitOff`,
    dialogRenderer: ((props => {
    return (
      <DialogNoAdjLimitOff id={"noAdjLimitOff_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - noAdjLimitOff
                

                // begin dialog - assetFunctionStatusDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `assetFunctionStatusDialog`,
  configuration:   {
    id: `assetFunctionStatusDialog`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerAssetFunctionStatusDialog slidingDrawerProps={props} id={"assetFunctionStatusDialog_slidingdrawer_container"}  />
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
                // end dialog - assetFunctionStatusDialog
                

                // begin dialog - EnvironmentalConditionsDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `EnvironmentalConditionsDialog`,
  configuration:   {
    id: `EnvironmentalConditionsDialog`,
    type: `slidingDrawer`,
    align: `start`,
    renderer: ((props => {
    return (
      <SlidingDrawerEnvironmentalConditionsDialog slidingDrawerProps={props} id={"EnvironmentalConditionsDialog_slidingdrawer_container"}  />
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
                // end dialog - EnvironmentalConditionsDialog
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'calibrationpoints' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'calibrationpoints', clearStack: false, parent: app, route: '/calibrationpoints/*', title: app.getLocalizedLabel("calibrationpoints_title", "As found values"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"functionDesc":"","asserterror":false,"calpointtitle":"","saveInProgress":false,"isNoAdjMadeEnabled":false,"isdirty":false}, 'page'), {});

        
              {
                let controller = new v_calibration_CalibrationPointsController();
                bootstrapInspector.onNewController(controller, 'v_calibration_CalibrationPointsController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - unitspointLookupDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `unitspointLookupDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `single`,
    objectStructure: `mxapialndomain`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `unitspointLookupDs`,
    searchAttributes:     [
`domainid`
    ],
    indexAttributes:     [
`domainid`
    ],
    select: `value,valueid,description,domainid,siteid,orgid`
  },
  objectStructure: `mxapialndomain`,
  idAttribute: `value`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      'unique-id': `true`,
      id: `wnqxa`
    },
    {
      name: `tolError`,
      computed: (true),
      'computed-function': `calculateTolError`,
      id: `jy27q`,
      local: (true)
    },
    {
      name: `valueid`,
      id: `e9n3d`
    },
    {
      name: `description`,
      id: `r479m`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `x3grq`
    },
    {
      name: `siteid`,
      id: `e84wy`
    },
    {
      name: `orgid`,
      id: `x_8ex`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    tolError:     {
      computedFunction: ((item, datasource) => datasource.callController('calculateTolError', item))
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
  isMaximoMobile: true,
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
                // end datasource - unitspointLookupDs

                
          
                // begin dialog - unitspointLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `unitspointLookup`,
  configuration:   {
    id: `unitspointLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupUnitspointLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupUnitspointLookup {...props} />
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
                // end dialog - unitspointLookup
                

                // begin dialog - saveDiscardRules
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveDiscardRules`,
  configuration:   {
    id: `saveDiscardRules`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveDiscardRules id={"saveDiscardRules_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveDiscardRules
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'calibrationasleftpoints' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'calibrationasleftpoints', clearStack: false, parent: app, route: '/calibrationasleftpoints/*', title: app.getLocalizedLabel("calibrationasleftpoints_title", "As left values"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"functionDesc":"","asleftcalstatus":"","asserterror":false,"calpointtitle":"","isNoAdjMadeEnabled":false,"saveInProgress":false,"isdirty":false}, 'page'), {});

        
              {
                let controller = new v_calibration_CalibrationPointsController();
                bootstrapInspector.onNewController(controller, 'v_calibration_CalibrationPointsController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
                // begin datasource - unitspointsLookupDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `unitspointsLookupDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `single`,
    objectStructure: `mxapialndomain`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `unitspointsLookupDs`,
    searchAttributes:     [
`domainid`
    ],
    indexAttributes:     [
`domainid`
    ],
    select: `value,valueid,description,domainid,siteid,orgid`
  },
  objectStructure: `mxapialndomain`,
  idAttribute: `value`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      'unique-id': `true`,
      id: `vxznv`
    },
    {
      name: `tolError`,
      computed: (true),
      'computed-function': `calculateTolError`,
      id: `j4yx4`,
      local: (true)
    },
    {
      name: `valueid`,
      id: `d8yw4`
    },
    {
      name: `description`,
      id: `m_njj`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `b2yxg`
    },
    {
      name: `siteid`,
      id: `k75ym`
    },
    {
      name: `orgid`,
      id: `j3zwv`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {
    tolError:     {
      computedFunction: ((item, datasource) => datasource.callController('calculateTolError', item))
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
  isMaximoMobile: true,
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
                // end datasource - unitspointsLookupDs

                
          
                // begin dialog - unitspointsLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `unitspointsLookup`,
  configuration:   {
    id: `unitspointsLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupUnitspointsLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupUnitspointsLookup {...props} />
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
                // end dialog - unitspointsLookup
                

                // begin dialog - saveAsLeftDiscardRules
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `saveAsLeftDiscardRules`,
  configuration:   {
    id: `saveAsLeftDiscardRules`,
    dialogRenderer: ((props => {
    return (
      <DialogSaveAsLeftDiscardRules id={"saveAsLeftDiscardRules_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - saveAsLeftDiscardRules
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

      // setup the 'calpointrepeatable' page
      page = bootstrapInspector.onNewPage(new Page(bootstrapInspector.onNewPageOptions({name:'calpointrepeatable', clearStack: false, parent: app, route: '/calpointrepeatable/*', title: app.getLocalizedLabel("calpointrepeatable_title", "REPEATABLE"), usageId: undefined, contextId: undefined})));

      page.addInitializer(
      (page, app) => {
        page.setState(bootstrapInspector.onNewState({"asserterror":true,"assetfunction":"","calpointtitle":"","colwidth":"","condition":"","dsconfig":"","focusedItem":"","formvalid":true,"groupedCalpointsDS":"","isdirty":false,"loading":"false","padding":"","saving":false,"title":""}, 'page'), {});

        
              {
                let controller = new v_calibration_CalibrationPointsRepeatableController();
                bootstrapInspector.onNewController(controller, 'v_calibration_CalibrationPointsRepeatableController', page);
                page.registerController(controller);

                // allow the page controller to bind to application lifecycle events
                // but prevent re-registering page events on the controller.
                app.registerLifecycleEvents(controller, false);
              }
          

          
          
                // begin dialog - discardChanges
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `discardChanges`,
  configuration:   {
    id: `discardChanges`,
    dialogRenderer: ((props => {
    return (
      <DialogDiscardChanges id={"discardChanges_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - discardChanges
                
      }

    )

      // register the page with the application
      if (!app.hasPage(page)) {
        app.registerPage(page);
      }
      

    app.setRoutesForApplication(() => {return [
  {
    id: `schedule_w6_yq`,
    label: (app.getLocalizedLabel("w6_yq_label", "My Schedule")),
    icon: ("maximo:schedule"),
    application: `techmobile`,
    name: `schedule`,
    hidden: (undefined),
    onClick: ((event)=>{eventManager.emit('change-page', {name: 'schedule' }, event)}),
    page: `schedule`,
    content: (app.getLocalizedLabel("w6_yq_label", "My Schedule"))
  },
  {
    id: `materials_r9zjz`,
    label: (app.getLocalizedLabel("r9zjz_label", "Materials & Tools")),
    icon: ("maximo:materialsandtools"),
    application: `techmobile`,
    name: `materials`,
    hidden: (undefined),
    onClick: ((event)=>{eventManager.emit('change-page', {name: 'materials' }, event)}),
    page: `materials`,
    content: (app.getLocalizedLabel("r9zjz_label", "Materials & Tools"))
  },
  {
    id: `map_xb5jv`,
    label: (app.getLocalizedLabel("xb5jv_label", "Map")),
    icon: ("maximo:map"),
    application: `techmobile`,
    name: `map`,
    hidden: (undefined),
    onClick: ((event)=>{eventManager.emit('change-page', {name: 'map' }, event)}),
    page: `map`,
    content: (app.getLocalizedLabel("xb5jv_label", "Map"))
  },
  {
    id: `createworkorder_xv8pg`,
    label: (app.getLocalizedLabel("xv8pg_label", "Create work order")),
    icon: ("maximo:add--record"),
    application: `techmobile`,
    name: `createworkorder`,
    hidden: ((!app.checkSigOption("MXAPIWODETAIL.createnewwo"))),
    onClick: ((event)=>{eventManager.emit('change-page', {name: 'createworkorder' }, event)}),
    actionType: `add`,
    page: `createworkorder`,
    content: (app.getLocalizedLabel("xv8pg_label", "Create work order"))
  },
  {
    id: `quickreport_xv8pg1`,
    label: (app.getLocalizedLabel("xv8pg1_label", "New work order (via Quick Reporting)")),
    icon: ("maximo:add--record"),
    application: `techmobile`,
    name: `quickreport`,
    hidden: ((!app.checkSigOption("MXAPIWODETAIL.quickrep"))),
    onClick: ((event)=>{eventManager.emit('change-page', {name: 'quickreport' }, event)}),
    actionType: `add`,
    page: `quickreport`,
    content: (app.getLocalizedLabel("xv8pg1_label", "New work order (via Quick Reporting)"))
  },
  {
    id: `startcenterapp`,
    label: (app.getLocalizedLabel("startcntr_route_label", "Start Center")),
    icon: ("maximo:start-center"),
    application: `techmobile`,
    name: `startCenter`,
    hidden: (!(app?.options?.isMaximoApp && !app.device.isMaximoMobile && app.options.theme==="touch")),
    onClick: ((event)=>{app.appSwitcher.gotoApplication('STARTCNTR', null, {ignoreCheck: true, preserveCurrentState: false});}),
    page: `startCenter`,
    content: (app.getLocalizedLabel("startcntr_route_label", "Start Center"))
  }
];});
    
                // begin datasource - woDetailCalibration
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woDetailCalibration`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    default: true,
    itemUrl: (app.state.dataSheethref),
    idAttribute: `workorderid`,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woDetailCalibration`,
    select: `workorderid,wonum,siteid,href,assetnum`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `m_8a5`
    },
    {
      name: `wonum`,
      id: `k8g3p`
    },
    {
      name: `siteid`,
      id: `ea8pv`
    },
    {
      name: `href`,
      id: `rp26p`
    },
    {
      name: `assetnum`,
      id: `ybp63`
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
      lastValue: (app.state.dataSheethref),
      check: (()=>{return app.state.dataSheethref})
    }
  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - woDetailCalibration

                

                // begin datasource - pluscWoDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `pluscWoDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    idAttribute: `pluscwodsid`,
    objectName: `pluscwods`,
    relationship: `pluscwods`,
    dependsOn: `woDetailCalibration`,
    selectionMode: `single`,
    select: `href,wonum,pluscwodsid,wodsnum,dsplannum,description,certificatenum,asfoundcomments,asfoundcalstatus,asleftcalstatus,aslefterror,asfounderror,temperature,humidity,baropressure,temperatureeu,humidityeu,baropressureeu,required,revisionnum,pluscwodsinstr{href,revisionnum,dsplannum,pluscwodsinstrid,description,plantype,asfoundcalstatus,asleftcalstatus,asfounderror,aslefterror,instrcalrangefrom,instrcalrangeto,instroutrangefrom,instroutrangeto,inputprecision,ron1lowervalue,ron1uppervalue,cliplimitsin,outputprecision,outputrange,inputrange,cliplimits,tol1lowervalue,tol1uppervalue,tol1type,tol1status,tol2lowervalue,tol2uppervalue,tol2type,tol2status,tol3lowervalue,tol3uppervalue,tol3type,tol3status,tol4lowervalue,tol4uppervalue,tol4type,tol4status,instrcalrangeeu,instroutrangeeu,ron1type,caldynamic,calpoint,calfunction,repeatable,noadjmade, noadjmadechoice1,processeu,instroutrangeeu,nonlinear,instrcalrangeeu,processeufactor,squareroot,squared,tol1sumdirection,tol2sumdirection,tol3sumdirection,tol4sumdirection,tol1sumeu,tol2sumeu,tol3sumeu,tol4sumeu,tol1sumspan,tol2sumspan,tol3sumspan,tol4sumspan,tol1sumurv,tol2sumurv,tol3sumurv,tol4sumurv,tol1sumread,tol2sumread,tol3sumread,tol4sumread,gbfrom1,gbfrom2,gbfrom3,gbfrom4,gbto1,gbto2,gbto3,gbto4,gbsumdirection1,gbsumdirection2,gbsumdirection3,gbsumdirection4,gbmethod,guardband,pluscwodspoint{pluscwodspointid,wodsnum,asfinputstddev,asfounderror1,asfounderror2,asfounderror3,asfounderror4,asfoundfail,asfoundinput,asfoundouterror,asfoundoutput,asfoundpass,asfoundproerror,asfoundsetpoint,asfoundstatus,asfoundtol1lower,asfoundtol1upper,asfoundtol2lower,asfoundtol2upper,asfoundtol3lower,asfoundtol3upper,asfoundtol4lower,asfoundtol4upper,asfoundunit,asfoutputstddev,asfsetptstddev,aslefterror1,aslefterror2,aslefterror3,aslefterror4,asleftfail,asleftinput,asleftouterror,asleftoutput,asleftpass,asleftproerror,asleftsetpoint,asleftstatus,aslefttol1lower,aslefttol1upper,aslefttol2lower,aslefttol2upper,aslefttol3lower,aslefttol3upper,aslefttol4lower,aslefttol4upper,asleftunit,aslinputstddev,asloutputstddev,aslsetptstddev,href,inputvalue,inputvalue_np,instrumentdesc,instrumentfunction,isaverage,outputvalue,outputvalue_np,plantype,pluscwodspointidpoint,point,pointdescription,setpointvalue,ron1lower,ron1upper}}`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `pluscwodsid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `href`,
      id: `j7kmp`
    },
    {
      name: `wonum`,
      id: `yxm48`
    },
    {
      name: `pluscwodsid`,
      'unique-id': `true`,
      id: `pluscWoDs_pluscwodsid`
    },
    {
      name: `wodsnum`,
      id: `w35kp`
    },
    {
      name: `dsplannum`,
      id: `dxb_5`
    },
    {
      name: `description`,
      id: `qe5gq`
    },
    {
      name: `certificatenum`,
      id: `v7z5m`
    },
    {
      name: `asfoundcomments`,
      id: `armbq`
    },
    {
      name: `asfoundcalstatus`,
      id: `k2ydj`
    },
    {
      name: `asleftcalstatus`,
      id: `va6wb`
    },
    {
      name: `aslefterror`,
      id: `b_n22`
    },
    {
      name: `asfounderror`,
      id: `bred8`
    },
    {
      name: `temperature`,
      id: `kz2n6`
    },
    {
      name: `humidity`,
      id: `a3n4r`
    },
    {
      name: `baropressure`,
      id: `n37z6`
    },
    {
      name: `temperatureeu`,
      id: `dmw5q`
    },
    {
      name: `humidityeu`,
      id: `zqdjv`
    },
    {
      name: `baropressureeu`,
      id: `m829k`
    },
    {
      name: `required`,
      id: `jwjpk`
    },
    {
      name: `revisionnum`,
      id: `w35kp1`
    },
    {
      name: `pluscwodsinstr{href,revisionnum,dsplannum,pluscwodsinstrid,description,plantype,asfoundcalstatus,asleftcalstatus,asfounderror,aslefterror,instrcalrangefrom,instrcalrangeto,instroutrangefrom,instroutrangeto,inputprecision,ron1lowervalue,ron1uppervalue,cliplimitsin,outputprecision,outputrange,inputrange,cliplimits,tol1lowervalue,tol1uppervalue,tol1type,tol1status,tol2lowervalue,tol2uppervalue,tol2type,tol2status,tol3lowervalue,tol3uppervalue,tol3type,tol3status,tol4lowervalue,tol4uppervalue,tol4type,tol4status,instrcalrangeeu,instroutrangeeu,ron1type,caldynamic,calpoint,calfunction,repeatable,noadjmade, noadjmadechoice1,processeu,instroutrangeeu,nonlinear,instrcalrangeeu,processeufactor,squareroot,squared,tol1sumdirection,tol2sumdirection,tol3sumdirection,tol4sumdirection,tol1sumeu,tol2sumeu,tol3sumeu,tol4sumeu,tol1sumspan,tol2sumspan,tol3sumspan,tol4sumspan,tol1sumurv,tol2sumurv,tol3sumurv,tol4sumurv,tol1sumread,tol2sumread,tol3sumread,tol4sumread,gbfrom1,gbfrom2,gbfrom3,gbfrom4,gbto1,gbto2,gbto3,gbto4,gbsumdirection1,gbsumdirection2,gbsumdirection3,gbsumdirection4,gbmethod,guardband,pluscwodspoint{pluscwodspointid,wodsnum,asfinputstddev,asfounderror1,asfounderror2,asfounderror3,asfounderror4,asfoundfail,asfoundinput,asfoundouterror,asfoundoutput,asfoundpass,asfoundproerror,asfoundsetpoint,asfoundstatus,asfoundtol1lower,asfoundtol1upper,asfoundtol2lower,asfoundtol2upper,asfoundtol3lower,asfoundtol3upper,asfoundtol4lower,asfoundtol4upper,asfoundunit,asfoutputstddev,asfsetptstddev,aslefterror1,aslefterror2,aslefterror3,aslefterror4,asleftfail,asleftinput,asleftouterror,asleftoutput,asleftpass,asleftproerror,asleftsetpoint,asleftstatus,aslefttol1lower,aslefttol1upper,aslefttol2lower,aslefttol2upper,aslefttol3lower,aslefttol3upper,aslefttol4lower,aslefttol4upper,asleftunit,aslinputstddev,asloutputstddev,aslsetptstddev,href,inputvalue,inputvalue_np,instrumentdesc,instrumentfunction,isaverage,outputvalue,outputvalue_np,plantype,pluscwodspointidpoint,point,pointdescription,setpointvalue,ron1lower,ron1upper}}`,
      id: `qrwjm`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailCalibration`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - pluscWoDs

                

                // begin datasource - dsconfig
                {
                  let options = {
  platform: `maximoMobile`,
  name: `dsconfig`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 200,
  debounceTime: 100,
  query:   {
    pageSize: 200,
    selectionMode: `single`,
    orderBy: `pluscdsconfigid`,
    objectStructure: `MXPLUSCDSCONFIG`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dsconfig`,
    select: `asseterror,assetnplaces,assettruncate,dsplannum,outputtruncate,pluscdsconfigid,rangetruncate,repeatvalue,revisionnum,stddev,tolerror,tolnplaces,toltruncate`
  },
  objectStructure: `MXPLUSCDSCONFIG`,
  idAttribute: `pluscdsconfigid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `asseterror`,
      id: `dsconfig_asseterror`
    },
    {
      name: `assetnplaces`,
      id: `dsconfig_assetnplaces`
    },
    {
      name: `assettruncate`,
      id: `dsconfig_assettruncate`
    },
    {
      name: `dsplannum`,
      id: `dsconfig_dsplannum`
    },
    {
      name: `outputtruncate`,
      id: `dsconfig_outputtruncate`
    },
    {
      name: `pluscdsconfigid`,
      'unique-id': `true`,
      id: `dsconfig_pluscdsconfigid`
    },
    {
      name: `rangetruncate`,
      id: `dsconfig_rangetruncate`
    },
    {
      name: `repeatvalue`,
      id: `dsconfig_repeatvalue`
    },
    {
      name: `revisionnum`,
      id: `dsconfig_revisionnum`
    },
    {
      name: `stddev`,
      id: `dsconfig_stddev`
    },
    {
      name: `tolerror`,
      id: `dsconfig_tolerror`
    },
    {
      name: `tolnplaces`,
      id: `dsconfig_tolnplaces`
    },
    {
      name: `toltruncate`,
      id: `dsconfig_toltruncate`
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
  isMaximoMobile: true,
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
                // end datasource - dsconfig

                

                // begin datasource - synonymdomainData
                {
                  let options = {
  platform: `maximoMobile`,
  name: `synonymdomainData`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    orderBy: `value`,
    objectStructure: `mxapisynonymdomain`,
    savedQuery: `MOBILEDOMAIN`,
    lookupData: true,
    offlineImmediateDownload: true,
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
      id: `xp2e9`
    },
    {
      name: `maxvalue`,
      searchable: `true`,
      id: `g58pj`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `wwwzq`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `m2ebr`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `aakrv`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `r27qk`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `wz5gx`
    },
    {
      name: `defaults`,
      id: `avz96`
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
  isMaximoMobile: true,
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

                

                // begin datasource - domaincalstatusds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `domaincalstatusds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    where: `domainid="PLUSCCALSTATUS"`,
    savedQuery: `MOBILEDOMAIN`,
    select: `value,maxvalue,description,domainid,valueid,siteid,orgid,defaults`,
    sortAttributes:     [

    ],
    searchAttributes:     [
`value`,
`maxvalue`,
`description`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ],
    selectionMode: `single`,
    orderBy: `value`,
    objectStructure: `mxapisynonymdomain`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `synonymdomainData`,
    indexAttributes:     [
`value`,
`maxvalue`,
`description`,
`domainid`,
`valueid`,
`siteid`,
`orgid`
    ]
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
      id: `xp2e9`
    },
    {
      name: `maxvalue`,
      searchable: `true`,
      id: `g58pj`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `wwwzq`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `m2ebr`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `aakrv`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `r27qk`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `wz5gx`
    },
    {
      name: `defaults`,
      id: `avz96`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `synonymdomainData`,
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
  isMaximoMobile: true,
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
                // end datasource - domaincalstatusds

                

                // begin datasource - rejectdomainData
                {
                  let options = {
  platform: `maximoMobile`,
  name: `rejectdomainData`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `single`,
    objectStructure: `mxapialndomain`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `rejectdomainData`,
    searchAttributes:     [
`domainid`
    ],
    indexAttributes:     [
`domainid`
    ],
    select: `value,valueid,description,domainid,siteid,orgid`
  },
  objectStructure: `mxapialndomain`,
  idAttribute: `value`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      'unique-id': `true`,
      id: `r7wk5`
    },
    {
      name: `valueid`,
      id: `wzn95`
    },
    {
      name: `description`,
      id: `pxzgd`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `kvxp4`
    },
    {
      name: `siteid`,
      id: `n9nj_`
    },
    {
      name: `orgid`,
      id: `bw997`
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
  isMaximoMobile: true,
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
                // end datasource - rejectdomainData

                

                // begin datasource - woDetailds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woDetailds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    objectStructure: `mxapiwodetail`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `woDetailds`,
    childFilters:     [
      {
        "workorder.showassignment.where": `labor.personid="-personid-"`,
        "workorder.showassignment.domaininternalwhere": `status=ASSIGNED`
      }
    ],
    select: `wonum,workorderid,title,description--wodesc,failurecode,siteid,href,assetnum,location.description--locationdesc,location.location--locationnum,asset.description--assetdesc,asset.assetnum--assetnumber,asset.assettype--assettype,asset.manufacturer--company,failure.description--failuredesc,classstructure.hierarchypath,status,status_description,owner,reportdate,schedstart,actstart,targstartdate,flowcontrolled,anywhererefid,rel.asset.mxapiasset{assetnum,description,islinear, plusacatid},rel.linearrelated{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},multiid,startyoffsetref,endyoffsetref,startzoffsetref,endmeasure,startmeasure,endzoffsetref,startfeaturelabel,endfeaturelabel,startoffset,endoffset},location.location--locationnum,location.description--locationdesc,worktype,splanreviewdate,assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `wonum`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      id: `km2bm`,
      name: `wonum`,
      'unique-id': `true`
    },
    {
      name: `workorderid`,
      id: `e697r`
    },
    {
      name: `title`,
      id: `ngym8`
    },
    {
      name: `description--wodesc`,
      id: `yyrnv`
    },
    {
      name: `failurecode`,
      id: `vw_qr`
    },
    {
      name: `siteid`,
      id: `a_g9d`
    },
    {
      name: `href`,
      id: `qz45k`
    },
    {
      name: `assetnum`,
      id: `vpp9n`
    },
    {
      name: `location.description--locationdesc`,
      id: `w26rd`
    },
    {
      name: `location.location--locationnum`,
      id: `ygj7x`
    },
    {
      name: `asset.description--assetdesc`,
      id: `ydp_5`
    },
    {
      name: `asset.assetnum--assetnumber`,
      id: `v3xjq`
    },
    {
      name: `asset.assettype--assettype`,
      id: `eng4z`
    },
    {
      name: `asset.manufacturer--company`,
      id: `beny_`
    },
    {
      name: `failure.description--failuredesc`,
      id: `egd35`
    },
    {
      name: `classstructure.hierarchypath`,
      id: `ajbak`
    },
    {
      name: `status`,
      id: `k62e8`
    },
    {
      name: `status_description`,
      id: `qj5nq`
    },
    {
      name: `owner`,
      id: `x473_`
    },
    {
      name: `reportdate`,
      id: `zrx_6`
    },
    {
      name: `schedstart`,
      id: `w9y3q`
    },
    {
      name: `actstart`,
      id: `d_xrk`
    },
    {
      name: `targstartdate`,
      id: `bayp7`
    },
    {
      name: `flowcontrolled`,
      id: `n5e9d`
    },
    {
      name: `anywhererefid`,
      id: `qm58n`
    },
    {
      name: `rel.asset.mxapiasset{assetnum,description,islinear, plusacatid}`,
      id: `r6k8x`
    },
    {
      name: `rel.linearrelated{rel.asset.mxapiasset{assetid,assetnum,description,autolocate},multiid,startyoffsetref,endyoffsetref,startzoffsetref,endmeasure,startmeasure,endzoffsetref,startfeaturelabel,endfeaturelabel,startoffset,endoffset}`,
      id: `j6d3d`
    },
    {
      name: `location.location--locationnum`,
      id: `bj_pv`
    },
    {
      name: `location.description--locationdesc`,
      id: `zyp27`
    },
    {
      name: `worktype`,
      id: `av2bm`
    },
    {
      name: `splanreviewdate`,
      id: `rb6qb`
    },
    {
      name: `assignment{status_maxvalue, status, laborcode, assignmentid, labor.personid}`,
      sortable: `false`,
      id: `yvdwb`
    }
  ],
  qbeAttributes:   [

  ],
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  canLoad: (()=>(app.state.canloadwodetailds)),
  clearSelectionOnSearch: true,
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [
    {
      'app-id': `inspection`,
      'datasource-id': `assignedworktolist`,
      'min-interval': -1,
      trigger: `woPlanTaskDetailds`
    }
  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  
                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - woDetailds

                

                // begin datasource - woPlanTaskDetailds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woPlanTaskDetailds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  query:   {
    pageSize: 100,
    relationship: `woactivity`,
    orderBy: `taskid`,
    domainInternalWhere: `status=INPRG,WAPPR,WMATL,APPR,WSCH,WPCOND,COMP`,
    selectionMode: `single`,
    searchAttributes:     [
`taskid`,
`description`,
`status`,
`siteid`,
`orgid`,
`assetnum`,
`location`
    ],
    indexAttributes:     [
`taskid`,
`description`,
`status`,
`siteid`,
`orgid`,
`assetnum`,
`location`
    ],
    select: `workorderid,taskid,disabled,description,description_longdescription,status,status_description,status_maxvalue,inspectionform.name--inspname,rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href,status,status_maxvalue,status_description--statusdesc},doclinks{*},predessorwos,siteid,pointnum,orgid,assetnum,location,asset.description--assetdescription,rel.asset.mxapiasset{plusacatid},measuredate,measurementvalue,inspector,wonum,observation,measurepoint.description,measurepoint.assetnum,measurepoint.asset.description,measurepoint.meter.description,measurepoint.meter.metertype,measurepoint.meter.domainid,measurepoint.meter.measureunit.description--unitdescription,estintlabhrs,estoutlabhrs,estlabhrs,estintlabcost,estoutlabcost,laborcosts,estmatcost,esttoolcost,estservcost,location.description--locationdesc,parentchgsstatus,activeassetmetermobile._dbcount--assetmetercount,activelocationmetermobile._dbcount--locationmetercount,rel.activeassetmetermobile.mxapiassetmeter{metername,lastreading,measureunitid,lastreadingdate,assetnum,active,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,siteid,sequence,newreading,rollover,newreadingFlag,anywhererefid,meter.measureunit.description--unitdescription},rel.activelocationmetermobile.mxapilocationmeter{metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,domainid,href,index,locationmeterid,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence,anywhererefid,meter.measureunit.description--unitdescription}`,
    dependsOn: `woDetailds`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `vv3x7`
    },
    {
      name: `taskid`,
      searchable: `true`,
      id: `nywdm`,
      'sub-type': `ALN`
    },
    {
      name: `disabled`,
      id: `rj7y8`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `kwee8`
    },
    {
      name: `description_longdescription`,
      id: `g2qxp`
    },
    {
      name: `status`,
      id: `yn47d`,
      searchable: `true`
    },
    {
      name: `status_description`,
      id: `zzvnb`
    },
    {
      name: `status_maxvalue`,
      id: `eygab`
    },
    {
      name: `inspectionform.name--inspname`,
      id: `mk8zk`
    },
    {
      name: `rel.inspectionresult.mxapiinspectionres{inspectionresultid--inspresultid,resultnum--inspresult,href,status,status_maxvalue,status_description--statusdesc}`,
      id: `zzvap`
    },
    {
      name: `doclinks{*}`,
      id: `gg8vy`
    },
    {
      name: `predessorwos`,
      id: `zrrne`
    },
    {
      name: `computedTaskStatus`,
      'computed-function': `computedTaskStatus`,
      id: `jvjgv`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedBorderDisplay`,
      'computed-function': `computedBorderDisplay`,
      id: `mw43g`,
      computed: (true),
      local: (true)
    },
    {
      name: `hideLockIcon`,
      'computed-function': `hideLockIcon`,
      title: (app.getLocalizedLabel("gn773_title", "hideLockIcon")),
      remarks: (app.getLocalizedLabel("gn773_remarks", "hideLockIcon")),
      id: `gn773`,
      computed: (true),
      local: (true)
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `d5_ay`
    },
    {
      name: `pointnum`,
      id: `yy_aswz`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `a4kq9`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `egzg3`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `n7qyd`
    },
    {
      name: `asset.description--assetdescription`,
      id: `g4vbe`
    },
    {
      name: `rel.asset.mxapiasset{plusacatid}`,
      id: `w2gn6`
    },
    {
      name: `measuredate`,
      id: `vzrp2`
    },
    {
      name: `measurementvalue`,
      id: `wma2g`
    },
    {
      name: `inspector`,
      id: `mdana`
    },
    {
      name: `wonum`,
      id: `n65yz`
    },
    {
      name: `observation`,
      id: `mkn7x`
    },
    {
      name: `measurepoint.description`,
      id: `n9238`
    },
    {
      name: `measurepoint.assetnum`,
      id: `kwae3`
    },
    {
      name: `measurepoint.asset.description`,
      id: `dx3j8`
    },
    {
      name: `measurepoint.meter.description`,
      id: `z8zwv`
    },
    {
      name: `measurepoint.meter.metertype`,
      id: `p7gxe`
    },
    {
      name: `measurepoint.meter.domainid`,
      id: `mn2n9`
    },
    {
      name: `measurepoint.meter.measureunit.description--unitdescription`,
      id: `mye_9`
    },
    {
      name: `estintlabhrs`,
      id: `enzye`
    },
    {
      name: `estoutlabhrs`,
      id: `j2zvg`
    },
    {
      name: `estlabhrs`,
      id: `d2256`
    },
    {
      name: `estintlabcost`,
      id: `ak8_x`
    },
    {
      name: `estoutlabcost`,
      id: `zvgkx`
    },
    {
      name: `laborcosts`,
      id: `qeej7`
    },
    {
      name: `estmatcost`,
      id: `zyj4j`
    },
    {
      name: `esttoolcost`,
      id: `x2ky6`
    },
    {
      name: `estservcost`,
      id: `ydqq4`
    },
    {
      name: `location.description--locationdesc`,
      id: `w7bmx`
    },
    {
      name: `computedPredecessorString`,
      'computed-function': `computedPredecessorString`,
      title: (app.getLocalizedLabel("exzb7_title", "computedPredecessorString")),
      remarks: (app.getLocalizedLabel("exzb7_remarks", "computedPredecessorString")),
      id: `exzb7`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedParentAssetLocation`,
      'computed-function': `computedParentAssetLocation`,
      id: `x3j7v`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurDate`,
      'sub-type': `DATE`,
      'computed-function': `computedMeterCurDate`,
      id: `e39aj`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurTime`,
      'sub-type': `TIME`,
      'computed-function': `computedMeterCurTime`,
      id: `zjeq3`,
      computed: (true),
      local: (true)
    },
    {
      name: `parentchgsstatus`,
      id: `jynmp`
    },
    {
      name: `activeassetmetermobile._dbcount--assetmetercount`,
      id: `x5g7d`
    },
    {
      name: `activelocationmetermobile._dbcount--locationmetercount`,
      id: `ayz27`
    },
    {
      name: `rel.activeassetmetermobile.mxapiassetmeter{metername,lastreading,measureunitid,lastreadingdate,assetnum,active,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,siteid,sequence,newreading,rollover,newreadingFlag,anywhererefid,meter.measureunit.description--unitdescription}`,
      id: `gze8v`
    },
    {
      name: `rel.activelocationmetermobile.mxapilocationmeter{metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,domainid,href,index,locationmeterid,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence,anywhererefid,meter.measureunit.description--unitdescription}`,
      id: `ze94m`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailds`,
  computedFields:   {
    computedTaskStatus:     {
      computedFunction: ((item, datasource) => datasource.callController('computedTaskStatus', item))
    },
    computedBorderDisplay:     {
      computedFunction: ((item, datasource) => datasource.callController('computedBorderDisplay', item))
    },
    hideLockIcon:     {
      computedFunction: ((item, datasource) => datasource.callController('hideLockIcon', item))
    },
    computedPredecessorString:     {
      computedFunction: ((item, datasource) => datasource.callController('computedPredecessorString', item))
    },
    computedParentAssetLocation:     {
      computedFunction: ((item, datasource) => datasource.callController('computedParentAssetLocation', item))
    },
    computedMeterCurDate:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurDate', item))
    },
    computedMeterCurTime:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurTime', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [
    {
      'app-id': `inspection`,
      'datasource-id': `assignedworktolist`,
      'min-interval': -1,
      trigger: `woPlanTaskDetailds`
    }
  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new WorkOrderDataController();
bootstrapInspector.onNewController(controller, 'WorkOrderDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - woPlanTaskDetailds

                

                // begin datasource - tasklistMeterds
                {
                  let options = {
  platform: `maximoMobile`,
  name: `tasklistMeterds`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  query:   {
    pageSize: 100,
    relationship: `woactivity`,
    orderBy: `taskid`,
    domainInternalWhere: `status=INPRG,WAPPR,WMATL,APPR,WSCH,WPCOND,COMP`,
    selectionMode: `none`,
    searchAttributes:     [
`siteid`,
`orgid`,
`assetnum`,
`location`
    ],
    indexAttributes:     [
`siteid`,
`orgid`,
`assetnum`,
`location`
    ],
    select: `workorderid,taskid,siteid,orgid,assetnum,location,asset.description--assetdescription,wonum,location.description--locationdesc,activeassetmetermobile._dbcount--assetmetercount,activelocationmetermobile._dbcount--locationmetercount,rel.activeassetmetermobile.mxapiassetmeter{metername,lastreading,measureunitid,lastreadingdate,assetnum,active,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,siteid,sequence,newreading,rollover,newreadingFlag,anywhererefid,meter.measureunit.description--unitdescription},rel.activelocationmetermobile.mxapilocationmeter{metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,domainid,href,index,locationmeterid,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence,anywhererefid,meter.measureunit.description--unitdescription}`,
    dependsOn: `woDetailds`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `workorderid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `workorderid`,
      'unique-id': `true`,
      id: `q5kxq`
    },
    {
      name: `taskid`,
      'sub-type': `ALN`,
      id: `wmnry`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `e3ywd`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `q8adv`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `dgaay`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `abb9b`
    },
    {
      name: `asset.description--assetdescription`,
      id: `z_zzw`
    },
    {
      name: `wonum`,
      id: `k2_zr`
    },
    {
      name: `location.description--locationdesc`,
      id: `k5_vp`
    },
    {
      name: `computedPredecessorString`,
      'computed-function': `computedPredecessorString`,
      title: (app.getLocalizedLabel("e693q_title", "computedPredecessorString")),
      remarks: (app.getLocalizedLabel("e693q_remarks", "computedPredecessorString")),
      id: `e693q`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedParentAssetLocation`,
      'computed-function': `computedParentAssetLocation`,
      id: `bn9qp`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurDate`,
      'sub-type': `DATE`,
      'computed-function': `computedMeterCurDate`,
      id: `g8_r9`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurTime`,
      'sub-type': `TIME`,
      'computed-function': `computedMeterCurTime`,
      id: `qd7bz`,
      computed: (true),
      local: (true)
    },
    {
      name: `activeassetmetermobile._dbcount--assetmetercount`,
      id: `a92g8`
    },
    {
      name: `activelocationmetermobile._dbcount--locationmetercount`,
      id: `x_wdb`
    },
    {
      name: `rel.activeassetmetermobile.mxapiassetmeter{metername,lastreading,measureunitid,lastreadingdate,assetnum,active,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,siteid,sequence,newreading,rollover,newreadingFlag,anywhererefid,meter.measureunit.description--unitdescription}`,
      id: `pq6mv`
    },
    {
      name: `rel.activelocationmetermobile.mxapilocationmeter{metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,domainid,href,index,locationmeterid,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence,anywhererefid,meter.measureunit.description--unitdescription}`,
      id: `xm654`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailds`,
  computedFields:   {
    computedPredecessorString:     {
      computedFunction: ((item, datasource) => datasource.callController('computedPredecessorString', item))
    },
    computedParentAssetLocation:     {
      computedFunction: ((item, datasource) => datasource.callController('computedParentAssetLocation', item))
    },
    computedMeterCurDate:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurDate', item))
    },
    computedMeterCurTime:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurTime', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new WorkOrderDataController();
bootstrapInspector.onNewController(controller, 'WorkOrderDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - tasklistMeterds

                

                // begin datasource - woassetmeters
                {
                  let options = {
  platform: `maximoMobile`,
  name: `woassetmeters`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `activeassetmeter.mxapiassetmeter`,
    objectName: `assetmeter`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    orderBy: `sequence`,
    searchAttributes:     [
`assetnum`,
`active`,
`siteid`
    ],
    indexAttributes:     [
`assetnum`,
`active`,
`siteid`,
`sequence`
    ],
    select: `metername,lastreading,measureunitid,lastreadingdate,assetnum,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,meter.measureunit.description--unitdescription,index,href,assetmeterid,dorollover,previousreading,previousreadingdate,assetmeterdomain.value,assetmeterdomain.description,readingtype,newreadingFlag,siteid,sequence`,
    dependsOn: `woDetailds`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `assetmeterid`,
  selectionMode: `none`,
  sortAttributes:   [
`sequence`
  ],
  schemaExt:   [
    {
      name: `metername`,
      id: `byyav`
    },
    {
      name: `lastreading`,
      id: `a3r62`
    },
    {
      name: `measureunitid`,
      id: `p837_`
    },
    {
      name: `lastreadingdate`,
      id: `n6yma`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `y45pe`
    },
    {
      name: `active`,
      searchable: `true`,
      id: `qjw96`
    },
    {
      name: `newreading`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `bb39n`
    },
    {
      name: `rollover`,
      id: `q47z6`
    },
    {
      name: `remarks`,
      id: `z3en6`
    },
    {
      name: `newreadingdate`,
      id: `nzmez`
    },
    {
      name: `meter.description`,
      id: `zazzy`
    },
    {
      name: `meter.metertype`,
      id: `dz3an`
    },
    {
      name: `meter.domainid`,
      id: `banw_`
    },
    {
      name: `meter.measureunit.description--unitdescription`,
      id: `z_j5d`
    },
    {
      name: `index`,
      id: `mb8mw`
    },
    {
      name: `href`,
      id: `kerxj`
    },
    {
      name: `assetmeterid`,
      'unique-id': `true`,
      id: `mgved`
    },
    {
      name: `dorollover`,
      id: `xj7yp`
    },
    {
      name: `previousreading`,
      id: `dmwqg`
    },
    {
      name: `previousreadingdate`,
      id: `abz4v`
    },
    {
      name: `assetmeterdomain.value`,
      id: `m5p69`
    },
    {
      name: `assetmeterdomain.description`,
      id: `rqkqw`
    },
    {
      name: `readingtype`,
      id: `jvyxr`
    },
    {
      name: `newreadingFlag`,
      type: `BOOL`,
      id: `jd_p7`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `er56v`
    },
    {
      name: `sequence`,
      sortable: `true`,
      id: `zqg_7`
    },
    {
      name: `computedReading`,
      'computed-function': `computedReading`,
      id: `kmkj3`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedReadingDate`,
      'computed-function': `computedReading`,
      id: `rejz5`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurDate`,
      'sub-type': `DATE`,
      'computed-function': `computedMeterCurDate`,
      id: `peewy`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurTime`,
      'sub-type': `TIME`,
      'computed-function': `computedMeterCurTime`,
      id: `qzk7a`,
      computed: (true),
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailds`,
  computedFields:   {
    computedReading:     {
      computedFunction: ((item, datasource) => datasource.callController('computedReading', item))
    },
    computedReadingDate:     {
      computedFunction: ((item, datasource) => datasource.callController('computedReading', item))
    },
    computedMeterCurDate:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurDate', item))
    },
    computedMeterCurTime:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurTime', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - woassetmeters

                

                // begin datasource - wolocationmeters
                {
                  let options = {
  platform: `maximoMobile`,
  name: `wolocationmeters`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `activelocationmeter.mxapilocationmeter`,
    objectName: `locationmeter`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    orderBy: `sequence`,
    searchAttributes:     [
`location`,
`active`,
`siteid`
    ],
    indexAttributes:     [
`location`,
`active`,
`siteid`,
`sequence`
    ],
    select: `metername,lastreading,measureunitid,lastreadingdate,location,active,newreading,rollover,remarks,newreadingdate,meter.description,meter.metertype,meter.domainid,meter.measureunit.description--unitdescription,domainid,href,index,locationmeterid,locations,previousreading,previousreadingdate,locationmeterdomain.value,locationmeterdomain.description,readingtype,newreadingFlag,siteid,dorollover,sequence`,
    dependsOn: `woDetailds`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `locationmeterid`,
  selectionMode: `none`,
  sortAttributes:   [
`sequence`
  ],
  schemaExt:   [
    {
      name: `metername`,
      id: `gy4yx`
    },
    {
      name: `lastreading`,
      id: `vzqkn`
    },
    {
      name: `measureunitid`,
      id: `wk7z3`
    },
    {
      name: `lastreadingdate`,
      id: `jp3gq`
    },
    {
      name: `location`,
      searchable: `true`,
      id: `pe4vd`
    },
    {
      name: `active`,
      searchable: `true`,
      id: `axe_q`
    },
    {
      name: `newreading`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      id: `r4nrv`
    },
    {
      name: `rollover`,
      id: `wr2gz`
    },
    {
      name: `remarks`,
      id: `xyw4z`
    },
    {
      name: `newreadingdate`,
      id: `q8yqa`
    },
    {
      name: `meter.description`,
      id: `ed5ax`
    },
    {
      name: `meter.metertype`,
      id: `ka9mz`
    },
    {
      name: `meter.domainid`,
      id: `pbpag`
    },
    {
      name: `meter.measureunit.description--unitdescription`,
      id: `k__qn`
    },
    {
      name: `domainid`,
      id: `ym8ax`
    },
    {
      name: `href`,
      id: `j77ke`
    },
    {
      name: `index`,
      id: `qv2vy`
    },
    {
      name: `locationmeterid`,
      'unique-id': `true`,
      id: `gegkg`
    },
    {
      name: `locations`,
      id: `m7mkg`
    },
    {
      name: `previousreading`,
      id: `a39jv`
    },
    {
      name: `previousreadingdate`,
      id: `n63v_`
    },
    {
      name: `locationmeterdomain.value`,
      id: `e3v6x`
    },
    {
      name: `locationmeterdomain.description`,
      id: `wgn2b`
    },
    {
      name: `readingtype`,
      id: `rbrwg`
    },
    {
      name: `newreadingFlag`,
      type: `BOOL`,
      id: `vb5xm`
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `g9bb3`
    },
    {
      name: `dorollover`,
      id: `q7y2m`
    },
    {
      name: `sequence`,
      sortable: `true`,
      id: `p5j8w`
    },
    {
      name: `computedReading`,
      'computed-function': `computedReading`,
      id: `g37_8`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedReadingDate`,
      'computed-function': `computedReading`,
      id: `y3_3p`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurDate`,
      'sub-type': `DATE`,
      'computed-function': `computedMeterCurDate`,
      id: `yz4wv`,
      computed: (true),
      local: (true)
    },
    {
      name: `computedMeterCurTime`,
      'sub-type': `TIME`,
      'computed-function': `computedMeterCurTime`,
      id: `m29de`,
      computed: (true),
      local: (true)
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailds`,
  computedFields:   {
    computedReading:     {
      computedFunction: ((item, datasource) => datasource.callController('computedReading', item))
    },
    computedReadingDate:     {
      computedFunction: ((item, datasource) => datasource.callController('computedReading', item))
    },
    computedMeterCurDate:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurDate', item))
    },
    computedMeterCurTime:     {
      computedFunction: ((item, datasource) => datasource.callController('computedMeterCurTime', item))
    }
  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - wolocationmeters

                

                // begin datasource - wohazardmaterials
                {
                  let options = {
  platform: `maximoMobile`,
  name: `wohazardmaterials`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `hazardousmaterials`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    select: `hazardid,hazarddescription,description,rel.wohazardprec{description,precautionid},msdsnum`,
    dependsOn: `woDetailds`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `hazardid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `hazardid`,
      'unique-id': `true`,
      id: `arnpz`
    },
    {
      name: `hazarddescription`,
      id: `azyz5`
    },
    {
      name: `description`,
      id: `k25__`
    },
    {
      name: `rel.wohazardprec{description,precautionid}`,
      id: `pvg4d`
    },
    {
      name: `msdsnum`,
      id: `ka39b`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailds`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - wohazardmaterials

                

                // begin datasource - wohazards
                {
                  let options = {
  platform: `maximoMobile`,
  name: `wohazards`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  query:   {
    relationship: `wohazards`,
    selectionMode: `none`,
    notifyWhenParentLoads: true,
    select: `hazardid,hazarddescription,description,rel.wohazardprec{description,precautionid}`,
    dependsOn: `woDetailds`,
    dsParentObject: `mxapiwodetail`
  },
  objectStructure: `mxapiwodetail`,
  idAttribute: `hazardid`,
  selectionMode: `none`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `hazardid`,
      'unique-id': `true`,
      id: `e7dz2`
    },
    {
      name: `hazarddescription`,
      id: `g46qq`
    },
    {
      name: `description`,
      id: `xxrb8`
    },
    {
      name: `rel.wohazardprec{description,precautionid}`,
      id: `aza33`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `woDetailds`,
  computedFields:   {

  },
  notifyWhenParentLoads: true,
  appResolver: (() => app),
  watch:   [

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
  useWithMobile: false,
  rsMetaData: false,
  autoinitwf: true,
  autoLoadRef:   [

  ]
};
                  bootstrapInspector.onNewDatasourceOptions(options);
                  let da = bootstrapInspector.onNewDataAdapter(platform.newMaximoDataAdapter(options,app.client.restclient), options, 'AutoMaximoDataAdapter');
                  let ds = bootstrapInspector.onNewDatasource(new Datasource(da, options), da, options);
                  let controller = new ScheduleDataController();
bootstrapInspector.onNewController(controller, 'ScheduleDataController', ds);
ds.registerController(controller);

                  if (!app.hasDatasource(ds)) {
                    app.registerDatasource(ds);
                  }
                }
                // end datasource - wohazards

                

                // begin datasource - dsFailureList
                {
                  let options = {
  platform: `maximoMobile`,
  name: `dsFailureList`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  default: `true`,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `single`,
    orderBy: `failurecode.description`,
    default: true,
    idAttribute: `failurelist`,
    objectStructure: `mxapifailurelist`,
    savedQuery: `FAILUREMOB`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dsFailureList`,
    searchAttributes:     [
`failurelist`,
`orgid`,
`parent`,
`type`
    ],
    indexAttributes:     [
`failurelist`,
`orgid`,
`parent`,
`type`
    ],
    select: `failurelist,failurecode,failurecode.description,orgid,parent,type,failurecode.failurecode`
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
      name: `failurecode`,
      id: `wa5x6`
    },
    {
      name: `failurecode.description`,
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
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - dsFailureList

                

                // begin datasource - dsworktype
                {
                  let options = {
  platform: `maximoMobile`,
  name: `dsworktype`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `single`,
    objectStructure: `mxapiworktype`,
    savedQuery: `WOWORKTYPE`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dsworktype`,
    searchAttributes:     [
`worktype`,
`wtypedesc`,
`woclass`,
`orgid`
    ],
    indexAttributes:     [
`worktype`,
`wtypedesc`,
`woclass`,
`orgid`
    ],
    select: `worktype,wtypedesc,woclass,orgid,promptdown,startstatus,completestatus`
  },
  objectStructure: `mxapiworktype`,
  idAttribute: `worktype`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `worktype`,
      searchable: `true`,
      'unique-id': `true`,
      id: `rrpez`
    },
    {
      name: `wtypedesc`,
      searchable: `true`,
      id: `w5_zm`
    },
    {
      name: `woclass`,
      searchable: `true`,
      id: `b8w9r`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `b_jdj`
    },
    {
      name: `promptdown`,
      id: `n_5q4`
    },
    {
      name: `startstatus`,
      id: `vm3ke`
    },
    {
      name: `completestatus`,
      id: `a5yen`
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
  isMaximoMobile: true,
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
                // end datasource - dsworktype

                

                // begin datasource - workTypeFilterDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `workTypeFilterDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `multiple`,
    select: `worktype,wtypedesc,woclass,orgid,promptdown,startstatus,completestatus`,
    sortAttributes:     [

    ],
    searchAttributes:     [
`worktype`,
`wtypedesc`,
`woclass`,
`orgid`
    ],
    objectStructure: `mxapiworktype`,
    savedQuery: `WOWORKTYPE`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dsworktype`,
    indexAttributes:     [
`worktype`,
`wtypedesc`,
`woclass`,
`orgid`
    ]
  },
  objectStructure: `mxapiworktype`,
  idAttribute: `worktype`,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `worktype`,
      searchable: `true`,
      'unique-id': `true`,
      id: `rrpez`
    },
    {
      name: `wtypedesc`,
      searchable: `true`,
      id: `w5_zm`
    },
    {
      name: `woclass`,
      searchable: `true`,
      id: `b8w9r`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `b_jdj`
    },
    {
      name: `promptdown`,
      id: `n_5q4`
    },
    {
      name: `startstatus`,
      id: `vm3ke`
    },
    {
      name: `completestatus`,
      id: `a5yen`
    }
  ],
  qbeAttributes:   [

  ],
  parentDatasource: `dsworktype`,
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
  isMaximoMobile: true,
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
                // end datasource - workTypeFilterDS

                

                // begin datasource - wpEditSettingDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `wpEditSettingDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    objectStructure: `mxapiwpeditsetting`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `wpEditSettingDS`,
    searchAttributes:     [
`orgid`,
`status`
    ],
    indexAttributes:     [
`orgid`,
`status`
    ],
    select: `orgid,status,editasset,editloc,wpeditsettingid`
  },
  objectStructure: `mxapiwpeditsetting`,
  idAttribute: `wpeditsettingid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `orgid`,
      searchable: `true`,
      id: `n99wv`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `wwv5g`
    },
    {
      name: `editasset`,
      id: `gymya`
    },
    {
      name: `editloc`,
      id: `jbkae`
    },
    {
      name: `wpeditsettingid`,
      'unique-id': `true`,
      id: `jbnbg`
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
  isMaximoMobile: true,
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
                // end datasource - wpEditSettingDS

                

                // begin datasource - defaultSetDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `defaultSetDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    objectStructure: `mxapiorganization`,
    savedQuery: `MOBILEORG`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `defaultSetDs`,
    searchAttributes:     [
`orgid`
    ],
    indexAttributes:     [
`orgid`
    ],
    select: `itemsetid,orgid,rel.mobilemaxvars{*}`
  },
  objectStructure: `mxapiorganization`,
  idAttribute: `orgid`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `itemsetid`,
      id: `x4pne`
    },
    {
      name: `orgid`,
      'unique-id': `true`,
      searchable: `true`,
      id: `mr8av`
    },
    {
      name: `rel.mobilemaxvars{*}`,
      id: `yd8ea`
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
  isMaximoMobile: true,
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
                // end datasource - defaultSetDs

                

                // begin datasource - conversionUnitDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `conversionUnitDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPICONVERSION`,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `conversionUnitDs`,
    searchAttributes:     [
`frommeasureunit`,
`tomeasureunit`,
`conversion`,
`conversionid`
    ],
    indexAttributes:     [
`frommeasureunit`,
`tomeasureunit`,
`conversion`,
`conversionid`
    ],
    select: `frommeasureunit,tomeasureunit,conversion,conversionid`
  },
  objectStructure: `MXAPICONVERSION`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `frommeasureunit`,
      searchable: `true`,
      id: `v5zyd`
    },
    {
      name: `tomeasureunit`,
      searchable: `true`,
      id: `ydjem`
    },
    {
      name: `conversion`,
      searchable: `true`,
      id: `zan77`
    },
    {
      name: `conversionid`,
      searchable: `true`,
      id: `dyewx`
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
  isMaximoMobile: true,
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
                // end datasource - conversionUnitDs

                

                // begin datasource - assetLRMEdit
                {
                  let options = {
  platform: `maximoMobile`,
  name: `assetLRMEdit`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPILINEARREFMETHOD`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `assetLRMEdit`,
    searchAttributes:     [
`lrm`,
`description`,
`measureunitid`,
`yoffsetmeasureunitid`,
`offsetmeasureunitid`,
`zoffsetmeasureunitid`
    ],
    indexAttributes:     [
`lrm`,
`description`,
`measureunitid`,
`yoffsetmeasureunitid`,
`offsetmeasureunitid`,
`zoffsetmeasureunitid`
    ],
    select: `lrm,description,measureunitid,yoffsetmeasureunitid,offsetmeasureunitid,zoffsetmeasureunitid,yoffsetref,zoffsetref`
  },
  objectStructure: `MXAPILINEARREFMETHOD`,
  idAttribute: ``,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `lrm`,
      searchable: `true`,
      id: `jx9pz`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `wv9qg`
    },
    {
      name: `measureunitid`,
      searchable: `true`,
      id: `k6da9`
    },
    {
      name: `yoffsetmeasureunitid`,
      searchable: `true`,
      id: `y4rbr`
    },
    {
      name: `offsetmeasureunitid`,
      searchable: `true`,
      id: `r5v2y`
    },
    {
      name: `zoffsetmeasureunitid`,
      searchable: `true`,
      id: `bzkdr`
    },
    {
      name: `yoffsetref`,
      id: `j4d88`
    },
    {
      name: `zoffsetref`,
      id: `q_paa`
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
  isMaximoMobile: true,
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
                // end datasource - assetLRMEdit

                

                // begin datasource - assetLookupDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `assetLookupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIASSET`,
    savedQuery: `MOBILEASSET`,
    lookupData: true,
    offlineImmediateDownload: true,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `assetLookupDS`,
    searchAttributes:     [
`itemnum`,
`assetnum`,
`description`,
`assettag`,
`assettype`,
`binnum`,
`location.description`,
`manufacturer`,
`priority`,
`serialnum`,
`siteid`,
`vendor`,
`location.glaccount`,
`parent`,
`status`,
`location`,
`serviceaddress.formattedaddress`
    ],
    indexAttributes:     [
`itemnum`,
`assetnum`,
`description`,
`assettag`,
`assettype`,
`binnum`,
`location.description--locationdesc`,
`manufacturer`,
`priority`,
`serialnum`,
`siteid`,
`vendor`,
`location.glaccount--locglaccount`,
`parent`,
`status`,
`location`,
`serviceaddress.formattedaddress--formattedaddress`
    ],
    select: `itemnum,assetuid,assetnum,description,startmeasure,endmeasure,assethealth,islinear,purchaseprice,lrm,assetfeature,direction,assettag,assettype,binnum,isrunning,location.description--locationdesc,manufacturer,priority,serialnum,siteid,vendor,assetchildren,children._dbcount--childcount,location.glaccount--locglaccount,children._dbcount--childcount,autolocate,children._dbcount--childcount,parent,children._dbcount--childcount,location.locpriority--locpriority,children._dbcount--childcount,location.failurecode--locfailurecode,children._dbcount--childcount,status,children._dbcount--childcount,location,children._dbcount--childcount,failurecode,children._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},children._dbcount--childcount,rel.assetmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence, pointnum},children._dbcount--childcount,serviceaddress.formattedaddress--formattedaddress,children._dbcount--childcount,rel.assetfeature{assetnum,assetfeatureid,feature,label,startmeasure,endmeasure},children._dbcount--childcount,assetfeatureid,children._dbcount--childcount,feature,children._dbcount--childcount,assetnum,children._dbcount--childcount,label,children._dbcount--childcount,serviceaddress.latitudey,children._dbcount--childcount,serviceaddress.longitudex,children._dbcount--childcount,classstructure.hierarchypath,children._dbcount--childcount,asset_parent.description--parentassetdesc,children._dbcount--childcount,statusdesc.description--assetstatusdesc,children._dbcount--childcount,assetmeter._dbcount--assetmetercount,children._dbcount--childcount,children._dbcount--childcount`
  },
  objectStructure: `MXAPIASSET`,
  idAttribute: `assetuid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      searchable: `true`,
      name: `itemnum`,
      id: `v3by_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `v3by_`,
      lookup:       {
        name: `assetitemnum`,
        attributeMap:         [
          {
            datasourceField: `description,itemnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `itemnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `itemnum,description,lottype,imageref,itemsetid`
      }
    },
    {
      name: `assetuid`,
      'unique-id': `true`,
      id: `p8k_4`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `bmee9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `axqxw`
    },
    {
      name: `startmeasure`,
      id: `vy57b`
    },
    {
      name: `endmeasure`,
      id: `a_8ev`
    },
    {
      name: `assethealth`,
      id: `nq6d6`
    },
    {
      name: `islinear`,
      id: `k2wz6`
    },
    {
      name: `purchaseprice`,
      id: `eemkd`
    },
    {
      name: `lrm`,
      id: `a53mg`
    },
    {
      name: `assetfeature`,
      id: `r5p8r`
    },
    {
      name: `direction`,
      id: `rneda`
    },
    {
      name: `assettag`,
      searchable: `true`,
      id: `wk63p`
    },
    {
      searchable: `true`,
      name: `assettype`,
      id: `ypg3j`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ypg3j`,
      lookup:       {
        name: `assettype`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `binnum`,
      searchable: `true`,
      id: `n4524`
    },
    {
      name: `isrunning`,
      id: `dqbj6`
    },
    {
      name: `location.description--locationdesc`,
      searchable: `true`,
      id: `wegry`
    },
    {
      name: `manufacturer`,
      searchable: `true`,
      id: `kz4z3`
    },
    {
      name: `priority`,
      searchable: `true`,
      id: `vvj78`
    },
    {
      searchable: `true`,
      name: `serialnum`,
      id: `gyq8j`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `gyq8j`,
      lookup:       {
        name: `assetserialnum`,
        attributeMap:         [
          {
            datasourceField: `serialnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `serialnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `serialnum`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `apv84`
    },
    {
      searchable: `true`,
      name: `vendor`,
      id: `dn6y4`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `dn6y4`,
      lookup:       {
        name: `assetmanufacturer`,
        attributeMap:         [
          {
            datasourceField: `name,company`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `company`,
            lookupField: `value`
          }
        ],
        attributeNames: `company,name,type`
      }
    },
    {
      name: `assetchildren`,
      'child-relationship': `children`,
      id: `z7vm3`
    },
    {
      name: `location.glaccount--locglaccount`,
      searchable: `true`,
      id: `ynjy8`
    },
    {
      name: `autolocate`,
      id: `krpvd`
    },
    {
      name: `parent`,
      searchable: `true`,
      id: `yjv9q`
    },
    {
      name: `location.locpriority--locpriority`,
      id: `wypm2`
    },
    {
      name: `location.failurecode--locfailurecode`,
      id: `gnj3k`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `jzndw`
    },
    {
      searchable: `true`,
      name: `location`,
      id: `x9qjm`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `x9qjm`,
      lookup:       {
        name: `assetloc`,
        attributeMap:         [
          {
            datasourceField: `description,location`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `failurecode`,
      id: `n78mv`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `yx4jk`
    },
    {
      name: `rel.assetmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence, pointnum}`,
      id: `zp6y9`
    },
    {
      name: `serviceaddress.formattedaddress--formattedaddress`,
      searchable: `true`,
      id: `g7dgk`
    },
    {
      name: `rel.assetfeature{assetnum,assetfeatureid,feature,label,startmeasure,endmeasure}`,
      id: `eejdb`
    },
    {
      name: `assetfeatureid`,
      id: `k87rz`
    },
    {
      name: `feature`,
      id: `my77z`
    },
    {
      name: `assetnum`,
      id: `wa8e9`
    },
    {
      name: `label`,
      id: `mxa_d`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `g2xj2`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `vjbxj`
    },
    {
      name: `classstructure.hierarchypath`,
      id: `d3jqp`
    },
    {
      name: `asset_parent.description--parentassetdesc`,
      id: `k8_4m`
    },
    {
      name: `statusdesc.description--assetstatusdesc`,
      id: `w8q_n`
    },
    {
      name: `assetmeter._dbcount--assetmetercount`,
      id: `x54xe`
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
  isMaximoMobile: true,
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

                

                // begin datasource - assetFilterDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `assetFilterDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    select: ("itemnum,assetuid,assetnum,description,startmeasure,endmeasure,assethealth,islinear,purchaseprice,lrm,assetfeature,direction,assettag,assettype,binnum,isrunning,location.description--locationdesc,manufacturer,priority,serialnum,siteid,vendor,assetchildren,children._dbcount--childcount,location.glaccount--locglaccount,children._dbcount--childcount,autolocate,children._dbcount--childcount,parent,children._dbcount--childcount,location.locpriority--locpriority,children._dbcount--childcount,location.failurecode--locfailurecode,children._dbcount--childcount,status,children._dbcount--childcount,location,children._dbcount--childcount,failurecode,children._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},children._dbcount--childcount,rel.assetmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence, pointnum},children._dbcount--childcount,serviceaddress.formattedaddress--formattedaddress,children._dbcount--childcount,rel.assetfeature{assetnum,assetfeatureid,feature,label,startmeasure,endmeasure},children._dbcount--childcount,assetfeatureid,children._dbcount--childcount,feature,children._dbcount--childcount,assetnum,children._dbcount--childcount,label,children._dbcount--childcount,serviceaddress.latitudey,children._dbcount--childcount,serviceaddress.longitudex,children._dbcount--childcount,classstructure.hierarchypath,children._dbcount--childcount,asset_parent.description--parentassetdesc,children._dbcount--childcount,statusdesc.description--assetstatusdesc,children._dbcount--childcount,assetmeter._dbcount--assetmetercount,children._dbcount--childcount,children._dbcount--childcount"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`itemnum`,
`assetnum`,
`description`,
`assettag`,
`assettype`,
`binnum`,
`location.description`,
`manufacturer`,
`priority`,
`serialnum`,
`siteid`,
`vendor`,
`location.glaccount`,
`parent`,
`status`,
`location`,
`serviceaddress.formattedaddress`
    ],
    objectStructure: `MXAPIASSET`,
    savedQuery: `MOBILEASSET`,
    lookupData: true,
    offlineImmediateDownload: true,
    geometryFormat: `geojson`,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `assetLookupDS`,
    indexAttributes:     [
`itemnum`,
`assetnum`,
`description`,
`assettag`,
`assettype`,
`binnum`,
`location.description--locationdesc`,
`manufacturer`,
`priority`,
`serialnum`,
`siteid`,
`vendor`,
`location.glaccount--locglaccount`,
`parent`,
`status`,
`location`,
`serviceaddress.formattedaddress--formattedaddress`
    ]
  },
  objectStructure: `MXAPIASSET`,
  idAttribute: `assetuid`,
  selectionMode: `multiple`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      searchable: `true`,
      name: `itemnum`,
      id: `v3by_`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `v3by_`,
      lookup:       {
        name: `assetitemnum`,
        attributeMap:         [
          {
            datasourceField: `description,itemnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `itemnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `itemnum,description,lottype,imageref,itemsetid`
      }
    },
    {
      name: `assetuid`,
      'unique-id': `true`,
      id: `p8k_4`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `bmee9`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `axqxw`
    },
    {
      name: `startmeasure`,
      id: `vy57b`
    },
    {
      name: `endmeasure`,
      id: `a_8ev`
    },
    {
      name: `assethealth`,
      id: `nq6d6`
    },
    {
      name: `islinear`,
      id: `k2wz6`
    },
    {
      name: `purchaseprice`,
      id: `eemkd`
    },
    {
      name: `lrm`,
      id: `a53mg`
    },
    {
      name: `assetfeature`,
      id: `r5p8r`
    },
    {
      name: `direction`,
      id: `rneda`
    },
    {
      name: `assettag`,
      searchable: `true`,
      id: `wk63p`
    },
    {
      searchable: `true`,
      name: `assettype`,
      id: `ypg3j`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `ypg3j`,
      lookup:       {
        name: `assettype`,
        attributeMap:         [
          {
            datasourceField: `description`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `binnum`,
      searchable: `true`,
      id: `n4524`
    },
    {
      name: `isrunning`,
      id: `dqbj6`
    },
    {
      name: `location.description--locationdesc`,
      searchable: `true`,
      id: `wegry`
    },
    {
      name: `manufacturer`,
      searchable: `true`,
      id: `kz4z3`
    },
    {
      name: `priority`,
      searchable: `true`,
      id: `vvj78`
    },
    {
      searchable: `true`,
      name: `serialnum`,
      id: `gyq8j`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `gyq8j`,
      lookup:       {
        name: `assetserialnum`,
        attributeMap:         [
          {
            datasourceField: `serialnum`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `serialnum`,
            lookupField: `value`
          }
        ],
        attributeNames: `serialnum`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `apv84`
    },
    {
      searchable: `true`,
      name: `vendor`,
      id: `dn6y4`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `dn6y4`,
      lookup:       {
        name: `assetmanufacturer`,
        attributeMap:         [
          {
            datasourceField: `name,company`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `company`,
            lookupField: `value`
          }
        ],
        attributeNames: `company,name,type`
      }
    },
    {
      name: `assetchildren`,
      'child-relationship': `children`,
      id: `z7vm3`
    },
    {
      name: `location.glaccount--locglaccount`,
      searchable: `true`,
      id: `ynjy8`
    },
    {
      name: `autolocate`,
      id: `krpvd`
    },
    {
      name: `parent`,
      searchable: `true`,
      id: `yjv9q`
    },
    {
      name: `location.locpriority--locpriority`,
      id: `wypm2`
    },
    {
      name: `location.failurecode--locfailurecode`,
      id: `gnj3k`
    },
    {
      name: `status`,
      searchable: `true`,
      id: `jzndw`
    },
    {
      searchable: `true`,
      name: `location`,
      id: `x9qjm`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `x9qjm`,
      lookup:       {
        name: `assetloc`,
        attributeMap:         [
          {
            datasourceField: `description,location`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `location`,
            lookupField: `value`
          }
        ]
      },
      datasource: `locationFilterDS`
    },
    {
      name: `failurecode`,
      id: `n78mv`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `yx4jk`
    },
    {
      name: `rel.assetmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence, pointnum}`,
      id: `zp6y9`
    },
    {
      name: `serviceaddress.formattedaddress--formattedaddress`,
      searchable: `true`,
      id: `g7dgk`
    },
    {
      name: `rel.assetfeature{assetnum,assetfeatureid,feature,label,startmeasure,endmeasure}`,
      id: `eejdb`
    },
    {
      name: `assetfeatureid`,
      id: `k87rz`
    },
    {
      name: `feature`,
      id: `my77z`
    },
    {
      name: `assetnum`,
      id: `wa8e9`
    },
    {
      name: `label`,
      id: `mxa_d`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `g2xj2`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `vjbxj`
    },
    {
      name: `classstructure.hierarchypath`,
      id: `d3jqp`
    },
    {
      name: `asset_parent.description--parentassetdesc`,
      id: `k8_4m`
    },
    {
      name: `statusdesc.description--assetstatusdesc`,
      id: `w8q_n`
    },
    {
      name: `assetmeter._dbcount--assetmetercount`,
      id: `x54xe`
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

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - assetFilterDS

                

                // begin datasource - locationLookupDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `locationLookupDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `single`,
    objectStructure: `MXAPIOPERLOC`,
    savedQuery: `MOBILELOCATION`,
    lookupData: true,
    offlineImmediateDownload: true,
    geometryFormat: `geojson`,
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
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ],
    indexAttributes:     [
`location`,
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ],
    select: `locationsid,location,description,failurecode,glaccount,locpriority,parent,locationchildren,syschildren._dbcount--childcount,locsystem.primarysystem--primarysystem,syschildren._dbcount--childcount,systemid,syschildren._dbcount--childcount,type,syschildren._dbcount--childcount,status,syschildren._dbcount--childcount,siteid,syschildren._dbcount--childcount,orgid,syschildren._dbcount--childcount,autolocate,syschildren._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},syschildren._dbcount--childcount,serviceaddress.latitudey,syschildren._dbcount--childcount,serviceaddress.longitudex,syschildren._dbcount--childcount,rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence},syschildren._dbcount--childcount`
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
      id: `menw3`
    },
    {
      name: `location`,
      searchable: `true`,
      index: `true`,
      id: `dprab`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `xg7p9`
    },
    {
      name: `failurecode`,
      id: `w_p4x`
    },
    {
      name: `glaccount`,
      searchable: `true`,
      id: `wa5y4`
    },
    {
      name: `locpriority`,
      id: `kaxzm`
    },
    {
      name: `parent`,
      searchable: `false`,
      id: `pxj85`
    },
    {
      name: `locationchildren`,
      'child-relationship': `syschildren`,
      id: `k7mpn`
    },
    {
      name: `locsystem.primarysystem--primarysystem`,
      id: `pg4_y`
    },
    {
      name: `systemid`,
      id: `eyj5w`
    },
    {
      searchable: `true`,
      name: `type`,
      id: `anrp6`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `anrp6`,
      lookup:       {
        name: `listLocationType`,
        attributeMap:         [
          {
            datasourceField: `description,value`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      searchable: `true`,
      name: `status`,
      id: `gxzyp`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `gxzyp`,
      lookup:       {
        name: `locationstatus`,
        attributeMap:         [
          {
            datasourceField: `description,value`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x9_rg`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `pnyry`
    },
    {
      name: `autolocate`,
      id: `vxy3g`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `a7ek5`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `xqjpg`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `xn4yj`
    },
    {
      name: `rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence}`,
      id: `am36b`
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
  isMaximoMobile: true,
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

                

                // begin datasource - locationFilterDS
                {
                  let options = {
  platform: `maximoMobile`,
  name: `locationFilterDS`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  debounceTime: 100,
  query:   {
    pageSize: 50,
    selectionMode: `multiple`,
    select: ("locationsid,location,description,failurecode,glaccount,locpriority,parent,locationchildren,syschildren._dbcount--childcount,locsystem.primarysystem--primarysystem,syschildren._dbcount--childcount,systemid,syschildren._dbcount--childcount,type,syschildren._dbcount--childcount,status,syschildren._dbcount--childcount,siteid,syschildren._dbcount--childcount,orgid,syschildren._dbcount--childcount,autolocate,syschildren._dbcount--childcount,rel.failurelist{failurelist,failurecode.description,failurecode.failurecode},syschildren._dbcount--childcount,serviceaddress.latitudey,syschildren._dbcount--childcount,serviceaddress.longitudex,syschildren._dbcount--childcount,rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence},syschildren._dbcount--childcount"),
    sortAttributes:     [

    ],
    searchAttributes:     [
`location`,
`description`,
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
    ],
    objectStructure: `MXAPIOPERLOC`,
    savedQuery: `MOBILELOCATION`,
    lookupData: true,
    offlineImmediateDownload: true,
    geometryFormat: `geojson`,
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
`glaccount`,
`type`,
`status`,
`siteid`,
`orgid`
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
      id: `menw3`
    },
    {
      name: `location`,
      searchable: `true`,
      index: `true`,
      id: `dprab`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `xg7p9`
    },
    {
      name: `failurecode`,
      id: `w_p4x`
    },
    {
      name: `glaccount`,
      searchable: `true`,
      id: `wa5y4`
    },
    {
      name: `locpriority`,
      id: `kaxzm`
    },
    {
      name: `parent`,
      searchable: `false`,
      id: `pxj85`
    },
    {
      name: `locationchildren`,
      'child-relationship': `syschildren`,
      id: `k7mpn`
    },
    {
      name: `locsystem.primarysystem--primarysystem`,
      id: `pg4_y`
    },
    {
      name: `systemid`,
      id: `eyj5w`
    },
    {
      searchable: `true`,
      name: `type`,
      id: `anrp6`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `anrp6`,
      lookup:       {
        name: `listLocationType`,
        attributeMap:         [
          {
            datasourceField: `description,value`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      searchable: `true`,
      name: `status`,
      id: `gxzyp`,
      datacomponenttype: `attribute`,
      datacomponentoriginalid: `gxzyp`,
      lookup:       {
        name: `locationstatus`,
        attributeMap:         [
          {
            datasourceField: `description,value`,
            lookupField: `displayValue`
          },
          {
            datasourceField: `value`,
            lookupField: `value`
          }
        ],
        attributeNames: `maxvalue,value,description`
      }
    },
    {
      name: `siteid`,
      searchable: `true`,
      id: `x9_rg`
    },
    {
      name: `orgid`,
      searchable: `true`,
      id: `pnyry`
    },
    {
      name: `autolocate`,
      id: `vxy3g`
    },
    {
      name: `rel.failurelist{failurelist,failurecode.description,failurecode.failurecode}`,
      id: `a7ek5`
    },
    {
      name: `serviceaddress.latitudey`,
      id: `xqjpg`
    },
    {
      name: `serviceaddress.longitudex`,
      id: `xn4yj`
    },
    {
      name: `rel.locationmeter{metername,active,rollover,lastreading,readingtype,lastreadingdate,measureunitid,meter.measureunit.description--unitdescription,sequence}`,
      id: `am36b`
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

  ],
  autoSave: false,
  trackChanges: true,
  resetDatasource: false,
  isMaximoMobile: true,
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
                // end datasource - locationFilterDS

                

                // begin datasource - dsnewreading
                {
                  let options = {
  platform: `maximoMobile`,
  name: `dsnewreading`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `single`,
    objectStructure: `mxapialndomain`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `dsnewreading`,
    searchAttributes:     [
`domainid`
    ],
    indexAttributes:     [
`domainid`
    ],
    select: `value,valueid,description,domainid,siteid,orgid`
  },
  objectStructure: `mxapialndomain`,
  idAttribute: `value`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      'unique-id': `true`,
      id: `gv9ge`
    },
    {
      name: `valueid`,
      id: `gx955`
    },
    {
      name: `description`,
      id: `bkqzb`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `v64yv`
    },
    {
      name: `siteid`,
      id: `jgbv9`
    },
    {
      name: `orgid`,
      id: `p6_8v`
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
  isMaximoMobile: true,
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
                // end datasource - dsnewreading

                

                // begin datasource - alndomainData
                {
                  let options = {
  platform: `maximoMobile`,
  name: `alndomainData`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 10,
  debounceTime: 100,
  query:   {
    pageSize: 10,
    selectionMode: `single`,
    idAttribute: `domainid`,
    objectStructure: `MXAPIALNDOMAIN`,
    lookupData: true,
    offlineImmediateDownload: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `alndomainData`,
    searchAttributes:     [
`domainid`,
`value`,
`description`
    ],
    indexAttributes:     [
`domainid`,
`value`,
`description`
    ],
    select: `domainid,value,description,valueid`
  },
  objectStructure: `MXAPIALNDOMAIN`,
  idAttribute: `valueid`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `domainid`,
      searchable: `true`,
      id: `q8g63`
    },
    {
      name: `value`,
      searchable: `true`,
      id: `kmdq2`
    },
    {
      name: `description`,
      searchable: `true`,
      id: `yn7z7`
    },
    {
      name: `valueid`,
      'unique-id': `true`,
      id: `pd77z`
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
  isMaximoMobile: true,
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
                // end datasource - alndomainData

                

                // begin datasource - assetFeatureData
                {
                  let options = {
  name: `assetFeatureData`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `assetfeatureid`,
      id: `bw_km`
    },
    {
      name: `feature`,
      id: `qen4r`
    },
    {
      name: `assetnum`,
      id: `bd2wd`
    },
    {
      name: `label`,
      id: `pr_mp`
    },
    {
      name: `startmeasure`,
      id: `w45ak`
    },
    {
      name: `endmeasure`,
      id: `mgedw`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `assetfeatureid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    select: `assetfeatureid,feature,assetnum,label,startmeasure,endmeasure`,
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
                // end datasource - assetFeatureData

                

                // begin datasource - linearAsset
                {
                  let options = {
  name: `linearAsset`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 50,
  schemaExt:   [
    {
      name: `multiid`,
      'unique-id': `true`,
      id: `agak4`
    },
    {
      name: `assetnum`,
      searchable: `true`,
      id: `jpa9v`
    },
    {
      name: `asset.description--assetdescription`,
      id: `qa24v`
    },
    {
      name: `location`,
      id: `rzy9n`
    },
    {
      name: `location.location--location`,
      id: `a23x8`
    },
    {
      name: `location.description--locationdesc`,
      id: `vkvxk`
    },
    {
      name: `location.autolocate--locationautolocate`,
      id: `gm6m6`
    },
    {
      name: `location.locationsid--locationlocationsid`,
      id: `bmj4m`
    },
    {
      name: `startyoffsetref`,
      id: `m9enm`
    },
    {
      name: `endyoffsetref`,
      id: `wyk_3`
    },
    {
      name: `startzoffsetref`,
      id: `xneb3`
    },
    {
      name: `endzoffsetref`,
      id: `kjrr4`
    },
    {
      name: `startAssetFeatureId`,
      id: `rj5xa`
    },
    {
      name: `endAssetFeatureId`,
      id: `me9pv`
    },
    {
      name: `startfeaturelabel`,
      id: `xyepe`
    },
    {
      name: `endfeaturelabel`,
      id: `bbkm2`
    },
    {
      name: `startoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `k6pyx`
    },
    {
      name: `endoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `qdjek`
    },
    {
      name: `startmeasure`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `jr6en`
    },
    {
      name: `endmeasure`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `zbavy`
    },
    {
      name: `startyoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `jwzmr`
    },
    {
      name: `endyoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `j2n_v`
    },
    {
      name: `startzoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `yrv9d`
    },
    {
      name: `endzoffset`,
      type: `NUMBER`,
      'sub-type': `DECIMAL`,
      scale: `2`,
      id: `z3267`
    }
  ],
  sortAttributes:   [

  ],
  idAttribute: `multiid`,
  loadingDelay: 0,
  refreshDelay: 0,
  query:   {
    searchAttributes:     [
`assetnum`
    ],
    select: `multiid,assetnum,asset.description--assetdescription,location,location.location--location,location.description--locationdesc,location.autolocate--locationautolocate,location.locationsid--locationlocationsid,startyoffsetref,endyoffsetref,startzoffsetref,endzoffsetref,startAssetFeatureId,endAssetFeatureId,startfeaturelabel,endfeaturelabel,startoffset,endoffset,startmeasure,endmeasure,startyoffset,endyoffset,startzoffset,endzoffset`,
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
                // end datasource - linearAsset

                

                // begin datasource - unitLookupDs
                {
                  let options = {
  platform: `maximoMobile`,
  name: `unitLookupDs`,
  datasourceLocator: ((dataSourceName) => app.findDatasource(dataSourceName)),
  pageSize: 100,
  debounceTime: 100,
  query:   {
    pageSize: 100,
    selectionMode: `single`,
    objectStructure: `mxapialndomain`,
    lookupData: true,
    notifyWhenParentLoads: true,
    trackChanges: true,
    includeCounts: true,
    resultOutput: `json`,
    autoinitwf: true,
    datacomponenttype: `maximo-datasource`,
    datacomponentoriginalid: `unitLookupDs`,
    searchAttributes:     [
`domainid`
    ],
    indexAttributes:     [
`domainid`
    ],
    select: `value,valueid,description,domainid,siteid,orgid`
  },
  objectStructure: `mxapialndomain`,
  idAttribute: `value`,
  selectionMode: `single`,
  sortAttributes:   [

  ],
  schemaExt:   [
    {
      name: `value`,
      'unique-id': `true`,
      id: `auxfztjo`
    },
    {
      name: `valueid`,
      id: `b999q`
    },
    {
      name: `description`,
      id: `q64rv`
    },
    {
      name: `domainid`,
      searchable: `true`,
      id: `ek3am`
    },
    {
      name: `siteid`,
      id: `xm497`
    },
    {
      name: `orgid`,
      id: `nzy46`
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
  isMaximoMobile: true,
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
                // end datasource - unitLookupDs

                
    
                // begin dialog - maxlib_asset_lookup_filter
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `maxlib_asset_lookup_filter`,
  configuration:   {
    id: `maxlib_asset_lookup_filter`,
    type: `lookupWithFilter`,
    isSingleTone: true,
    dialogRenderer: ((props => {
    return (
      <LookupWithFilterMaxlib_asset_lookup_filter {...props} />
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
                // end dialog - maxlib_asset_lookup_filter
                

                // begin dialog - maxlib_location_lookup_filter
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `maxlib_location_lookup_filter`,
  configuration:   {
    id: `maxlib_location_lookup_filter`,
    type: `lookupWithFilter`,
    isSingleTone: true,
    dialogRenderer: ((props => {
    return (
      <LookupWithFilterMaxlib_location_lookup_filter {...props} />
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
                // end dialog - maxlib_location_lookup_filter
                

                // begin dialog - appAssetMisMatchDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `appAssetMisMatchDialog`,
  configuration:   {
    id: `appAssetMisMatchDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogAppAssetMisMatchDialog id={"appAssetMisMatchDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - appAssetMisMatchDialog
                

                // begin dialog - appAssetScanDialog
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `appAssetScanDialog`,
  configuration:   {
    id: `appAssetScanDialog`,
    dialogRenderer: ((props => {
    return (
      <DialogAppAssetScanDialog id={"appAssetScanDialog_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - appAssetScanDialog
                

                // begin dialog - YRefenceLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `YRefenceLookup`,
  configuration:   {
    id: `YRefenceLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupYRefenceLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupYRefenceLookup {...props} />
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
                // end dialog - YRefenceLookup
                

                // begin dialog - EndYRefenceLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `EndYRefenceLookup`,
  configuration:   {
    id: `EndYRefenceLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupEndYRefenceLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupEndYRefenceLookup {...props} />
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
                // end dialog - EndYRefenceLookup
                

                // begin dialog - ZRefenceLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `ZRefenceLookup`,
  configuration:   {
    id: `ZRefenceLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupZRefenceLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupZRefenceLookup {...props} />
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
                // end dialog - ZRefenceLookup
                

                // begin dialog - EndZRefenceLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `EndZRefenceLookup`,
  configuration:   {
    id: `EndZRefenceLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupEndZRefenceLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupEndZRefenceLookup {...props} />
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
                // end dialog - EndZRefenceLookup
                

                // begin dialog - startReferncePointLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `startReferncePointLookup`,
  configuration:   {
    id: `startReferncePointLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupStartReferncePointLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupStartReferncePointLookup {...props} />
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
                // end dialog - startReferncePointLookup
                

                // begin dialog - endReferncePointLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `endReferncePointLookup`,
  configuration:   {
    id: `endReferncePointLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupEndReferncePointLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupEndReferncePointLookup {...props} />
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
                // end dialog - endReferncePointLookup
                

                // begin dialog - dataSheetWarnings
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `dataSheetWarnings`,
  configuration:   {
    id: `dataSheetWarnings`,
    dialogRenderer: ((props => {
    return (
      <DialogDataSheetWarnings id={"dataSheetWarnings_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - dataSheetWarnings
                

                // begin dialog - toolsError
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `toolsError`,
  configuration:   {
    id: `toolsError`,
    dialogRenderer: ((props => {
    return (
      <DialogToolsError id={"toolsError_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - toolsError
                

                // begin dialog - toolsWarnings
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `toolsWarnings`,
  configuration:   {
    id: `toolsWarnings`,
    dialogRenderer: ((props => {
    return (
      <DialogToolsWarnings id={"toolsWarnings_dlg_container"} datasource={props.datasource || undefined} item={props.item} key={props.key||props.id} onClose={props.onClose} zIndex={props.zIndex} callback={props.callback}/>
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
                // end dialog - toolsWarnings
                

                // begin dialog - unitLookup
                /* eslint-disable no-lone-blocks */
                {
                  let options = {
  name: `unitLookup`,
  configuration:   {
    id: `unitLookup`,
    type: `lookup`,
    align: `start`,
    dialogRenderer: ((props => {
    return (
      <LookupUnitLookup {...props} />
    );
  })
  ),
    renderer: ((props => {
    return (
      <LookupUnitLookup {...props} />
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
                // end dialog - unitLookup
                
  
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
      