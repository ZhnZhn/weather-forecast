
export const ACTION = {
  HOURLY_REQUESTED : 'HOURLY_REQUESTED',
  HOURLY_REQUESTED_OK : 'HOURLY_REQUESTED_OK',
  HOURLY_REQUESTED_INCACHE : 'HOURLY_REQUESTED_INCACHE',
};

export const hourlyRequested = () => ({
  type: ACTION.HOURLY_REQUESTED
})
export const hourlyRequestedOk = (hourly, id) => ({
  type: ACTION.HOURLY_REQUESTED_OK, hourly, id
})
export const hourlyRequestedInCache = () => ({
  type: ACTION.HOURLY_REQUESTED_INCACHE
})


const actions = {
  requested : hourlyRequested,
  requestedOk : hourlyRequestedOk,
  requestedInCache : hourlyRequestedInCache
};

export default actions
