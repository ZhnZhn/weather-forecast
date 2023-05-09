
const LAYOUT_HORIZONTAL = 'horizontal';
const _isNotLayoutHorizontal = (
  layout
) => layout !== LAYOUT_HORIZONTAL;

export class AccessibilityManager {
    constructor() {
      this.activeIndex = 0;
      this.coordinateList = [];
      this.layout = LAYOUT_HORIZONTAL;
    }

    setDetails({
      coordinateList = [],
      container = null,
      layout = null,
      offset = null,
      mouseHandlerCallback = null
    }) {
      this.coordinateList = coordinateList ?? this.coordinateList;
      this.container = container ?? this.container;
      this.layout = layout ?? this.layout;
      this.offset = offset ?? this.offset;
      this.mouseHandlerCallback = mouseHandlerCallback ?? this.mouseHandlerCallback;
      if (this.activeIndex >= this.coordinateList.length) {
        this.activeIndex = this.coordinateList.length - 1;
      }
    }

    focus() {
      this.spoofMouse();
    }

    keyboardEvent(e) {
      switch (e.key) {
        case 'ArrowRight': {
          if (_isNotLayoutHorizontal(this.layout)) {
            return;
          }
          this.activeIndex = Math.min(this.activeIndex + 1, this.coordinateList.length - 1);
          this.spoofMouse();
          break;
        }
        case 'ArrowLeft': {
          if (_isNotLayoutHorizontal(this.layout)) {
            return;
          }
          this.activeIndex = Math.max(this.activeIndex - 1, 0);
          this.spoofMouse();
          break;
        }
        default: {
          break;
        }
      }
    }
    spoofMouse() {
      if (_isNotLayoutHorizontal(this.layout)) {
        return;
      }

      const {
        x,
        y
      } = this.container.getBoundingClientRect()
      , {
        coordinate
      } = this.coordinateList[this.activeIndex]
      , pageX = x + coordinate
      , pageY = y + this.offset.top;
      this.mouseHandlerCallback({ pageX, pageY });
    }
}
