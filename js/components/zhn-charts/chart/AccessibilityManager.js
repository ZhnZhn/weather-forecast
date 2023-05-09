"use strict";

exports.__esModule = true;
exports.AccessibilityManager = void 0;
var LAYOUT_HORIZONTAL = 'horizontal';
var _isNotLayoutHorizontal = function _isNotLayoutHorizontal(layout) {
  return layout !== LAYOUT_HORIZONTAL;
};
var AccessibilityManager = /*#__PURE__*/function () {
  function AccessibilityManager() {
    this.activeIndex = 0;
    this.coordinateList = [];
    this.layout = LAYOUT_HORIZONTAL;
  }
  var _proto = AccessibilityManager.prototype;
  _proto.setDetails = function setDetails(_ref) {
    var _ref$coordinateList = _ref.coordinateList,
      coordinateList = _ref$coordinateList === void 0 ? [] : _ref$coordinateList,
      _ref$container = _ref.container,
      container = _ref$container === void 0 ? null : _ref$container,
      _ref$layout = _ref.layout,
      layout = _ref$layout === void 0 ? null : _ref$layout,
      _ref$offset = _ref.offset,
      offset = _ref$offset === void 0 ? null : _ref$offset,
      _ref$mouseHandlerCall = _ref.mouseHandlerCallback,
      mouseHandlerCallback = _ref$mouseHandlerCall === void 0 ? null : _ref$mouseHandlerCall;
    this.coordinateList = coordinateList != null ? coordinateList : this.coordinateList;
    this.container = container != null ? container : this.container;
    this.layout = layout != null ? layout : this.layout;
    this.offset = offset != null ? offset : this.offset;
    this.mouseHandlerCallback = mouseHandlerCallback != null ? mouseHandlerCallback : this.mouseHandlerCallback;
    if (this.activeIndex >= this.coordinateList.length) {
      this.activeIndex = this.coordinateList.length - 1;
    }
  };
  _proto.focus = function focus() {
    this.spoofMouse();
  };
  _proto.keyboardEvent = function keyboardEvent(e) {
    switch (e.key) {
      case 'ArrowRight':
        {
          if (_isNotLayoutHorizontal(this.layout)) {
            return;
          }
          this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1);
          this.spoofMouse();
          break;
        }
      case 'ArrowLeft':
        {
          if (_isNotLayoutHorizontal(this.layout)) {
            return;
          }
          this.activeIndex = Math.max(this.activeIndex - 1, 0);
          this.spoofMouse();
          break;
        }
      default:
        {
          break;
        }
    }
  };
  _proto.spoofMouse = function spoofMouse() {
    if (_isNotLayoutHorizontal(this.layout)) {
      return;
    }
    var _this$container$getBo = this.container.getBoundingClientRect(),
      x = _this$container$getBo.x,
      y = _this$container$getBo.y,
      coordinate = this.coordinateList[this.activeIndex].coordinate,
      pageX = x + coordinate,
      pageY = y + this.offset.top;
    this.mouseHandlerCallback({
      pageX: pageX,
      pageY: pageY
    });
  };
  return AccessibilityManager;
}();
exports.AccessibilityManager = AccessibilityManager;
//# sourceMappingURL=AccessibilityManager.js.map