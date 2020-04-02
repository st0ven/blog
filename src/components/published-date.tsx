import React from "react"
import styles from "~components/published-date.module.scss"

interface PublishedDateProps {
  title?: string
  date: string
}

export function PublishedDate({
  title = "Date published",
  date,
}: PublishedDateProps) {
  return (
    <dl className={styles.dateBox}>
      <dt className={styles.title}>{title}</dt>
      <dd className={styles.value}>{date}</dd>
    </dl>
  )
}
