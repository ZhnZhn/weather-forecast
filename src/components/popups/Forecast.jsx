import { useSelector } from '../uiApi';
import useTheme from '../hooks/useTheme';

import { sForecast } from '../../flux/selectors';

import DragablePopup from '../containers/DragablePopup';
import PeriodForecast from '../views/PeriodForecast';
import styleConfig from './Forecast.Style';

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
  , _style = useTheme(styleConfig)
  , { cod } = forecast || {}
  , _isNotFoundMsg = cod && (''+cod) !== OK_CODE;

  return (
    <DragablePopup
        style={{...style, ..._style.ROOT_DIV}}
        storeKey="isPopupForecast"
     >
      <PeriodForecast
          forecast={forecast}
          captionStyle={S_CAPTION}
      />
      {_isNotFoundMsg && <NotFoundMsg />}
    </DragablePopup>
  );
};

export default Forecast
