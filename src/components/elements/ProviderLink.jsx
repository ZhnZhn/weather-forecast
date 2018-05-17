import React from '../_react'

const CL = "data-provider-link";

const S = {
  LINK: {
    color: '#ff9800'
  }
};

const ProviderLink = ({
  className,
  style,
  prefixCL,
  prefix='Powered By '
}) =>
<div className={className} style={style}>
  <span className={prefixCL}>
    {prefix}
  </span>
  <a
     className={CL}
     style={S.LINK}
     href="https://openweathermap.org/"
  >
     OpenWeatherMap
  </a>
</div>

export default ProviderLink
