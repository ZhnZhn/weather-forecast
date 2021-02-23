import * as place from './place/reducer';
import * as forecast from './forecast/reducer';
import * as hourly from './hourly/reducer';
import * as uv from './uv/reducer';
import * as settings from './settings/reducer';
import * as modal from './modal/reducer';

export const sPlace = {
  recent : (state) => place.recent(state.place),
  byId : (state, id) => place.byId(state.place, id)
}

export const sForecast = {
  byId : (state, id) => forecast.byId(state.forecast, id),
  recent : (state) => forecast.recent(state.forecast),
  listById : (state, id) => forecast.listById(state.forecast, id),
  cityCoordById : (state, id) => forecast.cityCoordById(state.forecast, id),

  forecast: state => {
    const recent = sForecast.recent(state);
    return recent
      ? sForecast.byId(state, recent)
      : void 0;
  }

}

export const sHourly = {
  recent : (state) => hourly.recent(state.hourly),
  byId : (state, id) => (hourly.byId(state.hourly, id)  || {}).list,

  forecast: state => {
    const recent = sHourly.recent(state);
    return recent
      ? sHourly.byId(state, recent)
      : void 0;
  }
}

export const sUV = {
  recent : (state) => uv.recent(state.uv),
  byId : (state, id) => uv.byId(state.uv, id)
}

export const sSettings = {
  isApiKey : (state) => settings.isApiKey(state.settings)
}

export const sModal = {
  errMsg: state => modal.errMsg(state.modal)
}
