"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _fnLeaflet = require("./fnLeaflet");
var _throttleFn = _interopRequireDefault(require("../../utils/throttleFn"));
var _handlers = require("../../flux/handlers");
var _selectors = require("../../flux/selectors");
var _ErrMsg = _interopRequireDefault(require("../zhn/ErrMsg"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types';

const PERIOD_MS = 5000;
const S_DIV = {
    width: '100%',
    height: 650,
    transition: 'transform .3s, width .6s'
  },
  S_ERR_MSG = {
    marginTop: 8,
    marginLeft: 8
  };
const MAP_STATUS_LOADING = 'a',
  MAP_STATUS_LOADED = 'b',
  MAP_STATUS_FAILED = 'c';
const LeafletMap = _ref => {
  let {
    id,
    style,
    themeName
  } = _ref;
  const _refMap = (0, _uiApi.useRef)(),
    _refThemeName = (0, _uiApi.useRef)(themeName),
    [mapStatus, setMapStatus] = (0, _uiApi.useState)(MAP_STATUS_LOADING),
    forecast = (0, _uiApi.useSelector)(_selectors.sPlace.forecast);
  _refThemeName.current = themeName;

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    const _map = (0, _fnLeaflet.createMap)(id, () => setMapStatus(MAP_STATUS_LOADED));
    if (_map) {
      _refMap.current = _map;
      _refMap.current.on('dblclick', (0, _throttleFn.default)(e => (0, _handlers.requestPlace)(e.latlng), PERIOD_MS));
    } else {
      setMapStatus(MAP_STATUS_FAILED);
    }
  }, []);
  // id
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(() => {
    if (forecast) {
      (0, _fnLeaflet.addMarker)(forecast, _refThemeName.current, _refMap.current);
    }
  }, [forecast]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      ...S_DIV,
      ...style
    },
    id: id,
    children: mapStatus === MAP_STATUS_FAILED && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrMsg.default, {
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
var _default = exports.default = LeafletMap;
//# sourceMappingURL=LeafletMap.js.map