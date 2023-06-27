const CHART_PREFIX = 'recharts';
const CHART_CARTESIAN = `${CHART_PREFIX}-cartesian`;

export const CL_WRAPPER = `${CHART_PREFIX}-wrapper`
export const crAxisCl = (
  axisType
) => `${CHART_PREFIX}-${axisType} ${axisType}`

export const CL_BAR = `${CHART_PREFIX}-bar`
export const CL_BAR_RECTANGLE = `${CL_BAR}-rectangle`
export const CL_BAR_RECTANGLES = `${CL_BAR_RECTANGLE}s`;
export const CL_BAR_BACKGROUND_RECTANGLE = `${CL_BAR}-background-rectangle`

export const CL_LINE = `${CHART_PREFIX}-line`
export const CL_LINE_DOT = `${CL_LINE}-dot`
export const CL_LINE_DOTS = `${CL_LINE_DOT}s`
export const CL_LINE_CURVE = `${CL_LINE}-curve`;

export const CL_AXIS = `${CHART_CARTESIAN}-axis`
export const CL_AXIS_LINE = `${CL_AXIS}-line`
export const CL_AXIS_TICK = `${CL_AXIS}-tick`
export const CL_AXIS_TICKS = `${CL_AXIS_TICK}s`
export const CL_AXIS_TICK_LINE = `${CL_AXIS_TICK}-line`
export const CL_AXIS_TICK_VALUE = `${CL_AXIS_TICK}-value`;

export const CL_CARTESIAN_GRID = `${CHART_CARTESIAN}-grid`
export const CL_GRID_HORIZONTAL = `${CL_CARTESIAN_GRID}-horizontal`
export const CL_GRID_VERTICAL = `${CL_CARTESIAN_GRID}-vertical`
export const CL_BG = `${CL_CARTESIAN_GRID}-bg`
const CHART_CARTESIAN_GRID_STRIPES = `${CL_CARTESIAN_GRID}stripes`
export const CL_STRIPES_HORIZONTAL = `${CHART_CARTESIAN_GRID_STRIPES}-horizontal`
export const CL_STRIPES_VERTICAL = `${CHART_CARTESIAN_GRID_STRIPES}-vertical`;

const LEGEND = 'legend'
const CHART_LEGEND = `${CHART_PREFIX}-${LEGEND}`
export const CL_LEGEND_ICON = `${CHART_LEGEND}-icon`
export const CL_LEGEND_ITEM = `${CHART_LEGEND}-item`
export const CL_LEGEND_ITEM_TEXT = `${CL_LEGEND_ITEM}-text`
export const CL_DF_LEGEND = `${CHART_PREFIX}-default-${LEGEND}`

const CHART_TOOLTIP = `${CHART_PREFIX}-tooltip`;
export const CL_TOOLTIP_ITEM = `${CHART_TOOLTIP}-item`
export const CL_TOOLTIP_ITEM_NAME = `${CL_TOOLTIP_ITEM}-name`
export const CL_TOOLTIP_ITEM_SEPARATOR = `${CL_TOOLTIP_ITEM}-separator`
export const CL_TOOLTIP_ITEM_VALUE = `${CL_TOOLTIP_ITEM}-value`
export const CL_TOOLTIP_ITEM_UNIT = `${CL_TOOLTIP_ITEM}-unit`
export const CL_TOOLTIP_ITEM_LIST = `${CL_TOOLTIP_ITEM}-list`
export const CL_DEFAULT_TOOLTIP = `${CHART_PREFIX}-default-tooltip`
export const CL_TOOLTIP_LABEL = `${CHART_TOOLTIP}-label`
export const CL_TOOLTIP_WRAPPER = `${CHART_PREFIX}-tooltip-wrapper`;

export const CL_LABEL = `${CHART_PREFIX}-label`
export const CL_RESPONSIVE_CONTAINER = `${CHART_PREFIX}-responsive-container`
export const CL_TEXT = `${CHART_PREFIX}-text`

export const CL_RECHARTS_LAYER = `${CHART_PREFIX}-layer`
export const CL_RECHARTS_SURFACE = `${CHART_PREFIX}-surface`

export const CL_CURVE = `${CHART_PREFIX}-curve`
export const CL_DOT = `${CHART_PREFIX}-dot`
export const CL_RESTANGLE = `${CHART_PREFIX}-rectangle`
export const CL_SYMBOLS = `${CHART_PREFIX}-symbols`
