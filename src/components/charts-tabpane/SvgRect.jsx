import { Svg100WithTitle } from '../zhn/Svg';

const S_SVG = {
  position: 'relative',
  top: 2,
  display: 'inline-block',
  width: 18,
  height: 18
};

const SvgRest = ({
  stroke='green',
  fill=stroke
}) => (
  <Svg100WithTitle
     title="Rest Marker"
     w="18"
     aria-labelledby="title"
     style={S_SVG}
  >
    <rect
      x="3" y="0" width="11" height="18" rx="2"
      stroke={stroke} fill={fill}
    />
  </Svg100WithTitle>
);

export default SvgRest
