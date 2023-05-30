
// 定义用户相关数据的ts

// 登录接口
export interface loginFormData {
  username: string,
  password: string,
}
// 全部接口返回都拥有的数据类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,
}

// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string,
}

// 获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: [],
    buttons: string[],
    roles: string[],
    name: string,
    avatar: string,
  }
}

