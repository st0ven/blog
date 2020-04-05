import React from "react"
import { getFormalDateFromString } from "~resources/chronology"
import styles from "~components/published-date.module.scss"

interface PublishedDateProps {
  title?: string
  date: string
}

export function PublishedDate({
  title = "Date published",
  date,
}: PublishedDateProps) {
  const dateString: string = getFormalDateFromString(date)
  return (
    <dl className={styles.dateBox}>
      <dt className={styles.title}>{title}</dt>
      <dd>
        <time className={styles.date} dateTime={date}>{dateString}</time>
      </dd>
    </dl>
  )
}
