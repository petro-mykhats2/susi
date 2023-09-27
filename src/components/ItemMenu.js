import { Link } from 'gatsby'
import React from 'react'

const ItemMenu = ({ orderdata }) => {
  return (
    <Link to={`/${orderdata.frontmatter.path}`} className='item'>
      <div>
        {' '}
        <div className='item-img'>
          <img src={orderdata.frontmatter.image} alt='imagee' />{' '}
        </div>
        <div className='item-title'>{orderdata.frontmatter.title}</div>
      </div>
    </Link>
  )
}
export default ItemMenu
