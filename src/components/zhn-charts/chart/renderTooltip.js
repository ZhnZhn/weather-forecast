import { cloneUiElement } from '../../uiApi';

export const renderTooltip = (
  tooltipItem,
  offset,
  handleCloseTooltip
) => tooltipItem ? cloneUiElement(tooltipItem, {
  viewBox: {
    ...offset,
    x: offset.left,
    y: offset.top
  },
  onClose: handleCloseTooltip
}) : null
