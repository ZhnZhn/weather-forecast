import { findEntryInArray } from '../util/DataUtils';
import { getTooltipItem } from '../util/ChartUtils';
import { getDisplayedData } from './chartFn';

/**
 * Get the content to be displayed in the tooltip
 * @param  {Object} state          Current state
 * @param  {Array}  chartData      The data defined in chart
 * @param  {Number} activeIndex    Active index of data
 * @param  {String} activeLabel    Active label of data
 * @return {Array}                 The content of tooltip
 */
export const getTooltipContent = (
  state,
  chartData,
  activeIndex,
  activeLabel
) => {
  const {
    graphicalItems,
    tooltipAxis
  } = state
  , displayedData = getDisplayedData(
    chartData,
    state
  );

  if (activeIndex < 0 || !graphicalItems || !graphicalItems.length || activeIndex >= displayedData.length) {
    return null;
  }
  // get data by activeIndex when the axis don't allow duplicated category
  return graphicalItems.reduce((result, child) => {
    const { hide } = child.props;
    if (hide) {
      return result;
    }
    const { data } = child.props
    , payload = tooltipAxis.dataKey && !tooltipAxis.allowDuplicatedCategory
       ? findEntryInArray(
           data || displayedData,
           tooltipAxis.dataKey,
           activeLabel
         )
       : (data && data[activeIndex]) || displayedData[activeIndex];

    return payload ? [
      ...result,
      getTooltipItem(child, payload)
    ] : result;
  }, []);
}
