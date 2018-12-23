const settingFriendLink = resolve => require.ensure([], () => resolve(require('@/pages/friendLink/settingFriendLink')), 'settingFriendLink')
const addFriendLink = resolve => require.ensure([], () => resolve(require('@/pages/friendLink/addFriendLink')), 'addFriendLink')
const updateFriendLink = resolve => require.ensure([], () => resolve(require('@/pages/friendLink/updateFriendLink')), 'updateFriendLink')

const friendLinkRoute = {
  settingFriendLink,
  addFriendLink,
  updateFriendLink
}

export default friendLinkRoute
