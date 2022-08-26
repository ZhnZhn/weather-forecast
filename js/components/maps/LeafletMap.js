"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _uiApi = require("../uiApi");

var _reactRedux = require("react-redux");

var _fnLeaflet = require("./fnLeaflet");

var _throttle = _interopRequireDefault(require("../../utils/throttle"));

var _handlers = _interopRequireDefault(require("../../flux/handlers"));

var _selectors = require("../../flux/selectors");

var _ErrMsg = _interopRequireDefault(require("../zhn-atoms/ErrMsg"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types';
var requestPlace = _handlers["default"].requestPlace;
var PERIOD_MS = 5000;
var S_DIV = {
  width: '100%',
  height: 650,
  transition: 'transform .3s, width .6s'
},
    S_ERR_MSG = {
  marginTop: 8,
  marginLeft: 8
};
var MAP_STATUS_LOADING = 'a',
    MAP_STATUS_LOADED = 'b',
    MAP_STATUS_FAILED = 'c';

var LeafletMap = function LeafletMap(_ref) {
  var id = _ref.id,
      style = _ref.style,
      themeName = _ref.themeName;

  var _refMap = (0, _uiApi.useRef)(),
      _refThemeName = (0, _uiApi.useRef)(themeName),
      _useState = (0, _uiApi.useState)(MAP_STATUS_LOADING),
      mapStatus = _useState[0],
      setMapStatus = _useState[1],
      forecast = (0, _reactRedux.useSelector)(_selectors.sPlace.forecast);

  _refThemeName.current = themeName;
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(function () {
    var _map = (0, _fnLeaflet.createMap)(id, function () {
      return setMapStatus(MAP_STATUS_LOADED);
    });

    if (_map) {
      _refMap.current = _map;

      _refMap.current.on('dblclick', (0, _throttle["default"])(function (e) {
        return requestPlace(e.latlng);
      }, PERIOD_MS, {
        trailing: false
      }));
    } else {
      setMapStatus(MAP_STATUS_FAILED);
    }
  }, []); // id

  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(function () {
    if (forecast) {
      (0, _fnLeaflet.addMarker)(forecast, _refThemeName.current, _refMap.current);
    }
  }, [forecast]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: (0, _extends2["default"])({}, S_DIV, style),
    id: id,
    children: mapStatus === MAP_STATUS_FAILED && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrMsg["default"], {
      style: S_ERR_MSG,
      msg: "LeafletMap Loading Has Failed."
    })
  });
};
/*
LeafletMap.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  themeName: PropTypes.string
}
*/


var _default = LeafletMap;
exports["default"] = _default;
//# sourceMappingURL=LeafletMap.js.map