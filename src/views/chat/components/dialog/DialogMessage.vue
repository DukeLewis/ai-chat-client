<template>
  <div class="wrapper">
    <div class="header">
      <span>{{ currentSession ? $route.query.title : '' }}</span>
      <el-button type="danger" size="mini" @click="delCurrentSession" class="el-icon-close del-btn"></el-button>
    </div>
    <div class="scroll">
      <DialogMessageItem v-for="(message, index) in messages" :key="index" :message="message"/>
    </div>
    <DialogMessageInput @sendMsg="sendMsg"/>
  </div>
</template>

<script>
import DialogMessageItem from '@/views/chat/components/dialog/DialogMessageItem'
import DialogMessageInput from '@/views/chat/components/dialog/DialogMessageInput'
// import ClearContextDivider from '@/views/chat/components/dialog/ClearContextDivider'
import { mapState } from 'vuex'
import { MessageDirection, MessageRole, MessageType } from '@/types/chat'

export default {
  name: 'DialogMessage',
  computed: {
    ...mapState({
      currentSession: state => state.chat.ChatSession
    }),
    messages() {
      return this.currentSession ? this.currentSession.messages : []
    }
  },
  methods: {
    // 输入事件
    sendMsg(value) {
      const newMessage01 = {
        avatar: '/role/runny-nose.png',
        content: value,
        message_type: MessageType.Text,
        time: Date.now(),
        direction: MessageDirection.Send,
        role: MessageRole.user
      }

      const newMessage02 = {
        avatar: '/role/wali.png',
        content: '`ChatGPT` 接口尚未对接，暂时还不能回复 **！！！**',
        message_type: MessageType.Text,
        time: Date.now(),
        direction: MessageDirection.Receive,
        role: MessageRole.system
      }
      // this.messages.push(newMessage01, newMessage02)
      this.$store.dispatch('chat/onSendMessage', [newMessage01, newMessage02])
    },
    delCurrentSession() {
      this.$store.dispatch('chat/deleteSession', this.currentSession.index)
    }
  },
  components: {
    DialogMessageItem,
    DialogMessageInput
  }
}
</script>

<style scoped lang="scss">
@import '@/views/chat/components/dialog/scss/dialog-message.module.scss';
.del-btn {
  padding-bottom: 7px;
  padding-left: 6px;
  padding-right: 6px;
  margin-left: 10px;
  float: right;
}
</style>
