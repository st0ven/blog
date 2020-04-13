/*
Topic Cards
------------
This component is meant to render a preview/peek at the nature
of an existing article/blog post. The card itself should display
some basic information about that content, such as the date,
title/subtitle, any associated tags with it, and other meta content.

A user should be able to interact with the tag in such a way that clicking
on the content or some clear CTA should link out to the content
as a dedicated route/link to view the full content.
*/
import React from "react"
import { RichText } from "prismic-reactjs"
import { Tag } from "~components/tag"
import { AppLink } from "~components/app-link"
import { getDayFromDateString } from "~resources/chronology"
import styles from "~components/topic-card.module.scss"

interface TopicCardProps {
	title: Array<any>
	subtitle?: Array<any>
	date: any
	tags?: Array<string>
	uid: string
	slug: string
}

// iterate through list of tags and render appropriate JSX/Component
// to return a collection of ReactElements
function renderTags(tags: Array<string>): Array<React.ReactElement> {
	return tags.map((tag: string) => (
		<Tag key={tag} className={styles.tag} value={tag} />
	))
}

export function TopicCard({
	title,
	subtitle,
	date,
	tags,
	slug,
}: TopicCardProps) {
	return (
		<section className={styles.topicCard}>
			<div className={styles.cardMargin}>
				<div className={styles.verticalRule} />
				<span className={styles.dayOfTheMonth}>
					{getDayFromDateString(date)}
				</span>
			</div>
			<div className={styles.cardContent}>
				<div>
					<AppLink to={slug} className={styles.topicLink}>
						{RichText.asText(title)}
					</AppLink>
				</div>
				<span className={styles.description}>{RichText.asText(subtitle)}</span>
				{tags ? <div className={styles.tags}>{renderTags(tags)}</div> : null}
			</div>
		</section>
	)
}
