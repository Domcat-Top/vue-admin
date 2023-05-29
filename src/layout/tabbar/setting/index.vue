<template>
  <div class="tabbar_right">
    <el-button size="small" icon="Refresh" circle></el-button>
    <el-button size="small" icon="FullScreen" circle></el-button>
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

<script setup lang="ts"></script>
<script>
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
