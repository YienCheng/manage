import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import store from '@/store'

Vue.use(Router)

const login = resolve => require.ensure([], () => resolve(require('@/pages/login')), 'login')
const home = resolve => require.ensure([], () => resolve(require('@/pages/home')), 'home')
const index = resolve => require.ensure([], () => resolve(require('@/pages/index')), 'index')
const userList = resolve => require.ensure([], () => resolve(require('@/pages/customer/userList')), 'userList')
const addUser = resolve => require.ensure([], () => resolve(require('@/pages/customer/addUser')), 'addUser')
const siteSettings = resolve => require.ensure([], () => resolve(require('@/pages/siteSettings')), 'siteSettings')
const updateUser = resolve => require.ensure([], () => resolve(require('@/pages/customer/updateUser')), 'updateUser')
const settingNav = resolve => require.ensure([], () => resolve(require('@/pages/setting/settingNav')), 'settingNav')
const addNav = resolve => require.ensure([], () => resolve(require('@/pages/nav/addNav')), 'addNav')
const updateNav = resolve => require.ensure([], () => resolve(require('@/pages/nav/updateNav')), 'updateNav')
const settingFriendLink = resolve => require.ensure([], () => resolve(require('@/pages/friendLink/settingFriendLink')), 'settingFriendLink')
const addFriendLink = resolve => require.ensure([], () => resolve(require('@/pages/friendLink/addFriendLink')), 'addFriendLink')
const updateFriendLink = resolve => require.ensure([], () => resolve(require('@/pages/friendLink/updateFriendLink')), 'updateFriendLink')
const addArticle = resolve => require.ensure([], () => resolve(require('@/pages/article/addArticle')), 'addArticle')
const addCategory = resolve => require.ensure([], () => resolve(require('@/pages/category/addCategory')), 'addCategory')
const addTag = resolve => require.ensure([], () => resolve(require('@/pages/tag/addTag')), 'addTag')
const articleList = resolve => require.ensure([], () => resolve(require('@/pages/article/articleList')), 'articleList')
const updateArticle = resolve => require.ensure([], () => resolve(require('@/pages/article/updateArticle')), 'updateArticle')

const imagesMaterial = resolve => require.ensure([], () => resolve(require('@/pages/material/imagesMaterial')), 'imagesManage')
const postMaterial = resolve => require.ensure([], () => resolve(require('@/pages/material/postMaterial')), 'postManage')
const addPost = resolve => require.ensure([], () => resolve(require('@/pages/material/addPost')), 'postManage')
const updatePost = resolve => require.ensure([], () => resolve(require('@/pages/material/updatePost')), 'updatePost')
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
            title: '发表博文-网站后台'
          },
          component: addArticle
        },
        {
          path: 'articleList',
          name: 'articleList',
          meta: {
            title: '博文列表-网站后台'
          },
          component: articleList
        },
        {
          path: 'updateArticle/:id',
          name: 'updateArticle',
          meta: {
            title: '更新博文-网站后台'
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
          path: 'imagesMaterial',
          name: 'imagesMaterial',
          meta: {
            title: '图片管理-网站后台'
          },
          component: imagesMaterial
        },
        {
          path: 'postMaterial',
          name: 'postMaterial',
          meta: {
            title: '文章列表-资源管理-网站后台'
          },
          component: postMaterial
        },
        {
          path: 'addPost',
          name: 'addPost',
          meta: {
            title: '撰写文章-资源管理-网站后台'
          },
          component: addPost
        },
        {
          path: 'updatePost/:id',
          name: 'updatePost',
          meta: {
            title: '更新文章-文章素材-网站后台'
          },
          component: updatePost
        }
      ]
    },
    {
      path: '/login',
      component: login,
      name: 'login',
      meta: {
        title: '登录-网站后台',
        auth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let { auth = true } = to.meta
  if (!auth) {
    return next()
  }
  if (!store.state.userInfo.username) {
    store.dispatch('getUserInfo')
      .then(res => {
        if (res.code === 0) {
          return next()
        }
        next({ name: 'login' })
      })
      .catch(() => {
        next({ name: 'login' })
      })
  } else {
    iView.LoadingBar.start()
    next()
  }
})
router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})
export default router
