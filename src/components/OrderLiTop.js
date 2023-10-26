import { Link } from 'gatsby'
import React from 'react'

function OrderLiTop({ data }) {
  return (
    <div className='order_li_top'>
      <div className='order_li_top_title'>Філадельфія роли</div>
      <div className='order_li_top_band'></div>
      <Link to={`/rolls/`} className='order_li_top_button'>
        Дивитись всі
      </Link>
    </div>
  )
}

export default OrderLiTop
