"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var BLANK = " ";
var _daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
var _days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
var _sidesOfCompass = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
var dt = {
  toMonthDay: function toMonthDay(timestamp) {
    var d = new Date(timestamp * 1000) // Convert the passed timestamp to milliseconds
    ,
        mm = ('0' + (d.getMonth() + 1)).slice(-2) // Months are zero based. Add leading 0.
    ,
        dd = ('0' + d.getDate()).slice(-2); // Add leading 0.

    return mm + "-" + dd;
  },
  toTime: function toTime(timestamp) {
    var d = new Date(timestamp * 1000) // Convert the passed timestamp to milliseconds
    ,
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2) // Add leading 0.
    ,
        ampm = 'AM';

    if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
    } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
    } else if (hh === 0) {
      h = 12;
    }

    return h + ':' + min + ' ' + ampm;
  },
  toMonthDayTime: function toMonthDayTime(timestamp) {
    var monthDay = dt.toMonthDay(timestamp);
    var time = dt.toTime(timestamp);
    return monthDay + ' ' + time;
  },
  toShortDayOfWeek: function toShortDayOfWeek(timestamp) {
    var d = new Date(timestamp * 1000),
        dd = ('0' + d.getDate()).slice(-2),
        wd = _daysOfWeek[d.getDay()];

    return dd + ' ' + wd;
  },
  toDayOfWeek: function toDayOfWeek(timestamp) {
    var d = new Date(timestamp * 1000),
        dd = ('0' + d.getDate()).slice(-2),
        wd = _days[d.getDay()];

    return dd + BLANK + wd;
  },
  toDayHour: function toDayHour(timestamp) {
    var d = new Date(timestamp * 1000),
        dd = ('0' + d.getDate()).slice(-2),
        hh = ('0' + d.getHours()).slice(-2);
    return dd + BLANK + hh;
  },
  toDirection: function toDirection(degNum) {
    if (degNum === void 0) {
      degNum = 0;
    }

    var val = Math.floor(degNum / 22.5 + 0.5);
    return _sidesOfCompass[val % 16];
  }
};
var _default = dt;
exports["default"] = _default;
//# sourceMappingURL=dt.js.map