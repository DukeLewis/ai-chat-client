import { GptVersion, MessageDirection, MessageRole, MessageType } from '@/types/chat'
const state = {
  ChatSession: {
    // id: null, // 会话 id
    // dialog: null, // 对话框体
    // messages: null, // 对话消息
    // config: null, // 会话配置
    // clearContextIndex: null
  },
  ChatStore: {
    id: null,
    sessions: [],
    currentSession: null,
    selectSession: null,
    deleteSession: null,
    openSession: null,
    onSendMessage: null,
    updateCurrentSession: null
  }
}

const createChatSession = () => {
  return {
    id: 0,
    dialog: {
      avatar: '/role/wali.png',
      title: '新的对话',
      count: 0,
      subTitle: '请问有什么需要帮助的吗？',
      timestamp: new Date().getTime()
    },
    messages: [
      {
        avatar: '/role/wali.png',
        content: '请问有什么需要帮助的吗？',
        message_type: MessageType.Text,
        time: Date.now(),
        direction: MessageDirection.Receive,
        role: MessageRole.system
      }
    ],
    clearContextIndex: undefined,
    config: {
      gptVersion: GptVersion.GPT_3_5_TURBO
    }
  }
}

const mutations = {
  ADD_SESSION: (state, session) => {
    state.ChatSession.id++
    session.id = state.ChatSession.id
    state.ChatSession.currentSessionIndex = session.id
    state.ChatStore.sessions.unshift(session)
  },
  SET_CURRENT_SESSION_INDEX: (state, index) => {
    state.ChatSession.currentSessionIndex = index
  },
  DELETE_SESSION: (state, index) => {
    const count = state.ChatStore.sessions.length
    const deleteSession = state.ChatStore.sessions[index]

    if (!deleteSession) return

    state.ChatStore.sessions.splice(index, 1)

    let nextIndex = Math.min(
      state.ChatSession.currentSessionIndex - Number(index < state.ChatSession.currentSessionIndex),
      state.ChatStore.sessions.length - 1
    )

    if (count === 1) {
      nextIndex = 0
      state.ChatStore.sessions.push(createChatSession())
    }

    state.ChatSession.currentSessionIndex = nextIndex
  },
  UPDATE_CURRENT_SESSION: (state, updater) => {
    const session = state.ChatStore.sessions[state.ChatSession.currentSessionIndex]
    updater(session)
  }
}

const actions = {
  openSession({ commit }) {
    const session = createChatSession()
    commit('ADD_SESSION', session)
  },
  selectSession({ commit }, index) {
    commit('SET_CURRENT_SESSION_INDEX', index)
  },
  deleteSession({ commit }, index) {
    commit('DELETE_SESSION', index)
  },
  updateCurrentSession({ commit }, updater) {
    commit('UPDATE_CURRENT_SESSION', updater)
  },
  onSendMessage({ commit, state }, message) {
    // const session = state.sessions[state.currentSessionIndex]
    commit('UPDATE_CURRENT_SESSION', (session) => {
      session.messages.push(message)
    })
    // 后续调用接口，将消息发送给服务端
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
