import { crAriaListboxProps } from './a11yListboxFn';

import ModalPane from '../zhn-moleculs/ModalPane';
import ShowHide from '../zhn-atoms/ShowHide';

const S_PANE = {
  position: 'absolute',
  top: 12,
  zIndex: 20,
  width: '100%',
  padding: '12px 0',
  backgroundColor: 'rgb(77, 77, 77)',
  borderRadius: 2,
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 2px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px'
}
, S_ITEM = { color: 'greenyellow' };

const _renderOptions = (options, currentItem, clItem, onSelect, isShow) => {
  return options.map((item, index) => {
    const _style = (item.value === currentItem.value)
             ? S_ITEM
             : void 0;
    return (
      <div
        key={index}
        style={_style}
        className={clItem}
        onClick={onSelect.bind(null, item)}
      >
        {item.caption}
      </div>
    );
  });
};

const OptionsPane = ({
  id,
  ariaLabel,
  isShow,
  options,
  item,
  style,
  clItem,
  onSelect,
  onClose
}) => (
  <ModalPane
     style={style}
     isShow={isShow}
     onClose={onClose}
  >
    <ShowHide
       {...crAriaListboxProps(id, ariaLabel)}
       isShow={isShow}
       style={{...S_PANE, ...style}}
    >
      {_renderOptions(options, item, clItem, onSelect, isShow)}
    </ShowHide>
  </ModalPane>
);

export default OptionsPane
