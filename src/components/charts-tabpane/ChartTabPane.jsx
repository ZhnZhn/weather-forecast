import React from '../_react';

import handlers from '../../flux/handlers';

import TabPane from '../zhn-atoms/TabPane';
import Tab from '../zhn-atoms/Tab';

import ForecastChart from './ForecastChart';
import HourlyChart from './HourlyChart';
import UviChart from './UviChart';

const { requestHourly, requestUvi } = handlers;

const S  = {
  TABS: {
    textAlign: 'left'
  }
};

const ChartTabPane = () => (
  <TabPane key="1" width="100%" tabsStyle={S.TABS}>
    <Tab title="7 Days">
       <ForecastChart />
    </Tab>
    <Tab title="5 Days/3 Hours" onClick={requestHourly}>
       <HourlyChart />
    </Tab>
    <Tab title="UV index" onClick={requestUvi}>
       <UviChart />
    </Tab>
  </TabPane>
);

export default ChartTabPane
