
export const ACTION = {
  PLACE_REQUESTED : 'PLACE_REQUESTED',
  PLACE_REQUESTED_OK : 'PLACE_REQUESTED_OK',
  PLACE_REQUESTED_FAIL : 'PLACE_REQUESTED_FAIL'
};

export const placeRequested = (payload) => ({
  type: ACTION.PLACE_REQUESTED, payload
})
export const placeRequestedOk = (forecast) => ({
  type: ACTION.PLACE_REQUESTED_OK , forecast
})
export const placeRequestedFail = (message) => ({
  type: ACTION.PLACE_REQUESTED_FAIL, message
})

const actions = {
  requested : placeRequested,
  requestedOk : placeRequestedOk,
  requestedFail : placeRequestedFail
};

export default actions
