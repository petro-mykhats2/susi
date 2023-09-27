import React from 'react'
import OrderLi from '../components/OrderLi'
import OrdersTitle from '../components/OrdersTitle'
import Layout from '../layout'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  // sortData = data.allMarkdownRemark.edges
  return (
    <Layout>
      <OrdersTitle />
      <OrderLi datas={data} />
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
            templateKey
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
            top
          }
        }
      }
    }
  }
`
