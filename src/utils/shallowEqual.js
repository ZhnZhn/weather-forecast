const _getObjectKeys = Object.keys;

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
      || !Object.prototyp.hasOwnProperty.call(objB, key)
    ) {
      return false;
    }
  }

  return true;
}
