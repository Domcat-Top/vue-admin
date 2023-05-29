// layout组建相关配置仓库
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SrttingStore', {
  state: () => {
    return {
      // 用户控制菜单折叠还是隐藏
      fold: false,
      refsh: false, // 控制刷新效果
    }
  },
})

export default useLayoutSettingStore
