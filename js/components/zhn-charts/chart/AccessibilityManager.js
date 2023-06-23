"use strict";

exports.__esModule = true;
exports.AccessibilityManager = void 0;
const mathMin = Math.min,
  mathMax = Math.max;
const LAYOUT_HORIZONTAL = 'horizontal';
const _isNotLayoutHorizontal = layout => layout !== LAYOUT_HORIZONTAL;
class AccessibilityManager {
  constructor() {
    this.activeIndex = 0;
    this.coordinateList = [];
    this.layout = LAYOUT_HORIZONTAL;
  }
  setDetails(_ref) {
    let {
      coordinateList = [],
      container = null,
      layout = null,
      offset = null,
      mouseHandlerCallback = null
    } = _ref;
    this.coordinateList = coordinateList != null ? coordinateList : this.coordinateList;
    this.container = container != null ? container : this.container;
    this.layout = layout != null ? layout : this.layout;
    this.offset = offset != null ? offset : this.offset;
    this.mouseHandlerCallback = mouseHandlerCallback != null ? mouseHandlerCallback : this.mouseHandlerCallback;

    // #3627
    // Keep activeIndex in the bounds between 0 and the last coordinate index
    this.activeIndex = mathMin(mathMax(this.activeIndex, 0), this.coordinateList.length - 1);
  }
  focus() {
    this.spoofMouse();
  }

  // #3627
  _isNoTooltips() {
    return this.coordinateList.length === 0;
  }
  keyboardEvent(e) {
    // The AccessibilityManager relies on the Tooltip component. When tooltips suddenly stop existing,
    // it can cause errors. We use this function to check. We don't want arrow keys to be processed
    // if there are no tooltips, since that will cause unexpected behavior of users.
    if (this._isNoTooltips()) {
      return;
    }
    switch (e.key) {
      case 'ArrowRight':
        {
          if (_isNotLayoutHorizontal(this.layout)) {
            return;
          }
          this.activeIndex = mathMin(this.activeIndex + 1, this.coordinateList.length - 1);
          this.spoofMouse();
          break;
        }
      case 'ArrowLeft':
        {
          if (_isNotLayoutHorizontal(this.layout)) {
            return;
          }
          this.activeIndex = mathMax(this.activeIndex - 1, 0);
          this.spoofMouse();
          break;
        }
      default:
        {
          break;
        }
    }
  }
  spoofMouse() {
    if (_isNotLayoutHorizontal(this.layout)) {
      return;
    }

    // This can happen when the tooltips suddenly stop existing as children of the component
    // That update doesn't otherwise fire events, so we have to double check here.
    if (this._isNoTooltips()) {
      return;
    }
    const {
        x,
        y
      } = this.container.getBoundingClientRect(),
      {
        coordinate
      } = this.coordinateList[this.activeIndex],
      pageX = x + coordinate,
      pageY = y + this.offset.top;
    this.mouseHandlerCallback({
      pageX,
      pageY
    });
  }
}
exports.AccessibilityManager = AccessibilityManager;
//# sourceMappingURL=AccessibilityManager.js.map