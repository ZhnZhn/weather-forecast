import { CL_BG } from '../styleFn';

import useLayoutButton from '../hooks/useLayoutButton';
import useHotKey from '../hotkeys/useHotKey';
import {
  HK_FORECAST,
  HK_SETTINGS
} from '../hotkeys/hotkeys';

import HamburgerButton from '../zhn/HamburgerButton';
import ButtonCircle from '../zhn/ButtonCircle';
import ProviderLink from '../elements/ProviderLink';

import ProgressLoading from './ProgressLoading';
import GitHubLink from './GitHubLink';

import {
  toggleLayout,
  showSettings
} from '../../flux/handlers';

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
  const [
    isActiveForecats,
    hForecast
  ] = useLayoutButton(
    "isPopupForecast",
    toggleLayout
  )
  , [
    isActiveSettings,
    hSettings
  ] = useLayoutButton(
    "isSettings",
    showSettings
  );

  useHotKey(HK_FORECAST, hForecast)
  useHotKey(HK_SETTINGS, hSettings)

  return (
    <header
       role="banner"
       className={CL_BG}
       style={style}
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
         isActive={isActiveForecats}
         style={S_BT_CIRCLE}
         caption="F"
         title="Toggle Forecast Popup"
         onClick={hForecast}
       />
       <ButtonCircle
         isActive={isActiveSettings}
         style={S_BT_CIRCLE}
         caption="S"
         title="Open Settings Dialog"
         onClick={hSettings}
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
