
import COMP_TYPE from './CompType'

const _isFn = fn => typeof fn === 'function';

const _router = {
  [COMP_TYPE.CTB]() {
    return import(
       /* webpackChunkName: "chart-tabpane" */
       /* webpackMode: "lazy" */
       "../charts-tabpane/ChartTabPane"
     ).then(module => module.default)
  }
};

const RouterComp = {
  getComp(type){
    const _load = _router[type];
    return _isFn(_router[type])
      ? _load()
      : Promise.resolve(null);
  }
};

export default RouterComp
