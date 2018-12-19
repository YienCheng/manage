import { USERINFO_UPDATE } from '../../mutation-types.js'
/*
*更新用户信息中的state
*/
export default {
  [USERINFO_UPDATE] (state, payload) {
    Object.keys(payload).forEach((key) => {
      state[key] = payload[key]
    })
  }
}
