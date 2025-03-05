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


import { observer } from 'mobx-react';
import { inject } from 'mobx-react';
import { Box } from '@maximo/react-components';
import { Tabs } from '@maximo/react-components';
import { Tab } from '@maximo/react-components';
import React from 'react';
import DashboardBkfdkComponent from './DashboardBkfdkComponent';
import DataGridJvzabComponent from './DataGridJvzabComponent';
import DataGridDf4fdfComponent from './DataGridDf4fdfComponent';
import TableB3gyy from './TableB3gyy';
class IncludeEf32v extends React.Component {
  

  

  render() {
    const props = this.props;
    const app = props.app;
const page = props.page || app.findPage('scheduleDetails') || app;
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = props.eventManager || dialog || page || app;
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

    

    return (
      <Box
    id={"xnd6z"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"xnd6z"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Tabs id={"jgmzr"} selected={page.state.selectedTab} type={"default"} increaseTabsWidth={true} datacomponenttype={"tabs"} datacomponentoriginalid={"jgmzr"} onSelectionChange={(event)=>{
        
        page.state.selectedTab=event;
      }}
      
      >
<Tab id={"g5jz2"} onClick={(event)=>{eventManager.emit('switchTabs', {selectedTab: 0}, event)}} label={app.getLocalizedLabel("g5jz2_label", "Resource utilization")} datacomponenttype={"tab"} datacomponentoriginalid={"g5jz2"} statusType={null} badgeType={null}>
<Box
    id={"kwvkk"}
    
    margin={0}
    
    
    marginTop={1}
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"kwvkk"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"z6pjb"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"z6pjb"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<DashboardBkfdkComponent templateContext={templateContext} eventManager={eventManager} itemId={itemId} index={index} item={item} datasource={datasource} dialog={dialog} page={page} app={app} skdprojActivityDS={skdprojActivityDS} skdactivityDS={skdactivityDS} skdprojectsDS={skdprojectsDS} skdactivityunscheduledDS={skdactivityunscheduledDS} resourceLoadTableds={resourceLoadTableds} resourceLevelingDs={resourceLevelingDs} resourceTypesDS={resourceTypesDS} skdodmerunlatestDS={skdodmerunlatestDS} skdprojectshiftsDS={skdprojectshiftsDS} skdprojectscenarioDS={skdprojectscenarioDS} jglobalKPIds={jglobalKPIds} jresourceLevelingTaskDS={jresourceLevelingTaskDS}/>
</Box>
<Box
    id={"dn7a9"}
    
    margin={0}
    
    
    marginTop={'1'}
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"dn7a9"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<DataGridJvzabComponent templateContext={templateContext} eventManager={eventManager} itemId={itemId} index={index} item={item} dialog={dialog} page={page} app={app} skdprojActivityDS={skdprojActivityDS} skdactivityDS={skdactivityDS} skdprojectsDS={skdprojectsDS} skdactivityunscheduledDS={skdactivityunscheduledDS} resourceLoadTableds={resourceLoadTableds} resourceLevelingDs={resourceLevelingDs} resourceTypesDS={resourceTypesDS} skdodmerunlatestDS={skdodmerunlatestDS} skdprojectshiftsDS={skdprojectshiftsDS} skdprojectscenarioDS={skdprojectscenarioDS} jglobalKPIds={jglobalKPIds} jresourceLevelingTaskDS={jresourceLevelingTaskDS} datasource={resourceLoadTableds}/>
</Box>
</Box>
</Tab>
<Tab id={"x3baz"} onClick={(event)=>{eventManager.emit('switchTabs', {selectedTab: 1}, event)}} label={app.getLocalizedLabel("x3baz_label", "Resource leveling")} datacomponenttype={"tab"} datacomponentoriginalid={"x3baz"} statusType={null} badgeType={null}>
<Box
    id={"grzd3"}
    
    margin={0}
    
    
    marginTop={1}
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"grzd3"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<DataGridDf4fdfComponent templateContext={templateContext} eventManager={eventManager} itemId={itemId} index={index} item={item} dialog={dialog} page={page} app={app} skdprojActivityDS={skdprojActivityDS} skdactivityDS={skdactivityDS} skdprojectsDS={skdprojectsDS} skdactivityunscheduledDS={skdactivityunscheduledDS} resourceLoadTableds={resourceLoadTableds} resourceLevelingDs={resourceLevelingDs} resourceTypesDS={resourceTypesDS} skdodmerunlatestDS={skdodmerunlatestDS} skdprojectshiftsDS={skdprojectshiftsDS} skdprojectscenarioDS={skdprojectscenarioDS} jglobalKPIds={jglobalKPIds} jresourceLevelingTaskDS={jresourceLevelingTaskDS} datasource={resourceLevelingDs}/>
</Box>
</Tab>
<Tab id={"e5d39"} onClick={(event)=>{eventManager.emit('switchTabs', {selectedTab: 2}, event)}} label={app.getLocalizedLabel("e5d39_label", `Scheduling issues ({0})`, [page.state.tasksWithIssues])} datacomponenttype={"tab"} datacomponentoriginalid={"e5d39"} statusType={null} badgeType={null}>
<Box
    id={"amj_e"}
    
    margin={0}
    
    
    marginTop={0.5}
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"amj_e"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<TableB3gyy id={"b3gyy"} datasource={skdactivityunscheduledDS}   />
</Box>
</Tab>
</Tabs>
</Box>

    );
  }
}
export default inject('app')(observer(IncludeEf32v));
    
