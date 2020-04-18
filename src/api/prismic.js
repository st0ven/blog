//mport Prismic from "prismic-javascript"
const Prismic = require("prismic-javascript")

// entrypoint to blog repository within Prismic
const entryPoint = process.env.PRISMIC_ENTRYPOINT
console.log(`prismic entry point is: ${entryPoint}`)

// test function to fetch posts from Primsic API
module.exports = {
  getBlogPosts: (options = {}) => {
    return Prismic.getApi(entryPoint)
      .then((api) =>
        api.query(
          Prismic.Predicates.at("document.type", "blog_article"),
          options
        )
      )
      .then(
        (response) => {
          return response
        },
        (error) => {
          console.log(error)
        }
      )
  },
}
