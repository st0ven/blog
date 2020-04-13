import React, { useLayoutEffect, useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import { getBlogPosts } from "~api/prismic"
import Layout from "~components/layout"
import SEO from "~components/seo"
import { ArticleGroup } from "~components/article-group"
import {
  ChronologicalArticleGroup,
  useOrganizePostsChronologically,
} from "~resources/chronology"

import "~styles/global.scss"
import styles from "~pages/page.module.scss"
import pageStyles from "~pages/index.module.scss"

const query = graphql`
  query FetchAllPages {
    allSitePage(filter: { context: { type: { eq: "blog_article" } } }) {
      nodes {
        context {
          uid
          type
          tags
          slug
          first_publication_date
          lang
          data {
            title {
              text
            }
            subtitle {
              text
            }
          }
        }
      }
    }
  }
`

/*
Given a list of ChronologicalArticleGroups, will
iterate through groups and render each as a ReactNode
*/
function renderChronologicalArticleGroups(
  chronologicalArticles: Array<ChronologicalArticleGroup>
): React.ReactNode {
  return chronologicalArticles.map(
    (articleGroup: ChronologicalArticleGroup, index: number) => (
      <section
        className={pageStyles.articleGroup}
        key={`${articleGroup.year}-${articleGroup.month}`}
      >
        {index ? <hr className={pageStyles.horizontalRule} /> : null}
        <ArticleGroup {...articleGroup} />
      </section>
    )
  )
}

/*
  transforms gatsby nodes fetched from static query to the model expected
  to represent a blog article
*/
function transformGatsbyNodesToArticles(nodelist): Array<any> {
  return nodelist.map((node) => node.context)
}

export default function IndexPage() {
  // render method to pass along to StaticQuery component
  function render({ allSitePage }: any): React.ReactNode {
    const { chronologicalArticleGroups } = useOrganizePostsChronologically(
      transformGatsbyNodesToArticles(allSitePage.nodes)
    )
    return (
      <div className={styles.page}>
        <Layout>
          <SEO title="Stephen Seator | UX/UI Blog" />
          {renderChronologicalArticleGroups(chronologicalArticleGroups)}
        </Layout>
      </div>
    )
  }
  /*
    provider for our renderer to expose gatsby's node store
    All relevant articles should have been fetched by the server,
    including any preview articles yet unpublished.
  */
  return <StaticQuery query={query} render={render} />
}
