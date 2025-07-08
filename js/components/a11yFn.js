"use strict";

exports.__esModule = true;
exports.crDialogRole = void 0;
const crDialogRole = (isShow, caption) => ({
  role: "dialog",
  tabIndex: "-1",
  hidden: !isShow,
  "aria-label": caption
});
exports.crDialogRole = crDialogRole;
//# sourceMappingURL=a11yFn.js.map