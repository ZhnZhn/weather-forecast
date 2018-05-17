

const styleConfig = {
  _themeName : undefined,
  _style : {},
  _createStyle : (C) => {
    return {
      ROOT_DIV : {
        position: 'fixed',
        top: '3rem',
        left: '0',
        bottom: '0',
        borderRight : '1px solid #999',
        transform: 'translateX(-100%)',
        transition: 'transform .3s',
        fill : C.BG_MARK.backgroundColor,
        ...C.BG,
        overflowY : 'auto',
        overflowX : 'hidden',
        maxWidth : '100%'
      },
      C_BG_MARK : C.BG_MARK.backgroundColor,
      C_BG_UNMARK : C.BG.backgroundColor
    }
  }
};

export default styleConfig
