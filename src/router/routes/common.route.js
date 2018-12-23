const login = resolve => require.ensure([], () => resolve(require('@/pages/login')), 'login')
const home = resolve => require.ensure([], () => resolve(require('@/pages/home')), 'home')
const index = resolve => require.ensure([], () => resolve(require('@/pages/index')), 'index')
const siteSettings = resolve => require.ensure([], () => resolve(require('@/pages/siteSettings')), 'siteSettings')

const commonRoute = {
  login,
  home,
  index,
  siteSettings
}

export default commonRoute
