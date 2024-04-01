import React from 'react'
import { Link } from 'gatsby'
import Layout from '../layout'

function Contacts() {
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
      <hr />
      <span>Контакти</span>
    </Layout>
  )
}

export default Contacts
