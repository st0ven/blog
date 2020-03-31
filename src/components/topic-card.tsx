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
import React, { useCallback } from "react"
import cx from "classnames"
import { ArrowRightCircle } from "react-feather"
import { navigate } from "@reach/router"
import { Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import { Tag } from "~components/tag"

import styles from "~components/topic-card.module.scss"

// js module to help build our post slug urls
const { buildSlug } = require("~resources/post-builder")

interface TopicCardProps {
  title: Array<any>
  subtitle?: Array<any>
  date: any
  tags?: Array<string>
  media?: Array<any>
  uid: string
}

/*
Date string will likely come in a complex format.
this function should manage disentangling that and returning
the appropriate day of the month to be displayed as a number.
*/
function extractDayFromDateString(dateString: string): number {
  // NOZTE: expected format here of dateString (from API) is
  // YYYY-MM-DD
  return Number(dateString.split("-")[2])
}

// iterate through list of tags and render appropriate JSX/Component
// to return a collection of ReactElements
function renderTags(tags: Array<string>): Array<React.ReactElement> {
  return tags.map((tag: string) => (
    <Tag key={tag} className={styles.tag} value={tag} />
  ))
}

function renderThumbnails(media: any) {
  return media.map((medium: any) => {
    console.log(medium)
  })
}

async function redirectHandler(slug: string) {
  await navigate(slug)
}

/* 
Main exportable function for this component.
*/
export function TopicCard({
  title,
  subtitle,
  date,
  tags,
  media,
  uid,
}: TopicCardProps) {
  const slug: string = buildSlug(title)
  const handleNavigation = useCallback(() => {
    redirectHandler(slug)
  }, [slug])
  return (
    <aside className={styles.topicCard}>
      <div className={styles.verticalRule}></div>
      <div className={styles.dayOfTheMonth}>
        {extractDayFromDateString(date)}
      </div>
      {/* right column - Will hold text content */}
      <h5 className={styles.title}>
        <Link to={slug} className={styles.articleLink}>
          {RichText.asText(title)}
          <ArrowRightCircle className={styles.icon} />
        </Link>
      </h5>
      <h6 className={styles.subtitle}>{RichText.asText(subtitle)}</h6>
      {tags ? <div className={styles.tags}>{renderTags(tags)}</div> : null}
      {media ? <div>{renderThumbnails(media)}</div> : null}
    </aside>
  )
}
