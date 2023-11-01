import React from 'react'
import SimpleSlider from './Slick'

function OrderBlock({ products, customKey }) {
  return (
    <div className='order_block'>
      <div className='slick'>
        <SimpleSlider customKey={customKey} products={products} />
      </div>
    </div>
  )
}

export default OrderBlock
