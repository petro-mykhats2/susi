const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('src/pages/templateProduct.js')

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              price
              image
              parameters
              top
            }
          }
        }
      }
    }
  `).then((res) => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach((edges) => {
      const alldata = edges.node.frontmatter
      createPage({
        path: `/menu/${edges.node.frontmatter.path}/`,
        component: postTemplate,
        context: { alldata },
      })
    })
  })
}
