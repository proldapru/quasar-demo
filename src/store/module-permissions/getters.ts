import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PermissionsStateInterface, IdentifiedObject } from './state';

const getters: GetterTree<PermissionsStateInterface, StateInterface> = {
  permissionsLoaded(state): boolean {
    return !!state.permissions?.tasks?.length
  },

  permTypes(state): IdentifiedObject[] {
    return state.permissions?.permTypes || []
  },

  permissionsByTasks(state): IdentifiedObject[] {
    if(state.permissions !== null) {
      const localTasks = state.permissions.tasks.map(x => Object.assign({}, x))
      for(const t of localTasks) {
        t.perm = state.permissions?.perms
          .filter(p => p.taskId === t.id)
          .map(x => Object.assign({title: state?.permissions?.users.find(y => y.id === x.userId)?.name}, x))
      }
      return localTasks
    } else {
      return []
    }
  },

  taskPermissions(state) {
    return (taskId: string): IdentifiedObject => {
      if(state.permissions !== null) {
        const localTask = Object.assign({}, state.permissions.tasks.find(x => x.id === taskId))
        localTask.perm = state.permissions.perms
          .filter(p => p.taskId === taskId)
          .map(x => Object.assign({title: state?.permissions?.users.find(y => y.id === x.userId)?.name}, x))
        return localTask
      } else {
        return {id: taskId, name: 'Unknown'}
      }
    }
  },

  permissionsByUsers(state): IdentifiedObject[] {
    if(state.permissions !== null) {
      const localUsers = state.permissions.users.map(x => Object.assign({}, x))
      for(const u of localUsers) {
        u.perm = state.permissions.perms
          .filter(p => p.userId === u.id)
          .map(x => Object.assign({title: state?.permissions?.tasks.find(y => y.id === x.taskId)?.name}, x))
      }
      return localUsers
    } else {
      return []
    }
  },

  userPermissions(state){
    return (userId: string): IdentifiedObject => {
      if(state.permissions !== null) {
        const localUser = Object.assign({}, state.permissions.users.find(x => x.id === userId))
        localUser.perm = state.permissions.perms
          .filter(p => p.userId === userId)
          .map(x => Object.assign({title: state?.permissions?.tasks.find(y => y.id === x.taskId)?.name}, x))
        return localUser
      } else {
        return {id: userId, name: 'Unknown'}
      }
    }
  }
}

export default getters;
