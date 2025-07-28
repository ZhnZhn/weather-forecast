import {
  isArr,
  isStr
} from '../../utils/isTypeFn';

export const getItemCaption = (
  item
) => isArr(item)
 ? item[0]
 : isStr(item) ? item : void 0;

export const getItemValue = (
  item
) => {
  const value = isArr(item)
    ? isStr(item[1])
      ? item[1]
      : item[0]
    : isStr(item) ? item : void 0;
 return isStr(value)
   ? value.trim()
   : value;
}

export const FOCUS_NEXT_OPTION = "n"
export const FOCUS_PREV_OPTION = "p"
