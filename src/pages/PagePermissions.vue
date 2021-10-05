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
import { defineComponent } from 'vue'
import { Loading, Dialog } from 'quasar'
import { IdentifiedObject } from '../store/module-permissions/state'


export default defineComponent({
  name: 'PagePermissions',

  preFetch ({ store /*, redirect, currentRoute, previousRoute, ssrContext, urlPath, publicPath*/ }) {

    if(!store.getters['permissions/permissionsLoaded']) {
      Loading.show({message: 'Загружаются данные с API'})

      return store.dispatch('permissions/fetchData').then(() => {
        /* */
      }).catch((error: {message: string}) => {
        /*  Dialog не работает =( */
        Dialog.create({ title: 'Сообщение', message: error.message }).onOk(() => { console.log('Dialog Ok pressed') })
        console.log(error.message)
      }).finally(() => {
        Loading.hide()
      })
    }
  },

  computed: {
    permObjectType(): string {
      return this.$route?.meta?.permObjectType || ''
    },

    permObjects(): IdentifiedObject {
      return this.permObjectType ?
        this.$store.getters[`permissions/permissionsBy${
          this.permObjectType.charAt(0).toUpperCase() + this.permObjectType.slice(1)
        }s`] :
        {}
    }
  },
})
</script>
