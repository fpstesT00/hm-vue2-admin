import router from '@/router'
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
/**
  *前置守卫
*/

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  // 有token的情况下
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      next('/') // 中转到主页
      nprogress.done()
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next() // 放过
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('./login')
      nprogress.done()
    }
  }
})

/**
  *后置守卫
*/
router.afterEach(() => {
  nprogress.done()
})
