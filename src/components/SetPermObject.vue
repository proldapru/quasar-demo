<template>
  <tr>
    <td class="text-left">{{ title }}</td>
    <td v-for="permType in permTypes" :key="[taskId, userId, permType.id].join('_')" class="text-center">
      <q-radio dense v-model="curPerm" :val="permType.id" />
    </td>
  </tr>

</template>

<script lang="ts">
import { Prop, Watch, Options, Vue } from 'vue-property-decorator';
import vuexModulePermissions from '../store/module-permissions';

@Options({
  name: 'SetPermObject'
})
export default class SetPermObject extends Vue {
  @Prop(String) readonly title!: string;
  @Prop(String) readonly taskId!: string;
  @Prop(String) readonly userId!: string;
  @Prop(String) readonly perm!: string;

  curPerm: string = this.perm;

  get permTypes() {
    return vuexModulePermissions.permTypes;
  }

  @Watch('curPerm')
  onCurPermChanged(newVal: string) {
    vuexModulePermissions.modifyPermission({ taskId: this.taskId, userId: this.userId, perm: newVal })
      .finally(()=>{
        this.$q.notify({
          message: 'Изменения применены',
          position: 'top-right',
          timeout: 2000,
        })
      })
  }
}
</script>