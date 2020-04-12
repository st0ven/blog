const path = require("path")
const cookieParser = require("cookie-parser")
const postTemplate = "./src/templates/blog-post.tsx"
const Prismic = require("prismic-javascript")
const { linkResolver } = require(path.resolve(
  __dirname,
  "src/resources/link-resolver.js"
))
const entryPoint = "https://uxblog.prismic.io/api/v2"

/*
exports.onCreateNode = ({node, actions}) => {
  console.log(node, actions);
}
*/

function fetchDocumentsFromPrismicCMS() {
  return Prismic.getApi(entryPoint).then(
    (api) => api.query(Prismic.Predicates.at("document.type", "blog_article")),
    { pageSize: 100 }
  )
}

function createPages(page, createPage) {
  const slug = linkResolver(page.data.title, page.type)
  createPage({
    path: slug,
    component: require.resolve(postTemplate),
    context: { ...page, slug: slug },
  })
}

exports.createPages = async function ({ actions, href }) {
  console.log("create pages")
  const { createPage } = actions
  const response = await fetchDocumentsFromPrismicCMS(createPages)
  response.results.map((page) => {
    createPages(page, createPage)
  })
}

exports.onCreateDevServer = (gatsby) => {
  console.log("dev server complete")
  const { app } = gatsby
  //console.log(node);
  const nodelist = gatsby.getNodes()
  //console.log(nodelist)
  app.use(cookieParser())
  app.use((req, res, next) => {
    const previewCookie = JSON.parse(req.cookies["io.prismic.preview"])
    nodelist.forEach((node) => gatsby.actions.createNodeField({
      node, 
      name: 'previewCookie',
      value: previewCookie
    }))
    console.log(previewCookie["uxblog.prismic.io"]["preview"])
    next()
  })
  /*app.get('/', (req, res) => {
    const previewCookie = JSON.parse(req.cookies['io.prismic.preview'])
    console.log(previewCookie['uxblog.prismic.io']['preview'])
    app.handle(req, res)
  })*/
}

/*
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const { graphql } = require("gatsby")

  if (page.context.type === "blog_article") {
    console.log(page.path);
    const Prismic = require("prismic-javascript")

    Prismic.getApi(entryPoint)
      .then((api) => api.getByID(page.context.id))
      .then(
        (response) => {
          console.log(response)
          const slug = linkResolver(response.data.title, response.type)
          deletePage(page)
          createPage({
            ...page,
            matchPath: slug,
            context: {
              ...page.context,
              slug
            },
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }
  //const oldPage = Object.assign({}, page)
}
*/

// query to fetch all blog posts
// may need to be updated in the future to accommodate boundaries
// or new criteria
const buildPagesQuery = `
  {
    prismic {
      allBlog_articles {
        edges {
          node {
            body {
              ... on PRISMIC_Blog_articleBodyArticle_content {
                type
                label
                primary {
                  rich_text
                }
              }
              ... on PRISMIC_Blog_articleBodyMedia {
                type
                label
                fields {
                  thumbnail
                }
              }
              ... on PRISMIC_Blog_articleBodyBlockquote {
                type
                label
                primary {
                  text
                }
              }
              ... on PRISMIC_Blog_articleBodyHorizontal_rule {
                type
                label
              }
              ... on PRISMIC_Blog_articleBodySection_title {
                type
                label
                primary {
                  section_title
                }
              }
            }
            _meta {
              uid
              type
            }
            title
            subtitle
            authored_date
          }
        }
      }
    }
  }
`
