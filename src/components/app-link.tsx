import React, { useCallback, useRef } from "react"
import cx from "classnames"
import { Link } from "gatsby"
import { navigate } from "@reach/router"
import styles from "~components/app-link.module.scss"

interface AppLinkProps {
  to?: string
  target?: string
  className?: string
  children: React.ReactNode
  icon?: React.ReactNode
  iconAlignment?: string
  onClick?: () => void
}

export function AppLink({
  to,
  target = "self",
  children,
  className = "",
  icon,
  iconAlignment = "left",
}: AppLinkProps) {
  const linkRef: React.RefObject<a> = useRef(null)
  const appLinkCx: string = cx(styles.appLink, className, {
    [styles.iconAlignLeft]: iconAlignment !== "right",
    [styles.iconAlignRight]: iconAlignment === "right",
  })
  const keyUpHandler = useCallback(
    (event: React.KeyboardEvent) => {
      if (linkRef && linkRef.current && event.key === "Enter") {
        linkRef.current.click()
      }
    },
    [to]
  )
  return (
    <span className={appLinkCx} tabIndex={0} onKeyUp={keyUpHandler}>
      {icon ? icon : null}
      <span>
        <Link to={to} target={target} tabIndex={-1} ref={linkRef}>
          {children}
        </Link>
      </span>
    </span>
  )
}
