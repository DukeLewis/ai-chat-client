<template>
  <vue-resizable
    :min-width="minWidth"
    :max-width="320"
    :default-size="{ width: 260, height: '100%' }"
    class="resizable-sidebar"
  >
    <slot></slot>
  </vue-resizable>
</template>

<script>
import VueResizable from 'vue-resizable'

export default {
  name: 'DialogResizableSidebar',
  components: {
    VueResizable
  },
  props: {
    minWidth: {
      type: Number,
      default: 200
    }
  }
}
</script>

<style scoped>
.resizable-sidebar {
  border-right: 1px solid #f5f5f5;
}
</style>
