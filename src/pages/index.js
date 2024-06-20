import React from 'react'
import Layout from '../layout'
import { graphql } from 'gatsby'
import OrdersTitle from '../components/OrdersTitle'
import OrderLi from '../components/OrderLi'
import MenuTop from '../components/MenuTop'

const IndexPage = ({ data }) => {
  const { section, allProducts, allTypesProducts, locales } = data

  const blockData = section.nodes[0].frontmatter.sections // Отримуємо дані блоків

  const productsByBlock = {}
  const blockNames = {}

  allTypesProducts.edges.forEach(({ node }) => {
    blockNames[node.frontmatter.title] = node.frontmatter.name
  })

  allProducts.edges.forEach(({ node }) => {
    const productType = node.frontmatter.categoryProduct
    if (productType) {
      if (!productsByBlock[productType]) {
        productsByBlock[productType] = []
      }
      productsByBlock[productType].push(node)
    }
  })

  const updatedBlockData = blockData.map((block) => {
    return {
      block: block.block,
      name: blockNames[block.block] || '',
    }
  })

  return (
    <Layout>
      <MenuTop data={allTypesProducts} />
      <OrdersTitle />
      <div className='decorative-image'>
        <img src='/img/wassabi.png' alt='dark theme' />
      </div>

      {updatedBlockData.map((block, index) => (
        <OrderLi
          key={index}
          block={block.block}
          name={block.name}
          products={productsByBlock[block.block]}
        />
      ))}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    section: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "landing" } } }
    ) {
      nodes {
        frontmatter {
          templateKey
          title
          sections {
            block
          }
        }
      }
    }
    allTypesProducts: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "typesProducts" } } }
    ) {
      edges {
        node {
          frontmatter {
            name
            title
            image
          }
        }
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
