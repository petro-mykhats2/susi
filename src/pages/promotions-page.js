import React from 'react'
import { Link } from 'gatsby'
import Layout from '../layout'
import PromotionsPage from '../components/PromotionsPage'

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
        <span>Акції</span>
      </div>
      <br />
      {/* <h1>Вибрані товари</h1> */}
      <hr />
      <PromotionsPage />
    </Layout>
  )
}

export default Favorite
