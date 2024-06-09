
export const url = {
  User: {
    login: '/auth/login',
    register: '/auth/register'
  },
  Sale: {
    createPayOrder: '/sale/create_pay_order',
    queryProductList: '/sale/query_product_list'
  },
  Chat: {
    chatCompletions: process.env.VUE_APP_BASE_API + '/chatglm/chat/completions'
  }
}
