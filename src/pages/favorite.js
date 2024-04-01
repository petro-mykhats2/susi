import React from 'react'
import { Link } from 'gatsby'
import Layout from '../layout'
import FavoriteItems from '../components/Favorite'

function Favorite() {
  return (
    <Layout>
      <div className='breadcrumb'>
        <Link to='/'>
          <img src='/img/mainPage.png' alt='main Page' />
          Головна
        </Link>
        <span>{'>'}</span>
        <Link to={`/menu/`}>Меню</Link>
        <span>{'>'}</span>
        <span>Вибрані товари</span>
      </div>
      <br></br>
      <h1>Вибрані товари</h1>
      {/* <div className='menuCategory-container'>
        {filteredProducts.map(({ node }) => (
          <ItemProductCategory key={node.id} orderdata={node} />
        ))}
      </div> */}

      <FavoriteItems />
    </Layout>
  )
}

export default Favorite
