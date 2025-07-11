//import PropTypes from 'prop-types';
import memoIsShow from '../hoc/memoIsShow';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import TabPane from '../zhn-tab/TabPane';
import Tab from '../zhn-tab/Tab';
import CardApiKey from './CardApiKey';
import CardUi from './CardUi';

const TOKEN_USER_SETTINGS = "User Settings"
, S_MODAL = {
  position: 'static',
  width: 320,
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
  right: 8,
  bottom: 4
};

const SettingsDialog = ({
  isShow,
  data,
  onClose,
}) => (
  <ModalDialog
     style={S_MODAL}
     caption="User Settings"
     isShow={isShow}
     isWithButton={!1}
     onClose={onClose}
  >
    <TabPane
       ariaLabel={TOKEN_USER_SETTINGS}
       id="sd"
       width="100%"
       tabsStyle={S_TABS}
       isShow={isShow}
    >
      <Tab
        title="API Key"
        selectedStyle={S_TAB_SELECTED}
       >
         <CardApiKey
           style={S_CARD_ROOT}
           buttonsStyle={S_CARD_BUTTONS}
           onSet={data.onSet}
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
           onUiTheme={data.onUiTheme}
           onAir={data.onAir}
           onClose={onClose}
         />
      </Tab>
    </TabPane>
  </ModalDialog>
);


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
