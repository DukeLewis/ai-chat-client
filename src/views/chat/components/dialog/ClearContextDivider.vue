<template>
  <div class="clear-context" @click="clearContext">
    <div class="clear-context-tips">上下文已清除</div>
  </div>
</template>

<script>

export default {
  name: 'ClearContextDivider',
  methods: {
    clearContext() {
      this.UPDATE_CURRENT_SESSION()
      this.$store.commit('chat/UPDATE_CURRENT_SESSION', session => {
        session.clearContextIndex = undefined
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/views/chat/components/dialog/scss/clear-context-divider.moudule.scss';
</style>
