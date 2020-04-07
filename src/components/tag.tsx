import React from "react"
import cx from "classnames"
import styles from "~components/tag.module.scss";

interface TagProps {
  value: string
  className?: string
}

export function Tag({ value, className }: TagProps) {
  return <span className={cx(className, styles.tag)}>{value}</span>
}
