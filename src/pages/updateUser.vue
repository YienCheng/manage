<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>用户管理</BreadcrumbItem>
      <BreadcrumbItem>更新用户</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="updateUser">
        <div class="avatar">
          <div class="avatar-content">
            <Upload
              ref="upload"
              :with-credentials="true"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :on-error="handleError"
              accept="image/png, image/jpeg"
              :max-size="200"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              action="/api/manage/updateUserAvatar"
              name="avatar"
              :data="{loginAccount:form.loginAccount}"
              style="display: inline-block">
              <div>
                <div class="avatar-img">
                  <div class="avatar-img-cover">
                    <Icon type="ios-create-outline" />
                  </div>
                  <img :src="avatar" alt="avatar">
                </div>
                <p>点击更换新头像</p>
              </div>
            </Upload>
            <div v-show="progressShow" class="avatar-progress">
              <Progress :percent="percentage" hide-info></Progress>
            </div>
          </div>
        </div>
        <Form ref="form" :model="form" :rules="rules" :label-width="80">
          <FormItem label="账号">
            <Input type="text" v-model="form.loginAccount" :disabled="true"></Input>
          </FormItem>
          <FormItem label="用户名" prop="username">
            <Input type="text" v-model="form.username" placeholder="请输入用户名" :disabled="!isEdite"></Input>
          </FormItem>
          <FormItem label="昵称" prop="nickname">
            <Input type="text" v-model="form.nickname" placeholder="请输入昵称" :disabled="!isEdite"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input type="email" v-model="form.email" placeholder="请输入邮箱" :disabled="!isEdite"></Input>
          </FormItem>
          <FormItem label="权限" prop="role">
            <RadioGroup v-model="form.role">
              <Radio label="user" :disabled="!isEdite">普通用户</Radio>
              <Radio label="manager" :disabled="!isEdite">管理员</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button v-if="!isEdite" @click="isEdite = true" type="primary">编辑</Button>
            <Button v-if="isEdite" @click="handleSubmit('form')" type="primary" :loading="submitLoding">提交</Button>
            <Button v-if="isEdite" @click="handleRest('form')" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from '@/service'
import _ from 'lodash'
export default {
  name: 'updateUser',
  created () {
    service.getUserInfoByAccount({
      loginAccount: this.$route.params.id
    })
      .then(res => {
        if (res.code === 0) {
          this.avatar = res.result.avatar
          this.result = res.result
          _.forEach(this.form, (value, key) => {
            this.form[key] = res.result[key] || ''
          })
        }
      })
  },
  data () {
    return {
      percentage: 0,
      progressShow: false,
      avatar: '',
      form: {
        loginAccount: '',
        username: '',
        nickname: '',
        email: '',
        role: ''
      },
      result: {},
      rules: {
        username: [
          { required: true, message: '必填字段', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '必填字段', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '必填字段', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '必填字段', trigger: 'blur' }
        ]
      },
      submitLoding: false,
      isEdite: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.updateUserInfo(this.form)
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleRest (name) {
      this.$refs[name].resetFields()
      _.forEach(this.form, (value, key) => {
        this.form[key] = this.result[key] || ''
      })
      this.isEdite = false
    },
    updateUserInfo (parma) {
      this.submitLoding = true
      service.updateUserInfo(parma)
        .then(res => {
          if (res.code === 0) {
            this.$Message.success('用户信息更新成功')
            this.isEdite = false
          }
          this.submitLoding = false
        })
        .catch(() => {
          this.submitLoding = false
        })
    },
    handleBeforeUpload () {
      this.percentage = 0
      this.progressShow = true
    },
    handleMaxSize () {
      this.$Message.error('头像大小不能超过200kb')
    },
    handleSuccess (res) {
      if (res.code === 0) {
        this.percentage = 100
        this.avatar = res.result.avatar
        this.$Message.success('上传成功，头像已更改!')
      }
      setTimeout(() => {
        this.progressShow = false
        this.percentage = 0
      }, 800)
    },
    handleError (error) {
      this.percentage = 0
      this.progressShow = false
      this.$Message.error('上传失败！')
      console.log(error)
    }
  }
}
</script>

<style lang="less">
  .updateUser {
    width: 400px;
    margin: 30px auto;
    .avatar {
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 10px;
      .avatar-progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, .5);
      }
      .avatar-content {
        position: relative;
      }
      .avatar-img {
        position: relative;
        .avatar-img-cover {
          display: none;
          align-items: center;
          justify-content: center;
          position: absolute;
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, .5);
          color: #fff;
          font-size: 25px;
          cursor: pointer;
        }
        img {
          display: block;
          width: 80px;
          height: 80px;
        }
      }
      .avatar-img:hover {
        .avatar-img-cover {
          display: flex;
        }
      }
    }
  }
</style>
