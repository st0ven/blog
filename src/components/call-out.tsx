import React from "react"
import { RichText } from "prismic-reactjs"
import styles from "~components/call-out.module.scss"

export interface CallOutProps {
  title?: string
  body: Array<any>
}

export function CallOut({ body, title }: CallOutProps) {
  return (
    <section className={styles.callOutWrapper}>
      <RichText render={title} />
      <RichText render={body} />
    </section>
  )
}
