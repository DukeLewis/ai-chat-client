<template>
  <DialogResizableSidebar>
    <!-- 头部操作 -->
    <div class="dialogHead">
      <div class="dialogSearchBox">
        <span>
          <el-input type="text" placeholder="搜索" size="mini" :style="'width:' + searchWidth + ';margin-left: 15px'"/>
          <el-button type="success" round class="dialogSearchAdd" @click="createDialog" size="mini">添加</el-button>
        </span>
      </div>
    </div>
    <!-- 对话列表 -->
    <div>
      <!-- 循环遍历数据，当有数据变更时会自动刷新到页面 -->
      <DialogListItem
        v-for="dialog in dialogs"
        :key="dialog.dialogId"
        :dialog="dialog"
        :selected="selected && selected.dialogId === dialog.dialogId"
        @click="selectDialog(dialog)"
      />
    </div>
  </DialogResizableSidebar>
</template>

<script>
import DialogResizableSidebar from '@/views/chat/components/dialog/DialogResizableSidebar'
import DialogListItem from '@/views/chat/components/dialog/DialogListItem'
import { mapState } from 'vuex'

export default {
  name: 'DialogList',
  components: {
    DialogResizableSidebar,
    DialogListItem
  },
  data() {
    return {
      dialogs: [],
      selected: null,
      searchWidth: '190px'
    }
  },
  computed: {
    ...mapState({
      opened: state => state.app.sidebar.opened
    })
  },
  watch: {
    opened(val) {
      this.searchWidth = val ? '183px' : '190px'
    }
  },
  methods: {
    createDialog() {
      const dialogList = [
        {
          avatar: '/role/bugstack.png',
          dialogId: Math.floor(Math.random() * 900) + 100,
          read: true,
          subTitle: '有什么可以帮你的吗？',
          timestamp: Date.now(),
          title: '直接对话',
          count: Math.floor(Math.random() * 90)
        },
        {
          avatar: '/role/interview.png',
          dialogId: Math.floor(Math.random() * 900) + 100,
          read: true,
          subTitle: '请回答一下Java的基础类型有哪些？',
          timestamp: Date.now(),
          title: '面试官',
          count: Math.floor(Math.random() * 90)
        },
        {
          avatar: '/role/psychological.png',
          dialogId: Math.floor(Math.random() * 900) + 100,
          read: true,
          subTitle: '吹灭别人的灯，不能照亮自己',
          timestamp: Date.now(),
          title: '心里咨询',
          count: Math.floor(Math.random() * 90)
        }
      ]
      const idx = Math.floor(Math.random() * 3)
      const newDialog = dialogList[idx]
      console.log(newDialog)
      this.dialogs.unshift(newDialog)
      this.setSelected(newDialog)
      this.$message.success('添加成功')
    },
    selectDialog(dialog) {
      // 点击时跳转到对应的界面，并传递必要参数信息
      this.$router.push({ path: `/chat/${dialog.dialogId}`, query: { title: dialog.title }})
      this.setSelected(dialog)
    },
    // 设置选中的对话
    setSelected(dialog) {
      this.selected = dialog
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/views/chat/components/dialog/scss/dialog-list.module.scss';

.dialogSearchAdd {
  padding-bottom: 7px;
  padding-left: 6px;
  padding-right: 6px;
  margin-left: 10px;
}
</style>
