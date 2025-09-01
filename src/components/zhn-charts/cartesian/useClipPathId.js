import { isNullOrUndef } from '../../../utils/isTypeFn';
import { useMemo } from '../../uiApi';
import { uniqueId } from '../util/DataUtils';

/*eslint-disable react-hooks/exhaustive-deps */
const useClipPathId = (
  idPrefix,
  id
) => useMemo(() => isNullOrUndef(id)
  ? uniqueId(`${idPrefix}-`)
  : id,
  [id]
);
// idPrefix
/*eslint-enable react-hooks/exhaustive-deps */

export default useClipPathId
