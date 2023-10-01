import React from 'react'
import { graphql } from 'gatsby'
import Item from '../components/Item'
import Layout from '../layout'

function Rollsa() {
  // const orders = data.allMarkdownRemark.edges
  return (
    <Layout>
      Сети
      <div className='rolls'>
        {/* {orders.map((order) => {
          return (
            <div className='rollItem'>
              <Item key={order.node.id} orderdata={order.node} />
            </div>
          )
        })} */}
      </div>
    </Layout>
  )
}

export default Rollsa

export const allProducts = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "products" } } }
    ) {
      edges {
        node {
          id
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
            top
          }
        }
      }
    }
  }
`
