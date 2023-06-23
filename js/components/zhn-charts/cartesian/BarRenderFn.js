"use strict";

exports.__esModule = true;
exports.renderRectangles = exports.renderErrorBar = exports.renderBackground = void 0;
var _uiApi = require("../../uiApi");
var _zhnAnimate = require("../../zhn-animate");
var _ReactUtils = require("../util/ReactUtils");
var _DataUtils = require("../util/DataUtils");
var _types = require("../util/types");
var _Rectangle = require("../shape/Rectangle");
var _Layer = require("../container/Layer");
var _ErrorBar = require("./ErrorBar");
var _cartesianFn = require("./cartesianFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
const _crElementRectangle = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, {
  ...props
});
const _renderRectangle = (0, _cartesianFn.fCreateElement)(_crElementRectangle);
const _renderRectanglesStatically = (data, props) => {
  const {
      shape
    } = props,
    baseProps = (0, _ReactUtils.filterProps)(props);
  return data && data.map((entry, i) => {
    const rectangleProps = {
      ...baseProps,
      ...entry,
      index: i
    };
    return /*#__PURE__*/(0, _react.createElement)(_Layer.Layer, {
      className: _CL.CL_BAR_RECTANGLE,
      ...(0, _types.adaptEventsOfChild)(rectangleProps, entry, i),
      key: "rectangle-" + i
    }, _renderRectangle(shape, rectangleProps));
  });
};
const renderBackground = props => {
  const {
      data
    } = props,
    backgroundProps = (0, _ReactUtils.filterProps)(props.background);
  return data.map((entry, i) => {
    /*eslint-disable no-unused-vars*/
    const {
      value,
      background,
      ...rest
    } = entry;
    //value
    /*eslint-enable no-unused-vars*/
    if (!background) {
      return null;
    }
    const _props = {
      ...rest,
      fill: '#eee',
      ...background,
      ...backgroundProps,
      ...(0, _types.adaptEventsOfChild)(props, entry, i),
      index: i,
      key: "background-bar-" + i,
      className: _CL.CL_BAR_BACKGROUND_RECTANGLE
    };
    return _renderRectangle(props.background, _props);
  });
};
exports.renderBackground = renderBackground;
const renderErrorBar = (needClip, clipPathId, isAnimationFinished, props) => {
  if (props.isAnimationActive && !isAnimationFinished) {
    return null;
  }
  const {
      data,
      xAxis,
      yAxis,
      layout,
      children
    } = props,
    errorBarItems = (0, _ReactUtils.findAllByType)(children, _ErrorBar.ErrorBar);
  if (!errorBarItems) {
    return null;
  }
  const offset = layout === 'vertical' ? data[0].height / 2 : data[0].width / 2,
    errorBarProps = (0, _cartesianFn.crClipPathProps)(needClip, clipPathId);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    ...errorBarProps,
    children: errorBarItems.map((item, i) => (0, _uiApi.cloneElement)(item, {
      key: "error-bar-" + i,
      data,
      xAxis,
      yAxis,
      layout,
      offset,
      dataPointFormatter: _cartesianFn.dataPointFormatter
    }))
  });
};
exports.renderErrorBar = renderErrorBar;
const ANIMATE_RECT_FROM = {
  t: 0
};
const ANIMATE_RECT_TO = {
  t: 1
};
const _crStepData = (data, prevData, layout, t) => data.map((entry, index) => {
  const prev = prevData && prevData[index];
  if (prev) {
    return {
      ...entry,
      x: (0, _DataUtils.interpolateNumber)(prev.x, entry.x)(t),
      y: (0, _DataUtils.interpolateNumber)(prev.y, entry.y)(t),
      width: (0, _DataUtils.interpolateNumber)(prev.width, entry.width)(t),
      height: (0, _DataUtils.interpolateNumber)(prev.height, entry.height)(t)
    };
  }
  if (layout === 'horizontal') {
    const h = (0, _DataUtils.interpolateNumber)(0, entry.height)(t);
    return {
      ...entry,
      y: entry.y + entry.height - h,
      height: h
    };
  }
  return {
    ...entry,
    width: (0, _DataUtils.interpolateNumber)(0, entry.width)(t)
  };
});
const _renderRectanglesWithAnimation = (props, prevData, handleAnimationStart, handleAnimationEnd) => {
  const {
    data,
    layout,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    animationId
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_zhnAnimate.Animate, {
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    from: ANIMATE_RECT_FROM,
    to: ANIMATE_RECT_TO,
    onAnimationEnd: handleAnimationEnd,
    onAnimationStart: handleAnimationStart,
    children: _ref => {
      let {
        t
      } = _ref;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
        children: _renderRectanglesStatically(_crStepData(data, prevData, layout, t), props)
      });
    }
  }, "bar-" + animationId);
};
const renderRectangles = (props, prevData, handleAnimationStart, handleAnimationEnd) => {
  const {
    data,
    isAnimationActive
  } = props;
  return isAnimationActive && data && data.length
  //&& (!prevData || !_isEqual(prevData, data))
  && (!prevData || prevData !== data) ? _renderRectanglesWithAnimation(props, prevData, handleAnimationStart, handleAnimationEnd) : _renderRectanglesStatically(data, props);
};
exports.renderRectangles = renderRectangles;
//# sourceMappingURL=BarRenderFn.js.map