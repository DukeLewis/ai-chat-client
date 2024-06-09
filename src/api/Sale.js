import request from '@/utils/request'
import { url } from '@/api/url'

export const Sale = {
  getProductList() {
    return request.get(url.Sale.queryProductList)
  },
  createPayOrder(params) {
    return request({
      url: url.Sale.createPayOrder,
      method: 'get',
      params
    })
  }
}
