import { isArr } from './isTypeFn';

export const getByIndexAndProp = (
  arr,
  i,
  prop,
  dfValue
) => isArr(arr)
  ? arr?.[i]?.[prop] ?? dfValue
  : dfValue

export const joinByCollon2 = (
  v1,
  v2
) => [v1, v2]
  .filter(Boolean)
  .join(': ')
