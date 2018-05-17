
const styleConfig = {
  _themeName: undefined,
  _style: undefined,
  _createStyle: (R) => {
    return {
      R_DIALOG: {
        ...R.DIALOG
      }
    };
  }
};

export default styleConfig
