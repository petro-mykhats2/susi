import React from 'react'
import Cart from './Cart'

const CartSlider = ({ isOpen, onClose }) => {
  return (
    <div className={`cart-slider ${isOpen ? 'open' : ''}`}>
      <div className='cart-header'>
        <h2>Корзина</h2>
        <button onClick={onClose}>Закрити</button>
      </div>
      <Cart />
      <div className='cart-order'>Замовити</div>
    </div>
  )
}

export default CartSlider
