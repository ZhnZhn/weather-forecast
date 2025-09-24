import {
  useState,
  useEffect,
  getRefValue
} from '../../uiApi';

const useFontSizeByClassName = (
  refLayer,
  className
) => {
  const [
    state,
    setState
  ] = useState({
    fontSize: '',
    letterSpacing: ''
  });

  useEffect(() => {
    const htmlLayer = getRefValue(refLayer);
    if (!htmlLayer) {
      return;
    }
    const element = htmlLayer.getElementsByClassName(className)[0];
    if (element) {
      const elementComputedStyle = window.getComputedStyle(element);
      setState({
        fontSize: elementComputedStyle.fontSize,
        letterSpacing: elementComputedStyle.letterSpacing
      })
    }
  }, [refLayer, className])
  return state;
};

export default useFontSizeByClassName
