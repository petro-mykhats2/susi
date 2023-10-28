import React from 'react'
import Layout from '../layout'
import { graphql } from 'gatsby'
import OrdersTitle from '../components/OrdersTitle'
import OrderLi from '../components/OrderLi'

const IndexPage = ({ data }) => {
  const { section, allProducts } = data

  const blockData = section.nodes[0].frontmatter.sections // Отримуємо дані блоків

  // Створюємо об'єкт, де ключі - це значення з "block", а значення - товари відповідного типу
  const productsByBlock = {}

  allProducts.edges.forEach(({ node }) => {
    const productType = node.frontmatter.type // Тип товару
    if (productType) {
      // Якщо тип існує
      if (!productsByBlock[productType]) {
        productsByBlock[productType] = [] // Якщо цього типу товарів ще не маємо, створюємо пустий масив
      }
      productsByBlock[productType].push(node) // Додаємо товар до відповідного типу
    }
  })

  return (
    <Layout>
      <OrdersTitle />
      {blockData.map((block, index) => (
        <OrderLi
          key={index}
          block={block.block}
          products={productsByBlock[block.block]}
        />
      ))}
    </Layout>
  )
}

export default IndexPage

export const allProducts = graphql`
  {
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
            category
            parameters
            mainCategory
            description
            product_composition
            calories
            type
          }
        }
      }
    }
  }
`
