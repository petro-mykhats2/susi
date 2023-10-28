import { Link } from 'gatsby'
import React from 'react'

function OrderLiTop({ block }) {
  // console.log('block', block)
  return (
    <div className='order_li_top'>
      <div className='order_li_top_title'>{block}</div>
      <div className='order_li_top_band'></div>
      <Link to={`/menu/${block}/`} className='order_li_top_button'>
        Дивитись всі
      </Link>
    </div>
  )
}

export default OrderLiTop
