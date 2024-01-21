import React, { useEffect, useState } from 'react'
import Cart from './Cart'
import fetch from 'cross-fetch'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../redux/cart'

const CartSlider = ({ isOpen, onClose }) => {
  const [isOrdering, setIsOrdering] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    cartData: [],
  })

  const dispatch = useDispatch()
  // Отримання даних з Redux state
  const cartItems = useSelector((state) => state.cart.cartItems)

  // Оновлення cartData при зміні cartItems у Redux state
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      cartData: cartItems,
    }))
  }, [cartItems])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsOrdering(true)

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          age: formData.message,
          email: formData.email,
          cartData: formData.cartData,
        }),
      }

      const response = await fetch(
        '/.netlify/functions/pushDataToDB',
        requestOptions
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      // Оновлення станів при успішному виконанні
      setSuccessMessage('Ваше замовлення успішно виконано!')
      setErrorMessage('')

      // Очищення форми
      setFormData({
        name: '',
        email: '',
        message: '',
        cartData: [],
      })
      dispatch(clearCart())
    } catch (error) {
      console.error('Error sending the message:', error)
      // У випадку помилки також прибрати повідомлення через 2 секунди
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    } finally {
      // Через 2 секунди прибрати повідомлення про успіх
      setTimeout(() => {
        setSuccessMessage('')
      }, 4000)
    }
    // Змінити стан для приховання форми після відправки
    setIsOrdering(false)
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
      {cartItems && cartItems.length === 0 ? null : (
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
      )}
      {/* Повідомлення про успіх або помилку */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}

export default CartSlider
