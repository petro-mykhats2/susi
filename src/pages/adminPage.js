import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../layout'
import ItemMenu from '../components/ItemMenu'
import Login from '../components/Login'
import RegisterUser from '../components/RegisterUser'

function AdminPage({ data }) {
  const orders = data.allMarkdownRemark.edges.sort((a, b) => {
    return a.node.frontmatter.item_index - b.node.frontmatter.item_index
  })

  return (
    <Layout>
      Admin page
      <RegisterUser />
      <Login />
    </Layout>
  )
}

export default AdminPage

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
            item_index
          }
        }
      }
    }
  }
`
