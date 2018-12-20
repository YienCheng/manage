<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>资源管理</BreadcrumbItem>
      <BreadcrumbItem>文章素材</BreadcrumbItem>
    </Breadcrumb>
    <div class="postMaterial">
      <div class="search-content">
        <Form
          class="form"
          ref="form"
          inline
          :label-width="80"
          :model="form">
          <FormItem prop="id" label="ID" :label-width="30">
            <Input type="text" v-model="form.id" placeholder="请输入文章ID"></Input>
          </FormItem>
          <FormItem prop="title" label="标题" :label-width="40">
            <Input type="text" v-model="form.title" placeholder="请输入文章标题"></Input>
          </FormItem>
          <FormItem prop="date" label="创建时间" :label-width="60">
            <DatePicker
              v-model="form.date"
              type="date"
              placeholder="请选择创建时间"
              :editable="false"
              :options="options"
              ></DatePicker>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary" @click="handleSubmit('form')">查询</Button>
            <Button @click="handleReset('form')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>
      <div class="layout-content">
        <div class="handle-btns">
          <Button type="primary" ghost @click="$router.push({name: 'addPost'})"><Icon type="md-add" /><span class="add-text">撰写文章</span></Button>
        </div>
        <div class="table">
          <Table
            :columns="columns"
            :data="postList"
            :loading="loading"
          >
          </Table>
        </div>
        <div class="layout-pagination">
          <Page
            size="small"
            show-elevator
            show-sizer
            show-total
            :total="total"
            :current="pageNumber"
            :page-size="pageSize"
            :page-size-opts="[10, 20, 30, 40]"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from '@/service'
export default {
  name: 'postMaterial',
  data () {
    return {
      form: {
        id: '',
        date: '',
        title: ''
      },
      options: {
        disabledDate (date) {
          return date.getTime() > Date.now()
        }
      },
      pageNumber: 1,
      pageSize: 10,
      columns: [
        {
          title: 'id',
          key: '_id',
          align: 'center',
          width: 230
        },
        {
          title: '标题',
          key: 'title',
          align: 'center',
          tooltip: true
        },
        {
          title: '描述',
          key: 'description',
          align: 'center',
          tooltip: true
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          width: 160,
          tooltip: true
        },
        {
          title: '操作',
          align: 'center',
          width: 130,
          render: (h, params) => {
            let _this = this
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // _this.$router.push({name: 'updateArticle', params: {id: params.row._id}})
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    _this.$Modal.confirm({
                      title: '删除后不可恢复，确认删除吗,？',
                      content: `<p>标题:${params.row.title}</p>`,
                      onOk: () => {
                        // service.deleteArticle({
                        //   id: params.row._id
                        // })
                        //   .then(res => {
                        //     if (res.code === 0) {
                        //       _.forEach(_this.postList, function (item) {
                        //         if (item._id === params.row._id) {
                        //           let index = _this.postList.indexOf(item)
                        //           _this.postList.splice(index, 1)
                        //         }
                        //       })
                        //       _this.$Message.success('删除成功！')
                        //     }
                        //   })
                      }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      postList: [],
      loading: false,
      total: 0
    }
  },
  methods: {
    handleSubmit (name) {

    },
    pageChange (pageNumber) {
      this.pageNumber = pageNumber
    },
    pageSizeChange (pageSize) {
      this.pageNumber = 1
      this.pageSize = pageSize
    },
    getPostList () {
      service.getPostList({
        id: this.form.id,
        title: this.form.title,
        date: this.form.date ? this.form.date.getTime() : null
      })
    }
  }
}
</script>

<style lang="less">
.postMaterial {
  .form {
  }
  .handle-btns {
    margin-bottom: 10px;
    .add-text {
      margin-left: 10px;
    }
  }
}
</style>
