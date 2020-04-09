import React from "react"
import Layout from "~components/layout"
import hljs from "highlight.js"
import { RichText } from "prismic-reactjs"
import { Blockquote } from "~components/blockquote"
import { PublishedDate } from "~components/published-date"
import { ArrowLeftCircle, ArrowUpCircle } from "react-feather"
import { AppLink } from "~components/app-link"

import styles from "~templates/blog-post.module.scss"

function renderBodyContent(body: Array<any> = []) {
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

export default function BlogPost({ pageContext }: any) {
  const { node, slug } = pageContext
  return (
    <Layout>
      <header>
        <AppLink to="/" icon={<ArrowLeftCircle />}>
          Other articles
        </AppLink>
      </header>
      <hr className={styles.horizontalRule} />
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{RichText.asText(node.title)}</h1>
          <span className={styles.subtitle}>
            {RichText.asText(node.subtitle)}
          </span>
          <div className={styles.publishedDate}>
            <PublishedDate date={node.authored_date} title="date published" />
          </div>
        </header>
        <hr className={styles.horizontalRule} />
        <section>{renderBodyContent(node.body)}</section>
      </article>
      <hr className={styles.horizontalRule} />
      <footer>
        <AppLink icon={<ArrowUpCircle />} to={`/${slug}/#`}>
          Back to top
        </AppLink>
      </footer>
    </Layout>
  )
}
