import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../layout'
import ItemProductCategory from '../../components/ItemProductCategory'

function All({ data }) {
  const title = data.markdownRemark.frontmatter.title
  const name = data.markdownRemark.frontmatter.name

  // Фільтрація продуктів за умовою categoryProduct === title
  const filteredProducts = data.allProducts.edges.filter(
    ({ node }) => node.frontmatter.categoryProduct === title
  )

  return (
    <Layout>
      <div className='breadcrumb'>
        <Link to='/'>
          <img src='/img/mainPage.png' alt='main Page' />
          Головна
        </Link>
        <span>{'>'}</span>
        <Link to={`/menu/`}>Меню</Link>
        <span>{'>'}</span>
        <span>{name}</span>
      </div>
      <br></br>
      <h1>{name}</h1>
      <div className='menuCategory-container'>
        {filteredProducts.map(({ node }) => (
          <ItemProductCategory key={node.id} orderdata={node} />
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
            top
          }
        }
      }
    }
  }
`
