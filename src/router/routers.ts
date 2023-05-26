// 对外暴露配置路由（常量路由）
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命令路由，做权限可能用到
  },
  {
    // 登陆成功以后展示数据的路由
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    // 匹配路由，如果是错误的什么的，都跳转到404
    path: '/:pathMatch(.*)*',
    redirect: '404',
    name: 'Any',
  },
]
