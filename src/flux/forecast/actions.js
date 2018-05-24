
export const ACTION = {
  FORECAST_REQUESTED : 'FORECAST_REQUESTED',
  FORECAST_REQUESTED_INCACHE : 'FORECAST_REQUESTED_INCACHE',
  FORECAST_REQUESTED_OK : 'FORECAST_REQUESTED_OK'
};

export const forecastRequested = (id) => ({
  type: ACTION.FORECAST_REQUESTED, id
});
export const forecastRequestedInCache = (id) => ({
  type: ACTION.FORECAST_REQUESTED_INCACHE, id
});
export const forecastRequestedOk = (forecast, id) => ({
  type: ACTION.FORECAST_REQUESTED_OK, forecast, id
});


const actions = {
  requested : forecastRequested,
  requestedInCache : forecastRequestedInCache,
  requestedOk : forecastRequestedOk  
};

export default actions
