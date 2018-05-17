'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; //import { Children, Component } from 'react';


var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Children = _react2.default.Children,
    Component = _react2.default.Component;

var PropTypes = _propTypes2.default || window.PropTypes;

var ThemeProvider = (_temp = _class = function (_Component) {
  _inherits(ThemeProvider, _Component);

  _createClass(ThemeProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { theme: this.theme };
    }
    /*
    static propTypes = {
      theme: PropTypes.object,
      children: PropTypes.element
    }
    */

  }]);

  function ThemeProvider(props, context) {
    _classCallCheck(this, ThemeProvider);

    var _this = _possibleConstructorReturn(this, (ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).call(this, props, context));

    _this.theme = props.theme;
    return _this;
  }

  _createClass(ThemeProvider, [{
    key: 'render',
    value: function render() {
      return Children.only(this.props.children);
    }
  }]);

  return ThemeProvider;
}(Component), _class.childContextTypes = {
  theme: PropTypes.object
}, _temp);
exports.default = ThemeProvider;
//# sourceMappingURL=ThemeProvider.js.map