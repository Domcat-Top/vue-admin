// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user/index.ts'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import type { UserState } from './types/type'
// 引入工具类
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 引入路由：常量路由
import { constantRoute } from '@/router/routers'
// 创建用户小仓库
// 类似VueX，但不完全是
let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN('TOKEN'),
      // 仓库存储生成菜单需要的数组（路由）
      menuRoutes: constantRoute,
      username: localStorage.getItem('username'),
      avatar: localStorage.getItem('avatar'),
    }
  },
  // 异步 | 逻辑 的地方
  actions: {
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        // 存储token
        this.token = result.data.token as string
        // 本地存储一份
        SET_TOKEN(result.data.token as string)
        // 让当前的async函数返回一个成功的promise
        return 'OK'
      } else {
        // el组件弹出错误信息，告诉用户
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息的方法
    async userInfo() {
      let result = await reqUserInfo();
      // 存储一下用户信息
      if (result.code == 200) {
        // 这个如果按照上面的方法写的话，需要再去工具类创建一个类，再次封装
        localStorage.setItem('username', result.data.checkUser.username);
        localStorage.setItem('avatar', result.data.checkUser.avatar);
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    // 退出登录方法
    userLogout() {
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      localStorage.removeItem('TOKEN');
    }
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
