const addTag = resolve => require.ensure([], () => resolve(require('@/pages/category/addCategory')), 'addCategory')

const tagRoute = {
  addTag
}

export default tagRoute
