import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'

const home = resolve => require.ensure([], () => resolve(require('@/pages/home')), 'home')
const index = resolve => require.ensure([], () => resolve(require('@/pages/index')), 'index')
const userList = resolve => require.ensure([], () => resolve(require('@/pages/userList')), 'userList')
const addUser = resolve => require.ensure([], () => resolve(require('@/pages/addUser')), 'addUser')
const siteSettings = resolve => require.ensure([], () => resolve(require('@/pages/siteSettings')), 'siteSettings')
const updateUser = resolve => require.ensure([], () => resolve(require('@/pages/updateUser')), 'updateUser')
const settingNav = resolve => require.ensure([], () => resolve(require('@/pages/settingNav')), 'settingNav')
const addNav = resolve => require.ensure([], () => resolve(require('@/pages/addNav')), 'addNav')
const updateNav = resolve => require.ensure([], () => resolve(require('@/pages/updateNav')), 'updateNav')
const settingFriendLink = resolve => require.ensure([], () => resolve(require('@/pages/settingFriendLink')), 'settingFriendLink')
const addFriendLink = resolve => require.ensure([], () => resolve(require('@/pages/addFriendLink')), 'addFriendLink')
const updateFriendLink = resolve => require.ensure([], () => resolve(require('@/pages/updateFriendLink')), 'updateFriendLink')
const addArticle = resolve => require.ensure([], () => resolve(require('@/pages/addArticle')), 'addArticle')
const addCategory = resolve => require.ensure([], () => resolve(require('@/pages/addCategory')), 'addCategory')
const addTag = resolve => require.ensure([], () => resolve(require('@/pages/addTag')), 'addTag')
const imagesManage = resolve => require.ensure([], () => resolve(require('@/pages/imagesManage')), 'imagesManage')
const articleList = resolve => require.ensure([], () => resolve(require('@/pages/articleList')), 'articleList')
const updateArticle = resolve => require.ensure([], () => resolve(require('@/pages/updateArticle')), 'updateArticle')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/manage/',
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '',
          name: 'index',
          meta: {
            title: '首页-网站后台'
          },
          component: index
        },
        {
          path: 'userList',
          name: 'userList',
          meta: {
            title: '用户列表-网站后台'
          },
          component: userList
        },
        {
          path: 'addUser',
          name: 'addUser',
          meta: {
            title: '新增用户-网站后台'
          },
          component: addUser
        },
        {
          path: 'updateUser/:id',
          name: 'updateUser',
          meta: {
            title: '更新用户-网站后台'
          },
          component: updateUser
        },
        {
          path: 'siteSettings',
          name: 'siteSettings',
          meta: {
            title: '网站设置-网站后台'
          },
          component: siteSettings
        },
        {
          path: 'settingNav',
          name: 'settingNav',
          meta: {
            title: '导航设置-网站后台'
          },
          component: settingNav
        },
        {
          path: 'addNav',
          name: 'addNav',
          meta: {
            title: '新增导航-网站后台'
          },
          component: addNav
        },
        {
          path: 'updateNav/:id',
          name: 'updateNav',
          meta: {
            title: '编辑导航-网站后台'
          },
          component: updateNav
        },
        {
          path: 'settingFriendLink',
          name: 'settingFriendLink',
          meta: {
            title: '友情链接设置-网站后台'
          },
          component: settingFriendLink
        },
        {
          path: 'addFriendLink',
          name: 'addFriendLink',
          meta: {
            title: '新增友情链接-网站后台'
          },
          component: addFriendLink
        },
        {
          path: 'updateFriendLink/:id',
          name: 'updateFriendLink',
          meta: {
            title: '编辑友情链接-网站后台'
          },
          component: updateFriendLink
        },
        {
          path: 'addArticle',
          name: 'addArticle',
          meta: {
            title: '发表文章-网站后台'
          },
          component: addArticle
        },
        {
          path: 'articleList',
          name: 'articleList',
          meta: {
            title: '文章列表-网站后台'
          },
          component: articleList
        },
        {
          path: 'updateArticle/:id',
          name: 'updateArticle',
          meta: {
            title: '更新文章-网站后台'
          },
          component: updateArticle
        },
        {
          path: 'addCategory',
          name: 'addCategory',
          meta: {
            title: '新增分类-网站后台'
          },
          component: addCategory
        },
        {
          path: 'addTag',
          name: 'addTag',
          meta: {
            title: '新增标签-网站后台'
          },
          component: addTag
        },
        {
          path: 'imagesManage',
          name: 'imagesManage',
          meta: {
            title: '图片管理-网站后台'
          },
          component: imagesManage
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  iView.LoadingBar.start()
  next()
})
router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})
export default router
