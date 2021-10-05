<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-xs items-stretch">
      <div class="col col-3">
        <q-card>
          <q-list>

            <q-item v-for="curPermObject in permObjects" :key="curPermObject.id"
              :to="{name: permObjectType + 'Permissions', params: {permObjectId: curPermObject.id}}"
              exact clickable v-ripple>
              <q-item-section avatar><q-icon :name="curPermObject.icon" /></q-item-section>
              <q-item-section>{{ curPermObject.name }}</q-item-section>
            </q-item>

          </q-list>
        </q-card>
      </div>
      <div class="col col-9">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-property-decorator';
import { Loading } from 'quasar';
import vuexModulePermissions from '../store/module-permissions';
import { IdentifiedObject } from '../store/models';

@Options({
  name: 'PagePermissions',
  preFetch ({ /*store, redirect, currentRoute, previousRoute, ssrContext, urlPath, publicPath*/ }) {

    if(!vuexModulePermissions.permissionsLoaded) {
      Loading.show({message: 'Загружаются данные с API'})

      vuexModulePermissions.loadPermissionsData().finally(() => {
        Loading.hide();
      });
    }
  }
})
export default class PagePermissions extends Vue {
  get permObjectType(): string {
    return this.$route?.meta?.permObjectType || ''
  }

  get permObjects(): IdentifiedObject[] | [] {
    return this.permObjectType ?
      (this.permObjectType === 'task' ? vuexModulePermissions.permissionsByTasks : vuexModulePermissions.permissionsByUsers) :
    []
  }
}
</script>
