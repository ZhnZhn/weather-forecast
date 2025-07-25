
const LISTBOX_ARIA_LABEL = "Suggestions";

export const crAriaListboxProps = (
  id,
  ariaLabel
) => ({
  id,
  role: "listbox",
  "aria-label": ariaLabel || LISTBOX_ARIA_LABEL
})

export const crAriaOptionProps = (
  isSelected,
  tabIndex
) => ({
  role: "option",
  "aria-selected": isSelected,
  tabIndex
})
