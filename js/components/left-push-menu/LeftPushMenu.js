"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _PeriodForecast = _interopRequireDefault(require("../wrapper/PeriodForecast"));

var _DayDetailPopup = _interopRequireDefault(require("./DayDetailPopup"));

var _TabPane = _interopRequireDefault(require("../zhn-atoms/TabPane"));

var _Tab = _interopRequireDefault(require("../zhn-atoms/Tab"));

var _ForecastChart = _interopRequireDefault(require("./ForecastChart"));

var _HourlyChart = _interopRequireDefault(require("./HourlyChart"));

var _UvCard = _interopRequireDefault(require("./UvCard"));

var _LeftPushMenu = _interopRequireDefault(require("./LeftPushMenu.Style"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _actions = require("../../flux/hourly/actions");

var _actions2 = require("../../flux/uv/actions");

//import React, { Component } from 'react';
var Component = _react["default"].Component; //const BG_MARK = '#646464';
//const BG_UNMARK = '#808080';

var S = {
  TABS: {
    textAlign: 'left'
  }
};

var LeftPushMenu =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(LeftPushMenu, _Component);

  function LeftPushMenu() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {};

    _this._markDay = function (currentTarget) {
      var _style = _this.props.theme.createStyle(_LeftPushMenu["default"]);

      _this.detailEl = currentTarget;
      _this.detailEl.style.backgroundColor = _style.C_BG_MARK;
    };

    _this._unmarkDay = function () {
      if (_this.detailEl) {
        var _style = _this.props.theme.createStyle(_LeftPushMenu["default"]);

        _this.detailEl.style.backgroundColor = _style.C_BG_UNMARK;
      }
    };

    _this.handleClickItem = function (item, evn) {
      evn.persist();

      _this._unmarkDay();

      _this._markDay(evn.currentTarget);

      _this.detailComp.setItem(item);
    };

    _this.handleRequestHourly = function () {
      var store = _this.props.store;
      store.dispatch((0, _actions.hourlyRequested)());
    };

    _this.handleRequestUV = function () {
      var store = _this.props.store;
      store.dispatch((0, _actions2.uvRequested)());
    };

    _this.handleCloseDetail = function () {
      _this._unmarkDay();

      _this.detailComp.close();
    };

    _this._refDetail = function (comp) {
      return _this.detailComp = comp;
    };

    return _this;
  }

  var _proto = LeftPushMenu.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        id = _this$props.id,
        store = _this$props.store,
        theme = _this$props.theme,
        STYLE = theme.createStyle(_LeftPushMenu["default"]);
    return _react["default"].createElement("div", {
      id: id,
      style: STYLE.ROOT_DIV
    }, _react["default"].createElement(_PeriodForecast["default"], {
      store: store,
      onUpdate: this.handleCloseDetail,
      onClickItem: this.handleClickItem
    }), _react["default"].createElement(_DayDetailPopup["default"], {
      ref: this._refDetail,
      onClose: this.handleCloseDetail
    }), _react["default"].createElement(_TabPane["default"], {
      key: "1",
      width: "100%",
      tabsStyle: S.TABS
    }, _react["default"].createElement(_Tab["default"], {
      title: "7 Days"
    }, _react["default"].createElement(_ForecastChart["default"], {
      store: store
    })), _react["default"].createElement(_Tab["default"], {
      title: "5 Days/3 Hours",
      onClick: this.handleRequestHourly
    }, _react["default"].createElement(_HourlyChart["default"], {
      store: store
    })), _react["default"].createElement(_Tab["default"], {
      title: "UV",
      onClick: this.handleRequestUV
    }, _react["default"].createElement(_UvCard["default"], {
      store: store
    }))));
  };

  return LeftPushMenu;
}(Component);

var _default = (0, _withTheme["default"])(LeftPushMenu);

exports["default"] = _default;
//# sourceMappingURL=LeftPushMenu.js.map