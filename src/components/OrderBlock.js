import React from 'react'
import SimpleSlider from './Slick'

function OrderBlock({ data }) {
  return (
    <div className='order_block'>
      <div className='slick'>
        <SimpleSlider dataitem={data} />
      </div>
    </div>
  )
}

export default OrderBlock
