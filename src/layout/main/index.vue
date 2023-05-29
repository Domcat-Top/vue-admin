<template>
  <!-- 路由组件的出口位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <!-- 这样做可以在路由切换的时候，稍微的添加一些过度动画，看起来舒服点 -->
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'

let settingStore = useLayoutSettingStore()

let flag = ref(true)

watch(
  () => settingStore.refsh,
  () => {
    // 点击刷新按钮，需要销毁当前组件，然后重新创建
    // 逻辑就是：v-if销毁当前组件
    flag.value = false
    // 然后nextTick再创建出这个组件
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
