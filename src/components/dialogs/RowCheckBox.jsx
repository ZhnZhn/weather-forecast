//import PropTypes from "prop-types";
import React from '../_react'

import withTheme from '../hoc/withTheme'
import styleConfig from './Dialog.Style'

import SvgCheckBox from '../zhn-atoms/SvgCheckBox'

const { Component } = React

const CHB_COLOR = 'black'
, S_ROOT = { padding: '6px 0 0 16px' }
, S_CAPTION = {
  display: 'inline-block',
  color: 'grey',
  paddingLeft: 8,
  fontSize: '16px',
  fontWeight: 'bold',
  userSelect: 'none',
  cursor: 'pointer'
}
, S_CHECKED = { color: 'black' };


class RowCheckBox extends Component {
  /*
  static propTypes = {
    style : PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */

  constructor(props){
    super()
    this.state = {
      isChecked: !!props.initValue
    }
  }

  _handleCheck = () => {
    const { onCheck } = this.props;
    if (typeof onCheck == 'function'){
      onCheck()
    }
    this.setState({ isChecked: true })
  }
  _handleUnCheck = () => {
    const { onUnCheck } = this.props;
    if (typeof onUnCheck == 'function'){
      onUnCheck()
    }
    this.setState({ isChecked: false })
  }
  _handleToggle = () => {
    const { isChecked } = this.state;
    if (isChecked) {
      this._handleUnCheck()
    } else {
      this._handleCheck()
    }
  }

  render(){
    const {
      style,
      caption,
      captionStyle,
      theme
    } = this.props
    , { isChecked } = this.state
    , _style = isChecked
         ? S_CHECKED
         : null
    , TS = theme.createStyle(styleConfig);
    return (
      <div style={{...S_ROOT, ...style}}>
        <SvgCheckBox
          color={CHB_COLOR}
          checkedColor={TS.R_DIALOG.backgroundColor}
          value={isChecked}
          onCheck={this._handleCheck}
          onUnCheck={this._handleUnCheck}
        />
        {
          caption && (
            <span
              style={{...S_CAPTION, ...captionStyle, ..._style }}
              onClick={this._handleToggle}
            >
              {caption}
            </span>
          )
        }
      </div>
    );
  }
}

export default withTheme(RowCheckBox)
