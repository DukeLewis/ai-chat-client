import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import chat from './modules/chat'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    chat
  },
  plugins: [
    createPersistedState({
      // 可以根据需要配置存储位置、存储方式等
      storage: window.localStorage,
      // 选择要持久化的模块
      paths: ['chat']
    })
  ],
  getters
})

export default store
