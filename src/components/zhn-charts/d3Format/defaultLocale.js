import formatLocale from './locale';

let locale;
export let format;
export let formatPrefix;

const _DF_LOCALE_DEFINITION = {
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
};
(function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}(_DF_LOCALE_DEFINITION))
