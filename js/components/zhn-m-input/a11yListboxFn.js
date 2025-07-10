"use strict";

exports.__esModule = true;
exports.crAriaListboxProps = void 0;
const LISTBOX_ARIA_LABEL = "Suggestions";
const crAriaListboxProps = (id, ariaLabel) => ({
  id,
  role: "listbox",
  "aria-label": ariaLabel || LISTBOX_ARIA_LABEL
});
exports.crAriaListboxProps = crAriaListboxProps;
//# sourceMappingURL=a11yListboxFn.js.map