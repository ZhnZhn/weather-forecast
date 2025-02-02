import { cloneUiElement } from '../../uiApi';
import { getLegendProps } from '../util/ChartUtils';

export const renderLegend = (
  chartInst,
  legendContent
) => {
  const {
    props,
    state
  } = chartInst
  , {
    formattedGraphicalItems
  } = state
  , {
    children,
    width,
    height
  } = props
  , margin = props.margin || {}
  , legendWidth = width - (margin.left || 0) - (margin.right || 0)
  , _props = getLegendProps({
      children,
      formattedGraphicalItems,
      legendWidth,
      legendContent
  });

  if (!_props) {
    return null;
  }

  const {
    item,
    ...itemProps
  } = _props;
  return cloneUiElement(item, {
     ...itemProps,
     chartWidth: width,
     chartHeight: height,
     margin,     
     onBBoxUpdate: chartInst.handleLegendBBoxUpdate,
  });
}
