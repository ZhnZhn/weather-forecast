//import React, { Component } from 'react';
import React from '../_react'

import { FETCH } from '../../flux/fetching/constants';
import ProgressLine from '../zhn-atoms/ProgressLine';

const Colors = {
  LOADING : '#2F7ED8',
  FAILED : 'rgb(237, 88, 19)'
};

const { Component } = React

class ProgressLoading extends Component {

  constructor(props){
    super();
    this.fetching = props.store.getState().fetching
    this.state = {
      completed : 0,
      color : Colors.LOADING
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.subscribe(this._onStore);
  }
  componentWillUnmount(){
    this.unsubscribe();
  }

  _onStore = () => {
    const { store } = this.props
    const fetching = store.getState().fetching
    if (this.fetching !== fetching){
      this.fetching = fetching;
      switch(fetching){
        case FETCH.LOADING:
          this.setState({ completed: 35, color: Colors.LOADING });
          break;
        case FETCH.SUCCESS:
          this.setState({ completed: 100, color: Colors.LOADING });
          break;
        case FETCH.FAILED:
          this.setState({completed: 100, color: Colors.FAILED})
          break;
        default : break;
      }
    }
  }

  render(){
    const { completed, color } = this.state;
    return (
      <ProgressLine
         height={3}
         color={color}
         completed={completed}
      />
    )
  }
}

export default ProgressLoading
