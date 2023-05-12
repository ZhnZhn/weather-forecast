import setRafTimeout from './setRafTimeout';

const _isArr = Array.isArray

export default function createAnimateManager() {
  let currStyle = {}
  , handleChange = () => null
  , shouldStop = false;

  const setStyle = (_style) => {
    if (shouldStop) {
      return;
    }

    if (_isArr(_style)) {
      if (!_style.length) {
        return;
      }

      const styles = _style
      , [curr, ...restStyles] = styles;

      if (typeof curr === 'number') {
        setRafTimeout(setStyle.bind(null, restStyles), curr);
        return;
      }

      setStyle(curr);
      setRafTimeout(setStyle.bind(null, restStyles));
      return;
    }

    if (typeof _style === 'object') {
      currStyle = _style;
      handleChange(currStyle);
    }

    if (typeof _style === 'function') {
      _style();
    }
  };

  return {
    stop: () => {
      shouldStop = true;
    },
    start: (style) => {
      shouldStop = false;
      setStyle(style);
    },
    subscribe: (_handleChange) => {
      handleChange = _handleChange;

      return () => {
        handleChange = () => null;
      };
    }
  };
}
