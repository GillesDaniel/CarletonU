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
import { SlidingDrawer } from '@maximo/react-components';
import { Box } from '@maximo/react-components';
import { TagGroup } from '@maximo/react-components';
import { Label } from '@maximo/react-components';
import { SmartInput } from '@maximo/react-components';
import { Toggle } from '@maximo/react-components';
import { Button } from '@maximo/react-components';
import React from 'react';
class SlidingDrawerDetailsSlidingDrawer extends React.Component {
  
        constructor(props) {
          super(props)
          let dialog = props.app.findDialog("detailsSlidingDrawer");

      if (dialog) dialog.initialize();
        }
      

  

  render() {
    const props = this.props;
    const app = props.app;
const page = props.page || app.findPage('scheduleDetails') || app;
const dialog = app.findDialog('detailsSlidingDrawer');
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
      <SlidingDrawer {...props.slidingDrawerProps} id={"detailsSlidingDrawer"}

    
    
    align={"end"}
    
    
    children={<Box
    id={"r5xqq"}
    
    margin={0}
    marginStart={-0.5}
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"r5xqq"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"d_p39"}
    
    margin={0}
    
    
    
    marginBottom={0.8}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"d_p39"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<TagGroup type={"dark-gray"} align={"start"} wrap={true} tags={[{label: jresourceLevelingTaskDS.item.status, type: 'green'}]} id={"zxkxn"} datacomponenttype={"tag-group"} datacomponentoriginalid={"zxkxn"} key={JSON.stringify([{label: jresourceLevelingTaskDS.item.status, type: 'green'}])} clearTooltip={undefined}></TagGroup>
</Box>
<Box
    id={"b7nzb"}
    
    margin={0}
    
    marginEnd={4.6}
    
    marginBottom={0.8}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"b7nzb"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"field"} label={app.getLocalizedLabel("nd63b_label", "Priority")} padding={"none"} id={"nd63b"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"nd63b"}></Label>
<SmartInput id={"g86y6"} value={jresourceLevelingTaskDS.item.wopriority} max={999} min={0} hideLabel={true} hideStepButtons={false} theme={"dark"} size={"none"} dateType={"date"} datadraggable={"true"} datacomponenttype={"smart-input"} datacomponentoriginalid={"g86y6"} datasource={jresourceLevelingTaskDS} item={jresourceLevelingTaskDS.item} field={"wopriority"} dataFormatter={app.formatter}/></Box>
<Box
    id={"zy78r"}
    
    margin={0}
    
    
    
    marginBottom={0.8}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    fillParentHorizontal={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"zy78r"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"field"} label={app.getLocalizedLabel("n2p9__label", "Duration")} padding={"none"} id={"n2p9_"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"n2p9_"}></Label>
<SmartInput id={"qn_5d"} value={jresourceLevelingTaskDS.item.duration} inputKind={"DURATION"} hideLabel={true} size={"medium"} theme={"dark"} dateType={"date"} datadraggable={"true"} datacomponenttype={"smart-input"} datacomponentoriginalid={"qn_5d"} datasource={jresourceLevelingTaskDS} item={jresourceLevelingTaskDS.item} field={"duration"} dataFormatter={app.formatter}/></Box>
<Box
    id={"nymnb"}
    
    margin={0}
    marginStart={0.1}
    
    
    marginBottom={0.8}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"nymnb"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"field"} label={app.getLocalizedLabel("a38kq_label", "Scheduled start")} padding={"none"} id={"a38kq"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"a38kq"}></Label>
<SmartInput id={"abbma"} value={jresourceLevelingTaskDS.item.starttime} hideLabel={true} showVerbose={false} theme={"dark"} size={"none"} dateType={"date"} datadraggable={"true"} datacomponenttype={"smart-input"} datacomponentoriginalid={"abbma"} datasource={jresourceLevelingTaskDS} item={jresourceLevelingTaskDS.item} field={"starttime"} dataFormatter={app.formatter}/></Box>
<Box
    id={"qyv9w"}
    
    margin={0}
    marginStart={0.1}
    
    
    marginBottom={0.8}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"qyv9w"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"field"} label={app.getLocalizedLabel("w432r_label", "Start no earlier than")} padding={"none"} id={"w432r"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"w432r"}></Label>
<SmartInput id={"w742y"} invalid={jresourceLevelingTaskDS.item.sneconstraint > jresourceLevelingTaskDS.item.fnlconstraint} value={jresourceLevelingTaskDS.item.sneconstraint} hideLabel={true} showVerbose={false} theme={"dark"} size={"none"} dateType={"date"} datadraggable={"true"} datacomponenttype={"smart-input"} datacomponentoriginalid={"w742y"} datasource={jresourceLevelingTaskDS} item={jresourceLevelingTaskDS.item} field={"sneconstraint"} dataFormatter={app.formatter}/></Box>
<Box
    id={"n45a8"}
    
    margin={0}
    marginStart={0.1}
    
    
    marginBottom={0.8}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"n45a8"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"field"} label={app.getLocalizedLabel("b9rg3_label", "Finish no later than")} padding={"none"} id={"b9rg3"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"b9rg3"}></Label>
<SmartInput id={"j39__"} invalid={jresourceLevelingTaskDS.item.sneconstraint > jresourceLevelingTaskDS.item.fnlconstraint} value={jresourceLevelingTaskDS.item.fnlconstraint} hideLabel={true} showVerbose={false} theme={"dark"} size={"none"} dateType={"date"} datadraggable={"true"} datacomponenttype={"smart-input"} datacomponentoriginalid={"j39__"} datasource={jresourceLevelingTaskDS} item={jresourceLevelingTaskDS.item} field={"fnlconstraint"} dataFormatter={app.formatter}/></Box>
<Box
    id={"mragw"}
    
    margin={0}
    marginStart={0.1}
    
    
    marginBottom={-0.5}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"mragw"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"field"} label={app.getLocalizedLabel("zn52e_label", "Interruptible")} padding={"none"} id={"zn52e"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"zn52e"}></Label>
</Box>
<Box
    id={"x6xm4"}
    
    margin={0}
    marginStart={0.2}
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"x6xm4"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Toggle toggled={jresourceLevelingTaskDS.item.interruptible} label={""} type={"YesNo"} toggleLabelOff={" "} toggleLabelOn={" "} id={"xejre"} size={"md"} datacomponenttype={"toggle"} datacomponentoriginalid={"xejre"} onToggle={(event)=>{
        
        jresourceLevelingTaskDS.item.interruptible=event.target['checked'];
      }}  labelA={" "}  labelB={" "}></Toggle>
</Box>
</Box>
}
    headerText={jresourceLevelingTaskDS.item.name}
    
    
    
     primaryButton={<Button disabled={true} label={app.getLocalizedLabel("rp4gp_label", "Save")} kind={"primary"} onClick={(event)=>{eventManager.emit('saveActivityChanges', event)}} id={"rp4gp"} small={true} tagValueLimit={99} datadraggable={"true"} datacomponenttype={"button"} datacomponentoriginalid={"rp4gp"} />
}
     secondaryButton={<Button label={app.getLocalizedLabel("mkrqr_label", "Cancel")} kind={"secondary"} onClick={(event)=>{eventManager.emit('closeDetailsSlidingDrawer', event)}} id={"mkrqr"} small={true} tagValueLimit={99} datadraggable={"true"} datacomponenttype={"button"} datacomponentoriginalid={"mkrqr"} />
}
    
    
    isPrimaryButtonDisabled={page.state.disableSaveOnResourceLeveling}
    
  />
    );
  }
}
export default inject('app')(observer(SlidingDrawerDetailsSlidingDrawer));
    
