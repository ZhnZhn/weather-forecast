"use strict";

exports.__esModule = true;
exports.generateCategoricalChart = void 0;
var _isTypeFn = require("../../../utils/isTypeFn");
var _uiApi = require("../../uiApi");
var _has = require("../../has");
var _styleFn = require("../../styleFn");
var _Surface = require("../container/Surface");
var _ClipPath = require("../container/ClipPath");
var _Tooltip = require("../component/Tooltip");
var _ReactUtils = require("../util/ReactUtils");
var _DOMUtils = require("../util/DOMUtils");
var _DataUtils = require("../util/DataUtils");
var _ChartUtils = require("../util/ChartUtils");
var _generateCategoricalChartFn = require("./generateCategoricalChartFn");
var _fGetDerivedStateFromProps = require("./fGetDerivedStateFromProps");
var _renderFn = require("./renderFn");
var _renderLegend = require("./renderLegend");
var _renderTooltip = require("./renderTooltip");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _getEvtTouch = _ref => {
  let {
    changedTouches
  } = _ref;
  return (0, _isTypeFn.isNotEmptyArr)(changedTouches) ? changedTouches[0] : void 0;
};
const _inRange = (x, y, layout, offset) => (0, _ChartUtils.isLayoutHorizontal)(layout) || (0, _ChartUtils.isLayoutVertical)(layout) ? x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height ? {
  x,
  y
} : null : null;
const generateCategoricalChart = function (chartName, updateStateOfAxisMapsOffsetAndStackGroups, validateTooltipEventTypes) {
  var _CategoricalChartWrapper;
  if (validateTooltipEventTypes === void 0) {
    validateTooltipEventTypes = ['axis'];
  }
  return _CategoricalChartWrapper = class CategoricalChartWrapper extends _uiApi.Component {
    constructor(props) {
      super(props);
      this.handleLegendBBoxUpdate = box => {
        if (box) {
          const {
            dataStartIndex,
            dataEndIndex,
            updateId
          } = this.state;
          this.setState(Object.assign({
            legendBBox: box
          }, updateStateOfAxisMapsOffsetAndStackGroups({
            props: this.props,
            dataStartIndex,
            dataEndIndex,
            updateId
          }, Object.assign({}, this.state, {
            legendBBox: box
          }))));
        }
      };
      this.handleMouseEnter = e => {
        const {
            onMouseEnter
          } = this.props,
          mouse = this.getMouseInfo(e);
        if (mouse) {
          const nextState = Object.assign({}, mouse, {
            isTooltipActive: true
          });
          this.setState(nextState);
          if ((0, _isTypeFn.isFn)(onMouseEnter)) {
            onMouseEnter(nextState, e);
          }
        }
      };
      this.handleMouseMove = e => {
        const {
            onMouseMove
          } = this.props,
          mouse = this.getMouseInfo(e),
          nextState = mouse ? Object.assign({}, mouse, {
            isTooltipActive: true
          }) : {
            isTooltipActive: false
          };
        this.setState(nextState);
        if ((0, _isTypeFn.isFn)(onMouseMove)) {
          onMouseMove(nextState, e);
        }
      };
      this.handleMouseLeave = e => {
        const {
            onMouseLeave
          } = this.props,
          nextState = {
            isTooltipActive: false
          };
        this.setState(nextState);
        if ((0, _isTypeFn.isFn)(onMouseLeave)) {
          onMouseLeave(nextState, e);
        }
      };
      this.handleCloseTooltip = () => {
        this.setState({
          isTooltipActive: false
        });
      };
      this.handleClick = e => {
        const {
            onClick
          } = this.props,
          mouse = this.getMouseInfo(e);
        if (mouse) {
          const nextState = Object.assign({}, mouse, {
            isTooltipActive: true
          });
          this.setState(nextState);
          if ((0, _isTypeFn.isFn)(onClick)) {
            onClick(nextState, e);
          }
        }
      };
      this.handleMouseDown = e => {
        const {
          onMouseDown
        } = this.props;
        if ((0, _isTypeFn.isFn)(onMouseDown)) {
          const nextState = this.getMouseInfo(e);
          onMouseDown(nextState, e);
        }
      };
      this.handleMouseUp = e => {
        const {
          onMouseUp
        } = this.props;
        if ((0, _isTypeFn.isFn)(onMouseUp)) {
          const nextState = this.getMouseInfo(e);
          onMouseUp(nextState, e);
        }
      };
      this.handleTouchMove = evt => {
        const evtTouch = _getEvtTouch(evt);
        if (evtTouch) {
          this.handleMouseMove(evtTouch);
        }
      };
      this.handleTouchStart = evt => {
        const evtTouch = _getEvtTouch(evt);
        if (evtTouch) {
          this.handleMouseDown(evtTouch);
        }
      };
      this.handleTouchEnd = evt => {
        const evtTouch = _getEvtTouch(evt);
        if (evtTouch) {
          this.handleMouseUp(evtTouch);
        }
      };
      this._refLegend = legend => {
        this.legendInstance = legend;
      };
      this._refContainer = node => {
        this.container = node;
      };
      this.clipPathId = (props.id || (0, _DataUtils.uniqueId)('recharts')) + "-clip";
      this.state = {};
    }
    /**
     * Get the information of mouse in chart, return null when the mouse is not in the chart
     * @param  {Object} evt    The event object
     * @return {Object}          Mouse data
     */
    getMouseInfo(evt) {
      if (!this.container) {
        return null;
      }
      const containerOffset = (0, _DOMUtils.getOffset)(this.container),
        e = (0, _DOMUtils.calculateChartCoordinate)(evt, containerOffset),
        rangeObj = _inRange(e.chartX, e.chartY, this.props.layout, this.state.offset);
      if (!rangeObj) {
        return null;
      }
      const tooltipData = (0, _generateCategoricalChartFn.getTooltipData)(this.state, this.props.data, this.props.layout, rangeObj);
      return tooltipData ? Object.assign({}, e, tooltipData) : null;
    }
    parseEventsOfWrapper() {
      const {
          children
        } = this.props,
        tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip.Tooltip);
      return tooltipItem ? tooltipItem.props.trigger === 'click' ? {
        onClick: this.handleClick
      } : Object.assign({
        onMouseEnter: this.handleMouseEnter,
        onMouseMove: this.handleMouseMove,
        onMouseLeave: this.handleMouseLeave
      }, _has.HAS_TOUCH_EVENTS ? {
        onTouchMove: this.handleTouchMove,
        onTouchStart: this.handleTouchStart,
        onTouchEnd: this.handleTouchEnd
      } : void 0) : {};
    }
    render() {
      if (!(0, _ReactUtils.validateWidthHeight)(this)) {
        return null;
      }
      const {
          className,
          width,
          height,
          style,
          compact,
          title,
          desc
          //...others
        } = this.props,
        {
          offset
        } = this.state,
        attrs = {};

      // The "compact" mode is mainly used as the panorama within Brush
      if (compact) {
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Surface.Surface, Object.assign({}, attrs, {
          width: width,
          height: height,
          title: title,
          desc: desc,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPath.ClipPath, {
            id: this.clipPathId,
            offset: offset
          }), (0, _ReactUtils.renderByMap)(this, _renderFn.renderMap)]
        }));
      }
      if (this.props.accessibilityLayer) {
        var _, _img;
        // Set tabIndex to 0 by default (can be overwritten)
        attrs.tabIndex = (_ = 0) != null ? _ : this.props.tabIndex;
        // Set role to img by default (can be overwritten)
        attrs.role = (_img = 'img') != null ? _img : this.props.role;
      }
      const events = this.parseEventsOfWrapper();
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", Object.assign({
        role: "region",
        ref: this._refContainer,
        className: (0, _styleFn.crCn)(_CL.CL_WRAPPER, className),
        style: Object.assign({
          position: 'relative',
          cursor: 'default',
          width,
          height
        }, style)
      }, events, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Surface.Surface, Object.assign({}, attrs, {
          width: width,
          height: height,
          title: title,
          desc: desc,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ClipPath.ClipPath, {
            id: this.clipPathId,
            offset: offset
          }), (0, _ReactUtils.renderByMap)(this, _renderFn.renderMap)]
        })), (0, _renderLegend.renderLegend)(this), (0, _renderTooltip.renderTooltip)(this)]
      }));
    }
  }, _CategoricalChartWrapper.displayName = chartName, _CategoricalChartWrapper.defaultProps = {
    layout: 'horizontal',
    stackOffset: 'none',
    barCategoryGap: '10%',
    barGap: 4,
    margin: {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    },
    reverseStackOrder: false,
    syncMethod: 'index'
  }, _CategoricalChartWrapper.getDerivedStateFromProps = (0, _fGetDerivedStateFromProps.fGetDerivedStateFromProps)(updateStateOfAxisMapsOffsetAndStackGroups), _CategoricalChartWrapper;
};
exports.generateCategoricalChart = generateCategoricalChart;
//# sourceMappingURL=generateCategoricalChart.js.map