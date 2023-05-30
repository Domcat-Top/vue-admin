<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
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
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="updateTrademark"
            ></el-button>
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
    <!-- 对话框，添加和修改时候使用 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称：" label-width="130px">
          <el-input placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO：" label-width="130px">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽footer，实现弹出框下面的两个按钮 -->
      <template #footer>
        <el-button type="default" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
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
// 控制对话框的显示和隐藏
let dialogFormVisible = ref<boolean>(false)
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
// 添加品牌按钮的回调函数
const addTrademark = () => {
  // 控制对话框的显示
  dialogFormVisible.value = true
}
// 修改品牌按钮的回调函数
const updateTrademark = () => {
  // 控制对话框的显示
  dialogFormVisible.value = true
}
// 对话框隐藏
const cancel = () => {
  dialogFormVisible.value = false
}
// 确定
const confirm = () => {
  dialogFormVisible.value = false
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
