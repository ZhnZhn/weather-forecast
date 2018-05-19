//import React, { Component } from 'react';
import React from '../_react'

import PeriodForecast from '../wrapper/PeriodForecast';
import DayDetailPopup from './DayDetailPopup';

import TabPane from '../zhn-atoms/TabPane';
import Tab from '../zhn-atoms/Tab';

import ForecastChart from './ForecastChart';
import HourlyChart from './HourlyChart';
import UvCard from './UvCard';

import styleConfig from './LeftPushMenu.Style'
import withTheme from '../hoc/withTheme';

import { hourlyRequested } from '../../flux/hourly/actions';
import { uvRequested } from '../../flux/uv/actions';

const { Component } = React

//const BG_MARK = '#646464';
//const BG_UNMARK = '#808080';

class LeftPushMenu extends Component {
   state = {}

   _markDay = (currentTarget) => {
     const _style = this.props.theme.createStyle(styleConfig)
     this.detailEl = currentTarget;
     this.detailEl.style.backgroundColor = _style.C_BG_MARK;
   }
   _unmarkDay = () => {
     if (this.detailEl){
       const _style = this.props.theme.createStyle(styleConfig)
       this.detailEl.style.backgroundColor = _style.C_BG_UNMARK;
     }
   }

   handleClickItem = (item, evn) => {
    evn.persist();
    this._unmarkDay();
    this._markDay(evn.currentTarget);
    this.detailComp.setItem(item);
  }

  handleRequestHourly = () => {
    const { store } = this.props
    store.dispatch(hourlyRequested())
  }
  handleRequestUV = () => {
    const { store } = this.props
    store.dispatch(uvRequested())
  }

  handleCloseDetail = () => {
    this._unmarkDay();
    this.detailComp.close();
  }

  render(){
    const { id, store, theme } = this.props
         , STYLE = theme.createStyle(styleConfig);
    return (
      <div id={id} style={STYLE.ROOT_DIV} >
         <PeriodForecast
            store={store}
            onUpdate={this.handleCloseDetail}
            onClickItem={this.handleClickItem}
         />
         <DayDetailPopup
            ref={ comp => this.detailComp = comp}
            onClose={this.handleCloseDetail}
          />

          <TabPane key="1" width="100%">
            <Tab title="7 Days">
               <ForecastChart store={store} />
            </Tab>
            <Tab
               title="5 Days/3 Hours"
               onClick={this.handleRequestHourly}
            >
               <HourlyChart store={store} />
            </Tab>
            <Tab
               title="UV"
               onClick={this.handleRequestUV}
            >
               <UvCard store={store} />
            </Tab>
          </TabPane>

         {/*<ForecastChart store={store} />*/}
      </div>
    );
  }
}

export default withTheme(LeftPushMenu)
