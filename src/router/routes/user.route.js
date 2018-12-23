const userList = resolve => require.ensure([], () => resolve(require('@/pages/customer/userList')), 'userList')
const addUser = resolve => require.ensure([], () => resolve(require('@/pages/customer/addUser')), 'addUser')
const updateUser = resolve => require.ensure([], () => resolve(require('@/pages/customer/updateUser')), 'updateUser')

const userRoute = {
  userList,
  addUser,
  updateUser
}

export default userRoute
