const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('src/components/OrderBlock.js')

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              sku
              path
              weight
              title
              price
              image
              category
              parameters
              mainCategory
              description
              product_composition
              calories
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
      const alldata = edges.node.frontmatter.path
      console.log('alldata', alldata)
      createPage({
        path: `/${edges.node.frontmatter.path}/`,
        component: postTemplate,
        context: { alldata },
      })
    })
  })
}
