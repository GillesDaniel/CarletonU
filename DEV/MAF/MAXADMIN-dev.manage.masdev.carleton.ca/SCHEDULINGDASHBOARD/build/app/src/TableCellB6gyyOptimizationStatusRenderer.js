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
import { Link } from '@maximo/react-components';
import { Label } from '@maximo/react-components';
import { DatasourceLabel } from '@maximo/react-components';

const TableCellB6gyyOptimizationStatusRenderer = observer(props => {
    const app = props.app;
const page = props.page || app.findPage('schedule');
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = props.eventManager || dialog || page || app;
const templateContext = props.templateContext;
    const skdprojectDS = props.skdprojectDS || app.findDatasource("skdprojectDS");
const mySchedules = props.mySchedules || app.findDatasource("mySchedules");
const myCommitSchedules = props.myCommitSchedules || app.findDatasource("myCommitSchedules");
const skdodmerunDS = props.skdodmerunDS || app.findDatasource("skdodmerunDS");
const jdashboardKPIds = props.jdashboardKPIds || app.findDatasource("jdashboardKPIds");

    

    

    return (
      
      <Box
    id={'gvn22[' + props.rowId + ']'}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"gvn22"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Link label={app.format((item?item.optimizationstatus:undefined),'optimizationstatus',null,datasource)} onClick={(event)=>{eventManager.emit('change-page', {name: 'optimizeSchedule', ds: datasource, item: item , params:({'href':item.href, 'projectname':item.name, 'projectid':item.skdprojectid, 'optimizationstatus':item.optimizationstatus, 'timelimit':30,'interval':10, 'selectedTab':2,'scheduletype':item.ScheduleTypeLabel, 'issuecount':item.unscheduled, 'startdate':item.startdateacm, 'enddate': item.enddateacm})}, event)}} id={'v69xm[' + props.rowId + ']'} spacing={"form"} datacomponenttype={"link"} datacomponentoriginalid={"v69xm"} />
<DatasourceLabel  theme={"field"} label={app.format((item?item.optimizationendtime:undefined),'optimizationendtime',null,datasource)} spacing={"none"} padding={"none"} hidden={!(item?item.optimizationendtime:undefined)} id={'zz4k6[' + props.rowId + ']'} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"zz4k6"} datasource={datasource} item={item} field={"optimizationendtime"}></DatasourceLabel>
</Box>

    
    );
  });

export default inject('app')(TableCellB6gyyOptimizationStatusRenderer);
    
