<template>
  <div class="tabbar_right">
    <!-- 刷新 -->
    <el-button
      size="small"
      icon="Refresh"
      circle
      @click="updateRefsh"
    ></el-button>
    <!-- 全屏 -->
    <el-button
      size="small"
      icon="FullScreen"
      circle
      @click="fullScreen"
    ></el-button>
    <!-- 设置 -->
    <el-button size="small" icon="Setting" circle></el-button>
    <img
      src="../../../../public/logo.png"
      style="width: 24px; height: 24px; margin: 0px 10px"
    />
    <!-- 下拉菜单，退出登录 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        admin
        <el-icon class="el-icon--right">
          <arrow-down></arrow-down>
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
// 获取骨架的小仓库
import useLayoutSettingStore from '@/store/modules/setting'

let settingStore = useLayoutSettingStore()

let updateRefsh = () => {
  settingStore.refsh = !settingStore.refsh
}

// 点击了全屏按钮
// 这个只是适配了谷歌浏览器的全屏
let fullScreen = () => {
  // dom对象的一个属性，可以用来判断是不是全屏模式
  let full = document.fullscreenElement
  // 使用原生的dom实现切换
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style lang="scss">
.tabbar_right {
  display: flex;
  align-items: center;
}
</style>
