import { GlobalState } from './type';
import * as actions from './actions';
// import * as getters from './getters';
import * as mutations from './mutations';

const state: GlobalState = {
  viewType: 'Chart',
  NS: 'default',
  NSList: [{ label: 'default', value: 'default' }],
  refreshTime: 0,
  isDiagramView: true,
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations,
};
