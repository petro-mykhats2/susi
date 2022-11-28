import React from 'react'
import OrderBlock from './OrderBlock'
import OrderLiTop from './OrderLiTop'

function OrderLi({ datas }) {
  return (
    <div className='order_li'>
      <OrderLiTop />
      <OrderBlock data={datas} />
    </div>
  )
}

export default OrderLi
