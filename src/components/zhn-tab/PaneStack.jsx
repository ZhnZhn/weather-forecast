import { cloneUiElement } from '../uiApi';
import { crShowHideStyle } from '../styleFn';

import ItemStack from '../zhn/ItemStack';
import {
  CL_PANES,
  crTabId,
  crTabPanelId
} from './tabPaneFn';

const _crItemPane = (
  tab,
  index,
  { id, isShow, selectedTabIndex }
) => {
  const isSelected = index === selectedTabIndex;
  return (
    <div
      key={index}
      style={crShowHideStyle(isSelected)}
      role="tabpanel"
      id={crTabPanelId(id, index)}
      aria-labelledby={crTabId(id, index)}
    >
      {cloneUiElement(tab.props.children, {
         isShow,
         isSelected,
         isVisible: isShow && isSelected
      })}
    </div>
  );
};

const PaneStack = ({
  id,
  style,
  isShow,
  selectedTabIndex,
  children
}) => (
   <div className={CL_PANES}>
     <ItemStack
       items={children}
       crItem={_crItemPane}
       id={id}
       isShow={isShow}
       selectedTabIndex={selectedTabIndex}
     />
   </div>
);

export default PaneStack
