// node imports
const path = require("path")

// enable environment variables with dotenv package
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: ``,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  pathPrefix: "/uxblog",
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    /*
    Typescript support:
    look for https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/ for further documentation
    */
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        allExtensions: true, // defaults to false
      },
    },
    // alias support
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "~api": path.resolve(__dirname, "src/api"),
          "~components": path.resolve(__dirname, "src/components"),
          "~pages": path.resolve(__dirname, "src/pages"),
          "~resources": path.resolve(__dirname, "src/resources"),
          "~styles": path.resolve(__dirname, "src/styles"),
          "~templates": path.resolve(__dirname, "src/templates"),
        },
        extensions: [
          "js",
          "jsx",
          "ts",
          "tsx",
          "scss",
          "sass",
          "module.scss",
          "module.sass",
        ],
      },
    },
    // emotion css-in-js support
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
