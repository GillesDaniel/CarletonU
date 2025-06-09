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
class DialogPublishScheduleDialog extends React.Component {
  
        constructor(props) {
          super(props)
          let dialog = props.app.findDialog("publishScheduleDialog");

      if (dialog) dialog.initialize();
        }
      

  

  render() {
    const props = this.props;
    const app = props.app;
const page = props.page || app.findPage('scheduleDetails') || app;
const dialog = app.findDialog('publishScheduleDialog');
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
      <Dialog id={"publishScheduleDialog"}
    className="mx--composed-dialog"
    
    
    
    
    
    
    
    primaryAction={(event)=>{eventManager.emit('handlePublishScheduleInProgress', event)}}
    
    
    
    primaryButtonText={app.getLocalizedLabel("publishScheduleDialog_primary-action-text", "Publish")}
    
    
    
    
    secondaryButtonText={app.getLocalizedLabel("publishScheduleDialog_secondary-action-text", "Cancel")}
    heading={app.getLocalizedLabel("publishScheduleDialog_title", "Publish schedule")}
    
    
    
    
    size={"sm"}
    
    
    
    
    
    
    
    zIndex={props.zIndex}
    onClose={props.onClose}
    callback={props.callback}
    content={<Label  label={app.getLocalizedLabel("vrgsa2daw_label", "Publishing the schedule commits the schedule data to the work records. Do you want to proceed?")} wrap={true} id={"vrgsa2daw"} padding={"default"} datadraggable={"true"} datacomponenttype={"label"} datacomponentoriginalid={"vrgsa2daw"}></Label>
}
  />
    );
  }
}
export default inject('app')(observer(DialogPublishScheduleDialog));
    
