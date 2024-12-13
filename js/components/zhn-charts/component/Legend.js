"use strict";

exports.__esModule = true;
exports.Legend = void 0;
var _uiApi = require("../../uiApi");
var _FnUtils = require("../util/FnUtils");
var _DefaultLegendContent = require("./DefaultLegendContent");
var _DataUtils = require("../util/DataUtils");
var _componentFn = require("./componentFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_LEGEND_WRAPPER = "recharts-legend-wrapper";
const _defaultUniqBy = entry => entry.value;
const _renderContent = (ContentElementOrComp, props) => {
  if ((0, _uiApi.isValidElement)(ContentElementOrComp)) {
    return (0, _uiApi.cloneElement)(ContentElementOrComp, props);
  }
  if ((0, _FnUtils._isFn)(ContentElementOrComp)) {
    return (0, _uiApi.createElement)(ContentElementOrComp, props);
  }
  /*eslint-disable no-unused-vars*/
  const {
    ref,
    ...restProps
  } = props;
  //ref
  /*eslint-enable no-unused-vars*/
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DefaultLegendContent.DefaultLegendContent, {
    ...restProps
  });
};
const EPS = 1;
class Legend extends _uiApi.PureComponent {
  state = (() => ({
    boxWidth: -1,
    boxHeight: -1
  }))();
  static getWithHeight(item, chartWidth) {
    const {
      layout
    } = item.props;
    return layout === "vertical" && (0, _DataUtils.isNumber)(item.props.height) ? {
      height: item.props.height
    } : layout === "horizontal" ? {
      width: item.props.width || chartWidth
    } : null;
  }
  componentDidMount() {
    this.updateBBox();
  }
  componentDidUpdate() {
    this.updateBBox();
  }
  getBBox() {
    return this.wrapperNode && this.wrapperNode.getBoundingClientRect ? this.wrapperNode.getBoundingClientRect() : null;
  }
  getBBoxSnapshot() {
    const {
      boxWidth,
      boxHeight
    } = this.state;
    return boxWidth >= 0 && boxHeight >= 0 ? {
      width: boxWidth,
      height: boxHeight
    } : null;
  }
  getDefaultPosition(style) {
    const {
      layout,
      align,
      verticalAlign,
      margin,
      chartWidth,
      chartHeight
    } = this.props;
    let hPos, vPos;
    if (!style || (style.left === undefined || style.left === null) && (style.right === undefined || style.right === null)) {
      if (align === "center" && layout === "vertical") {
        const box = this.getBBoxSnapshot() || {
          width: 0
        };
        hPos = {
          left: ((chartWidth || 0) - box.width) / 2
        };
      } else {
        hPos = align === "right" ? {
          right: margin && margin.right || 0
        } : {
          left: margin && margin.left || 0
        };
      }
    }
    if (!style || (style.top === undefined || style.top === null) && (style.bottom === undefined || style.bottom === null)) {
      if (verticalAlign === "middle") {
        const box = this.getBBoxSnapshot() || {
          height: 0
        };
        vPos = {
          top: ((chartHeight || 0) - box.height) / 2
        };
      } else {
        vPos = verticalAlign === "bottom" ? {
          bottom: margin && margin.bottom || 0
        } : {
          top: margin && margin.top || 0
        };
      }
    }
    return {
      ...hPos,
      ...vPos
    };
  }
  updateBBox() {
    const {
        boxWidth,
        boxHeight
      } = this.state,
      {
        onBBoxUpdate
      } = this.props;
    if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
      const box = this.wrapperNode.getBoundingClientRect();
      if (Math.abs(box.width - boxWidth) > EPS || Math.abs(box.height - boxHeight) > EPS) {
        this.setState({
          boxWidth: box.width,
          boxHeight: box.height
        }, () => {
          if (onBBoxUpdate) {
            onBBoxUpdate(box);
          }
        });
      }
    } else if (boxWidth !== -1 || boxHeight !== -1) {
      this.setState({
        boxWidth: -1,
        boxHeight: -1
      }, () => {
        if (onBBoxUpdate) {
          onBBoxUpdate(null);
        }
      });
    }
  }
  _refWrapperNode = node => {
    this.wrapperNode = node;
  };
  render() {
    const {
        content,
        width,
        height,
        wrapperStyle,
        payloadUniqBy,
        payload
      } = this.props,
      outerStyle = {
        position: "absolute",
        width: width || "auto",
        height: height || "auto",
        ...this.getDefaultPosition(wrapperStyle),
        ...wrapperStyle
      };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: CL_LEGEND_WRAPPER,
      style: outerStyle,
      ref: this._refWrapperNode,
      children: _renderContent(content, {
        ...this.props,
        payload: (0, _componentFn.getUniqPayload)(payloadUniqBy, payload, _defaultUniqBy)
      })
    });
  }
}
exports.Legend = Legend;
Legend.displayName = "Legend";
Legend.defaultProps = {
  iconSize: 14,
  layout: "horizontal",
  align: "center",
  verticalAlign: "bottom"
};
//# sourceMappingURL=Legend.js.map