import { Link } from 'gatsby'
import React from 'react'

function OrderLiTop({ block, name, products }) {
  return (
    <div className='order_li_top'>
      <div className='order_li_top_title'>{name}</div>
      <div className='order_li_top_band'></div>
      <Link
        to={`/menu/${block}/`}
        products={products}
        className='order_li_top_button'
      >
        Дивитись всі
      </Link>
    </div>
  )
}

export default OrderLiTop
