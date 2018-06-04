'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _fnLeaflet = require('./fnLeaflet');

var _fnLeaflet2 = _interopRequireDefault(_fnLeaflet);

var _throttle = require('../../utils/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _selectors = require('../../flux/selectors');

var _actions = require('../../flux/place/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import React, { Component } from 'react';

//import PropTypes from 'prop-types';

var Component = _react2.default.Component;


var PERIOD_MS = 5000;

var S = {
  ROOT_DIV: {
    width: '100%',
    height: '650px',
    transition: 'transform .3s, width .6s'
  }
};

var LeafletMap = function (_Component) {
  _inherits(LeafletMap, _Component);

  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    store : PropTypes.object
  }
  */
  function LeafletMap(props) {
    _classCallCheck(this, LeafletMap);

    var _this = _possibleConstructorReturn(this, (LeafletMap.__proto__ || Object.getPrototypeOf(LeafletMap)).call(this, props));

    _this._handleClickMap = function (e) {
      var store = _this.props.store;
      var _e$latlng = e.latlng,
          lat = _e$latlng.lat,
          lng = _e$latlng.lng;

      store.dispatch((0, _actions.placeRequested)({ lat: lat, lot: lng }));
    };

    _this._onStore = function () {
      var _this$props = _this.props,
          store = _this$props.store,
          theme = _this$props.theme,
          state = store.getState(),
          recent = _selectors.sPlace.recent(state);

      if (recent && recent !== _this.recent || recent === 0) {
        _fnLeaflet2.default.addMarker(_selectors.sPlace.byId(state, recent), theme.themeName, _this.map);
        _this.recent = recent;
      }
    };

    _this._setLoaded = _this._setLoaded.bind(_this);
    _this.state = {
      isLoaded: false
    };
    return _this;
  }

  _createClass(LeafletMap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          id = _props.id,
          store = _props.store;

      this.unsubsribe = store.subscribe(this._onStore);
      this.map = _fnLeaflet2.default.createMap(id, this._setLoaded);
      this.map.on('dblclick', (0, _throttle2.default)(this._handleClickMap, PERIOD_MS, {
        trailing: false
      }));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubsribe();
    }
  }, {
    key: '_setLoaded',
    value: function _setLoaded() {
      this.setState({ isLoaded: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          id = _props2.id,
          rootStyle = _props2.rootStyle,
          isLoaded = this.state.isLoaded;

      return _react2.default.createElement(
        'div',
        {
          style: _extends({}, S.ROOT_DIV, rootStyle),
          id: id
        },
        !isLoaded && _react2.default.createElement(
          'span',
          null,
          'LeafletMap Loading...'
        )
      );
    }
  }]);

  return LeafletMap;
}(Component);

exports.default = (0, _withTheme2.default)(LeafletMap);
//# sourceMappingURL=LeafletMap.js.map