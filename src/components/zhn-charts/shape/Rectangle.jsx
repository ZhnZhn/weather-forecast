import { PureComponent } from '../../uiApi';

import classNames from 'classnames';

import { Animate } from '../../zhn-animate';
import { filterProps } from '../util/ReactUtils';

const CL_RESTANGLE = 'recharts-rectangle';

const getRectanglePath = (
  x,
  y,
  width,
  height,
  radius
) => {
  const maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2)
  , ySign = height >= 0 ? 1 : -1
  , xSign = width >= 0 ? 1 : -1
  , clockWise = (height >= 0 && width >= 0) || (height < 0 && width < 0) ? 1 : 0;

  let path;
  if (maxRadius > 0 && radius instanceof Array) {
    const newRadius = [0, 0, 0, 0];
    for (let i = 0, len = 4; i < len; i++) {
      newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
    }
    path = `M${x},${y + ySign * newRadius[0]}`;
    if (newRadius[0] > 0) {
      path += `A ${newRadius[0]},${newRadius[0]},0,0,${clockWise},${x + xSign * newRadius[0]},${y}`;
    }
    path += `L ${x + width - xSign * newRadius[1]},${y}`;
    if (newRadius[1] > 0) {
      path += `A ${newRadius[1]},${newRadius[1]},0,0,${clockWise},
    ${x + width},${y + ySign * newRadius[1]}`;
    }
    path += `L ${x + width},${y + height - ySign * newRadius[2]}`;
    if (newRadius[2] > 0) {
      path += `A ${newRadius[2]},${newRadius[2]},0,0,${clockWise},
    ${x + width - xSign * newRadius[2]},${y + height}`;
    }
    path += `L ${x + xSign * newRadius[3]},${y + height}`;
    if (newRadius[3] > 0) {
      path += `A ${newRadius[3]},${newRadius[3]},0,0,${clockWise},
    ${x},${y + height - ySign * newRadius[3]}`;
    }
    path += 'Z';
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
      const newRadius = Math.min(maxRadius, radius);
      path = `M ${x},${y + ySign * newRadius}
        A ${newRadius},${newRadius},0,0,${clockWise},${x + xSign * newRadius},${y}
        L ${x + width - xSign * newRadius},${y}
        A ${newRadius},${newRadius},0,0,${clockWise},${x + width},${y + ySign * newRadius}
        L ${x + width},${y + height - ySign * newRadius}
        A ${newRadius},${newRadius},0,0,${clockWise},${x + width - xSign * newRadius},${y + height}
        L ${x + xSign * newRadius},${y + height}
        A ${newRadius},${newRadius},0,0,${clockWise},${x},${y + height - ySign * newRadius} Z`;
  } else {
    path = `M ${x},${y} h ${width} v ${height} h ${-width} Z`;
  }
  return path;
};

export const isInRectangle = (
  point,
  rect
) => {
  if (!point || !rect) {
    return false;
  }

  const {
    x: px,
    y: py
  } = point
  , {
    x,
    y,
    width,
    height
  } = rect;
  if (Math.abs(width) > 0 && Math.abs(height) > 0) {
    const minX = Math.min(x, x + width)
    , maxX = Math.max(x, x + width)
    , minY = Math.min(y, y + height)
    , maxY = Math.max(y, y + height);
    return px >= minX
      && px <= maxX
      && py >= minY
      && py <= maxY;
  }
  return false;
};

export class Rectangle extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      totalLength: -1
    };
  }

  /* eslint-disable  react/no-did-mount-set-state */
  componentDidMount() {
    if (this.node && this.node.getTotalLength) {
      try {
        const totalLength = this.node.getTotalLength();
        if (totalLength) {
          this.setState({ totalLength });
        }
      }
      catch (err) {
        // calculate total length error
      }
    }
  }

  _refNode = node => {
    this.node = node;
  }

  render() {
    const {
      x,
      y,
      width,
      height,
      radius,
      className
    } = this.props
    , {
      totalLength
    } = this.state
    , {
      animationEasing,
      animationDuration,
      animationBegin,
      isAnimationActive,
      isUpdateAnimationActive
    } = this.props;

    if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
      return null;
    }

    const layerClass = classNames(CL_RESTANGLE, className);
    if (!isUpdateAnimationActive) {
      return (
        <path
          {...filterProps(this.props, true)}
          className={layerClass}
          d={getRectanglePath(x, y, width, height, radius)}
        />
      );
    }
    return (
      <Animate
        canBegin={totalLength > 0}
        from={{ width, height, x, y }}
        to={{ width, height, x, y }} duration={animationDuration} animationEasing={animationEasing}
        isActive={isUpdateAnimationActive}
      >
       {({
           width: currWidth,
           height: currHeight,
           x: currX,
           y: currY
         }) => (
           <Animate
             canBegin={totalLength > 0}
             from={`0px ${totalLength === -1 ? 1 : totalLength}px`}
             to={`${totalLength}px 0px`}
             attributeName="strokeDasharray"
             begin={animationBegin}
             duration={animationDuration}
             isActive={isAnimationActive}
             easing={animationEasing}
            >
              <path
                 {...filterProps(this.props, true)}
                 className={layerClass}
                 d={getRectanglePath(currX, currY, currWidth, currHeight, radius)}
                 ref={this._refNode}
              />
            </Animate>
        )}
     </Animate>
  );
}}

Rectangle.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
};