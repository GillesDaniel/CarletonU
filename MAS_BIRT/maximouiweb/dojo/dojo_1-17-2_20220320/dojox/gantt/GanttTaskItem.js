/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

define([
	"./GanttTaskControl",
    "dojo/_base/declare",
	"dojo/domReady!"
], function(GanttTaskControl, declare){
	return declare("dojox.gantt.GanttTaskItem", [], {
		constructor: function(configuration){
			//id is required
			this.id = configuration.id;
			this.name = configuration.name || this.id;
			this.startTime = configuration.startTime || new Date();
			this.duration = configuration.duration || 8;
			this.percentage = configuration.percentage || 0;
			this.previousTaskId = configuration.previousTaskId || "";
			this.taskOwner = configuration.taskOwner || "";
			this.cldTasks = [];
			this.cldPreTasks = [];
			this.parentTask = null;
			this.previousTask = null;
			this.project = null;
			this.nextChildTask = null;
			this.previousChildTask = null;
			this.nextParentTask = null;
			this.previousParentTask = null;
		},
		addChildTask: function(task){
			this.cldTasks.push(task);
			task.parentTask = this;
		},
		setProject: function(project){
			this.project = project;
			for(var j = 0; j < this.cldTasks.length; j++){
				this.cldTasks[j].setProject(project);
			}
		}
	});
});
