<template>
  <div>
    <h1>欢迎回来</h1>
    <img :src="userStore.avatar" />
    <h2>{{ userStore.username }}</h2>
  </div>
</template>

<script setup lang="ts">
// 获取仓库
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()

</script>

<style></style>
