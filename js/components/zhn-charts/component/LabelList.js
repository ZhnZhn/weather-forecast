"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.LabelList = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _isTypeFn = require("../../../utils/isTypeFn");
var _Label = require("./Label");
var _Layer = require("../container/Layer");
var _ChartUtils = require("../util/ChartUtils");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["data", "valueAccessor", "dataKey", "clockWise", "id", "textBreakAll"];
const CL_LABEL_LIST = "recharts-label-list";
const defaultProps = {
  valueAccessor: entry => {
    const {
      value
    } = entry || {};
    return (0, _isTypeFn.isArr)(value) ? value[value.length - 1] : value;
  }
};
const LabelList = props => {
  const {
      data,
      valueAccessor,
      dataKey,
      clockWise,
      id,
      textBreakAll
    } = props,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return data && data.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: CL_LABEL_LIST,
    children: data.map((entry, index) => {
      const value = (0, _isTypeFn.isNullOrUndef)(dataKey) ? valueAccessor(entry, index) : (0, _ChartUtils.getValueByDataKey)(entry && entry.payload, dataKey),
        idProps = (0, _isTypeFn.isNullOrUndef)(id) ? {} : {
          id: id + "-" + index
        };
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.Label, Object.assign({}, restProps, idProps, {
        parentViewBox: entry.parentViewBox,
        index: index,
        value: value,
        textBreakAll: textBreakAll,
        viewBox: _Label.Label.parseViewBox((0, _isTypeFn.isNullOrUndef)(clockWise) ? entry : Object.assign({}, entry, {
          clockWise
        }))
      }), "label-" + index);
    })
  }) : null;
};
exports.LabelList = LabelList;
LabelList.displayName = 'LabelList';
LabelList.defaultProps = defaultProps;
//# sourceMappingURL=LabelList.js.map