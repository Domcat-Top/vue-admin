<template>
  <div class="container">
    <!-- 数据大屏内容区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <MyMap class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Counter class="counter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from './components/top/index.vue'
// 引入左侧三个子组件
import Age from './components/age/index.vue'
import Sex from './components/sex/index.vue'
import Tourist from './components/tourist/index.vue'
// 中间两个子组件
import MyMap from './components/map/index.vue'
import Line from './components/line/index.vue'
// 右边的三个组件
import Counter from './components/counter/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'

import { ref, onMounted } from 'vue'
//获取数据大屏展示内容盒子的DOM元素
let screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
//定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
//监听视口变化---适配问题
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        margin-left: 40px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .counter {
          flex: 1;
        }
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3.5;
        }
        .line {
          flex: 1.5;
        }
      }
    }
  }
}
</style>
