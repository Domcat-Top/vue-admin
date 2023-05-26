<template>
  <div class="login_container">
    <el-form>
      <el-row>
        <!-- xs：设备屏幕宽度小于768，左边不显示了 -->
        <el-col :span="12" :xs="0"></el-col>
        <!-- 右边 -->
        <el-col :span="12" :xs="24">
          <!-- 表单 -->
          <el-form class="login_form">
            <h1>Hello</h1>
            <h2>欢迎来到硅谷甄选</h2>
            <el-form-item>
              <!-- 账号 -->
              <el-input
                class="login_item"
                :prefix-icon="User"
                v-model="loginForm.username"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item class="">
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

let $router = useRouter()

let useStore = useUserStore()
let controlLoading = ref(false)
// 账号和密码的数据
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})
// 想获取到成功还是失败的回调，可以用then方法，或者使用trycatch
const login = async () => {
  controlLoading.value = true
  // 发登录请求
  // 请求成功--跳转到首页
  try {
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
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
