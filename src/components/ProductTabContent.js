import React from 'react'
import useSiteSettings from '../hooks/useSiteSettings'

const ProductTabContent = ({ selectedOption, pageContext }) => {
  const data = useSiteSettings()
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
          <p>{data.deliveryInformation}</p>
        </div>
      )}

      {selectedOption === 'payment' && (
        <div className='product-info'>
          <h2>Оплата</h2>
          <p>{data.paymentInformation}</p>
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
