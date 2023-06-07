<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">{{ time }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeMount } from 'vue'
import moment from 'moment'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
let timer = ref(0)
// 组件挂载完毕，开启前端定时器，每隔一秒变化一下时间
onMounted(() => {
  // 前端定时器，学到了吗，记住了嗷！
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日:hh时mm分ss秒')
  })
})
// 组件销毁之前，清除掉计时器
onBeforeMount(() => {
  clearInterval(timer.value)
})
// 时间
let time = ref(moment().format('YYYY年MM月DD日:hh时mm分ss秒'))
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .lbtn {
      height: 150px;
      width: 40px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }
  .right {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
    }
    .time {
      color: #29fcff;
      margin-right: 20px;
      font-size: 20px;
    }
  }
}
</style>
