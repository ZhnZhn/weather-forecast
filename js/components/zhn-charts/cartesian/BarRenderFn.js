"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.renderRectangles = exports.renderBackground = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _types = require("../util/types");
var _Rectangle = require("../shape/Rectangle");
var _Layer = require("../container/Layer");
var _cartesianFn = require("./cartesianFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["key"],
  _excluded2 = ["value", "background"]; //import { JsAnimation } from '../../zhn-animation/JsAnimation';
//import { interpolateNumber } from '../util/DataUtils';
const _crElementRectangle = _ref => {
  let {
      key
    } = _ref,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Rectangle.Rectangle, Object.assign({}, restProps), key);
};
const _renderRectangle = (0, _cartesianFn.fCreateElement)(_crElementRectangle);
const _renderRectanglesStatically = (props, data) => {
  const {
    shape
  } = props;
  //, baseProps = filterProps(props);
  return data && data.map((entry, i) => {
    const rectangleProps = Object.assign({}, props, entry, {
      index: i
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, Object.assign({}, (0, _types.adaptEventsOfChild)(rectangleProps, entry, i), {
      className: _CL.CL_BAR_RECTANGLE,
      children: _renderRectangle(shape, rectangleProps)
    }), "rectangle-" + i);
  });
};
const renderBackground = props => {
  const propsBackground = props.background;
  if (!propsBackground) {
    return null;
  }
  const {
    data
  } = props;
  //, backgroundProps = filterProps(propsBackground);
  return data.map((entry, i) => {
    /*eslint-disable no-unused-vars*/
    const {
        background
      } = entry,
      rest = (0, _objectWithoutPropertiesLoose2.default)(entry, _excluded2);
    //value
    /*eslint-enable no-unused-vars*/
    if (!background) {
      return null;
    }
    const _props = Object.assign({}, rest, {
      fill: '#eee'
    }, background, propsBackground, (0, _types.adaptEventsOfChild)(props, entry, i), {
      index: i,
      key: "background-bar-" + i,
      className: _CL.CL_BAR_BACKGROUND_RECTANGLE
    });
    return _renderRectangle(props.background, _props);
  });
};

/*
const _crStepData = (
  data,
  prevData,
  layout,
  t
) => {
  return t === 1 ? data : data.map((entry, index) => {
   const prev = prevData && prevData[index];
   if (prev) {
     return {
       ...entry,
       x: interpolateNumber(prev.x, entry.x)(t),
       y: interpolateNumber(prev.y, entry.y)(t),
       width: interpolateNumber(prev.width, entry.width)(t),
       height: interpolateNumber(prev.height, entry.height)(t)
     };
   }
   if (layout === 'horizontal') {
     const h = interpolateNumber(0, entry.height)(t);
     return {
       ...entry,
       y: entry.y + entry.height - h,
       height: h
     };
   }
   return {
     ...entry,
     width: interpolateNumber(0, entry.width)(t)
   };
});
}
*/

/*
const _renderRectanglesWithAnimation = (
  props,
  prevData,
  handleAnimationStart,
  handleAnimationEnd,
  animationId
) => {
    const {
      data,
      layout,
      isAnimationActive,
      animationBegin,
      animationDuration,
      animationEasing
    } = props;
    return (
      <JsAnimation
         key={`bar-${animationId}`}
         isActive={isAnimationActive}
         begin={animationBegin}
         duration={animationDuration}
         easing={animationEasing}
         onAnimationEnd={handleAnimationEnd}
         onAnimationStart={handleAnimationStart}
      >
       {(t) => (
          <Layer>
           {_renderRectanglesStatically(
              props,
              _crStepData(data, prevData, layout, t)
            )}
          </Layer>
        )}
     </JsAnimation>
   );
}
*/

/*
export const renderRectangles = (
  props,
  prevData,
  handleAnimationStart,
  handleAnimationEnd,
  animationId,
  isAnimationFinished
) => {
  const {
    data,
    isAnimationActive
  } = props;
  return !isAnimationFinished && isAnimationActive
   && data
   && data.length
   && (!prevData || prevData !== data)
    ? _renderRectanglesWithAnimation(props, prevData, handleAnimationStart, handleAnimationEnd, animationId)
    : _renderRectanglesStatically(props, data);
}
*/
exports.renderBackground = renderBackground;
const renderRectangles = props => _renderRectanglesStatically(props, props.data);
exports.renderRectangles = renderRectangles;
//# sourceMappingURL=BarRenderFn.js.map