import {
  useRef,
  getRefValue,
  setRefValue
} from '../../uiApi';
import { uniqueId } from './DataUtils';

const useAnimationId = (
  input,
  prefix = 'animation-'
) => {
  const _refAnimationId = useRef(null);
  if (getRefValue(_refAnimationId) === null) {
    setRefValue(_refAnimationId, uniqueId(prefix))
  }

  const _refPrevProps = useRef(input);

  if (getRefValue(_refPrevProps) !== input) {
    setRefValue(_refAnimationId, uniqueId(prefix));
    setRefValue(_refPrevProps, input);
  }

  return getRefValue(_refAnimationId);
}

export default useAnimationId
