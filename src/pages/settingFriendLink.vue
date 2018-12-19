<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>综合设置</BreadcrumbItem>
      <BreadcrumbItem>友情链接设置</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="settingFriendLink">
        <div class="hander-top">
          <Button @click="addFriendLink" type="primary" icon="md-add" ghost>新增友情链接</Button>
        </div>
        <div class="menu-pannel-container">
          <Table :columns="columns" :data="menuData"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from '@/service'
import {formatDate} from '@/utils'
export default {
  name: 'FriendLinkSetting',
  created () {
    this.loading = true
    service.getFriendLinkList()
      .then(res => {
        if (res.code === 0) {
          this.menuData = res.result
        }
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  },
  data () {
    return {
      menuData: [],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          width: 100,
          align: 'center',
          tooltip: true,
          key: 'name'
        },
        {
          title: '描述',
          align: 'center',
          key: 'description',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '链接',
          align: 'left',
          tooltip: true,
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: params.row.link,
                target: '_blank'
              }
            }, params.row.link)
          }
        },
        {
          title: '等级',
          align: 'center',
          width: 100,
          key: 'level',
          sortable: true
        },
        {
          title: '创建时间',
          width: 160,
          align: 'center',
          render: (h, params) => {
            let creatTime = formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm:ss')
            return h('span', creatTime)
          }
        },
        {
          title: '是否显示',
          align: 'center',
          render (h, params) {
            return h('div', [
              h('i-switch', {
                props: {
                  value: params.row.status,
                  size: 'small'
                },
                on: {
                  'on-change': function (v) {
                    params.row.status = v
                    service.updateFriendLink(params.row)
                  }
                }
              })
            ])
          }
        },
        {
          title: '操作',
          align: 'center',
          width: 160,
          render: (h, params) => {
            let _this = this
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    _this.$router.push({name: 'updateFriendLink', params: {id: params.row._id}})
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
                    service.deleteFriendLink({
                      _id: params.row._id
                    })
                      .then(res => {
                        if (res.code === 0) {
                          _this.menuData.splice(params.index, 1)
                        }
                      })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      loading: false
    }
  },
  methods: {
    addFriendLink () {
      this.$router.push({name: 'addFriendLink'})
    }
  }
}
</script>

<style lang="less">
.settingFriendLink {
  .hander-top {
    margin-bottom: 10px;
    vertical-align: bottom;
    span {
      margin-left: 10px;
    }
  }
}
</style>
