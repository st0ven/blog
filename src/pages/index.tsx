import React, { useLayoutEffect, useState } from "react"
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

export default function IndexPage(pageData: any) {
  const [blogArticles, setBlogArticles] = useState<Array<any>>([])
  const { chronologicalArticleGroups } = useOrganizePostsChronologically(
    blogArticles
  )
  const { location }: any = pageData
  const token: string | undefined = location.search
    ? location.search.replace("?token=", "")
    : undefined

  useLayoutEffect(() => {
    if (!blogArticles.length) {
      getBlogPosts({ref: token, orderings: '[document.first_publication_date]'}).then((response: any) => {
        setBlogArticles(response.results)
      })
    }
  }, [pageData])

  return (
    <div className={styles.page}>
      <Layout>
        <SEO title="Stephen Seator | UX/UI Blog" />
        {renderChronologicalArticleGroups(chronologicalArticleGroups)}
      </Layout>
    </div>
  )
}
