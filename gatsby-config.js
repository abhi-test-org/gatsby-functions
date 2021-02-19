/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-postcss",
    "@chakra-ui/gatsby-plugin",
    {
      resolve: "gatsby-plugin-functions",
      options: { path: `${__dirname}/src/functions` },
    },
  ],
}
