import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库数据state类型

export interface UserState {
  token: string | null
  // 路由对象的类型
  menuRoutes: RouteRecordRaw[]
  username: string | null
  avatar: string | null
}
