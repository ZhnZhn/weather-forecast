
import OpenClose from '../zhn-atoms/OpenClose';
import C from '../styles/Color';

import Caption from './Caption';
import DayItem from './DayItem';

const S_ROOT = { cursor: 'auto' }
, S_OPEN_CLOSE = { lineHeight: 1.5 };

const PeriodForecast = ({
  captionStyle,
  dayStyle,
  forecast,
  onClickItem
}) => {
  const { list } = forecast || {};
  return (
    <div style={S_ROOT}>
      <OpenClose
        isInitial={true}
        style={S_OPEN_CLOSE}
        openColor={C.BROWN}
        isClickableCompAfter={true}
        CompAfter={<Caption
           style={captionStyle}
           forecast={forecast}
        />}
      >
        <div>
         {
          (list||[]).map((item, index) => (
            <DayItem key={index}
              style={dayStyle}
              item={item}
              onClick={onClickItem}
            />
          ))
         }
        </div>
      </OpenClose>
    </div>
  );
};

export default PeriodForecast
