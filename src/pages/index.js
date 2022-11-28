import React from 'react'
import OrderLi from '../components/OrderLi'
import OrdersTitle from '../components/OrdersTitle'
import Layout from '../layout'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <OrdersTitle />
      <OrderLi datas={data} />
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
