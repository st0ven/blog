import React from "react"
import cx from "classnames"
import styles from "~components/blockquote.module.scss"

interface BlockquoteProps {
  text: string
}

export function Blockquote({ text }: BlockquoteProps) {
  return (
    <div className={styles.container}>
      <blockquote>&ldquo;{text}&rdquo;</blockquote>
    </div>
  )
}
