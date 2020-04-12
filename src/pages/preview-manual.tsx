import React, { useState, useRef, useLayoutEffect } from "react"
import { graphql, navigate } from "gatsby"
import Prismic from "prismic-javascript"
import BlogPost from "~templates/blog-post"
import { TopicCard } from "~components/topic-card"
import { encode } from "punycode"

// entrypoint to blog repository within Prismic
const entryPoint: string = "https://uxblog.prismic.io/api/v2"
const graphqlEntry: string = "https://uxblog.prismic.io/graphql"


function getBlogPosts(ref: string, orderings?: string): Promise<any> {
  return Prismic.getApi(entryPoint)
    .then((api: any) =>
      api.query(Prismic.Predicates.at("document.type", "blog_article"), {
        ref,
        orderings,
      })
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
}

export default function PreviewPage(data: any) {
  /*
  const cookies: any = {}
  document.cookie.split(";").map((keyValuePair: string) => {
    const keyVal: Array<string> = keyValuePair.split("=")
    cookies[keyVal[0]] = keyVal[1]
  })
  */
  const [blogPosts, setBlogPosts] = useState<Array<any>>([])
  const { location }: any = data
  const token: string | undefined = location.search
    ? location.search.replace("?token=", "")
    : undefined

  console.log(data);

  useLayoutEffect(() => {
    getBlogPosts(token).then((response) => {
      setBlogPosts(response.results)
    })
  }, [token])

  useLayoutEffect(() => {
    async function fetchQuery() {
      const query:string = `
      {
        allBlog_articles(last: 10) {
          edges {
            node {
              subtitle
              title
              authored_date
              body {
                ... on Blog_articleBodyMedia {
                  type
                  label
                  fields {
                    thumbnail
                  }
                }
              }
              _meta {
                uid
                tags
                type
              }
            }
          }
        }
      }
      `.replace(/\n/g, '')
      .replace(/\ +/g, ' ')
      console.log(encodeURIComponent(query));
      const requestString: string = `${graphqlEntry}/?query=${encodeURIComponent(query)}`
      const headers = new Headers();
      headers.append('Access-Control-Allow-Origin', 'http://localhost:8000/')
      headers.append('Access-Control-Allow-Credentials', 'true')
      headers.append('Access-Control-Allow-Methods', 'POST GET')
      headers.append('Prismic-Ref', 'local')
      headers.append('Authorizaton', token)
      return fetch(`${graphqlEntry}`, {
        method: 'POST',
        mode: 'no-cors',
        headers: headers,
        body: query
      });
      
    }
    /*
    fetchQuery().then((result:any)=>{
      console.log('query result', result)
    });
    */
   //console.log(fetchQuery());
  }, [token])

  console.log(blogPosts)
  return blogPosts.map((post: any) => (
    <TopicCard
      title={post.data.title}
      subtitle={post.data.subtitle}
      date={post.data.authored_date}
      tags={post.tags}
      uid={post.uid}
      key={post.uid}
    />
  ))
}
