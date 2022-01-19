import { useState, useCallback } from '../uiApi';
import useBool from '../hooks/useBool';

import ArrowCell from './ArrowCell';
import OptionsPane from './OptionsPane';

const CL_SELECT = 'm-select'
, CL_LABEL = 'm-select__label'
, CL_DIV = 'm-select__div'
, CL_DIV_VALUE = 'm-select__div__value'
, CL_DIV_BT = 'm-select__div__bt'
, CL_INPUT_LINE = 'm-select__line'
, CL_ITEM = 'm-select__item'
, DF_INIT_ITEM = {
  caption: '',
  value: ''
}
, DF_TS = {};


const InputSelect = ({
  caption,
  options,
  styleConfig:TS=DF_TS,
  selectedItem,
  initItem=DF_INIT_ITEM,
  onSelect
}) => {
  const [isShow, _handleOpen, _handleClose] = useBool(false)
  , [item, setItem] = useState(initItem)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _handleSelect = useCallback((item, event) => {
      event.stopPropagation()
      onSelect(item)
      _handleClose()
      setItem(item)
  }, [])
  // _handleClose, onSelect
  /*eslint-enable react-hooks/exhaustive-deps */
  , _item = selectedItem || item;

  return (
    <div
      className={CL_SELECT}
      style={TS.ROOT}
      onClick={_handleOpen}
    >
      <OptionsPane
         style={TS.MODAL_PANE}
         isShow={isShow}
         item={_item}
         options={options}
         clItem={TS.CL_ITEM || CL_ITEM}
         onSelect={_handleSelect}
         onClose={_handleClose}
       />
      <label className={CL_LABEL}>
        {caption}
      </label>
      <div className={CL_DIV}>
        <div className={CL_DIV_VALUE}>
           {_item.caption}
        </div>
        <button className={CL_DIV_BT} tabIndex="0">
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
