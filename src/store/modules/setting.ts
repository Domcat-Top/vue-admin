// layout组建相关配置仓库
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SrttingStore', {
  state: () => {
    return {
      // 用户控制菜单折叠还是隐藏
      fold: false,
    }
  },
})

export default useLayoutSettingStore
