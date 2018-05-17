'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _selectors = require('../../flux/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';


//import { uvRecent, uvById } from '../../flux/reducer';


var Component = _react2.default.Component;


var S = {
  TIME: {
    paddingTop: '1rem',
    paddingLeft: '2.5rem',
    color: '#8bc34a',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  VALUE: {
    paddingTop: '1rem',
    paddingLeft: '2.5rem',
    fontSize: '3rem',
    fontWeight: 'bold'
  }
};

var UvCard = function (_Component) {
  _inherits(UvCard, _Component);

  function UvCard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UvCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UvCard.__proto__ || Object.getPrototypeOf(UvCard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      data: {}
    }, _this._onStore = function () {
      var store = _this.props.store,
          state = store.getState(),
          recent = _selectors.sUV.recent(state);

      if (recent !== _this.state.recent) {
        _this.setState(function (prev) {
          return { data: _selectors.sUV.byId(state, recent) };
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UvCard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$data = this.state.data,
          data = _state$data === undefined ? {} : _state$data,
          _data$time = data.time,
          time = _data$time === undefined ? '' : _data$time,
          value = data.data,
          _time = time.replace('Z', '').replace('T', ' ');

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: S.TIME },
          _time
        ),
        _react2.default.createElement(
          'div',
          { style: S.VALUE },
          value
        )
      );
    }
  }]);

  return UvCard;
}(Component);

exports.default = UvCard;
//# sourceMappingURL=UvCard.js.map