<template>
  <div>
    <h1>欢迎回来</h1>
    <img :src="userStore.avatar" />
    <h2>{{ userStore.username }}</h2>
  </div>
</template>

<script setup lang="ts">
// 引入生命周期函数
import { onMounted } from 'vue'
// 获取仓库
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()

// 页面挂载完毕则直接获取用户信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<style></style>
