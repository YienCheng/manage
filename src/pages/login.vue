<template>
<div class="login">
  <div class="login-bg"></div>
  <div class="login-container">
    <div class="login-content">
      <h2>后台管理</h2>
      <Form class="login-form" ref="form" :model="form" :rules="rules">
        <FormItem prop="username">
          <Input type="text" v-model="form.username" placeholder="用户名" @keydown.native.enter="handleSubmit('form')">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem :style="{marginBottom: '15px'}" prop="password">
          <Input type="password" v-model="form.password" placeholder="登录密码" @keydown.native.enter="handleSubmit('form')">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <div class="login-btn-container">
          <div class="login-btn" @click="handleSubmit('form')">
            <Icon v-show="!loading" class="login-enter" type="ios-arrow-dropright" />
            <Icon v-show="loading" class="login-loading" type="ios-loading"></Icon>
          </div>
        </div>
      </Form>
    </div>
  </div>
</div>
</template>

<script>
import * as service from '@/service'
import { mapMutations } from 'vuex'
import { USERINFO_UPDATE } from '@/store/mutation-types'
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    ...mapMutations({
      updateUserInfo: USERINFO_UPDATE
    }),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true
          service.login({
            username: this.form.username,
            loginPassword: this.form.password
          })
            .then(res => {
              if (res.code === 0) {
                this.updateUserInfo(res.result)
                this.$router.replace({name: 'index'})
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {

        }
      })
    }
  }
}
</script>

<style lang="less">
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.login {
  position: relative;
  height: 100%;
  width: 100%;
  .login-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: url("../assets/bg.jpg") no-repeat center;
    background-size: cover;
    filter: blur(15px);
  }
  .login-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-content {
      margin-top: -50px;
      h2 {
        margin-bottom: 10px;
        font-size: 30px;
        font-weight: 700;
        color: #fff;
        text-align: center;
      }
      .login-form {
        .login-btn-container {
          position: relative;
          display: flex;
          justify-content: center;
          width: 100%;
          .login-btn {
            display: flex;
            flex-direction: column;
            justify-content: center;
            user-select: none;
            cursor: pointer;
            .login-loading {
              animation: ani-demo-spin 1s linear infinite;
            }
            i {
              font-size: 30px;
              color: rgba(255, 255, 255, 1);
            }
            .login-enter {
              color: rgba(255, 255, 255, .3);
              transition: color 0.8s;
            }
            &:hover {
              .login-enter {
                color: rgba(255, 255, 255, 1);
              }
            }
            span {
              margin-top: 5px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
