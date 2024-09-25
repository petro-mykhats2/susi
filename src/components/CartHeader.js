import React from 'react'

const CartHeader = ({ onClose }) => {
  return (
    <div className='cart-header'>
      <h2>Корзина</h2>
      <button onClick={onClose}>Закрити</button>
    </div>
  )
}

export default CartHeader
