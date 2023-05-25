<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
// 接收父组件传递过来的参数
defineProps({
  // xlink:href属性值前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: String,
  // 父组件传递的颜色
  color: {
    default: "",
    type: String,
  },
  width: {
    default: "16px",
    type: String,
  },
  height: {
    default: "16px",
    type: String,
  },
});
</script>

<style>
</style>