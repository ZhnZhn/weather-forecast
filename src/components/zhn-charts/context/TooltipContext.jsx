import {
  createContext,
  useContext
} from '../../uiApi';

const TooltipContext = createContext();

export const TooltipProvider = TooltipContext.Provider
export const useTooltip = () => useContext(TooltipContext)()
