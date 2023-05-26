// 引入项目中的全局组件
import SvgIcon from './SvgIcon/index.vue'
// 全局引入icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局对象
const allGlobalComponent = { SvgIcon }
// 对外暴露插件对象
export default {
  install(app) {
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
    // 把饿了么提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
