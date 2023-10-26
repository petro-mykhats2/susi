import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layout'
import ItemMenu from '../components/ItemMenu'

function Menu({ data }) {
  const orders = data.allMarkdownRemark.edges
  console.log('orders!!!!', orders)
  return (
    <Layout>
      Меню
      <div className='rolls'>
        {orders.map((order) => {
          return (
            <div className='rollItem'>
              <ItemMenu key={order.node.id} orderdata={order.node} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Menu

export const allCategoryMenu = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "typesProducts" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
            name
            title
            image
          }
        }
      }
    }
  }
`
