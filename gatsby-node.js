const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('src/pages/templateProduct.js')

  return await graphql(`
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
              description
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
      // const alldata = edges.node.frontmatter
      createPage({
        path: `/menu/${edges.node.frontmatter.path}/`,
        component: postTemplate,
        context: {
          title: edges.node.frontmatter.title,
          price: edges.node.frontmatter.price,
          image: edges.node.frontmatter.image,
          parameters: edges.node.frontmatter.parameters,
          top: edges.node.frontmatter.top,
          description: edges.node.frontmatter.description,
        },
      })
    })
  })
}
