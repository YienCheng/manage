<template>
  <div class="layout-wrapper">
    <Breadcrumb :style="{marginBottom: '20px'}">
      <BreadcrumbItem>我的位置</BreadcrumbItem>
      <BreadcrumbItem>用户管理</BreadcrumbItem>
      <BreadcrumbItem>用户列表</BreadcrumbItem>
    </Breadcrumb>
    <div class="layout-content">
      <div class="userList">
        <Table
          :columns="columns"
          :data="userList"
          :loading="loadingUserList"
        >
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
import * as service from '@/service'
import _ from 'lodash'
import * as utils from '@/utils'
import userListExpand from '@/components/userList-expand'
export default {
  name: 'userList',
  components: {
    userListExpand
  },
  created () {
    this.getUserList()
  },
  data () {
    let _this = this
    return {
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(userListExpand, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '账号',
          key: 'loginAccount',
          align: 'center',
          ellipsis: true,
          tooltip: true,
          sortable: true
        },
        {
          title: '用户名',
          key: 'username',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '昵称',
          key: 'nickname',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '操作',
          align: 'center',
          render (h, params) {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    _this.$router.push({name: 'updateUser', params: {id: params.row.loginAccount}})
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      userList: [],
      loadingUserList: false
    }
  },
  methods: {
    getUserList () {
      this.loadingUserList = true
      service.getUserList()
        .then(res => {
          if (res.code === 0) {
            _.forEach(res.result, item => {
              switch (item.role) {
                case 'user':
                  item.type = '用户'
                  break
                case 'manager':
                  item.type = '管理员'
                  break
                default:
                  item.type = '用户'
              }
              let creatTime = utils.formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm:ss')
              let lastLoginTime = utils.formatDate(new Date(item.lastLoginTime), 'yyyy-MM-dd hh:mm:ss')
              item.createTime = creatTime
              item.lastLoginTime = lastLoginTime
            })
            this.userList = res.result
          }
          this.loadingUserList = false
        })
        .catch(() => {
          this.loadingUserList = false
        })
    }
  }
}
</script>

<style lang="less">
.userList {

}
</style>
