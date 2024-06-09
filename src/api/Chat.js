import { url } from '@/api/url'
import { getToken } from '@/utils/auth'
export const Chat = {
  chatCompletion(data) {
    return fetch(url.Chat.chatCompletions, {
      method: 'post',
      headers: {
        'X-Token': getToken(),
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
  }
}
