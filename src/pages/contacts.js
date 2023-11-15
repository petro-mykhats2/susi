import React from 'react'
import { Link } from 'gatsby'
import Layout from '../layout'

function Contacts() {
  return (
    <Layout>
      <div className='breadcrumb'>
        <Link to='/'>Головна</Link>
        <span>{'>'}</span>
        <span>Меню</span>
      </div>
      <hr />
      <span>Контакти</span>
    </Layout>
  )
}

export default Contacts
