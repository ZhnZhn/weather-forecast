import { useState, useCallback } from '../uiApi';

const useToggle = (initialValue) => {
 const [is, setIs] = useState(() => !!initialValue);
 return [
   is,
   useCallback(() => setIs(is => !is), [])
 ];
};

export default useToggle
