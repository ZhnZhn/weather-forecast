'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('../_react');

var _react2 = _interopRequireDefault(_react);

var _ModalPane = require('../zhn-moleculs/ModalPane');

var _ModalPane2 = _interopRequireDefault(_ModalPane);

var _ShowHide = require('../zhn-atoms/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  PANE: {
    position: 'absolute',
    top: '12px',
    zIndex: '20',
    width: '100%',
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: 'rgb(77, 77, 77)',
    borderRadius: '2px',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 2px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px'
  },
  ITEM: {
    color: 'greenyellow'
  }
};

var _renderOptions = function _renderOptions(options, currentItem, clItem, onSelect, isShow) {
  return options.map(function (item) {
    var _style = item.value === currentItem.value ? S.ITEM : undefined;
    return _react2.default.createElement(
      'div',
      {
        style: _style,
        className: clItem,
        onClick: onSelect.bind(null, item)
      },
      item.caption
    );
  });
};

var OptionsPane = function OptionsPane(_ref) {
  var isShow = _ref.isShow,
      options = _ref.options,
      item = _ref.item,
      rootStyle = _ref.rootStyle,
      clItem = _ref.clItem,
      onSelect = _ref.onSelect,
      onClose = _ref.onClose;
  return _react2.default.createElement(
    _ModalPane2.default,
    {
      style: rootStyle,
      isShow: isShow,
      onClose: onClose
    },
    _react2.default.createElement(
      _ShowHide2.default,
      {
        isShow: isShow,
        style: _extends({}, S.PANE, rootStyle)
      },
      _renderOptions(options, item, clItem, onSelect, isShow)
    )
  );
};

exports.default = OptionsPane;
//# sourceMappingURL=OptionsPane.js.map