/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import styles from "~components/layout.module.scss";

const Layout = ({ children }) => {
	return (
		<>
			<div className={styles.container}>
				<header className={styles.header}>header</header>
				<main className={styles.main}>{children}</main>
				<footer className={styles.footer}>footer</footer>
			</div>
		</>
	)
}

export default Layout
