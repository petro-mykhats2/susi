import React from 'react'

const InputOrderDetailsCard = ({ order }) => {
  console.log('order', order)
  return (
    <div className='inputOrderDetailsCard-order'>
      <div className='inputOrderDetailsCard-left'>
        <p>Ім'я: {order.name}</p>
        <p>Телефон: {order.phone}</p>

        {/* Додайте інші поля замовлення, які вам потрібні */}
      </div>
      <div className='inputOrderDetailsCard-left'>
        <p>Повідомлення: {order.message}</p>
        <p>Телефон: {order.phone}</p>
        {/* Додайте інші поля замовлення, які вам потрібні */}
      </div>
    </div>
  )
}

export default InputOrderDetailsCard
