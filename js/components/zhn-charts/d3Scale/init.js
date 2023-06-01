"use strict";

exports.__esModule = true;
exports.initRange = initRange;
function initRange(domain, range) {
  switch (arguments.length) {
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