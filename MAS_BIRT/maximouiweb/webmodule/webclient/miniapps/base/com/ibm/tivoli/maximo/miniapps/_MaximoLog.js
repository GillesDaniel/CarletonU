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

define([], function () {
    var _MaximoLog = {
        _log: function (level, msg, args) {
            if (level >= _MaximoLog.LOG_LEVEL) {
                if (args && args.length > 0) {
                    // process {} place holders
                    while (args.length > 0) {
                        var nm = msg.replace('{}', args[0]);
                        if (nm == msg) break;
                        msg = nm;
                        args = Array.prototype.splice.call(args, 1)
                    }

                    // if we still have objects, then pass then directly to console.log
                    if (args.length > 0) {
                        var params = ["[" + ((new Date().getTime()) - _MaximoLog.BASETIME) + "]" + "[" + level + "]: " + msg];
                        console.log.apply(console, params.concat(args));
                    } else {
                        console.log("[" + ((new Date().getTime()) - _MaximoLog.BASETIME) + "]" + "[" + level + "]: " + msg);
                    }
                } else {
                    console.log("[" + ((new Date().getTime()) - _MaximoLog.BASETIME) + "]" + "[" + level + "]: " + msg);
                }
            }
        },

        debug: function (msg) {
            if (_MaximoLog.DEBUG < _MaximoLog.LOG_LEVEL) return;
            this._log.apply(this, [_MaximoLog.DEBUG, msg, Array.prototype.splice.call(arguments, 1)]);
        },

        info: function (msg) {
            if (_MaximoLog.INFO < _MaximoLog.LOG_LEVEL) return;
            this._log.apply(this, [_MaximoLog.INFO, msg, Array.prototype.splice.call(arguments, 1)]);
        },
        warn: function (msg) {
            if (_MaximoLog.WARN < _MaximoLog.LOG_LEVEL) return;
            this._log.apply(this, [_MaximoLog.WARN, msg, Array.prototype.splice.call(arguments, 1)]);
        },
        error: function (msg) {
            if (_MaximoLog.ERROR < _MaximoLog.LOG_LEVEL) return;
            this._log.apply(this, [_MaximoLog.ERROR, msg, Array.prototype.splice.call(arguments, 1)]);
        },

        isDebug: function() {
            return !(_MaximoLog.DEBUG < _MaximoLog.LOG_LEVEL);
        }

    };

    // current global log level
    // TODO: Let's pull logging from the URL param
    _MaximoLog.LOG_LEVEL = 0;

    // log levels
    _MaximoLog.DEBUG = 0;
    _MaximoLog.INFO = 1;
    _MaximoLog.WARN = 2;
    _MaximoLog.ERROR = 3;
    _MaximoLog.BASETIME = (new Date().getTime());
    return _MaximoLog;
});
