import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { PermissionsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const permissionsModule: Module<PermissionsStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default permissionsModule;