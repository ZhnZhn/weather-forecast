export const crDialogRole = (
  isShow,
  caption
) => ({
  role: "dialog",
  tabIndex: "-1",
  hidden: !isShow,
  "aria-label": caption
})
