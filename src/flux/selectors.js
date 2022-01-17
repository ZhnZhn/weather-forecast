import * as place from './place/reducer';
import * as forecast from './forecast/reducer';
import * as hourly from './hourly/reducer';
import * as air from './air/reducer';
import * as uv from './uv/reducer';
import * as settings from './settings/reducer';
import * as modal from './modal/reducer';

export const sPlace = {
  recent : (state) => place.recent(state.place),
  byId : (state, id) => place.byId(state.place, id),

  forecast: state => {
    const recent = sPlace.recent(state)
    return recent
      ? sPlace.byId(state, recent)
      : void 0
  }
};

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

export const sAir = {
  recent : (state) => air.recent(state.air),
  byId : (state, id) => (air.byId(state.air, id)  || {}).list,

  forecast: state => {
    const recent = sAir.recent(state);
    return recent
      ? sAir.byId(state, recent)
      : void 0;
  }
}

export const sUV = {
  recent : (state) => uv.recent(state.uv),
  byId : (state, id) => uv.byId(state.uv, id),

  forecast : state => {
    const recent = sUV.recent(state);
    return recent
      ? sUV.byId(state, recent)
      : void 0;
  }
}

const _getSettingsSlice = state => state.settings;
export const sSettings = {
  isApiKey : (state) => settings.isApiKey(_getSettingsSlice(state)),
  isAir: state => settings.isAir(_getSettingsSlice(state))
}

export const sModal = {
  errMsg: state => modal.errMsg(state.modal)
}
