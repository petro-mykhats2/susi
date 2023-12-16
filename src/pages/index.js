import React from 'react'
import Layout from '../layout'
import { graphql } from 'gatsby'
import OrdersTitle from '../components/OrdersTitle'
import OrderLi from '../components/OrderLi'
import MenuTop from '../components/MenuTop'

const IndexPage = ({ data }) => {
  const { section, allProducts, allTypesProducts } = data

  const blockData = section.nodes[0].frontmatter.sections // Отримуємо дані блоків

  // Створюємо об'єкт, де ключі - це значення з "block", а значення - товари відповідного типу
  const productsByBlock = {}

  // Створюємо об'єкт, де ключі - це значення з "title", а значення - назви блоків з "name"
  const blockNames = {}

  allTypesProducts.edges.forEach(({ node }) => {
    blockNames[node.frontmatter.title] = node.frontmatter.name
  })

  allProducts.edges.forEach(({ node }) => {
    const productType = node.frontmatter.categoryProduct // Тип товару
    if (productType) {
      // Якщо тип існує
      if (!productsByBlock[productType]) {
        productsByBlock[productType] = [] // Якщо цього типу товарів ще не маємо, створюємо пустий масив
      }
      productsByBlock[productType].push(node) // Додаємо товар до відповідного типу
    }
  })

  // Оновлюємо блоки в blockData з відповідними назвами
  const updatedBlockData = blockData.map((block) => {
    return {
      block: block.block,
      name: blockNames[block.block] || '', // Додаємо назву блоку з allTypesProducts або залишаємо порожнім рядок
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
          name={block.name} // Передаємо назву блоку
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
