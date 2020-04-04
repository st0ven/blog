import React from "react"
import Layout from "~components/layout"
import hljs from "highlight.js"
import { graphql, Link } from "gatsby"
import { navigate } from "@reach/router"
import { RichText } from "prismic-reactjs"
import { Blockquote } from "~components/blockquote"
import { PublishedDate } from "~components/published-date"
import { ArrowLeftCircle, ArrowUpCircle } from "react-feather"
import { getFormalDateFromString } from "~resources/chronology"

import styles from "~templates/blog-post.module.scss"

function renderBodyContent(body: Array<any>) {
  return body.map((slice: any, index: number) => {
    const key: string = `${slice.type}-${index}`
    switch (slice.type) {
      case "article_content":
        return <RichText render={slice.primary.rich_text} key={key} />
        break
      case "section_title":
        return (
          <h3 className={styles.sectionTitle} key={key}>
            {RichText.asText(slice.primary.section_title)}
          </h3>
        )
        break
      case "blockquote":
        return <Blockquote text={slice.primary.text} key={key} />
        break
      case "horizontal_rule":
        return <hr className={styles.horizontalRule} key={key} />
        break
    }
  })
}

function scrollToTop(){
  if(window){
    window.scrollTo(0,0);
  }
}

export default ({ data, pageContext }: any) => {
  const { node }: any = data.prismic.allBlog_articles.edges[0]
  const dateString: string = getFormalDateFromString(node.authored_date)
  return (
    <Layout>
      <header>
        <Link className={styles.articleNavLink} to="/">
          <ArrowLeftCircle className={styles.icon} />
          Other articles
        </Link>
      </header>
      <hr className={styles.horizontalRule} />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{RichText.asText(node.title)}</h1>
          <h2 className={styles.subtitle}>{RichText.asText(node.subtitle)}</h2>
          <div className={styles.publishedDate}>
            <PublishedDate date={dateString} />
          </div>
        </header>
        <hr className={styles.horizontalRule} />
        <section>{renderBodyContent(node.body)}</section>
      </article>
      <hr className={styles.horizontalRule} />
      <footer>
        <a className={styles.articleNavLink} onClick={scrollToTop}>
          <ArrowUpCircle className={styles.icon} />
          Back to top
        </a>
      </footer>
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
          }
        }
      }
    }
  }
`
