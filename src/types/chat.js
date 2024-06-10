export const MessageRole = Object.freeze({
  system: 0,
  user: 1,
  assistant: 2
})

export const MessageType = Object.freeze({
  Link: 'link',
  Pic: 'pic',
  Text: 'text'
})

export const MessageDirection = Object.freeze({
  Send: 0,
  Receive: 1
})

export const GptVersion = Object.freeze({
  TEXT_DAVINCI_003: 'text-davinci-003',
  TEXT_DAVINCI_002: 'text-davinci-002',
  DAVINCI: 'davinci',
  GPT_3_5_TURBO: 'gpt-3.5-turbo',
  GPT_3_5_TURBO_16K: 'gpt-3.5-turbo-16k',
  GPT_4: 'gpt-4',
  GPT_4_32K: 'gpt-4-32k',
  GLM_TURBO: 'chatglm_turbo'
})
