<template>
  <div class="tabbar">
    <Breadcrumb></Breadcrumb>
    <Setting></Setting>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  // 开启浮动，并且左右对齐进行漂浮
  display: flex;
  justify-content: space-between;
}
</style>