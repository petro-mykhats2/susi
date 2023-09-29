const path = require('path')
const _ = require('lodash')

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
            fields {
              slug
            }
            frontmatter {
              templateKey
              path
              title
              price
              image
              parameters
              top
              description
              weight
              type
              product_composition
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
          weight: edges.node.frontmatter.weight,
          product_composition: edges.node.frontmatter.product_composition,
        },
      })
    })
  })
}

// Tag pages:
let tags = []
// Iterate through each post, putting all found tags into `tags`
posts.forEach((edge) => {
  if (_.get(edge, `node.frontmatter.tags`)) {
    tags = tags.concat(edge.node.frontmatter.tags)
  }
})
// Eliminate duplicate tags
tags = _.uniq(tags)

// Make tag pages
tags.forEach((tag) => {
  const tagPath = `/tags/${_.kebabCase(tag)}/`

  createPage({
    path: tagPath,
    component: path.resolve(`src/templates/tags.js`),
    context: {
      tag,
    },
  })
})

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
