import { isNumber } from '../util/DataUtils';

export const crAxisComponent = (
  axisType,
  AxisComp
) => ({
  axisType,
  AxisComp
});

export const isLayoutHorizontal = (
  layout
) => layout === 'horizontal'
export const isLayoutVertical = (
  layout
) => layout === 'vertical'
export const isLayoutCentric = (
  layout
) => layout === 'centric'


export const getDisplayedData = (
  data, {
  graphicalItems,
  dataStartIndex,
  dataEndIndex },
  item
) => {
  const itemsData = (graphicalItems || [])
    .reduce((result, child) => {
      const itemData = child.props.data;
      return itemData && itemData.length
        ? [...result, ...itemData]
        : result;
  }, []);
  if (itemsData && itemsData.length > 0) {
    return itemsData;
  }
  if (item && item.props && item.props.data && item.props.data.length > 0) {
    return item.props.data;
  }
  if (data && data.length && isNumber(dataStartIndex) && isNumber(dataEndIndex)) {
    return data.slice(dataStartIndex, dataEndIndex + 1);
  }
  return [];
};

export const getDefaultDomainByAxisType = (
  axisType
) => axisType === 'number'
  ? [0, 'auto']
  : void 0;
