import {
  isValidElement,
  cloneElement,
  PureComponent,
  Children
} from '../../uiApi';

import classNames from 'classnames';
import { scalePoint } from 'd3-scale';

import {
  _isFn,
  _range
} from '../util/FnUtils';

import { Layer } from '../container/Layer';
import { Text } from '../component/Text';
import { getValueByDataKey } from '../util/ChartUtils';
import { isNumber } from '../util/DataUtils';
import { filterProps } from '../util/ReactUtils';

const CL_BRUSH = "recharts-brush"
, CL_BRUSH_TRAVELLER = `${CL_BRUSH}-traveller`
, CL_BRUSH_SLIDE = `${CL_BRUSH}-slide`
, CL_BRUSH_TEXTS = `${CL_BRUSH}-texts`
, S_CURSOR_COL_RESIZE = {
  cursor: 'col-resize'
}
, S_CURSOR_MOVE = {
  cursor: 'move'
};

const _createScale = ({
  data,
  startIndex,
  endIndex,
  x,
  width,
  travellerWidth
}) => {
  if (!data || !data.length) {
    return {};
  }
  const len = data.length
  , scale = scalePoint()
      .domain(_range(0, len))
      .range([x, x + width - travellerWidth])
  , scaleValues = scale
      .domain()
      .map(entry => scale(entry));
  return {
    isTextActive: false,
    isSlideMoving: false,
    isTravellerMoving: false,
    startX: scale(startIndex),
    endX: scale(endIndex),
    scale,
    scaleValues
  };
};

const _isTouchEvent = (
  e
) => e.changedTouches && !!e.changedTouches.length;
const _getEvent = (
  e
) => _isTouchEvent(e)
  ? e.changedTouches[0]
  : e;

const _renderDefaultTraveller = (props) => {
  const {
    x,
    y,
    width,
    height,
    stroke
  } = props
  , lineY = Math.floor(y + height / 2) - 1;
  return (
    <>
     <rect x={x} y={y} width={width} height={height} fill={stroke} stroke="none" />
     <line x1={x + 1} y1={lineY} x2={x + width - 1} y2={lineY} fill="none" stroke="#fff" />
     <line x1={x + 1} y1={lineY + 2} x2={x + width - 1} y2={lineY + 2} fill="none" stroke="#fff" />
    </>
  );
}

const _renderTraveller = (
  option,
  props
) => isValidElement(option)
  ? cloneElement(option, props)
  : _isFn(option)
     ? option(props)
     : _renderDefaultTraveller(props);

const _getIndexInRange = (
  range,
  x
) => {
  const len = range.length;
  let start = 0
  , end = len - 1;
  while (end - start > 1) {
    const middle = Math.floor((start + end) / 2);
    if (range[middle] > x) {
      end = middle;
    } else {
      start = middle;
    }
  }
  return x >= range[end] ? end : start;
}

export class Brush extends PureComponent {
  constructor(props) {
    super(props);
    this.travellerDragStartHandlers = {
      startX: this.handleTravellerDragStart.bind(this, 'startX'),
      endX: this.handleTravellerDragStart.bind(this, 'endX'),
    };
    this.state = {};
  }

  handleDrag = (e) => {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
      this.leaveTimer = null;
    }
    if (this.state.isTravellerMoving) {
      this.handleTravellerMove(e);
    } else if (this.state.isSlideMoving) {
      this.handleSlideDrag(e);
    }
  }

  handleTouchMove = (e) => {
    if (e.changedTouches != null && e.changedTouches.length > 0) {
      this.handleDrag(e.changedTouches[0]);
    }
  }

  handleDragEnd = () => {
    this.setState({
      isTravellerMoving: false,
      isSlideMoving: false
    });
    this.detachDragEndListener();
  }

  handleLeaveWrapper = () => {
    if (this.state.isTravellerMoving || this.state.isSlideMoving) {
      this.leaveTimer = window.setTimeout(this.handleDragEnd, this.props.leaveTimeOut);
    }
  }

  handleEnterSlideOrTraveller = () => {
    this.setState({
      isTextActive: true
    });
  }

  handleLeaveSlideOrTraveller = () => {
    this.setState({
      isTextActive: false
    });
  }

  handleSlideDragStart = (e) => {
    const event = _getEvent(e);
    this.setState({
      isTravellerMoving: false,
      isSlideMoving: true,
      slideMoveStartX: event.pageX
    });
    this.attachDragEndListener();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      data,
      width,
      x,
      travellerWidth,
      updateId,
      startIndex,
      endIndex
    } = nextProps;
    if (data !== prevState.prevData
      || updateId !== prevState.prevUpdateId
    ) {
      return {
        prevData: data,
        prevTravellerWidth: travellerWidth,
        prevUpdateId: updateId,
        prevX: x,
        prevWidth: width,
        ...(data && data.length
          ? _createScale({ data, width, x, travellerWidth, startIndex, endIndex })
          : { scale: null, scaleValues: null })
      };
    }
    if (prevState.scale
      && (width !== prevState.prevWidth || x !== prevState.prevX || travellerWidth !== prevState.prevTravellerWidth)
    ) {
      prevState.scale
        .range([x, x + width - travellerWidth]);
      const scaleValues = prevState.scale
        .domain()
        .map(entry => prevState.scale(entry));
      return {
        prevData: data,
        prevTravellerWidth: travellerWidth,
        prevUpdateId: updateId,
        prevX: x,
        prevWidth: width,
        startX: prevState.scale(nextProps.startIndex),
        endX: prevState.scale(nextProps.endIndex),
        scaleValues
      };
    }
    return null;
  }

  componentWillUnmount() {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer);
      this.leaveTimer = null;
    }
    this.detachDragEndListener();
  }

  getIndex({ startX, endX }) {
    const {
      scaleValues
    } = this.state
    , {
      gap,
      data
    } = this.props
    , lastIndex = data.length - 1
    , min = Math.min(startX, endX)
    , max = Math.max(startX, endX)
    , minIndex = _getIndexInRange(scaleValues, min)
    , maxIndex = _getIndexInRange(scaleValues, max);
    return {
      startIndex: minIndex - (minIndex % gap),
      endIndex: maxIndex === lastIndex ? lastIndex : maxIndex - (maxIndex % gap),
    };
  }

  getTextOfTick(index) {
    const {
      data,
      tickFormatter,
      dataKey
    } = this.props
    , text = getValueByDataKey(data[index], dataKey, index);
    return _isFn(tickFormatter)
      ? tickFormatter(text, index)
      : text;
  }

  attachDragEndListener() {
    window.addEventListener('mouseup', this.handleDragEnd, true);
    window.addEventListener('touchend', this.handleDragEnd, true);
    window.addEventListener('mousemove', this.handleDrag, true);
  }

  detachDragEndListener() {
    window.removeEventListener('mouseup', this.handleDragEnd, true);
    window.removeEventListener('touchend', this.handleDragEnd, true);
    window.removeEventListener('mousemove', this.handleDrag, true);
  }

  handleSlideDrag(e) {
    const {
      slideMoveStartX,
      startX,
      endX
    } = this.state
    , {
      x,
      width,
      travellerWidth,
      startIndex,
      endIndex,
      onChange
    } = this.props;
    let delta = e.pageX - slideMoveStartX;
    if (delta > 0) {
      delta = Math.min(delta, x + width - travellerWidth - endX, x + width - travellerWidth - startX);
    } else if (delta < 0) {
      delta = Math.max(delta, x - startX, x - endX);
    }
    const newIndex = this.getIndex({
      startX: startX + delta,
      endX: endX + delta
    });
    if ((newIndex.startIndex !== startIndex || newIndex.endIndex !== endIndex) && onChange) {
      onChange(newIndex);
    }
    this.setState({
      startX: startX + delta,
      endX: endX + delta,
      slideMoveStartX: e.pageX
    });
  }

  handleTravellerDragStart(id, e) {
    const event = _getEvent(e)
    this.setState({
      isSlideMoving: false,
      isTravellerMoving: true,
      movingTravellerId: id,
      brushMoveStartX: event.pageX
    });
    this.attachDragEndListener();
  }

  handleTravellerMove(e) {
    const {
      brushMoveStartX,
      movingTravellerId,
      endX,
      startX
    } = this.state
    , prevValue = this.state[movingTravellerId]
    , {
      x,
      width,
      travellerWidth,
      onChange,
      gap,
      data
    } = this.props
    , params = {
      startX: this.state.startX,
      endX: this.state.endX
    };
    let delta = e.pageX - brushMoveStartX;
    if (delta > 0) {
      delta = Math.min(delta, x + width - travellerWidth - prevValue);
    } else if (delta < 0) {
      delta = Math.max(delta, x - prevValue);
    }
    params[movingTravellerId] = prevValue + delta;
    const newIndex = this.getIndex(params)
    , {
      startIndex,
      endIndex
    } = newIndex
    , isFullGap = () => {
        const lastIndex = data.length - 1;
        return (movingTravellerId === 'startX' && (endX > startX ? startIndex % gap === 0 : endIndex % gap === 0))
          || (endX < startX && endIndex === lastIndex)
          || (movingTravellerId === 'endX' && (endX > startX ? endIndex % gap === 0 : startIndex % gap === 0))
          || (endX > startX && endIndex === lastIndex);
    };
    this.setState({
      [movingTravellerId]: prevValue + delta,
      brushMoveStartX: e.pageX
    }, () => {
      if (onChange && isFullGap()) {
        onChange(newIndex);
      }
    });
  }

  renderBackground() {
    const {
      x,
      y,
      width,
      height,
      fill,
      stroke
    } = this.props;
    return (
      <rect stroke={stroke} fill={fill} x={x} y={y} width={width} height={height} />
    );
  }

  renderPanorama() {
    const {
      x,
      y,
      width,
      height,
      data,
      children,
      padding
    } = this.props
    , chartElement = Children.only(children);
    if (!chartElement) {
      return null;
    }
    return cloneElement(chartElement, {
      x,
      y,
      width,
      height,
      margin: padding,
      compact: true,
      data
    });
  }

  renderTravellerLayer(travellerX, id) {
    const {
      y,
      travellerWidth,
      height,
      traveller
    } = this.props
    , x = Math.max(travellerX, this.props.x)
    , travellerProps = {
        ...filterProps(this.props),
        x,
        y,
        width: travellerWidth,
        height
    };
    return (
      <Layer
        className={CL_BRUSH_TRAVELLER}
        style={S_CURSOR_COL_RESIZE}
        onMouseEnter={this.handleEnterSlideOrTraveller}
        onMouseLeave={this.handleLeaveSlideOrTraveller}
        onMouseDown={this.travellerDragStartHandlers[id]}
        onTouchStart={this.travellerDragStartHandlers[id]}
      >
        {_renderTraveller(traveller, travellerProps)}
      </Layer>
    );
  }

  renderSlide(startX, endX) {
    const {
      y,
      height,
      stroke,
      travellerWidth
    } = this.props
    , x = Math.min(startX, endX) + travellerWidth
    , width = Math.max(Math.abs(endX - startX) - travellerWidth, 0);
    return (
      <rect
         className={CL_BRUSH_SLIDE}
         style={S_CURSOR_MOVE}
         stroke="none" fill={stroke} fillOpacity={0.2}
         x={x} y={y} width={width} height={height}
         onMouseEnter={this.handleEnterSlideOrTraveller}
         onMouseLeave={this.handleLeaveSlideOrTraveller}
         onMouseDown={this.handleSlideDragStart}
         onTouchStart={this.handleSlideDragStart}
      />
    );
  }

  renderText() {
    const {
      startIndex,
      endIndex,
      y,
      height,
      travellerWidth,
      stroke
    } = this.props
    , {
      startX,
      endX
    } = this.state
    , offset = 5
    , attrs = {
       pointerEvents: 'none',
       fill: stroke
    };
    return (
      <Layer className={CL_BRUSH_TEXTS}>
        <Text textAnchor="end" verticalAnchor="middle" x={Math.min(startX, endX) - offset} y={y + height / 2} {...attrs}>
          {this.getTextOfTick(startIndex)}
        </Text>
        <Text textAnchor="start" verticalAnchor="middle" x={Math.max(startX, endX) + travellerWidth + offset} y={y + height / 2} {...attrs}>
          {this.getTextOfTick(endIndex)}
        </Text>
      </Layer>
    );
  }

  render() {
    const {
      data,
      className,
      children,
      x,
      y,
      width,
      height,
      alwaysShowText
    } = this.props
    , {
      startX,
      endX,
      isTextActive,
      isSlideMoving,
      isTravellerMoving
    } = this.state;
    if (!data
      || !data.length
      || !isNumber(x)
      || !isNumber(y)
      || !isNumber(width)
      || !isNumber(height)
      || width <= 0
      || height <= 0
    ) {
      return null;
    }
    const layerClass = classNames(CL_BRUSH, className)
    , isPanoramic = Children.count(children) === 1
    , style = { userSelect: 'none' };
    return (
      <Layer className={layerClass} onMouseLeave={this.handleLeaveWrapper} onTouchMove={this.handleTouchMove} style={style}>
        {this.renderBackground()}
        {isPanoramic && this.renderPanorama()}
        {this.renderSlide(startX, endX)}
        {this.renderTravellerLayer(startX, 'startX')}
        {this.renderTravellerLayer(endX, 'endX')}
        {(isTextActive || isSlideMoving || isTravellerMoving || alwaysShowText) && this.renderText()}
      </Layer>
    );
  }
}

Brush.displayName = 'Brush';
Brush.defaultProps = {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: '#fff',
  stroke: '#666',
  padding: { top: 1, right: 1, bottom: 1, left: 1 },
  leaveTimeOut: 1000,
  alwaysShowText: false
};
