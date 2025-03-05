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
import { DataGrid } from '@maximo/react-components';
import { Label } from '@maximo/react-components';
import { Box } from '@maximo/react-components';
import { IconGroup } from '@maximo/react-components';
import { DatasourceThreshold } from '@maximo/react-components';
import { Link } from '@maximo/react-components';
import React from 'react';
const DataGridJvzabComponent = (props) => {
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

  return (<Observer>{()=>(<><DataGrid id={"jvzab"} title={app.getLocalizedLabel("jvzab_title", "Resources")} datasource={resourceLoadTableds} mode={"time-series"} autoLoad={true} padding={false} cellHeight={48} timeSpan={"14D"} startTime={page.params.startdate} endTime={page.params.enddate} onTimeRangeChange={(event)=>{eventManager.emit('moveNext', event)}} yAxisWidth={300} noData={page.params.nodata} noDataMessage={app.getLocalizedLabel("jvzab_no-data-message", "You don't have any resource utilization data yet.")} noDataButtonLabel={app.getLocalizedLabel("jvzab_no-data-button-label", "Optimize schedule")} noDataSubLabel={app.getLocalizedLabel("jvzab_no-data-sub-label", "You must run optimization to view utilization levels by resource.")} noDataButtonIcon={"carbon:renew"} noDataAction={(event)=>{eventManager.emit('optimizeDialog', event)}} fullHeight={true} headerPosition={"top"} noDataIcon={"empty"} datacomponenttype={"data-grid"} datacomponentoriginalid={"jvzab"}
     columns={[

]}
     columnLabel={[

]}
     legend={<Box
    id={"gneew"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"gneew"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<IconGroup label={app.getLocalizedLabel("v94zk_label", "95%-100%")} primaryIcon={"maximo:box"} primaryIconColor={"#42BE65"} id={"v94zk"} datacomponenttype={"icon-group"} datacomponentoriginalid={"v94zk"}      />
<IconGroup label={app.getLocalizedLabel("pamn3_label", "90%-95%")} primaryIcon={"maximo:box"} primaryIconColor={"#70DC8C"} id={"pamn3"} datacomponenttype={"icon-group"} datacomponentoriginalid={"pamn3"}      />
<IconGroup label={app.getLocalizedLabel("j5b_d_label", "80%-90%")} primaryIcon={"maximo:box"} primaryIconColor={"#A7F0BA"} id={"j5b_d"} datacomponenttype={"icon-group"} datacomponentoriginalid={"j5b_d"}      />
<IconGroup label={app.getLocalizedLabel("vmbj3_label", "Under 80%")} primaryIcon={"maximo:box"} primaryIconColor={"#F1C21B"} id={"vmbj3"} datacomponenttype={"icon-group"} datacomponentoriginalid={"vmbj3"}      />
<IconGroup label={app.getLocalizedLabel("q69qx_label", "Over 100%")} primaryIcon={"maximo:box"} primaryIconColor={"#DA1E28"} id={"q69qx"} datacomponenttype={"icon-group"} datacomponentoriginalid={"q69qx"}      />
</Box>
}
     
     
      columnLabelRenderer={(label, item)=>{return (<><Link label={app.format((item?item.resourcename:undefined),'resourcename',null,datasource)} onClick={(event)=>{eventManager.emit('openResourceLevelingTab', {startdate: page.params.startdate, resourceid: item.id}, event)}} id={"vrndx"} spacing={"form"} datacomponenttype={"link"} datacomponentoriginalid={"vrndx"} />
</>)}}
      customCellRenderer={(value,item, key, index)=>{return (<><Box
    id={"xpbxv"}
    backgroundColor={value.backgroundColor}
    margin={0.0625}
    
    
    
    
    horizontalAlign={"center"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={true}
    
    
    
    
    
    
    childrenHideOverflow={true}
    
    flexBasis={100}
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"xpbxv"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"q8avm"}
    
    margin={0.5}
    
    
    
    
    horizontalAlign={"center"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"q8avm"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"field"} label={value.load} color={value.textColor} id={"x2pre"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"x2pre"}></Label>
</Box>
<Box
    id={"rnjr2"}
    
    margin={1.5}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    hidden={!value.hideText}
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"rnjr2"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
</Box>
</Box>
</>)}}
      valueProvider={(item, key, index,resultKey, ds) => {
              let event ={item, key, index,resultKey, ds};
              eventManager.emit('getResourceLoadCellValue', event);
              return event[resultKey];
            }}
      tooltip={(value,item, key, index)=>{return {content: <React.Fragment><Label  label={app.getLocalizedLabel("jh5jmy_label", `{0} hrs scheduled`, [value.scheduledhrs])} wrap={true} id={"jh5jmy"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"jh5jmy"}></Label>
<Label  label={app.getLocalizedLabel("qvxny_label", `{0} hrs available`, [value.availablehrs])} wrap={true} id={"qvxny"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"qvxny"}></Label>
<Label  label={app.getLocalizedLabel("ymyw6_label", `{0}% resource utilization`, [value.utilization])} wrap={true} id={"ymyw6"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"ymyw6"}></Label>
</React.Fragment>, button: null, link: null}}}
      onCellAction={(item, key, index, resultKey, event) => {
              let evt ={item, key, index, resultKey, event};
              eventManager.emit('openResourceLevelingTab', evt);
            }}    
      customYAxisWidth={300}   
        
       
        
        
     />
</>)}</Observer>);
};
export default DataGridJvzabComponent;

