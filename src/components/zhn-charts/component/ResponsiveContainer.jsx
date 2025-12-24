import {
  Children,
  cloneUiElement,
  useRef,
  useMemo,
  useEffect,
  getRefValue
} from '../../uiApi';

import { crCn } from '../../styleFn';
import throttle from '../../../utils/throttleFn';

import { isPercent } from '../util/DataUtils';
import { useContainerSizes } from './useContainerSizes';

const FN_NOOP = () => {}
, _getContainerDimension = (
  value,
  containerValue
) => isPercent(value)
  ? containerValue
  : value;

export const ResponsiveContainer = ({
  id,
  className,
  style,
  aspect,
  initialDimension = {
    width: -1,
    height: -1,
  },
  width = '100%',
  height = '100%',
  /*
   * default min-width to 0 if not specified - 'auto' causes issues with flexbox
   * https://github.com/recharts/recharts/issues/172
   */
  minWidth = 0,
  minHeight,
  maxHeight,

  children,
  debounce = 0,
  onResize = FN_NOOP
}) => {
  const _refContainer = useRef(null)
  , _refOnResize = useRef(onResize)
  , [
    sizes,
    setContainerSize
  ] = useContainerSizes(initialDimension)

  useEffect(() => {
    let _onResizeContainer = (entries) => {
      const {
        width: containerWidth,
        height: containerHeight
      } = entries[0].contentRect;
      setContainerSize(containerWidth, containerHeight);
      getRefValue(_refOnResize)(containerWidth, containerHeight);
    };

    if (debounce > 0) {
      _onResizeContainer = throttle(_onResizeContainer, debounce);
    }

    const observer = new ResizeObserver(_onResizeContainer)
    , containerNode = getRefValue(_refContainer)
    , {
      width: containerWidth,
      height: containerHeight
    } = containerNode.getBoundingClientRect();

    setContainerSize(containerWidth, containerHeight);
    observer.observe(containerNode);

    return () => {
      observer.disconnect();
    };
  }, [setContainerSize, debounce]);

  const chartContent = useMemo(() => {
    const {
      containerWidth,
      containerHeight
    } = sizes;

    if (containerWidth < 0 || containerHeight < 0) {
      return null;
    }

    let calculatedWidth = _getContainerDimension(
      width,
      containerWidth
    )
    , calculatedHeight = _getContainerDimension(
      height,
      containerHeight
    );

    if (aspect && aspect > 0) {
      // Preserve the desired aspect ratio
      if (calculatedWidth) {
        // Will default to using width for aspect ratio
        calculatedHeight = calculatedWidth / aspect;
      } else if (calculatedHeight) {
        // But we should also take height into consideration
        calculatedWidth = calculatedHeight * aspect;
      }

      // if maxHeight is set, overwrite if calculatedHeight is greater than maxHeight
      if (maxHeight && calculatedHeight > maxHeight) {
        calculatedHeight = maxHeight;
      }
    }

    return Children.map(children, child => {
        return cloneUiElement(child, {
          width: calculatedWidth,
          height: calculatedHeight,
          // calculate the actual size and override it.
          style: {
            width: calculatedWidth,
            height: calculatedHeight,
            ...child.props.style
          }
        });
    });
  }, [
    aspect,
    children,
    height,
    maxHeight,
    sizes,
    width
  ]);

  return (
    <div
      ref={_refContainer}
      id={id ? id : void 0}
      className={crCn("recharts-responsive-container", className)}
      style={{
        ...style,
        width,
        height,
        minWidth,
        minHeight,
        maxHeight
      }}
    >
      {chartContent}
    </div>
  );
};
