<template>
  <div class="login_container">
    <el-form>
      <el-row>
        <!-- xs：设备屏幕宽度小于768，左边不显示了 -->
        <el-col :span="12" :xs="0"></el-col>
        <!-- 右边 -->
        <el-col :span="12" :xs="24">
          <!-- 表单 -->
          <el-form
            class="login_form"
            :model="loginForm"
            :rules="rules"
            ref="loginForms"
          >
            <h1>Hello</h1>
            <h2>欢迎来到硅谷甄选</h2>
            <el-form-item prop="username">
              <!-- 账号 -->
              <el-input
                class="login_item"
                :prefix-icon="User"
                v-model="loginForm.username"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                class="login_item"
                type="password"
                :prefix-icon="Lock"
                v-model="loginForm.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login_btn login_item"
                type="primary"
                size="default"
                :loading="controlLoading"
                @click="login"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 路由
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 时间工具类
import { getTime } from '@/utils/time'

let $router = useRouter()

let useStore = useUserStore()
let controlLoading = ref(false)
// 账号和密码的数据
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})
// 获取到表单实例
let loginForms = ref()
// 想获取到成功还是失败的回调，可以用then方法，或者使用trycatch
const login = async () => {
  // 登陆之前判断一下输入的数据是否合法
  // 返回一个promise对象，如果这个对象是成功的，才会继续执行下面的代码
  await loginForms.value.validate()
  // 加载图标
  controlLoading.value = true
  // 发登录请求
  // 请求成功--跳转到首页
  try {
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi, ${getTime()}好`,
    })
    controlLoading.value = false
  } catch (error) {
    controlLoading.value = false
    // 请求失败--弹出登录失败信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
// 自定义校验规则需要的函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule：即为校验规则对象
  // value：即为表单元素文本内容
  // 函数：如果符合条件，callback放行通过
  // 如果不符合条件，callback注入错误提示信息

  // 这里可以写正则，也可以直接写一些简单的判断
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度不符合条件！'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  // 这里可以写正则，也可以直接写一些简单的判断
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度不符合条件！'))
  }
}
// 定义表单校验需要的配置对象
const rules = {
  // 第一种第一种第一种第一种第一种第一种第一种
  // 规则对象属性
  // required：代表这个字段必须校验
  // min：最小长度
  // max：最大长度
  // message：错误的提示信息
  // trigger：触发行为
  // username: [
  //   { required: true, message: `用户名不能为空`, trigger: `blur` },
  //   {
  //     min: 5, max: 10, message: `账号长度不符合规范`, trigger: `change`,
  //   },
  // ],
  // password: [
  //   { required: true, message: `密码不能为空`, trigger: `blur` },
  //   {
  //     min: 6, max: 10, message: `密码长度不符合规范`, trigger: `change`,
  //   },
  // ],
  // -------------------------------
  // 第二种--自定义校验规则，更高级了------------
  username: [{ trigger: `change`, validator: validatorUserName }],
  password: [{ trigger: `change`, validator: validatorPassword }],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  // 视口的高度
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form {
  padding: 45px;
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }
  .login_btn {
    width: 100%;
  }
  .login_item {
    height: 35px;
  }
}
</style>
