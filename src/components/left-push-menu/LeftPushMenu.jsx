import {
  useSelector,
  cloneUiElement,
  useRef,
  useMemo,
  getRefValue
} from '../uiApi';

import { CL_BG } from '../styleFn';
import { sSettings } from '../../flux/selectors';
import useLoadComp from './useLoadComp';

import WrapperPeriodForecast from '../wrapper/WrapperPeriodForecast';
import DayDetailPopup from './DayDetailPopup';
import COMP_TYPE from './CompType';

const CL_LEFT_PUSH_MENU = `${CL_BG} left-push-menu`;

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
  , CompOrBtOrErrEl = useLoadComp('CHARTS', COMP_TYPE.CTB);

  return (
    <div
      id={id}
      className={CL_LEFT_PUSH_MENU}
    >
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
