<template>
<q-markup-table class="perm-grid">
  <thead class="text-bold">
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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import SetPermObject from './SetPermObject.vue';
import vuexModulePermissions from '../store/module-permissions';
import { IdentifiedObject } from '../store/models'

/*
interface MainLayoutProvidedMethod {
  setSubHeader: (text: string) => void
}

interface MainLayoutProvided {
  mainLayout: MainLayoutProvidedMethod
}
*/
export default defineComponent({
  name: 'ModPermForm',

  components: {
    SetPermObject
  },

  props: {
    permObjectId: {type: String as PropType<string>, required: true},
  },

//  inject: ['mainLayout'],

  inject: {
      mainLayout: {
        from: 'mainLayout',
/*      default: () => ({
        setSubHeader: (text: string): void => alert(text),
      }),
*/    },
  },

  computed: {
    subHeader(): string {
      return this.$route?.meta?.subHeader ? `${this.$route.meta.subHeader} ${this.permObject.name}` : ''
    },

    gridCaption(): string {
      return this.$route?.meta?.gridCaption || ''
    },

    permObjectType(): string {
      return this.$route?.meta?.permObjectType || ''
    },

    permObject(): IdentifiedObject {
      return this.permObjectType ?
        (this.permObjectType === 'task' ?
          vuexModulePermissions.taskPermissions(this.permObjectId) :
          vuexModulePermissions.userPermissions(this.permObjectId)) :
      {id:'id', name:'name', perm:[]}
    },

    permTypes(): IdentifiedObject[] | [] {
      return vuexModulePermissions.permTypes;
    },
  },

/*
  watch: {
    subHeader: {
      immediate: true,
      handler(newVal: string) {
        this.mainLayout.setSubHeader(newVal)
      },
    }
  },
*/
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