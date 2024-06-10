<template>
  <div :class="isUser ? 'chat-message-user' : 'chat-message'">
    <div class="chat-message-container">
      <div class="chat-message-avatar">
        <el-avatar :shape="'square'" :src="message.avatar" :size="40" class="chat-message-avatar" />
      </div>
      <div class="chat-message-item">
        <Markdown
          :content="message.content"
          :fontSize="14"
          :parentRef="parentRef"
          :defaultShow="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { MessageRole } from '@/types/chat'
import Markdown from '@/components/markdown/Markdown'

export default {
  name: 'DialogMessageItem',
  props: {
    message: {
      type: Object,
      required: true
    },
    parentRef: {
      type: Object,
      default: null
    }
  },
  components: {
    Markdown
  },
  data() {
    return {
      isReceive: this.message && this.message.direction === 'Receive'
    }
  },
  computed: {
    isUser() {
      return this.message && this.message.role === MessageRole.user
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/views/chat/components/dialog/scss/dialog-message-item.module.scss';
</style>
