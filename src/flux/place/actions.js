
export const ACTION = {
  PLACE_REQUESTED : 'PLACE_REQUESTED',
  PLACE_REQUESTED_OK : 'PLACE_REQUESTED_OK'
};

export const placeRequested = (payload) => ({
  type: ACTION.PLACE_REQUESTED, payload
})
export const placeRequestedOk = (forecast) => ({
  type: ACTION.PLACE_REQUESTED_OK , forecast
})


const actions = {
  requested : placeRequested,
  requestedOk : placeRequestedOk
};

export default actions
