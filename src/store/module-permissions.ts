import {
  getModule,
  VuexModule,
  Mutation,
  Action,
  MutationAction,
  Module,
} from 'vuex-module-decorators';
import store from '.';
import { PermissionsDataObject, IdentifiedObject, PermObject } from './models';
import * as api from './api';

@Module({ dynamic: true, namespaced: true, store, name: 'Permissions' })
class Permissions extends VuexModule {
  permissions: PermissionsDataObject | null = null;

  get permissionsLoaded(): boolean {
    return !!this.permissions?.tasks?.length;
  }

  get permTypes(): IdentifiedObject[] | [] {
    return this.permissions?.permTypes || [];
  }

  get permissionsByTasks(): IdentifiedObject[] {
    if (this.permissions !== null) {
      const localTasks = this.permissions.tasks.map((x) =>
        Object.assign({}, x)
      );
      for (const t of localTasks) {
        t.perm = this.permissions?.perms
          .filter((p) => p.taskId === t.id)
          .map((x) =>
            Object.assign(
              {
                title: this?.permissions?.users.find((y) => y.id === x.userId)
                  ?.name,
              },
              x
            )
          );
      }
      return localTasks;
    } else {
      return [];
    }
  }

  get taskPermissions() {
    return (taskId: string): IdentifiedObject => {
      if (this.permissions !== null) {
        const localTask = Object.assign(
          {},
          this.permissions.tasks.find((x) => x.id === taskId)
        );
        localTask.perm = this.permissions.perms
          .filter((p) => p.taskId === taskId)
          .map((x) =>
            Object.assign(
              {
                title: this?.permissions?.users.find((y) => y.id === x.userId)
                  ?.name,
              },
              x
            )
          );
        return localTask;
      } else {
        return { id: taskId, name: 'Unknown' };
      }
    };
  }

  get permissionsByUsers(): IdentifiedObject[] {
    if (this.permissions !== null) {
      const localUsers = this.permissions.users.map((x) =>
        Object.assign({}, x)
      );
      for (const u of localUsers) {
        u.perm = this.permissions.perms
          .filter((p) => p.userId === u.id)
          .map((x) =>
            Object.assign(
              {
                title: this?.permissions?.tasks.find((y) => y.id === x.taskId)
                  ?.name,
              },
              x
            )
          );
      }
      return localUsers;
    } else {
      return [];
    }
  }

  get userPermissions() {
    return (userId: string): IdentifiedObject => {
      if (this.permissions !== null) {
        const localUser = Object.assign(
          {},
          this.permissions.users.find((x) => x.id === userId)
        );
        localUser.perm = this.permissions.perms
          .filter((p) => p.userId === userId)
          .map((x) =>
            Object.assign(
              {
                title: this?.permissions?.tasks.find((y) => y.id === x.taskId)
                  ?.name,
              },
              x
            )
          );
        return localUser;
      } else {
        return { id: userId, name: 'Unknown' };
      }
    };
  }

  @MutationAction
  async loadPermissionsData() {
    const permissions = await api.fetchPermissionsData();
    return { permissions };
  }

  @Mutation
  modPermission(permObject: PermObject) {
    if (this.permissions !== null) {
      const permIndex = this.permissions.perms.findIndex(
        (x) => x.taskId === permObject.taskId && x.userId === permObject.userId
      );
      if (permIndex) this.permissions.perms[permIndex].perm = permObject.perm;
    }
  }

  @Action
  async modifyPermission(permObject: PermObject) {
    const status = await api.modifyPermission(permObject);
    if (status === 'Ok') {
      this.modPermission(permObject);
    }
  }
}

export default getModule(Permissions);
