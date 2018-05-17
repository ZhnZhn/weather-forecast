import * as place from './place/reducer';
import * as forecast from './forecast/reducer';
import * as hourly from './hourly/reducer';
import * as uv from './uv/reducer';
import * as settings from './settings/reducer';

export const sPlace = {
  recent : (state) => place.recent(state.place),
  byId : (state, id) => place.byId(state.place, id)
}

export const sForecast = {
  byId : (state, id) => forecast.byId(state.forecast, id),
  recent : (state) => forecast.recent(state.forecast),
  listById : (state, id) => forecast.listById(state.forecast, id),
  cityCoordById : (state, id) => forecast.cityCoordById(state.forecast, id)
}

export const sHourly = {
  recent : (state) => hourly.recent(state.hourly),
  byId : (state, id) => hourly.byId(state.hourly, id)
}

export const sUV = {
  recent : (state) => uv.recent(state.uv),
  byId : (state, id) => uv.byId(state.uv, id)
}

export const sSettings = {
  isApiKey : (state) => settings.isApiKey(state.settings)
}
