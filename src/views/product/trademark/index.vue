<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加按钮 -->
      <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
      <!-- 表格组件 -->
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="品牌名称"
          align="center"
          prop="tmName"
        ></el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #="{ row, $index }">
            <img
              alt="未有图片"
              :src="row.logoUrl"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="{ row, $index }">
            <el-button type="warning" size="small" icon="Edit"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->,total,sizes"
        :total="total"
        @size-change="sizeChange"
        @current-change="changePageNo"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入需要用到的接口方法
import { reqHasTrademark } from '@/api/product/trademark/index.ts'
// 引入定义好的type
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
// 总数
let total = ref<number>(0)
// 详细数据
let trademarkArr = ref<Records>([])
// 封装为函数---获取某一页的数据
const getHasTrademark = async () => {
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr = result.data.records
  }
}

onMounted(() => {
  getHasTrademark()
})
// 分页器页码改变触发
const changePageNo = () => {
  getHasTrademark()
}
// 每页显示条数改变
const sizeChange = () => {
  // 发生页面条数变化后，默认回到第一页
  pageNo.value = 1
  getHasTrademark()
}
</script>

<style></style>
