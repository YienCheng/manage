<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>用户管理</BreadcrumbItem>
      <BreadcrumbItem>新增用户</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="addUser">
        <Form ref="form" :model="form" :rules="rules" :label-width="80">
          <FormItem label="用户名" prop="username">
            <Input type="text" v-model="form.username" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="昵称" prop="nickname">
            <Input type="text" v-model="form.nickname" placeholder="请输入昵称"></Input>
          </FormItem>
          <FormItem label="密码" prop="loginPassword">
            <Input type="password" v-model="form.loginPassword" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="重复密码" prop="loginRePassword">
            <Input type="password" v-model="form.loginRePassword" placeholder="请重复输入密码"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input type="email" v-model="form.email" placeholder="请输入邮箱"></Input>
          </FormItem>
          <FormItem label="权限" prop="role">
            <RadioGroup v-model="form.role">
              <Radio label="user">普通用户</Radio>
              <Radio label="manager">管理员</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button @click="handleSubmit('form')" type="primary" :loading="submitLoding">提交</Button>
            <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from '@/service/index'
export default {
  name: 'addUser',
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.form.loginPassword) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      this.$refs['form'].validateField('loginRePassword')
      callback()
    }
    return {
      form: {
        username: '',
        nickname: '',
        loginPassword: '',
        loginRePassword: '',
        email: '',
        role: 'user'
      },
      rules: {
        username: [
          { required: true, message: '必填字段', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '必填字段', trigger: 'blur' }
        ],
        loginPassword: [
          { required: true, message: '必填字段', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        loginRePassword: [
          { required: true, message: '必填字段', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'change' },
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '必填字段', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '必填字段', trigger: 'blur' }
        ]
      },
      submitLoding: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addUser()
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    addUser () {
      this.submitLoding = true
      service.addUser(this.form)
        .then(res => {
          if (res.code === 0) {
            this.$Message.success('新增用户成功')
          }
          this.submitLoding = false
        })
        .catch(() => {
          this.submitLoding = false
        })
    }
  }
}
</script>

<style lang="less">
  .addUser {
    width: 400px;
    margin: 30px auto;
  }
</style>
