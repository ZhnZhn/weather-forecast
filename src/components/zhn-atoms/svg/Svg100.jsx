import React from '../../_react';

const Svg100 = ({
  w,
  h=w,
  children,
  ...restProps
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox={`0 0 ${w} ${h}`}
    preserveAspectRatio="none"
    {...restProps}
  >
    {children}
  </svg>
);

export default Svg100
