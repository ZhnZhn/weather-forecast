import React from './_react'
//import PropTypes from 'prop-types';

import ThemeContext from './hoc/ThemeContext'
import theme from './styles/theme';
import ModalDialogContainer from './containers/ModalDialogContainer'
import Header from './header/Header';
import LeftPushMenu from './left-push-menu/LeftPushMenu';
import LeafletMap from './maps/LeafletMap';
import PopupForecast from './popups/Forecast';

const { Component } = React

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
    top: '30px',
    left: '50px',
    padding: '10px 5px 5px 4px',
    backgroundColor: '#808080',
    border: '1px solid #999',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 12px',
    zIndex: 500
  }
};


class WeatherSaga extends Component{
  /*
  static propTypes = {
    store: PropTypes.object
  }
  */

  constructor(props){
    super(props)
    const layout = props.store.getState().layout;
    this.layout = layout;
    this.isPushMenu = layout.isPushMenu
    this.themeName = layout.themeName
  }
  componentDidMount(){
    this.unsubsribe = this.props.store.subscribe(this._onStore)
    this.mapEl = document.getElementById(MAP_ID)
    this.menuEl = document.getElementById(PUSH_MENU_ID)
  }
  _onStore = () => {
    const { store } = this.props
        , layout = store.getState().layout;
    if (layout !== this.layout){
      if (layout.isPushMenu !== this.isPushMenu){
         if (this.isPushMenu){
           this.mapEl.style.transform = 'translateX(0px)'
           this.mapEl.style.width = '100vw'
           this.menuEl.style.transform = `translateX(-100%)`
         } else {
           const width = this.menuEl.getBoundingClientRect().width
           this.mapEl.style.transform = `translateX(${width}px)`
           this.mapEl.style.width = `calc(100vw - ${width}px)`
           this.menuEl.style.transform = 'translateX(0px)'
         }
         this.isPushMenu = layout.isPushMenu
      } else if ( layout.themeName !== this.themeName){
        //console.log('WeatherSaga forceUpdate')
        this.forceUpdate()
        this.themeName = layout.themeName
      }
      this.layout = layout
    }
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  render(){
    const { store } = this.props;
    return (
      <ThemeContext.Provider value={theme} >
        <div>
          <ModalDialogContainer
            store={store}
          />
          <Header
             rootStyle={S.HEADER}
             store={store}
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
               rootStyle={S.FLY_ROOT_DIV}
               isShow={true}
               store={store}
            />
          </div>
        </div>
      </ThemeContext.Provider>
    )
  }
}

export default WeatherSaga
