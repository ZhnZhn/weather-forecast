import {
  createContext,
  useContext
} from '../../uiApi';

const TooltipContext = createContext();

export const TooltipProvider = TooltipContext.Provider

const DF_USE_TOOLTIP = () => ({});
export const useTooltip = () => {
  const _useTooltip = useContext(TooltipContext) || DF_USE_TOOLTIP
  return _useTooltip();
}
