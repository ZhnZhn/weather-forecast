//import PropTypes from 'prop-types';
import {
  useContext,
  useCallback
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import ThemeContext from '../hoc/ThemeContext';
import styleConfig from './Dialog.Style';
import useRerender from '../hooks/useRerender';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import TabPane from '../zhn-atoms/TabPane';
import Tab from '../zhn-atoms/Tab';
import CardApiKey from './CardApiKey';
import CardUi from './CardUi';

const S_MODAL = {
  position: 'static',
  width: 342,
  height: 285,
  margin: '70px auto 0px'
}
, S_TABS = {
  textAlign: 'left',
  marginLeft: 24
}
, S_TAB_SELECTED = { color: 'black' }
, S_CARD_ROOT = {
  position: 'relative',
  height: 200
}
, S_CARD_BUTTONS = {
  position: 'absolute',
  right: 4,
  bottom: 0,
  cursor: 'default'
};

const SettingsDialog = ({
  isShow,
  data,
  onClose,
}) => {
  const {
    onSetTheme,
    onSet,
    onAir
  } = data
  , theme = useContext(ThemeContext)
  , rerender = useRerender()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _handleSetTheme = useCallback((item) => {
     onSetTheme(theme, item.value)
     rerender()
  }, [])
  // theme, onSetTheme, rerender
  /*eslint-enable react-hooks/exhaustive-deps */
  , TS = theme.createStyle(styleConfig);

  return (
    <ModalDialog
       style={{...S_MODAL, ...TS.R_DIALOG}}
       caption="User Settings"
       isShow={isShow}
       isWithButton={false}
       onClose={onClose}
    >
      <TabPane width="100%" tabsStyle={S_TABS}>
        <Tab
          title="API Key"
          selectedStyle={S_TAB_SELECTED}
         >
           <CardApiKey
             style={S_CARD_ROOT}
             buttonsStyle={S_CARD_BUTTONS}
             onSet={onSet}
             onClose={onClose}
           />
        </Tab>
        <Tab
          title="UI Theme"
          selectedStyle={S_TAB_SELECTED}
        >
           <CardUi
             style={S_CARD_ROOT}
             buttonsStyle={S_CARD_BUTTONS}
             onSetTheme={_handleSetTheme}
             onAir={onAir}
             onClose={onClose}
           />
        </Tab>
      </TabPane>
    </ModalDialog>
  );
};

/*
SettingsDialog.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.shape({
    onSet: PropTypes.func,
    onAir: PropTypes.func,
    onSetTheme: PropTypes.func,
  }),
  onClose: PropTypes.func
}
*/

export default memoIsShow(SettingsDialog)
