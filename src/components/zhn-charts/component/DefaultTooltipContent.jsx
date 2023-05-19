import {
  memo,
  isValidElement
} from '../../uiApi';

import classNames from 'classnames';

import {
  _isArr,
  _isNil
} from '../util/FnUtils';

import { isNumOrStr } from '../util/DataUtils';

const CL_TOOLTIP_ITEM = "recharts-tooltip-item"
, CL_TOOLTIP_ITEM_NAME = `${CL_TOOLTIP_ITEM}-name`
, CL_TOOLTIP_ITEM_SEPARATOR = `${CL_TOOLTIP_ITEM}-separator`
, CL_TOOLTIP_ITEM_VALUE = `${CL_TOOLTIP_ITEM}-value`
, CL_TOOLTIP_ITEM_UNIT = `${CL_TOOLTIP_ITEM}-unit`
, CL_TOOLTIP_ITEM_LIST = `${CL_TOOLTIP_ITEM}-list`
, CL_DEFAULT_TOOLTIP = "recharts-default-tooltip"
, CL_TOOLTIP_LABEL = "recharts-tooltip-label";

const _defaultFormatter = (
  value
) => _isArr(value)
  && isNumOrStr(value[0])
  && isNumOrStr(value[1])
  ? value.join(' ~ ')
  : value;

const _renderContent = (
  props
) => {
  const {
    payload,
    separator,
    formatter,
    itemStyle,
    itemSorter
  } = props;
  if (payload && payload.length) {
    const listStyle = {
      padding: 0,
      margin: 0
    }
    , items = (itemSorter
      //? _sortBy(payload, itemSorter)
      ? payload.sort(itemSorter)
      : payload
    ).map((entry, i) => {
        if (entry.type === 'none') {
          return null;
        }
        const finalItemStyle = {
          display: 'block',
          paddingTop: 4,
          paddingBottom: 4,
          color: entry.color || '#000',
          ...itemStyle
        };
        const finalFormatter = entry.formatter
          || formatter
          || _defaultFormatter;
        let {
          value,
          name
        } = entry;
        if (finalFormatter && value != null && name != null) {
          const formatted = finalFormatter(
            value,
            name,
            entry,
            i,
            payload
          );
          if (_isArr(formatted)) {
            [value, name] = formatted;
          } else {
            value = formatted;
          }
        }
        return (
          <li
            className={CL_TOOLTIP_ITEM}
            key={`tooltip-item-${i}`}
            style={finalItemStyle}
           >
            {isNumOrStr(name) ? <span className={CL_TOOLTIP_ITEM_NAME}>{name}</span> : null}
            {isNumOrStr(name) ? <span className={CL_TOOLTIP_ITEM_SEPARATOR}>{separator}</span> : null}
            <span className={CL_TOOLTIP_ITEM_VALUE}>
              {value}
            </span>
            <span className={CL_TOOLTIP_ITEM_UNIT}>
              {entry.unit || ''}
            </span>
         </li>
        );
    });

    return (
      <ul
        className={CL_TOOLTIP_ITEM_LIST}
        style={listStyle}
      >
        {items}
      </ul>
    );
  }
  return null;
}

export const DefaultTooltipContent = memo((props) => {
  const {
    wrapperClassName,
    contentStyle,
    labelClassName,
    labelStyle,
    label,
    labelFormatter,
    payload
  } = props
  , finalStyle = {
      margin: 0,
      padding: 10,
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      whiteSpace: 'nowrap',
      ...contentStyle,
  }
  , finalLabelStyle = {
      margin: 0,
      ...labelStyle,
  }
  , hasLabel = !_isNil(label);
  let finalLabel = hasLabel ? label : '';
  const wrapperCN = classNames(CL_DEFAULT_TOOLTIP, wrapperClassName)
  , labelCN = classNames(CL_TOOLTIP_LABEL, labelClassName);

  if (hasLabel
    && labelFormatter
    && payload !== void 0
    && payload !== null
  ) {
    finalLabel = labelFormatter(label, payload);
  }

  return (
    <div className={wrapperCN} style={finalStyle}>
      <p className={labelCN} style={finalLabelStyle}>
        {isValidElement(finalLabel)
           ? finalLabel
           : `${finalLabel}`
        }
      </p>
   {_renderContent(this.props)}
   </div>
  );
})

DefaultTooltipContent.displayName = 'DefaultTooltipContent';
DefaultTooltipContent.defaultProps = {
  separator: ' : ',
  contentStyle: {},
  itemStyle: {},
  labelStyle: {}
};
