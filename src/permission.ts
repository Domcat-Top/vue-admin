import router from './router'
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 关闭进度条加载时候的小圆球，也可以不关
nprogress.configure({ showSpinner: false });
// 路由鉴权
// 项目当中路由能不能被权限的设置（什么时候可以访问，什么时候不能访问）

// 获取用户小仓库的TOKEN数据，去判断用户是否登陆成功
// 这里不能直接用useUserStore，因为permission.ts和main.ts同级，不能拿到pinia
import useUserStore from './store/modules/user'
import pinia from './store/index.ts'
let userStore = useUserStore(pinia);

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // to：你将要访问那个路由
  // from：你从哪个路由来的
  // next：路由的放行函数
  nprogress.start()
  // 判断是否登录
  let token = userStore.token;
  // 获取用户名字
  let username = userStore.username;
  // 已登录
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' });
    } else {
      // 登录成功访问其他路由
      // 访问之前判断一下是否存在用户名和头像等信息
      if (username) {
        next();
      } else {
        // 获取到这些信息，再进行页面的跳转
        try {
          await userStore.userInfo();
        } catch (error) {
          // 用户手动更改了TOKEN
          // TOKEN过期了，等等行为，会执行这里
          userStore.userLogout();
          // 这个重定向有问题，还是没实现了
          next({ path: '/login', query: { redirect: to.path } });
        }
      }
    }
  } else {
    // 未登录
    if (to.path == '/login') {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  next()
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  // 页面跳转后，修改网页页签的title
  document.title = '硅谷甄选 - ' + to.meta.title;
  nprogress.done()
})
