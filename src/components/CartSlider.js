import React, { useState } from 'react'
import Cart from './Cart'
import fetch from 'cross-fetch'
import axios from 'axios'

const CartSlider = ({ isOpen, onClose }) => {
  const [isOrdering, setIsOrdering] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsOrdering(true)
    try {
      const orderData = {
        // items: cartItems,
        user_name: formData.name,
        user_email: formData.email,
        user_message: formData.message,
      }

      console.log('Дані, що надсилаються на сервер:', JSON.stringify(orderData))

      const response = await axios.post('/api/orders', orderData)

      console.log('Замовлення успішно відправлено:', response.data)
      // Додайте додаткову логіку, якщо потрібно
    } catch (error) {
      console.error('Помилка при відправленні замовлення:', error)
      // Обробка помилки, якщо потрібно
    } finally {
      setIsOrdering(false)
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        message: formData.message,
        email: formData.email,
        // cartItems: cartItems,
        // cartTotal: cartTotal,
      }),
    }

    try {
      const response = await fetch(
        '/.netlify/functions/telegram',
        requestOptions
      )
      const data = await response.json()
      console.log(data) // Вивести результат в консоль
    } catch (error) {
      console.error('Error sending the message:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <div className={`cart-slider ${isOpen ? 'open' : ''}`}>
      <div className='cart-header'>
        <h2>Корзина</h2>
        <button onClick={onClose}>Закрити</button>
      </div>
      <Cart />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='message'>Message:</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit' disabled={isOrdering}>
          Замовити
        </button>
      </form>
      {/* <div className='cart-order' type="submit" disabled={isOrdering}>Замовити</div> */}
    </div>
  )
}

export default CartSlider

// import React, { useState } from "react"
// import fetch from "cross-fetch"
// import axios from "axios"
// import { useSelector } from "react-redux"

// const ContactForm = ({ cartItems, cartTotal }) => {
// const [isOrdering, setIsOrdering] = useState(false)

// const [formData, setFormData] = useState({
//   name: '',
//   email: '',
//   message: '',
// })

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     setIsOrdering(true)
//     try {
//       const orderData = {
//         items: cartItems,
//         user_name: formData.name,
//         user_email: formData.email,
//         user_message: formData.message,
//       }

//       console.log('Дані, що надсилаються на сервер:', JSON.stringify(orderData))

//       const response = await axios.post('/api/orders', orderData)

//       console.log('Замовлення успішно відправлено:', response.data)
//       // Додайте додаткову логіку, якщо потрібно
//     } catch (error) {
//       console.error('Помилка при відправленні замовлення:', error)
//       // Обробка помилки, якщо потрібно
//     } finally {
//       setIsOrdering(false)
//     }

//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: formData.name,
//         message: formData.message,
//         email: formData.email,
//         cartItems: cartItems,
//         cartTotal: cartTotal,
//       }),
//     }

//     try {
//       const response = await fetch(
//         '/.netlify/functions/telegram',
//         requestOptions
//       )
//       const data = await response.json()
//       console.log(data) // Вивести результат в консоль
//     } catch (error) {
//       console.error('Error sending the message:', error)
//     }
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor='name'>Name:</label>
//         <input
//           type='text'
//           id='name'
//           name='name'
//           value={formData.name}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor='email'>Email:</label>
//         <input
//           type='email'
//           id='email'
//           name='email'
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor='message'>Message:</label>
//         <textarea
//           id='message'
//           name='message'
//           value={formData.message}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button type='submit' disabled={isOrdering}>
//         Замовити
//       </button>
//     </form>
//   )
// }

// export default ContactForm
