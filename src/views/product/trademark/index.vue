<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加按钮 -->
      <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
      <!-- 表格组件 -->
      <el-table style="margin: 10px 0px" border>
        <el-table-column
          label="序号"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="品牌名称" align="center"></el-table-column>
        <el-table-column label="品牌LOGO" align="center"></el-table-column>
        <el-table-column label="品牌操作" align="center"></el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :disabled="disabled"
        :background="true"
        layout="prev, pager, next, jumper, ->,total,sizes"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
</script>

<style></style>
