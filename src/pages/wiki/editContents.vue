<template>
    <div class="layout-wrapper">
      <Breadcrumb :style="{marginBottom: '20px'}">
        <BreadcrumbItem>我的位置</BreadcrumbItem>
        <BreadcrumbItem>Wiki管理</BreadcrumbItem>
        <BreadcrumbItem>新增目录</BreadcrumbItem>
      </Breadcrumb>
      <div class="layout-content" style="position: relative;">
        <Spin fix v-if="spinShow"></Spin>
        <div class="editContents">
          <div class="editContents-side">
            <div class="editContents-title">
              <span>目录管理</span>
            </div>
            <Tree :data="wikiData" ref="tree" :render="renderContent"></Tree>
          </div>
          <div class="editContents-content">
            <Form class="form" ref="form" :model="form" :rules="rules" :label-width="80">
              <FormItem label="标题" prop="title">
                <Input type="text" v-model="form.title"></Input>
              </FormItem>
              <FormItem label="当前文章">
                <p v-if="!currentPostTitle" :style="{fontWeight: 700}">暂无数据</p>
                <p v-if="currentPostTitle" :style="{fontWeight: 700}">{{currentPostTitle}}({{currentPostId}})</p>
              </FormItem>
              <FormItem label="关联文章" prop="post">
                <Select
                  label="label"
                  v-model="form.post"
                  filterable
                  remote
                  :remote-method="remoteMethod"
                  :loading="postLoading"
                  placeholder="请输入文章标题关键字">
                  <Option v-for="(option, index) in postOptions" :value="option._id" :key="index">{{option.title}}</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="primary" :disabled="disabledSumbit" @click="handleSubmit('form')" :loading="submitLoading">提交</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import * as service from '@/service'
export default {
  name: 'editContents',
  data () {
    return {
      wikiData: [],
      buttonProps: {
        type: 'default',
        size: 'small'
      },
      form: {
        title: '',
        post: '',
        wikiId: '',
        article: ''
      },
      rules: {
        title: [
          { required: true, message: '标题必填', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '关联文章必填', trigger: 'blur' }
        ]
      },
      spinShow: false,
      selected: 0,
      disabledSumbit: true,
      postOptions: [],
      postLoading: false,
      submitLoading: false,
      currentData: null,
      label: '',
      currentPostTitle: '',
      currentPostId: ''
    }
  },
  methods: {
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }
      }, [
        h('span', [
          h('span', {
            class: {
              'wikiTree-title': true,
              'wikiTree-select': this.selected === data.nodeKey
            },
            on: {
              click: () => {
                console.log(data)
                this.currentData = data
                let title = data.title
                let post = data.post._id
                let wikiId = data.wikiId
                this.form.post = post
                this.form.title = title
                this.form.wikiId = wikiId
                this.selected = data.nodeKey
              }
            }
          }, data.title)
        ]),
        h('span', {
          style: {
            marginRight: '25px'
          }
        }, [
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-add'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.append(data) }
            }
          }),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-remove'
            }),
            on: {
              click: () => { this.remove(root, node, data) }
            }
          })
        ])
      ])
    },
    renderTop (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }
      }, [
        h('span', [
          h('span', {
            class: {
              'wikiTree-title': true,
              'wikiTree-select': this.selected === data.nodeKey
            },
            on: {
              click: () => {
                console.log(data)
                this.currentData = data
                let title = data.title
                let post = data.post._id
                let wikiId = data.wikiId
                this.form.post = post
                this.form.title = title
                this.form.wikiId = wikiId
                this.selected = data.nodeKey
              }
            }
          }, data.title)
        ]),
        h('span', {
          style: {
            marginRight: '25px'
          }
        }, [
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-add',
              type: 'primary'
            }),
            style: {
              width: '64px'
            },
            on: {
              click: () => { this.append(data) }
            }
          })
        ])
      ])
    },
    append (data) {
      const children = data.children || []
      const params = {
        father: data.wikiId,
        title: '新增节点',
        article: this.form.article
      }
      service.addContents(params)
        .then(res => {
          if (res.code === 0) {
            children.push({
              title: '新增节点',
              expand: true,
              post: res.result.post,
              wikiId: res.result._id
            })
            this.$set(data, 'children', children)
          } else {
            console.log('新增节点失败')
          }
        })
        .catch(() => {
          console.log('新增节点失败')
        })
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
    convertTree (tree) {
      const result = []
      tree.forEach(item => {
        let title = item.title
        let expand = true
        let children = item.children
        let post = item.post || {}
        let wikiId = item._id
        // 如果有子节点，递归
        if (children && children.length > 0) {
          children = this.convertTree(children)
        }
        let Obj = {title, expand, children, post, wikiId}
        if (item.level === 0) {
          Obj.render = this.renderTop
        }
        result.push(Obj)
      })
      return result
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          service.updateContents({
            title: this.form.title,
            id: this.form.wikiId,
            post: this.form.post
          })
            .then(res => {
              if (res.code === 0) {
                this.currentData.post = res.result.post
                this.currentData.title = res.result.title
                this.currentPostTitle = res.result.post.title
                this.currentPostId = res.result.post._id
                this.$Message.success('修改成功')
              }
              this.submitLoading = false
            })
            .catch(() => {
              this.submitLoading = false
            })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    remoteMethod (query) {
      console.log(query)
      this.postLoading = true
      service.getByTitleFuzzy({
        title: query
      })
        .then(res => {
          if (res.code === 0) {
            this.postOptions = res.result
          }
          this.postLoading = false
        })
        .catch(() => {
          this.postLoading = false
        })
    },
    getPost () {
      service.getPost({
        id: this.form.post
      })
        .then(res => {
          if (res.code === 0) {
            this.postOptions = [{
              _id: res.result._id,
              title: res.result.title
            }]
          }
        })
    }
  },
  created () {
    this.spinShow = true
    service.getWiki({
      id: this.$route.params.id
    })
      .then(res => {
        if (res.code === 0) {
          let result = res.result
          this.wikiData = this.convertTree(result)
          if (this.wikiData[0]) {
            this.currentData = this.wikiData[0]
            this.form.title = result[0].title
            // this.form.post = result[0].post._id || ''
            this.form.wikiId = result[0]._id
            this.form.article = result[0].article
            this.disabledSumbit = false
            this.currentPostTitle = result[0].post.title
            this.currentPostId = result[0].post._id
          }
        }
        this.spinShow = false
      })
      .catch(() => {
        this.spinShow = false
      })
  }
}
</script>

<style lang="less">
.editContents {
  display: flex;
  width: 100%;
  height: 100%;
  .editContents-title {
    margin-bottom: 15px;
    padding-bottom: 8px;
    font-size: 16px;
    color: #464c5b;
    font-weight: 700;
    border-bottom: 1px solid #999;
    text-align: center;
  }
  .editContents-side {
    position: relative;
    height: 100%;
    min-width: 200px;
    padding-right: 10px;
    border-right: 1px solid #999;
    user-select: none;
    .editContents-btn {
      width: 100%;
      margin-bottom: 10px;
    }
    .wikiTree-title {
      cursor: pointer;
      padding: 2px;
      border-radius: 2px;
      &:hover {
        background-color: #eaf4fe;
      }
    }
    .wikiTree-select {
      background-color: #d5e8fc;
    }
    .ivu-tree-empty {
      text-align: center;
    }
  }
  .editContents-content {
    flex-grow: 1;
    .form {
      padding: 20px;
      width: 400px;
    }
  }
}
</style>
