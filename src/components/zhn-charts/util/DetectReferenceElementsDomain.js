import { isNumber } from './DataUtils';

export const detectReferenceElementsDomain = (
  children,
  domain,
  axisId,
  axisType,
  specifiedTicks
) => {
  let finalDomain = domain;
  if (specifiedTicks && specifiedTicks.length) {
    finalDomain = specifiedTicks.reduce((result, tick) => {
      if (isNumber(tick)) {
        return [
          Math.min(result[0], tick),
          Math.max(result[1], tick)
        ];
      }
      return result;
    }, finalDomain);
  }
  return finalDomain;
}
