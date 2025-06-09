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
import { Box } from '@maximo/react-components';
import { IconGroup } from '@maximo/react-components';
import { DatasourceThreshold } from '@maximo/react-components';
import { Label } from '@maximo/react-components';
import { DatasourceDropdown } from '@maximo/react-components';
import { StatusBar } from '@maximo/react-components';
import { DropZone } from '@maximo/react-components';
import React from 'react';
import DataListZxc2ccef32v from './DataListZxc2ccef32v';
const DataGridDf4fdfComponent = (props) => {
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

  return (<Observer>{()=>(<><DataGrid id={"df4fdf"} datasource={resourceLevelingDs} mode={"time-series"} autoLoad={true} padding={true} highlightAxis={false} rowLabelColor={"white0"} cellWidth={264} timeSpan={"14D"} startTime={page.params.startdate} endTime={page.params.enddate} fullHeight={true} hideVerticalAxis={true} overrideDefaultCellHeight={true} defaultStartDate={page.state.startTime} headerPosition={"top"} noDataIcon={"empty"} datacomponenttype={"data-grid"} datacomponentoriginalid={"df4fdf"}
     columns={[
`name`
]}
     columnLabel={[

]}
     legend={<Box
    id={"dcdf42"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"dcdf42"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<IconGroup label={app.getLocalizedLabel("vpvep_label", "95%-100%")} primaryIcon={"maximo:dot"} primaryIconColor={"#42BE65"} id={"vpvep"} datacomponenttype={"icon-group"} datacomponentoriginalid={"vpvep"}      />
<IconGroup label={app.getLocalizedLabel("d3d2r_label", "90%-95%")} primaryIcon={"maximo:dot"} primaryIconColor={"#70DC8C"} id={"d3d2r"} datacomponenttype={"icon-group"} datacomponentoriginalid={"d3d2r"}      />
<IconGroup label={app.getLocalizedLabel("bzz97_label", "80%-90%")} primaryIcon={"maximo:dot"} primaryIconColor={"#A7F0BA"} id={"bzz97"} datacomponenttype={"icon-group"} datacomponentoriginalid={"bzz97"}      />
<IconGroup label={app.getLocalizedLabel("wg6g__label", "Under 80%")} primaryIcon={"maximo:dot"} primaryIconColor={"#F1C21B"} id={"wg6g_"} datacomponenttype={"icon-group"} datacomponentoriginalid={"wg6g_"}      />
<IconGroup label={app.getLocalizedLabel("vbge4_label", "Over 100%")} primaryIcon={"maximo:dot"} primaryIconColor={"#DA1E28"} id={"vbge4"} datacomponenttype={"icon-group"} datacomponentoriginalid={"vbge4"}      />
</Box>
}
     
     rowLabelRenderer={(item, key, index, label)=>{return (<><StatusBar label={(item?item.key:undefined)} value={(item?item.hoursUtilized:undefined)} light={false} id={"h67gj"} datacomponenttype={"status-bar"} datacomponentoriginalid={"h67gj"} thresholds={[
  {
    comparison: ((value) => {
  const event = {value, matches: false};
  eventManager.emit('resourceLevelingIsDarkGreen', event);
  return event.matches;
}),
    color: ("#42BE65")
  },
  {
    comparison: ((value) => {
  const event = {value, matches: false};
  eventManager.emit('resourceLevelingIsMediumGreen', event);
  return event.matches;
}),
    color: ("#70DC8C")
  },
  {
    comparison: ((value) => {
  const event = {value, matches: false};
  eventManager.emit('resourceLevelingIsLightGreen', event);
  return event.matches;
}),
    color: ("#A7F0BA")
  },
  {
    comparison: ("<"),
    value: ("80"),
    color: ("#F1C21B")
  },
  {
    icon: ("carbon:checkmark--filled"),
    comparison: (">"),
    value: ("100"),
    color: ("#DA1E28")
  }
]}/>
</>)}}
      columnLabelRenderer={(label, item)=>{return (<><Label  theme={"field"} label={label || 'Loading....'} id={"df4r3"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"df4r3"}></Label>
</>)}}
      customCellRenderer={(value,item, key, index)=>{return (<><Box
    id={"sds23"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"hidden"}
    verticalOverflow={"auto"}
    direction={"column"}
    fillParent={true}
    
    
    
    
    flexShrink={"0"}
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={false}
    
    datacomponentoriginalid={"sds23"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"fsdf3f"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"hidden"}
    verticalOverflow={"auto"}
    direction={"column"}
    
    fillParentHorizontal={true}
    fillParentVertical={false}
    
    
    flexShrink={"0"}
    
    
    hidden={true}
    
    
    
    
    
    
    
    
    manageChildren={false}
    
    datacomponentoriginalid={"fsdf3f"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<DropZone datasource={app.findDatasource(value.datasource)} dropKey={"datalist"} noPadding={true} backgroundColor={"ui-02"} id={"a7ri953"} datacomponenttype={"drop-zone"} datacomponentoriginalid={"a7ri953"}>
<Label  label={value.hoursAvailable + ' hours available'} id={"vw9i_vb"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"vw9i_vb"}></Label>
</DropZone>
</Box>
<DataListZxc2ccef32v id={"zxc2cc"} showSearch={false} datasource={app.findDatasource(value.datasource)} tight={true} hideSingleSelectIcon={true} emptySetString={app.getLocalizedLabel("zxc2cc_empty-set-string", "No work records to show")} itemToOpen={page.state.itemToOpen} showOnhoverScroll={true} theme={"dark"} rowSpace={"none"} enableNfcScanner={true} noDataIcon={"empty"} showDragHandle={true} showLastChildSelection={true} datadraggable={"true"} droppable={"true"} datacomponenttype={"data-list"} datacomponentoriginalid={"zxc2cc"} childAttr={""} itemClick={(event)=>{eventManager.emit('openDetailsSlidingDrawer', event)}} />
</Box>
</>)}}
      valueProvider={(item, key, index,resultKey, ds) => {
              let event ={item, key, index,resultKey, ds};
              eventManager.emit('getDataListCellValueDateGridTimeSeries', event);
              return event[resultKey];
            }}
      
          
         
        
      headerContentStart={<Box
    id={"wqa6_"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={false}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"wqa6_"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >

      <DatasourceDropdown
      id={"vw943"}
      onChange={(event)=>{
        const arg = page.state.resourceid;
        page.state.resourceid=event.selectedItem.id;
      }}
      maxItems={100}
      datasource={resourceTypesDS}
      datasourceItemValueField={"id"}
      
      hideLabel={true}
      
      datasourceItemTextField={"resourcename"}
      dataFormatter={app.formatter}
      
      selectedItem={page.state.resourceid}

      
      hideUnspecified={true}
      
      size={"none"}
      theme={"dark"}
      height={"tall"}
      
      
      
      
      />
    
</Box>
} 
        
        
     />
</>)}</Observer>);
};
export default DataGridDf4fdfComponent;

