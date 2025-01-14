import {
  useState,
  useCallback
} from '../../uiApi';

const _round = Math.round;

export const useContainerSizes = (
  initialDimension
) => {
  const [
    sizes,
    setSizes
  ] = useState(() => ({
    containerWidth: initialDimension.width,
    containerHeight: initialDimension.height
  }))
  , setContainerSize = useCallback((newWidth, newHeight) => {
      setSizes(prevState => {
        const roundedWidth = _round(newWidth)
        , roundedHeight = _round(newHeight);

        return prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight
          ? prevState
          : {
              containerWidth: roundedWidth,
              containerHeight: roundedHeight
            };
      });
  }, []);
  return [
    sizes,
    setContainerSize
  ];
}
