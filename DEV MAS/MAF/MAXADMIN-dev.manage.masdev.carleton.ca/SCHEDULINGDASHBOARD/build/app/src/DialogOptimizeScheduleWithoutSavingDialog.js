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
import { Label } from '@maximo/react-components';
import React from 'react';
class DialogOptimizeScheduleWithoutSavingDialog extends React.Component {
  
        constructor(props) {
          super(props)
          let dialog = props.app.findDialog("optimizeScheduleWithoutSavingDialog");

      if (dialog) dialog.initialize();
        }
      

  

  render() {
    const props = this.props;
    const app = props.app;
const page = props.page || app.findPage('scheduleDetails') || app;
const dialog = app.findDialog('optimizeScheduleWithoutSavingDialog');
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = dialog;
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

    

    return (
      <Dialog id={"optimizeScheduleWithoutSavingDialog"}
    className="mx--composed-dialog"
    
    
    
    
    
    
    
    primaryAction={(event)=>{eventManager.emit('handleSaveAndShowOptimizeDialog', event)}}
    
    
    
    primaryButtonText={app.getLocalizedLabel("optimizeScheduleWithoutSavingDialog_primary-action-text", "Save and optimize")}
    
    
    secondaryAction={(event)=>{eventManager.emit('showOptimizeDialog', event)}}
    
    secondaryButtonText={app.getLocalizedLabel("optimizeScheduleWithoutSavingDialog_secondary-action-text", "Discard and optimize")}
    heading={app.getLocalizedLabel("optimizeScheduleWithoutSavingDialog_title", "Optimize schedule without saving?")}
    
    
    
    
    
    
    
    
    
    
    
    
    zIndex={props.zIndex}
    onClose={props.onClose}
    callback={props.callback}
    content={<Label  label={app.getLocalizedLabel("wk73n_label", "Changes you made will be lost.")} id={"wk73n"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"wk73n"}></Label>
}
  />
    );
  }
}
export default inject('app')(observer(DialogOptimizeScheduleWithoutSavingDialog));
    
