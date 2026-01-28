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

define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "com/ibm/tivoli/maximo/miniapps/_MaximoLog"
], function (lang, declare, log) {
    var _ACTIONS = declare(null, {
        _deleteWorkAction: function (actionItem, row) {
            var rows = this._GetSelectedRows(this.grid, 'G', row);
            this._applyForEachRow(rows, lang.hitch(this, function (row) {
                log.debug("delete activity ", actionItem.Value, row);
                //type =  1 � delete + confirm dialog, 2 � delete, 3 � undelete.
                this.grid.DeleteRow(row, 2);
            }));
            this.Refresh(255);
        },
        newWorkActionReply: function (reply, actionItem, row) {
            log.debug("newWorkActionReply()", actionItem.Value, row, reply);
            this.reloadModel();
        },
        splitActionReply: function (reply, actionItem, row) {
            log.debug("splitActionReply()", actionItem.Value, row, reply);
            this.reloadModel();
        },
       
        reloadModel: function () {
            this.grid.Reload(null, null, false);
            this.sendToBeSaved();
        },

        deleteActionReply: function (reply, actionItem, row) {
            log.debug("deleteActionActionReply()", actionItem.Value, row, reply);
            this.reloadModel();
        },
        newassignmentReply: function (reply, actionItem, row) {
            log.debug("deleteActionActionReply()", actionItem.Value, row, reply);
            this.reloadModel();
        },
        reassignassignmentReply: function (reply, actionItem, row) {
            log.debug("assigntoReply()", actionItem.Value, row, reply);
            this.reloadModel();
        }


    });

    return _ACTIONS;
});
