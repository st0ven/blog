import React from "react"
import {RichText} from "prismic-reactjs"
import styles from "~slices/section-title.module.scss"

export interface SectionTitleProps {
	title: any
}

export function SectionTitle({title}: any){
	return (
    <h3 className={styles.sectionTitle}>
      {RichText.asText(title)}
    </h3>
  )
}