import {
  isValidElement,
  cloneElement,
  createElement,
  useRef,
  useState,
  useCallback,
  useEffect
} from '../../uiApi';

import classNames from 'classnames';
import { translateStyle } from '../../zhn-animate';

import {
  _isFn,
  _isNil
} from  '../util/FnUtils';

import { DefaultTooltipContent } from './DefaultTooltipContent';
import { Global } from '../util/Global';
import { isNumber } from '../util/DataUtils';
import {
  getUniqPayload
} from './componentFn';

const CLS_PREFIX = 'recharts-tooltip-wrapper';
const EPS = 1;
const _defaultUniqBy = (
  entry
) => entry.dataKey;

const _renderContent = (
  content,
  props
) => {
  if (isValidElement(content)) {
    return cloneElement(content, props);
  }
  if (_isFn(content)) {
    return createElement(content, props);
  }
  return <DefaultTooltipContent {...props}/>;
}

const tooltipDefaultProps = {
  active: false,
  allowEscapeViewBox: { x: false, y: false },
  reverseDirection: { x: false, y: false },
  offset: 10,
  viewBox: { x: 0, y: 0, height: 0, width: 0 },
  coordinate: { x: 0, y: 0 },
  // this doesn't exist on TooltipProps
  cursorStyle: {},
  separator: ' : ',
  wrapperStyle: {},
  contentStyle: {},
  itemStyle: {},
  labelStyle: {},
  cursor: true,
  trigger: 'hover',
  isAnimationActive: !Global.isSsr,
  animationEasing: 'ease',
  animationDuration: 400,
  filterNull: true,
  useTranslate3d: false
};

export const Tooltip = (props) => {
  const [
    boxWidth,
    setBoxWidth
  ] = useState(-1)
  , [
    boxHeight,
    setBoxHeight
  ] = useState(-1)
  , [
    dismissed,
    setDismissed
  ] = useState(false)
  , [
    dismissedAtCoordinate,
    setDismissedAtCoordinate
  ] = useState({ x: 0, y: 0 })
  , wrapperNode = useRef()
  , {
    allowEscapeViewBox,
    reverseDirection,
    coordinate,
    offset,
    position,
    viewBox
  } = props
  , handleKeyDown = useCallback((event) => {
      if (event.key === 'Escape') {
        setDismissed(true);
        setDismissedAtCoordinate(prev => ({
          ...prev,
          x: coordinate.x,
          y: coordinate.y
        }));
      }
  }, [coordinate.x, coordinate.y]);

  useEffect(() => {
    const updateBBox = () => {
      if (dismissed) {
        document.removeEventListener('keydown', handleKeyDown);
        if (coordinate.x !== dismissedAtCoordinate.x || coordinate.y !== dismissedAtCoordinate.y) {
          setDismissed(false);
        }
      } else {
        document.addEventListener('keydown', handleKeyDown);
      }

      if (wrapperNode.current && wrapperNode.current.getBoundingClientRect) {
        const box = wrapperNode.current.getBoundingClientRect();
        if (Math.abs(box.width - boxWidth) > EPS || Math.abs(box.height - boxHeight) > EPS) {
          setBoxWidth(box.width);
          setBoxHeight(box.height);
        }
      } else if (boxWidth !== -1 || boxHeight !== -1) {
        setBoxWidth(-1);
        setBoxHeight(-1);
      }
    };

    updateBBox();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    boxHeight,
    boxWidth,
    coordinate.x,
    coordinate.y,
    dismissed,
    dismissedAtCoordinate.x,
    dismissedAtCoordinate.y,
    handleKeyDown
  ]);

  const getTranslate = ({
    key,
    tooltipDimension,
    viewBoxDimension
  }) => {
    if (position && isNumber(position[key])) {
      return position[key];
    }
    const negative = coordinate[key] - tooltipDimension - offset
    , positive = coordinate[key] + offset;
    if (allowEscapeViewBox?.[key]) {
      return reverseDirection[key]
        ? negative
        : positive;
    }
    if (reverseDirection?.[key]) {
      const tooltipBoundary = negative
      , viewBoxBoundary = viewBox[key];
      return tooltipBoundary < viewBoxBoundary
        ? Math.max(positive, viewBox[key])
        : Math.max(negative, viewBox[key]);
    }
    const tooltipBoundary = positive + tooltipDimension
    , viewBoxBoundary = viewBox[key] + viewBoxDimension;
    return tooltipBoundary > viewBoxBoundary
      ? Math.max(negative, viewBox[key])
      : Math.max(positive, viewBox[key]);
  };

  const {
    payload,
    payloadUniqBy,
    filterNull,
    active,
    wrapperStyle,
    useTranslate3d,
    isAnimationActive,
    animationDuration,
    animationEasing
  } = props
  , finalPayload = getUniqPayload(
      payloadUniqBy,
      filterNull && payload && payload.length
         ? payload.filter(entry => !_isNil(entry.value))
         : payload,
      _defaultUniqBy
  )
  , hasPayload = finalPayload && finalPayload.length
  , { content } = props;
  let outerStyle = {
    pointerEvents: 'none',
    visibility: !dismissed && active && hasPayload ? 'visible' : 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    ...wrapperStyle
  }
  , translateX
  , translateY;

  if (position && isNumber(position.x) && isNumber(position.y)) {
    translateX = position.x;
    translateY = position.y;
  } else if (boxWidth > 0 && boxHeight > 0 && coordinate) {
    translateX = getTranslate({
      key: 'x',
      tooltipDimension: boxWidth,
      viewBoxDimension: viewBox.width,
    });
    translateY = getTranslate({
      key: 'y',
      tooltipDimension: boxHeight,
      viewBoxDimension: viewBox.height,
    });
  } else {
    outerStyle.visibility = 'hidden';
  }
  outerStyle = {
    ...translateStyle({
      transform: useTranslate3d
        ? `translate3d(${translateX}px, ${translateY}px, 0)`
        : `translate(${translateX}px, ${translateY}px)`,
    }),
    ...outerStyle,
  };
  if (isAnimationActive && active) {
    outerStyle = {
      ...translateStyle({
        transition: `transform ${animationDuration}ms ${animationEasing}`,
      }),
      ...outerStyle,
    };
  }
  const cls = classNames(CLS_PREFIX, {
    [`${CLS_PREFIX}-right`]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x,
    [`${CLS_PREFIX}-left`]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x,
    [`${CLS_PREFIX}-bottom`]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y,
    [`${CLS_PREFIX}-top`]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y,
  });
  return (
    <div
      tabIndex={-1}
      role="dialog"
      className={cls}
      style={outerStyle}
      ref={wrapperNode}
    >
      {_renderContent(content, {
          ...props,
          payload: finalPayload
      })}
    </div>
  );
};

// needs to be set so that renderByOrder can find the correct handler function
Tooltip.displayName = 'Tooltip';
/**
 * needs to be set so that renderByOrder can access an have default values for
 * children.props when there are no props set by the consumer
 * doesn't work if using default parameters
 */
Tooltip.defaultProps = tooltipDefaultProps;
