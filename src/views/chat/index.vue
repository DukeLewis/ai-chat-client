<template>
  <div class="chat">
    <DialogList/>
    <router-view/>
  </div>
</template>

<script>

import DialogList from '@/views/chat/components/dialog/DialogList'

export default {
  name: 'Chat',
  components: {
    DialogList
  }
}
</script>

<style scoped lang="scss">
.chat {
  top: 0;
  width: var(--window-content-width) + 60px;
  height: var(--full-height);
  position: relative;
  background-color: #fff;
  color: #999;
  display: flex;
}
</style>
