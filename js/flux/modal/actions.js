'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ACTION = exports.ACTION = {
  MODAL_SHOW: 'MODAL_SHOW'
};

var showModal = exports.showModal = function showModal(id, option) {
  return _extends({
    type: ACTION.MODAL_SHOW,
    id: id
  }, option);
};

var actions = { showModal: showModal };

exports.default = actions;
//# sourceMappingURL=actions.js.map