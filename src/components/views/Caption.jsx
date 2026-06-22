import { joinByCollon2 } from '../../utils/arrFn';

const CL_SELECT_NONE = 'select-none'
, S_DIV = {
  display: 'inline',
  color: '#795548',
  width: '100%',
  paddingLeft: 8,
  marginBottom: 8,
  borderBottom: '3px solid #795548',
  fontSize: '24px',
  fontWeight: 'bold',
};

const Caption = (props) => {
  const { city } = props.forecast || {}
  , { name='Forecast', country } = city || {};
  return (
    <div
      className={CL_SELECT_NONE}
      style={{...S_DIV, ...props.style}}
    >
      {joinByCollon2(name, country)}
    </div>
  );
};

export default Caption
