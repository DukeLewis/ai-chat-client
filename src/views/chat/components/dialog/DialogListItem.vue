<template>
  <div :class="'wrapper ' + selectedItem" @click="handleClick">
    <div class="left">
      <!-- Badge 是 Element UI 提供的组件，这里控制只有选中的才展示对话数 -->
      <el-badge :value="selected ? dialog.count : 0" :hidden="!selected">
        <el-avatar :src="dialog.avatar" size="40" shape="square" />
      </el-badge>
    </div>
    <div class="right">
      <div class="line1">
        <p class="title">{{ dialog.title }}</p>
        <p class="time">{{ timeString }}</p>
      </div>
      <div class="line2">
        {{ dialog.subTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogListItem',
  props: {
    dialog: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    timeString() {
      const date = new Date(this.dialog.timestamp)
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    },
    selectedItem() {
      return this.selected ? 'selected' : ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', this.dialog)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/views/chat/components/dialog/scss/dialog-list-item.module.scss';
</style>
