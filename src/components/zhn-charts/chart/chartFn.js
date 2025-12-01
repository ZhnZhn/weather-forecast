import { isNotEmptyArr } from '../../../utils/isTypeFn';

export const originCoordinate = { x: 0, y: 0 }

export const crAxisComponent = (
  axisType,
  AxisComp
) => ({
  axisType,
  AxisComp
})

export const getDisplayedData = (
  data,
  { graphicalItems },
  item
) => {
  const itemsData = (graphicalItems || [])
    .reduce((result, child) => {
      const itemData = child.props.data;
      return isNotEmptyArr(itemData)
        ? [...result, ...itemData]
        : result;
  }, []);
  return isNotEmptyArr(itemsData)
    ? itemsData
    : item && item.props && isNotEmptyArr(item.props.data)
    ? item.props.data
    : isNotEmptyArr(data)
    ? data
    : [];
}

export const getDefaultDomainByAxisType = (
  axisType
) => axisType === 'number'
  ? [0, 'auto']
  : void 0
