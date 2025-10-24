import {
  memo,
  crProps,
  setDisplayNameTo
} from '../../uiApi';

import { isLayoutHorizontal } from '../util/ChartUtils';
import { renderItems } from './DefaultLegendContentFn';
import { CL_DF_LEGEND } from '../CL';

const DF_PROPS = {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'middle',
  inactiveColor: '#ccc'
};

export const DefaultLegendContent = memo((
  props
) => {
  const _props = crProps(DF_PROPS, props);
  return _props.payload && _props.payload.length ? (
    <ul
      className={CL_DF_LEGEND}
      style={{
        padding: 0,
        margin: 0,
        textAlign: isLayoutHorizontal(_props.layout)
          ? _props.align
          : 'left'
      }}
    >
      {renderItems(_props)}
    </ul>
  ) : null;
})

setDisplayNameTo(DefaultLegendContent, "Legend")
