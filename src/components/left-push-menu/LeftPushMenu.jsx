import { useRef, useCallback, cloneElement } from '../uiApi';
import { useSelector } from 'react-redux';

import { sSettings } from '../../flux/selectors';

import useLoadComp from './useLoadComp';

import PeriodForecast from '../wrapper/PeriodForecast'
import DayDetailPopup from './DayDetailPopup'
import styleConfig from './LeftPushMenu.Style'
import COMP_TYPE from './CompType'

const LeftPushMenu = ({ id, theme }) => {
  const isAir = useSelector(sSettings.isAir)
  , _refDetail = useRef()
  , _hClickItem = useCallback((item, event) => {
    _refDetail.current.setItem(item);
  }, [])
  , _hCloseDetail = useCallback(() => {
    _refDetail.current.close();
  }, [])
  , CompOrBtOrErrEl = useLoadComp('CHARTS', COMP_TYPE.CTB)
  , STYLE = theme.createStyle(styleConfig);

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
        {cloneElement(CompOrBtOrErrEl, { isAir })}
    </div>
  );
}

export default LeftPushMenu
