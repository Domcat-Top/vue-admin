<template>
  <div class="tabbar_left">
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $router.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <!-- 这里放图标 -->
        <el-icon style="margin: 0px 5px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 这个是title -->
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
// 获取layout相关的配置仓库
let LayoutSettingStore = useLayoutSettingStore()

let changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}

let $router = useRoute()
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style lang="scss">
// 给左侧的面包屑也开启浮动
.tabbar_left {
  margin-left: 20px;
  display: flex;
  align-items: center;
}
</style>
