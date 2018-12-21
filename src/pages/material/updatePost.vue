<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>资源管理</BreadcrumbItem>
      <BreadcrumbItem>撰写文章</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="updatePost">
        <Form :model="form" ref="form" :rules="rules">
          <FormItem label="标题" prop="title">
            <Input v-model="form.title" placeholder="请输入文章标题"></Input>
          </FormItem>
          <FormItem label="关键词" prop="keywords">
            <Input v-model="form.keywords" placeholder="请输入文章关键词，多个用 ',' 隔开"></Input>
          </FormItem>
          <FormItem label="描述" prop="description">
            <Input v-model="form.description" placeholder="请输入文章描述"></Input>
          </FormItem>
          <FormItem label="内容" prop="content" class="content-item">
            <p class="tip">注：刷新此页面之前，务必按下<b>Ctrl+S</b>保存文章至本地 <b>sessionStorage</b>；切换其他页面之前，务必点击页面底部保存按钮，保存文章至服务器</p>
            <markdown-editor
              v-model="form.content"
              :options="options"
              :customStyle="{display: 'inline-block', width: '100%'}"
              :initValue = "form.content"
              ref="markdownEditor"
            />
          </FormItem>
          <FormItem style="text-align: right;">
            <Button size="large" type="primary" :loading="submitLoding" @click="updatePost('form')">保存</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/index'
import MarkdownEditor from '@/components/MarkdownEditor'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-gist.css'
import { mapState } from 'vuex'
import * as service from '@/service'
window.hljs = hljs
hljs.initHighlightingOnLoad()
export default {
  name: 'updatePost',
  mounted () {
    document.addEventListener('keydown', this.CtrlS)
    if (sessionStorage.getItem('update_post_editor')) {
      this.form = JSON.parse(sessionStorage.getItem('update_post_editor'))
      this.$refs.markdownEditor.setValue(this.form.content)
    }
  },
  components: {
    MarkdownEditor
  },
  data () {
    return {
      options: {
        // 自动获取焦点
        autofocus: false,
        // 自动保存到localstorage
        initialValue: '',
        // table缩进字符
        placeholder: '请在此输入文章内容',
        forceSync: true,
        renderingConfig: {
          codeSyntaxHighlighting: true
        }
      },
      form: {
        id: this.$route.params.id,
        content: '',
        keywords: '',
        description: '',
        title: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章名称', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入文章关键词', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ]
      },
      submitLoding: false
    }
  },
  computed: {
    ...mapState({
      _id: state => state.userInfo._id
    })
  },
  methods: {
    CtrlS (event) {
      if (event.keyCode === 83 && (navigator.platform.match('Mac') ? event.metaKey : event.ctrlKey)) {
        event.preventDefault()
        sessionStorage.setItem('update_post_editor', JSON.stringify(this.form))
        this.$Message.success({
          content: '文章已保存至本地sessionStorage',
          duration: 0.8
        })
        return false
      }
    },
    updatePost (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.submitLoding = true
          this.form.id = this.$route.params.id
          service.updatePost(this.form)
            .then(res => {
              if (res.code === 0) {
                this.$Message.success('保存成功')
              }
              this.submitLoding = false
            })
            .catch(() => {
              this.submitLoding = false
            })
        } else {
          this.$Message.error('验证未通过！')
        }
      })
    }
  },
  created () {
    service.getPost({
      id: this.$route.params.id
    })
      .then(res => {
        if (res.code === 0) {
          res.result.createTime = formatDate(new Date(res.result.createTime), 'yyyy-MM-dd hh:mm:ss')
          Object.keys(this.form).forEach(key => {
            this.form[key] = res.result[key]
          })
          this.$refs.markdownEditor.setValue(this.form.content)
        } else {
          this.$router.replace({name: 'postMaterial'})
        }
      })
  },
  destroyed () {
    sessionStorage.removeItem('update_post_editor')
    document.removeEventListener('keydown', this.CtrlS)
  }
}
</script>

<style lang="less">
  .updatePost {
    .ivu-form-item-label {
      padding-left: 10px;
      font-size: 16px;
      font-weight: 700;
    }
    .ivu-form-item {
      margin-bottom: 10px;
    }
    .tip {
      display: inline-block;
      padding-left: 10px;
      width: 100%;
      box-sizing: border-box;
    }
  }

</style>
