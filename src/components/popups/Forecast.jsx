import { useSelector } from '../uiApi';

import { sForecast } from '../../flux/selectors';

import DraggablePopup from '../containers/DraggablePopup';
import PeriodForecast from '../views/PeriodForecast';
import { COLOR_BROWN } from '../styles/Color';

const S_CAPTION = { marginRight: 40 }
, NOT_FOUND_MSG = 'Forecast for place not found'
, OK_CODE = '200';

const NotFoundMsg = () => (
  <div>
    <span>{NOT_FOUND_MSG}</span>
  </div>
);

const Forecast = ({ style }) => {
  const forecast = useSelector(sForecast.forecast)
  , { cod } = forecast || {}
  , _isNotFoundMsg = cod && (''+cod) !== OK_CODE;

  return (
    <DraggablePopup
        style={style}
        storeKey="isPopupForecast"
        color={COLOR_BROWN}
     >
      <PeriodForecast
          forecast={forecast}
          captionStyle={S_CAPTION}
      />
      {_isNotFoundMsg && <NotFoundMsg />}
    </DraggablePopup>
  );
};

export default Forecast
