"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("../_react"));

var _SvgClose = _interopRequireDefault(require("../zhn-atoms/SvgClose"));

var _RaisedButton = _interopRequireDefault(require("../zhn-atoms/RaisedButton"));

//import PropTypes from 'prop-types'
var Component = _react["default"].Component;
var CL = {
  SHOWING: 'show-popup',
  HIDING: 'hide-popup'
};
var STYLE = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  },
  HIDE_POPUP: {
    opacity: 0,
    transform: 'scaleY(0)'
  },
  ROOT_DIV: {
    position: 'absolute',
    top: '15%',
    left: '40%',
    display: 'block',
    backgroundColor: '#4D4D4D',
    //border: 'solid 2px #232F3B',
    border: 'solid 2px #3f5178',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 6px',
    zIndex: 10
  },
  CAPTON_DIV: {
    padding: '5px',
    //color: 'rgba(164, 135, 212,1)',
    color: '#9e9e9e',
    //backgroundColor: '#232F3B',
    backgroundColor: '#3f5178',
    textAlign: 'center',
    fontSize: '18px'
  },
  COMMAND_DIV: {
    cursor: 'default',
    "float": 'right',
    marginTop: '8px',
    marginBottom: '10px',
    marginRight: '4px'
  }
};

var ModalDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ModalDialog, _Component);

  /*
   static propTypes = {
     isShow: PropTypes.bool,
     isWithButton: PropTypes.bool,
     isNotUpdate: PropTypes.bool,
     withoutClose: PropTypes.bool,
     commandButtons: PropTypes.arrayOf(PropTypes.element),
     timeout: PropTypes.number,
     caption: PropTypes.string,
     style: PropTypes.object,
     childrenStyle: PropTypes.object,
     onClose: PropTypes.func
   }
   */
  function ModalDialog(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._renderCommandButton = function () {
      var _this$props = _this.props,
          commandButtons = _this$props.commandButtons,
          commandStyle = _this$props.commandStyle,
          withoutClose = _this$props.withoutClose,
          onClose = _this$props.onClose;
      return _react["default"].createElement("div", {
        style: (0, _extends2["default"])({}, STYLE.COMMAND_DIV, {}, commandStyle)
      }, commandButtons, !withoutClose && _react["default"].createElement(_RaisedButton["default"], {
        isPrimary: true,
        caption: "Close",
        onClick: onClose
      }));
    };

    _this.wasClosing = false;
    return _this;
  }

  var _proto = ModalDialog.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      if (nextProps.isNotUpdate) {
        return false;
      }
    }

    return true;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this2 = this;

    if (this.wasClosing) {
      setTimeout(function () {
        _this2.setState({});
      }, this.props.timeout);
    }
  };

  _proto._handleClickDialog = function _handleClickDialog(event) {
    event.stopPropagation();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        isWithButton = _this$props2.isWithButton,
        style = _this$props2.style,
        caption = _this$props2.caption,
        styleCaption = _this$props2.styleCaption,
        children = _this$props2.children,
        childrenStyle = _this$props2.childrenStyle,
        onClose = _this$props2.onClose;

    var _className, _style;

    if (this.wasClosing) {
      _style = STYLE.HIDE;
      this.wasClosing = false;
    } else {
      _className = isShow ? CL.SHOWING : CL.HIDING;
      _style = isShow ? STYLE.SHOW : STYLE.HIDE_POPUP;

      if (!isShow) {
        this.wasClosing = true;
      }
    }

    return _react["default"].createElement("div", {
      className: _className,
      style: (0, _extends2["default"])({}, STYLE.ROOT_DIV, {}, style, {}, _style),
      onClick: this._handleClickDialog
    }, _react["default"].createElement("div", {
      style: STYLE.CAPTON_DIV
    }, _react["default"].createElement("span", {
      style: styleCaption
    }, caption), _react["default"].createElement(_SvgClose["default"], {
      onClose: onClose
    })), _react["default"].createElement("div", {
      style: childrenStyle
    }, children), isWithButton && this._renderCommandButton());
  };

  return ModalDialog;
}(Component);

ModalDialog.defaultProps = {
  isWithButton: true,
  isNotUpdate: false,
  timeout: 450
};
var _default = ModalDialog;
exports["default"] = _default;
//# sourceMappingURL=ModalDialog.js.map