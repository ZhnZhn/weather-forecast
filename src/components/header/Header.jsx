import useTheme from '../hooks/useTheme';

import ProgressLoading from './ProgressLoading';
import HamburgerButton from '../zhn-atoms/HamburgerButton';
import ButtonCircle from '../zhn-atoms/ButtonCircle';
import ProviderLink from '../elements/ProviderLink';
import GitHubLink from './GitHubLink';
import styleConfig from './Header.Style';

import handlers from '../../flux/handlers';

const {
  toggleLayout,
  showSettings
} = handlers;

const TITLE = "Weather v0.3.0";

const CL_TITLE = 'header__title'
, CL_LINK_PREF = 'header__link-pref'
, CL_LINK = 'header__link-provider'
, CL_GITHUB = 'header__github-link'

, S_BT_CIRCLE = {
  position: 'relative',
  top: '-2px',
  width: '1.8rem',
  height: '1.8rem',
  marginLeft: '1rem'
};

const Header = ({
  style
}) => {
  const TS = useTheme(styleConfig);

  return (
    <header
       role="banner"
       style={{...style, ...TS.HEADER}}
    >
      <ProgressLoading />
      <HamburgerButton
         storeKey="isPushMenu"
         onClick={toggleLayout}
      />
      <span className={CL_TITLE}>
        {TITLE}
      </span>
      <ButtonCircle
         style={S_BT_CIRCLE}
         caption="F"
         title="Toggle Forecast Popup"
         storeKey="isPopupForecast"
         onClick={toggleLayout}
       />
       <ButtonCircle
         style={S_BT_CIRCLE}
         caption="S"
         title="Open Settings Dialog"
         storeKey="isSettings"
         onClick={showSettings}
       />
       <ProviderLink
         className={CL_LINK}
         prefixCL={CL_LINK_PREF}
       />
       <GitHubLink
         className={CL_GITHUB}
         title="GitHub Repository"
         href="https://github.com/zhnzhn/weather-forecast"
       />
     </header>
  );
};

export  default Header
