import {
  useId,
  useRef,
  useState,
  useMemo,
  KEY_ARROW_DOWN,
  KEY_ARROW_UP,
  focusRefElement,
  stopDefaultFor
} from '../uiApi';

import ArrowCell from './ArrowCell';
import OptionsPane from './OptionsPane';
import {
  FOCUS_NEXT_OPTION,
  FOCUS_PREV_OPTION,
  getItemCaption
} from './OptionFn';

const CL_SELECT = 'm-select'
, CL_CAPTION = `${CL_SELECT}__caption`
, CL_VALUE = `${CL_SELECT}__value`
, CL_DIV = `${CL_SELECT}__div`
, CL_INPUT_SVG = `${CL_SELECT}__svg`
, CL_INPUT_LINE = `${CL_SELECT}__line`
, CL_SELECT_OPTIONS = `${CL_SELECT}__options with-scroll`
, CL_ITEM = `${CL_SELECT}__item`
, DF_CAPTION = 'Item'
, DF_INIT_ITEM = {
  caption: void 0,
  value: void 0
};

const InputSelect = ({
  id,
  initItem,
  caption,
  options,
  style,
  onSelect
}) => {
  const _listboxId = useId()
  , _captionId = useId()
  , _refBtCombobox = useRef()
  , [
    item,
    setItem
  ] = useState(initItem || DF_INIT_ITEM)
  , [
    isShowTuple,
    setIsShowTuple
  ] = useState([!1])
  , [
    showOptions,
    hideOptions
  ] = useMemo(() => [
    (focusOption) => setIsShowTuple([!0, focusOption]),
    () => setIsShowTuple([!1])
  ], [])
  , [
    isShowOptions,
    focusOption
  ] = isShowTuple
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hCloseOptions = useMemo(() => () => {
    hideOptions()
    focusRefElement(_refBtCombobox)
  }, [])
  // hideOptions
  , [
    _hSelect,
    _hTabSelect,
    _hKeyDown
  ] = useMemo(() => [
    (item, evt) => {
        stopDefaultFor(evt)
        onSelect(item, id)
        _hCloseOptions()
        setItem(item)
    },
    // id, onSelect, _closeOptions
    (item) => {
        onSelect(item, id)
        setItem(item)
    },
    // id, onSelect
    (evt) => {
      if (evt.key === KEY_ARROW_DOWN) {
        stopDefaultFor(evt)
        showOptions(FOCUS_NEXT_OPTION)
      } else if (evt.key === KEY_ARROW_UP) {
        stopDefaultFor(evt)
        showOptions(FOCUS_PREV_OPTION)
      }
    }
    // showOptions
  ]
  , []);
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <button
      ref={_refBtCombobox}
      type="button"
      role="combobox"
      aria-expanded={isShowOptions}
      aria-controls={_listboxId}
      aria-labelledby={_captionId}
      className={CL_SELECT}
      style={style}
      onClick={showOptions}
      onKeyDown={_hKeyDown}
    >
      <div id={_captionId} className={CL_CAPTION}>
        {caption || DF_CAPTION}
      </div>
      <div className={CL_VALUE}>
        {getItemCaption(item)}
      </div>
      <OptionsPane
        id={_listboxId}
        isShow={isShowOptions}
        focusOption={focusOption}
        className={CL_SELECT_OPTIONS}
        item={item}
        options={options}
        clItem={CL_ITEM}
        onSelect={_hSelect}
        onTabSelect={_hTabSelect}
        onClose={_hCloseOptions}
      />
      <div aria-hidden="true" className={CL_DIV}>
        <div className={CL_INPUT_SVG}>
          <ArrowCell />
        </div>
        <div className={CL_INPUT_LINE} />
      </div>
    </button>
  );
}

export default InputSelect
