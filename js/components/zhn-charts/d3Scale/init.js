"use strict";

exports.__esModule = true;
exports.initRange = initRange;
function initRange() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var domain = args[0],
    range = args[1];
  switch (args.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}
//# sourceMappingURL=init.js.map