const { buildSlug } = require("./post-builder.js")

module.exports = {
  linkResolver: ( title, type ) => {
    const slug = buildSlug(title);
    switch (type) {
      case "blog_article":
        return `/articles/${slug}`
      default:
        return "/"
    }
  },
}
