<template>
  <div class="wrapper">
    <div class="header">
      <span>{{ currentSession ? $route.query.title : '' }}</span>
      <el-button type="danger" size="mini" @click="delCurrentSession" class="el-icon-close del-btn"></el-button>
    </div>
    <div ref="scrollContainer" class="scroll">
      <DialogMessageItem v-for="message in messages" :key="message.id" :message="message"/>
    </div>
    <DialogMessageInput @sendMsg="sendMsg"/>
  </div>
</template>

<script>
import DialogMessageItem from '@/views/chat/components/dialog/DialogMessageItem'
import DialogMessageInput from '@/views/chat/components/dialog/DialogMessageInput'
import { mapState } from 'vuex'

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
  mounted() {
    this.scrollToBottom()
  },
  methods: {
    // 输入事件
    sendMsg(value) {
      this.$store.dispatch('chat/onSendMessage', value)
    },
    delCurrentSession() {
      this.$store.dispatch('chat/deleteSession', this.currentSession.index)
      this.$message.success('当前会话已删除')
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.scrollContainer
        container.scrollTop = container.scrollHeight
      })
    }
  },
  // eslint-disable-next-line vue/order-in-components
  components: {
    DialogMessageItem,
    DialogMessageInput
  },
  watch: {
    'messages': {
      deep: true,
      handler() {
        this.scrollToBottom()
      }
    }
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
