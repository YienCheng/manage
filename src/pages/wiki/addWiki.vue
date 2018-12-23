<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>Wiki管理</BreadcrumbItem>
      <BreadcrumbItem>新增Wiki</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="addWiki">
        <Form ref="form" :model="form" :rules="rules" :label-width="80">
          <FormItem label="标题" prop="title">
            <Input v-model="form.title" placeholder="请输入Wiki标题"></Input>
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
            <Input v-model="form.abstract" placeholder="请输入Wiki摘要" type="textarea"></Input>
          </FormItem>
          <FormItem label="作者" prop="author">
            <Input v-model="form.author" placeholder="请输入Wiki作者"></Input>
          </FormItem>
          <FormItem label="作者链接" prop="authorLink">
            <Input v-model="form.authorLink" placeholder="请输入作者链接"></Input>
          </FormItem>
          <FormItem label="图片" prop="banner">
            <Input v-model="form.banner" placeholder="请输入WikiBanner地址"></Input>
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
import * as service from '@/service'
export default {
  name: 'addWiki',
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
        tags: []
      },
      rules: {
        title: [
          { required: true, message: '请输入Wiki名称', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '请输入Wiki摘要', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入Wiki作者', trigger: 'blur' }
        ],
        authorLink: [
          { required: true, message: '请输入作者链接', trigger: 'blur' }
        ],
        banner: [
          { required: true, message: '请输入WikiBanner图片地址', trigger: 'blur' }
        ]
      },
      categoryList: [],
      tagList: [],
      loading: false
    }
  },
  methods: {
    saveArticle (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = Object.assign({}, this.form)
          params.tags = params.tags.toString()
          service.addWiki(params)
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
  .addWiki {
    width: 400px;
    margin: 30px auto;
    textarea {
      font-size: 12px;
    }
  }
</style>
