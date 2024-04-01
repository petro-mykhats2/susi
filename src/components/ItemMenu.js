import { Link } from 'gatsby'
import React from 'react'

const ItemMenu = ({ orderdata }) => {
  return (
    <div>
      <Link to={`/menu/${orderdata.fields.slug}`}>
        <div>
          {' '}
          <div className='item-img'>
            <img src={orderdata.frontmatter.image} alt='imagee' />{' '}
          </div>
          <div className='menuContainer-title'>
            {orderdata.frontmatter.name}
          </div>
        </div>
      </Link>
    </div>
  )
}
export default ItemMenu
