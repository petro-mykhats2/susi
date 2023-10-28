const path = require('path')
const _ = require('lodash')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const productTemplate = path.resolve('src/pages/templateProduct.js')

  return await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "products" } } }
      ) {
        edges {
          node {
            html
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
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
        path: `/menu${edges.node.fields.slug}`,
        component: productTemplate,
        context: {
          slug: edges.node.fields.slug,
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
// let type = []
// // Iterate through each post, putting all found tags into `tags`
// type.forEach((edge) => {
//   if (_.get(edge, `node.frontmatter.type`)) {
//     type = type.concat(edge.node.frontmatter.type)
//   }
// })
// // Eliminate duplicate tags
// type = _.uniq(type)

// // Make tag pages
// type.forEach((tag) => {
//   const typePath = `/type/${_.kebabCase(tag)}/`

//   createPage({
//     path: typePath,
//     component: path.resolve(`src/templates/roly.js`),
//     context: {
//       type,
//     },
//   })
// })

// створює slugs

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
