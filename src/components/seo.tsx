/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Fragment } from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const query: void = graphql`
    query SEOQuery {
      site {
        siteMetadata {
          author
          description
          title
        }
      }
    }
  `

  return (
    <StaticQuery
      query={query}
      render={({ site }: any) => {
        const metaDescription = description || site.siteMetadescription
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: site.siteMetaauthor,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ].concat(meta)}
          >
            <script>
              {`
                window.prismic = {
                  endpoint: 'https://uxblog.cdn.prismic.io/api/v2'
                };
              `}
            </script>
            <script
              type="text/javascript"
              src="https://static.cdn.prismic.io/prismic.min.js?new=true"
            ></script>
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
