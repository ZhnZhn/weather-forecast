import React from '../_react'
//import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import useTheme from '../hooks/useTheme'

import { sForecast } from '../../flux/selectors';

import FlyPopup from '../containers/FlyPopup';
import PeriodForecast from '../views/PeriodForecast';
import styleConfig from './Forecast.Style';

const S  = {
  CAPTION: {
    marginRight: 40
  }
};

const NOT_FOUND_MSG = 'Forecast for place not found';
const OK_CODE = '200'

const NotFoundMsg = () => (
  <div>
    <span>{NOT_FOUND_MSG}</span>
  </div>
);


const Forecast = ({ style }) => {
  const forecast = useSelector(state => {
    const recent = sForecast.recent(state)
    return sForecast.byId(state, recent);
  })
  , _style = useTheme(styleConfig);

  const { cod } = forecast || {};

  return (
    <FlyPopup
        style={{...style, ..._style.ROOT_DIV}}
        storeKey="isPopupForecast"
     >
      <PeriodForecast
          forecast={forecast}
          captionStyle={S.CAPTION}
      />
      { cod && (''+cod) !== OK_CODE && <NotFoundMsg /> }
    </FlyPopup>
  );
}

/*
Forecast.propTypes = {
  style: PropTypes.object
}
*/

export default Forecast
