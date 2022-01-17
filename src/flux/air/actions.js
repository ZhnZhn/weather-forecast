
export const ACTION_AIR_FORECAST_REQ = 'ACTION_AIR_FORECAST_REQ'
export const ACTION_AIR_FORECAST_REQ_OK = 'ACTION_AIR_FORECAST_REQ_OK'
export const ACTION_AIR_FORECAST_REQ_INCACHE = 'ACTION_AIR_FORECAST_REQ_INCACHE'

export const airForecastReq = () => ({
  type: ACTION_AIR_FORECAST_REQ
})
export const airForecastReqOk = (forecast, id) => ({
  type: ACTION_AIR_FORECAST_REQ_OK, forecast, id
})
export const airForecastReqInCache = () => ({
  type: ACTION_AIR_FORECAST_REQ_INCACHE
})

const actions = {
  requested : airForecastReq,
  requestedOk : airForecastReqOk,
  requestedInCache : airForecastReqInCache
};

export default actions
