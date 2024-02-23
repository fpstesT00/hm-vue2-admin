import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
// 存放数据
const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {}
}

// 修改数据
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken() {
    // 删除vuex的token
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

// 异步操作
const actions = {
  // context上下文，传入参数
  async login(context, data) {
    // todo: 调用登录接口
    const token = await login(data)
    // 返回一个token '123456'
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    // console.log('测试')
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
