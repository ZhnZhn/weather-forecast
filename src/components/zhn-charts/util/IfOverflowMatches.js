export const ifOverflowMatches = (
  props,
  value
) => {
  const _props = props || {}
  , _ifOverflow = _props.alwaysShow
    ? 'extendDomain'
    : _props.ifOverflow;
  return _ifOverflow === value;
};
