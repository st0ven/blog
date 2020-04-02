import Prismic from "prismic-javascript"

// entrypoint to blog repository within Prismic
const entryPoint: string = process.env.GATSBY_PRISMIC_ENTRYPOINT

// test function to fetch posts from Primsic API
export function getBlogPosts(orderings?: string): Promise<any> {
  return Prismic.getApi(entryPoint)
    .then((api: any) =>
      api.query(Prismic.Predicates.at("document.type", "blog_article"), {
        orderings,
      })
    )
    .then(
      (response: any) => {console.log('got response'); return response},
      (error: any) => {
        console.log(error)
      }
    )
}
