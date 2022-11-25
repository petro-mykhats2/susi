import { graphql } from 'gatsby'
import React from 'react'
import Item from '../components/Item'
import OrdersTitle from '../components/OrdersTitle'
import Layout from '../layout'

const IndexPage = ({ data }) => {
  const orders = data.allMarkdownRemark.edges
  return (
    <Layout>
      <OrdersTitle />
      <h1>
        {orders.map((order) => {
          return <Item key={order.node.id} orderdata={order.node} />
        })}
      </h1>
      {/* <---  JSON preview data  ---> */}
      {/* <pre>{JSON.stringify(orders, null, 4)}</pre> */}
    </Layout>
  )
}

export default IndexPage

export const allProducts = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            sku
            path
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
          }
        }
      }
    }
  }
`
