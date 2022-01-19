import { useRef, useEffect } from '../uiApi';
import Interact from '../../utils/Interact';

const useDragable = () => {
  const ref = useRef()
  useEffect(() => {
    Interact.makeDragable(ref.current)
  }, [])
  return ref;
};

export default useDragable
