// 对外暴露配置路由（常量路由）
export const constantRoute = [
  {
    // 登录---不用那个布局，直接一层
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命令路由，做权限可能用到
    meta: {
      title: '登录',
      //  代表路由标题在菜单中是否隐藏
      hidden: true,
    },
  },
  {
    // 登陆成功以后展示数据的路由---难道想用这个布局的话，只能这样写吗
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout',
      //  代表路由标题在菜单中是否隐藏
      hidden: false,
      icon: 'Flag',
    },
    // 当访问根目录的时候，也就是 / ，直接给她重定向到home
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
          icon: 'House',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      //  代表路由标题在菜单中是否隐藏
      hidden: true,
    },
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
    },
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      hidden: false,
      title: '权限管理',
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'Acl',
        meta: {
          title: '用户管理',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
      hidden: false,
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'Spu管理',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'Sku管理',
          //  代表路由标题在菜单中是否隐藏
          hidden: false,
          icon: 'Orange',
        },
      },
    ],
  },
]
