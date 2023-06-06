import {
  shapeSymbol,
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
} from '../d3Shape';

import { _upperFirst } from '../util/FnUtils';

const MATH_PI = Math.PI
// (Math.PI/180)*18
, STAR_ANGLE_IN_RADIAN = MATH_PI / 10
, SQRT_OF_3 = Math.sqrt(3)
, _mathTan = Math.tan

const _symbolFactories = {
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
};

const _crSymbolFactoryName = (
  type
) => `symbol${_upperFirst(type)}`;

export const registerSymbol = (
  key,
  factory
) => {
  _symbolFactories[_crSymbolFactoryName(key)] = factory;
}

const _getSymbolFactory = (
  type
) => _symbolFactories[_crSymbolFactoryName(type)]
  || symbolCircle;

const _sizeOf = {
  cross: 5/9,
  diamond: 0.5/SQRT_OF_3,
  square: 1,
  star: 1.25 * (_mathTan(STAR_ANGLE_IN_RADIAN) - _mathTan(STAR_ANGLE_IN_RADIAN * 2) * _mathTan(STAR_ANGLE_IN_RADIAN) ** 2),
  triangle: SQRT_OF_3/4,
  wye: (21-10*SQRT_OF_3)/8,
  DF: MATH_PI/4
};

const _calculateAreaSize = (
  size,
  sizeType,
  type
) => sizeType === 'area'
  ? size
  : (_sizeOf[type] || _sizeOf.DF) * size * size;

export const getSymbolPath = ({
  size,
  sizeType,
  type
}) => shapeSymbol()
  .type(_getSymbolFactory(type))
  .size(_calculateAreaSize(size, sizeType, type))();
