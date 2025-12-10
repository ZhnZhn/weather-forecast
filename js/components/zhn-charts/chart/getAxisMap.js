"use strict";

exports.__esModule = true;
exports.getAxisMap = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _ReactUtils = require("../util/ReactUtils");
var _getAxisMapByAxes = require("./getAxisMapByAxes");
/**
 * Get the configuration of all x-axis or y-axis
 * @param  {Object} props          Latest props
 * @param  {String} axisType       The type of axis
 * @param  {Array}  graphicalItems The instances of item
 * @param  {Object} stackGroups    The items grouped by axisId and stackId
 * @param {Number} dataStartIndex  The start index of the data series when a brush is applied
 * @param {Number} dataEndIndex    The end index of the data series when a brush is applied
 * @return {Object}          Configuration
 */
const getAxisMap = (props, _ref) => {
  let {
    axisType = 'xAxis',
    AxisComp,
    graphicalItems
  } = _ref;
  const _axisOptions = {
      axisIdKey: axisType + "Id",
      graphicalItems,
      axisType
    }
    // Get all the instance of Axis
    ,
    axes = (0, _ReactUtils.findAllByType)(props.children, AxisComp);
  return (0, _isTypeFn.isNotEmptyArr)(axes) ? (0, _getAxisMapByAxes.getAxisMapByAxes)(props, Object.assign({}, _axisOptions, {
    axes
  })) : {};
};
exports.getAxisMap = getAxisMap;
//# sourceMappingURL=getAxisMap.js.map