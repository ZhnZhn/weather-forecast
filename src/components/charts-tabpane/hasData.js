
const _isNumber = n => typeof n === 'number'
, _isNumberGreaterZero = value => _isNumber(value) && value > 0
, _fHasData = (propName, isData) => (data) => {
  for(let i=0; i<data.length; i++) {
    if (isData(data[i][propName])) {
      return true;
    }
  }
  return false;
};

export const hasRain = _fHasData('rain', _isNumberGreaterZero)
export const hasSnow = _fHasData('snow', _isNumberGreaterZero)
