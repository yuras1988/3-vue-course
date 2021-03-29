<template>
    <h1 v-if="!hasTasks" class="text-white center">Задач пока нет</h1>
    <app-tasks v-else :appTasksModel="appTasksModel"></app-tasks>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'

import AppTasks from '../components/AppTasks'

export default {
  setup () {
    const store = useStore()
    const tasks = ref([])
    const count = ref(0)

    onMounted(() => {
      store.dispatch('getTasks').then(() => {
        tasks.value = store.getters.getAllTasks
        count.value = store.getters.getActiveTasksCount
      })
    })
    return {
      hasTasks: computed(() => tasks.value && tasks.value.length > 0),
      appTasksModel: {
        tasks,
        count
      }
    }
  },
  // data() {
  //     return {
  //         tasks: []
  //     }
  // },
  // computed: {
  //     hasTasks() {
  //         return this.tasks && this.tasks.length > 0
  //     },
  //     appTasksModel() {
  //         return {
  //             tasks: this.tasks,
  //             count: this.$store.getters.getActiveTasksCount
  //         }
  //     }
  // },
  // mounted() {
  //     this.$store.dispatch('getTasks').then(() => {
  //         this.tasks = this.$store.getters.getAllTasks
  //         // console.log('dispatch then tasks ', tasks)
  //     })
  // },
  components: { AppTasks }
}
</script>
