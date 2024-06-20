module.exports = {
  siteMetadata: {
    title: `SiteName - main idea or description`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales/`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // ім'я, яке вказане для плагіна `gatsby-source-filesystem`
        languages: [`en`, `uk`, `cz`], // підтримувані мови
        defaultLanguage: `uk`, // мова за замовчуванням
        siteUrl: `https://example.com`, // замініть на свій сайт
        trailingSlash: 'always', // налаштування для слеша в URL (якщо потрібно)
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // не потрібно для React, оскільки він автоматично ескейпить
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: '/:lang?/blog/:uid',
            getLanguageFromPath: true,
            excludeLanguages: ['es'], // видалення мов, якщо потрібно
          },
          {
            matchPath: '/preview',
            languages: ['en'], // приклад сторінки, яка використовується тільки англійською
          },
        ],
      },
    },
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locales`,
        path: `${__dirname}/locales/`,
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
