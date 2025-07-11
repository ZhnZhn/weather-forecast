import { useStore  } from './uiApi';

import useHotKeys from './hotkeys/useHotKeys';

import ModalDialogContainer from './containers/ModalDialogContainer';
import Header from './header/Header';
import LeftPushMenu from './left-push-menu/LeftPushMenu';
import LeafletMap from './maps/LeafletMap';
import PopupForecast from './popups/Forecast';

const MAP_ID = 'map_id';
const PUSH_MENU_ID = 'left_push_menu';

const S_HEADER = {
   width:'100%',
   height: '3rem',
   lineHeight: '3rem',
   borderBottom: '1px solid #999',
   cursor: 'auto'
}
, S_MAP = {
  width: '100%',
  height: 'calc(100vh - 3rem)'
}
, S_FLY_ROOT_DIV = {
  position: 'absolute',
  top: 70,
  left: 170,
  padding: '10px 5px 5px 4px',
  border: '1px solid #999',
  borderRadius: 5,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px',
  zIndex: 1500
}

const WeatherSaga = () => {
  const store = useStore();

  useHotKeys()

  return (
      <div>
        <ModalDialogContainer store={store}/>
        <Header style={S_HEADER} />
        <div>
          <LeftPushMenu
             id={PUSH_MENU_ID}
          />
          <LeafletMap
             id={MAP_ID}
             style={S_MAP}
          />
          <PopupForecast
             style={S_FLY_ROOT_DIV}
          />
        </div>
      </div>
  );
}

export default WeatherSaga
