import { isFn } from '../../utils/isTypeFn';
import COMP_TYPE from './CompType';

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
    return isFn(_load)
      ? _load()
      : Promise.resolve(null);
  }
};

export default RouterComp
