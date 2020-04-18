import React from "react"
import styles from "~slices/blockquote.module.scss"

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
