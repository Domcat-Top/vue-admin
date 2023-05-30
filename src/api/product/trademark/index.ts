import request from '@/utils/request.ts'
// 引入类型
import type { TradeMarkResponseData } from './type'
// 接口

enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}

// 获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
