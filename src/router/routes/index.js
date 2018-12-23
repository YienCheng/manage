import commonRoute from './common.route'
import userRoute from './user.route'
import navRoute from './nav.route'
import friendLinkRoute from './friendLink.route'
import artileRoute from './article.route'
import categoryRoute from './category.route'
import tagRoute from './tag.route'
import materialRoute from './material.route'
import wikiRoute from './wiki.route'

export default {
  ...commonRoute,
  ...userRoute,
  ...navRoute,
  ...friendLinkRoute,
  ...artileRoute,
  ...categoryRoute,
  ...tagRoute,
  ...materialRoute,
  ...wikiRoute
}
