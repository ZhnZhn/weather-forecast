import { memo } from '../../uiApi';

import { renderItems } from './DefaultLegendContentFn';
import { CL_DF_LEGEND } from '../CL';

export const DefaultLegendContent = memo((
  props
) => {
  const {
    payload,
    layout,
    align
  } = props;
  if (!payload || !payload.length) {
    return null;
  }

  const finalStyle = {
    padding: 0,
    margin: 0,
    textAlign: layout === 'horizontal'
      ? align
      : 'left'
  };
  return (
    <ul
      className={CL_DF_LEGEND}
      style={finalStyle}
    >
      {renderItems(props)}
    </ul>
  );
})

DefaultLegendContent.displayName = 'Legend';
DefaultLegendContent.defaultProps = {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'middle',
  inactiveColor: '#ccc'
};
