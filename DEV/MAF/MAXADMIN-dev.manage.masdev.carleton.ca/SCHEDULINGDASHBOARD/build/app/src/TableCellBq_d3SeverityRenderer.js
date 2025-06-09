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
import { IconGroup } from '@maximo/react-components';
import { DatasourceThreshold } from '@maximo/react-components';
import { Label } from '@maximo/react-components';

const TableCellBq_d3SeverityRenderer = observer(props => {
    const app = props.app;
const page = props.page || app.findPage('optimizeSchedule');
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = props.eventManager || dialog || page || app;
const templateContext = props.templateContext;
    const skdprojectForOptimizeDS = props.skdprojectForOptimizeDS || app.findDatasource("skdprojectForOptimizeDS");
const skdactivityForOptimizeDS = props.skdactivityForOptimizeDS || app.findDatasource("skdactivityForOptimizeDS");
const skdodmerunForOptimizeDS = props.skdodmerunForOptimizeDS || app.findDatasource("skdodmerunForOptimizeDS");
const jOptimizeAlertsDS = props.jOptimizeAlertsDS || app.findDatasource("jOptimizeAlertsDS");
const jOptimizeSummaryDS = props.jOptimizeSummaryDS || app.findDatasource("jOptimizeSummaryDS");

    

    

    return (
      
      <React.Fragment><Box
    id={'jz5qw[' + props.rowId + ']'}
    
    margin={0}
    marginStart={0}
    
    marginTop={0.3}
    marginBottom={0.3}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    hidden={(item?item.severity:undefined) !== 'WARNING'}
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"jz5qw"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<IconGroup label={app.getLocalizedLabel("pe8nd_label", "Warning")} primaryIcon={"carbon:warning--filled"} primaryIconColor={"support-03"} padding={false} iconSize={"16"} id={'pe8nd[' + props.rowId + ']'} datacomponenttype={"icon-group"} datacomponentoriginalid={"pe8nd"}      />
</Box>
<Box
    id={'xm5zq[' + props.rowId + ']'}
    
    margin={0}
    marginStart={0}
    
    marginTop={0.3}
    marginBottom={0.3}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    hidden={(item?item.severity:undefined) !== 'CRITICAL'}
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"xm5zq"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<IconGroup label={app.getLocalizedLabel("ad6gm_label", "Critical")} primaryIcon={"carbon:error--filled"} primaryIconColor={"support-01"} padding={false} iconSize={"16"} id={'ad6gm[' + props.rowId + ']'} datacomponenttype={"icon-group"} datacomponentoriginalid={"ad6gm"}      />
</Box>
<Box
    id={'knr4m[' + props.rowId + ']'}
    
    margin={0}
    marginStart={0}
    
    marginTop={0.3}
    marginBottom={0.3}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    hidden={(item?item.severity:undefined) !== 'ERROR'}
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"knr4m"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<IconGroup label={app.getLocalizedLabel("wb9_2_label", "Error")} primaryIcon={"carbon:error--filled"} primaryIconColor={"support-01"} padding={false} iconSize={"16"} id={'wb9_2[' + props.rowId + ']'} datacomponenttype={"icon-group"} datacomponentoriginalid={"wb9_2"}      />
</Box>
<Box
    id={'q9ka9[' + props.rowId + ']'}
    
    margin={0}
    marginStart={0}
    
    marginTop={0.3}
    marginBottom={0.3}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    hidden={(item?item.severity:undefined) !== 'INFO'}
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"q9ka9"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<IconGroup label={app.getLocalizedLabel("x945w_label", "Info")} primaryIcon={"carbon:information--filled"} primaryIconColor={"support-04"} padding={false} iconSize={"16"} id={'x945w[' + props.rowId + ']'} datacomponenttype={"icon-group"} datacomponentoriginalid={"x945w"}      />
</Box>
</React.Fragment>
    
    );
  });

export default inject('app')(TableCellBq_d3SeverityRenderer);
    
