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

    import { Datasource } from '@maximo/maximo-js-api';
import { JSONDataAdapter } from '@maximo/maximo-js-api';
import { Observer } from 'mobx-react';
import { PageHeaderTemplate } from '@maximo/react-components';
import { Dropdown } from '@maximo/react-components';
import { UpdateOnChange } from '@maximo/react-components';
import { MenuButton } from '@maximo/react-components';
import { MenuItem } from '@maximo/react-components';
import { Link } from '@maximo/react-components';
import { Dialog } from '@maximo/maximo-js-api';
import { TagGroup } from '@maximo/react-components';
import { ErrorBoundary } from '@maximo/react-components';
import { Router } from '@maximo/react-components';
import PageSchedule from './PageSchedule';
import ScheduleTableController from './ScheduleTableController';
import ScheduleTablePageController from './ScheduleTablePageController';
import IncludeEk32v from './IncludeEk32v';
import PageScheduleDetails from './PageScheduleDetails';
import ScheduleDetailsController from './ScheduleDetailsController';
import ScheduleDetailsPageController from './ScheduleDetailsPageController';
import ButtonGroupV7n9mComponent from './ButtonGroupV7n9mComponent';
import IncludeEf32v from './IncludeEf32v';
import SlidingDrawerDetailsSlidingDrawer from './SlidingDrawerDetailsSlidingDrawer';
import DialogPublishingInProgressDialog from './DialogPublishingInProgressDialog';
import DialogPublishScheduleDialog from './DialogPublishScheduleDialog';
import DialogOptimizeScheduleWithoutSavingDialog from './DialogOptimizeScheduleWithoutSavingDialog';
import DialogOptimizeScheduleDialog from './DialogOptimizeScheduleDialog';
import OptimizeDialogController from './OptimizeDialogController';
import PageOptimizeSchedule from './PageOptimizeSchedule';
import OptimizeSchedulePageController from './OptimizeSchedulePageController';
import ButtonGroupQg93nComponent from './ButtonGroupQg93nComponent';
import ButtonGroupWg5q4Component from './ButtonGroupWg5q4Component';
import ButtonGroupNmnpjComponent from './ButtonGroupNmnpjComponent';
import IncludeAbwgj from './IncludeAbwgj';
import DialogOptimizationProgressLog from './DialogOptimizationProgressLog';
    

    // our main generated App
    const PagesPages = observer((props) => {
      const app = props.app;
      const eventManager = app;

      return(
        <Router app={app} routes={[
  {
    path: `/schedule`,
    component: (()=><PageSchedule app={app} page={app.findPage('schedule')} />),
    name: `schedule`
  },
  {
    path: `/scheduleDetails`,
    component: (()=><PageScheduleDetails app={app} page={app.findPage('scheduleDetails')} />),
    name: `scheduleDetails`
  },
  {
    path: `/optimizeSchedule`,
    component: (()=><PageOptimizeSchedule app={app} page={app.findPage('optimizeSchedule')} />),
    name: `optimizeSchedule`
  },
  {
    path: `/schedule/*`,
    component: (()=><PageSchedule app={app} page={app.findPage('schedule')} />),
    name: `schedule`
  },
  {
    path: `/scheduleDetails/*`,
    component: (()=><PageScheduleDetails app={app} page={app.findPage('scheduleDetails')} />),
    name: `scheduleDetails`
  },
  {
    path: `/optimizeSchedule/*`,
    component: (()=><PageOptimizeSchedule app={app} page={app.findPage('optimizeSchedule')} />),
    name: `optimizeSchedule`
  }
]} />
      )
    });

    export default inject('app')(PagesPages);
  
