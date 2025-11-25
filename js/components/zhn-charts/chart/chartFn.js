"use strict";

exports.__esModule = true;
exports.originCoordinate = exports.getDisplayedData = exports.getDefaultDomainByAxisType = exports.crAxisComponent = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
const originCoordinate = exports.originCoordinate = {
  x: 0,
  y: 0
};
const crAxisComponent = (axisType, AxisComp) => ({
  axisType,
  AxisComp
});
exports.crAxisComponent = crAxisComponent;
const getDisplayedData = (data, _ref, item) => {
  let {
    graphicalItems,
    dataStartIndex,
    dataEndIndex
  } = _ref;
  const itemsData = (graphicalItems || []).reduce((result, child) => {
    const itemData = child.props.data;
    return (0, _isTypeFn.isNotEmptyArr)(itemData) ? [...result, ...itemData] : result;
  }, []);
  return (0, _isTypeFn.isNotEmptyArr)(itemsData) ? itemsData : item && item.props && (0, _isTypeFn.isNotEmptyArr)(item.props.data) ? item.props.data : (0, _isTypeFn.isNotEmptyArr)(data) && (0, _isTypeFn.isNumber)(dataStartIndex) && (0, _isTypeFn.isNumber)(dataEndIndex) ? data.slice(dataStartIndex, dataEndIndex + 1) : [];
};
exports.getDisplayedData = getDisplayedData;
const getDefaultDomainByAxisType = axisType => axisType === 'number' ? [0, 'auto'] : void 0;
exports.getDefaultDomainByAxisType = getDefaultDomainByAxisType;
//# sourceMappingURL=chartFn.js.map