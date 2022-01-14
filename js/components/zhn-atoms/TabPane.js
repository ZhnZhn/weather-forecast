"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _uiApi = require("../uiApi");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var S_TABS = {
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

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isElement = function _isElement(el) {
  return el && _isFn(el.type);
};

var _reduceElements = function _reduceElements(elements, crElement) {
  return (elements || []).reduce(function (els, el, index) {
    if (_isElement(el)) {
      els.push(crElement(el, index));
    }

    return els;
  }, []);
};

var _renderTabs = function _renderTabs(children, selectedTabIndex, hClickTab) {
  return _reduceElements(children, function (tabEl, index) {
    return (0, _uiApi.cloneElement)(tabEl, {
      key: index,
      id: index,
      onClick: function onClick() {
        return hClickTab(index, tabEl);
      },
      isSelected: index === selectedTabIndex
    });
  });
};

var _renderComponents = function _renderComponents(children, selectedTabIndex) {
  return _reduceElements(children, function (tabEl, index) {
    var _isSelected = index === selectedTabIndex,
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
};

var TabPane = (0, _uiApi.forwardRef)(function (_ref, ref) {
  var width = _ref.width,
      height = _ref.height,
      children = _ref.children;

  var _useState = (0, _uiApi.useState)(0),
      selectedTabIndex = _useState[0],
      setSelectedTabIndex = _useState[1],
      _hClickTab = (0, _uiApi.useCallback)(function (index, tabEl) {
    setSelectedTabIndex(index);

    var _ref2 = tabEl || {},
        props = _ref2.props,
        _ref3 = props || {},
        onClick = _ref3.onClick;

    if (_isFn(onClick)) {
      onClick();
    }
  }, []);

  (0, _uiApi.useImperativeHandle)(ref, function () {
    return {
      getSelectedTabIndex: function getSelectedTabIndex() {
        return selectedTabIndex;
      }
    };
  }, [selectedTabIndex]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      width: width,
      height: height
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_TABS,
      children: _renderTabs(children, selectedTabIndex, _hClickTab)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_COMPONENTS,
      children: _renderComponents(children, selectedTabIndex)
    })]
  });
});
/*
TabPane.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node)
}
*/

var _default = TabPane;
exports["default"] = _default;
//# sourceMappingURL=TabPane.js.map