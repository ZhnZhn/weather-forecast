"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _fnLeaflet = _interopRequireDefault(require("./fnLeaflet"));

var _throttle = _interopRequireDefault(require("../../utils/throttle"));

var _selectors = require("../../flux/selectors");

var _actions = require("../../flux/place/actions");

//import React, { Component } from 'react';
//import PropTypes from 'prop-types';
var Component = _react["default"].Component;
var PERIOD_MS = 5000;
var S = {
  ROOT_DIV: {
    width: '100%',
    height: '650px',
    transition: 'transform .3s, width .6s'
  }
};

var LeafletMap =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(LeafletMap, _Component);

  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    store : PropTypes.object
  }
  */
  function LeafletMap(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._handleClickMap = function (e) {
      var store = _this.props.store;
      var _e$latlng = e.latlng,
          lat = _e$latlng.lat,
          lng = _e$latlng.lng;
      store.dispatch((0, _actions.placeRequested)({
        lat: lat,
        lot: lng
      }));
    };

    _this._onStore = function () {
      var _this$props = _this.props,
          store = _this$props.store,
          theme = _this$props.theme,
          state = store.getState(),
          recent = _selectors.sPlace.recent(state);

      if (recent || recent === 0) {
        _fnLeaflet["default"].addMarker(_selectors.sPlace.byId(state, recent), theme.themeName, _this.map); //this.recent = recent;

      }
    };

    _this._setLoaded = _this._setLoaded.bind((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      isLoaded: false
    };
    return _this;
  }

  var _proto = LeafletMap.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props2 = this.props,
        id = _this$props2.id,
        store = _this$props2.store;
    this.unsubsribe = store.subscribe(this._onStore);
    this.map = _fnLeaflet["default"].createMap(id, this._setLoaded);
    this.map.on('dblclick', (0, _throttle["default"])(this._handleClickMap, PERIOD_MS, {
      trailing: false
    }));
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubsribe();
  };

  _proto._setLoaded = function _setLoaded() {
    this.setState({
      isLoaded: true
    });
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        id = _this$props3.id,
        rootStyle = _this$props3.rootStyle,
        isLoaded = this.state.isLoaded;
    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.ROOT_DIV, {}, rootStyle),
      id: id
    }, !isLoaded && _react["default"].createElement("span", null, "LeafletMap Loading..."));
  };

  return LeafletMap;
}(Component);

var _default = (0, _withTheme["default"])(LeafletMap);

exports["default"] = _default;
//# sourceMappingURL=LeafletMap.js.map