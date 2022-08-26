import {
  useSelector,
  useEffect
} from '../uiApi';

import PeriodForecast from '../views/PeriodForecast';
import { sForecast } from '../../flux/selectors';

const S_DAY = { cursor: 'pointer' };

const WrapperPeriodForecast = ({
  onClickItem,
  onUpdate
}) => {
  const forecast = useSelector(sForecast.forecast);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (forecast) {
      onUpdate()
    }
  }, [forecast])
  // onUpdate
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <PeriodForecast
       dayStyle={S_DAY}
       forecast={forecast}
       onClickItem={onClickItem}
    />
  );
};

export default WrapperPeriodForecast
