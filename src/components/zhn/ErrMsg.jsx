
const S_ERR_MSG = {
  color: '#080101',
  fontWeight: 'bold',
  fontSize: '18px'
};

const ErrMsg = ({
  style,
  msg
}) => (
  <div style={{...S_ERR_MSG, ...style}}>
    {msg ? msg + '.' : msg}
  </div>
);

export default ErrMsg
