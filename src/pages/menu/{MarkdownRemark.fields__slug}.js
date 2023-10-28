import React from 'react'
import { graphql } from 'gatsby'
import Item from '../../components/Item'
import Layout from '../../layout'

function All({ data }) {
  console.log('datammmm', data)
  // const orders = data.allMarkdownRemark.edges
  const title = data.markdownRemark.frontmatter.title
  return (
    <Layout>
      {title} jhhjhjhjhjh - новий
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

export default All

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
