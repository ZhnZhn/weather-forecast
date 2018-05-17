
export const toObjLike = (obj) => {
   return ((obj !== null && typeof obj === "object") ? obj : {});
}

export const toStr = (arr=[], prop, i=0, df='no data') => {
  return (( arr !== null && arr[i] && arr[i][prop] ) ? arr[i][prop] : df);
}

export default {
  toObjLike : toObjLike,
  toStr : toStr
}
