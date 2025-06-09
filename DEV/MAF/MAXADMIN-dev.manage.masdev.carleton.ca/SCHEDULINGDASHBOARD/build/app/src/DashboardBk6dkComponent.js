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
const DashboardBk6dkComponent = (props) => {
  const app = props.app;
const page = props.page;
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = props.eventManager || datasource || dialog || page || app;
const templateContext = props.templateContext;
  const skdprojectDS = props.skdprojectDS || app.findDatasource("skdprojectDS");
const mySchedules = props.mySchedules || app.findDatasource("mySchedules");
const myCommitSchedules = props.myCommitSchedules || app.findDatasource("myCommitSchedules");
const skdodmerunDS = props.skdodmerunDS || app.findDatasource("skdodmerunDS");
const jdashboardKPIds = props.jdashboardKPIds || app.findDatasource("jdashboardKPIds");

  return (<Observer>{()=>(<><Dashboard id={"bk6dk"} editFeature={false} hidePublic={true} deletePublic={true} addPublic={true} addPrivate={true} datacomponenttype={"dashboard"} datacomponentoriginalid={"bk6dk"}>
<DatasourceValueTile
          id={"vppgv"} title={app.getLocalizedLabel("vppgv_title", "Scheduled")} unit={app.getLocalizedLabel("vppgv_unit", "work records")} datasource={jdashboardKPIds} valueField={"performedTasks"} nodataLabel={app.getLocalizedLabel("vppgv_nodata-label", "No data")} tooltip={app.getLocalizedLabel("vppgv_tooltip", "The total number of scheduled work records that are included in all schedules on the dashboard. This number does not include work records that have no resource requirements.")} hasTitleWrap={true} size={"SMALL"} allowExtraAction={true} datacomponenttype={"dashboard-value-tile"} datacomponentoriginalid={"vppgv"}
          thresholds={[

]}/>
<DatasourceValueTile
          id={"uy34i5"} title={app.getLocalizedLabel("uy34i5_title", "Scheduling issues")} unit={app.getLocalizedLabel("uy34i5_unit", "work records")} datasource={jdashboardKPIds} valueField={"unperformedTasks"} nodataLabel={app.getLocalizedLabel("uy34i5_nodata-label", "No data")} tooltip={app.getLocalizedLabel("uy34i5_tooltip", "The number of work records that optimization could not schedule in all schedules on the dashboard. You can see and fix the scheduling issues by clicking the scheduling issues column for each affected schedule.")} hasTitleWrap={true} size={"SMALL"} allowExtraAction={true} datacomponenttype={"dashboard-value-tile"} datacomponentoriginalid={"uy34i5"}
          thresholds={[

]}/>
<DatasourceValueTile
          id={"uy34i2"} title={app.getLocalizedLabel("uy34i2_title", "Resource utilization")} unit={app.getLocalizedLabel("uy34i2_unit", "%")} datasource={jdashboardKPIds} valueField={"resourceUtilization"} nodataLabel={app.getLocalizedLabel("uy34i2_nodata-label", "No data")} tooltip={app.getLocalizedLabel("uy34i2_tooltip", "The percentage of resource time that has work assigned. This percentage is the total utilization rate for all resource time in all schedules that are included in the dashboard.")} hasTitleWrap={true} size={"SMALL"} allowExtraAction={true} datacomponenttype={"dashboard-value-tile"} datacomponentoriginalid={"uy34i2"}
          thresholds={[

]}/>
<DatasourceValueTile
          id={"uy34ij"} title={app.getLocalizedLabel("uy34ij_title", "Total resources")} unit={app.getLocalizedLabel("uy34ij_unit", "labor/crew")} datasource={jdashboardKPIds} valueField={"resourcesNum"} nodataLabel={app.getLocalizedLabel("uy34ij_nodata-label", "No data")} tooltip={app.getLocalizedLabel("uy34ij_tooltip", "The total number of labor and crew resources that are included in all schedules on the dashboard.")} hasTitleWrap={true} size={"SMALL"} allowExtraAction={true} datacomponenttype={"dashboard-value-tile"} datacomponentoriginalid={"uy34ij"}
          thresholds={[

]}/>
</Dashboard>
</>)}</Observer>);
};
export default DashboardBk6dkComponent;

