"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _reactRedux = require("react-redux");

var _fnLeaflet = _interopRequireDefault(require("./fnLeaflet"));

var _throttle = _interopRequireDefault(require("../../utils/throttle"));

var _handlers = _interopRequireDefault(require("../../flux/handlers"));

var _selectors = require("../../flux/selectors");

var _ErrMsg = _interopRequireDefault(require("../zhn-atoms/ErrMsg"));

//import PropTypes from 'prop-types';
var useState = _react["default"].useState,
    useRef = _react["default"].useRef,
    useEffect = _react["default"].useEffect,
    requestPlace = _handlers["default"].requestPlace;
var PERIOD_MS = 5000;
var S = {
  DIV: {
    width: '100%',
    height: 650,
    transition: 'transform .3s, width .6s'
  },
  ERR_MSG: {
    marginTop: 8,
    marginLeft: 8
  }
};
var MAP_STATUS = {
  LOADING: 'a',
  LOADED: 'b',
  FAILED: 'c'
};

var LeafletMap = function LeafletMap(_ref) {
  var id = _ref.id,
      style = _ref.style,
      themeName = _ref.themeName;

  var _refMap = useRef(),
      _refThemeName = useRef(themeName),
      _useState = useState(MAP_STATUS.LOADING),
      mapStatus = _useState[0],
      setMapStatus = _useState[1],
      forecast = (0, _reactRedux.useSelector)(_selectors.sPlace.forecast);

  _refThemeName.current = themeName;
  /*eslint-disable react-hooks/exhaustive-deps */

  useEffect(function () {
    var _map = _fnLeaflet["default"].createMap(id, function () {
      return setMapStatus(MAP_STATUS.LOADED);
    });

    if (_map) {
      _refMap.current = _map;

      _refMap.current.on('dblclick', (0, _throttle["default"])(function (e) {
        return requestPlace(e.latlng);
      }, PERIOD_MS, {
        trailing: false
      }));
    } else {
      setMapStatus(MAP_STATUS.FAILED);
    }
  }, []); // id

  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(function () {
    if (forecast) {
      _fnLeaflet["default"].addMarker(forecast, _refThemeName.current, _refMap.current);
    }
  }, [forecast]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.DIV, style),
    id: id
  }, mapStatus === MAP_STATUS.FAILED && /*#__PURE__*/_react["default"].createElement(_ErrMsg["default"], {
    style: S.ERR_MSG,
    msg: "LeafletMap Loading Has Failed."
  }));
};
/*
LeafletMap.propTypes = {
  style: PropTypes.object,
  id: PropTypes.string,
  themeName: PropTypes.string
}
*/


var _default = LeafletMap;
exports["default"] = _default;
//# sourceMappingURL=LeafletMap.js.map