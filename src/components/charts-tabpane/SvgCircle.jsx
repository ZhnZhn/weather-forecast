import { Svg100WithTitle } from '../zhn/Svg';

const S_SVG = {
  position: 'relative',
  top: 4,
  display: 'inline-block',
  width: 18,
  height: 18
};

const SvgCircle = ({
  stroke,
  fill
}) => (
  <Svg100WithTitle
     title="Circle Marker"
     w="18"
     style={S_SVG}
  >
    <circle
      fill={fill}
      stroke={stroke}
      strokeWidth="2"
      r="6"
      cx="9"
      cy="9"
    />
  </Svg100WithTitle>
);


export default SvgCircle
