<template>
  <div class="chat-input-actions">
    <div class="chat-input-action" @click="handleActionClick">
      <div class="icon">
        <i class="el-icon-delete"/>
      </div>
    </div>
    <el-select
      v-model="selectedGptVersion"
      style="width: 160px"
      @change="handleVersionChange"
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GptVersion } from '@/types/chat'

export default {
  name: 'DialogMessagesActions',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedGptVersion: this.config?.gptVersion ?? GptVersion.GPT_3_5_TURBO,
      options: [
        { value: GptVersion.TEXT_DAVINCI_003, label: 'text-davinci-003' },
        { value: GptVersion.TEXT_DAVINCI_002, label: 'text-davinci-002' },
        { value: GptVersion.DAVINCI, label: 'davinci' },
        { value: GptVersion.GPT_3_5_TURBO, label: 'gpt-3.5-turbo' },
        { value: GptVersion.GPT_3_5_TURBO_16K, label: 'gpt-3.5-turbo-16k' },
        { value: GptVersion.GPT_4, label: 'gpt-4' },
        { value: GptVersion.GPT_4_32K, label: 'gpt-4-32k' }
      ]
    }
  },
  computed: {
    ...mapState({
      currentSession: state => state.chat.ChatSession
    })
  },
  methods: {
    handleActionClick() {
      this.$store.dispatch('chat/updateCurrentSession', session => {
        session.messages = []
      })
    },
    handleVersionChange(value) {
      this.$store.dispatch('chat/updateCurrentSession', session => {
        session.config = {
          ...session.config,
          gptVersion: value
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/views/chat/components/dialog/scss/dialog-message-action.module.scss';
</style>
