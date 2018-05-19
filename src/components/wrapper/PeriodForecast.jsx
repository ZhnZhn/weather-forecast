//import React, { Component } from 'react';
import React from '../_react'

import PeriodForecast from '../views/PeriodForecast';

import { sForecast } from '../../flux/selectors';

const { Component } = React

const S = {
  DAY: {
    cursor: 'pointer'
  }
};

const INIT_STATE = {
  forecast : {
    cod : 200,
    list : []
  }
}

class Wrapper extends Component {
  state = INIT_STATE

  componentDidMount(){
    const { store } = this.props
    this.unsubscribe = store.subscribe(this._onStore)
  }

  _onStore = () => {
    const { store, onUpdate } = this.props
    , state = store.getState()
    , recent = sForecast.recent(state)
    if (recent && this.recent !== recent ){
      this.recent = recent;
      this.setState({
        forecast : sForecast.byId(state, recent)
      }, onUpdate)
    }
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  render(){
    const { onClickItem } = this.props;
    const { forecast } = this.state;
    return (
      <PeriodForecast
          dayStyle={S.DAY}
          forecast={forecast}
          onClickItem={onClickItem}
      />
    );
  }
}

export default Wrapper
