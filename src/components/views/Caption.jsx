
const CL_SELECT_NONE = 'select-none'
, ROOT_DIV = {
  display: 'inline',
  color: '#795548',
  width: '100%',
  paddingLeft: 8,
  marginBottom: 8,
  borderBottom: '3px solid #795548',
  fontSize: '24px',
  fontWeight: 'bold',
};

const Caption = ({
  style,
  forecast
}) => {
  const { city } = forecast || {}
  , { name='Forecast', country } = city || {}
  , _caption = [name, country]
      .filter(Boolean)
      .join(':');
  return (
    <div
      className={CL_SELECT_NONE}
      style={{...ROOT_DIV, ...style}}
    >
      {_caption}
    </div>
  );
};

export default Caption
