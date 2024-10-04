import React from 'react'
import OrderBlock from './OrderBlock'
import OrderLiTop from './OrderLiTop'

function OrderLi({ block, products, customkey, name, settings }) {
  return (
    <div className='order_li'>
      <OrderLiTop
        customKey={block.id}
        block={block}
        name={name}
        products={products}
      />
      <OrderBlock
        customKey={customkey}
        products={products}
        settings={settings}
      />
    </div>
  )
}

export default OrderLi
