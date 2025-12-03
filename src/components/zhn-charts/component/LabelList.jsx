import {
  isArr,
  isNotEmptyArr
} from '../../../utils/isTypeFn';

import { setDisplayNameTo } from '../../uiApi';

import { Label } from './Label';
import { Layer } from '../container/Layer';
import { getValueByDataKey } from '../util/ChartUtils';

const CL_LABEL_LIST = "recharts-label-list";

const DF_LABEL_LIST_PROPS = {
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

  return isNotEmptyArr(data) ? (
    <Layer className={CL_LABEL_LIST}>
      {data.map((entry, index) => {
          const value = dataKey == null
            ? valueAccessor(entry, index)
            : getValueByDataKey(entry && entry.payload, dataKey);
          return (
            <Label
              key={`label-${index}`}
              {...restProps}
              id={id == null ? void 0: `${id}-${index}`}
              parentViewBox={entry.parentViewBox}
              index={index}
              value={value}
              textBreakAll={textBreakAll}
              viewBox={Label.parseViewBox(clockWise == null
                 ? entry
                 : { ...entry, clockWise }
              )}
            />
          );
      })}
    </Layer>
  ) : null;
}

setDisplayNameTo(
  LabelList,
  "LabelList",
  DF_LABEL_LIST_PROPS
)
