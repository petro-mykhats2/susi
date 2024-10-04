import React from 'react'
import SimpleSlider from './Slick'

function OrderBlock({ products, customKey, settings }) {
  return (
    <div className='order_block'>
      <div className='slick'>
        <SimpleSlider
          customKey={customKey}
          products={products}
          settingsData={settings}
        />
      </div>
    </div>
  )
}

export default OrderBlock
