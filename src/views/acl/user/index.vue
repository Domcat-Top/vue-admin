<template>
  <div>
    <el-card style="height: 75px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">搜索</el-button>
          <el-button type="default" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0px" border>
      <el-button type="primary">添加</el-button>
      <el-button type="danger">批量删除</el-button>
      <!-- 展示用户信息 -->
      <el-table style="margin: 10px 0px">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="ID" align="center"></el-table-column>
        <el-table-column label="用户名字" align="center"></el-table-column>
        <el-table-column label="用户名称" align="center"></el-table-column>
        <el-table-column label="用户角色" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center"></el-table-column>
        <el-table-column label="更新时间" align="center"></el-table-column>
        <el-table-column
          label="操作"
          width="260px"
          align="center"
        ></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, sizes, ->, total"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 设置默认页码
let pageNo = ref<number>(1)
// 一页展示几条数据
let pageSize = ref<number>(5)
</script>

<style lang="scss">
.form {
  // 开启弹性模型
  display: flex;
  // 一左一右，主轴对齐
  justify-content: space-between;
  // 水平居中
  align-items: center;
}
</style>
