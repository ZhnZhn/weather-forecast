import { useCallback } from '../uiApi';

/*eslint-disable react-hooks/exhaustive-deps */
const _fUseKey = isKey => (
  fn,
  deps
) => useCallback(evt => {
  if (isKey(evt)) {
    evt.preventDefault()
    evt.stopPropagation()
    fn(evt)
  }
}, deps || []);
/*eslint-enable react-hooks/exhaustive-deps */

const _isKeyEscape = (
  evt
) => evt.keyCode === 27 || evt.key === 'Escape';

export const useKeyEscape = _fUseKey(_isKeyEscape)
