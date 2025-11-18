import {
  useState,
  useCallback
} from '../../uiApi';

const useLegendBox = () => {
  const [
    legendBBox,
    setLegendBBox
  ] = useState()
  , handleLegendBBoxUpdate = useCallback(legendBBox => {
     if (legendBBox) {
       setLegendBBox(legendBBox);
     }
  }, []);
  return [
    legendBBox,
    handleLegendBBoxUpdate
  ];
};

export default useLegendBox
