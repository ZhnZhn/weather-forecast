
export const ACTION = {
  MODAL_SHOW : 'MODAL_SHOW'
};

export const showModal = (id, option ) => ({
  type: ACTION.MODAL_SHOW,
  id,
  ...option
});

const actions = { showModal };

export default actions
