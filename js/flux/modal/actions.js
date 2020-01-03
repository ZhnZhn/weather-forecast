"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = exports.showModal = exports.ACTION = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var ACTION = {
  MODAL_SHOW: 'MODAL_SHOW'
};
exports.ACTION = ACTION;

var showModal = function showModal(id, option) {
  return (0, _extends2["default"])({
    type: ACTION.MODAL_SHOW,
    id: id
  }, option);
};

exports.showModal = showModal;
var actions = {
  showModal: showModal
};
var _default = actions;
exports["default"] = _default;
//# sourceMappingURL=actions.js.map