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

    

    

import { Box } from '@maximo/react-components';
import { Icon } from '@maximo/react-components';
import { Label } from '@maximo/react-components';
import { DatasourceLabel } from '@maximo/react-components';

const TableCellB3gyyIdRenderer = observer(props => {
    const app = props.app;
const page = props.page || app.findPage('scheduleDetails');
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
    id={'ap9vk[' + props.rowId + ']'}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"ap9vk"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    childrenFlexBasis={[5,95]}
  >
<Box
    id={'b7_e2[' + props.rowId + ']'}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"b7_e2"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Icon fill={"#DA1E28"} icon={(item?item.computedIssueIcon:undefined)} id={'zre49[' + props.rowId + ']'} datacomponenttype={"icon"} datacomponentoriginalid={"zre49"}>
</Icon>
</Box>
<Box
    id={'kwqtkk[' + props.rowId + ']'}
    
    margin={0}
    marginStart={0.5}
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"kwqtkk"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<DatasourceLabel  theme={"header-x-small"} label={app.format((item?item.computeIssueTitleString:undefined),'computeIssueTitleString',null,datasource)} spacing={"none"} padding={"none"} id={'r8fkw[' + props.rowId + ']'} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"r8fkw"} datasource={datasource} item={item} field={"computeIssueTitleString"}></DatasourceLabel>
<DatasourceLabel  theme={"field"} label={app.format((item?item.name:undefined),'name',null,datasource)} spacing={"none"} padding={"none"} id={'egen6[' + props.rowId + ']'} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"egen6"} datasource={datasource} item={item} field={"name"}></DatasourceLabel>
</Box>
</Box>

    
    );
  });

export default inject('app')(TableCellB3gyyIdRenderer);
    
