import { MutationTree } from 'vuex';
import { PermissionsStateInterface, PermissionsObjectInterface, PermObject } from './state';

const mutation: MutationTree<PermissionsStateInterface> = {
	setPermissions (state: PermissionsStateInterface, permissionsObject: PermissionsObjectInterface) {
    state.permissions = permissionsObject
  },

  modPermission (state: PermissionsStateInterface, permObject: PermObject) {
    if(state.permissions !== null) {
      const permIndex = state.permissions.perms
        .findIndex(x => x.taskId === permObject.taskId && x.userId === permObject.userId)
      if(permIndex)
        state.permissions.perms[permIndex].perm = permObject.perm
    }
  }
};

export default mutation;
