"use strict";

exports.__esModule = true;
exports.isLayoutVertical = exports.isLayoutHorizontal = exports.isLayoutCentric = exports.getDisplayedData = exports.getDefaultDomainByAxisType = exports.crAxisComponent = void 0;
var _DataUtils = require("../util/DataUtils");
var crAxisComponent = function crAxisComponent(axisType, AxisComp) {
  return {
    axisType: axisType,
    AxisComp: AxisComp
  };
};
exports.crAxisComponent = crAxisComponent;
var isLayoutHorizontal = function isLayoutHorizontal(layout) {
  return layout === 'horizontal';
};
exports.isLayoutHorizontal = isLayoutHorizontal;
var isLayoutVertical = function isLayoutVertical(layout) {
  return layout === 'vertical';
};
exports.isLayoutVertical = isLayoutVertical;
var isLayoutCentric = function isLayoutCentric(layout) {
  return layout === 'centric';
};
exports.isLayoutCentric = isLayoutCentric;
var getDisplayedData = function getDisplayedData(data, _ref, item) {
  var graphicalItems = _ref.graphicalItems,
    dataStartIndex = _ref.dataStartIndex,
    dataEndIndex = _ref.dataEndIndex;
  var itemsData = (graphicalItems || []).reduce(function (result, child) {
    var itemData = child.props.data;
    return itemData && itemData.length ? [].concat(result, itemData) : result;
  }, []);
  if (itemsData && itemsData.length > 0) {
    return itemsData;
  }
  if (item && item.props && item.props.data && item.props.data.length > 0) {
    return item.props.data;
  }
  if (data && data.length && (0, _DataUtils.isNumber)(dataStartIndex) && (0, _DataUtils.isNumber)(dataEndIndex)) {
    return data.slice(dataStartIndex, dataEndIndex + 1);
  }
  return [];
};
exports.getDisplayedData = getDisplayedData;
var getDefaultDomainByAxisType = function getDefaultDomainByAxisType(axisType) {
  return axisType === 'number' ? [0, 'auto'] : void 0;
};
exports.getDefaultDomainByAxisType = getDefaultDomainByAxisType;
//# sourceMappingURL=chartFn.js.map