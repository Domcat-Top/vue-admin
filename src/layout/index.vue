<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="LayoutSettingStore.fold ? true : false"
          :default-active="$router.path"
          background-color="#001529"
          text-color="white"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayoutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
// 引入菜单组件
import useUserStore from '@/store/modules/user'
// 顶部
import Tabbar from './tabbar/index.vue'
// 引入小仓库
import useLayoutSettingStore from '@/store/modules/setting'
let userStore = useUserStore()
let $router = useRouter()
// 获取小仓库
let LayoutSettingStore = useLayoutSettingStore()
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    // 添加折叠的过度动画
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    // 如果有fold，宽度重新设置，设置为50px
    // 这里的 & 不能省去，我也不晓得为什么
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    // 宽度是向左推过去一个菜单栏的宽度，秒啊
    left: $base-menu-width;
    // 添加折叠的过度动画
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      // 向左推动的距离也变成了最小的宽度距离
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    // 这里用固定定位也可以，但是视频里面是absolute，俺也不晓得
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: cadetblue;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    // 滚动效果----在这个区域设置，只滚动这个区域，别的区域是不滚动的
    overflow: auto;
    // 添加折叠的过度动画
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      // 向左推动的距离也变成了最小的宽度距离
      left: $base-menu-min-width;
    }
  }
}
</style>
