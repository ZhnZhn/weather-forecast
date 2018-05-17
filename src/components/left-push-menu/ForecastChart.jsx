//import React , { Component } from 'react';
import React from '../_react'
//import PropTypes from 'prop-types';

import Chart from '../charts/Chart'

import dt from '../../utils/dt';
import { sForecast } from '../../flux/selectors';

import TooltipTemperature from './TooltipTemperature';
import LegendTemperature from './LegendTemperature';

import STYLE from './Chart.Style';
import LABEL from './Label.Style';

const { Component } = React;
const {
  CartesianGrid,
  Bar,
  Line,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ComposedChart
} = Chart

const _data = [
      {day: 'Page A', tempDay: 40, tempNight: 30},
      {day: 'Page B', tempDay: 30, tempNight: 30},
      {day: 'Page C', tempDay: 20, tempNight: 30},
      {day: 'Page D', tempDay: 27, tempNight: 30},
      {day: 'Page E', tempDay: 18, tempNight: 30},
      {day: 'Page F', tempDay: 23, tempNight: 30},
      {day: 'Page G', tempDay: 34, tempNight: 30}
];

const _fnAdapter = (arr=[]) => {
  const data = arr.map((item, index) => {
    const { dt:timestamp, rain=0, speed, temp={} } = item
        , {
            day=null, night=null, morn=null,
            eve=null, max=null, min=null
          } = temp;
     return {
        day: dt.toShortDayOfWeek(timestamp),
        tempDay: day,
        tempNight: night,
        tempMorn: morn,
        tempEve: eve,
        tempMax: max,
        tempMin: min,
        rain: rain,
        speed: speed
     };
  });
  return data;
}

const fnFilter = (data=[], filters={}) => {
  if (filters.length === 0){
    return data;
  }
  const keys = Object.keys(filters);
  return data.map((item) => {
     const _item = Object.assign({}, item)
     keys.forEach((dataKey) => {
        if (!filters[dataKey]) {
          _item[dataKey] = null;
        }
     })
     return _item;
  });
}

class ForecastChart extends Component {
  /*
  static propTypes = {
    store : PropTypes.object.isRequired
  }
  */

  state = {
    data : _data,
    filters : {
      tempDay : true,
      tempNight : true,
      tempMorn : false,
      tempEve : false,
      tempMax : false,
      tempMin : false,
      rain : true,
      speed : true
    }
  }

  componentDidMount(){
    const { store } = this.props
    this.unsubsribe = store.subscribe(this._onStore);
  }
  _onStore = () => {
    const { store } = this.props
    , state = store.getState()
    , recent = sForecast.recent(state);
    if (recent && this.recent !== recent ){
      this.recent = recent;
      this.setState((prev) => ({
        data : _fnAdapter(sForecast.listById(state, recent))
      }))
    }
  }
  componentWillUnmount(){
    this.unsubsribe();
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props !== nextProps){
      return false;
    }
    return true;
  }

  handleFilter = (dataKey) => {
     const { filters } = this.state
     let _filters = Object.assign({}, filters);
     if (!filters[dataKey]){
       _filters[dataKey] = true
     } else {
       _filters[dataKey] = false
     }
     this.setState({ filters: _filters })
  }

  render(){
    const { data, filters } = this.state
    , _data = fnFilter(data, filters)

    return (
      <ResponsiveContainer width="100%" height={300} >

      <ComposedChart data={_data} {...STYLE.ComposedChart}>
        <XAxis dataKey="day" {...STYLE.XAxis} />
        <YAxis label={{
           value: "°C",
           //offset: -18,
           //position: 'insideTop'
           //angle: -90,
           //position: 'insideLeft'
           //offset: 10,
           //position: "insideTopRight",
           //position: "insideStart"
         }}/>
        <YAxis
           yAxisId={1} dataKey="rain" orientation="right" label="mm"
           {...STYLE.YAxisRain}
        />
        <YAxis
           hide={!filters.speed}
           yAxisId={2} dataKey="speed" orientation="right" label="m/s"
           {...STYLE.YAxisSpeed}
        />

        <CartesianGrid {...STYLE.CartesianGrid} />

        <Tooltip
          offset={24}
          content={<TooltipTemperature data={data} />}
        />

        <Legend
          content={
             <LegendTemperature
                 styles={LABEL.fnLegendLabel(filters)}
                 onFilter={this.handleFilter}
              />
          }
        />
        <Bar
           dataKey="rain"
           yAxisId={1} barSize={20} fill="#0922a5"
        />

        <Line dataKey="speed" yAxisId={2} {...STYLE.LineSpeed} />

        <Line dataKey="tempMin" {...STYLE.LineTempMin} />
        <Line dataKey="tempMax" {...STYLE.LineTempMax} />

        <Line dataKey="tempEve" {...STYLE.LineTempEve} />
        <Line dataKey="tempMorn" {...STYLE.LineTempMorn} />
        <Line dataKey="tempNight" {...STYLE.LineTempNight} />
        <Line dataKey="tempDay" {...STYLE.LineTempDay} />

      </ComposedChart>

      </ResponsiveContainer>
    );
  }
}

export default ForecastChart
