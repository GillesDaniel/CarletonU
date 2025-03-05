/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2020,2023 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

let data = {
  Cfg: {
    id: 'IBM1',
    GanttStyle: 'Standard',
    Style: 'Standard',
    SuppressCfg: '1',
    SuppressMessage: '3',
    Code: 'GTGDBYVOJAWSQB',
    Editing: '0',
    MinRowHeight: '64',
    Locked: ['Layout', 'Zoom'],
    NoVScroll: '1',
  },
  Def: [
    {
      Name: 'R',
      height: '50',
    },
  ],
  Panel: {
    Buttons: 'Select',
    Name: 'Panel',
    Visible: false,
  },
  Head: [
    {
      Kind: 'Filter',
      Visible: false,
      id: 'Filter',
    },
  ],
  Lang: {
    Format: {
      AMDesignator: 'AM',
      Day2CharNames: 'Su,Mo,Tu,We,Th,Fr,Sa,null',
      DecimalSeparator: '.',
      FirstWeekDay: 0,
      FirstWeekYearDay: 0,
      GMT: '1',
      GroupSeparator: ',',
      LongDayNames: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
      LongMonthNames:
        'January,February,March,April,May,June,July,August,September,October,November,December',
      LongMonthNames2:
        'January,February,March,April,May,June,July,August,September,October,November,December',
      PMDesignator: 'PM',
      Percent: '%',
      ShortDayNames: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      ShortMonthNames: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
      d: 'M/d/yy',
      h: 'M/d/yy h:mm tt',
    },
  },
  Header: {
    Map: '',
  },
  LeftCols: [
    {
      Name: 'Map',
      Icon: './TreeGrid/Icons/Map.svg',
      Width: '50',
      CanSort: 0,
      CanEdit: 0,
      CanExport: 0,
      CanFilter: false,
      CanGroup: 0,
      CanHide: 0,
      CanMove: 0,
      CanPrint: 0,
      CaseSensitive: false,
      Visible: true,
      xHasMenu: false,
    },
    {
      Name: 'Resource',
      Width: '120',
      CanSort: 0,
      Type: 'Html',
      CanEdit: 0,
      CanExport: 1,
      CanFilter: true,
      CanGroup: 0,
      CanHide: 0,
      CanMove: 1,
      CanPrint: 1,
      CaseSensitive: false,
      Visible: true,
      xHasMenu: false,
    },
    {
      Name: 'Resource type',
      Width: '120',
      CanSort: 0,
      Type: 'Html',
      CanEdit: 0,
      CanExport: 1,
      CanFilter: true,
      CanGroup: 0,
      CanHide: 0,
      CanMove: 1,
      CanPrint: 1,
      CaseSensitive: false,
      Visible: true,
      xHasMenu: false,
    },
    {
      Name: 'Shift',
      Width: '100',
      CanSort: 0,
      CanEdit: 0,
      CanExport: 1,
      CanFilter: true,
      CanGroup: 0,
      CanHide: 0,
      CanMove: 1,
      CanPrint: 1,
      CaseSensitive: false,
      Visible: true,
      xHasMenu: false,
    },
    {
      Name: 'Utilization',
      Width: '120',
      CanSort: 0,
      CanEdit: 0,
      CanExport: 1,
      CanFilter: true,
      CanGroup: 0,
      CanHide: 0,
      CanMove: 1,
      CanPrint: 1,
      CaseSensitive: false,
      Visible: true,
      xHasMenu: false,
    },
    { Name: 'Run', Width: '50', Visible: false },
  ],
  Cols: [
    {
      GanttFinish: '',
      Name: 'G',
      Type: 'Gantt',
      GanttDataUnits: 'h',
      GanttRunTop: '4',
      GanttRunHeight: '48',
      GanttRun: 'Run',
      GanttLeft: '1',
      GanttRight: '1',
      GanttHeader1: 'd#dddd dddddd MMMM yyyy',
      GanttHeader2: 'h#h tt',
      GanttRunHtml: '<div>*Start* - *End*<br><b>*Text*</b></div>',
      GanttRunHtmlDateFormat: 'HH:mm',
      GanttTask: 'Box',
      GanttRunAdjust: 'shrink',
      GanttRunMove: 'slide,move',
      GanttZoom: 'Day',
      GanttZoomDate: new Date().toDateString(),
      GanttSizeFit: '1',
      GanttMenu: '',
      GanttRunTip: '*Tip*',
    },
  ],
  Foot: [
    {
      id: 'Drag',
      Visible: '0',
      CanHide: '0',
    },
  ],
  Toolbar: {
    Visible: 0,
  },
  Zoom: [
    {
      GanttHeader1: 'w#MMM yyyy',
      GanttHeader2: 'd#%d',
      GanttUnits: 'w6',
      Name: 'Week',
      GanttSize: 'w6',
    },
    {
      GanttHeader1: 'd#dddd dddddd MMMM yyyy',
      GanttHeader2: 'h#h tt',
      GanttUnits: 'h',
      Name: 'Day',
      GanttSize: 'd',
    },
  ],
};

export default data;
