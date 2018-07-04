import {LocalStorage} from 'quasar'
import {isEmpty} from 'lodash'
import Vue from 'vue'

export const setUser = (context, user) => {
  context.commit('SET_USER', user)
  LocalStorage.set('user', user)
}

export const setToken = (context, token) => {
  return new Promise((resolve, reject) => {
    context.commit('SET_TOKEN', token)
    LocalStorage.set('token', token)
    resolve(true)
  })
}

export const checkToken = (context) => {
  let token = LocalStorage.get.item('token')
  if (!isEmpty(token)) {
    context.commit('SET_TOKEN', token)
    context.dispatch('loadUser')
    return Promise.resolve(true)
  }
  return Promise.reject(new Error('Token not exists'))
}

export const loadUser = (context) => {
  let user = LocalStorage.get.item('user')
  if (!isEmpty(user)) {
    context.commit('SET_USER', user)
    return Promise.resolve(true)
  }
  return Promise.reject(new Error('User not loaded'))
}

export const logout = (context) => {
  let auth = Vue.prototype.$auth
  auth.signOut().then(() => {
    LocalStorage.remove('token')
    LocalStorage.remove('user')
    context.commit('SET_TOKEN', null)
    context.commit('SET_USER', null)
    if (!isEmpty(context.state.token) && !isEmpty(context.state.user)) {
      return Promise.reject(new Error('Failed to logout'))
    }
    return Promise.resolve(true)
  }).catch((error) => {
    return Promise.reject(new Error(error))
  })
}
