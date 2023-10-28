import React from 'react'
import OrderBlock from './OrderBlock'
import OrderLiTop from './OrderLiTop'

function OrderLi({ block, products, key }) {
  // console.log('datas in orderLi', block, products)
  return (
    <div className='order_li'>
      <OrderLiTop key={block.id} block={block} />
      <OrderBlock key={key} products={products} />
    </div>
  )
}

export default OrderLi
