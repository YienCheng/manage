const addArticle = resolve => require.ensure([], () => resolve(require('@/pages/article/addArticle')), 'addArticle')
const articleList = resolve => require.ensure([], () => resolve(require('@/pages/article/articleList')), 'articleList')
const updateArticle = resolve => require.ensure([], () => resolve(require('@/pages/article/updateArticle')), 'updateArticle')

const articleRoute = [
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
  }
]

export default articleRoute
