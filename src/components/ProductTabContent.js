import React from 'react'
import ContentDisplay from './ContentDisplay'
import Reviews from './Rewiew'

const ProductTabContent = ({ selectedOption, pageContext }) => {
  console.log('ProductTabContent pageContext:', pageContext) // Додаємо лог

  // Використовуємо slug замість sku як унікальний ідентифікатор
  const productId = pageContext?.slug
  console.log('Resolved productId:', productId) // Додаємо лог

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
          {/* <h2>Відгуки</h2> */}
          {productId ? (
            <Reviews productId={productId} />
          ) : (
            <div>Помилка: Не вдалося визначити ID товару</div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductTabContent
