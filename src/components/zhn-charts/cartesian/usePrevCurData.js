import {
  useState,
  useEffect
} from '../../uApi';

const usePrevCurData = (
  data,
  animationId
) => {
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
    curData
  ];
};

export default usePrevCurData
