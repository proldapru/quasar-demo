import axios from 'axios'

import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PermissionsStateInterface, PermissionsObjectInterface, PermObject } from './state';

const API = axios.create({
  baseURL: 'https://my-json-server.typicode.com/proldapru/quasar-demo',
  responseType: 'json'
})


interface ApiSaveDataStatus {
  status: 'Ok' | 'Er';
}

const actions: ActionTree<PermissionsStateInterface, StateInterface> = {
  fetchData(context) {
    return API.get<PermissionsObjectInterface>('/permissions').then(({ data: permissions }) => {
        context.commit('setPermissions', permissions)
      })
  },

  modifyPermission(context, permObject: PermObject) {
    /* Нужен POST, но на https://my-json-server.typicode.com работае только GET =( */
    return API.get<ApiSaveDataStatus>('/mod/permission', /*permObject*/).then(({ data }) => {
        if(data.status === 'Ok') context.commit('modPermission', permObject)
      })
  }
};

export default actions;
