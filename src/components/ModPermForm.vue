<template>
<q-markup-table class="perm-grid">
  <thead class="text-bold">
    <tr>
      <th class="text-left">{{ gridCaption }}</th>
      <th v-for="permType in permTypes" :key="permType.id" class="text-center">{{ permType.name }}</th>
    </tr>
  </thead>
  <tbody v-if="permObject.perm">
    <set-perm-object v-for="curPerm in permObject.perm"
      :key="curPerm.userId + '_' + curPerm.taskId" v-bind="curPerm"/>
  </tbody>
</q-markup-table>
</template>

<script lang="ts">
import { Prop, Options, Watch, Vue } from 'vue-property-decorator';
import SetPermObject from './SetPermObject.vue';
import vuexModuleApplication from '../store/module-application';
import vuexModulePermissions from '../store/module-permissions';
import { IdentifiedObject } from '../store/models'

@Options({
  name: 'ModPermForm',
  components: {
    SetPermObject
  }
})

export default class ModPermForm extends Vue {
  @Prop(String) readonly permObjectId!: string;

  get subHeader(): string {
    return this.$route?.meta?.subHeader && this.permObject.name ? `${this.$route.meta.subHeader} <em>${this.permObject.name}</em>` : ''
  }

  get gridCaption(): string {
    return this.$route?.meta?.gridCaption || ''
  }

  get permObjectType(): string {
    return this.$route?.meta?.permObjectType || ''
  }

  get permObject(): IdentifiedObject {
    return this.permObjectType ?
      (this.permObjectType === 'task' ?
        vuexModulePermissions.taskPermissions(this.permObjectId) :
        vuexModulePermissions.userPermissions(this.permObjectId)
      ) :
    { id:'id', name:'name', perm:[{ taskId: 'someTask', userId: 'unknown', perm: 'denied' }] }
  }

  get permTypes(): IdentifiedObject[] | [] {
    return vuexModulePermissions.permTypes;
  }

  @Watch('subHeader', { immediate: true })
  subHeaderChanged(newVal: string) {
    // console.log(this.$options.name, newVal);
    vuexModuleApplication.setSubHeader(newVal);
  }
}
</script>

<style scoped lang="scss">
  .perm-grid {
    th {
      font-weight: bold;
      color: #777;
    }
  }
</style>