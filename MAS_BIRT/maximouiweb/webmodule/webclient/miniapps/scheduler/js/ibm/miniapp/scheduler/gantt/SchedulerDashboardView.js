/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2018,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

define(
		"dojo/_base/declare com/ibm/tivoli/maximo/miniapps/_MaximoIO com/ibm/tivoli/maximo/miniapps/_MaximoLog dojo/_base/lang ibm/miniapp/scheduler/gantt/GanttWidget ibm/miniapp/scheduler/gantt/BaseResourceViewWidget dojo/topic"
				.split(" "), function(d, e, c, f, g, h, topic) {
			return d([ g, e, h ], {
				constructor : function(a) {
					c.debug("{} Base Bean Target set to {} for view",
							this.gridId, this.mxtargetbean, a);
					this.ganttDisableEdit = !0
				},
				_newTreeGridOptions : function(a, b) {
					description = b | 0;
					projectid = a | 0;
					a = {
						Data : {
							Url : this.toUrl("async_load_scheduler_dashboard",
									this._ioOptions({
										projectid : projectid,
										description : description
									})),
							Timeout : 300
						}
					};
					c.debug("{} Grid options", this.gridId, a);
					return a
				},
				OnGetGanttBarHtml : function(a, b, c, d, e, f, g, h, l, m, n) {
					return '<div class="skd-bar" style="background-color: '
							+ b.mxCOLOR + '"><span>'
							+ (b.mxTEXT ? b.mxTEXT : "") + "</span></div>"
				},
				attachExtraGridEvents : function(a) {
					this.inherited(arguments);
					this.subscribeOn("skd.scheddash.rowselected", f.hitch(this,
							this.schedulerDashboardRowSelected))
				},
				schedulerDashboardRowSelected : function(a) {
					c.debug("{} xxx ROWSELECTED", this.TAG, a);
					this.grid.Reload(this._newTreeGridOptions(a._OBJECTID,a.description))
				},
				OnRenderFinish : function(a) {
	                topic.publish('miniapp.hideprogress', this.domid);
				}
			});
		});
