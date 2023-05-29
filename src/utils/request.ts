// 进行 axios 的二次封装：使用它的请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入用户相关仓库
import useUserStore from '@/store/modules/user'
// 使用axios对象的create方法，去创建axios实例
// 基础路径、请求超时时间等
let request = axios.create({
  // 基础路径----自动的帮我们加上了这个基础url
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会自动携带/api
  timeout: 5000, // 超市的时间设置
})

// 第二步：给request实例添加请求与响应拦截器
// 这个是请求拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器携带公共参数
  let userStore = useUserStore();
  // 请求发送之前，如果有token，给请求头添加token
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  // 返回配置对象
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功的回调
    // 简化数据
    return response.data
  },
  (error) => {
    //  失败的回调：处理http网络错误的回调
    // 定义一个变量存储网络错误信息
    let message = ''
    // http状态码
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'Token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
    }
    ElMessage({
      type: 'error',
      // kv一致，省略v
      message,
    })
    return Promise.reject(error)
  },
)

export default request
