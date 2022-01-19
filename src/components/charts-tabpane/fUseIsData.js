import { useMemo } from '../uiApi';

const fUseIsData = hasProperty => data => useMemo(
  () => hasProperty(data), [data]
);

export default fUseIsData
