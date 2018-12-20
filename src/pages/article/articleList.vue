<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>文章管理</BreadcrumbItem>
      <BreadcrumbItem>文章列表</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="articleList">
        <Table
          :columns="columns"
          :data="postList"
          :loading="loading"
        >
        </Table>
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
import * as service from '@/service/index'
import _ from 'lodash'
import * as utils from '@/utils/index'
export default {
  name: 'articleList',
  data () {
    return {
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
          title: '作者',
          key: 'author',
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
          title: '发布状态',
          align: 'center',
          width: 100,
          render (h, params) {
            return h('div', [
              h('i-switch', {
                props: {
                  value: params.row.published,
                  size: 'small'
                },
                on: {
                  'on-change': function (v) {
                    params.row.published = v
                    service.switchPublished({
                      id: params.row._id,
                      published: v
                    })
                  }
                }
              })
            ])
          }
        },
        {
          title: '推荐状态',
          align: 'center',
          width: 100,
          render (h, params) {
            return h('div', [
              h('i-switch', {
                props: {
                  value: params.row.recommend,
                  size: 'small'
                },
                on: {
                  'on-change': function (v) {
                    params.row.recommend = v
                    service.switchRecommend({
                      id: params.row._id,
                      recommend: v
                    })
                  }
                }
              })
            ])
          }
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
                    console.log(_this)
                    _this.$router.push({name: 'updateArticle', params: {id: params.row._id}})
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
                        service.deleteArticle({
                          id: params.row._id
                        })
                          .then(res => {
                            if (res.code === 0) {
                              _.forEach(_this.postList, function (item) {
                                if (item._id === params.row._id) {
                                  let index = _this.postList.indexOf(item)
                                  _this.postList.splice(index, 1)
                                }
                              })
                              _this.$Message.success('删除成功！')
                            }
                          })
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
      pageSize: 10,
      pageNumber: 1,
      total: 100
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    getArticleList () {
      this.loading = true
      service.getArticleList({
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      })
        .then(res => {
          if (res.code === 0) {
            this.total = res.result.total
            _.forEach(res.result.list, item => {
              item.createTime = utils.formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss')
            })
            this.postList = res.result.list
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    pageChange (pageNumber) {
      this.pageNumber = pageNumber
      this.getArticleList()
    },
    pageSizeChange (pageSize) {
      this.pageNumber = 1
      this.pageSize = pageSize
      this.getArticleList()
    }
  }
}
</script>

<style lang="less">
.articleList {

}
</style>
