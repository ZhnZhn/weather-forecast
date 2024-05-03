"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const S_TABS = {
    marginTop: 5,
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 24
  },
  S_BLOCK = {
    display: 'block',
    width: "100%",
    height: "100%"
  },
  S_NONE = {
    display: 'none'
  },
  S_COMPONENTS = {
    width: "100%",
    height: "100%"
  };
const _isFn = fn => typeof fn === 'function';
const _isElement = el => el && _isFn(el.type);
const _reduceElements = (elements, crElement) => (elements || []).reduce((els, el, index) => {
  if (_isElement(el)) {
    els.push(crElement(el, index));
  }
  return els;
}, []);
const _renderTabs = (children, selectedTabIndex, hClickTab) => _reduceElements(children, (tabEl, index) => (0, _uiApi.cloneElement)(tabEl, {
  key: index,
  id: index,
  onClick: () => hClickTab(index, tabEl),
  isSelected: index === selectedTabIndex
}));
const _renderComponents = (children, selectedTabIndex) => _reduceElements(children, (tabEl, index) => {
  const _isSelected = index === selectedTabIndex,
    _divStyle = _isSelected ? S_BLOCK : S_NONE;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _divStyle,
    role: "tabpanel",
    id: "tabpanel-" + index,
    "aria-labelledby": "tab-" + index,
    children: (0, _uiApi.cloneElement)(tabEl.props.children, {
      isSelected: _isSelected
    })
  }, 'a' + index);
});
const TabPane = _ref => {
  let {
    width,
    height,
    children
  } = _ref;
  const [selectedTabIndex, setSelectedTabIndex] = (0, _uiApi.useState)(0),
    _hClickTab = (0, _uiApi.useCallback)((index, tabEl) => {
      setSelectedTabIndex(index);
      const {
          props
        } = tabEl || {},
        {
          onClick
        } = props || {};
      if (_isFn(onClick)) {
        onClick();
      }
    }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      width,
      height
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_TABS,
      children: _renderTabs(children, selectedTabIndex, _hClickTab)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_COMPONENTS,
      children: _renderComponents(children, selectedTabIndex)
    })]
  });
};

/*
TabPane.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node)
}
*/
var _default = exports.default = TabPane;
//# sourceMappingURL=TabPane.js.map