const { RichText } = require("prismic-reactjs")
/* 
Build a slug for a given blog post as fetched from a Prismic backend API call
  prismicTitle: A prismic object which has the structure of :
    [{
      type: string,
      text: string.
      ...
    }...]
  authored_date: is a string in the format of 'mm-dd-yyyy'
*/
module.exports = {
  buildSlug: (prismicTitle) => {
    const extractedTitleString = RichText.asText(prismicTitle)
    const urlSafeTitle = encodeURIComponent(
      extractedTitleString.replace(/\s/g, "-")
    ).toLowerCase()
    return urlSafeTitle
  },
}
