import { getToken, setToken, removeToken } from '@/utils/auth'
// 存放数据
const state = {
  token: getToken()// 从缓存中读取初始值
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
  }
}

// 异步操作
const actions = {
  // context上下文，传入参数
  login(context, data) {
    // console.log(data)
    console.log(context)
    // todo: 调用登录接口
    // 返回一个token '123456'
    context.commit('setToken', '123456')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
