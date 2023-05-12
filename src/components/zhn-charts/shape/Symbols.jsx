import { PureComponent } from '../../uiApi';

import classNames from 'classnames';

import {
  symbol as shapeSymbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
} from 'd3-shape';

import { _upperFirst } from '../util/FnUtils';
import { filterProps } from '../util/ReactUtils';

const symbolFactories = {
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
};
const RADIAN = Math.PI / 180;
const getSymbolFactory = (
  type
) => {
  const name = `symbol${_upperFirst(type)}`;
  return symbolFactories[name] || symbolCircle;
};

const calculateAreaSize = (
  size,
  sizeType,
  type
) => {
  if (sizeType === 'area') {
    return size;
  }

  switch (type) {
    case 'cross':
      return (5 * size * size) / 9;
    case 'diamond':
      return (0.5 * size * size) / Math.sqrt(3);
    case 'square':
      return size * size;
    case 'star': {
      const angle = 18 * RADIAN;
      return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.tan(angle) ** 2);
    }
    case 'triangle':
      return (Math.sqrt(3) * size * size) / 4;
    case 'wye':
      return ((21 - 10 * Math.sqrt(3)) * size * size) / 8;
    default:
      return (Math.PI * size * size) / 4;
  }
};

export class Symbols extends PureComponent {
  getPath() {
    const {
      size,
      sizeType,
      type
    } = this.props
    , symbolFactory = getSymbolFactory(type)
    , symbol = shapeSymbol()
       .type(symbolFactory)
       .size(calculateAreaSize(size, sizeType, type));
    return symbol();
  }

  render() {
    const {
      className,
      cx,
      cy,
      size
    } = this.props
    , filteredProps = filterProps(this.props, true);

    return cx === +cx && cy === +cy && size === +size
      ? (<path
            {...filteredProps}
            className={classNames('recharts-symbols', className)}
            transform={`translate(${cx}, ${cy})`}
            d={this.getPath()}
        />)
      : null;
  }
}

Symbols.defaultProps = {
  type: 'circle',
  size: 64,
  sizeType: 'area'
};

Symbols.registerSymbol = (
  key,
  factory
) => {
  symbolFactories[`symbol${_upperFirst(key)}`] = factory;
};
