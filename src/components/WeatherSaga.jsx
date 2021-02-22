import React from './_react'
//import PropTypes from 'prop-types';
import { useSelector, useStore } from 'react-redux'

import ThemeContext from './hoc/ThemeContext'
import theme from './styles/theme';
import ModalDialogContainer from './containers/ModalDialogContainer'
import Header from './header/Header';
import LeftPushMenu from './left-push-menu/LeftPushMenu';
import LeafletMap from './maps/LeafletMap';
import PopupForecast from './popups/Forecast';

const { useRef, useEffect } = React

const MAP_ID = 'map_id';
const PUSH_MENU_ID = 'left_push_menu';

const S = {
  HEADER : {
     width:'100%',
     height: '3rem',
     lineHeight: '3rem',
     borderBottom: '1px solid #999',
     cursor: 'auto'
  },
  MAP: {
    width: '100%',
    height: 'calc(100vh - 3rem)'
  },
  FLY_ROOT_DIV : {
    position: 'absolute',
    top: 30,
    left: 50,
    padding: '10px 5px 5px 4px',
    backgroundColor: '#808080',
    border: '1px solid #999',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px',
    zIndex: 500
  }
};


const _assign = Object.assign;

const WeatherSaga = () => {
  const _refMap = useRef()
  , _refMenu = useRef()
  , themeName = useSelector(state => state.layout.themeName)
  , isPushMenu = useSelector(state => state.layout.isPushMenu)
  , store = useStore();

  useEffect(()=>{
    _refMap.current = document.getElementById(MAP_ID)
    _refMenu.current = document.getElementById(PUSH_MENU_ID)
  }, [])

  useEffect(() => {
    if (isPushMenu){
      const width = _refMenu.current.getBoundingClientRect().width
      _assign(_refMap.current.style, {
        transform: `translateX(${width}px)`,
        width: `calc(100vw - ${width}px)`
      })
      _refMenu.current.style.transform = 'translateX(0px)'
    } else {
      _assign(_refMap.current.style, {
        transform: 'translateX(0px)',
        width: '100vw'
      })
      _refMenu.current.style.transform = `translateX(-100%)`
    }
  }, [isPushMenu])


  return (
    <ThemeContext.Provider value={theme} >
      <div>
        <ModalDialogContainer
          store={store}
        />
        <Header
           themeName={themeName}
           style={S.HEADER}
        />
        <div>
          <LeftPushMenu
             id={PUSH_MENU_ID}
             store={store}
          />
          <LeafletMap
              id={MAP_ID}
              rootStyle={S.MAP}
              store={store}
          />
          <PopupForecast
             style={S.FLY_ROOT_DIV}
          />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default WeatherSaga
