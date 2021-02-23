import React from '../_react'
import { useSelector } from 'react-redux'

import PeriodForecast from '../views/PeriodForecast';

import { sForecast } from '../../flux/selectors';

const { useEffect } = React;

const S = {
  DAY: {
    cursor: 'pointer'
  }
};

const PeriodForecastWrapper = ({
  onClickItem,
  onUpdate
}) => {
  const forecast = useSelector(sForecast.forecast);

  useEffect(() => {
    if (forecast) {
      onUpdate()
    }
  }, [forecast])

  return (
    <PeriodForecast
        dayStyle={S.DAY}
        forecast={forecast}
        onClickItem={onClickItem}
    />
  )
}

export default PeriodForecastWrapper
