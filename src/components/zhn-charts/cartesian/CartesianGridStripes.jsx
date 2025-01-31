import {
  getStripeLineDimension,
  crStripeRectProps
} from './CartesianGridRenderFn';

const _fCartesianGridStripes = (
  crLineDimension,
  crLineProps
) => (props) => (
  <g className={props.className}>
    {props.points.map((entry, i) => {
      const lineDimension = crLineDimension(
        props,
        entry,
        i
      );

      return lineDimension > 0 ? (
        <rect
          key={`react-${i}`}
          {...crLineProps(props, entry, lineDimension)}
          {...crStripeRectProps(props.arrFill, i, props.fillOpacity)}
      />) : null;
    })}
  </g>
)
, _crVerticalStripesLineDimension = (
  props,
  entry,
  i
) => getStripeLineDimension(
  props.x0,
  entry,
  i,
  props.points
)
, _crStripeProps = (x, y, width, height) => ({
  x,
  y,
  width,
  height
})
, _crVerticalStripesProps = (
  props,
  entry,
  lineWidth
) => _crStripeProps(
  entry,
  props.y,
  lineWidth,
  props.height
)
, _crHorizontalStripesLineDimension = (
  props,
  entry,
  i
) => getStripeLineDimension(
  props.y0,
  entry,
  i,
  props.points
)
, _crHorizontalStripesProps = (
  props,
  entry,
  lineHeight
) => _crStripeProps(
  props.x,
  entry,
  props.width,
  lineHeight
);

export const CartesianGridVerticalStripes = _fCartesianGridStripes(
  _crVerticalStripesLineDimension,
  _crVerticalStripesProps
)
export const CartesianGridHorizontalStripes = _fCartesianGridStripes(
  _crHorizontalStripesLineDimension,
  _crHorizontalStripesProps
)
