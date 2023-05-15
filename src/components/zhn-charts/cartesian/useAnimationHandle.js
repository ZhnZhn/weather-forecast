import {
  useState,
  useCallback
} from '../../uiApi';

const FN_NOOP = () => {};

const useAnimationHandle = (
  props
) => {
  const {
    onAnimationStart=FN_NOOP,
    onAnimationEnd=FN_NOOP
  } = props
  , [
    isAnimationFinished,
    setIsAnimationFinished
  ] = useState(false)
  , handleAnimationStart = useCallback(() => {
     setIsAnimationFinished(false);
     onAnimationStart();
  }, [onAnimationStart])
  , handleAnimationEnd = useCallback(() => {
     setIsAnimationFinished(true);
     onAnimationEnd();
  }, [onAnimationEnd])
  return [
    isAnimationFinished,
    handleAnimationStart,
    handleAnimationEnd
  ];
};

export default useAnimationHandle
