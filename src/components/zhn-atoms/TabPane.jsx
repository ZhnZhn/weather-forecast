import {
  useState,
  useCallback,
  cloneUiElement
} from '../uiApi';

const S_TABS = {
  marginTop: 5,
  marginRight: 5,
  marginBottom: 10,
  marginLeft: 24
}, S_BLOCK = {
  display: 'block',
  width: "100%",
  height: "100%"
}, S_NONE = { display: 'none'}
, S_COMPONENTS = {
  width: "100%",
  height: "100%"
};

const _isFn = fn => typeof fn === 'function';
const _isElement = el => el && _isFn(el.type);

const _reduceElements = (elements, crElement) =>
(elements||[])
  .reduce((els, el, index) => {
     if (_isElement(el)) {
       els.push(crElement(el, index))
     }
     return els;
  }, []);

const _renderTabs = (
  children,
  selectedTabIndex,
  hClickTab
) => _reduceElements(children, (tabEl, index) =>
   cloneUiElement(tabEl, {
     id: index,
     onClick: () => hClickTab(index, tabEl),
     isSelected: index === selectedTabIndex
   }, index)
 );

 const _renderComponents = (
   children,
   selectedTabIndex
 ) => _reduceElements(children, (tabEl, index) => {
   const _isSelected = (index === selectedTabIndex)
   , _divStyle = _isSelected ? S_BLOCK : S_NONE;
   return (
     <div
        key={'a'+index}
        style={_divStyle}
        role="tabpanel"
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
     >
        {cloneUiElement(tabEl.props.children, {
           isSelected: _isSelected
        })}
    </div>
   );
 });



const TabPane = ({
  width,
  height,
  children
}) => {
  const [
    selectedTabIndex,
    setSelectedTabIndex
  ] = useState(0)
  , _hClickTab = useCallback((index, tabEl) => {
    setSelectedTabIndex(index)
    const { props } = tabEl || {}
    , { onClick } = props || {};
    if (_isFn(onClick)) {
      onClick()
    }
  }, []);

  return (
    <div style={{ width, height }}>
      <div style={S_TABS}>
         {_renderTabs(children, selectedTabIndex, _hClickTab)}
      </div>
      <div style={S_COMPONENTS}>
         {_renderComponents(children, selectedTabIndex)}
      </div>
    </div>
  );
};

export default TabPane
