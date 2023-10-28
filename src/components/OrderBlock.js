import React from 'react'
import SimpleSlider from './Slick'

function OrderBlock({ products, key }) {
  return (
    <div className='order_block'>
      <div className='slick'>
        <SimpleSlider key={key} products={products} />
      </div>
    </div>
  )
}

export default OrderBlock
