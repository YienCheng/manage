<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>综合设置</BreadcrumbItem>
      <BreadcrumbItem>导航设置</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="settingNav">
        <div class="hander-top">
          <Button @click="addNav" type="primary" icon="md-add" ghost>新增导航</Button>
        </div>
        <div class="menu-pannel-container">
          <Table
            :columns="columns"
            :data="menuData"
            :loading="loading"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from '@/service/index'
import {formatDate} from '@/utils/index'
export default {
  name: 'navSetting',
  created () {
    this.loading = true
    service.getSiteNavList()
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
          title: '导航名称',
          align: 'center',
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
          ellipsis: true,
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
          key: 'level',
          width: 100,
          sortable: true
        },
        {
          title: '打开方式',
          align: 'center',
          render: (h, params) => {
            let text = ''
            switch (params.row.target) {
              case '_blank':
                text = '新页面'
                break
              case '_self':
                text = '当前页'
                break
              default:
                text = '当前页'
            }
            return h('span', text)
          }
        },
        {
          title: '创建时间',
          align: 'center',
          width: 160,
          render: (h, params) => {
            let creatTime = formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm:ss')
            return h('span', creatTime)
          }
        },
        {
          title: '切换状态',
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
                    service.updateSiteNav(params.row)
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
                    _this.$router.push({name: 'updateNav', params: {id: params.row._id}})
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
                    service.deleteSiteNav({
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
    addNav () {
      this.$router.push({name: 'addNav'})
    }
  }
}
</script>

<style lang="less">
.settingNav {
  .hander-top {
    margin-bottom: 10px;
    vertical-align: bottom;
    span {
      margin-left: 10px;
    }
  }
}
</style>
