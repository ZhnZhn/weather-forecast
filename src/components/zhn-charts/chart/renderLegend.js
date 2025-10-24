import { cloneUiElement } from '../../uiApi';
import { getLegendProps } from '../util/ChartUtils';

const _calcLegendWidth = (
  width,
  margin
) => width - (margin.left || 0) - (margin.right || 0);

export const renderLegend = (
  chartInst
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
  , [
    _legendProps,
    _legendItem
  ] = getLegendProps({
    children,
    formattedGraphicalItems,
    legendWidth: _calcLegendWidth(width, margin)
  });

  return _legendProps ? cloneUiElement(_legendItem, {
    ..._legendProps,
    chartWidth: width || 0,
    chartHeight: height || 0,
    margin,
    onBBoxUpdate: chartInst.handleLegendBBoxUpdate
  }) : null;
}
