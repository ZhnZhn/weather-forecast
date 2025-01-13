import {
  useSelector,
  cloneUiElement,
  useRef,
  useMemo,
  getRefValue
} from '../uiApi';

import { sSettings } from '../../flux/selectors';

import useLoadComp from './useLoadComp';

import WrapperPeriodForecast from '../wrapper/WrapperPeriodForecast';
import DayDetailPopup from './DayDetailPopup';
import styleConfig from './LeftPushMenu.Style';
import COMP_TYPE from './CompType';

const LeftPushMenu = ({
  id,
  theme
}) => {
  const isAir = useSelector(sSettings.isAir)
  , _refDetail = useRef()
  , [
    _hClickItem,
    _hCloseDetail
  ] = useMemo(() => [
    (item, event) => {
      getRefValue(_refDetail).setItem(item);
    },
    () => {
      getRefValue(_refDetail).close();
    }
  ], [])
  , CompOrBtOrErrEl = useLoadComp('CHARTS', COMP_TYPE.CTB)
  , STYLE = theme.createStyle(styleConfig);

  return (
    <div id={id} style={STYLE.ROOT_DIV} >
       <WrapperPeriodForecast
          onUpdate={_hCloseDetail}
          onClickItem={_hClickItem}
       />
       <DayDetailPopup
          refEl={_refDetail}
          onClose={_hCloseDetail}
        />
        {cloneUiElement(CompOrBtOrErrEl, { isAir })}
    </div>
  );
}

export default LeftPushMenu
