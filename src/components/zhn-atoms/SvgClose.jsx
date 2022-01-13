import Svg100 from './svg/Svg100';

const CL_SVG_CLOSE = "svg-close"
, S_SVG = { padding: 3 };

const SvgClose = ({
  style,
  onClose
}) => (
  <div
    className={CL_SVG_CLOSE}
    style={style}
    onClick={onClose}
  >
   <Svg100 w="12" style={S_SVG}>
      <path d="M 0,0 L 12,12"
            strokeWidth="2"
            stroke="#ed5813"
            strokeLinecap="round"
      />
      <path d="M 12,0 L 0,12"
            strokeWidth="2"
            stroke="#ed5813"
            strokeLinecap="round"
      />
   </Svg100>
  </div>
);



export default SvgClose;
