import React from 'react'
import OrderBlock from './OrderBlock'
import OrderLiTop from './OrderLiTop'

function OrderLi({ datas }) {
  console.log('datas in orderLi', datas)
  return (
    <div className='order_li'>
      <OrderLiTop data={datas} />
      <OrderBlock data={datas} />
    </div>
  )
}

export default OrderLi
