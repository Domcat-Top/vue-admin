import router from './router'
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 路由鉴权
// 项目当中路由能不能被权限的设置（什么时候可以访问，什么时候不能访问）

// 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  // to：你将要访问那个路由
  // from：你从哪个路由来的
  // next：路由的放行函数
  nprogress.start()
  next()
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
