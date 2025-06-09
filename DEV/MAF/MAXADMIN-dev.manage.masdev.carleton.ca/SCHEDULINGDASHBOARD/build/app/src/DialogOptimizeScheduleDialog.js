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
import { Dialog } from '@maximo/react-components';
import { Box } from '@maximo/react-components';
import { Label } from '@maximo/react-components';
import { AdaptiveRow } from '@maximo/react-components';
import { AdaptiveColumn } from '@maximo/react-components';
import { Toggle } from '@maximo/react-components';
import { NumberInput } from '@maximo/react-components';
import { Dropdown } from '@maximo/react-components';
import { CheckBoxGroup } from '@maximo/react-components';
import React from 'react';
class DialogOptimizeScheduleDialog extends React.Component {
  
        constructor(props) {
          super(props)
          let dialog = props.app.findDialog("optimizeScheduleDialog");

      if (dialog) dialog.initialize();
        }
      

  

  render() {
    const props = this.props;
    const app = props.app;
const page = props.page || app.findPage('scheduleDetails') || app;
const dialog = app.findDialog('optimizeScheduleDialog');
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = dialog;
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
      <Dialog id={"optimizeScheduleDialog"}
    className="mx--composed-dialog"
    
    closeAction={(event)=>{eventManager.emit('dialogClosed', event)}}
    
    
    
    
    
    primaryAction={(event)=>{eventManager.emit('saveAndGoToOptimizeSchedulePage', event)}}
    
    
    
    primaryButtonText={app.getLocalizedLabel("optimizeScheduleDialog_primary-action-text", "Optimize schedule")}
    
    
    secondaryAction={(event)=>{eventManager.emit('dialogClosed', event)}}
    
    secondaryButtonText={app.getLocalizedLabel("optimizeScheduleDialog_secondary-action-text", "Cancel")}
    heading={app.getLocalizedLabel("optimizeScheduleDialog_title", "Optimize schedule")}
    
    
    
    
    
    padding={"none"}
    
    
    
    
    
    
    zIndex={props.zIndex}
    onClose={props.onClose}
    callback={props.callback}
    content={<Box
    id={"qwrya"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"qwrya"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"r8n7j"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"r8n7j"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"header-small"} label={app.getLocalizedLabel("gdjvy_label", "Scheduling rules")} id={"gdjvy"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"gdjvy"}></Label>
</Box>
<AdaptiveRow id={"nazxe"} datacomponenttype={"adaptive-row"} datacomponentoriginalid={"nazxe"}>
<AdaptiveColumn 
      id={"nv6_8"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"nv6_8"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"wgkjw"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"wgkjw"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Toggle toggled={skdprojectscenarioDS.item.skdreslevelparam[0].cmatchskill} label={app.getLocalizedLabel("bwmj6_label", "Match skills?")} type={"TrueFalse"} toggleLabelOff={app.getLocalizedLabel("bwmj6_toggle-label-off", "Off")} toggleLabelOn={app.getLocalizedLabel("bwmj6_toggle-label-on", "On")} id={"bwmj6"} size={"md"} datacomponenttype={"toggle"} datacomponentoriginalid={"bwmj6"} onToggle={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].cmatchskill=event.target['checked'];
      }}  labelA={app.getLocalizedLabel("bwmj6_toggle-label-off", "Off")}  labelB={app.getLocalizedLabel("bwmj6_toggle-label-on", "On")}></Toggle>
</Box>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"q7gnr"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"q7gnr"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"q4nmm"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"q4nmm"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Toggle toggled={skdprojectscenarioDS.item.skdreslevelparam[0].venforceams} label={app.getLocalizedLabel("v5ded_label", "Enforce asset maintenance schedule?")} type={"TrueFalse"} toggleLabelOff={app.getLocalizedLabel("v5ded_toggle-label-off", "Off")} toggleLabelOn={app.getLocalizedLabel("v5ded_toggle-label-on", "On")} id={"v5ded"} size={"md"} datacomponenttype={"toggle"} datacomponentoriginalid={"v5ded"} onToggle={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].venforceams=event.target['checked'];
      }}  labelA={app.getLocalizedLabel("v5ded_toggle-label-off", "Off")}  labelB={app.getLocalizedLabel("v5ded_toggle-label-on", "On")}></Toggle>
</Box>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"d4e79"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"d4e79"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"yay24"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={1}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"yay24"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<NumberInput id={"yx8nd"} label={app.getLocalizedLabel("yx8nd_label", "Time limit in seconds")} min={0} value={skdprojectscenarioDS.item.skdreslevelparam[0].timelimit} hideStepButtons={true} datacomponenttype={"number-input"} datacomponentoriginalid={"yx8nd"} onBlur={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].timelimit=event.imaginaryTarget.valueAsNumber;
      }}>
</NumberInput>
</Box>
</AdaptiveColumn>
</AdaptiveRow>
<AdaptiveRow id={"jj5rk"} datacomponenttype={"adaptive-row"} datacomponentoriginalid={"jj5rk"}>
<AdaptiveColumn 
      id={"vyjmz"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"vyjmz"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"wavmb"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"wavmb"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Toggle toggled={skdprojectscenarioDS.item.skdreslevelparam[0].cskdwindow} label={app.getLocalizedLabel("n5_73_label", "Schedule window?")} type={"TrueFalse"} toggleLabelOff={app.getLocalizedLabel("n5_73_toggle-label-off", "Off")} toggleLabelOn={app.getLocalizedLabel("n5_73_toggle-label-on", "On")} id={"n5_73"} size={"md"} datacomponenttype={"toggle"} datacomponentoriginalid={"n5_73"} onToggle={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].cskdwindow=event.target['checked'];
      }}  labelA={app.getLocalizedLabel("n5_73_toggle-label-off", "Off")}  labelB={app.getLocalizedLabel("n5_73_toggle-label-on", "On")}></Toggle>
</Box>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"d2aep"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"d2aep"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"mkdvq"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"mkdvq"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Toggle toggled={skdprojectscenarioDS.item.skdreslevelparam[0].venforceaos} label={app.getLocalizedLabel("y9mx9_label", "Enforce asset operating schedule?")} type={"TrueFalse"} toggleLabelOff={app.getLocalizedLabel("y9mx9_toggle-label-off", "Off")} toggleLabelOn={app.getLocalizedLabel("y9mx9_toggle-label-on", "On")} id={"y9mx9"} size={"md"} datacomponenttype={"toggle"} datacomponentoriginalid={"y9mx9"} onToggle={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].venforceaos=event.target['checked'];
      }}  labelA={app.getLocalizedLabel("y9mx9_toggle-label-off", "Off")}  labelB={app.getLocalizedLabel("y9mx9_toggle-label-on", "On")}></Toggle>
</Box>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"kjgka"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"kjgka"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"jjz39"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={1}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"jjz39"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<NumberInput id={"e8mmr"} label={app.getLocalizedLabel("e8mmr_label", "Auto-refresh interval in seconds")} min={0} onChange={(event)=>{eventManager.emit('handleRefreshIntervalChange', event)}} value={"10"} hideStepButtons={true} datacomponenttype={"number-input"} datacomponentoriginalid={"e8mmr"}>
</NumberInput>
</Box>
</AdaptiveColumn>
</AdaptiveRow>
<AdaptiveRow id={"m637j"} datacomponenttype={"adaptive-row"} datacomponentoriginalid={"m637j"}>
<AdaptiveColumn 
      id={"j7zz_"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"j7zz_"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"w663b"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={1}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"w663b"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >

      <Dropdown
      id={"v_52b"}
      items={[
  {
    id: ("0"),
    text: (app.getLocalizedLabel("rvd9v_text", "Off")),
    disabled: (undefined),
    hidden: (undefined)
  },
  {
    id: ("1"),
    text: (app.getLocalizedLabel("v43p8_text", "Consider")),
    disabled: (undefined),
    hidden: (undefined)
  },
  {
    id: ("2"),
    text: (app.getLocalizedLabel("dd8vk_text", "Enforce")),
    disabled: (undefined),
    hidden: (undefined)
  }
]}
      onChange={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].cincludepriority=event.selectedItem.id;
      }}
      selectedItem={skdprojectscenarioDS.item.skdreslevelparam[0].cincludepriority}
      itemValueField={"id"}
      itemTextField={"text"}
      itemToString={item => {
          return item ? item.text : '';
        }}
      
      
      hideUnspecified={true}
      label={app.getLocalizedLabel("v_52b_label", "Complete high priority work first?")}
      size={"none"}
      
      
      
      
      height={"tall"}
      padding={true}
      boundDatasource={skdprojectscenarioDS}
      boundDatasourceItem={skdprojectscenarioDS.item}
      boundDatasourceField={"skdreslevelparam[0].cincludepriority"}
      
      
      />
    
</Box>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"yyjxy"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"yyjxy"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"n7xz7"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"n7xz7"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Toggle toggled={skdprojectscenarioDS.item.skdreslevelparam[0].venforcelms} label={app.getLocalizedLabel("qyzra_label", "Enforce location maintenance schedule?")} type={"TrueFalse"} toggleLabelOff={app.getLocalizedLabel("qyzra_toggle-label-off", "Off")} toggleLabelOn={app.getLocalizedLabel("qyzra_toggle-label-on", "On")} id={"qyzra"} size={"md"} datacomponenttype={"toggle"} datacomponentoriginalid={"qyzra"} onToggle={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].venforcelms=event.target['checked'];
      }}  labelA={app.getLocalizedLabel("qyzra_toggle-label-off", "Off")}  labelB={app.getLocalizedLabel("qyzra_toggle-label-on", "On")}></Toggle>
</Box>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"k_vxn"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"k_vxn"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"qj8mg"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={1}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"qj8mg"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >

      <Dropdown
      id={"nw2zq"}
      items={[
  {
    id: ("ASCENDING"),
    text: (app.getLocalizedLabel("yw3dk_text", "Ascending")),
    disabled: (undefined),
    hidden: (undefined)
  },
  {
    id: ("DESCENDING"),
    text: (app.getLocalizedLabel("yk2v__text", "Descending")),
    disabled: (undefined),
    hidden: (undefined)
  }
]}
      onChange={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].vprioritydir=event.selectedItem.id;
      }}
      selectedItem={skdprojectscenarioDS.item.skdreslevelparam[0].vprioritydir}
      itemValueField={"id"}
      itemTextField={"text"}
      itemToString={item => {
          return item ? item.text : '';
        }}
      
      
      hideUnspecified={true}
      label={app.getLocalizedLabel("nw2zq_label", "Priority direction")}
      size={"none"}
      
      
      
      
      height={"tall"}
      padding={true}
      boundDatasource={skdprojectscenarioDS}
      boundDatasourceItem={skdprojectscenarioDS.item}
      boundDatasourceField={"skdreslevelparam[0].vprioritydir"}
      
      
      />
    
</Box>
</AdaptiveColumn>
</AdaptiveRow>
<AdaptiveRow id={"e6d29"} datacomponenttype={"adaptive-row"} datacomponentoriginalid={"e6d29"}>
<AdaptiveColumn 
      id={"k7bza"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"k7bza"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"qggv2"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"qggv2"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Toggle toggled={skdprojectscenarioDS.item.skdreslevelparam[0].ccalendarbreak} label={app.getLocalizedLabel("mwev6_label", "Include calendar breaks?")} type={"TrueFalse"} toggleLabelOff={app.getLocalizedLabel("mwev6_toggle-label-off", "Off")} toggleLabelOn={app.getLocalizedLabel("mwev6_toggle-label-on", "On")} id={"mwev6"} size={"md"} datacomponenttype={"toggle"} datacomponentoriginalid={"mwev6"} onToggle={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].ccalendarbreak=event.target['checked'];
      }}  labelA={app.getLocalizedLabel("mwev6_toggle-label-off", "Off")}  labelB={app.getLocalizedLabel("mwev6_toggle-label-on", "On")}></Toggle>
</Box>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"ed6w_"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"ed6w_"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"mav5p"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"mav5p"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Toggle toggled={skdprojectscenarioDS.item.skdreslevelparam[0].venforcelos} label={app.getLocalizedLabel("ajgeq_label", "Enforce location operating schedule?")} type={"TrueFalse"} toggleLabelOff={app.getLocalizedLabel("ajgeq_toggle-label-off", "Off")} toggleLabelOn={app.getLocalizedLabel("ajgeq_toggle-label-on", "On")} id={"ajgeq"} size={"md"} datacomponenttype={"toggle"} datacomponentoriginalid={"ajgeq"} onToggle={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].venforcelos=event.target['checked'];
      }}  labelA={app.getLocalizedLabel("ajgeq_toggle-label-off", "Off")}  labelB={app.getLocalizedLabel("ajgeq_toggle-label-on", "On")}></Toggle>
</Box>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"nzn79"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"nzn79"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"k_m5_"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={1}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"k_m5_"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<NumberInput id={"dkj4r"} label={app.getLocalizedLabel("dkj4r_label", "Percentage availability")} max={100} min={0} value={skdprojectscenarioDS.item.skdreslevelparam[0].vperctavail} hideStepButtons={true} datacomponenttype={"number-input"} datacomponentoriginalid={"dkj4r"} onBlur={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].vperctavail=event.imaginaryTarget.valueAsNumber;
      }}>
</NumberInput>
</Box>
</AdaptiveColumn>
</AdaptiveRow>
<AdaptiveRow id={"ejryg"} datacomponenttype={"adaptive-row"} datacomponentoriginalid={"ejryg"}>
<AdaptiveColumn 
      id={"bmjwq"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"66.66"},"xlg":{"width":"66.66"}}}
      datacomponentoriginalid={"bmjwq"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"akm68"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"akm68"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Toggle toggled={skdprojectscenarioDS.item.skdreslevelparam[0].crepairwindow} label={app.getLocalizedLabel("bq6qx_label", "Repair facility window?")} type={"TrueFalse"} toggleLabelOff={app.getLocalizedLabel("bq6qx_toggle-label-off", "Off")} toggleLabelOn={app.getLocalizedLabel("bq6qx_toggle-label-on", "On")} id={"bq6qx"} size={"md"} datacomponenttype={"toggle"} datacomponentoriginalid={"bq6qx"} onToggle={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].crepairwindow=event.target['checked'];
      }}  labelA={app.getLocalizedLabel("bq6qx_toggle-label-off", "Off")}  labelB={app.getLocalizedLabel("bq6qx_toggle-label-on", "On")}></Toggle>
</Box>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"pz75g"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"33.33"},"xlg":{"width":"33.33"}}}
      datacomponentoriginalid={"pz75g"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<Box
    id={"dyzp9"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={1}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"dyzp9"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<NumberInput id={"zr45k"} label={app.getLocalizedLabel("zr45k_label", "Schedule time buffer minutes")} min={0} value={skdprojectscenarioDS.item.skdreslevelparam[0].cassigntimebuffer} hideStepButtons={true} datacomponenttype={"number-input"} datacomponentoriginalid={"zr45k"} onBlur={(event)=>{
        
        skdprojectscenarioDS.item.skdreslevelparam[0].cassigntimebuffer=event.imaginaryTarget.valueAsNumber;
      }}>
</NumberInput>
</Box>
</AdaptiveColumn>
</AdaptiveRow>
<AdaptiveRow id={"nb2dk"} datacomponenttype={"adaptive-row"} datacomponentoriginalid={"nb2dk"}>
<AdaptiveColumn 
      id={"mp664"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"60"},"xlg":{"width":"60"}}}
      datacomponentoriginalid={"mp664"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
<CheckBoxGroup id={"pe_d_"} label={""} options={page.state.optimizeScheduleChekboxOptions} onChange={(event)=>{eventManager.emit('handleCronChecked', event)}} datacomponenttype={"checkbox-group"} datacomponentoriginalid={"pe_d_"} dataOptions={JSON.stringify(page.state.optimizeScheduleChekboxOptions)}></CheckBoxGroup>
</AdaptiveColumn>
<AdaptiveColumn 
      id={"vbvga"} 
      breakPoints={{"sm":{"width":"100"},"md":{"width":"100"},"lg":{"width":"40"},"xlg":{"width":"40"}}}
      datacomponentoriginalid={"vbvga"}
      datacomponenttype={"adaptive-column"}
      datadraggable={"true"}
      direction={"row"}
    >
</AdaptiveColumn>
</AdaptiveRow>
</Box>
}
  />
    );
  }
}
export default inject('app')(observer(DialogOptimizeScheduleDialog));
    
