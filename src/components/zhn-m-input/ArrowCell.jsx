
const S_SVG = {
  display: 'inline-block',
  height: 24,
  width: 24,
  userSelect: 'none',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
};

const ArrowCell = () => (
  <svg viewBox="0 0 24 24" style={S_SVG}>
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

export default ArrowCell
