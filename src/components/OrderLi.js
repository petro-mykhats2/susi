import React from 'react'
import OrderBlock from './OrderBlock'
import OrderLiTop from './OrderLiTop'

function OrderLi({ block, products, customkey, name }) {
  // console.log('datas in orderLi', block, products)
  return (
    <div className='order_li'>
      <OrderLiTop customKey={block.id} block={block} name={name} />
      <OrderBlock customKey={customkey} products={products} />
    </div>
  )
}

export default OrderLi
