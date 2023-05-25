
// 引入项目中的全局组件
import SvgIcon from './SvgIcon/index.vue';

// 全局对象
const allGlobalComponent = { SvgIcon };
// 对外暴露插件对象
export default {
    install(app) {
        // 注册项目全部的全局组件
        Object.keys(allGlobalComponent).forEach(key => {
            app.component(key, allGlobalComponent[key]);
        })
    }
}