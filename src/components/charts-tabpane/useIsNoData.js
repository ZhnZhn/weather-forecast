import { useMemo } from '../uiApi';
import { hasRain, hasSnow } from './hasData';

const fUseIsData = hasProperty => data => useMemo(
  () => hasProperty(data), [data]
)
, useIsRain = fUseIsData(hasRain)
, useIsSnow = fUseIsData(hasSnow);

const useIsNoData = data => {
  const _isRain = useIsRain(data)
  , _isSnow = useIsSnow(data)
  return useMemo(() => ({
    rain: !_isRain,
    snow: !_isSnow
  }), [_isRain, _isSnow])
};

export default useIsNoData
