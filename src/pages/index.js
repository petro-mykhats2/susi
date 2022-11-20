import { graphql } from 'gatsby'
import React from 'react'
import Item from '../components/Item'
import Layout from '../layout'

const IndexPage = ({ data }) => {
  const orders = data.allProductsJson.edges
  return (
    <Layout>
      <h1 className='container'>Main content</h1>
      <h1>
        {orders.map((order) => {
          return <Item key={order.node.id} orderdata={order.node} />
        })}
      </h1>
      {/* <---  JSON preview data  ---> */}
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
    </Layout>
  )
}

export const query = graphql`
  {
    allProductsJson {
      edges {
        node {
          title
          price
          parameters
          slug
          id
        }
      }
    }
  }
`

export default IndexPage
