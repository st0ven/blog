import React, { useCallback, useRef } from "react"
import cx from "classnames"
import { Link } from "gatsby"
import styles from "~components/app-link.module.scss"

interface AppLinkProps {
  to?: string
  target?: string
  className?: string
  children: React.ReactNode
  icon?: React.ReactNode
  iconAlignment?: string
  replace: boolean
  onClick?: () => void
}

export function AppLink({
  to,
  children,
  className = "",
  icon,
  iconAlignment = "left",
  replace = false,
}: AppLinkProps) {
  const linkRef: React.RefObject<a> = useRef(null)
  // build link className
  const appLinkCx: string = cx(styles.appLink, className, {
    [styles.iconAlignLeft]: iconAlignment !== "right",
    [styles.iconAlignRight]: iconAlignment === "right",
  })
  // memoize our callback
  const keyUpHandler = useCallback(
    (event: React.KeyboardEvent) => {
      if (linkRef && linkRef.current && event.key === "Enter") {
        linkRef.current.click()
      }
    },
    [to]
  )
  // render
  return (
    <span className={appLinkCx} tabIndex={0} onKeyUp={keyUpHandler}>
      {icon ? icon : null}
      <span>
        <Link to={to} tabIndex={-1} ref={linkRef} replace={replace}>
          {children}
        </Link>
      </span>
    </span>
  )
}
