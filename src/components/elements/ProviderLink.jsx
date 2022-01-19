
const CL = "data-provider-link"
, S_LINK = { color: '#ff9800' };

const ProviderLink = ({
  className,
  style,
  prefixCL,
  prefix='Powered By '
}) => (
  <div className={className} style={style}>
    <span className={prefixCL}>
      {prefix}
    </span>
    <a
       className={CL}
       style={S_LINK}
       href="https://openweathermap.org/"
    >
       OpenWeatherMap
    </a>
  </div>
);

export default ProviderLink
