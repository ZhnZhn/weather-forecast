import {
  isArr,
  isFn,
  isNullOrUndef,
  isObj
} from '../../../utils/isTypeFn';

import {
  isValidElement,
  cloneUiElement
} from '../../uiApi';

import { Label } from './Label';
import { Layer } from '../container/Layer';
import {
  findAllByType,
  filterProps
} from '../util/ReactUtils';
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

  if (!data || !data.length) {
    return null;
  }
  return (
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
              {...filterProps(entry, true)}
              {...restProps}
              {...idProps}
              parentViewBox={entry.parentViewBox}
              index={index}
              value={value}
              textBreakAll={textBreakAll}
              viewBox={Label.parseViewBox(isNullOrUndef(clockWise) ? entry : { ...entry, clockWise })}
              key={`label-${index}`}
            />
          );
      })}
   </Layer>
  );
}

const KEY_LABELLIST_IMPLICIT = "labelList-implicit";
function _parseLabelList(
  label,
  data
) {
  if (!label) {
    return null;
  }
  if (label === true) {
    return (
      <LabelList
        key={KEY_LABELLIST_IMPLICIT}
        data={data}
      />
    );
  }
  if (isValidElement(label) || isFn(label)) {
    return (
      <LabelList
        key={KEY_LABELLIST_IMPLICIT}
        data={data}
        content={label}
      />
    );
  }
  if (isObj(label)) {
    return (
      <LabelList
        data={data}
        {...label}
        key={KEY_LABELLIST_IMPLICIT}
      />
    );
  }
  return null;
}

function renderCallByParent(
  parentProps,
  data,
  checkPropsLabel = true
) {
  if (!parentProps || (!parentProps.children && checkPropsLabel && !parentProps.label)) {
    return null;
  }
  const { children } = parentProps
  , explicitChildren = findAllByType(
      children,
      LabelList
    ).map((child, index) => cloneUiElement(child, {
        data
    }, `labelList-${index}`));

  if (!checkPropsLabel) {
    return explicitChildren;
  }
  const implicitLabelList = _parseLabelList(parentProps.label, data);
  return [
    implicitLabelList,
    ...explicitChildren
  ];
}

LabelList.displayName = 'LabelList';
LabelList.renderCallByParent = renderCallByParent;
LabelList.defaultProps = defaultProps;
