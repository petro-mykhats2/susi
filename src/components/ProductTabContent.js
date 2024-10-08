import React from 'react'
import ContentDisplay from './ContentDisplay'

const ProductTabContent = ({ selectedOption, pageContext }) => {
  return (
    <div className='container'>
      {selectedOption === 'info' && (
        <div className='product-info'>
          <h2>Опис</h2>
          <p>{pageContext.description}</p>
        </div>
      )}

      {selectedOption === 'delivery' && (
        <div className='product-info'>
          <h2>Доставка</h2>
          <div>
            <ContentDisplay selectedTitle='deliveryInformation' />
          </div>
        </div>
      )}

      {selectedOption === 'payment' && (
        <div className='product-info'>
          <h2>Способи оплати</h2>
          <div>
            <ContentDisplay selectedTitle='paymentInformation' />
          </div>
        </div>
      )}

      {selectedOption === 'reviews' && (
        <div className='product-info'>
          <h2>Відгуки</h2>
          <p>Тут будуть відгуки</p>
        </div>
      )}
    </div>
  )
}

export default ProductTabContent
