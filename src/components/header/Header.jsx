import React from '../_react'
//import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import useTheme from '../hooks/useTheme'

import ProgressLoading from './ProgressLoading';
import HamburgerButton from '../zhn-atoms/HamburgerButton';
import ButtonCircle from '../zhn-atoms/ButtonCircle';
import ProviderLink from '../elements/ProviderLink'
import GitHubLink from './GitHubLink'
import styleConfig from './Header.Style';

import { toggleLayout } from '../../flux/layout/actions';
import { showModal } from '../../flux/modal/actions';

const { useCallback } = React;

const TITLE = "Weather v0.2.0";

const CL = {
  TITLE: 'header__title',
  LINK_PREF: 'header__link-pref',
  LINK: 'header__link-provider',
  GITHUB: 'header__github-link'
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

const Header = ({ style }) => {
  const dispatch = useDispatch()
  , _hToggleLayout = useCallback(storeKey => {
    dispatch(toggleLayout(storeKey))
  }, [dispatch])
  , _hSettings = useCallback(storeKey => {
    dispatch(toggleLayout(storeKey))
    dispatch(showModal('SETTINGS'))
  }, [dispatch])
  , _STYLE = useTheme(styleConfig);

  return (
    <header
       role="banner"
       style={{...style, ..._STYLE.HEADER}}
    >
      <ProgressLoading />
      <HamburgerButton
         storeKey="isPushMenu"
         onClick={_hToggleLayout}
      />
      <span className={CL.TITLE}>
        {TITLE}
      </span>
      <ButtonCircle
         style={S.BT_CIRCLE}
         caption="F"
         title="Toggle Forecast Popup"
         storeKey="isPopupForecast"
         onClick={_hToggleLayout}
       />
       <ButtonCircle
         style={S.BT_CIRCLE}
         caption="S"
         title="Open Settings Dialog"
         storeKey="isSettings"
         onClick={_hSettings}
       />
       <ProviderLink
         className={CL.LINK}
         prefixCL={CL.LINK_PREF}
       />
       <GitHubLink
         className={CL.GITHUB}
         title="GitHub Repository"
         href="https://github.com/zhnzhn/weather-forecast"
       />
     </header>
  );
}

export  default Header
