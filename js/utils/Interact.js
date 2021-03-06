"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _interactjs = _interopRequireDefault(require("interactjs"));

var Interact = {
  makeDragable: function makeDragable(domNode) {
    (0, _interactjs["default"])(domNode).draggable({
      inertia: true,

      /*
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      */
      onmove: this._dragMoveListener,
      onend: this._dragEndListener
    }).preventDefault(false);
  },
  _dragMoveListener: function _dragMoveListener(event) {
    var target = event.target // keep the dragged position in the data-x/data-y attributes
    ,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy; // translate the element

    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'; // update the posiion attributes

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  },
  _dragEndListener: function _dragEndListener(event) {
    var target = event.target,
        x = parseFloat(target.getAttribute('data-x')) || 0,
        y = parseFloat(target.getAttribute('data-y')) || 0,
        left = Number(target.style.left.replace('px', '')),
        top = Number(target.style.top.replace('px', ''));
    target.style.left = left + x + 'px';
    target.style.top = top + y + 'px';
    target.style.webkitTransform = target.style.transform = '';
    target.setAttribute('data-x', 0);
    target.setAttribute('data-y', 0);
    /*
    let domHtml = document.getElementByTag('html');
    domHtml[0].style.cursor = 'default';
    */
  }
};
var _default = Interact;
exports["default"] = _default;
//# sourceMappingURL=Interact.js.map