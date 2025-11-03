import { cloneUiElement } from '../../uiApi';
import { getLegendProps } from '../util/ChartUtils';

const _calcLegendWidth = (
  width,
  margin
) => width - (margin.left || 0) - (margin.right || 0);

export const renderLegend = (
  width,
  height,
  margin,
  children,
  formattedGraphicalItems,
  handleLegendBBoxUpdate
) => {
  const [
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
    onBBoxUpdate: handleLegendBBoxUpdate
  }) : null;
}
