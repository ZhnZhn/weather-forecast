import {
  useState,
  useCallback
} from '../uiApi';
import useBool from '../hooks/useBool';

import ArrowCell from './ArrowCell';
import OptionsPane from './OptionsPane';

const CL_SELECT = 'm-select'
, CL_LABEL = `${CL_SELECT}__label`
, CL_DIV = `${CL_SELECT}__div`
, CL_DIV_VALUE = `${CL_SELECT}__div__value`
, CL_DIV_BT = `${CL_SELECT}__div__bt`
, CL_INPUT_LINE = `${CL_SELECT}__line`
, CL_ITEM = `${CL_SELECT}__item`
, DF_INIT_ITEM = {
  caption: '',
  value: ''
};

const InputSelect = ({
  caption,
  options,
  style,
  selectedItem,
  initItem=DF_INIT_ITEM,
  onSelect
}) => {
  const [
    isShow,
    _hOpen,
    _hClose
  ] = useBool(!1)
  , [
    item,
    setItem
  ] = useState(initItem)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hSelect = useCallback((item, evt) => {
      evt.stopPropagation()
      onSelect(item)
      _hClose()
      setItem(item)
  }, [])
  // _handleClose, onSelect
  /*eslint-enable react-hooks/exhaustive-deps */
  , _item = selectedItem || item;

  return (
    <div
      className={CL_SELECT}
      style={style}
      onClick={_hOpen}
    >
      <OptionsPane
         isShow={isShow}
         item={_item}
         options={options}
         clItem={CL_ITEM}
         onSelect={_hSelect}
         onClose={_hClose}
       />
      <label className={CL_LABEL}>
        {caption}
      </label>
      <div className={CL_DIV}>
        <div className={CL_DIV_VALUE}>
           {_item.caption}
        </div>
        <button
          type="button"
          className={CL_DIV_BT}
          tabIndex="0"
        >
          <div>
            <ArrowCell />
          </div>
        </button>
        <div className={CL_INPUT_LINE} />
      </div>
    </div>
  );
};

export default InputSelect
