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
import { TagGroup } from '@maximo/react-components';
import { Dialog } from '@maximo/maximo-js-api';
import { PageLayout } from '@maximo/react-components';
import ScheduleDetailsController from './ScheduleDetailsController';
import OptimizeSchedulePageController from './OptimizeSchedulePageController';
import ButtonGroupQg93nComponent from './ButtonGroupQg93nComponent';
import ButtonGroupWg5q4Component from './ButtonGroupWg5q4Component';
import ButtonGroupNmnpjComponent from './ButtonGroupNmnpjComponent';
import IncludeAbwgj from './IncludeAbwgj';
import DialogOptimizationProgressLog from './DialogOptimizationProgressLog';
    

    // our main generated App
    class PageOptimizeSchedule extends Component {
        componentDidMount() {
          let props = this.props;
          let page = props.app.findPage('optimizeSchedule');
          
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
            const page = app.findPage('optimizeSchedule');
            page.emit('page-render', {page: 'optimizeSchedule'});
            app.log.t("UI", '[optimizeSchedule]: Page UI is rendering');

            const datasource = page.getMainDatasource();
            const item = datasource ? datasource.item : undefined;
            const index = datasource ? datasource.state.currentItemIndex : -1;
            const itemId = item ? item[datasource.options.idAttribute] : undefined;
            const eventManager = props.eventManager || datasource || page;
            const dialog = null;
            const templateContext = {};

            const skdprojectForOptimizeDS = props.skdprojectForOptimizeDS || app.findDatasource("skdprojectForOptimizeDS");
const skdactivityForOptimizeDS = props.skdactivityForOptimizeDS || app.findDatasource("skdactivityForOptimizeDS");
const skdodmerunForOptimizeDS = props.skdodmerunForOptimizeDS || app.findDatasource("skdodmerunForOptimizeDS");
const jOptimizeAlertsDS = props.jOptimizeAlertsDS || app.findDatasource("jOptimizeAlertsDS");
const jOptimizeSummaryDS = props.jOptimizeSummaryDS || app.findDatasource("jOptimizeSummaryDS");

            

            return (
              <PageLayout id="optimizeSchedule" className="mx--page" padding={true} 
               stickyHeader={false}
               dockedFooter={false} skipTouchThemeBottomPadding={false}
              app={app} partOfRouter={true}>
                <Observer>{()=>(<PageHeaderTemplate
        title={app.getLocalizedLabel("p7jgz_title", "Optimize schedule")} hideBreadcrumb={false} showCurrentPageInBreadCrumb={false} subTitle={app.getLocalizedLabel("p7jgz_sub-title", `{0} schedule`, [page.params.projectname])} enableWhiteBackground={true} mode={"dynamic"} id={"p7jgz-pageheader"} stackBreadcrumbsWithTabs={true} enableNfcScanner={true} datacomponenttype={"header-template"} datacomponentoriginalid={"p7jgz"}
        app={app}menuButtonAction={<React.Fragment><ButtonGroupQg93nComponent templateContext={templateContext} eventManager={eventManager} itemId={itemId} index={index} item={item} datasource={datasource} dialog={dialog} page={page} app={app} skdprojectForOptimizeDS={skdprojectForOptimizeDS} skdactivityForOptimizeDS={skdactivityForOptimizeDS} skdodmerunForOptimizeDS={skdodmerunForOptimizeDS} jOptimizeAlertsDS={jOptimizeAlertsDS} jOptimizeSummaryDS={jOptimizeSummaryDS}/>
<ButtonGroupWg5q4Component templateContext={templateContext} eventManager={eventManager} itemId={itemId} index={index} item={item} datasource={datasource} dialog={dialog} page={page} app={app} skdprojectForOptimizeDS={skdprojectForOptimizeDS} skdactivityForOptimizeDS={skdactivityForOptimizeDS} skdodmerunForOptimizeDS={skdodmerunForOptimizeDS} jOptimizeAlertsDS={jOptimizeAlertsDS} jOptimizeSummaryDS={jOptimizeSummaryDS}/>
<ButtonGroupNmnpjComponent templateContext={templateContext} eventManager={eventManager} itemId={itemId} index={index} item={item} datasource={datasource} dialog={dialog} page={page} app={app} skdprojectForOptimizeDS={skdprojectForOptimizeDS} skdactivityForOptimizeDS={skdactivityForOptimizeDS} skdodmerunForOptimizeDS={skdodmerunForOptimizeDS} jOptimizeAlertsDS={jOptimizeAlertsDS} jOptimizeSummaryDS={jOptimizeSummaryDS}/>
</React.Fragment>}customContent={<TagGroup className={"some-class"} type={"teal"} align={"start"} wrap={true} tags={skdodmerunForOptimizeDS.item.computeOptimizationStatusTag} id={"ke8v6"} datacomponenttype={"tag-group"} datacomponentoriginalid={"ke8v6"} key={JSON.stringify(skdodmerunForOptimizeDS.item.computeOptimizationStatusTag)} clearTooltip={undefined}></TagGroup>
}tabs={<IncludeAbwgj id={"abwgj"} dataDSMonitor0={skdprojectForOptimizeDS.state.changedFlag} dataDSMonitor1={skdactivityForOptimizeDS.state.changedFlag} dataDSMonitor2={skdodmerunForOptimizeDS.state.changedFlag} dataDSMonitor3={jOptimizeAlertsDS.state.changedFlag} dataDSMonitor4={jOptimizeSummaryDS.state.changedFlag}   eventManager={eventManager} />
}/>)}</Observer>
              </PageLayout>
            );
        };
    }
    export default inject('app')(observer(PageOptimizeSchedule));

    
