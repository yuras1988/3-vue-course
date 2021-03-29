import { createStore } from 'vuex'
import axios from 'axios'

function isCanceled (datepayload) {
  return new Date(datepayload).getTime() < new Date().setHours(0, 0, 0, 0)
}

export default createStore({
  state () {
    return {
      tasks: []
    }
  },
  mutations: {
    getTasks (state, payload) {
      state.tasks = Object.keys(payload).map(key => {
        return {
          id: key,
          ...payload[key]
        }
      })
      // console.log('Tasks from Vuex.Store:', state.tasks)
    },
    addNewTask (state, payload) {
      state.tasks.push({
        id: payload.id,
        name: payload.name,
        type: isCanceled(payload.deadline) ? 'canceled' : 'active',
        deadline: new Date(payload.deadline).toLocaleDateString(),
        description: payload.description
      })
    },
    changeTaskType (state, payload) {
      const index = state.tasks.findIndex(t => t.id === payload.id) //= payload.type
      state.tasks[index].type = payload.type
    }
  },
  actions: {
    addNewTask ({ commit, state }, payload) {
      payload.id = (state.tasks?.length + 1).toString()
      payload.type = isCanceled(payload.deadline) ? 'canceled' : 'active'
      return new Promise(resolve => {
        axios
          .post(
            'https://vue-course-d33c9-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
            {
              // id: (state.tasks?.length + 1).toString(), //(Math.random() * 100000).toFixed(),
              name: payload.name,
              type: isCanceled(payload.deadline)
                ? 'canceled'
                : 'active',
              deadline: new Date(
                payload.deadline
              ).toLocaleDateString(),
              description: payload.description
            }
          )
          .then(response => {
            payload.id = response.data.name
            console.log(response)
            commit('addNewTask', payload)
            resolve()
          })
      })
    },
    changeTaskType ({ commit }, payload) {
      axios
        .patch(
                    `https://vue-course-d33c9-default-rtdb.europe-west1.firebasedatabase.app/tasks/${payload.id}.json`,
                    {
                      type: payload.type
                    }
        )
        .then(response => {
          console.log(response)
          commit('changeTaskType', payload)
        })
      commit('changeTaskType', payload)
    },
    getTasks ({ commit }) {
      return new Promise(resolve => {
        axios
          .get(
            'https://vue-course-d33c9-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
          )
          .then(response => {
            console.log(response)
            commit('getTasks', response.data ?? [])
            resolve()
          })
      })
    }
  },

  getters: {
    getAllTasks (state) {
      return state.tasks
    },
    getActiveTasksCount (state) {
      return state.tasks.filter(t => t.type === 'active').length
    },
    getTaskById: state => id => {
      return state.tasks.find(t => t.id === id)
    }
  }

  // actions: {
  // },
  // modules: {
  // }
})
