import Prismic from "prismic-javascript"

// entrypoint to blog repository within Prismic
const entryPoint: string =
  process.env.GATSBY_PRISMIC_ENTRYPOINT || "https://uxblog.prismic.io/api/v2"

// test function to fetch posts from Primsic API
export function getBlogPosts(options = {}): Promise<any> {
  return Prismic.getApi(entryPoint)
    .then((api: any) =>
      api.query(Prismic.Predicates.at("document.type", "blog_article"), options)
    )
    .then(
      (response: any) => {
        console.log("got response", response)
        return response
      },
      (error: any) => {
        console.log(error)
      }
    )
  /*
    .then(
      (response: any) => {console.log('got response'); return response},
      (error: any) => {
        console.log(error)
      }
    )
    */
}
