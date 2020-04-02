import React from "react"
import { TopicCard } from "~components/topic-card"
import { ChronologicalArticleGroup } from "~resources/chronology"
import styles from "~components/article-group.module.scss"

export function ArticleGroup({
  month,
  year,
  articles,
}: ChronologicalArticleGroup) {
  return (
    <div className={styles.articleGroup}>
      <h3 className={styles.month}>{month}</h3>
      <h6 className={styles.year}>{year}</h6>
      <ul className={styles.topics}>
        {articles.map((node: any) => (
          <li className={styles.topic} key={node._meta.uid}>
            <TopicCard
              title={node.title}
              subtitle={node.subtitle}
              date={node.authored_date}
              tags={node._meta.tags}
              uid={node._meta.uid}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
