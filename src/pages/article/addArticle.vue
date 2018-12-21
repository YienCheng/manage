<template>
<div class="layout-wrapper">
  <Breadcrumb :style="{marginBottom: '20px'}">
    <BreadcrumbItem>我的位置</BreadcrumbItem>
    <BreadcrumbItem>博文管理</BreadcrumbItem>
    <BreadcrumbItem>发表博文</BreadcrumbItem>
  </Breadcrumb>
  <div class="layout-content">
    <div class="addArticle">
      <Form ref="form" :model="form" :rules="rules" :label-width="80">
        <FormItem label="标题" prop="title">
          <Input v-model="form.title" placeholder="请输入文章标题"></Input>
        </FormItem>
        <FormItem label="类型" prop="title">
          <RadioGroup v-model="form.type">
            <Radio label="original">
              <span>原创</span>
            </Radio>
            <Radio label="reprint">
              <span>转载</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="摘要" prop="abstract">
          <Input v-model="form.abstract" placeholder="请输入文章摘要" type="textarea"></Input>
        </FormItem>
        <FormItem label="作者" prop="author">
          <Input v-model="form.author" placeholder="请输入文章作者"></Input>
        </FormItem>
        <FormItem label="作者链接" prop="authorLink">
          <Input v-model="form.authorLink" placeholder="请输入作者链接"></Input>
        </FormItem>
        <FormItem label="图片" prop="banner">
          <Input v-model="form.banner" placeholder="请输入文章Banner地址"></Input>
        </FormItem>
        <FormItem label="关联文章" prop="post">
          <Select
            v-model="form.post"
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="Postloading"
            placeholder="请输入文章标题关键字">
            <Option v-for="(option, index) in postOptions" :value="option._id" :key="index">{{option.title}}</Option>
          </Select>
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
        <FormItem>
          <Button size="large" type="primary" :loading="loading" @click="saveArticle('form')">保存</Button>
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
  name: 'addArticle',
  data () {
    return {
      form: {
        title: '',
        type: 'original',
        abstract: '',
        author: '',
        authorLink: '/about',
        banner: '',
        category: '',
        tags: [],
        post: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章名称', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '请输入文章摘要', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入文章作者', trigger: 'blur' }
        ],
        authorLink: [
          { required: true, message: '请输入作者链接', trigger: 'blur' }
        ],
        banner: [
          { required: true, message: '请输入文章Banner图片地址', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请选择要关联的文章', trigger: 'blur' }
        ]
      },
      categoryList: [],
      tagList: [],
      postOptions: [],
      loading: false,
      Postloading: false
    }
  },
  methods: {
    saveArticle (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = Object.assign({}, this.form)
          params.tags = params.tags.toString()
          // let content = this.$refs.markdownEditor.getHtml()
          service.addArticle(params)
            .then(res => {
              if (res.code === 0) {
                this.$Message.success('保存成功')
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$Message.error('验证未通过！')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.postOptions = []
    },
    remoteMethod (query) {
      this.Postloading = true
      service.getByTitleFuzzy({
        title: query
      })
        .then(res => {
          if (res.code === 0) {
            this.postOptions = res.result
          }
          this.Postloading = false
        })
        .catch(() => {
          this.Postloading = false
        })
    }
  },
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
  }
}
</script>

<style lang="less">
  .addArticle {
    width: 400px;
    margin: 30px auto;
    textarea {
      font-size: 12px;
    }
  }
</style>
