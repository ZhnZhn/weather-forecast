"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

//import React, { Component } from 'react';
//import PropTypes from 'prop-types';
var Component = _react["default"].Component;
var STYLE = {
  ROOT_DIV: {
    zIndex: 500,
    position: 'absolute',
    top: '70px',
    left: '10px',
    width: '99%'
  }
};

var getObjToFirst = function getObjToFirst(arr, keyValue) {
  var index;

  for (var i = 0, max = arr.length; i < max; i++) {
    if (arr[i].key === keyValue) {
      index = i;
      break;
    }
  }

  return [].concat(arr.slice(0, index), arr.slice(index + 1), [arr[index]]);
};

var ViewContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ViewContainer, _Component);

  function ViewContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this._activeDialogs = [];
    _this.state = {
      dialog: {},
      compDialogs: []
    };

    _this._checkActiveDialogs = function (dialogType) {
      _this._activeDialogs.push(dialogType);

      if (_this._activeDialogs.length > _this.props.maxDialog) {
        _this.state.dialog[_this._activeDialogs[0]] = false;
        _this._activeDialogs = _this._activeDialogs.slice(1);
      }
    };

    _this.filterActiveDialogs = function (dialogType) {
      _this._activeDialogs = _this._activeDialogs.filter(function (value) {
        return value !== dialogType;
      });
    };

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          initAction = _this$props.initAction,
          showAction = _this$props.showAction;

      if (actionType === showAction) {
        if (!_this.state.dialog[data]) {
          _this.state.dialog[data] = true;

          _this._checkActiveDialogs(data);
        }

        _this.state.compDialogs = getObjToFirst(_this.state.compDialogs, data);

        _this.setState(_this.state);
      } else if (actionType === initAction) {
        _this.state.dialog[data.dialogType] = true;

        _this.state.compDialogs.push(data.dialogComp);

        _this._checkActiveDialogs(data.dialogType);

        _this.setState(_this.state);
      }
    };

    _this._handlerToggleDialog = function (dialogType) {
      var dialog = _this.state.dialog;
      dialog[dialogType] = !dialog[dialogType];

      _this.setState(_this.state);

      if (!dialog[dialogType]) {
        _this.filterActiveDialogs(dialogType);

        document.getElementsByTagName('html')[0].style.cursor = '';
      }
    };

    _this._renderDialogs = function () {
      var _this$state = _this.state,
          dialog = _this$state.dialog,
          compDialogs = _this$state.compDialogs;
      return compDialogs.map(function (compDialog, index) {
        return _react["default"].cloneElement(compDialog, {
          key: compDialog.key,
          isShow: dialog[compDialog.key],
          onClose: _this._handlerToggleDialog.bind((0, _assertThisInitialized2["default"])(_this), compDialog.key)
        });
      });
    };

    return _this;
  }

  var _proto = ViewContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var store = this.props.store;
    this.unsubscribe = store.subscribe(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    return _react["default"].createElement("div", {
      style: STYLE.ROOT_DIV
    }, this._renderDialogs());
  };

  return ViewContainer;
}(Component);

var _default = ViewContainer;
exports["default"] = _default;
//# sourceMappingURL=ViewContainer.js.map