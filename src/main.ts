import { createApp } from "vue";
import App from "@/App.vue";


// 引入ele-plus插件和样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 配置element国际化
// @ts-ignore     忽略ts的类型检测
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';


// 获取应用实例对象
const app = createApp(App);
// 安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn, // 国际化配置
});
// svg插件需要的配置代码
import 'virtual:svg-icons-register';

// // 全局注册svg组件
// import SvgIcon from '@/components/Svgicon/index.vue';
// app.component('SvgIcon', SvgIcon);
// 引入自定义插件对象：注册整个项目的全局组件
import globalComponents from '@/components/index.ts';
app.use(globalComponents);

// 引入模板的全局样式

// 挂载
app.mount(`#app`);

