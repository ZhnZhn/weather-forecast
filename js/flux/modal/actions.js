'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ACTION = exports.ACTION = {
  MODAL_SHOW: 'MODAL_SHOW'
};

var showModal = exports.showModal = function showModal(id) {
  return {
    type: ACTION.MODAL_SHOW,
    id: id
  };
};

var actions = { showModal: showModal };

exports.default = actions;
//# sourceMappingURL=actions.js.map