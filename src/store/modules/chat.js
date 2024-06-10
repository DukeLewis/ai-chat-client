import { GptVersion, MessageDirection, MessageRole, MessageType } from '@/types/chat'

const state = {
  ChatSession: {
    id: 0 // 会话 id
    // id: null, // 会话 id
    // dialog: null, // 对话框体
    // messages: null, // 对话消息
    // config: null, // 会话配置
    // clearContextIndex: null
  },
  ChatStore: {
    id: null,
    sessions: [],
    currentSessionId: 1,
    currentSession: null,
    selectSession: null,
    deleteSession: null,
    openSession: null,
    onSendMessage: null,
    updateCurrentSession: null
  }
}

const getDefault = () => {
  return {
    ChatSession: {
      id: 0 // 会话 id
    },
    ChatStore: {
      id: null,
      sessions: [],
      currentSessionId: 1,
      currentSession: null,
      selectSession: null,
      deleteSession: null,
      openSession: null,
      onSendMessage: null,
      updateCurrentSession: null
    }
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
  RESET: (state) => {
    const defaultState = getDefault()
    state.ChatStore = defaultState.ChatStore
    state.ChatSession = defaultState.ChatSession
  },
  ADD_SESSION: (state, session) => {
    session.id = state.ChatSession.id + 1
    state.ChatStore.currentSession = session
    state.ChatStore.currentSessionId = session.id
    state.ChatStore.sessions.unshift(session)
    session.index = 0
    state.ChatSession = session
  },
  SET_CURRENT_SESSION: (state, session) => {
    state.ChatStore.currentSessionId = session.id
    state.ChatStore.updateCurrentSession = session
    state.ChatSession = session
  },
  DELETE_SESSION: (state, index) => {
    const deleteSession = state.ChatStore.sessions[index]

    if (!deleteSession) return
    state.ChatStore.sessions.splice(index, 1)
    const sessions = state.ChatStore.sessions || []
    for (let i = index; i < sessions.length; i++) {
      sessions[i].index = i
    }
    const currentSession = state.ChatStore.sessions[0]
    state.ChatStore.currentSessionId = currentSession ? state.ChatStore.sessions[0].id : 0
    state.ChatStore.currentSession = currentSession
    state.ChatSession = currentSession
  },
  UPDATE_CURRENT_SESSION: (state, updater) => {
    updater(state.ChatSession)
  },
  UPDATE_SESSION_DIALOG: (state, dialog) => {
    state.ChatSession.dialog = dialog
  }
}

const actions = {
  openSession({ commit }) {
    const session = createChatSession()
    commit('ADD_SESSION', session)
  },
  selectSession({ commit }, session) {
    commit('SET_CURRENT_SESSION', session)
  },
  deleteSession({ commit }, index) {
    commit('DELETE_SESSION', index)
  },
  updateCurrentSession({ commit }, updater) {
    commit('UPDATE_CURRENT_SESSION', updater)
  },
  onSendMessage({ commit, state }, messages) {
    // const session = state.sessions[state.currentSessionId]
    commit('UPDATE_CURRENT_SESSION', (session) => {
      session.messages.push(...messages)
    })
    // 后续调用接口，将消息发送给服务端
  },
  updateSessionDialog({ commit }, dialog) {
    commit('UPDATE_SESSION_DIALOG', dialog)
  },
  reset({ commit }) {
    commit('RESET')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
