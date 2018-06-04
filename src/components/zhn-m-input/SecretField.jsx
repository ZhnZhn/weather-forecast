import React from '../_react'
const { Component } = React;

const CL = {
  SELECT: 'm-select',
  LABEL: 'm-select__label',
  DIV: 'm-textfield-input__div',
  INPUT: 'm-textfield-input',
  INPUT_LINE: 'm-input__line',
  INPUT_MSG_ERR: 'm-input__msg-err'
};

const S = {
  LABEL_TO_INPUT: {
     transform: 'scale(1) translate(0px, -6px)'
  },
  LABEL_ON_ERROR: {
    color: '#F44336'
  },
  LINE_ERROR: {
    borderBottom: '2px solid #F44336'
  }
};

const _isFn = fn => typeof fn === 'function';

const _crValue = (_v, v) => {
  let value;
  if (!_v) { value = v }
  else {
    const _vL = _v.length
         , vL = v.length;
    if (vL > _vL) {
      value = _v + v.substr(_vL)
    } else {
      value = _v.substr(0, vL)
    }
  }
  return value.trim();
}

const _maskValue = (len=0) => {
  let i=0, str = '';
  for (i; i<len; i++){
    str = str + 'X'
  }
  return str;
};

class TextField extends Component {
  static defaultProps = {
    maxLength: "32"
  }

  constructor(props){
    super()
    this.isFocus = false;
    const { onTest, onEnter } = props;
    this.isOnTest = _isFn(onTest)
    this.isOnEnter = _isFn(onEnter)
    this.state = {
      value: '',
      isPassTest: true
    }
  }

  _handleFocusInput = () => {
    this.isFocus = true
    this.forceUpdate()
  }
  _handleBlurInput = () => {
    this.isFocus = false
    this.forceUpdate()
  }

  _handleInputChange = (event) => {
    const value = event.target.value;
    this._value = _crValue(this._value, value)
    const _v = _maskValue(this._value.length);
    if (this.isOnTest) {
      this.setState({
        value: _v,
        isPassTest: this.props.onTest(this._value)
      })
    } else {
      this.setState({ value : _v })
    }
  }
 _handleKeyDown = (event) => {
   if (event.keyCode === 27){
     this._value = ''
     this.setState({ value: '' })
   } else if (event.keyCode === 13 && this.isOnEnter) {
     this.props.onEnter(event.target.value)
   }
 }
 _isValue = (isAllowRemember) => {
    return isAllowRemember
      ? this._input
          ? !!this._input.value
          : false
      : !!this.state.value;
 }

 _refInput = c => this._input = c

  render(){
    const {
            rootStyle, caption,
            isAllowRemember, name,
            maxLength, errorMsg=''
          } = this.props
        , { value, isPassTest } = this.state
        //, _labelStyle = (value || this.isFocus)
          , _labelStyle = (this._isValue(isAllowRemember) || this.isFocus)
            ? undefined
            : S.LABEL_TO_INPUT
        , _labelErrStyle = (isPassTest)
            ? undefined
            : S.LABEL_ON_ERROR
        , _lineStyle = (isPassTest)
            ? undefined
            : S.LINE_ERROR
        , _name = `${name}[password]`
        , _inputProps = isAllowRemember
             ? {
                 autoComplete: "current-password",
                 name: _name
               }
             : {
                 autoComplete: "off",
                 name: _name,
                 value: value,
                 defaultValue: value,
                 onChange: this._handleInputChange,
                 onKeyDown: this._handleKeyDown
               };

    return (
      <div
        className={CL.SELECT}
        style={rootStyle}
      >
        <label
          className={CL.LABEL}
          style={{..._labelStyle, ..._labelErrStyle}}
         >
          {caption}
        </label>
        <div className={CL.DIV}>
          <input
            hidden={true}
            name={_name}
            value={name}
          />
          <input
            ref = {this._refInput}
            type="password"
            className={CL.INPUT}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            translate={false}
            maxLength={maxLength}
            onFocus={this._handleFocusInput}
            onBlur={this._handleBlurInput}
            {..._inputProps}
          />
          <div className={CL.INPUT_LINE} style={_lineStyle} />
          {
             _lineStyle && <div className={CL.INPUT_MSG_ERR}>
                 {errorMsg}
               </div>
          }
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps){
    if (this.props !== prevProps){
      if (this.props.isAllowRemember !== prevProps.isAllowRemember){
        this._input.value = ''
        if (this.props.isAllowRemember){
          this._value = ''
          this.setState({ value: '' })
        }
      }
    }
  }

  getValue(){
    const { isAllowRemember } = this.props;
    return isAllowRemember && this._input
      ? this._input.value
      : String(this._value).trim();
  }
}

export default TextField
