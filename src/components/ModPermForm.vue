<template>
<q-markup-table class="perm-grid">
  <thead class="text-bold">
    <tr><th colspan="4">{{ subHeader }}</th></tr>
    <tr>
      <th class="text-left">{{ gridCaption }}</th>
      <th v-for="permType in permTypes" :key="permType.id" class="text-center">{{ permType.name }}</th>
    </tr>
  </thead>
  <tbody>
    <set-perm-object v-for="curPerm in permObject.perm"
      :key="curPerm.userId + '_' + curPerm.taskId" v-bind="curPerm"/>
  </tbody>
</q-markup-table>
</template>

<script>
import { defineComponent } from 'vue';
import SetPermObject from './SetPermObject.vue';

export default defineComponent({
  name: 'ModPermForm',

  components: {
    SetPermObject,
  },

  props: {
    permObjectId: {type: String, required: true},
  },

  computed: {
    subHeader() {
      return `${this.$route.meta.subHeader} ${this.permObject.name}`
    },
 
    gridCaption() {
      return this.$route.meta.gridCaption
    },

    permObjectType() {
      return this.$route.meta.permObjectType
    },

    permObject(){
      return this.permObjectType ?
        this.$store.getters[`permissions/${this.permObjectType}Permissions`](this.permObjectId) :
        {}
    },

    permTypes() {
      return this.$store.getters['permissions/permTypes'];
    },
  },
})
</script>

<style scoped lang="scss">
  .perm-grid {
    th {
      font-weight: bold;
      color: #777;
    }
  }
</style>