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
import { PageLayout } from '@maximo/react-components';
import ScheduleTableController from './ScheduleTableController';
import ScheduleTablePageController from './ScheduleTablePageController';
import IncludeEk32v from './IncludeEk32v';
    

    // our main generated App
    class PageSchedule extends Component {
        componentDidMount() {
          let props = this.props;
          let page = props.app.findPage('schedule');
          
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
            const page = app.findPage('schedule');
            page.emit('page-render', {page: 'schedule'});
            app.log.t("UI", '[schedule]: Page UI is rendering');

            const datasource = page.getMainDatasource();
            const item = datasource ? datasource.item : undefined;
            const index = datasource ? datasource.state.currentItemIndex : -1;
            const itemId = item ? item[datasource.options.idAttribute] : undefined;
            const eventManager = props.eventManager || datasource || page;
            const dialog = null;
            const templateContext = {};

            const skdprojectDS = props.skdprojectDS || app.findDatasource("skdprojectDS");
const mySchedules = props.mySchedules || app.findDatasource("mySchedules");
const myCommitSchedules = props.myCommitSchedules || app.findDatasource("myCommitSchedules");
const skdodmerunDS = props.skdodmerunDS || app.findDatasource("skdodmerunDS");
const jdashboardKPIds = props.jdashboardKPIds || app.findDatasource("jdashboardKPIds");

            

            return (
              <PageLayout id="schedule" className="mx--page" padding={true} 
               stickyHeader={false}
               dockedFooter={false} skipTouchThemeBottomPadding={false}
              app={app} partOfRouter={true}>
                <Observer>{()=>(<PageHeaderTemplate
        title={app.getLocalizedLabel("ab3a4_title", "Scheduling dashboard")} hideBreadcrumb={true} id={"ab3a4-pageheader"} stackBreadcrumbsWithTabs={true} enableNfcScanner={true} mode={"dynamic"} datacomponenttype={"header-template"} datacomponentoriginalid={"ab3a4"}
        app={app}dropdown={
      <Dropdown
      id={"y49am"}
      items={[
  {
    id: ("mySchedules"),
    text: (app.getLocalizedLabel("jby4d_text", "My Schedules")),
    disabled: (undefined),
    hidden: (undefined)
  },
  {
    id: ("myCommitSchedules"),
    text: (app.getLocalizedLabel("w2r8m_text", "My Commit Schedules")),
    disabled: (undefined),
    hidden: (undefined)
  }
]}
      onChange={(event)=>{
        
        page.state.selectedDatasource=event.selectedItem.id;
      }}
      selectedItem={page.state.selectedDatasource}
      itemValueField={"id"}
      itemTextField={"text"}
      itemToString={item => {
          return item ? item.text : '';
        }}
      
      
      hideUnspecified={true}
      
      size={"none"}
      
      
      
      
      height={"tall"}
      padding={true}
      
      
      
      backgroundColor={"white"}
      
      />
    
}/>)}</Observer><IncludeEk32v id={"ek32v"} dataDSMonitor0={skdprojectDS.state.changedFlag} dataDSMonitor1={mySchedules.state.changedFlag} dataDSMonitor2={myCommitSchedules.state.changedFlag} dataDSMonitor3={skdodmerunDS.state.changedFlag} dataDSMonitor4={jdashboardKPIds.state.changedFlag}   eventManager={eventManager} />

              </PageLayout>
            );
        };
    }
    export default inject('app')(observer(PageSchedule));

    
