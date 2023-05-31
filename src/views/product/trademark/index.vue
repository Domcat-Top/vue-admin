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
              @click="updateTrademark(row)"
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
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称：" label-width="130px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO：" label-width="130px" prop="logoUrl">
          <!-- 
            action：图片需要提交的目的地，，需要根据需求填写前缀和路由
            不然代理服务器不发送这次请求
            before-upload：约束上传文件的类型和大小
           -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
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
import { ref, onMounted, reactive, nextTick } from 'vue'
// 引入需要用到的接口方法
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
} from '@/api/product/trademark/index.ts'
// 引入定义好的type
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

let pageNo = ref<number>(1)
let limit = ref<number>(3)
// 总数
let total = ref<number>(0)
// 详细数据
let trademarkArr = ref<Records>([])
// 控制对话框的显示和隐藏
let dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取组件实例----给组件加了ref元素，然后这样就能获取到，可能是一个新用法，俺也不太晓得
let formRef = ref()
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
  // 展示数据之前，先清空了之前的数据残留
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 控制对话框的显示
  dialogFormVisible.value = true
  // ts的问号语法或者nexttick
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
// 修改品牌按钮的回调函数
const updateTrademark = async (raw: TradeMark) => {
  // ts的问号语法或者nexttick
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  // 控制对话框的显示
  dialogFormVisible.value = true
  trademarkParams.id = raw.id
  trademarkParams.tmName = raw.tmName
  trademarkParams.logoUrl = raw.logoUrl
  // 因为是使用了同一个接口，所以这里就不需要调用接口了，直接confim方法就给提交上去了
}
// 对话框隐藏
const cancel = () => {
  dialogFormVisible.value = false
}
// 确定
const confirm = async () => {
  // 提交之前校验整个表单，主要是为了实现图片上传的校验
  // 调用这个方法，对全部的表单元素进行验证
  // 只有全部通过了，才执行后面的方法---加了await就是指等这个方法之行完全结束了，才执行后面的代码
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    // 关闭对话框
    dialogFormVisible.value = false
    // 弹出响应的提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    // 再次发请求获取全部品牌数据
    pageNo.value = 1
    getHasTrademark()
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    // 关闭对话框
    dialogFormVisible.value = false
  }
}
// 文件上传之前的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // png jpg gif  4M
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 <= 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '文件要小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件的格式务必是png、jpg、gif类型',
    })
    return false
  }
}
// 文件上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // response是文件返回对象
  // uploadFile是文件对象 + 文件返回对象，参数更加全面了
  trademarkParams.logoUrl = response.data
  // 文件上传成功，需要在这里手动清除掉红色的那张小字提示信息
  formRef.value.clearValidate('logoUrl')
}

// 表单校验方法
// 品牌ID的长度
const validatorTmName = (rule: any, value: any, callBack: any) => {
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称长度需要大于2！'))
  }
}
// 图片的校验
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  // value是图片上传后的路径
  if (value) {
    callBack()
  } else {
    callBack(new Error('LOGO图片务必上传！'))
  }
}
// 表单校验规则对象
const rules = {
  // 失去焦点时执行---blur
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }],
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
