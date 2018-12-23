const imagesMaterial = resolve => require.ensure([], () => resolve(require('@/pages/material/imagesMaterial')), 'imagesManage')
const postMaterial = resolve => require.ensure([], () => resolve(require('@/pages/material/postMaterial')), 'postManage')
const addPost = resolve => require.ensure([], () => resolve(require('@/pages/material/addPost')), 'postManage')
const updatePost = resolve => require.ensure([], () => resolve(require('@/pages/material/updatePost')), 'updatePost')

const materialRoute = {
  imagesMaterial,
  postMaterial,
  addPost,
  updatePost
}

export default materialRoute
