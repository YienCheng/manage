<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>网站设置</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="siteSettings">
        <Form ref="form" :model="form" :rules="rules" :label-width="90">
          <FormItem label="网站图标" prop="icon">
            <Upload
              ref="uploadicon"
              class="uploadicon"
              action="/api/manage/updateSiteIcon"
              name="favicon"
              accept="image/png, image/jpeg, image/x-icon"
              :with-credentials="true"
              :before-upload="uploadBefore"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :show-upload-list="false"
              :multiple="false"
            >
              <Button icon="ios-cloud-upload-outline" :disabled="!isEdite">更新网站图标</Button>
              <p slot="tip" class="uploadTip"><img :src="iconPath" :alt="iconPath"><span>支持：png、jpg、ico图片格式</span></p>
            </Upload>
          </FormItem>
          <FormItem label="网站名称" prop="name">
            <Input v-model="form.name" placeholder="网站的名称" :disabled="!isEdite"></Input>
          </FormItem>
          <FormItem label="网站标题" prop="title">
            <Input v-model="form.title" placeholder="网站title文字" :disabled="!isEdite"></Input>
          </FormItem>
          <FormItem label="默认描述" prop="description">
            <Input v-model="form.description" placeholder="网页默认的描述" :disabled="!isEdite"></Input>
          </FormItem>
          <FormItem label="默认关键字" prop="keywords">
            <Input v-model="form.keywords" placeholder="网页默认的关键字，请输入关键字，多个用‘ , ’隔开" :disabled="!isEdite"></Input>
          </FormItem>
          <FormItem>
            <Button v-if="!isEdite" @click="isEdite = !isEdite" type="primary">编辑</Button>
            <Button v-if="isEdite" type="primary" @click="handleSubmit('form')" :loading="siteSettingLoading">保存</Button>
            <Button v-if="isEdite" @click="handleReset" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from '@/service'
export default {
  name: 'siteSettings',
  created () {
    this.getSetting()
  },
  data () {
    return {
      form: {
        name: '',
        title: '',
        description: '',
        keywords: '',
        icon: null
      },
      rules: {
        name: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入网站标题', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入网站描述', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入关键字', trigger: 'blur' }
        ]
      },
      file: null,
      siteSettingLoading: false,
      isEdite: false,
      iconPath: null
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.siteSettingLoading = true
          service.updateSiteSetting(this.form)
            .then(res => {
              if (res.code === 0) {
                this.$Message.success('更新成功！')
                this.isEdite = false
              }
              this.siteSettingLoading = false
            })
            .catch(() => {
              this.siteSettingLoading = false
            })
        }
      })
    },
    handleReset () {
      this.getSetting()
      this.isEdite = false
    },
    uploadBefore (file) {
      this.file = file
    },
    uploadSuccess (response, file) {
      this.iconPath = URL.createObjectURL(this.file)
      this.$Message.success('更新成功！')
    },
    uploadError () {
      this.$Message.error('更新失败！')
    },
    getSetting () {
      service.getSiteSetting()
        .then(res => {
          if (res.code === 0) {
            Object.keys(this.form).forEach((item) => {
              if (res.result[item]) {
                this.form[item] = res.result[item]
                this.iconPath = res.result.icon
              }
            })
          }
        })
    }
  }
}
</script>

<style lang="less">
.siteSettings {
  width: 600px;
  padding: 20px;
  margin: 0 auto;
  .uploadicon {
    display: flex;
    align-items: center;
  }
  .uploadTip {
    margin-left: 10px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    img {
      width: 32px;
      height: 32px;
      margin-right: 5px;
    }
  }
}
</style>
