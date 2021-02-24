import React from '../_react'

import PeriodForecast from '../wrapper/PeriodForecast';
import DayDetailPopup from './DayDetailPopup';

import TabPane from '../zhn-atoms/TabPane';
import Tab from '../zhn-atoms/Tab';

import ForecastChart from './ForecastChart';
import HourlyChart from './HourlyChart';
import UviChart from './UviChart';

import styleConfig from './LeftPushMenu.Style'

import handlers from '../../flux/handlers';

const { useRef, useCallback } = React
const { requestHourly, requestUvi } = handlers


const S  = {
  TABS: {
    textAlign: 'left'
  }
};


const LeftPushMenu = ({ id, theme }) => {
  const _refDetail = useRef()
  , _hClickItem = useCallback((item, event) => {
    _refDetail.current.setItem(item);
  }, [])
  , _hCloseDetail = useCallback(() => {
    _refDetail.current.close();
  }, []);

  const STYLE = theme.createStyle(styleConfig);

  return (
    <div id={id} style={STYLE.ROOT_DIV} >
       <PeriodForecast
          onUpdate={_hCloseDetail}
          onClickItem={_hClickItem}
       />
       <DayDetailPopup
          ref={_refDetail}
          onClose={_hCloseDetail}
        />

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
    </div>
  );
}

export default LeftPushMenu
