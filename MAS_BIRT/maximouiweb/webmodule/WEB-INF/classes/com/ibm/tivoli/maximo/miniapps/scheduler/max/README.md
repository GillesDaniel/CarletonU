# Scheduler Max

Performance First Scheduler

'model' is temporary... Eventually this would be in the businessobjects area, but until we determine what we need, etc, it's easier to buid it out from here, since we don't have to restart MXServer to pick up changes, etc.

The Base Classes extend BaseTreeGridMiniAppBean, and that will likely change since those classes are MXGanttModel Specific.

We will start with a Top Down approach, where we figure out what TreeGrid needs, and then build our service layer to that, and then push down what we need from the Data Manager.


Current Sean is working on building out the UI components (Table, Gantt, Toolbar, Menus, etc)

Silvino is looking into the TreeGrid paging and how that will impact our services for loading data, filtering, searching etc.

Qiuping will look into building the Data Manager... 3 phases to this...
1. Collect Work Orders based on the Work Query and populate the SKDActivity (or other data table).  This needs to be fast.
2. Based on the paging requirements, sorting, filtering, etc, DataManager needs to be able to request "pages" of data from the DataManager that get serialized and passed to the UI
3. Based on updates from the UI we need to quickly write SKDACTIVITY data back to the WO

