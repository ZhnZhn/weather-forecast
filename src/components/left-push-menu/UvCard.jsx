//import React, { Component } from 'react';
import React from '../_react'

//import { uvRecent, uvById } from '../../flux/reducer';
import { sUV } from '../../flux/selectors';

const { Component } = React

const S = {
  TIME : {
    paddingTop : '1rem',
    paddingLeft : '2.5rem',
    color : '#8bc34a',
    fontSize : '1rem',
    fontWeight : 'bold'
  },
  VALUE : {
    paddingTop : '1rem',
    paddingLeft : '2.5rem',
    fontSize : '3rem',
    fontWeight : 'bold'
  }
}

class UvCard extends Component {

  state = {
    data : {}
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.subscribe(this._onStore)
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  _onStore = () => {
    const { store } = this.props
    , state = store.getState()
    , recent = sUV.recent(state);
    if (recent !== this.state.recent) {
      this.setState((prev) => {
        return { data : sUV.byId(state, recent) }
      })
    }
  }

  render(){
    const { data={} } = this.state
    , { time='', data:value } = data
    , _time = time.replace('Z','').replace('T', ' ')
    return (
      <div>
        <div style={S.TIME}>
          {_time}
        </div>
        <div style={S.VALUE}>{value}</div>
      </div>
    )
  }
}

export default UvCard
