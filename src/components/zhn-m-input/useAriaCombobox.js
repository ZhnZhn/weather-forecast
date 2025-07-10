import { useId } from '../uiApi';

const useAriaCombobox = (
  isShowOptions,
  isAutocomplete
) => {
  const _controlsId = useId();
  return [
    _controlsId, {
      role: "combobox",
      "aria-autocomplete": isAutocomplete
         ? "list" : "none",
      "aria-controls": isShowOptions
         ? _controlsId : void 0,
      "aria-expanded": isShowOptions,
    }
  ];
};

export default useAriaCombobox
