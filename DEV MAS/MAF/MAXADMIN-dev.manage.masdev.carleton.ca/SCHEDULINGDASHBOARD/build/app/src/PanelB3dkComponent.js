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
import { Panel } from '@maximo/react-components';
import { Box } from '@maximo/react-components';
import React from 'react';
import DashboardBk6dkComponent from './DashboardBk6dkComponent';
import TableB6gyy from './TableB6gyy';
const PanelB3dkComponent = (props) => {
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

  return (<Observer>{()=>(<><Panel id={"b3dk"} datadraggable={"true"} droppable={"true"} datacomponenttype={"panel"} datacomponentoriginalid={"b3dk"}>
<Box
    id={"kwqkk"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    marginBottom={1.5}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"kwqkk"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<DashboardBk6dkComponent templateContext={templateContext} eventManager={eventManager} itemId={itemId} index={index} item={item} datasource={datasource} dialog={dialog} page={page} app={app} skdprojectDS={skdprojectDS} mySchedules={mySchedules} myCommitSchedules={myCommitSchedules} skdodmerunDS={skdodmerunDS} jdashboardKPIds={jdashboardKPIds}/>
</Box>
<TableB6gyy id={"b6gyy"} datasource={app.findDatasource(page.state.selectedDatasource)}   />
</Panel>
</>)}</Observer>);
};
export default PanelB3dkComponent;

