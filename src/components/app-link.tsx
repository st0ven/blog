import React, { useCallback } from "react"
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
  target = "blank",
  children,
  className = "",
  icon,
  iconAlignment = "left",
}: AppLinkProps) {
  const appLinkCx: string = cx(styles.appLink, className, {
    [styles.iconAlignLeft]: iconAlignment !== "right",
    [styles.iconAlignRight]: iconAlignment === "right",
  })
  const keyUpHandler = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        navigate(to)
      }
    },
    [to]
  )
  return (
    <span className={appLinkCx} tabIndex={0} onKeyUp={keyUpHandler}>
      {icon ? icon : null}
      <span>
        <Link to={to} target={target} tabIndex={-1}>
          {children}
        </Link>
      </span>
    </span>
  )
}
