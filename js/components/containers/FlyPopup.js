"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("../_react"));

var _reactRedux = require("react-redux");

var _Interact = _interopRequireDefault(require("../../utils/Interact"));

var _SvgClose = _interopRequireDefault(require("../zhn-atoms/SvgClose"));

var _actions = require("../../flux/layout/actions");

var useRef = _react["default"].useRef,
    useCallback = _react["default"].useCallback,
    useEffect = _react["default"].useEffect;
var CLASS_SHOW = 'show-popup';
var S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: 16,
    right: 6
  }
};

var FlyPopup = function FlyPopup(_ref) {
  var style = _ref.style,
      storeKey = _ref.storeKey,
      children = _ref.children;

  var _refPopup = useRef(),
      isShow = (0, _reactRedux.useSelector)(function (state) {
    return state.layout[storeKey];
  }),
      dispatch = (0, _reactRedux.useDispatch)(),
      _hClose = useCallback(function () {
    dispatch((0, _actions.toggleLayout)(storeKey));
  }, [dispatch, storeKey]);

  useEffect(function () {
    _Interact["default"].makeDragable(_refPopup.current);
  }, []);

  var _styleShow = isShow ? S.BLOCK : S.NONE,
      _classShow = isShow ? CLASS_SHOW : void 0;

  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: _refPopup,
    className: _classShow,
    style: (0, _extends2["default"])({}, style, _styleShow)
  }, /*#__PURE__*/_react["default"].createElement(_SvgClose["default"], {
    style: S.SVG_CLOSE,
    onClose: _hClose
  }), children);
};
/*
FlyPopup.propTypes = {
   style: PropTypes.object,
   storeKey: PropTypes.string
}
*/


var _default = FlyPopup;
exports["default"] = _default;
//# sourceMappingURL=FlyPopup.js.map