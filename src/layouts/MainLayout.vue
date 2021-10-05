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
        <div>{{ subHeader }}</div>
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

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  data() {
    return {
      linksList,
      leftDrawerOpen: false,
      subHeader: ''
    }
  },

  provide() {
    return {
      mainLayout: {
        setSubHeader: (text: string): void => { this.setSubHeader(text) },
      } as { setSubHeader: (text: string) => void; },
    };
  },

  computed: {
    mainHeader() {
      return this.$route?.meta?.mainHeader || 'Quasar Framework Demo App'
    },
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    setSubHeader(text: string) {
      this.subHeader = text
    },
  },
})
</script>
