import React from 'react'
import { graphql } from 'gatsby'
import Item from '../../components/Item'
import Layout from '../../layout'

function All({ data }) {
  const title = data.markdownRemark.frontmatter.title
  const name = data.markdownRemark.frontmatter.name
  const products = data.allProducts.edges.map(({ node }) => node)

  // Групування продуктів за subcategory
  const productsBySubcategory = {}
  products.forEach((product) => {
    const subcategory = product.frontmatter.subcategory
    if (!productsBySubcategory[subcategory]) {
      productsBySubcategory[subcategory] = []
    }
    productsBySubcategory[subcategory].push(product)
  })

  return (
    <Layout>
      <h1>{name}</h1>
      {Object.entries(productsBySubcategory).map(
        ([subcategory, subcategoryProducts]) => (
          <div key={subcategory}>
            {subcategoryProducts.some(
              (product) => product.frontmatter.categoryProduct === title
            ) && <h2>{subcategory}</h2>}
            {/* вирішити проблему з відображенням null */}
            <div className='rollsss'>
              {subcategoryProducts
                .filter(
                  (product) => product.frontmatter.categoryProduct === title
                )
                .map((product) => (
                  <Item key={product.id} orderdata={product} />
                ))}
            </div>
          </div>
        )
      )}
    </Layout>
  )
}

export default All

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        name
      }
    }
    allProducts: allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
            sku
            weight
            title
            price
            image
            parameters
            description
            product_composition
            calories
            categoryProduct
            subcategory
          }
        }
      }
    }
  }
`
