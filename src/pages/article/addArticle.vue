<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>文章管理</BreadcrumbItem>
      <BreadcrumbItem>发表文章</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="addArticle">
        <Form :model="form" ref="form" :rules="rules">
          <FormItem label="标题" prop="title">
            <Input v-model="form.title" placeholder="请输入文章标题">
              <Select v-model="form.type" slot="prepend" style="width: 80px">
                <Option value="original">原创</Option>
                <Option value="reprint">转载</Option>
              </Select>
            </Input>
          </FormItem>
          <FormItem label="关键词" prop="keywords">
            <Input v-model="form.keywords" placeholder="请输入文章关键词，多个用 ',' 隔开"></Input>
          </FormItem>
          <FormItem label="描述" prop="description">
            <Input v-model="form.description" placeholder="请输入文章描述"></Input>
          </FormItem>
          <FormItem label="摘要" prop="abstract">
            <Input v-model="form.abstract" placeholder="请输入文章摘要"></Input>
          </FormItem>
          <FormItem label="作者" prop="author">
            <Input v-model="form.author" placeholder="请输入文章作者"></Input>
          </FormItem>
          <FormItem label="作者链接" prop="authorLink">
            <Input v-model="form.authorLink" placeholder="请输入作者链接"></Input>
          </FormItem>
          <FormItem label="创建时间" prop="createTime">
            <Input v-model="form.createTime" placeholder="请输入文章创建时间 格式 YYYY-MM-DD HH:mm:ss"></Input>
          </FormItem>
          <FormItem label="图片" prop="banner">
            <Input v-model="form.banner" placeholder="请输入文章Banner地址"></Input>
          </FormItem>
          <FormItem label="分类" prop="category">
            <Select
              v-model="form.category" filterable>
              <Option v-for="(option, index) in categoryList" :value="option._id" :key="index">{{option.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="标签" prop="tags">
            <Select v-model="form.tags" filterable multiple>
              <Option v-for="(option, index) in tagList" :value="option._id" :key="index">{{option.name}}</Option>
            </Select>
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
            <Button size="large" type="primary" :loading="submitLoding" @click="saveArticle('form')">保存</Button>
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
import * as service from '@/service/index'
window.hljs = hljs
hljs.initHighlightingOnLoad()
export default {
  name: 'addArticle',
  created () {
    service.getCategoryList()
      .then(res => {
        if (res.code === 0) {
          this.categoryList = res.result
        }
      })
    service.getTagList()
      .then(res => {
        if (res.code === 0) {
          this.tagList = res.result
        }
      })
  },
  mounted () {
    document.addEventListener('keydown', this.CtrlS)
    if (sessionStorage.getItem('new_article_editor')) {
      this.form = JSON.parse(sessionStorage.getItem('new_article_editor'))
      this.$refs.markdownEditor.setValue(this.form.content)
    }
  },
  components: {
    MarkdownEditor
  },
  data () {
    let checkDate = function (rule, value, callback) {
      if (!/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/.test(value)) {
        return callback(new Error('日期格式错误'))
      }
      callback()
    }
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
        content: '',
        author: '',
        type: 'original',
        category: '',
        createTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        tags: [],
        abstract: '',
        keywords: '',
        description: '',
        banner: '',
        title: '',
        authorLink: '/about'
      },
      rules: {
        title: [
          { required: true, message: '请输入文章名称', trigger: 'blur' }
        ],
        banner: [
          { required: true, message: '请输入文章Banner图片地址', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '请输入文章摘要', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入文章关键词', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入文章作者', trigger: 'blur' }
        ],
        authorLink: [
          { required: true, message: '请输入作者链接', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '请输入创建时间', trigger: 'blur' },
          { validator: checkDate, trigger: 'blur' }
        ]
      },
      categoryList: [],
      tagList: [],
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
        sessionStorage.setItem('new_article_editor', JSON.stringify(this.form))
        this.$Message.success({
          content: '文章已保存至本地sessionStorage',
          duration: 0.8
        })
        return false
      }
    },
    saveArticle (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.submitLoding = true
          let params = Object.assign({published: false}, this.form)
          params.tags = params.tags.toString()
          // let content = this.$refs.markdownEditor.getHtml()
          service.addArticle(params)
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
    },
    publishArticle (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.submitLoding = true
        } else {
          this.$Message.error('验证未通过！')
        }
      })
    }
  },
  destroyed () {
    sessionStorage.removeItem('new_article_editor')
    document.removeEventListener('keydown', this.CtrlS)
  }
}
</script>

<style lang="less">
  .addArticle {
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
