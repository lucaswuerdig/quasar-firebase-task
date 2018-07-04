import { LocalStorage } from 'quasar'
import Vue from 'vue'

export const newTask = (context, task) => {
  let db = Vue.prototype.$auth.app.firebase_.database()
  let user = LocalStorage.get.item('user')
  db.ref('tasks/' + user.uid).push({
    title: task.title,
    description: task.description,
    dateTask: task.date_task,
    status: task.status
  })
  context.commit('ADD_TASK', task)
  return Promise.resolve(true)
}

export const getTask = (context) => {
  let db = Vue.prototype.$auth.app.firebase_.database()
  let user = LocalStorage.get.item('user')
  db.ref('tasks/' + user.uid).orderByChild('dateTask').on('value', function (snapshot) {
    context.commit('CLEAR_TASK', [])
    context.commit('SET_TASK', snapshot.val())
    return Promise.resolve(true)
  })
}

export const deleteTask = (context, key) => {
  let db = Vue.prototype.$auth.app.firebase_.database()
  let user = LocalStorage.get.item('user')
  db.ref('tasks/' + user.uid + '/' + key).remove()
}
