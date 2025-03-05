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


import { Observer } from 'mobx-react';
import { Dashboard } from '@maximo/react-components';
import { DatasourceValueTile } from '@maximo/react-components';
import React from 'react';
const DashboardBkfdkComponent = (props) => {
  const app = props.app;
const page = props.page;
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = props.eventManager || datasource || dialog || page || app;
const templateContext = props.templateContext;
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

  return (<Observer>{()=>(<><Dashboard id={"bkfdk"} editFeature={false} hidePublic={true} deletePublic={true} addPublic={true} addPrivate={true} datacomponenttype={"dashboard"} datacomponentoriginalid={"bkfdk"}>
<DatasourceValueTile
          id={"uy3di5"} title={app.getLocalizedLabel("uy3di5_title", "Scheduled")} unit={app.getLocalizedLabel("uy3di5_unit", "work records")} datasource={jglobalKPIds} valueField={"performedTasks"} nodataLabel={app.getLocalizedLabel("uy3di5_nodata-label", "No data")} hasTitleWrap={true} size={"SMALL"} allowExtraAction={true} datacomponenttype={"dashboard-value-tile"} datacomponentoriginalid={"uy3di5"}
          thresholds={[

]}/>
<DatasourceValueTile
          id={"uy3wi2"} title={app.getLocalizedLabel("uy3wi2_title", "Scheduling issues")} unit={app.getLocalizedLabel("uy3wi2_unit", "work records")} datasource={jglobalKPIds} valueField={"unperformedTasks"} nodataLabel={app.getLocalizedLabel("uy3wi2_nodata-label", "No data")} hasTitleWrap={true} onValueClick={(event)=>{eventManager.emit('openSchedulingIssuesTab', event)}} size={"SMALL"} allowExtraAction={true} datacomponenttype={"dashboard-value-tile"} datacomponentoriginalid={"uy3wi2"}
          thresholds={[

]}/>
<DatasourceValueTile
          id={"uy24ij"} title={app.getLocalizedLabel("uy24ij_title", "Resource utilization")} unit={app.getLocalizedLabel("uy24ij_unit", "%")} datasource={jglobalKPIds} valueField={"resourceUtilization"} nodataLabel={app.getLocalizedLabel("uy24ij_nodata-label", "No data")} hasTitleWrap={true} size={"SMALL"} allowExtraAction={true} datacomponenttype={"dashboard-value-tile"} datacomponentoriginalid={"uy24ij"}
          thresholds={[

]}/>
<DatasourceValueTile
          id={"uye4ij"} title={app.getLocalizedLabel("uye4ij_title", "Total resources")} unit={app.getLocalizedLabel("uye4ij_unit", "labor/crew")} datasource={jglobalKPIds} valueField={"resourcesNum"} nodataLabel={app.getLocalizedLabel("uye4ij_nodata-label", "No data")} hasTitleWrap={true} size={"SMALL"} allowExtraAction={true} datacomponenttype={"dashboard-value-tile"} datacomponentoriginalid={"uye4ij"}
          thresholds={[

]}/>
</Dashboard>
</>)}</Observer>);
};
export default DashboardBkfdkComponent;

