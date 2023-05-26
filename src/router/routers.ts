// 对外暴露配置路由（常量路由）
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命令路由，做权限可能用到
    meta: {
      title: '登录',
      //  代表路由标题在菜单中是否隐藏
      hidden: true,
    }
  },
  {
    // 登陆成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout',
      //  代表路由标题在菜单中是否隐藏
      hidden: false,
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
        },
      },
      {
        path: '/test',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '测试',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
        },
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      //  代表路由标题在菜单中是否隐藏
      hidden: true,
    }
  },
  {
    // 匹配路由，如果是错误的什么的，都跳转到404
    path: '/:pathMatch(.*)*',
    redirect: '404',
    name: 'Any',
    meta: {
      title: '任意路由',
      //  代表路由标题在菜单中是否隐藏
      hidden: true,
    }
  },
]
