const settingNav = resolve => require.ensure([], () => resolve(require('@/pages/setting/settingNav')), 'settingNav')
const addNav = resolve => require.ensure([], () => resolve(require('@/pages/nav/addNav')), 'addNav')
const updateNav = resolve => require.ensure([], () => resolve(require('@/pages/nav/updateNav')), 'updateNav')

const navRoute = {
  settingNav,
  addNav,
  updateNav
}

export default navRoute
