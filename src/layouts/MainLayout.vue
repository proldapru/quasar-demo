<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>{{ mainHeader }}</q-toolbar-title>
        <div v-html="subHeader" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item-label header>
          Доступные разделы
        </q-item-label>
        <q-item v-for="link in linksList" :key="link.caption" :to="link.route" exact clickable v-ripple>
          <q-item-section avatar><q-icon :name="link.icon" /></q-item-section>
          <q-item-section>{{ link.caption }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
const linksList = [
  {
    caption: 'Права по задачам',
    icon: 'checklist',
    route: {name: 'tasks'}
  },

  {
    caption: 'Права по пользователям',
    icon: 'groups',
    route: {name: 'users'}
  },

  {
    caption: 'О программе',
    icon: 'help',
    route: {name: 'about'}
  },
];

import vuexModuleApplication from '../store/module-application';
import { Options, Vue } from 'vue-property-decorator';
@Options({
  name: 'MainLayout',
})
export default class MainLayout extends Vue {
  linksList = linksList;
  leftDrawerOpen = false;

  get mainHeader() {
      return this.$route?.meta?.mainHeader || 'Quasar Framework Demo App'
  }

  get subHeader() {
    return vuexModuleApplication.subHeader
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen
  }
}
</script>
