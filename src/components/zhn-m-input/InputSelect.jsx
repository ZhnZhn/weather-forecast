import {
  KEY_ARROW_DOWN,
  useState,
  useCallback
} from '../uiApi';

import useBool from '../hooks/useBool';
import useAriaCombobox from './useAriaCombobox';

import { getItemCaption } from './OptionFn';

import ArrowCell from './ArrowCell';
import OptionsPane from './OptionsPane';

const CL_SELECT = 'm-select'
, CL_LABEL = `${CL_SELECT}__label`
, CL_DIV = `${CL_SELECT}__div`
, CL_DIV_VALUE = `${CL_SELECT}__div__value`
, CL_DIV_BT = `${CL_SELECT}__div__bt`
, CL_INPUT_LINE = `${CL_SELECT}__line`
, CL_SELECT_OPTIONS = `${CL_SELECT}__options`
, CL_ITEM = `${CL_SELECT}__item`
, DF_INIT_ITEM = {
  caption: '',
  value: ''
};

const InputSelect = ({
  caption,
  ariaLabel,
  options,
  style,
  selectedItem,
  initItem=DF_INIT_ITEM,
  onSelect
}) => {
  const [
    item,
    setItem
  ] = useState(initItem)
  , [
    isShowOptions,
    _hOpenOptions,
    _hCloseOptions
  ] = useBool(!1)
  , _hKeyDown = (evt) => {
      if (evt.key === KEY_ARROW_DOWN) {
        _hOpenOptions()
      }
    }
  , [
    _optionPaneId,
    _ariaComboboxProps
  ] = useAriaCombobox(isShowOptions)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hSelect = useCallback((item, evt) => {
      evt.stopPropagation()
      onSelect(item)
      _hCloseOptions()
      setItem(item)
  }, [])
  // _handleClose, onSelect
  /*eslint-enable react-hooks/exhaustive-deps */
  , _item = selectedItem || item;

  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return (
    <div
      {..._ariaComboboxProps}
      tabIndex="-1"
      className={CL_SELECT}
      style={style}
      onClick={_hOpenOptions}
      onKeyDown={_hKeyDown}
    >
    {/*eslint-enable jsx-a11y/no-static-element-interactions*/}
      <OptionsPane
         id={_optionPaneId}
         ariaLabel={ariaLabel}
         isShow={isShowOptions}
         className={CL_SELECT_OPTIONS}
         item={_item}
         options={options}
         clItem={CL_ITEM}
         onSelect={_hSelect}
         onClose={_hCloseOptions}
       />
      <label className={CL_LABEL}>
        {caption}
      </label>
      <div className={CL_DIV}>
        <div className={CL_DIV_VALUE}>
           {getItemCaption(_item)}
        </div>
        <button
          type="button"
          className={CL_DIV_BT}
        >
          <ArrowCell />
        </button>
        <div className={CL_INPUT_LINE} />
      </div>
    </div>
  );
};

export default InputSelect
