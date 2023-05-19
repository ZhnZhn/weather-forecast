const _getObjectKeys = Object.keys;
const _hasOwnProperty = Object.prototype.hasOwnProperty;

export const shallowEqual = (
  objA,
  objB
) => {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  const aKeys = _getObjectKeys(objA)
  , bKeys = _getObjectKeys(objB)
  , len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    const key = aKeys[i];

    if (objA[key] !== objB[key]
      || !_hasOwnProperty.call(objB, key)
    ) {
      return false;
    }
  }

  return true;
}
