import React from 'react'
import { graphql } from 'gatsby'
import Item from '../../components/Item'
import Layout from '../../layout'

function All({ data }) {
  const title = data.markdownRemark.frontmatter.title
  const name = data.markdownRemark.frontmatter.name

  // Фільтрація продуктів за умовою categoryProduct === title
  const filteredProducts = data.allProducts.edges.filter(
    ({ node }) => node.frontmatter.categoryProduct === title
  )

  return (
    <Layout>
      <h1>{name}</h1>
      <div className='rollsss'>
        {filteredProducts.map(({ node }) => (
          <Item key={node.id} orderdata={node} />
        ))}
      </div>
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
          }
        }
      }
    }
  }
`
