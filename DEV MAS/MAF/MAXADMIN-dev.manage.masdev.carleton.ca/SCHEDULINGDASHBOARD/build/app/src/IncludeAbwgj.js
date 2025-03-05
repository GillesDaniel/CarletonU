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
import { Box } from '@maximo/react-components';
import { Label } from '@maximo/react-components';
import { Field } from '@maximo/react-components';
import { BorderLayout } from '@maximo/react-components';
import React from 'react';
import TableBq_d3 from './TableBq_d3';
import TableYnvq9 from './TableYnvq9';
class IncludeAbwgj extends React.Component {
  

  

  render() {
    const props = this.props;
    const app = props.app;
const page = props.page || app.findPage('optimizeSchedule') || app;
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
      <Box
    id={"kw34x"}
    
    margin={0}
    
    
    marginTop={1}
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"kw34x"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"qnpre"}
    
    margin={0}
    marginStart={0.5}
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"qnpre"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<BorderLayout
    id={"x_wdk"}

    
    startVerticalAlign={"start"}
    startHorizontalAlign={"start"}
    startDirection={"column"}
    
    
    
    startBackgroundColor={"ui-01"}
    startHorizontalOverflow={"visible"}
    startVerticalOverflow={"visible"}
    
    
    start={[<Box
    id={"rpk8k"}
    
    margin={0}
    marginStart={1}
    
    marginTop={1}
    marginBottom={0.5}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"row"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"rpk8k"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Label  theme={"header-small"} label={app.getLocalizedLabel("wm8rj_label", "Status")} spacing={"none"} padding={"none"} id={"wm8rj"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"wm8rj"}></Label>
</Box>
,<Box
    id={"nvd8x"}
    
    margin={0.5}
    
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"nvd8x"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"grvp9"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"grvp9"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("j782e_label", "Solve status")} value={app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus,'skdopascpsstatus', null, skdodmerunForOptimizeDS) ? app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus[0].status,'skdopascpsstatus[0].status', null, skdodmerunForOptimizeDS) : '--'} loading={skdodmerunForOptimizeDS.item.skdopascpsstatus ? false : true} id={"j782e"} padding={"default"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"j782e"}  customContent={null} dataFormatter={app.formatter}/>
</Box>
<Box
    id={"w56ab"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"w56ab"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("j5m2b_label", "Solutions")} value={app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus,'skdopascpsstatus', null, skdodmerunForOptimizeDS) ? app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus[0].solutions,'skdopascpsstatus[0].solutions', null, skdodmerunForOptimizeDS) : '--'} loading={skdodmerunForOptimizeDS.item.skdopascpsstatus ? false : true} id={"j5m2b"} padding={"default"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"j5m2b"}  customContent={null} dataFormatter={app.formatter}/>
</Box>
<Box
    id={"zvn7x"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"zvn7x"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("ndm9w_label", "Solve elapsed")} value={app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus,'skdopascpsstatus', null, skdodmerunForOptimizeDS) ? app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus[0].solveelapsed,'skdopascpsstatus[0].solveelapsed', null, skdodmerunForOptimizeDS) : '--'} loading={skdodmerunForOptimizeDS.item.skdopascpsstatus ? false : true} id={"ndm9w"} padding={"default"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"ndm9w"}  customContent={null} dataFormatter={app.formatter}/>
</Box>
<Box
    id={"w8yw4"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"w8yw4"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("wjpd2_label", "Solve time")} value={app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus,'skdopascpsstatus', null, skdodmerunForOptimizeDS) ? app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus[0].solvetime,'skdopascpsstatus[0].solvetime', null, skdodmerunForOptimizeDS) : '--'} loading={skdodmerunForOptimizeDS.item.skdopascpsstatus ? false : true} id={"wjpd2"} padding={"default"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"wjpd2"}  customContent={null} dataFormatter={app.formatter}/>
</Box>
<Box
    id={"axnpn"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"axnpn"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("me87k_label", "Search status")} value={app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus,'skdopascpsstatus', null, skdodmerunForOptimizeDS) ? app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus[0].searchstatus,'skdopascpsstatus[0].searchstatus', null, skdodmerunForOptimizeDS) : '--'} loading={skdodmerunForOptimizeDS.item.skdopascpsstatus ? false : true} id={"me87k"} padding={"default"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"me87k"}  customContent={null} dataFormatter={app.formatter}/>
</Box>
<Box
    id={"v9zje"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"v9zje"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("nrx5k_label", "Turn-around time in days")} value={app.format(skdodmerunForOptimizeDS.item.skdopascpskpi,'skdopascpskpi', null, skdodmerunForOptimizeDS) ? app.format(skdodmerunForOptimizeDS.item.skdopascpskpi[0].turnaroundtimedays,'skdopascpskpi[0].turnaroundtimedays', null, skdodmerunForOptimizeDS) : '--'} loading={skdodmerunForOptimizeDS.item.skdopascpskpi ? false : true} id={"nrx5k"} padding={"default"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"nrx5k"}  customContent={null} dataFormatter={app.formatter}/>
</Box>
<Box
    id={"b58ja"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"b58ja"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("p_ezy_label", "Best solution date")} loading={skdodmerunForOptimizeDS.item.skdopascpsstatus ? false : true} padding={"bottom"} id={"p_ezy"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"p_ezy"}  customContent={null} value={[
  {
    id: ("akpmy"),
    value: (skdodmerunForOptimizeDS.item.skdopascpsstatus ? skdodmerunForOptimizeDS.item.skdopascpsstatus[0].bestsolutiondate : '--'),
    type: ("datetime"),
    fieldColor: (undefined),
    fieldClassName: (undefined),
    hidden: (undefined)
  }
]}
      dataFormatter={app.formatter}/>
</Box>
<Box
    id={"z836w"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"z836w"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("yzanx_label", "Best solution elapsed")} value={app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus,'skdopascpsstatus', null, skdodmerunForOptimizeDS) ? app.format(skdodmerunForOptimizeDS.item.skdopascpsstatus[0].bestsolutionelapsed,'skdopascpsstatus[0].bestsolutionelapsed', null, skdodmerunForOptimizeDS) : '--'} loading={skdodmerunForOptimizeDS.item.skdopascpsstatus ? false : true} id={"yzanx"} padding={"default"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"yzanx"}  customContent={null} dataFormatter={app.formatter}/>
</Box>
<Box
    id={"wm2ay"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"wm2ay"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("zmakb_label", "Solve start date")} loading={skdodmerunForOptimizeDS.item.skdopascpsstatus ? false : true} padding={"bottom"} id={"zmakb"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"zmakb"}  customContent={null} value={[
  {
    id: ("xyjqa"),
    value: (skdodmerunForOptimizeDS.item.skdopascpsstatus ? skdodmerunForOptimizeDS.item.skdopascpsstatus[0].solvestartdate : ''),
    type: ("datetime"),
    fieldColor: (undefined),
    fieldClassName: (undefined),
    hidden: (undefined)
  }
]}
      dataFormatter={app.formatter}/>
</Box>
<Box
    id={"ky2b2"}
    
    margin={0}
    
    
    
    marginBottom={1}
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"ky2b2"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Field label={app.getLocalizedLabel("b2_8p_label", "Solve end date")} loading={skdodmerunForOptimizeDS.item.skdopascpsstatus ? false : true} padding={"bottom"} id={"b2_8p"} datadraggable={"true"} droppable={"true"} datacomponenttype={"field"} datacomponentoriginalid={"b2_8p"}  customContent={null} value={[
  {
    id: ("xnzk4"),
    value: (skdodmerunForOptimizeDS.item.skdopascpsstatus ? skdodmerunForOptimizeDS.item.skdopascpsstatus[0].solveenddate : ''),
    type: ("datetime"),
    fieldColor: (undefined),
    fieldClassName: (undefined),
    hidden: (undefined)
  }
]}
      dataFormatter={app.formatter}/>
</Box>
</Box>
]}
    
    endVerticalAlign={"start"}
    endHorizontalAlign={"start"}
    endDirection={"column"}
    
    
    
    
    endHorizontalOverflow={"visible"}
    endVerticalOverflow={"visible"}
    
    
    end={<Box
    id={"r4bvz"}
    
    margin={0}
    marginStart={0.5}
    
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"r4bvz"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<Box
    id={"rxmdz"}
    
    margin={0}
    
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"rxmdz"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<TableBq_d3 id={"bq_d3"} datasource={jOptimizeAlertsDS}   />
</Box>
<Box
    id={"k8m7r"}
    
    margin={0}
    
    marginEnd={0.5}
    
    
    horizontalAlign={"start"}
    verticalAlign={"start"}
    horizontalOverflow={"visible"}
    verticalOverflow={"visible"}
    direction={"column"}
    fillParent={true}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    manageChildren={true}
    
    datacomponentoriginalid={"k8m7r"}
    datacomponenttype={"box"}
    datadraggable={"true"}
    droppable={"true"}
    
  >
<TableYnvq9 id={"ynvq9"} datasource={jOptimizeSummaryDS}   />
</Box>
</Box>
}
    

    
    
    
    
    
    
    fillParent={true}
    
    
    
    padding={false}
    
    flexBasis={[25,null,75]}
    horizontalOverflow={"hidden"}
    verticalOverflow={"hidden"}
    
    
    
  />
</Box>
</Box>

    );
  }
}
export default inject('app')(observer(IncludeAbwgj));
    
