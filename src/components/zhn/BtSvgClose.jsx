import Svg100 from './svg/Svg100';

const CL_SVG_CLOSE = "bt-svg-close"
, STROKE_LINECAP_ROUND_PROPS = ({
  strokeWidth: "2",
  strokeLinecap: "round"
})
, S_SVG = {
  padding: 3
};

const BtSvgClose = ({
  style,
  color,
  onClose
}) => (
  <button
    type="button"
    aria-label="Close"
    tabIndex="-1"
    className={CL_SVG_CLOSE}
    style={style}
    onClick={onClose}
  >
    <Svg100
      {...STROKE_LINECAP_ROUND_PROPS}
      w="12"
      style={{...S_SVG, stroke: color }}
    >
       <path d="M 0,0 L 12,12" />
       <path d="M 12,0 L 0,12" />
    </Svg100>
  </button>
);


export default BtSvgClose;
