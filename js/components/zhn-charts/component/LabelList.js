"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.LabelList = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _Label = require("./Label");
var _Layer = require("../container/Layer");
var _ChartUtils = require("../util/ChartUtils");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["data", "valueAccessor", "dataKey", "clockWise", "id", "textBreakAll"];
const CL_LABEL_LIST = "recharts-label-list";
const DF_LABEL_LIST_PROPS = {
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
  return (0, _isTypeFn.isNotEmptyArr)(data) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Layer.Layer, {
    className: CL_LABEL_LIST,
    children: data.map((entry, index) => {
      const value = dataKey == null ? valueAccessor(entry, index) : (0, _ChartUtils.getValueByDataKey)(entry && entry.payload, dataKey);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Label.Label, Object.assign({}, restProps, {
        id: id == null ? void 0 : id + "-" + index,
        parentViewBox: entry.parentViewBox,
        index: index,
        value: value,
        textBreakAll: textBreakAll,
        viewBox: (0, _Label.parseViewBox)(clockWise == null ? entry : Object.assign({}, entry, {
          clockWise
        }))
      }), "label-" + index);
    })
  }) : null;
};
exports.LabelList = LabelList;
(0, _uiApi.setDisplayNameTo)(LabelList, "LabelList", DF_LABEL_LIST_PROPS);
//# sourceMappingURL=LabelList.js.map