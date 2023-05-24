import {
  requestHourly,
  requestUvi,
  requestAirForecast
} from '../../flux/handlers';

import TabPane from '../zhn-atoms/TabPane';
import Tab from '../zhn-atoms/Tab';

import ChartForecast from './ChartForecast';
import ChartHourly from './ChartHourly';
import ChartUvi from './ChartUvi';
import ChartAirForecast from './ChartAirForecast';

const S_TABS = { textAlign: 'left' };

const ChartTabPane = () => (
  <TabPane width="100%" tabsStyle={S_TABS}>
    <Tab title="7 Days">
       <ChartForecast />
    </Tab>
    <Tab title="5 Days/3 Hours" onClick={requestHourly}>
       <ChartHourly />
    </Tab>
    <Tab title="UV index" onClick={requestUvi}>
       <ChartUvi />
    </Tab>
    <Tab title="Air Forecast" onClick={requestAirForecast}>
       <ChartAirForecast />
    </Tab>
  </TabPane>
);

export default ChartTabPane
