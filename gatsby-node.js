const path = require("path")
const cookieParser = require("cookie-parser")
const postTemplate = "./src/templates/blog-post.tsx"
const { getBlogPosts } = require("./src/api/prismic")
const { linkResolver } = require(path.resolve(
  __dirname,
  "src/resources/link-resolver.js"
))

const article_api_id = "blog_article"
const isProduction = process.env.NODE_ENV === "production"
// closure variable to store preview token from Prismic
let prismicPreviewToken

// create a new page to be cached by gatsby's store
function createPageWithContext(page, createPage, context = {}) {
  const slug = linkResolver(page.data.title, page.type)
  return createPage({
    path: slug,
    component: require.resolve(postTemplate),
    context: { ...page, slug: slug, ...context },
  })
}

/*
Fetch the latest published articles through Prismic API
*/
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  return await getBlogPosts().then((response) => {
    if (response.results) {
      response.results.map((page) => {
        createPageWithContext(page, createPage)
      })
    }
  })
}

exports.onCreateDevServer = isProduction
  ? null
  : function DevServerEffect({ app, actions, getNodesByType }) {
      const { createPage } = actions
      // grab node list from gatsby, filtering only those of SitePage type.
      // further filter out only blog articles to be included in the list.
      const pageNodes = getNodesByType("SitePage").filter(
        (node) => node.context && node.context.type === article_api_id
      )
      // use cookie parser
      app.use(cookieParser())
      /* 
				We want to check here to see if prismic has passed a preview token.
				If so, we want to fetch the available posts in the preview with the
				valid token. Once fetched, create a new node in gatsby's store if the
				article was not already public. This allows local support for preview content.
			*/

      app.use(async (req, res, next) => {
        const { token } = req.query
        if (token && !prismicPreviewToken) {
          prismicPreviewToken = token
          /*
						Use preview token to fetch the latest blog articles that may be unpublished.
						Compare any new posts against existing gatsby nodes and if no matches are encountered,
						create a new gatsby page for the unpublished article.
					*/
          await getBlogPosts({ ref: prismicPreviewToken }).then((response) => {
            if (response && response.results) {
              response.results.forEach(async (page) => {
                if (
                  !pageNodes.some((pageNode) => page.path === pageNode.path)
                ) {
                  await createPageWithContext(page, createPage, {
                    prismicPreviewToken,
                  })
                }
              })
            }
          })
        }
        next()
      })
    }
