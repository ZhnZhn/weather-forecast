const _isArr = Array.isArray;

const _getPayload = ({
  active,
  payload
}) => active && _isArr(payload)
  ? (payload[0] || {}).payload
  : void 0;

const fTooltip = crTooltip => props => {
  const payload = _getPayload(props);
  return payload
    ? crTooltip(payload, props)
    : null;
};

export default fTooltip
