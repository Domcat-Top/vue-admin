<template>
  <div class="logo">
    <img v-if="setting.logoHidden" :src="setting.logo" alt="">
    <p>{{setting.title}}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  // 这说是开启了一个浮动，但是俺不懂
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>