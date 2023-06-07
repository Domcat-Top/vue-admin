<template>
  <div class="box4" ref="map"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 引入中国地图Json
import chinaJson from './china.json'
// 获取dom
let map = ref()

// 注册中国地图
echarts.registerMap('china', chinaJson as any)
// 组件挂载完毕绘制地图
onMounted(() => {
  let myEcharts = echarts.init(map.value)
  let option = {
    // 地图组件
    geo: {
      // 上面注册的
      map: 'china',
      // 鼠标缩放效果
      roam: false,
      // 地图上文字显示
      label: {
        show: true,
      },
      itemStyle: {
        // 透明效果
        // opacity: 0.9,
      },
    },
    series: [
      {
        // 航线的系列
        type: 'lines',
        data: [
          {
            coords: [
              // 起点
              [116.405285, 39.904989],
              // 和终点
              [87.617733, 43.792818],
            ],
            // 航线样式
            lineStyle: {
              color: 'blue',
              width: 3,
            },
          },
        ],
        // 是否显示特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'red',
          symbolSize: 20,
        },
      },
    ],
  }
  myEcharts.setOption(option)
})
</script>

<style lang="scss" scoped>
</style>