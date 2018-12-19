import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

const state = {
  username: '',
  nickname: '',
  _id: ''
}

export default {
  state,
  getters,
  mutations,
  actions
}
