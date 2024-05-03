import {
  cloneElement,
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
  getRefValue
} from '../../uiApi';

import crCn from '../../zhn-utils/crCn';
import ReactResizeDetector from '../../zhn-resize-detector/ResizeDetector';

import { isPercent } from '../util/DataUtils';
import { CL_RESPONSIVE_CONTAINER } from '../CL';

export const ResponsiveContainer = ({
  aspect,
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
  id,
  className,
  onResize
}) => {
  const [
    sizes,
    setSizes
  ] = useState({
    containerWidth: -1,
    containerHeight: -1
  })
  , containerRef = useRef(null);

  const getContainerSize = useCallback(
    () => {
      const _containerEl = getRefValue(containerRef);
      return _containerEl ? {
        containerWidth: _containerEl.clientWidth,
        containerHeight: _containerEl.clientHeight
      } : null;
    }, []
  );

  const updateDimensionsImmediate = useCallback(() => {
    const newSize = getContainerSize();
    if (newSize) {
      const {
        containerWidth,
        containerHeight
      } = newSize;

      if (onResize) {
        onResize(containerWidth, containerHeight);
      }

      setSizes(currentSizes => {
        const {
          containerWidth: oldWidth,
          containerHeight: oldHeight
        } = currentSizes;
        return containerWidth !== oldWidth || containerHeight !== oldHeight
          ? { containerWidth, containerHeight }
          : currentSizes;
      });
    }
  }, [getContainerSize, onResize]);

  const chartContent = useMemo(() => {
    const {
      containerWidth,
      containerHeight
    } = sizes;
    if (containerWidth < 0 || containerHeight < 0) {
      return null;
    }
    let calculatedWidth = isPercent(width)
      ? containerWidth : width;
    let calculatedHeight = isPercent(height)
      ? containerHeight : height;
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
    return cloneElement(children, {
      width: calculatedWidth,
      height: calculatedHeight
    });
  }, [aspect, children, height, maxHeight, sizes, width]);

  useEffect(() => {
      const size = getContainerSize();
      if (size) {
        setSizes(size);
      }
  }, [getContainerSize]);

  const style = {
    width,
    height,
    minWidth,
    minHeight,
    maxHeight
  };

  return (
    <ReactResizeDetector
       onResize={updateDimensionsImmediate}
       targetRef={containerRef}
       refreshMode={debounce > 0 ? 'debounce' : void 0}
       refreshRate={debounce}
    >
      <div
        {...(id != null ? { id: `${id}` } : {})}
        className={crCn(CL_RESPONSIVE_CONTAINER, className)}
        style={style}
        ref={containerRef}
      >
        {chartContent}
      </div>
   </ReactResizeDetector>
  );
};
