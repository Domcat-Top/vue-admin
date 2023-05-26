<template>
  <div>
    <template v-for="(item, index) in menuList" :key="item.path">
      <!-- 没有子路由的那些item -->
      <template v-if="!item.children">
        <el-menu-item :index="item.path" v-if="!item.meta.hidden">
          <template #title>
            <span>图标</span>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由，但是子路由的个数为1 -->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <template #title>
          <span>图标</span>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
      </template>
      <!-- 有子路由，并且子路由的个数大于1 -->
      <el-sub-menu
        v-if="item.children && item.children.length > 1"
        :index="item.path"
      >
        <template #title>
          <span>图标&nbsp;</span>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 这里使用递归，把孩子放进去，再次进行循环，直到最后一层 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
// 获取父组件传递过来的全部路由数组
defineProps(['menuList'])
</script>

<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<style>
</style>