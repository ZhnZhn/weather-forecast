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


const _setBackgroundColorTo = (theme, ref, styleProperty) => {
  const _el = ref.current;
  if (_el) {
    _el.style.backgroundColor = theme.createStyle(styleConfig)[styleProperty]
  }
};

const LeftPushMenu = ({ id, theme }) => {
  const _refDetail = useRef()
  , _refDetailEl = useRef()
  , _markDay = useCallback(currentTarget => {
    _refDetailEl.current = currentTarget;
    _setBackgroundColorTo(theme, _refDetailEl, 'C_BG_MARK')
  }, [theme])
  , _unmarkDay = useCallback(() => {
    _setBackgroundColorTo(theme, _refDetailEl, 'C_BG_UNMARK')
  }, [theme])
  , _hClickItem = useCallback((item, event) => {
    event.persist()
    _unmarkDay()
    _markDay(event.currentTarget)
    _refDetail.current.setItem(item);
  }, [_unmarkDay, _markDay])
  , _hCloseDetail = useCallback(() => {
    _unmarkDay()
    _refDetail.current.close();
  }, [_unmarkDay]);

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
