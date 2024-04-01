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
              categoryProduct
              product_composition
            }
          }
        }
      }

      allCategoryMenu_top: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "typesProducts" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              name
              title
              image
            }
          }
        }
      }

      allIngredients: allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "ingredients" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              image
            }
          }
        }
      }
    }
  `).then((res) => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    const products = res.data.allMarkdownRemark.edges
    const categories = res.data.allCategoryMenu_top.edges
    const ingredients = res.data.allIngredients.edges

    products.forEach((edges) => {
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
          categoryProduct: edges.node.frontmatter.categoryProduct,
          categories,
          forCart: edges.node, // Додаємо список категорій до контексту
          ingredients,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const title = node.frontmatter.title
    const slug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g })
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}
