import React from '../_react'
//import PropTypes from 'prop-types';

import ProgressLoading from './ProgressLoading';
import HamburgerButton from '../zhn-atoms/HamburgerButton';
import ButtonCircle from '../zhn-atoms/ButtonCircle';
import ProviderLink from '../elements/ProviderLink'
import styleConfig from './Header.Style';

import { toggleLayout } from '../../flux/layout/actions';
import { showModal } from '../../flux/modal/actions';

import withTheme from '../hoc/withTheme';

const { Component } = React;

const TITLE = "Weather v0.2.0";

const CL = {
  TITLE: 'header__title',
  LINK_PREF: 'header__link-pref',
  LINK: 'header__link-provider'
};

const S = {
  BT_CIRCLE: {
    width: '1.8rem',
    height: '1.8rem',
    lineHeight: '1rem',
    marginLeft: '1rem',
    paddingTop: '0.3rem'
  }
};

class Header extends Component {

  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    store: PropTypes.shape({
      dispatch: PropTypes.func
    }),
    theme: PropTypes.shape({
      createStyle: PropTypes.func,
      setThemeName: PropTypes.func
    })
  }
  */

  _hForecast = (storeKey) => {
    const { store } = this.props
        , { dispatch } = store;
    dispatch(toggleLayout(storeKey))
  }

  _hSettings = (storeKey) => {
    const { store } = this.props
        , { dispatch } = store;
    dispatch(toggleLayout(storeKey))
    dispatch(showModal('SETTINGS'))
  }


  render(){
    const { rootStyle, store, theme } = this.props
       , _STYLE = theme.createStyle(styleConfig);
    return(
      <header
         role="banner"
         style={{...rootStyle, ..._STYLE.HEADER}}
      >
        <ProgressLoading store={store} />
        <HamburgerButton
           store={store}
           storeKey="isPushMenu"
           onClick={toggleLayout}
        />
        <span className={CL.TITLE}>
          {TITLE}
        </span>
        <ButtonCircle
           style={S.BT_CIRCLE}
           caption="F"
           title="Toggle Forecast Popup"
           store={store}
           storeKey="isPopupForecast"
           onClick={this._hForecast}
         />
         <ButtonCircle
           style={S.BT_CIRCLE}
           caption="S"
           title="Open Settings Dialog"
           store={store}
           storeKey="isSettings"
           onClick={this._hSettings}
         />
         <ProviderLink
           className={CL.LINK}
           prefixCL={CL.LINK_PREF}
         />
       </header>
    );
  }
}

export default withTheme(Header)
