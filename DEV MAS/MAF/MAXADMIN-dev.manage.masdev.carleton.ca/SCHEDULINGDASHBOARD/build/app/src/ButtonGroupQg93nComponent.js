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
const ButtonGroupQg93nComponent = (props) => {
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

  return (<Observer>{()=>(<><ButtonGroup id={"qg93n"} align={"start"} padding={true} datadraggable={"true"} droppable={"true"} datacomponenttype={"button-group"} datacomponentoriginalid={"qg93n"}>
<Button onClick={(event)=>{eventManager.emit('onRefresh', event)}} id={"a72pa"} small={true} tagValueLimit={99} datadraggable={"true"} datacomponenttype={"button"} datacomponentoriginalid={"a72pa"} kind={"ghost"} iconName={"carbon:renew"} />
<Button onClick={(event)=>{eventManager.emit('openOptimizationProgressDialog', event)}} hidden={true} id={"e6wk4"} small={true} tagValueLimit={99} datadraggable={"true"} datacomponenttype={"button"} datacomponentoriginalid={"e6wk4"} kind={"ghost"} iconName={"carbon:report"} />
</ButtonGroup>
</>)}</Observer>);
};
export default ButtonGroupQg93nComponent;

