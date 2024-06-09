<template>
  <div class="wrapper">
    <DialogMessagesActions :config="currentSession.config" />
    <el-input
      v-model="value"
      placeholder="请输入"
      autofocus
      @keydown.enter.native="onPressEnter"
      type="textarea"
      class="input-area"
      rows="20"
    />
    <el-button :disabled="!value.length" type="primary" class="btn" @click="onSend">
      发送(Enter)
    </el-button>
  </div>
</template>

<script>
import DialogMessagesActions from '@/views/chat/components/dialog/DialogMessagesActions'
import { mapState } from 'vuex'

export default {
  name: 'DialogMessageInput',
  components: {
    DialogMessagesActions
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState({
      currentSession: (state) => state.chat.ChatSession
    })
  },
  mounted() {
    this.$nextTick(() => {
      const inputArea = this.$el.querySelector('.input-area > textarea')
      if (inputArea) {
        inputArea.style.border = 'none'
        inputArea.style.maxHeight = '190px'
        inputArea.style.minHeight = '190px'
      }
    })
  },
  methods: {
    onSend() {
      this.onPressEnter()
    },
    onPressEnter() {
      if (this.value && this.value.trim() !== '') {
        this.$emit('sendMsg', this.value)
        this.value = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/views/chat/components/dialog/scss/dialog-message-input.module.scss';
</style>
