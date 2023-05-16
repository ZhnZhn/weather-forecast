import {
  isValidElement,
  cloneElement
} from '../../uiApi';

import _last from 'lodash/last';
import {
  _isArr,
  _isNil,
  _isFn,
  _isObject
} from '../util/FnUtils';

import { Label } from './Label';
import { Layer } from '../container/Layer';
import {
  findAllByType,
  filterProps
} from '../util/ReactUtils';
import { getValueByDataKey } from '../util/ChartUtils';

const CL_LABEL_LIST = "recharts-label-list";

const defaultProps = {
  valueAccessor: (entry) => _isArr(entry.value)
    ? _last(entry.value)
    : entry.value
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
          const value = _isNil(dataKey)
            ? valueAccessor(entry, index)
            : getValueByDataKey(entry && entry.payload, dataKey)
          , idProps = _isNil(id)
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
              viewBox={Label.parseViewBox(_isNil(clockWise) ? entry : { ...entry, clockWise })}
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
  if (isValidElement(label) || _isFn(label)) {
    return (
      <LabelList
        key={KEY_LABELLIST_IMPLICIT}
        data={data}
        content={label}
      />
    );
  }
  if (_isObject(label)) {
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
    ).map((child, index) => cloneElement(child, {
        data,
        key: `labelList-${index}`
    }));

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
