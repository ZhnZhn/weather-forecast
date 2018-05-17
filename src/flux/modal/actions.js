
export const ACTION = {
  MODAL_SHOW : 'MODAL_SHOW'
};

export const showModal = (id) => ({
  type: ACTION.MODAL_SHOW,
  id
});

const actions = { showModal };

export default actions
