import {USERINFO_UPDATE} from '../../mutation-types.js'
import * as server from '@/service/index'
export default {
  async getUserInfo ({dispatch, commit}) {
    let res = await server.getUserInfo()
    if (res.code === 0) {
      commit(USERINFO_UPDATE, {...res.result})
    } else {
      commit(USERINFO_UPDATE, { nickname: '', username: '', _id: '' })
    }
    return res
  },
  async logout ({dispatch, commit, state}, payload) {
    let res = await server.logout(payload)
    if (res.code === 0) {
      commit(USERINFO_UPDATE, { nickname: '', username: '', _id: '' })
    }
    return res
  }
}
