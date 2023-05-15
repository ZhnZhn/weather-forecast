import { Layer } from '../container/Layer';
import { filterProps } from '../util/ReactUtils';

const CL_ERR_BAR = "recharts-errorBar"
, CL_ERR_BARS = `${CL_ERR_BAR}s`;

const _isArr = Array.isArray;
const _crLine = (
  x1,
  y1,
  x2,
  y2
) => ({
  x1,
  y1,
  x2,
  y2
});


export const ErrorBar = (
  props
) => {
  const {
    offset,
    layout,
    width,
    dataKey,
    data,
    dataPointFormatter,
    xAxis,
    yAxis,
    ...restProps
  } = props
  , svgProps = filterProps(restProps)
  , errorBars = data.map((entry, i) => {
      const {
        x,
        y,
        value,
        errorVal
      } = dataPointFormatter(entry, dataKey);
      if (!errorVal) {
        return null;
      }

      const lineCoordinates = []
      , [
        lowBound,
        highBound
      ] = _isArr(errorVal)
        ? errorVal
        : [errorVal, errorVal];

      if (layout === 'vertical') {
        // error bar for horizontal charts, the y is fixed, x is a range value
        const {
          scale
        } = xAxis
        , yMid = y + offset
        , yMin = yMid + width
        , yMax = yMid - width
        , xMin = scale(value - lowBound)
        , xMax = scale(value + highBound);

        // the right line of |--|
        lineCoordinates.push(_crLine(
          xMax, yMin, xMax, yMax
        ));
        // the middle line of |--|
        lineCoordinates.push(_crLine(
          xMin, yMid, xMax, yMid
        ));
        // the left line of |--|
        lineCoordinates.push(_crLine(
          xMin, yMin, xMin, yMax
        ));

      } else if (layout === 'horizontal') {
        // error bar for horizontal charts, the x is fixed, y is a range value
        const {
         scale
        } = yAxis
        , xMid = x + offset
        , xMin = xMid - width
        , xMax = xMid + width
        , yMin = scale(value - lowBound)
        , yMax = scale(value + highBound);

        // the top line
        lineCoordinates.push(_crLine(
          xMin, yMax, xMax, yMax
        ));
        // the middle line
        lineCoordinates.push(_crLine(
          xMid, yMin, xMid, yMax
        ));
        // the bottom line
        lineCoordinates.push(_crLine(
          xMin, yMin, xMax, yMin
        ));
      }
      return (
        <Layer
           className={CL_ERR_BAR}
           key={`bar-${i}`}
           {...svgProps}
        >
          {lineCoordinates.map((coordinates, index) => (
             <line
               {...coordinates}
               key={`line-${index}`}
             />
          ))}
        </Layer>
      );
  });
  return (
    <Layer className={CL_ERR_BARS}>
      {errorBars}
    </Layer>
  );
}

ErrorBar.defaultProps = {
  stroke: 'black',
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: 'horizontal'
};
ErrorBar.displayName = 'ErrorBar';
