<template>
  <tr>
    <td class="text-left">{{ title }}</td>
    <td v-for="permType in permTypes" :key="[taskId, userId, permType.id].join('_')" class="text-center">
      <q-radio dense v-model="curPerm" :val="permType.id" />
    </td>
  </tr>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SetPermObject',

  data() {
    return {
      curPerm: this.perm,
    }
  },

  props: {
    title: {type: String, required: true},
    taskId: {type: String, required: true},
    userId: {type: String, required: true},
    perm: {type: String, required: true},
  },

  computed: {
    permTypes() {
      return this.$store.getters['permissions/permTypes'];
    },
  },

  watch: {
    curPerm(newVal: string) {
      this.$store.dispatch('permissions/modifyPermission', {
        taskId: this.taskId,
        userId: this.userId,
        perm: newVal,
      }).then(()=>{
        this.$q.notify({
          message: 'Изменения применены',
          position: 'top-right',
          timeout: 2000,
        })
      })

    }
  },

})
	
</script>