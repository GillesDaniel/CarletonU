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
import { WrappedText } from '@maximo/react-components';
import { TagGroup } from '@maximo/react-components';
import { IconGroup } from '@maximo/react-components';
import { DatasourceThreshold } from '@maximo/react-components';
import { Label } from '@maximo/react-components';
import { Icon } from '@maximo/react-components';
import { DatasourceLabel } from '@maximo/react-components';
import { MenuButton } from '@maximo/react-components';
import { MenuItem } from '@maximo/react-components';
import { BorderLayout } from '@maximo/react-components';
import React from 'react';
class DataListZxc2ccef32vitem extends React.Component {
  

  

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
      
      <><BorderLayout
    id={'wxswv6[' + props.index + ']'}

    
    
    centerVerticalAlign={"start"}
    centerHorizontalAlign={"start"}
    centerDirection={"column"}
    
    
    
    
    centerHorizontalOverflow={"hidden"}
    centerVerticalOverflow={"visible"}
    
    
    center={[<Box
    id={'z3eq_e[' + props.index + ']'}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"z3eq_e"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<WrappedText id={'rgveq[' + props.index + ']'} label={app.format((item?item.name:undefined),'name',null,datasource) ? app.format((item?item.name:undefined),'name',null,datasource) : app.format((item?item.workordernum:undefined),'workordernum',null,datasource)} maxLength={50} truncationType={"end"} size={"small"} padding={"default"} ellipsis={"..."} datadraggable={"true"} datacomponenttype={"wrapped-text"} datacomponentoriginalid={"rgveq"}>
</WrappedText>
</Box>
,<Box
    id={'e1b16rr[' + props.index + ']'}
    
    margin={0}
    marginStart={-0.5}
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"e1b16rr"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<TagGroup type={"dark-gray"} align={"start"} wrap={true} tags={(item?item.tags:undefined)} id={'g16bpw[' + props.index + ']'} datacomponenttype={"tag-group"} datacomponentoriginalid={"g16bpw"} key={JSON.stringify((item?item.tags:undefined))} clearTooltip={undefined}></TagGroup>
</Box>
,<Box
    id={'a71qje[' + props.index + ']'}
    
    margin={0}
    marginStart={-0.5}
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    hidden={true}
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"a71qje"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<IconGroup primaryIcon={"carbon:calendar--heat-map"} placeholderLabel={""} id={'g8k148[' + props.index + ']'} datacomponenttype={"icon-group"} datacomponentoriginalid={"g8k148"}      />
<IconGroup primaryIcon={"carbon:locked"} placeholderLabel={""} id={'w_13dz[' + props.index + ']'} datacomponenttype={"icon-group"} datacomponentoriginalid={"w_13dz"}      />
<IconGroup primaryIcon={"carbon:column-dependency"} placeholderLabel={""} id={'jk1ny2[' + props.index + ']'} datacomponenttype={"icon-group"} datacomponentoriginalid={"jk1ny2"}      />
<IconGroup primaryIcon={"carbon:bee"} placeholderLabel={""} id={'ndaj_1[' + props.index + ']'} datacomponenttype={"icon-group"} datacomponentoriginalid={"ndaj_1"}      />
</Box>
,<Box
    id={'p0em2a[' + props.index + ']'}
    
    margin={0}
    marginStart={-0.5}
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    hidden={(item?item.brokenDependency:undefined) !== 'true'}
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"p0em2a"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<IconGroup errorIcon={"Carbon:warning--alt"} errorLabelAlign={"right"} errorTheme={"error"} iconSize={"20"} hasError={true} errorLabel={app.getLocalizedLabel("iconGroup21_error-label", "Broken dependency")} placeholderLabel={""} id={'iconGroup21[' + props.index + ']'} datacomponenttype={"icon-group"} datacomponentoriginalid={"iconGroup21"}      />
</Box>
,<Box
    id={'vrm1v7[' + props.index + ']'}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"center"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    hidden={!(item?item.rescheduled:undefined)}
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"vrm1v7"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    childrenFlexBasis={[5,95]}
  >
<Icon icon={"Carbon:information"} id={'cnju6[' + props.index + ']'} datacomponenttype={"icon"} datacomponentoriginalid={"cnju6"}>
</Icon>
<DatasourceLabel  theme={"small"} label={app.format((item?item.rescheduled:undefined),'rescheduled',null,datasource)} wrap={true} id={'r55jq[' + props.index + ']'} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"r55jq"} datasource={datasource} item={item} field={"rescheduled"}></DatasourceLabel>
</Box>
]}
    endVerticalAlign={"start"}
    endHorizontalAlign={"start"}
    endDirection={"column"}
    
    
    
    
    endHorizontalOverflow={"hidden"}
    endVerticalOverflow={"visible"}
    
    
    end={<Box
    id={'mz1g4a[' + props.index + ']'}
    
    margin={0}
    marginStart={-0.5}
    
    marginTop={-0.5}
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    hidden={true}
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"mz1g4a"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<MenuButton icon={"Carbon:overflow-menu--vertical"} kind={"ghost"} id={'p6g1g8[' + props.itemId + ']'} alignMenu={"end"} small={true} iconPosition={"start"} size={"lg"} datacomponenttype={"menu-button"} datacomponentoriginalid={"p6g1g8"}>
<MenuItem label={app.getLocalizedLabel("vg71a2_label", "View details")} onClick={(event)=>{
        
        app.toast('coming soon');
      }} id={'vg71a2[' + props.index + ']'} datacomponenttype={"menu-item"} datacomponentoriginalid={"vg71a2"} />
<MenuItem label={app.getLocalizedLabel("ym1q4m_label", "Lock work order")} onClick={(event)=>{
        
        app.toast('coming soon');
      }} id={'ym1q4m[' + props.index + ']'} datacomponenttype={"menu-item"} datacomponentoriginalid={"ym1q4m"} />
<MenuItem label={app.getLocalizedLabel("zd_ym_label", "Commit selected record")} onClick={(event)=>{
        
        app.toast('coming soon');
      }} id={'zd_ym[' + props.index + ']'} datacomponenttype={"menu-item"} datacomponentoriginalid={"zd_ym"} />
<MenuItem label={app.getLocalizedLabel("e3zp5_label", "Move to day...")} onClick={(event)=>{
        
        page.showDialog('moveToDaySlidingDrawer', null, {name: 'moveToDaySlidingDrawer', ds: datasource });
      }} id={'e3zp5[' + props.index + ']'} datacomponenttype={"menu-item"} datacomponentoriginalid={"e3zp5"} />
</MenuButton>
</Box>
}
    

    
    
    
    
    
    
    fillParent={true}
    
    
    
    padding={true}
    
    flexBasis={[null,null,null]}
    horizontalOverflow={"hidden"}
    verticalOverflow={"hidden"}
    
    
    
  />
</>
    
    );
  }
}
export default inject('app')(observer(DataListZxc2ccef32vitem));
    
