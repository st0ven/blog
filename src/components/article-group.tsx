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
				{articles.map((article: any) => (
					<li className={styles.topic} key={article.uid}>
						<TopicCard
							title={article.data.title}
							subtitle={article.data.subtitle}
							date={article.first_publication_date}
							tags={article.tags}
							uid={article.uid}
							slug={article.slug}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
