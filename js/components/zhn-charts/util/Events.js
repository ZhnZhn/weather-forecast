"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.eventCenter = exports.SYNC_EVENT = void 0;
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
var eventCenter = new _eventemitter["default"]();
exports.eventCenter = eventCenter;
if (eventCenter.setMaxListeners) {
  eventCenter.setMaxListeners(10);
}
var SYNC_EVENT = 'recharts.syncMouseEvents';
exports.SYNC_EVENT = SYNC_EVENT;
//# sourceMappingURL=Events.js.map