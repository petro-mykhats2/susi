module.exports = {
  siteMetadata: {
    title: `SiteName - main idea or description`,
  },
  plugins: [
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `images`,
        path: `${__dirname}/static/img/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `data`,
        path: `${__dirname}/content/products/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `typesProducts`,
        path: `${__dirname}/content/typesProducts/`,
        ignore: [`**/\.*`], // ігнорувати файли, що починаються з крапки
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `landing`,
        path: `${__dirname}/content/landing/`,
        ignore: [`**/\.*`], // ігнорувати файли, що починаються з крапки
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-transformer-remark',
    `gatsby-plugin-netlify-cms`,
  ],
}
