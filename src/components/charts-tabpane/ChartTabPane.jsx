import handlers from '../../flux/handlers';

import TabPane from '../zhn-atoms/TabPane';
import Tab from '../zhn-atoms/Tab';

import ForecastChart from './ForecastChart';
import HourlyChart from './HourlyChart';
import UviChart from './UviChart';
import AirForecastChart from './AirForecastChart';

const {
  requestHourly,
  requestUvi,
  requestAirForecast
} = handlers;

const S_TABS = { textAlign: 'left' };

const ChartTabPane = ({ isAir }) => (
  <TabPane key="1" width="100%" tabsStyle={S_TABS}>
    <Tab title="7 Days">
       <ForecastChart />
    </Tab>
    <Tab title="5 Days/3 Hours" onClick={requestHourly}>
       <HourlyChart />
    </Tab>
    <Tab title="UV index" onClick={requestUvi}>
       <UviChart />
    </Tab>
    {
      isAir && <Tab title="Air Forecast" onClick={requestAirForecast}>
          <AirForecastChart />
      </Tab>
    }
  </TabPane>
);


export default ChartTabPane
