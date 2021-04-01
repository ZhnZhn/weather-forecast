import React from '../_react';

import getPayload from './getPayload';
import TooltipContent from './TooltipContent';
import TooltipRow1 from './TooltipRow1';

const TooltipUvi = (props) => {
  const payload = getPayload(props);
  if (!payload) { return null; }

  const {
    day, uvi
  } = payload;

  return (
    <TooltipContent caption={`${day}:00`}>
      <TooltipRow1 t="UV index" v={uvi}/>
    </TooltipContent>
  );
}

export default TooltipUvi
