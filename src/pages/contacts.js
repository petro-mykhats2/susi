import React from 'react'
import { Link } from 'gatsby'
import Layout from '../layout'
import ContactPage from '../components/ContactPage'

function Contacts() {
  return (
    <Layout>
      <div className='breadcrumb'>
        <Link to='/'>
          <img src='/img/mainPage.png' alt='main Page' />
          Головна
        </Link>
        <span>{'>'}</span>
        <span>Контакти</span>
      </div>
      <hr />
      <ContactPage />
    </Layout>
  )
}

export default Contacts
