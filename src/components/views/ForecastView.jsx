//import React, { Component } from 'react';
import React from '../_react'

import Interact from '../../utils/Interact';

import Caption from './Caption';
import DayItem from './DayItem';

const NOT_FOUND_MSG = 'Forecast for place not found';
const OK_CODE = '200'

const { Component } = React

class ForecastView extends Component {

  state = {
    forecast : {
      cod : 200,
      list : []
    }
  }

  componentDidMount(){
     const { store, isFixed } = this.props
     if (!isFixed){
       Interact.makeDragable(this.domRootDiv);
     }
     this.unsubscribe = store.subscribe(this._onStore)
  }

  _onStore = () => {
    const { store } = this.props
    , { forecast={} } = store.getState()
    , { recent } = forecast;
    if (recent && this.recent !== recent ){
      this.setState({
         forecast : forecast[recent]
      })
    }
  }

  _renderForecast = () => {
    const { forecast } = this.state
    , { list=[] } = forecast
    return list.map((item, index) => {
       return (<DayItem key={index} item={item} />)
    })
  }

  _renderMsg = () => {
    return (
      <div>
        <span>{NOT_FOUND_MSG}</span>
      </div>
    )
  }

  render(){
    const { isShow, rootStyle } = this.props
    , _styleShow = isShow ? {display: 'block'} : {display: 'none'}
    , _classShow = isShow ? 'show-popup' : undefined
    , { forecast } = this.state
    , { cod } = forecast ;

    return (
      <div
           ref={ c => this.domRootDiv = c }
           className={_classShow}
           style={Object.assign({}, rootStyle, _styleShow)}
      >
        <Caption forecast={forecast} />
        <div>
          {this._renderForecast()}
        </div>
        { (''+cod) !== OK_CODE && this._renderMsg() }
      </div>
    );
  }
}

export default ForecastView;
