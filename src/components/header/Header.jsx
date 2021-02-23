import React from '../_react'
//import PropTypes from 'prop-types';
import useTheme from '../hooks/useTheme'

import ProgressLoading from './ProgressLoading';
import HamburgerButton from '../zhn-atoms/HamburgerButton';
import ButtonCircle from '../zhn-atoms/ButtonCircle';
import ProviderLink from '../elements/ProviderLink'
import GitHubLink from './GitHubLink'
import styleConfig from './Header.Style';

import handlers from '../../flux/handlers';

const { toggleLayout, showSettings } = handlers;

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
  const _STYLE = useTheme(styleConfig);

  return (
    <header
       role="banner"
       style={{...style, ..._STYLE.HEADER}}
    >
      <ProgressLoading />
      <HamburgerButton
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
         storeKey="isPopupForecast"
         onClick={toggleLayout}
       />
       <ButtonCircle
         style={S.BT_CIRCLE}
         caption="S"
         title="Open Settings Dialog"
         storeKey="isSettings"
         onClick={showSettings}
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
