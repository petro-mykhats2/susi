const path = require('path')
const _ = require('lodash')
const slugify = require('slugify')

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
        path: `/menu/product/${edges.node.fields.slug}`,
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

//
// створює slugs

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const title = node.frontmatter.title // Отримуємо назву з frontmatter

    // Створюємо slug і транслітеруємо його
    const slug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g })

    createNodeField({
      name: `slug`,
      node,
      value: slug, // Використовуємо новий slug
    })
  }
}
