import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../layout'
import ItemMenu from '../components/ItemMenu'

function Menu({ data }) {
  const orders = data.allMarkdownRemark.edges.sort((a, b) => {
    return a.node.frontmatter.item_index - b.node.frontmatter.item_index
  })

  return (
    <Layout>
      <div className='breadcrumb'>
        <Link to='/'>
          <img src='/img/mainPage.png' alt='main Page' />
          Головна
        </Link>
        <span>{'>'}</span>
        <span>Меню</span>
      </div>
      <div className='menu-top'>
        {/* замінити іконку тому що присутні метадані 
        що скачано з інтернету */}
        <img className='menu-top__img' src='/img/menuIcon2.png' alt='imagee' />
        <div className='menu-top__title'>Суші меню</div>
      </div>
      <div className='menuContainer'>
        {orders.map((order) => {
          return (
            <div key={order.node.id} className='menuContainer-item'>
              <ItemMenu orderdata={order.node} />
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
            item_index
          }
        }
      }
    }
  }
`
