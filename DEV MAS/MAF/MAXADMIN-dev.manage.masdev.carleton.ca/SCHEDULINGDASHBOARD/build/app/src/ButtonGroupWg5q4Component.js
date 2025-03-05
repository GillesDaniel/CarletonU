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
import { ButtonGroup } from '@maximo/react-components';
import { Button } from '@maximo/react-components';
import React from 'react';
const ButtonGroupWg5q4Component = (props) => {
  const app = props.app;
const page = props.page;
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = props.eventManager || datasource || dialog || page || app;
const templateContext = props.templateContext;
  const skdprojectForOptimizeDS = props.skdprojectForOptimizeDS || app.findDatasource("skdprojectForOptimizeDS");
const skdactivityForOptimizeDS = props.skdactivityForOptimizeDS || app.findDatasource("skdactivityForOptimizeDS");
const skdodmerunForOptimizeDS = props.skdodmerunForOptimizeDS || app.findDatasource("skdodmerunForOptimizeDS");
const jOptimizeAlertsDS = props.jOptimizeAlertsDS || app.findDatasource("jOptimizeAlertsDS");
const jOptimizeSummaryDS = props.jOptimizeSummaryDS || app.findDatasource("jOptimizeSummaryDS");

  return (<Observer>{()=>(<><ButtonGroup id={"wg5q4"} hidden={skdodmerunForOptimizeDS.item.optimizationstatus === 'PROCESSED' || skdodmerunForOptimizeDS.item.optimizationstatus === 'STOPPED' || skdodmerunForOptimizeDS.item.optimizationstatus === 'STOPPING' || skdodmerunForOptimizeDS.item.optimizationstatus === 'FAILED'} align={"start"} padding={true} datadraggable={"true"} droppable={"true"} datacomponenttype={"button-group"} datacomponentoriginalid={"wg5q4"}>
<Button label={app.getLocalizedLabel("j9dkd_label", "Run in background")} kind={"secondary"} onClick={(event)=>{eventManager.emit('goToDashboardPage', event)}} id={"j9dkd"} small={true} tagValueLimit={99} datadraggable={"true"} datacomponenttype={"button"} datacomponentoriginalid={"j9dkd"} />
<Button label={app.getLocalizedLabel("p9696_label", "Stop")} kind={"primary"} onClick={(event)=>{eventManager.emit('stopOptimizationRun', event)}} id={"p9696"} small={true} tagValueLimit={99} datadraggable={"true"} datacomponenttype={"button"} datacomponentoriginalid={"p9696"} />
</ButtonGroup>
</>)}</Observer>);
};
export default ButtonGroupWg5q4Component;

