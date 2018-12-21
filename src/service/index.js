import { requestPost, requestGet } from './request'

// 登入
export const login = (options) => requestPost('/manageLogin', options)

// 获取当前登录的用户信息
export const getUserInfo = (options) => requestGet('/manage/getCurrentUserInfo', options)
// 退出登入
export const logout = (options) => requestPost('/manage/logout', options)

// 获取用户列表
export const getUserList = (options) => requestGet('/manage/getUserList', options)
// 添加新用户
export const addUser = (options, payload) => requestPost('/manage/addUser', options, payload)
// 通过账号获取用户信息
export const getUserInfoByAccount = (options) => requestGet('/manage/getUserInfoByAccount', options)
// 更新用户信息
export const updateUserInfo = (options) => requestPost('/manage/updateUserInfo', options)
// 更新用户头像
// export const updateUserAvatar = (options) => requestPost('/manage/updateUserAvatar', options)

// 网站设置
export const updateSiteSetting = (options, payload) => requestPost('/manage/updateSiteSetting', options, payload)
// 获取网站设置
export const getSiteSetting = (options) => requestGet('/manage/getSiteSetting', options)
// 新增网站导航
export const addSiteNav = (options) => requestPost('/manage/addSiteNav', options)
// 获取网站导航列表
export const getSiteNavList = (options) => requestGet('/manage/getSiteNavList', options)
// 删除导航
export const deleteSiteNav = (options) => requestPost('/manage/deleteSiteNav', options)
// 更新导航
export const updateSiteNav = (options) => requestPost('/manage/updateSiteNav', options)
// 获取单个导航信息
export const getSiteNav = (options) => requestGet('/manage/getSiteNav', options)

// 新增友情链接
export const addFriendLink = (options) => requestPost('/manage/addFriendLink', options)
// 获取友情链接表
export const getFriendLinkList = (options) => requestGet('/manage/getFriendLinkList', options)
// 删除友情链接
export const deleteFriendLink = (options) => requestPost('/manage/deleteFriendLink', options)
// 更新友情链接
export const updateFriendLink = (options) => requestPost('/manage/updateFriendLink', options)
// 获取单个友情链接
export const getFriendLink = (options) => requestGet('/manage/getFriendLink', options)

// 新增分类
export const addCategory = (options) => requestPost('/manage/addCategory', options)
// 获取分类列表
export const getCategoryList = (options) => requestGet('/manage/getCategoryList', options)

// 新增标签
export const addTag = (options) => requestPost('/manage/addTag', options)
// 获取标签列表
export const getTagList = (options) => requestGet('/manage/getTagList', options)

// 新增文章
export const addArticle = (options) => requestPost('/manage/addArticle', options)
// 获取文章列表
export const getArticleList = (options) => requestGet('/manage/getArticleList', options)
// 切换文章发布状态
export const switchPublished = (options) => requestPost('/manage/switchPublished', options)
// 切换文章推荐状态
export const switchRecommend = (options) => requestPost('/manage/switchRecommend', options)
// 获取文章
export const getArticle = (options) => requestGet('/manage/getArticle', options)
// 更新文章
export const updateArticle = (options) => requestPost('/manage/updateArticle', options)
// 删除文章
export const deleteArticle = (options) => requestPost('/manage/deleteArticle', options)

// 新增文章资源
export const addPost = (options) => requestPost('/manage/addPost', options)
// 获取文章资源
export const getPostList = (options) => requestGet('/manage/getPostList', options)
// 获取文章资源
export const deletePost = (options) => requestPost('/manage/deletePost', options)
// 获取文章单个
export const getPost = (options) => requestGet('/manage/getPost', options)
// 更新文章
export const updatePost = (options) => requestPost('/manage/updatePost', options)
// 通过title模糊查询
export const getByTitleFuzzy = (options) => requestGet('/manage/getByTitleFuzzy', options)
