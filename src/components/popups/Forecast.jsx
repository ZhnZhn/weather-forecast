//import React, { Component } from 'react';
import React from '../_react'
//import PropTypes from 'prop-types';

import { sForecast } from '../../flux/selectors';

import FlyPopup from '../containers/FlyPopup';
import PeriodForecast from '../views/PeriodForecast';

import styleConfig from './Forecast.Style';
import withTheme from '../hoc/withTheme';

const { Component } = React

const NOT_FOUND_MSG = 'Forecast for place not found';
const OK_CODE = '200'

const INIT_STATE = {
  forecast : {
    cod : 200,
    list : []
  }
}

class Forecast extends Component {
  /*
  static propTypes = {
    store: PropTypes.object
  }
  */

  state = INIT_STATE

  componentDidMount(){
     const { store } = this.props
     this.unsubscribe = store.subscribe(this._onStore)
  }

  _onStore = () => {
    const { store } = this.props
    , state = store.getState()
    , recent = sForecast.recent(state)
    if (recent && this.recent !== recent ){
      this.setState({
        forecast : sForecast.byId(state, recent)
      })
    }
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  _renderMsg = () => {
    return (
      <div>
        <span>{NOT_FOUND_MSG}</span>
      </div>
    )
  }

  render(){
    const { rootStyle, store, theme } = this.props
        , { forecast } = this.state
        , { cod } = forecast
        , _style = theme.createStyle(styleConfig);

    return (
      <FlyPopup
          rootStyle={Object.assign(rootStyle, _style.ROOT_DIV)}
          store={store}
          storeKey="isPopupForecast"
          isShow={true}
       >
        <PeriodForecast
            forecast={forecast}
            captionStyle={{ marginRight: '30px' }}
        />
        { (''+cod) !== OK_CODE && this._renderMsg() }
      </FlyPopup>
    );
  }
}

export default withTheme(Forecast)
