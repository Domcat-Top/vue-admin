<template>
  <div>
    <h1>根组件</h1>
    <SvgIcon name="loading"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue'

// 组件挂载完毕，测试发送一个请求
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111',
    },
  }).then((response) => {
    console.log(response)
  })
})
</script>

<style></style>
