import { Link } from 'gatsby'
import React from 'react'

const ItemMenu = ({ orderdata }) => {
  console.log('orderdata in ItemMenu', orderdata)
  return (
    <Link to={`/menu${orderdata.fields.slug}`} className='item'>
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
