/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
const postTemplate = "./src/templates/blog-post.tsx"
const { buildSlug } = require(path.resolve(
  __dirname,
  "src/resources/post-builder.js"
))

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(buildPagesQuery)
  // iterate through data from prismic graph call and create gatsby pages
  data.prismic.allBlog_articles.edges.forEach(({ node }) => {
    const slug = buildSlug(node.title)
    // create pages for each post and pass useful contextual attributes
    actions.createPage({
      path: slug,
      component: require.resolve(postTemplate),
      context: { node, slug: slug },
    })
  })
}

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
