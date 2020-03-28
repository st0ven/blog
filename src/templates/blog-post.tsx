import React from "react"
import Layout from "~components/layout"
import { graphql } from "gatsby"
import { navigate } from "@reach/router"
import { RichText } from "prismic-reactjs"
import { PublishedDate } from "~components/published-date"
import { ArrowLeftCircle } from "react-feather"

import styles from "~templates/blog-post.module.scss"

function navigateToArticles() {
  navigate("/")
}

export default ({ data, pageContext }: any) => {
  const { node }: any = data.prismic.allBlog_articles.edges[0]
  console.log(pageContext)
  console.log(node.body)
  return (
    <Layout>
      <article className={styles.article}>
        <a
          href="#"
          className={styles.linkWithIcon}
          onClick={navigateToArticles}
        >
          <ArrowLeftCircle className={styles.icon} />
          Other articles
        </a>
        <hr className={styles.horizontalRule} />
        <header className={styles.header}>
          <h1 className={styles.title}>{RichText.asText(node.title)}</h1>
          <h2 className={styles.subtitle}>{RichText.asText(node.subtitle)}</h2>
          <div className={styles.publishedDate}>
            <PublishedDate date={node.authored_date} />
          </div>
        </header>
        <hr className={styles.horizontalRule} />
        <section>
          <RichText render={node.body[0].primary.rich_text} />
        </section>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($uid: String!) {
    prismic {
      allBlog_articles(uid: $uid) {
        edges {
          node {
            title
            subtitle
            authored_date
            body {
              ... on PRISMIC_Blog_articleBodyArticle_content {
                type
                label
                primary {
                  rich_text
                }
              }
              ... on PRISMIC_Blog_articleBodyBanner {
                type
                label
              }
              ... on PRISMIC_Blog_articleBodyMedia {
                type
                label
              }
            }
          }
        }
      }
    }
  }
`
