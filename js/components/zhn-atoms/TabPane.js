'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps; //import React, { Component } from 'react';


var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.Component;


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

var TabPane = (_temp = _class = function (_Component) {
  _inherits(TabPane, _Component);

  function TabPane(props) {
    _classCallCheck(this, TabPane);

    var _this = _possibleConstructorReturn(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).call(this));

    _initialiseProps.call(_this);

    var components = props.children.map(function (tab, index) {
      return _react2.default.cloneElement(tab.props.children, {
        key: 'comp' + index
      });
    });
    _this.state = {
      selectedTabIndex: 0,
      components: components
    };
    return _this;
  }

  _createClass(TabPane, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          tabsStyle = _props.tabsStyle,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        { style: { width: width, height: height } },
        _react2.default.createElement(
          'ul',
          {
            className: CL,
            style: _extends({}, S.UL, tabsStyle)
          },
          this._renderTabs(children)
        ),
        _react2.default.createElement(
          'div',
          { style: S.TABS },
          this._renderComponents()
        )
      );
    }
  }, {
    key: 'getSelectedTabIndex',
    value: function getSelectedTabIndex() {
      return this.state.selectedTabIndex;
    }
  }]);

  return TabPane;
}(Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._handlerClickTab = function (index, tabEl) {
    _this2.setState({ selectedTabIndex: index });
    if (typeof tabEl.props.onClick === 'function') {
      tabEl.props.onClick();
    }
  };

  this._renderTabs = function (children) {
    var selectedTabIndex = _this2.state.selectedTabIndex;

    return children.map(function (tab, index) {
      var isSelected = index === selectedTabIndex ? true : false;
      return _react2.default.cloneElement(tab, {
        key: index,
        onClick: _this2._handlerClickTab.bind(_this2, index, tab),
        isSelected: isSelected
      });
    });
  };

  this._renderComponents = function () {
    var _state = _this2.state,
        selectedTabIndex = _state.selectedTabIndex,
        components = _state.components;

    return components.map(function (comp, index) {
      var divStyle = index === selectedTabIndex ? S.TAB_SELECTED : S.NONE;
      return _react2.default.createElement(
        'div',
        { style: divStyle, key: 'a' + index },
        comp
      );
    });
  };
}, _temp);
exports.default = TabPane;
//# sourceMappingURL=TabPane.js.map