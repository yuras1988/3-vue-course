<template>
    <div v-if="task" class="card">
        <h2>{{ task.name }}</h2>
        <p><strong>Статус</strong>: <AppStatus :type="task.type" /></p>
        <p><strong>Дэдлайн</strong>: {{ task.deadline }}</p>
        <p><strong>Описание</strong>: {{ task.description }}</p>
        <div>
            <button class="btn" @click="changeType('inprogress')">
                Взять в работу
            </button>
            <button class="btn primary" @click="changeType('finished')">
                Завершить
            </button>
            <button class="btn danger" @click="changeType('canceled')">
                Отменить
            </button>
        </div>
    </div>
    <h3 v-else class="text-white center">
        Задачи с id = <strong>{{ id }}</strong> нет.
    </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { useStore } from 'vuex'
export default {
  props: ['id'],
  setup (props) {
    const store = useStore()
    // console.log(task)
    function changeType (type) {
      store.dispatch('changeTaskType', {
        id: props.id,
        type
      })
    }
    return {
      changeType,
      task: store.getters.getTaskById(props.id)
    }
  },
  components: { AppStatus }
}
</script>

<style scoped>
</style>
