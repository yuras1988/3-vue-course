import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks'
import NewTask from '../views/New'
import Task from '../views/Task'

const routes = [
  {
    path: '/',
    component: Tasks
  },
  {
    path: '/new',
    component: NewTask
  },
  {
    path: '/task/:id',
    component: Task,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
