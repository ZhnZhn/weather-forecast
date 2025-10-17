import formatLocale from "./locale";

const _DF_LOCALE_DEFINITION = {
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
};

let locale = formatLocale(_DF_LOCALE_DEFINITION);
export let format = locale.format
export let formatPrefix = locale.formatPrefix
