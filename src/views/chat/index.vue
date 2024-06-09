<template>
  <div class="chat">
    <DialogList/>
    <router-view/>
<!--    <el-row style="margin-top: 150px">-->
<!--      <el-col :span="8" offset="2">-->
<!--        <el-input-->
<!--            placeholder="请输入内容"-->
<!--            v-model="msg.content"-->
<!--            clearable>-->
<!--        </el-input>-->
<!--        <el-button type="primary" round @click="startStreaming()" class="button">确认</el-button>-->
<!--      </el-col>-->
<!--      <el-col span="8" offset="2">-->
<!--        <el-input-->
<!--            type="textarea"-->
<!--            :rows="10"-->
<!--            autosize-->
<!--            placeholder="获取的答案"-->
<!--            v-model="ans"-->
<!--            readonly>-->
<!--        </el-input>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row style="margin-top: 30px">-->
<!--      <el-col :span="8" offset="10">-->
<!--        <el-button type="primary" @click="$router.push('/sale')">充值额度</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>

import { Chat } from '@/api/Chat'
import DialogList from '@/views/chat/components/dialog/DialogList'

export default {
  name: 'Chat',
  data() {
    return {
      msg: {
        model: 'chatglm_turbo',
        role: 'user',
        content: '',
        name: 'mike'
      },
      ans: ''
    }
  },
  components: {
    DialogList
  },
  methods: {
    async startStreaming() {
      if (this.msg.content === '') {
        this.$message.error('请输入内容')
        return
      }
      const data = {
        model: this.msg.model,
        content: [{ content: this.msg.content, role: this.msg.role, name: 'mike' }]
      }
      const self = this
      self.ans = ''
      const decoder = new TextDecoder('utf-8')
      Chat.chatCompletion(data).then(res => {
        const reader = res.body.getReader()

        return reader.read().then(function process({ done, value }) {
          if (done) {
            console.log('Stream finished')
            return
          }

          // 解码数据
          const text = decoder.decode(value)

          self.ans += text

          return reader.read().then(process)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.button{
  margin-top: 20px;
}
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
