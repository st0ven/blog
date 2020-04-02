import React, { useRef } from "react"
import cx from "classnames"
import { graphql } from "gatsby"
import "~styles/global.scss"
import styles from "~pages/page.module.scss"
import Layout from "~components/layout"
import SEO from "~components/seo"
import { ArticleGroup } from "~components/article-group"
import {
  ChronologicalArticleGroup,
  organizePostChronologically,
} from "~resources/chronology"

/*
Given a list of ChronologicalArticleGroups, will
iterate through groups and render each as a ReactNode
*/
function renderChronologicalArticleGroups(
  chronologicalArticles: React.MutableRefObject<
    Array<ChronologicalArticleGroup>
  >
): React.ReactNode {
  return chronologicalArticles.current.map(
    (articleGroup: ChronologicalArticleGroup, index: number) => (
      <section key={`${articleGroup.year}-${articleGroup.month}`}>
        {index ? <hr className={styles.divider} /> : null}
        <ArticleGroup {...articleGroup} />
      </section>
    )
  )
}

export default function IndexPage({ data: { prismic } }) {
  const { allBlog_articles } = prismic
  const articles: Array<any> = allBlog_articles.edges
  const chronologicalArticles: React.MutableRefObject<Array<
    ChronologicalArticleGroup
  >> = useRef(organizePostChronologically(articles))

  return (
    <div className={styles.page}>
      <Layout>
        <SEO title="Stephen Seator | UX/UI Blog" />
        {renderChronologicalArticleGroups(chronologicalArticles)}
      </Layout>
    </div>
  )
}

export const postsQuery = graphql`
  query {
    prismic {
      allBlog_articles(last: 10) {
        edges {
          node {
            subtitle
            title
            authored_date
            body {
              ... on PRISMIC_Blog_articleBodyMedia {
                fields {
                  related_media
                }
              }
            }
            _meta {
              uid
              tags
            }
          }
        }
      }
    }
  }
`
