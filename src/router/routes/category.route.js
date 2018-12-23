const addCategory = resolve => require.ensure([], () => resolve(require('@/pages/category/addCategory')), 'addCategory')

const categoryRoute = {
  addCategory
}

export default categoryRoute
