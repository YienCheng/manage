const addWiki = resolve => require.ensure([], () => resolve(require('@/pages/wiki/addWiki')), 'addWiki')

const wikiRoute = {
  addWiki
}

export default wikiRoute
