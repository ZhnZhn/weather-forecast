
const styleConfig = {
  _themeName: void 0,
  _style: void 0,

  _createStyle: (C) => {
    return {
      HEADER: {
        ...C.BG,
        //boxShadow: 'rgba(0,0,0, 0.14) 0px 0px 4px, rgba(0,0,0, 0.6) 0px 4px 8px'
      }
    };
  }
};

export default styleConfig
