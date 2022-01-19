import fUseIsData from './fUseIsData';
import { hasRain, hasSnow } from './hasData';

export const useIsRain = fUseIsData(hasRain);
export const useIsSnow = fUseIsData(hasSnow);
