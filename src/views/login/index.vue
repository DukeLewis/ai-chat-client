<template>
  <div>
    <el-row style="margin-top: 150px">
      <el-col :span="8" offset="8">
        <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model.number="loginForm.code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">提交</el-button>
            <el-button type="primary" @click="handleReg">注册</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { User } from '@/api/User'
export default {
  name: 'Login',
  data() {
    const checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        code: [{ validator: checkCode, trigger: 'blur' }]
      },
      loading: false,
      regLoading: false,
      redirect: undefined
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
            this.$message.success('登录成功')
          }).catch(() => {
            this.$message.error('登录失败')
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    handleReg() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.regLoading = true
          User.register(this.loginForm).then(res => {
            this.$router.push({ path: '/login' })
            this.regLoading = false
            this.$message.success('注册成功')
          }).catch(() => {
            this.$message.error('注册失败')
            this.regLoading = false
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.el-button {
  width:auto;
  margin-bottom:30px;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
