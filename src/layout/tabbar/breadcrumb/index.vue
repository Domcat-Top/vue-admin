<template>
    <div class="tabbar_left">
      <el-icon style="margin-right: 10px">
        <Expand></Expand>
      </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>测试一个</el-breadcrumb-item>
        <el-breadcrumb-item>测试一个</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
  // 给左侧的面包屑也开启浮动
  .tabbar_left {
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
</style>