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
import TableB3gyyDetails from './TableB3gyyDetails';
import TableCellB3gyyIdRenderer from './TableCellB3gyyIdRenderer';
import TableCellB3gyyDurationRenderer from './TableCellB3gyyDurationRenderer';
import TableCellB3gyySneconstraintRenderer from './TableCellB3gyySneconstraintRenderer';
import TableCellB3gyyFnlconstraintRenderer from './TableCellB3gyyFnlconstraintRenderer';
import TableCellB3gyyWopriorityRenderer from './TableCellB3gyyWopriorityRenderer';
import TableCellB3gyyInterruptibleRenderer from './TableCellB3gyyInterruptibleRenderer';
import TableCellB3gyyIntshiftRenderer from './TableCellB3gyyIntshiftRenderer';
import TableCellB3gyyModifiedRenderer from './TableCellB3gyyModifiedRenderer';
const TableB3gyy = observer(props => {
    const app = props.app;
const page = props.page || app.findPage('scheduleDetails');
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = datasource;
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

    
      const aggregationDatasource = props['aggregation-datasource'];
      const formatter = app.formatter;
      const viewManager = null;
      
        const renderFunc = (props) => {
          return <TableB3gyyDetails {...props} datasource={datasource} eventManager={datasource}/>
        };
      

    

    return (
      
      <DatasourceTable id={props.id+"-table"}  detailRenderer={renderFunc} aggregationDatasource={aggregationDatasource} datasource={datasource} loading={(datasource) ? datasource.state.loading : true} dataFormatter={formatter} viewManager={viewManager}

      columns={[
  {
    id: `id`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (undefined),
    name: (app.getLocalizedLabel("wegmw_label", "Work record")),
    placeholderText: (app.getLocalizedLabel("wegmw_placeholder-text", "Work record")),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (220),
    renderDataFunction: ((props) => <TableCellB3gyyIdRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `duration`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (undefined),
    name: (app.getLocalizedLabel("e24fb_label", "Duration")),
    placeholderText: (app.getLocalizedLabel("e24fb_placeholder-text", "Duration")),
    tooltip: (undefined),
    align: ("start"),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (130),
    renderDataFunction: ((props) => <TableCellB3gyyDurationRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `sneconstraint`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (undefined),
    name: (app.getLocalizedLabel("e784bb_label", "Start no earlier than")),
    placeholderText: (app.getLocalizedLabel("e784bb_placeholder-text", "Start no earlier than")),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (250),
    renderDataFunction: ((props) => <TableCellB3gyySneconstraintRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `fnlconstraint`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (undefined),
    name: (app.getLocalizedLabel("n4v8m_label", "Finish no later than")),
    placeholderText: (app.getLocalizedLabel("n4v8m_placeholder-text", "Finish no later than")),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (250),
    renderDataFunction: ((props) => <TableCellB3gyyFnlconstraintRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `wopriority`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (undefined),
    name: (app.getLocalizedLabel("n4zz3m_label", "Priority")),
    placeholderText: (app.getLocalizedLabel("n4zz3m_placeholder-text", "Priority")),
    tooltip: (undefined),
    align: ("start"),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (120),
    renderDataFunction: ((props) => <TableCellB3gyyWopriorityRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `interruptible`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (false),
    name: (app.getLocalizedLabel("n4z82m_label", "Interruptible")),
    placeholderText: (undefined),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (140),
    renderDataFunction: ((props) => <TableCellB3gyyInterruptibleRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `intshift`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (false),
    name: (app.getLocalizedLabel("n481m_label", "Interruptible shift")),
    placeholderText: (undefined),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (180),
    renderDataFunction: ((props) => <TableCellB3gyyIntshiftRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `modified`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (false),
    name: (app.getLocalizedLabel("jgmae_label", "Modified")),
    placeholderText: (undefined),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (110),
    renderDataFunction: ((props) => <TableCellB3gyyModifiedRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  }
]}
      
      

      

      

      

      

      rowHeight={"md"}

      canPage={true}

      

      canSearch={false}

      

      

      useRadioButtonSingleSelect={true}

      

      canFilter={true}

      

      canSort={true}

      canReorderColumns={false}

      

      displayRowCount={true}

      canResize={true}

      hasColumnConfig={true}

      hasBatchActionToolbar={true}

      

      

      

      

      

      

      

      

      noDataMessage={app.getLocalizedLabel("b3gyy_no-data-message", "No scheduling issues")}

      

      

      

      searchDebounceTime={500}

      rowsPerPage={10}

      canDownload={true}

      

      clearSelectionOnBatchAction={true}

      
      
      
      
      
      pinColumn={"none"}
      
      
      

      
      
      
      toolbarActions={[
  {
    id: `button_hj5kh`,
    icon: ("carbon:undo"),
    hidden: (undefined),
    labelText: (""),
    onClick: ((event)=>{eventManager.emit('onUndo', event)}),
    kind: ("ghost"),
    isActionButton: true,
    hoverTooltip: (app.getLocalizedLabel("hj5kh_hover-tooltip", "Undo")),
    disabled: (undefined)
  },
  {
    id: `button_fj5kh`,
    icon: (undefined),
    hidden: (undefined),
    labelText: (app.getLocalizedLabel("fj5kh_label", "Save")),
    onClick: ((event)=>{eventManager.emit('onSave', event)}),
    kind: ("secondary"),
    isActionButton: true,
    hoverTooltip: (app.getLocalizedLabel("fj5kh_hover-tooltip", "Save")),
    disabled: (!datasource.state.canSave || page.state.disableSaveButton)
  }
]}

      
      app={app}
      data-update={datasource?datasource.state.changedFlag:-1}
      
      

      

      

      useLegacyColumnManagement={true}

      

      columnCustomizationPrimaryDisplayField={"name"}

      
      />
    
    );
  });

export default inject('app')(TableB3gyy);
    
