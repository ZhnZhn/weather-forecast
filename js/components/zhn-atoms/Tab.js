'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


var Component = _react2.default.Component;


var S = {
  LI2: {
    display: 'inline-block',
    color: '#9E9E9E',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '6px',
    paddingBottom: '6px',
    fontWeight: 'bold',
    borderBottom: '3px solid #9E9E9E',
    cursor: 'pointer'
  },
  LI: {
    /*float : 'left',*/
    display: 'inline-block',

    backgroundColor: '#232F3B',

    color: 'rgba(164, 135, 212, 1)',
    /*color : 'gray',*/
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '6px',
    paddingBottom: '6px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    cursor: 'pointer',

    fontWeight: 'bold',
    //border: '2px solid rgb(44, 40, 40)',
    border: '2px solid gray',
    borderBottom: 'none'
    //borderTop : 'none'
  },
  SELECTED: {
    borderColor: 'rgba(164, 135, 212, 1)',
    color: 'rgba(164, 135, 212, 1)'
  },
  SELECTED2: {
    color: '#434348',
    borderBottom: '3px solid #2F7ED8'
    //borderBottom : '3px solid green'
  }

  //const Tab = (props) => {
};
var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          isSelected = _props.isSelected,
          onClick = _props.onClick;

      var _selectedStyle = isSelected ? S.SELECTED2 : null;
      return _react2.default.createElement(
        'li',
        {
          style: Object.assign({}, S.LI2, _selectedStyle),
          onClick: onClick
          //onClick={_hClick.bind(null, props)}
          //onClick={() => {console.log('click');}}
        },
        _react2.default.createElement(
          'span',
          null,
          title
        )
      );
    }
  }]);

  return Tab;
}(Component);

exports.default = Tab;
//# sourceMappingURL=Tab.js.map