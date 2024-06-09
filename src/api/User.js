import request from '@/utils/request'
import { url } from '@/api/url'

export const User = {
  login(data) {
    return request({
      url: url.User.login,
      method: 'post',
      data
    })
  },
  register(data) {
    return request({
      url: url.User.register,
      method: 'post',
      data
    })
  }
}
