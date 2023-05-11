import { cloneElement } from '../../uiApi';

import { findChildByType } from '../util/ReactUtils';
import { Tooltip } from '../component/Tooltip';

export const renderTooltip = (
  chartInst
) => {
  const {
    props,
    state
  } = chartInst
  , { children } = props
  , tooltipItem = findChildByType(children, Tooltip);

  if (!tooltipItem) {
    return null;
  }

  const {
    isTooltipActive,
    activeCoordinate,
    activePayload,
    activeLabel,
    offset
  } = state;
  return cloneElement(tooltipItem, {
    viewBox: { ...offset, x: offset.left, y: offset.top },
    active: isTooltipActive,
    label: activeLabel,
    payload: isTooltipActive ? activePayload : [],
    coordinate: activeCoordinate
  });
}
