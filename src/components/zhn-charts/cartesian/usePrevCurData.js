import {
  useState,
  useEffect
} from '../../uiApi';

import useAnimationId from '../util/useAnimationId';

const usePrevCurData = (
  data
) => {
  const animationId = useAnimationId(data)
  const [
    curData,
    setCurData
  ] = useState([])
  , [
    prevData,
    setPrevData
  ] = useState([]);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setCurData(data)
    setPrevData(curData)
  }, [animationId])
  //curData, data
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    setCurData(data)
  }, [data])

  return [
    prevData,
    curData,
    animationId
  ];
};

export default usePrevCurData
