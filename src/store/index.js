import Vue from 'vue'
import Vuex from 'vuex'
import {CHANGE_COUNTER, PLUS_COUNTER, CHANGE_SIDE, CHANGE_USER, ENABLE_ADDITIONAL_SCANS} from './mutation-types.js'
import {HTTP} from '@/api/http-common.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    side: 'right',
    user: 0,
    additionalScans: false
  },

  getters: {
    user: (state) => {
      return state.user
    },

    accuracy: (state) => {
      return (state.user) ? state.user.accuracy : 0
    }
  },

  mutations: {
    [CHANGE_COUNTER](state, newCounter) {
      state.counter = newCounter
    },
    [PLUS_COUNTER](state, n = 1) {
      state.counter += n
    },
    [CHANGE_SIDE](state, side = 'left') {
      state.side = side
    },
    [CHANGE_USER](state, user) {
      state.user = user
    },
    [ENABLE_ADDITIONAL_SCANS](state) {
      state.additionalScans = true
    }
  },

  actions: {
    getUser(context) {
      return new Promise((resolve) => {
        HTTP('user')
          .then((response) => {
            context.commit(CHANGE_USER, response.data.user)
            resolve(response.data)
          })
          .catch(() => {
          })
      })
    },

    userExit(context) {
      HTTP('userExit')
        .then(() => {
          context.commit(CHANGE_USER, 0)
        })
        .catch(() => {
        })
    }
  }
})
