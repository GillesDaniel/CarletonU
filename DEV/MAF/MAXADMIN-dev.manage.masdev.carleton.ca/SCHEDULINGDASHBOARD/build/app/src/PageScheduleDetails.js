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
import { UpdateOnChange } from '@maximo/react-components';
import { Observer } from 'mobx-react';
import { JSONDataAdapter } from '@maximo/maximo-js-api';
import { PageHeaderTemplate } from '@maximo/react-components';
import { MenuButton } from '@maximo/react-components';
import { MenuItem } from '@maximo/react-components';
import { Link } from '@maximo/react-components';
import { Dialog } from '@maximo/maximo-js-api';
import { PageLayout } from '@maximo/react-components';
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
    

    // our main generated App
    class PageScheduleDetails extends Component {
        componentDidMount() {
          let props = this.props;
          let page = props.app.findPage('scheduleDetails');
          
          if (page) {
            // let's do this about 100 ms after the first render, to allow for other activities to begin the load
            setTimeout(()=>{
              // load any datasources that were referenced in the render call,
              // but, not loaded at the time they were accessed.
              page.emit('load-datasources');
            },100)
          }
        }
        
        render() {
            const props = this.props;
            const app = props.app;
            const page = app.findPage('scheduleDetails');
            page.emit('page-render', {page: 'scheduleDetails'});
            app.log.t("UI", '[scheduleDetails]: Page UI is rendering');

            const datasource = page.getMainDatasource();
            const item = datasource ? datasource.item : undefined;
            const index = datasource ? datasource.state.currentItemIndex : -1;
            const itemId = item ? item[datasource.options.idAttribute] : undefined;
            const eventManager = props.eventManager || datasource || page;
            const dialog = null;
            const templateContext = {};

            const skdprojActivityDS = props.skdprojActivityDS || app.findDatasource("skdprojActivityDS");
const skdactivityDS = props.skdactivityDS || app.findDatasource("skdactivityDS");
const skdprojectsDS = props.skdprojectsDS || app.findDatasource("skdprojectsDS");
const skdactivityunscheduledDS = props.skdactivityunscheduledDS || app.findDatasource("skdactivityunscheduledDS");
const resourceLoadTableds = props.resourceLoadTableds || app.findDatasource("resourceLoadTableds");
const resourceLevelingDs = props.resourceLevelingDs || app.findDatasource("resourceLevelingDs");
const resourceTypesDS = props.resourceTypesDS || app.findDatasource("resourceTypesDS");
const skdodmerunlatestDS = props.skdodmerunlatestDS || app.findDatasource("skdodmerunlatestDS");
const skdprojectshiftsDS = props.skdprojectshiftsDS || app.findDatasource("skdprojectshiftsDS");
const skdprojectscenarioDS = props.skdprojectscenarioDS || app.findDatasource("skdprojectscenarioDS");
const jglobalKPIds = props.jglobalKPIds || app.findDatasource("jglobalKPIds");
const jresourceLevelingTaskDS = props.jresourceLevelingTaskDS || app.findDatasource("jresourceLevelingTaskDS");

            

            return (
              <PageLayout id="scheduleDetails" className="mx--page" padding={true} 
               stickyHeader={false}
               dockedFooter={false} skipTouchThemeBottomPadding={false}
              app={app} partOfRouter={true}>
                <Observer>{ ()=>(<UpdateOnChange fireOnMount="true" onUpdated={(attrs)=>skdprojActivityDS.updateBaseQuery(attrs)} where={`skdprojectid=${page.params.projectid}`}   />)}</Observer>
<Observer>{ ()=>(<UpdateOnChange fireOnMount="true" onUpdated={(attrs)=>resourceLoadTableds.updateBaseQuery(attrs)} ctx={`rlstartTime=${page.state.startTime},rltimeSpan=${page.state.timeSpan}`}   />)}</Observer>
<Observer>{ ()=>(<UpdateOnChange fireOnMount="true" onUpdated={(attrs)=>resourceLevelingDs.updateBaseQuery(attrs)} where={`id="${page.state.resourceid}"`} ctx={`rlstartTime=${page.state.startTime},rltimeSpan=${page.state.timeSpan}`}   />)}</Observer>
<Observer>{()=>(<PageHeaderTemplate
        title={app.getLocalizedLabel("d27wn_title", `{0} schedule`, [page.params.projectname])} hideBreadcrumb={false} showCurrentPageInBreadCrumb={false} subTitle={app.getLocalizedLabel("d27wn_sub-title", `{0} optimization`, [page.params.scheduletype])} enableWhiteBackground={true} mode={"dynamic"} id={"d27wn-pageheader"} stackBreadcrumbsWithTabs={true} enableNfcScanner={true} datacomponenttype={"header-template"} datacomponentoriginalid={"d27wn"}
        app={app}menuButtonAction={<React.Fragment><ButtonGroupV7n9mComponent templateContext={templateContext} eventManager={eventManager} itemId={itemId} index={index} item={item} datasource={datasource} dialog={dialog} page={page} app={app} skdprojActivityDS={skdprojActivityDS} skdactivityDS={skdactivityDS} skdprojectsDS={skdprojectsDS} skdactivityunscheduledDS={skdactivityunscheduledDS} resourceLoadTableds={resourceLoadTableds} resourceLevelingDs={resourceLevelingDs} resourceTypesDS={resourceTypesDS} skdodmerunlatestDS={skdodmerunlatestDS} skdprojectshiftsDS={skdprojectshiftsDS} skdprojectscenarioDS={skdprojectscenarioDS} jglobalKPIds={jglobalKPIds} jresourceLevelingTaskDS={jresourceLevelingTaskDS}/>
<MenuButton label={app.getLocalizedLabel("np2px_label", "Actions")} icon={"Carbon:chevron--down"} id={"np2px"} kind={"primary"} alignMenu={"end"} small={true} iconPosition={"start"} size={"lg"} datacomponenttype={"menu-button"} datacomponentoriginalid={"np2px"}>
<MenuItem label={app.getLocalizedLabel("xd53z_label", "Refresh schedule")} onClick={(event)=>{eventManager.emit('onRefresh', event)}} theme={"default"} id={"xd53z"} datacomponenttype={"menu-item"} datacomponentoriginalid={"xd53z"} />
<MenuItem label={app.getLocalizedLabel("dx5a7_label", "Optimize schedule")} onClick={(event)=>{eventManager.emit('optimizeDialog', event)}} theme={"default"} id={"dx5a7"} datacomponenttype={"menu-item"} datacomponentoriginalid={"dx5a7"} />
<MenuItem label={app.getLocalizedLabel("b62g3_label", "Publish schedule")} onClick={(event)=>{
        
        page.showDialog('publishScheduleDialog', null, {name: 'publishScheduleDialog' });
      }} theme={"default"} id={"b62g3"} datacomponenttype={"menu-item"} datacomponentoriginalid={"b62g3"} />
</MenuButton>
</React.Fragment>}customContent={<Link label={app.getLocalizedLabel("gyfwq_label", `Last ran on {0}`, [app.format(skdprojectsDS.item.optimizationendtime,'optimizationendtime', null, skdprojectsDS)])} onClick={(event)=>{eventManager.emit('change-page', {name: 'optimizeSchedule' , params:({'href':page.params.scenario, 'projectname':page.params.projectname, 'timelimit':30,'interval':10, 'selectedTab':2,'scheduletype':page.params.scheduletype, 'issuecount':page.params.issuecount, 'startdate':page.params.startdate, 'enddate': page.params.enddate, 'projectid': page.params.projectid})}, event)}} hidden={!skdprojectsDS.item.optimizationendtime} id={"gyfwq"} spacing={"form"} datacomponenttype={"link"} datacomponentoriginalid={"gyfwq"} />
}tabs={<IncludeEf32v id={"ef32v"} dataDSMonitor0={skdprojActivityDS.state.changedFlag} dataDSMonitor1={skdactivityDS.state.changedFlag} dataDSMonitor2={skdprojectsDS.state.changedFlag} dataDSMonitor3={skdactivityunscheduledDS.state.changedFlag} dataDSMonitor4={resourceLoadTableds.state.changedFlag} dataDSMonitor5={resourceLevelingDs.state.changedFlag} dataDSMonitor6={resourceTypesDS.state.changedFlag} dataDSMonitor7={skdodmerunlatestDS.state.changedFlag} dataDSMonitor8={skdprojectshiftsDS.state.changedFlag} dataDSMonitor9={skdprojectscenarioDS.state.changedFlag} dataDSMonitor10={jglobalKPIds.state.changedFlag} dataDSMonitor11={jresourceLevelingTaskDS.state.changedFlag}   eventManager={eventManager} />
}/>)}</Observer>
              </PageLayout>
            );
        };
    }
    export default inject('app')(observer(PageScheduleDetails));

    
