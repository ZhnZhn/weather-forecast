
const _isArr = Array.isArray;

const getPayload = ({ active, payload }) => {
  if (!(active && _isArr(payload))) {
    return;
  }
  return (payload[0] || {}).payload;
};

export default getPayload
