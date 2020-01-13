"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

//import React, { Component } from 'react';
var Component = _react["default"].Component;
var CL = "tabpane__tabs";
var S = {
  UL: {
    listStyle: 'outside none none',
    marginTop: '5px',
    marginLeft: '10px',
    marginRight: '5px',
    marginBottom: '5px',
    textAlign: 'center'
  },
  TABS: {
    width: "100%",
    height: "100%"
  },
  TAB_SELECTED: {
    display: 'block',
    width: "100%",
    height: "100%"
  },
  NONE: {
    display: 'none'
  }
};

var TabPane =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(TabPane, _Component);

  function TabPane(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._handlerClickTab = function (index, tabEl) {
      _this.setState({
        selectedTabIndex: index
      });

      if (typeof tabEl.props.onClick === 'function') {
        tabEl.props.onClick();
      }
    };

    _this._renderTabs = function (children) {
      var selectedTabIndex = _this.state.selectedTabIndex;
      return children.map(function (tab, index) {
        var isSelected = index === selectedTabIndex ? true : false;
        return _react["default"].cloneElement(tab, {
          key: index,
          onClick: _this._handlerClickTab.bind((0, _assertThisInitialized2["default"])(_this), index, tab),
          isSelected: isSelected
        });
      });
    };

    _this._renderComponents = function () {
      var _this$state = _this.state,
          selectedTabIndex = _this$state.selectedTabIndex,
          components = _this$state.components;
      return components.map(function (comp, index) {
        var divStyle = index === selectedTabIndex ? S.TAB_SELECTED : S.NONE;
        return _react["default"].createElement("div", {
          style: divStyle,
          key: 'a' + index
        }, comp);
      });
    };

    var _components = props.children.map(function (tab, index) {
      return _react["default"].cloneElement(tab.props.children, {
        key: 'comp' + index
      });
    });

    _this.state = {
      selectedTabIndex: 0,
      components: _components
    };
    return _this;
  }

  var _proto = TabPane.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        width = _this$props.width,
        height = _this$props.height,
        tabsStyle = _this$props.tabsStyle,
        children = _this$props.children;
    return _react["default"].createElement("div", {
      style: {
        width: width,
        height: height
      }
    }, _react["default"].createElement("ul", {
      className: CL,
      style: (0, _extends2["default"])({}, S.UL, {}, tabsStyle)
    }, this._renderTabs(children)), _react["default"].createElement("div", {
      style: S.TABS
    }, this._renderComponents()));
  };

  _proto.getSelectedTabIndex = function getSelectedTabIndex() {
    return this.state.selectedTabIndex;
  };

  return TabPane;
}(Component);

var _default = TabPane;
exports["default"] = _default;
//# sourceMappingURL=TabPane.js.map