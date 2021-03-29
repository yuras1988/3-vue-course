<template>
    <form class="card" @submit.once.prevent="addNewTask">
        <h1>Создать новую задачу</h1>
        <div class="form-control">
            <label for="title">Название</label>
            <input type="text" id="title" v-model="name" />
        </div>

        <div class="form-control">
            <label for="date">Дата дэдлайна</label>
            <input type="date" id="date" v-model="deadline" />
        </div>

        <div class="form-control">
            <label for="description">Описание</label>
            <textarea id="description" v-model="description"></textarea>
        </div>

        <button class="btn primary" :disabled="!validForm">Создать</button>
    </form>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const name = ref('')
    const deadline = ref(null)
    const description = ref('')

    // console.log(tasks)
    // watch(name, (newValue) => {
    //     console.log(newValue)
    //     console.log(name.value.length)
    // })
    function addNewTask () {
      store
        .dispatch('addNewTask', {
          name: name.value,
          deadline: deadline.value,
          description: description.value
        })
        .then(() => {
          router.push('/')
        })
    }
    return {
      validForm: computed(
        () => name.value && deadline.value && description.value
      ),
      name,
      deadline,
      description,
      addNewTask
    }
  }
}
</script>
