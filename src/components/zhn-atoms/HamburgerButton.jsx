//import React, { Component } from 'react';
import React from '../_react'

const { Component } = React
const S = {
  HAMBURGER: {
    width: '2.2rem',
    height: '2.2rem',
    verticalAlign: 'middle',
    marginBottom: '0.5rem',
    marginLeft: '0.8rem',
    borderRadius: '0.4rem'
  }
};

class HamburgerButton extends Component{

  constructor(props){
    super(props);
    const state = props.store.getState()
    this.state = {
      isOpen : state.layout[props.storeKey]
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.subscribe(this._onStore)
  }
  _onStore = () => {
    const { store, storeKey } = this.props
    , state = store.getState()
    if (state.layout[storeKey] !== this.state.isOpen){
      this.setState((prev) => {
        return { isOpen: !prev.isOpen };
      })
    }
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  handleClick = () => {
    const { onClick, store, storeKey } = this.props
    store.dispatch(onClick(storeKey))
  }

  render(){
    const { isOpen } = this.state
    , btClass = isOpen
       ? "bt-hamburger opened"
       : "bt-hamburger";

    return (
      <button
         className={btClass}
         style={S.HAMBURGER}
         onClick={this.handleClick}
      >
        <span />
      </button>
    );
  }
}

export default HamburgerButton
