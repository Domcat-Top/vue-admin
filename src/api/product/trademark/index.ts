import request from '@/utils/request.ts'
// 引入类型
import type { TradeMark, TradeMarkResponseData } from './type'
// 接口

enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 新增品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
}

// 获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
// 添加和修改已有品牌的接口方法
// 根据id判断，如果有id，则是修改，如果没有id，则是新增
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  // 根据传过来的数据看，如果穿过来的数据携带了ID，则是更新
  // 如果传递的数据没带ID，则是新增
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.put<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
