import React, { useState, useLayoutEffect } from "react"
import { RichText } from "prismic-reactjs"
<<<<<<< HEAD
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light"
=======
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
>>>>>>> master
import css from "react-syntax-highlighter/dist/esm/languages/prism/css"
import scss from "react-syntax-highlighter/dist/esm/languages/prism/scss"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import {
  duotoneSpace,
  duotoneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism"
import styles from "~slices/code-block.module.scss"
import "~styles/highlighting.scss"

// create agnostic references to style mapping based on appearance setting
const hlLightThemeStyle = duotoneLight
const hlDarkThemeStyle = duotoneSpace

// options to be spread over the highlighter component
const highlighterOptions = {
  useInlineStyles: false,
  wrapLines: true,
  showLineNumbers: true,
}

// field model expected from Prismic back-end
interface CodeBlockProps {
  highlight: string
  filename?: string
  // Prismic specific formatted text resposnse
  code: any
}

// register languages to minimize static output in source files
SyntaxHighlighter.registerLanguage("javascript", jsx)
SyntaxHighlighter.registerLanguage("typescript", tsx)
SyntaxHighlighter.registerLanguage("scss", scss)
SyntaxHighlighter.registerLanguage("css", css)

export function CodeBlock({ highlight, filename, code }: CodeBlockProps) {
  // set an initial theme based on detected appearance settings
  const [useTheme, setUseTheme] = useState<any>(hlDarkThemeStyle)
  // change the theme to be applied whenever the browser detects an appearance setting change
  useLayoutEffect(function () {
    if (window && window.matchMedia) {
      const query = `(prefers-color-scheme: light)`
      const queryList = window.matchMedia(query)
      if (queryList.addEventListener) {
        queryList.addEventListener("change", (event: MediaQueryListEvent) => {
          setUseTheme(event.matches ? hlLightThemeStyle : hlDarkThemeStyle)
        })
      }
      setUseTheme(queryList.matches ? hlLightThemeStyle : hlDarkThemeStyle)
    }
  }, [])
  // render output
  return (
    <figure className={styles.wrapper}>
      <figcaption className={styles.filename}>{filename}</figcaption>
      <SyntaxHighlighter
        language={highlight}
        style={useTheme}
        {...highlighterOptions}
      >
        {RichText.asText(code)}
      </SyntaxHighlighter>
    </figure>
  )
}
