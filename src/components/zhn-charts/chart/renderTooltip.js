import { cloneUiElement } from '../../uiApi';

export const renderTooltip = (
  tooltipItem,
  isTooltipActive,
  activeCoordinate,
  activePayload,
  activeLabel,
  offset,
  handleCloseTooltip
) => tooltipItem ? cloneUiElement(tooltipItem, {
  viewBox: {
    ...offset,
    x: offset.left,
    y: offset.top
  },
  active: isTooltipActive,
  label: activeLabel,
  payload: isTooltipActive ? activePayload : [],
  coordinate: activeCoordinate,
  onClose: handleCloseTooltip
}) : null
