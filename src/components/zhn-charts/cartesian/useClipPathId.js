import { useMemo } from '../../uiApi';

import { _isNil } from '../util/FnUtils';
import { uniqueId } from '../util/DataUtils';

/*eslint-disable react-hooks/exhaustive-deps */
const useClipPathId = (
  idPrefix,
  id
) => useMemo(() => _isNil(id)
  ? uniqueId(`${idPrefix}-`)
  : id,
  [id]
);
// idPrefix
/*eslint-enable react-hooks/exhaustive-deps */

export default useClipPathId
