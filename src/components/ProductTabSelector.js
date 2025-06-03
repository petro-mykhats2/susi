import React from 'react'

const ProductTabSelector = ({ selectedOption, handleChange, reviewsCount }) => {
  // Функція для прокрутки на 50px вниз
  const handleScroll = () => {
    window.scrollBy({
      top: 40, // Прокрутка на 50px вниз
      behavior: 'smooth', // Плавна прокрутка
    })
  }

  return (
    <div className='radio-inputs'>
      <label className='radio'>
        <input
          type='radio'
          name='radio'
          value='info'
          checked={selectedOption === 'info'}
          onChange={(event) => {
            handleChange(event)
            handleScroll() // Виклик прокрутки
          }}
        />
        <span className='name'>Опис</span>
      </label>
      <label className='radio'>
        <input
          type='radio'
          name='radio'
          value='delivery'
          checked={selectedOption === 'delivery'}
          onChange={(event) => {
            handleChange(event)
            handleScroll() // Виклик прокрутки
          }}
        />
        <span className='name'>Доставка</span>
      </label>
      <label className='radio'>
        <input
          type='radio'
          name='radio'
          value='payment'
          checked={selectedOption === 'payment'}
          onChange={(event) => {
            handleChange(event)
            handleScroll() // Виклик прокрутки
          }}
        />
        <span className='name'>Оплата</span>
      </label>
      <label className='radio'>
        <input
          type='radio'
          name='radio'
          value='reviews'
          checked={selectedOption === 'reviews'}
          onChange={(event) => {
            handleChange(event)
            handleScroll() // Виклик прокрутки
          }}
        />
        <span className='name'>
          Відгуки
          {reviewsCount !== undefined && (
            <span className='reviews-count'>({reviewsCount})</span>
          )}
        </span>
      </label>
    </div>
  )
}

export default ProductTabSelector
