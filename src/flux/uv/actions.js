
export const ACTION = {
  UV_REQUESTED : 'UV_REQUESTED',
  UV_REQUESTED_OK : 'UV_REQUESTED_OK',
  UV_REQUESTED_INCACHE : 'UV_REQUESTED_INCACHE'
};

export const uvRequested = () => ({
  type: ACTION.UV_REQUESTED
});
export const uvRequestedOk = (json, id) => ({
  type: ACTION.UV_REQUESTED_OK, json, id
});
export const uvRequestedInCache = () => ({
  type: ACTION.UV_REQUESTED_INCACHE
});

const actions = {
  requested: uvRequested,
  requestedOk: uvRequestedOk,
  requestedInCache: uvRequestedInCache  
};

export default actions
