<template>
    <h3 class="text-white">
        Всего активных задач: {{ appTasksModel.count.value }}
    </h3>
    <div class="card" v-for="task in appTasksModel.tasks.value" :key="task.id">
        <h2 class="card-title">
            {{ task.name }}
            <AppStatus :type="task.type" />
        </h2>
        <p>
            <strong>
                <small>
                    {{ task.deadline }}
                </small>
            </strong>
        </p>
        <router-link :to="'/task/' + task.id">
            <button class="btn primary">Посмотреть</button>
        </router-link>
    </div>
</template>

<script>
import AppStatus from './AppStatus'
export default {
  props: ['appTasksModel'],
  components: { AppStatus }
}
</script>

<style>
</style>
