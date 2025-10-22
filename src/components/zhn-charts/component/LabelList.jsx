import {
  isArr,
  isNullOrUndef,
} from '../../../utils/isTypeFn';

import { Label } from './Label';
import { Layer } from '../container/Layer';
import { getValueByDataKey } from '../util/ChartUtils';

const CL_LABEL_LIST = "recharts-label-list";

const defaultProps = {
  valueAccessor: (entry) => {
    const { value } = entry || {};
    return isArr(value)
      ? value[value.length-1]
      : value
  }
};

export const LabelList = (
  props
) => {
  const {
    data,
    valueAccessor,
    dataKey,
    clockWise,
    id,
    textBreakAll,
    ...restProps
  } = props;

  return data && data.length ? (
    <Layer className={CL_LABEL_LIST}>
      {data.map((entry, index) => {
          const value = isNullOrUndef(dataKey)
            ? valueAccessor(entry, index)
            : getValueByDataKey(entry && entry.payload, dataKey)
          , idProps = isNullOrUndef(id)
            ? {}
            : { id: `${id}-${index}` };
          return (
            <Label
              key={`label-${index}`}
              {...restProps}
              {...idProps}
              parentViewBox={entry.parentViewBox}
              index={index}
              value={value}
              textBreakAll={textBreakAll}
              viewBox={Label.parseViewBox(isNullOrUndef(clockWise) ? entry : { ...entry, clockWise })}
            />
          );
      })}
    </Layer>
  ) : null;
}

LabelList.displayName = 'LabelList';
LabelList.defaultProps = defaultProps;
