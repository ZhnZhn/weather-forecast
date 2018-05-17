import React from '../_react'

const CL_NOT_SELECTED = "not-selected";

const { Component } = React;
const S = {
  ROOT: {
    display: 'inline-block',
    color: '#80c040',
    border: '2px solid #80c040',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    textAlign: 'center',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  NOT_ACTIVE : {
    //color : '#9e9e9e'
    color: '#5b5b5b'
  }
};

const _getIsActive = (props) => {
  const { store, storeKey } = props;
  return store.getState()
    .layout[storeKey];
};

class ButtonCircle extends Component {
  constructor(props){
    super()
    this.state = {
      isActive: _getIsActive(props)
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store
      .subscribe(this._onStore)
  }
  _onStore = () => {
    const isActive = _getIsActive(this.props);
    if (isActive !== this.state.isActive){
      this.setState({ isActive })
    }
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  _hClick = () => {
     const { storeKey, onClick } = this.props;
     onClick(storeKey)
  }

  render(){
    const { caption, style } = this.props
        , { isActive } = this.state
        , _style = (isActive)
            ? { ...S.ROOT, ...style }
            : { ...S.ROOT, ...style, ...S.NOT_ACTIVE };

    return (
      <span
         className={CL_NOT_SELECTED}
         style={_style}
         onClick={this._hClick}
      >
         {caption}
      </span>
    );
  }
}

export default ButtonCircle
