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

const _crId = ({ name }) => name + '_sf';

class SecretField extends Component {
  static defaultProps = {
    name: "pwd",
    maxLength: "32",
    onTest: () => true,
    onEnter: () => {}
  }

  constructor(props){
    super(props)
    this.isFocus = false;
    this._id = _crId(props)
    this.state = {
      value: '',
      isPassTest: true
    }
  }

  componentWillUnmound() {
    clearTimeout(this._clearId)
  }

  _handleFocusInput = () => {
    this.isFocus = true
    this.forceUpdate()
  }
  _handleBlurInput = () => {
    this.isFocus = false
    this.forceUpdate()
  }

  _clearAttrValue = () => {
    this._clearId = setTimeout(() => {
      const _input = this._input;
      if (_input && _input.hasAttribute('value')) {
        _input.removeAttribute('value')
      }
    })
  }

  _hInputChange = (event) => {
    this.setState({
      value: event.target.value.trim(),
      isPassTest: this.props.onTest(event.target.value.trim())
    })
  }
  _hKeyDown = (event) => {
   if (event.keyCode === 46){
     this.setState({ value: '' })
   } else if (event.keyCode === 13) {
     event.preventDefault()
     this.props.onEnter(event.target.value)
     this._wasEnter = true
     this.forceUpdate(this._clearWasEnter)
   }
 }

  _hMaskInputChange = (event) => {
    const value = event.target.value;
    this._value = _crValue(this._value, value)
    const _v = _maskValue(this._value.length);
    this.setState({
      value: _v,
      isPassTest: this.props.onTest(this._value)
    })
  }
 _hMaskKeyDown = (event) => {
   if (event.keyCode === 46 || event.keyCode === 27){
     this._value = ''
     this.setState({ value: '' })
   } else if (event.keyCode === 13) {
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
        , _labelStyle = (this._isValue(isAllowRemember) || this.isFocus)
            ? undefined
            : S.LABEL_TO_INPUT
        , _labelErrStyle = (isPassTest)
            ? undefined
            : S.LABEL_ON_ERROR
        , _lineStyle = (isPassTest)
            ? undefined
            : S.LINE_ERROR
        , _inputProps = isAllowRemember
             ? {
                 autoComplete: "current-password",
                 value,
                 onChange: this._hInputChange,
                 onKeyDown: this._hKeyDown
               }
             : {
                 autoComplete: "off",
                 value,
                 onChange: this._hMaskInputChange,
                 onKeyDown: this._hMaskKeyDown
               };

    return (
      <form
        className={CL.SELECT}
        style={rootStyle}
      >
        <label
          className={CL.LABEL}
          style={{..._labelStyle, ..._labelErrStyle}}
          htmlFor={this._id}
         >
          {caption}
        </label>
        <div className={CL.DIV}>
          <input
            hidden={true}
            autoComplete="username"
            value={name}
            readOnly={true}
          />
          <input
            ref = {this._refInput}
            id={this._id}
            type="password"
            className={CL.INPUT}
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
      </form>
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
    this._clearAttrValue()
  }

  getValue(){
    const { isAllowRemember } = this.props;
    return isAllowRemember && this._input
      ? this._input.value
      : String(this._value).trim();
  }
}

export default SecretField
