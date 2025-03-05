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
import { Dialog } from '@maximo/react-components';
import { Box } from '@maximo/react-components';
import { Label } from '@maximo/react-components';
import { BorderLayout } from '@maximo/react-components';
import { Button } from '@maximo/react-components';
import React from 'react';
class DialogOptimizationProgressLog extends React.Component {
  
        constructor(props) {
          super(props)
          let dialog = props.app.findDialog("optimizationProgressLog");

      if (dialog) dialog.initialize();
        }
      

  

  render() {
    const props = this.props;
    const app = props.app;
const page = props.page || app.findPage('optimizeSchedule') || app;
const dialog = app.findDialog('optimizationProgressLog');
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = dialog;
const templateContext = props.templateContext;
    const skdprojectForOptimizeDS = props.skdprojectForOptimizeDS || app.findDatasource("skdprojectForOptimizeDS");
const skdactivityForOptimizeDS = props.skdactivityForOptimizeDS || app.findDatasource("skdactivityForOptimizeDS");
const skdodmerunForOptimizeDS = props.skdodmerunForOptimizeDS || app.findDatasource("skdodmerunForOptimizeDS");
const jOptimizeAlertsDS = props.jOptimizeAlertsDS || app.findDatasource("jOptimizeAlertsDS");
const jOptimizeSummaryDS = props.jOptimizeSummaryDS || app.findDatasource("jOptimizeSummaryDS");

    

    return (
      <Dialog id={"optimizationProgressLog"}
    className="mx--composed-dialog"
    
    
    
    
    
    
    
    
    
    
    
    primaryButtonText={app.getLocalizedLabel("optimizationProgressLog_primary-action-text", "Close")}
    
    
    
    
    secondaryButtonText={app.getLocalizedLabel("optimizationProgressLog_secondary-action-text", "Stop Optimization")}
    heading={app.getLocalizedLabel("optimizationProgressLog_title", "Optimization progress log")}
    
    
    
    
    size={"sm"}
    
    
    
    
    
    
    
    zIndex={props.zIndex}
    onClose={props.onClose}
    callback={props.callback}
    content={<Box
    id={"er9m9"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"er9m9"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"j9g7x"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"j9g7x"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"kgk4v"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"kgk4v"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"field"} label={app.getLocalizedLabel("dmznn_label", "Status")} id={"dmznn"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"dmznn"}></Label>
<BorderLayout
    id={"bx_q95"}

    topVerticalAlign={"start"}
    topHorizontalAlign={"start"}
    topDirection={"row"}
    
    
    
    
    topHorizontalOverflow={"visible"}
    topVerticalOverflow={"visible"}
    
    
    top={<Label  label={""} wrap={true} id={"u6h_r4"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"u6h_r4"}></Label>
}
    
    
    
    bottomVerticalAlign={"start"}
    bottomHorizontalAlign={"start"}
    bottomDirection={"row"}
    
    
    
    
    bottomHorizontalOverflow={"visible"}
    bottomVerticalOverflow={"visible"}
    
    
    bottom={[]}

    
    height={"250px"}
    
    
    
    
    fillParent={true}
    
    
    
    padding={true}
    
    flexBasis={[null,null,null]}
    horizontalOverflow={"hidden"}
    verticalOverflow={"scroll"}
    
    
    
  />
</Box>
<Box
    id={"byvx4"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={false}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"byvx4"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"gkyrr"}
    
    margin={0}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"gkyrr"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Button label={app.getLocalizedLabel("nax57_label", "Clear")} kind={"ghost"} id={"nax57"} small={true} tagValueLimit={99} datadraggable={"true"} datacomponenttype={"button"} datacomponentoriginalid={"nax57"} iconName={"carbon:restart"} />
<Button label={app.getLocalizedLabel("qvzxj_label", "Refresh")} kind={"ghost"} id={"qvzxj"} small={true} tagValueLimit={99} datadraggable={"true"} datacomponenttype={"button"} datacomponentoriginalid={"qvzxj"} iconName={"carbon:renew"} />
</Box>
</Box>
</Box>
</Box>
}
  />
    );
  }
}
export default inject('app')(observer(DialogOptimizationProgressLog));
    
