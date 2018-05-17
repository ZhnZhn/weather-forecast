//import React, { Component } from 'react';
import React from '../_react'

import Chart from '../charts/Chart'

import dt from '../../utils/dt';
import { sHourly } from '../../flux/selectors';

import LegendHourly from './LegendHourly';
import STYLE from './Chart.Style';

const { Component } = React

const {
 CartesianGrid,
 Line,
 YAxis,
 XAxis,
 ResponsiveContainer,
 Legend,
 LineChart
} = Chart;


const _data = [
      {day: 'Page A', temp: 40 },
      {day: 'Page B', temp: 30 },
      {day: 'Page C', temp: 20 },
      {day: 'Page D', temp: 27 },
      {day: 'Page E', temp: 18 },
      {day: 'Page F', temp: 23 },
      {day: 'Page G', temp: 34 }
];

const fnAdapter = ( obj ) => {
  return obj.list.map(item => {
    const {
       dt:timestamp, dt_txt='',
       main={}, wind={}, rain={}
     } = item
    , { temp, pressure, humidity } = main
    , { speed=null } = wind
    , _rain  = rain['3h'] || null
    return {
      //day : dt.toShortDayOfWeek(timestamp),
      day : dt.toDayHour(timestamp),
      dt_text : dt_txt,
      temp : temp,
      pressure : pressure,
      humidity : humidity,
      speed : speed,
      rain : _rain
    }
  })
}

class HourlyChart extends Component {
  state = {
    data : _data,
    filtered : {
      temp : false,
      pressure : true,
      rain : true,
      speed : true
    }
  }

  componentDidMount(){
    this.unsubsribe = this.props.store.subscribe(this._onStore)
  }
  componentWillUnmount(){
    this.unsubsribe()
  }
  _onStore = () => {
    const state = this.props.store.getState();
    const recent = sHourly.recent(state)
    if (recent !== this.recent){
      this.recent = recent
      const data = fnAdapter(sHourly.byId(state, recent))
      this.setState({ data })
    }
  }

  shouldComponentUpdate(nextProps){
    if (this.props !== nextProps) {
      return false;
    }
    return true;
  }

  handleFilter = (dataKey) => {
    this.setState((prev) => {
       const { filtered } = prev
       filtered[dataKey] = !filtered[dataKey]
       return { filtered }
    })
  }

  render(){
    const { data, filtered } = this.state
    return (
      <ResponsiveContainer width="100%" height={300} >

      <LineChart data={data} {...STYLE.HourlyChart} >
        <XAxis dataKey="day" {...STYLE.XAxis} />

        <YAxis
           yAxisId={1}
           orientation="right"
           width={45}
           label="°C"
           dataKey="temp"
           hide={filtered.temp}
        />
        <YAxis
           yAxisId={2}
           orientation="right"
           width={80}
           dataKey="pressure"
           type="number"
           domain={['dataMin', 'dataMax']}
           label="hPa"
           hide={filtered.pressure}
           {...STYLE.YAxisPressure}
        />
        <YAxis
           yAxisId={3}
           orientation="right"
           width={54}
           label="mm"
           dataKey="rain"
           hide={filtered.rain}
           {...STYLE.YAxisRain}
        />
        <YAxis
          yAxisId={4}
          orientation="right"
          width={45}
          label="m/s"
          dataKey="speed"
          hide={filtered.speed}
          {...STYLE.YAxisSpeed}
        />

        <CartesianGrid {...STYLE.CartesianGrid} />
        <Legend
           content={
               <LegendHourly
                   filtered={filtered}
                   onFilter={this.handleFilter}
               />
            }
        />

        <Line {...STYLE.LineTempNight}
            connectNulls={true}
            yAxisId={1}
            dataKey={(filtered.temp) ? "empty" : "temp"}
        />
        <Line {...STYLE.LinePressure}
            connectNulls={true}
            strokeDasharray="5 5"
            yAxisId={2}
            dataKey={(filtered.pressure) ? "empty" : "pressure"}
        />
        <Line {...STYLE.LineRain}
            connectNulls={true}
            strokeDasharray="5 5"
            //strokeDasharray="100 5"
            yAxisId={3}
            dataKey={(filtered.rain) ? "empty" : "rain"}
        />
        <Line
            connectNulls={true}
            {...STYLE.LineSpeed}
            strokeDasharray="5 5"
            //strokeDasharray={false}
            yAxisId={4}
            dataKey={(filtered.speed) ? "empty" : "speed"}
        />

      </LineChart>

      </ResponsiveContainer>
    );
  }
}

export default HourlyChart
