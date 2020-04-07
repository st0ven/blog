/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const { buildSlug } = require(path.resolve(
  __dirname,
  "src/resources/post-builder.js"
))

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      prismic {
        allBlog_articles {
          edges {
            node {
              title
              _meta {
                uid
              }
            }
          }
        }
      }
    }
  `)
  // iterate through data from prismic graph call and create gatsby pages
  data.prismic.allBlog_articles.edges.forEach(edge => {
    const { title, _meta } = edge.node
    const slug = buildSlug(title)
    // create pages for each post and pass useful contextual attributes
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/blog-post.tsx"),
      context: { slug: slug, uid: _meta.uid },
    })
  })
}
