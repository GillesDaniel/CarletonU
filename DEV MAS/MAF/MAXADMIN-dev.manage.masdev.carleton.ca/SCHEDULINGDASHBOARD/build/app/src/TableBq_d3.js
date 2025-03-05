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
import TableCellBq_d3SeverityRenderer from './TableCellBq_d3SeverityRenderer';
import TableCellBq_d3AlertyTypeRenderer from './TableCellBq_d3AlertyTypeRenderer';
import TableCellBq_d3MessageRenderer from './TableCellBq_d3MessageRenderer';
const TableBq_d3 = observer(props => {
    const app = props.app;
const page = props.page || app.findPage('optimizeSchedule');
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = datasource;
const templateContext = props.templateContext;
    const skdprojectForOptimizeDS = props.skdprojectForOptimizeDS || app.findDatasource("skdprojectForOptimizeDS");
const skdactivityForOptimizeDS = props.skdactivityForOptimizeDS || app.findDatasource("skdactivityForOptimizeDS");
const skdodmerunForOptimizeDS = props.skdodmerunForOptimizeDS || app.findDatasource("skdodmerunForOptimizeDS");
const jOptimizeAlertsDS = props.jOptimizeAlertsDS || app.findDatasource("jOptimizeAlertsDS");
const jOptimizeSummaryDS = props.jOptimizeSummaryDS || app.findDatasource("jOptimizeSummaryDS");

    
      const aggregationDatasource = props['aggregation-datasource'];
      const formatter = app.formatter;
      const viewManager = null;
      
        const renderFunc = null;
      

    

    return (
      
      <DatasourceTable id={props.id+"-table"}  detailRenderer={renderFunc} aggregationDatasource={aggregationDatasource} datasource={datasource} loading={(datasource) ? datasource.state.loading : true} dataFormatter={formatter} viewManager={viewManager}

      columns={[
  {
    id: `severity`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (undefined),
    name: (app.getLocalizedLabel("bmn6d_label", "Severity")),
    placeholderText: (app.getLocalizedLabel("bmn6d_placeholder-text", "Severity")),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (150),
    renderDataFunction: ((props) => <TableCellBq_d3SeverityRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `alertyType`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (false),
    name: (app.getLocalizedLabel("bkjvd_label", "Alert type")),
    placeholderText: (undefined),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (300),
    renderDataFunction: ((props) => <TableCellBq_d3AlertyTypeRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  },
  {
    id: `message`,
    isHidden: (undefined),
    isSortable: (true),
    isFilterable: (false),
    name: (app.getLocalizedLabel("gga2r_label", "Message")),
    placeholderText: (undefined),
    tooltip: (undefined),
    align: (undefined),
    aggregationColumn: (undefined),
    wrap: (undefined),
    width: (undefined),
    renderDataFunction: ((props) => <TableCellBq_d3MessageRenderer {...props} item={props.row} datasource={datasource} eventManager={datasource}/>),
    columnType: (undefined)
  }
]}
      
      

      title={app.getLocalizedLabel("bq_d3_title", "Alerts")}

      

      

      

      rowHeight={"xs"}

      canPage={true}

      

      canSearch={true}

      

      

      useRadioButtonSingleSelect={true}

      

      canFilter={true}

      

      canSort={true}

      canReorderColumns={false}

      

      displayRowCount={false}

      canResize={false}

      hasColumnConfig={true}

      hasBatchActionToolbar={true}

      

      

      

      

      

      

      

      

      noDataMessage={app.getLocalizedLabel("bq_d3_no-data-message", "There are no alerts to display")}

      

      

      

      searchDebounceTime={500}

      rowsPerPage={5}

      

      

      clearSelectionOnBatchAction={true}

      
      
      
      
      
      pinColumn={"none"}
      
      
      

      
      
      
      

      
      app={app}
      data-update={datasource?datasource.state.changedFlag:-1}
      
      

      fillParent={true}

      

      useLegacyColumnManagement={true}

      

      columnCustomizationPrimaryDisplayField={"name"}

      
      />
    
    );
  });

export default inject('app')(TableBq_d3);
    
