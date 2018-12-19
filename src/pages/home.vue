<template>
  <div class="layout-container">
    <div class="layout-header">
      <div class="layout-logo">
        <a href="/manage">后台管理</a>
      </div>
      <div class="layout-nav">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <MenuItem name="2">
            <Icon type="md-home" />
            <a href="/">网站首页</a>
          </MenuItem>
          <MenuItem :to="{name: 'siteSettings'}" name="siteSettings">
            <Icon type="ios-settings" />
            网站设置
          </MenuItem>
          <MenuItem name="1">
            <Icon type="md-refresh-circle" />
            <span @click="refresh">刷新</span>
          </MenuItem>
          <Submenu name="4">
            <template slot="title">
              <div class="userInfo">
                <span class="nickname">{{ nickname }}</span>
                <img class="useravatar" :src="avatar" alt="avatar">
              </div>
            </template>
            <MenuItem name="4-1">
              <span class="exit" @click="logoutLocal">退出</span>
            </MenuItem>
          </Submenu>
        </Menu>
      </div>
    </div>
    <div class="layout-body">
      <div class="layout-sider">
        <div class="layout-sider-scroll">
          <Menu theme="light" width="auto" :active-name="routerName" :open-names="openName">
            <Submenu name="user">
              <template slot="title">
                <Icon type="ios-people" />
                用户管理
              </template>
              <MenuItem :to="{ name: 'userList' }" name="userList">用户列表</MenuItem>
              <MenuItem :to="{ name: 'addUser' }" name="addUser">新增用户</MenuItem>
            </Submenu>
            <Submenu name="article">
              <template slot="title">
                <Icon type="ios-book" />
                文章管理
              </template>
              <MenuItem :to="{ name: 'articleList' }" name="articleList">文章列表</MenuItem>
              <MenuItem :to="{ name: 'addArticle' }" name="addArticle">撰写文章</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-chatbubbles" />
                评论管理
              </template>
              <MenuItem name="3-1">评论列表</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="md-git-network" />
                Wiki管理
              </template>
              <MenuItem name="4-1">Wiki列表</MenuItem>
              <MenuItem name="4-2">新增Wiki</MenuItem>
            </Submenu>
            <Submenu name="tag">
              <template slot="title">
                <Icon type="ios-pricetag" />
                标签管理
              </template>
              <MenuItem name="5-1">标签列表</MenuItem>
              <MenuItem :to="{ name: 'addTag' }" name="addTag">新增标签</MenuItem>
            </Submenu>
            <Submenu name="category">
              <template slot="title">
                <Icon type="ios-apps" />
                分类管理
              </template>
              <MenuItem :to="{ name: 'addCategory' }" name="addCategory">新增分类</MenuItem>
            </Submenu>
            <Submenu name="6">
              <template slot="title">
                <Icon type="md-cloud-upload" />
                资源管理
              </template>
              <MenuItem :to="{ name: 'imagesManage' }" name="images">图片</MenuItem>
            </Submenu>
            <Submenu name="settings">
              <template slot="title">
                <Icon type="ios-construct" />
                综合设置
              </template>
              <MenuItem :to="{ name: 'settingNav' }" name="settingNav">导航设置</MenuItem>
              <MenuItem :to="{ name: 'settingFriendLink' }" name="settingFriendLink">友情链接设置</MenuItem>
            </Submenu>
          </Menu>
        </div>
      </div>
      <div ref="content" class="layout-main">
        <transition
          enter-active-class="animated fadeIn"
        >
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  inject: ['reload'],
  created () {
    this.getUserInfo()
      .then(res => {
        this.nickname = res.result.nickname
        this.avatar = res.result.avatar
      })
  },
  data () {
    return {
      nickname: '',
      avatar: ''
    }
  },
  computed: {
    routerName: function () {
      return this.$route.name
    },
    openName: function () {
      if (this.$route.name === 'userList') {
        return ['user']
      }
      if (this.$route.name === 'addUser') {
        return ['user']
      }
      if (this.$route.name === 'updateUser') {
        return ['user']
      }
      if (this.$route.name === 'settingNav') {
        return ['settings']
      }
      if (this.$route.name === 'settingFriendLink') {
        return ['settings']
      }
      if (this.$route.name === 'addArticle') {
        return ['article']
      }
      if (this.$route.name === 'articleList') {
        return ['article']
      }
      if (this.$route.name === 'updateArticle') {
        return ['article']
      }
      return []
    }
  },
  mounted () {
    let _this = this
    this.computedContentWidth()
    window.addEventListener('resize', function () {
      _this.computedContentWidth()
    })
  },
  methods: {
    ...mapActions(['logout', 'getUserInfo']),
    logoutLocal () {
      this.logout()
        .then(res => {
          if (res.code === 0) {
            location.href = 'http://localhost:3000'
          }
        })
    },
    refresh () {
      location.reload()
      // this.reload()
    },
    computedContentWidth () {
      this.$refs.content.style.width = window.innerWidth - 217 + 'px'
      this.$refs.content.style.height = window.innerHeight - 60 + 'px'
    }
  }
}
</script>
<style lang="less">
  .layout-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border: 1px solid #d7dde4;
    border-radius: 4px;
    background: #f5f7f9;
    overflow: hidden;
    box-sizing: border-box;
    .layout-header {
      position: relative;
      flex-shrink: 0;
      display: flex;
      justify-content: space-between;
      height: 60px;
      padding: 0 20px;
      align-items: center;
      background-color: #515a6e;
      .layout-logo {
        height: 100%;
        text-align: center;
        font-size: 30px;
        a {
          display: block;
          height: 100%;
          padding: 0 20px;
          line-height: 60px;
          color: #fff;
          font-weight: 700;
          background-color: transparent;
          transition: background-color .5s;
        }
        a:hover {
          background-color: #464e5f;
        }
      }
      .layout-nav {
        a {
          color: rgba(255, 255, 255, .7);
        }
        a:hover {
          color: rgba(255, 255, 255, 1);
        }
        .userInfo {
          display: inline-flex;
          align-items: center;
          .useravatar {
            width: 40px;
            height: 40px;
            margin-left: 5px;
            border-radius: 20px;
          }
        }
        .exit {
          display: block;
          width: 100%;
          height: 100%;
        }
        .ivu-menu {

        }
      }
    }
    .layout-body {
      flex-grow: 1;
      display: flex;
      .layout-sider {
        position: relative;
        flex-shrink: 0;
        overflow-x: hidden;
        width: 217px;
        box-sizing: border-box;
        .layout-sider-scroll {
          height: 100%;
          margin-right: -15px;
          overflow-y: scroll;
          overflow-x: hidden;
        }
      }
      .layout-sider:after {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        content: '';
        width: 1px;
        background-color: #dcdee2;
      }
      .layout-main {
        overflow: hidden;
      }
    }
  }
</style>
