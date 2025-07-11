"use strict";

exports.__esModule = true;
exports.crTabPanelId = exports.crTabId = exports.crTabCn = exports.CL_TAB_TITLE = exports.CL_TABS = exports.CL_TAB = exports.CL_PANES = exports.CL_ACTIVE = void 0;
var _styleFn = require("../styleFn");
const CL_TAB = exports.CL_TAB = "tab",
  CL_ACTIVE = exports.CL_ACTIVE = "active",
  CL_TAB_TITLE = exports.CL_TAB_TITLE = "tab_t",
  CL_TABS = exports.CL_TABS = "tabs",
  CL_PANES = exports.CL_PANES = "panes",
  crTabCn = isSelected => (0, _styleFn.crCn)(CL_TAB, [isSelected, CL_ACTIVE]),
  crTabId = (tabPaneId, index) => `tab-${tabPaneId}-${index}`,
  crTabPanelId = (tabPaneId, index) => `tabpanel-${tabPaneId}-${index}`;
exports.crTabPanelId = crTabPanelId;
exports.crTabId = crTabId;
exports.crTabCn = crTabCn;
//# sourceMappingURL=tabPaneFn.js.map