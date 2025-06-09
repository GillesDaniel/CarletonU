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

    

    

import { DatasourceTable } from '@maximo/react-components';
import TableCellB6gyyNameRenderer from './TableCellB6gyyNameRenderer';
import TableCellB6gyyScheduletypeRenderer from './TableCellB6gyyScheduletypeRenderer';
import TableCellB6gyyOptimizationStatusRenderer from './TableCellB6gyyOptimizationStatusRenderer';
import TableCellB6gyyUnscheduledRenderer from './TableCellB6gyyUnscheduledRenderer';
const TableB6gyy = observer(props => {
    const app = props.app;
const page = props.page || app.findPage('schedule');
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = datasource;
const templateContext = props.templateContext;
    const skdprojectDS = props.skdprojectDS || app.findDatasource("skdprojectDS");
const mySchedules = props.mySchedules || app.findDatasource("mySchedules");
const myCommitSchedules = props.myCommitSchedules || app.findDatasource("myCommitSchedules");
const skdodmerunDS = props.skdodmerunDS || app.findDatasource("skdodmerunDS");
const jdashboardKPIds = props.jdashboardKPIds || app.findDatasource("jdashboardKPIds");

    
      const aggregationDatasource = props['aggregation-datasource'];
      const formatter = app.formatter;
      const viewManager = null;
      
        const renderFunc = null;
      

    

    return (
      
      <DatasourceTable id={props.id+"-table"}  detailRenderer={renderFunc} aggregationDatasource={aggregationDatasource} datasource={datasource} loading={(datasource) ? datasource.state.loading : true} dataFormatter={formatter} viewManager={viewManager}

      columns={[
  {
    id: `name`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (undefined),
    name: (app.getLocalizedLabel("wmgmw_label", "Name")),
    placeholderText: (app.getLocalizedLabel("wmgmw_placeholder-text", "Name")),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (300),
    renderDataFunction: ((props) => <TableCellB6gyyNameRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `scheduletype`,
    isHidden: (undefined),
    isSortable: (false),
    isFilterable: (false),
    name: (app.getLocalizedLabel("g85mg_label", "Process type")),
    placeholderText: (undefined),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (250),
    renderDataFunction: ((props) => <TableCellB6gyyScheduletypeRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `optimizationStatus`,
    isHidden: (undefined),
    isSortable: (false),
    isFilterable: (false),
    name: (app.getLocalizedLabel("b597y_label", "Optimization status")),
    placeholderText: (undefined),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (250),
    renderDataFunction: ((props) => <TableCellB6gyyOptimizationStatusRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `unscheduled`,
    isHidden: (undefined),
    isSortable: (false),
    isFilterable: (false),
    name: (app.getLocalizedLabel("e14bb_label", "Scheduling issues")),
    placeholderText: (undefined),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (undefined),
    renderDataFunction: ((props) => <TableCellB6gyyUnscheduledRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `computedDuration`,
    isHidden: (undefined),
    isSortable: (false),
    isFilterable: (false),
    name: (app.getLocalizedLabel("e24bb_label", "Duration")),
    placeholderText: (undefined),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (undefined),
    columnType: (undefined)
  },
  {
    id: `startdateacm`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (undefined),
    name: (app.getLocalizedLabel("n488m_label", "Start date")),
    placeholderText: (app.getLocalizedLabel("n488m_placeholder-text", "Start date")),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (undefined),
    columnType: (undefined)
  },
  {
    id: `enddateacm`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (undefined),
    name: (app.getLocalizedLabel("n483m_label", "End date")),
    placeholderText: (app.getLocalizedLabel("n483m_placeholder-text", "End date")),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (undefined),
    columnType: (undefined)
  }
]}
      
      

      title={app.getLocalizedLabel("b6gyy_title", "Schedules")}

      

      

      

      rowHeight={"md"}

      canPage={true}

      

      canSearch={false}

      

      

      useRadioButtonSingleSelect={false}

      

      canFilter={true}

      

      canSort={true}

      canReorderColumns={false}

      

      displayRowCount={false}

      canResize={false}

      hasColumnConfig={true}

      hasBatchActionToolbar={true}

      onEmptyStateAction={(event)=>{eventManager.emit('loadApp', {appName: 'SCHEDACM', options:{embedded:true}}, event)}}

      emptyStateActionLabel={app.getLocalizedLabel("b6gyy_empty-state-action-label", "Prepare schedules")}

      

      

      

      

      

      

      noDataMessage={app.getLocalizedLabel("b6gyy_no-data-message", "No schedules available")}

      

      

      

      searchDebounceTime={500}

      rowsPerPage={10}

      

      

      clearSelectionOnBatchAction={true}

      
      
      
      
      
      pinColumn={"none"}
      
      
      

      
      
      
      toolbarActions={[
  {
    id: `button_arj9b`,
    icon: ("carbon:restart"),
    hidden: (false),
    labelText: (app.getLocalizedLabel("arj9b_label", "Add")),
    onClick: ((event)=>{eventManager.emit('onReload', event)}),
    hoverTooltip: (undefined),
    disabled: (undefined)
  },
  {
    id: `button_xjzv9`,
    icon: (undefined),
    hidden: (undefined),
    labelText: (app.getLocalizedLabel("xjzv9_label", "Add schedules")),
    onClick: ((event)=>{eventManager.emit('loadApp', {appName: 'SCHEDACM', options:{embedded:true}}, event)}),
    kind: ("ghost"),
    isActionButton: true,
    hoverTooltip: (undefined),
    disabled: (undefined)
  }
]}

      
      app={app}
      data-update={datasource?datasource.state.changedFlag:-1}
      
      

      

      

      useLegacyColumnManagement={true}

      

      columnCustomizationPrimaryDisplayField={"name"}

      
      />
    
    );
  });

export default inject('app')(TableB6gyy);
    
