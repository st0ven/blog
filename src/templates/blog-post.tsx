import React from "react"
import Layout from "~components/layout"
import { Blockquote, CallOut, CodeBlock, SectionTitle } from "~slices"
import { RichText } from "prismic-reactjs"
import { PublishedDate } from "~components/published-date"
import { ArrowLeftCircle, ArrowUpCircle } from "react-feather"
import { AppLink } from "~components/app-link"
import styles from "~templates/blog-post.module.scss"

function renderSlices(body: Array<any> = []) {
  return body.map(({ slice_type, primary }: any, index: number) => {
    const key: string = `${slice_type}-${index}`
    switch (slice_type) {
      case "article_content":
        return <RichText render={primary.rich_text} key={key} />
      case "section_title":
        return <SectionTitle title={primary.section_title} key={key} />
      case "blockquote":
        return <Blockquote text={primary.text} key={key} />
      case "horizontal_rule":
        return <hr className={styles.horizontalRule} key={key} />
      case "code_snippet":
        return <CodeBlock {...primary} key={key} />
      case "call-out":
        return (
          <CallOut
            body={primary.rich_text}
            title={primary.call_out_title}
            key={key}
          />
        )
    }
  })
}

export default function BlogPost({ pageContext }: any) {
  const { first_publication_date, data, slug } = pageContext
  const { title, subtitle } = data
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
          <h1 className={styles.title}>{RichText.asText(title)}</h1>
          <span className={styles.subtitle}>{RichText.asText(subtitle)}</span>
          <div className={styles.publishedDate}>
            <PublishedDate
              date={first_publication_date}
              title="date published"
            />
          </div>
        </header>
        <hr className={styles.horizontalRule} />
        <section>{renderSlices(data.body)}</section>
      </article>
      <hr className={styles.horizontalRule} />
      <footer>
        <AppLink icon={<ArrowUpCircle />} to={`/${slug}/#`} replace>
          Back to top
        </AppLink>
      </footer>
    </Layout>
  )
}
