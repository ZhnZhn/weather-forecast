import { useState, useCallback } from '../uiApi';

const useSeriesFilter = (initialFiltered) => {
  const [filtered, setFiltered] = useState(initialFiltered)
  , hFilter = useCallback(dataKey => {
    setFiltered(prevFiltered => {
      prevFiltered[dataKey] = !prevFiltered[dataKey]
      return {...prevFiltered};
    })
  }, []);
  return [filtered, hFilter];
};

export default useSeriesFilter
