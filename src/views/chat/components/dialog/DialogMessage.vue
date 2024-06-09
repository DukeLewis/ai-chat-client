<template>
  <div class="wrapper">
    <div class="header">{{ $route.query.title }}</div>
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

export default {
  name: 'DialogMessage',
  data() {
    return {
      messages: []
    }
  },
  mounted() {
    this.fetchDetail()
  },
  computed: {
    ...mapState({
      currentSession: state => state.chat.ChatSession
    })
  },
  methods: {
    // 可以通过接口查询数据
    async fetchDetail() {
      const session = this.currentSession
      this.messages = session.messages
    },
    // 输入事件
    sendMsg(value) {
      const newMessage01 = {
        avatar: '/role/psychological.png',
        message: '吹灭别人的灯，不会照亮自己吹灭别人的灯，不会照亮自己吹灭别人的灯，不会照亮自己吹灭别人的灯，不会照亮自己',
        message_type: 'Text',
        time: Date.now(),
        direction: 'Receive'
      }

      const newMessage02 = {
        avatar: '/role/runny-nose.png',
        message: '大师我悟了！'.repeat(20),
        message_type: 'Text',
        time: Date.now(),
        direction: 'Send'
      }
      this.messages.push(newMessage01, newMessage02)
      this.$store.dispatch('chat/onSendMessage', newMessage01)
      this.$store.dispatch('chat/onSendMessage', newMessage02)
    }
  },
  components: {
    DialogMessageItem,
    DialogMessageInput
  },
  watch: {
    '$route.params.dialogId': {
      handler(val) {
        this.fetchDetail()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/views/chat/components/dialog/scss/dialog-message.module.scss';
</style>
