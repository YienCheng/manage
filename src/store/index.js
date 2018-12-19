import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
const modules = {
  userInfo
}

Vue.use(Vuex)
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules
})
export default store
